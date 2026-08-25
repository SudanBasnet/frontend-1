import "server-only";

import { cookies } from "next/headers";
import { backendFetch, readBackendBody } from "@/lib/backend";

const ACCESS_COOKIE = "frontend_one_access_token";
const REFRESH_COOKIE = "frontend_one_refresh_token";
const REMEMBER_COOKIE = "frontend_one_remember_session";
const FIFTEEN_MINUTES = 15 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  ...(maxAge ? { maxAge } : {}),
});

export async function storeTokenPair(tokens, remember = false) {
  const cookieStore = await cookies();
  const accessOptions = remember ? cookieOptions(FIFTEEN_MINUTES) : cookieOptions();
  const refreshOptions = remember ? cookieOptions(THIRTY_DAYS) : cookieOptions();

  cookieStore.set(ACCESS_COOKIE, tokens.accessToken, accessOptions);
  cookieStore.set(REFRESH_COOKIE, tokens.refreshToken, refreshOptions);

  if (remember) {
    cookieStore.set(REMEMBER_COOKIE, "true", cookieOptions(THIRTY_DAYS));
  } else {
    cookieStore.delete(REMEMBER_COOKIE);
  }
}

export async function clearTokenPair() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  cookieStore.delete(REMEMBER_COOKIE);
}

async function rotateTokenPair(cookieStore) {
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  const remember = cookieStore.has(REMEMBER_COOKIE);

  if (!refreshToken) {
    return null;
  }

  const response = await backendFetch("/api/v1/test1/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  const data = await readBackendBody(response);

  if (!response.ok || !data.accessToken || !data.refreshToken) {
    cookieStore.delete(ACCESS_COOKIE);
    cookieStore.delete(REFRESH_COOKIE);
    return null;
  }

  cookieStore.set(
    ACCESS_COOKIE,
    data.accessToken,
    remember ? cookieOptions(FIFTEEN_MINUTES) : cookieOptions(),
  );
  cookieStore.set(
    REFRESH_COOKIE,
    data.refreshToken,
    remember ? cookieOptions(THIRTY_DAYS) : cookieOptions(),
  );

  return data.accessToken;
}

export async function authenticatedBackendFetch(path, options = {}) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  if (!accessToken) {
    accessToken = await rotateTokenPair(cookieStore);
  }

  if (!accessToken) {
    return new Response(JSON.stringify({ message: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const request = () =>
    backendFetch(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

  let response = await request();

  if (response.status === 401) {
    accessToken = await rotateTokenPair(cookieStore);

    if (accessToken) {
      response = await request();
    }
  }

  return response;
}
