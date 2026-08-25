import { authenticatedBackendFetch } from "@/lib/auth";
import { backendUnavailable } from "@/lib/backend";
import { forwardBackendResponse } from "@/lib/routeResponse";

export async function POST(request) {
  try {
    const response = await authenticatedBackendFetch("/api/v1/gallery/upload", {
      method: "POST",
      body: await request.formData(),
    });

    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}
