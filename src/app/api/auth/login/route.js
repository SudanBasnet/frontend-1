import { backendFetch, backendUnavailable, readBackendBody } from "@/lib/backend";
import { storeTokenPair } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password, remember = false } = await request.json();
    const response = await backendFetch("/api/v1/test1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await readBackendBody(response);

    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }

    await storeTokenPair(data, remember);

    return Response.json({ message: data.message, user: data.user });
  } catch (error) {
    return backendUnavailable(error);
  }
}
