import CommunityPost from "@/components/Blogs/CommunityPost";

export const metadata = {
  title: "Community article | Frontend One",
  description: "A published article served live by Backend-1.",
};

export default async function CommunityPostPage({ params }) {
  const { id } = await params;
  return <CommunityPost id={id} />;
}
