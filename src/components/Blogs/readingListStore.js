export const READING_LIST_STORAGE_KEY = "frontend-one-reading-list";
export const READING_LIST_CHANGE_EVENT = "frontend-one-reading-list-change";

const EMPTY_READING_LIST = Object.freeze([]);
const MAX_SAVED_ARTICLES = 50;

let cachedValue = null;
let cachedReadingList = EMPTY_READING_LIST;

function normalizeReadingList(value) {
  if (!Array.isArray(value)) return EMPTY_READING_LIST;

  const seen = new Set();

  return value
    .filter((item) => {
      if (
        !item ||
        typeof item.href !== "string" ||
        typeof item.title !== "string" ||
        !item.href.startsWith("/blogs/") ||
        !item.title.trim() ||
        seen.has(item.href)
      ) {
        return false;
      }

      seen.add(item.href);
      return true;
    })
    .slice(0, MAX_SAVED_ARTICLES)
    .map((item) => ({
      href: item.href,
      title: item.title.trim().slice(0, 200),
      source: item.source === "Community post" ? "Community post" : "Curated article",
    }));
}

export function getReadingListSnapshot() {
  if (typeof window === "undefined") return EMPTY_READING_LIST;

  let value;

  try {
    value = window.localStorage.getItem(READING_LIST_STORAGE_KEY) || "";
  } catch {
    return EMPTY_READING_LIST;
  }

  if (value === cachedValue) return cachedReadingList;

  try {
    cachedReadingList = normalizeReadingList(value ? JSON.parse(value) : []);
  } catch {
    cachedReadingList = EMPTY_READING_LIST;
  }

  cachedValue = value;
  return cachedReadingList;
}

export function getReadingListServerSnapshot() {
  return EMPTY_READING_LIST;
}

export function subscribeToReadingList(onStoreChange) {
  function handleStorage(event) {
    if (event.key === READING_LIST_STORAGE_KEY || event.key === null) {
      cachedValue = null;
      onStoreChange();
    }
  }

  function handleLocalChange() {
    onStoreChange();
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(READING_LIST_CHANGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(READING_LIST_CHANGE_EVENT, handleLocalChange);
  };
}

export function writeReadingList(items) {
  const nextReadingList = normalizeReadingList(items);
  const nextValue = JSON.stringify(nextReadingList);

  window.localStorage.setItem(READING_LIST_STORAGE_KEY, nextValue);
  cachedValue = nextValue;
  cachedReadingList = nextReadingList;
  window.dispatchEvent(new Event(READING_LIST_CHANGE_EVENT));
}
