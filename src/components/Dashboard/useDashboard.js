"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  createEditorFromPost,
  createPostPayload,
  emptyEditor,
  filterPosts,
  getDashboardStats,
} from "@/components/Dashboard/dashboardModel";

const readJson = (response) => response.json();

async function requestPosts(signal) {
  const response = await fetch("/api/blogposts?mine=true", { signal });
  const data = await readJson(response);

  if (!response.ok) {
    throw new Error(data.message || "Unable to load your posts.");
  }

  return data.posts || [];
}

export default function useDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editor, setEditor] = useState(emptyEditor);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const sessionResponse = await fetch("/api/auth/session");
        const session = await readJson(sessionResponse);

        if (sessionResponse.status === 401) {
          router.replace("/login");
          return;
        }

        if (!sessionResponse.ok) {
          throw new Error(session.message || "Unable to verify your session.");
        }

        if (!session.authenticated) {
          router.replace("/login");
          return;
        }

        if (active) setUser(session.user);

        const nextPosts = await requestPosts();

        if (active) {
          setPosts(nextPosts);
          setLastSyncedAt(new Date());
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  const stats = useMemo(() => getDashboardStats(posts), [posts]);
  const filteredPosts = useMemo(
    () => filterPosts(posts, query, statusFilter),
    [posts, query, statusFilter],
  );

  function updateEditor(event) {
    const { name, value } = event.target;
    setEditor((current) => ({ ...current, [name]: value }));
  }

  function editPost(post) {
    setEditingId(post._id);
    setEditor(createEditorFromPost(post));
    setMessage("");
    setError("");
    document.getElementById("post-editor")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetEditor() {
    setEditingId(null);
    setEditor(emptyEditor);
  }

  function startNewPost() {
    resetEditor();
    setMessage("");
    setError("");
    requestAnimationFrame(() => {
      document.getElementById("post-title")?.focus();
      document.getElementById("post-editor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function clearFilters() {
    setQuery("");
    setStatusFilter("all");
  }

  async function refreshPosts() {
    setIsRefreshing(true);
    setMessage("");
    setError("");

    try {
      const nextPosts = await requestPosts();
      setPosts(nextPosts);
      setLastSyncedAt(new Date());
      setMessage("Workspace refreshed.");
    } catch (refreshError) {
      setError(refreshError.message);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function savePost(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        editingId ? `/api/blogposts/${editingId}` : "/api/blogposts",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createPostPayload(editor)),
        },
      );
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data.message || "Unable to save the post.");
      }

      setPosts((current) =>
        editingId
          ? current.map((post) => (post._id === editingId ? data.post : post))
          : [data.post, ...current],
      );
      setMessage(editingId ? "Post updated." : "Post created.");
      setLastSyncedAt(new Date());
      resetEditor();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost(post) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    setDeletingId(post._id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/blogposts/${post._id}`, {
        method: "DELETE",
      });
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete the post.");
      }

      setPosts((current) => current.filter((item) => item._id !== post._id));
      if (editingId === post._id) resetEditor();
      setLastSyncedAt(new Date());
      setMessage("Post deleted.");
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setDeletingId(null);
    }
  }

  return {
    clearFilters,
    deletingId,
    deletePost,
    dismissError: () => setError(""),
    dismissMessage: () => setMessage(""),
    editPost,
    editingId,
    editor,
    error,
    filteredPosts,
    isLoading,
    isRefreshing,
    isSaving,
    lastSyncedAt,
    message,
    posts,
    query,
    refreshPosts,
    resetEditor,
    savePost,
    setError,
    setQuery,
    setStatusFilter,
    startNewPost,
    stats,
    statusFilter,
    updateEditor,
    user,
  };
}
