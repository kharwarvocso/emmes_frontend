import React from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const Menu = ({ navItemsArray, activeItemId, onItemClick }: any) => {
  return navItemsArray?.map((item: any, index: number) => (
    <li key={item?.id} className="group relative transition-all">
      <Link
        href={item?.href || "#"}
        className="relative flex cursor-pointer items-center gap-1 text-base text-zinc-600 hover:text-sky-700"
        onClick={() => onItemClick(item.id, item.href)}
      >
        <span className={`${item?.iconStyle && item?.iconStyle}`}>{item?.icon}</span>
        {item?.label === "Free Listing" && (
          <span className="absolute top-1 left-1/2 -translate-x-1/2 cursor-pointer bg-red-600 px-1 text-xs text-white">Firms</span>
        )}
        <span
          className={`relative cursor-pointer py-2 capitalize transition-colors ${
            activeItemId === item.id.toString() ? "text-sky-600" : ""
          }`}
        >
          {item?.label}
          <span
            className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-sky-600 transition-transform duration-300 ${
              activeItemId === item.id.toString() ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </span>
        {item?.subNav && item.subNav?.length !== 0 && <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />}
      </Link>
      {/* dropdown */}
      {item.subNav && (
        <div
          className={`animate-slide-up absolute ${index === navItemsArray.length - 1 ? "right-0" : "left-0"} top-[101%] z-30 hidden w-auto flex-col gap-1 rounded-lg border border-zinc-200 bg-white py-3 shadow-md group-hover:flex`}
        >
          {item.subNav.map((nav: any) => (
            <Link
              key={nav.id}
              href={nav.href || "#"}
              className={`flex cursor-pointer items-center py-1 pr-8 pl-2 text-sm text-zinc-700 transition hover:bg-sky-50 hover:text-sky-700 ${
                activeItemId === nav.id.toString() ? "text-sky-600" : ""
              }`}
              onClick={() => onItemClick(nav.id, nav.href)}
            >
              <span className="pl-3 whitespace-nowrap">{nav.label}</span>
            </Link>
          ))}
        </div>
      )}
    </li>
  ));
};

export default Menu;
