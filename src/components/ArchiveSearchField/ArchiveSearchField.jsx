import SearchIcon from "@/components/Icons/SearchIcon";

export default function ArchiveSearchField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-400"
        />
      </span>
    </label>
  );
}
