import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function CartButton() {
  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1 rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
      aria-label="Cart"
    >
      <FiShoppingCart className="text-sm" />
      <span>Cart</span>
      <span className="absolute -right-2 -top-2 rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white">
        0
      </span>
    </Link>
  );
}
