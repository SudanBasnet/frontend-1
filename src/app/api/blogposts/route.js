import { authenticatedBackendFetch } from "@/lib/auth";
import { backendFetch, backendUnavailable } from "@/lib/backend";
import { forwardBackendResponse } from "@/lib/routeResponse";

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const mine = searchParams.get("mine") === "true";
    const publicFilters = new URLSearchParams();

    for (const key of ["q", "tag"]) {
      for (const value of searchParams.getAll(key)) {
        publicFilters.append(key, value);
      }
    }

    const publicQuery = publicFilters.size
      ? `?${publicFilters.toString()}`
      : "";
    const response = mine
      ? await authenticatedBackendFetch("/api/v1/blogposts/mine")
      : await backendFetch(`/api/v1/blogposts${publicQuery}`);

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
