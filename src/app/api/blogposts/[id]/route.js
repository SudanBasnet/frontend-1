import { authenticatedBackendFetch } from "@/lib/auth";
import { backendFetch, backendUnavailable } from "@/lib/backend";
import { forwardBackendResponse } from "@/lib/routeResponse";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const response = await backendFetch(`/api/v1/blogposts/${id}`);
    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const response = await authenticatedBackendFetch(`/api/v1/blogposts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
    });

    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    const response = await authenticatedBackendFetch(`/api/v1/blogposts/${id}`, {
      method: "DELETE",
    });

    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}
