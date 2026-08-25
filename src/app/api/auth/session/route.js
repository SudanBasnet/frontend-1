import { authenticatedBackendFetch, clearTokenPair } from "@/lib/auth";
import { backendUnavailable, readBackendBody } from "@/lib/backend";

export async function GET() {
  try {
    const response = await authenticatedBackendFetch("/api/v1/test1/token");
    const data = await readBackendBody(response);

    if (!response.ok) {
      if (response.status === 401) {
        await clearTokenPair();
      }

      return Response.json(
        { authenticated: false, message: data.message },
        { status: response.status },
      );
    }

    return Response.json({ authenticated: true, user: data.user });
  } catch (error) {
    return backendUnavailable(error);
  }
}
