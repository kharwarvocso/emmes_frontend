"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

interface NavItem {
  id: number | string;
  label: string;
  href: string;
  subNav?: NavItem[];
  iconImage?: string;
}

interface MenuMobileProps {
  navItemsArray: NavItem[];
  onClose: () => void;
  activeItemId: string | null;
}

const MenuMobile: React.FC<MenuMobileProps> = ({
  navItemsArray,
  onClose,
  activeItemId,
}) => {
  return (
    <ul className="flex w-full flex-col bg-white">
      {navItemsArray.map((item) => (
        <SingleNavItem
          key={item.id}
          item={item}
          onClose={onClose}
          activeItemId={activeItemId}
        />
      ))}
    </ul>
  );
};

interface SingleNavItemProps {
  item: NavItem;
  onClose: () => void;
  activeItemId: string | null;
}

const SingleNavItem: React.FC<SingleNavItemProps> = ({
  item,
  onClose,
  activeItemId,
}) => {
  const [isItemOpen, setItemOpen] = useState(false);

  const toggleItem = () => {
    setItemOpen(!isItemOpen);
  };

  return (
    <>
      <div>
        <div className="flex w-full items-center justify-between border-b border-zinc-200">
          <Link
            href={item.href ?? "#"}
            className={`relative flex justify-between px-5 py-3 text-base transition-all hover:bg-sky-50 hover:text-sky-700 ${
              activeItemId === item.id.toString() ? "text-sky-600" : "text-zinc-800"
            }`}
            onClick={() => {
              onClose();
            }}
          >
            {item.label}
          </Link>
          {item?.subNav && item.subNav?.length !== 0 && (
            <IoIosArrowDown
              className={`mr-5 transition-transform ${isItemOpen ? "rotate-180" : "rotate-0"}`}
              onClick={() => {
                if (item.subNav && item.subNav.length > 0) {
                  toggleItem();
                } else {
                  onClose(); // Close the menu if there are no subnav items
                }
              }}
            />
          )}
        </div>

        {isItemOpen && item.subNav && (
          <div className="z-10 flex w-full flex-col gap-1 bg-zinc-50 pl-6">
            {item.subNav.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href ?? "#"}
                onClick={() => {
                  onClose(); // Close the menu when a subnav item is clicked
                }}
                className={`flex cursor-pointer items-center border-b border-zinc-200 py-2 pl-5 text-base capitalize transition-colors hover:bg-sky-50 hover:text-sky-700 ${
                  activeItemId === subItem.id.toString() ? "text-sky-600" : "text-zinc-700"
                }`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuMobile;
