import { IoSearchOutline } from "react-icons/io5";

export default function GlobalSearch() {
  return (
    <form className="hidden w-full max-w-md items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm md:flex">
      <IoSearchOutline className="text-zinc-400" />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent text-sm text-zinc-700 focus:outline-none"
      />
    </form>
  );
}
