import { backendFetch, backendUnavailable, readBackendBody } from "@/lib/backend";
import { storeTokenPair } from "@/lib/auth";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const response = await backendFetch("/api/v1/test1/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await readBackendBody(response);

    if (!response.ok) {
      return Response.json(data, { status: response.status });
    }

    await storeTokenPair(data);

    return Response.json({ message: data.message, user: data.user }, { status: 201 });
  } catch (error) {
    return backendUnavailable(error);
  }
}
