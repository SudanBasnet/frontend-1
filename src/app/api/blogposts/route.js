import { authenticatedBackendFetch } from "@/lib/auth";
import { backendFetch, backendUnavailable } from "@/lib/backend";
import { forwardBackendResponse } from "@/lib/routeResponse";

export async function GET(request) {
  try {
    const mine = new URL(request.url).searchParams.get("mine") === "true";
    const response = mine
      ? await authenticatedBackendFetch("/api/v1/blogposts/mine")
      : await backendFetch("/api/v1/blogposts");

    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}

export async function POST(request) {
  try {
    const response = await authenticatedBackendFetch("/api/v1/blogposts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
    });

    return forwardBackendResponse(response);
  } catch (error) {
    return backendUnavailable(error);
  }
}
