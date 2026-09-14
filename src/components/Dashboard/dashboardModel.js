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
  const publishRate = posts.length
    ? `${Math.round((published / posts.length) * 100)}% of your library`
    : "Start with your first story";

  return [
    {
      label: "All posts",
      value: posts.length,
      detail: "Across drafts and live stories",
      accent: "from-blue-500 to-cyan-400",
      icon: "posts",
    },
    {
      label: "Published",
      value: published,
      detail: publishRate,
      accent: "from-emerald-500 to-teal-400",
      icon: "published",
    },
    {
      label: "Drafts",
      value: posts.length - published,
      detail: "Ideas still in progress",
      accent: "from-violet-500 to-fuchsia-400",
      icon: "drafts",
    },
    {
      label: "Unique tags",
      value: tags,
      detail: "Topics in your collection",
      accent: "from-amber-500 to-orange-400",
      icon: "tags",
    },
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
