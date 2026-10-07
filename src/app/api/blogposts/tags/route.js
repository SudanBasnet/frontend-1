import { backendFetch, backendUnavailable } from "@/lib/backend";
import { forwardBackendResponse } from "@/lib/routeResponse";

export async function GET() {
  try {
    const response = await backendFetch("/api/v1/blogposts/tags");
    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}
