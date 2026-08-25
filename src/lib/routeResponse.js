import "server-only";

import { readBackendBody } from "@/lib/backend";

export async function forwardBackendResponse(response) {
  const data = await readBackendBody(response);
  return Response.json(data, { status: response.status });
}
