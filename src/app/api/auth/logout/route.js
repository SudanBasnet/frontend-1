import { clearTokenPair } from "@/lib/auth";

export async function POST() {
  await clearTokenPair();
  return Response.json({ message: "Signed out successfully" });
}
