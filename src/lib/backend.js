import "server-only";

const DEFAULT_BACKEND_URL = "http://localhost:8080";

export function getBackendUrl(path) {
  const baseUrl = (process.env.BACKEND_API_URL || DEFAULT_BACKEND_URL).replace(
    /\/$/,
    "",
  );

  return `${baseUrl}${path}`;
}

export async function backendFetch(path, options = {}) {
  return fetch(getBackendUrl(path), {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });
}

export async function readBackendBody(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export function backendUnavailable(error) {
  console.error("Unable to reach Backend-1", error);

  return Response.json(
    {
      message:
        "Backend-1 is unavailable. Start it on port 8080 or configure BACKEND_API_URL.",
    },
    { status: 503 },
  );
}
