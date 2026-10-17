import { useEffect, useState } from "react";

function getPostsPath(query, selectedTag) {
  const params = new URLSearchParams();
  const normalizedQuery = query.trim();

  if (normalizedQuery) params.set("q", normalizedQuery);
  if (selectedTag) params.set("tag", selectedTag);

  return `/api/blogposts${params.size ? `?${params.toString()}` : ""}`;
}

export default function useCommunityPosts() {
  const [posts, setPosts] = useState(null);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTags() {
      try {
        const response = await fetch("/api/blogposts/tags", {
          signal: controller.signal,
        });
        const data = await response.json();

        if (response.ok) setTags(data.tags || []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setTags([]);
      }
    }

    loadTags();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(getPostsPath(query, selectedTag), {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load live posts.");
        }

        setPosts(data.posts || []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    const timeout = window.setTimeout(loadPosts, query ? 300 : 0);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query, selectedTag]);

  function clearFilters() {
    setQuery("");
    setSelectedTag("");
  }

  return {
    posts,
    tags,
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    isLoading,
    error,
    hasFilters: Boolean(query.trim() || selectedTag),
    clearFilters,
  };
}
