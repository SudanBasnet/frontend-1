export const emptyEditor = {
  title: "",
  content: "",
  tags: "",
  status: "draft",
};

export function createEditorFromPost(post) {
  return {
    title: post.title,
    content: post.content,
    tags: (post.tags || []).join(", "),
    status: post.status,
  };
}

export function createPostPayload(editor) {
  return {
    ...editor,
    tags: editor.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

export function getDashboardStats(posts) {
  const published = posts.filter((post) => post.status === "published").length;
  const tags = new Set(posts.flatMap((post) => post.tags || [])).size;

  return [
    { label: "All posts", value: posts.length, accent: "bg-blue-500" },
    { label: "Published", value: published, accent: "bg-emerald-500" },
    {
      label: "Drafts",
      value: posts.length - published,
      accent: "bg-violet-500",
    },
    { label: "Unique tags", value: tags, accent: "bg-amber-500" },
  ];
}

export function filterPosts(posts, query, statusFilter) {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const searchableText = [post.title, post.content, ...(post.tags || [])]
      .join(" ")
      .toLowerCase();

    return (
      matchesStatus &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  });
}

export function formatPostDate(value) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
