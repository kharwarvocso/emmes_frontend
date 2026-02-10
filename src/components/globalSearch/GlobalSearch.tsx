import { IoSearchOutline } from "react-icons/io5";

export default function GlobalSearch({ onActivate }: { onActivate?: () => void }) {
  return (
    <form className="hidden w-full max-w-md items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100 md:flex">
      <IoSearchOutline className="text-zinc-400" />
      <input
        type="text"
        placeholder="Search posts"
        className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
        onFocus={onActivate}
        onClick={onActivate}
        onChange={onActivate}
      />
    </form>
  );
}
