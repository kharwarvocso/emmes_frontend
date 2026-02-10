"use client";
import { Fragment } from "react";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Logo from "@/components/Logo";
import Wrapper from "@/components/Wrappers";
export default function Header({
  show,
  handleMobileMenu,
  closeMobileMenu,
  isMobileMenuOpen,
  upperNavItems,
  middleNavItems,
  lowerNavItems,
  activeItemId,
  handleNavItemClick,
  handleSearchModal,
  handleSidebar,
}: any) {
  const safeUpperNav = upperNavItems ?? [];
  const safeMiddleNav = middleNavItems ?? [];
  const safeLowerNav = lowerNavItems ?? [];

  return (
    <header className={`fixed top-0 z-50 w-full border-b border-zinc-200 bg-white transition-transform duration-300 ${show}`}>
      {/* Desktop Section */}
      {/* Upper Nav  */}
      {safeUpperNav.length > 0 && (
        <Wrapper
          bgColor="bg-white"
          as="nav"
          className="item-center flex w-full gap-2 py-2 text-xs text-zinc-500 max-md:hidden"
        >
          {safeUpperNav.map((item: any, index: number) => (
            <Fragment key={item.id}>
              <a href={item.href ?? item.url} className="flex items-center gap-1 hover:text-sky-700">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
              {index < safeUpperNav.length - 1 && <span className="mx-2">|</span>}
            </Fragment>
          ))}
        </Wrapper>
      )}
      {/* middle Nav  */}
      <Wrapper
        bgColor="bg-white"
        containerClassName="border-b border-zinc-200"
        className="grid w-full items-center gap-4 py-6 max-md:hidden md:grid-cols-3"
      >
        <div className="flex items-center justify-start">
          <Logo />
        </div>
        <div />
        <div className="flex items-center justify-start">
          <ul className="hidden items-center gap-x-6 font-bold md:flex">
            <Menu navItemsArray={safeMiddleNav} activeItemId={activeItemId} onItemClick={handleNavItemClick} />
          </ul>
        </div>
      </Wrapper>
      {/* Lower Nav  */}
      {safeLowerNav.length > 0 && (
        <Wrapper bgColor="bg-white" containerClassName="border-b border-zinc-200" className="max-md:hidden">
          <ul className="text- hidden items-center gap-x-2 font-medium md:flex">
            <Menu navItemsArray={safeLowerNav} activeItemId={activeItemId} onItemClick={handleNavItemClick} />
          </ul>
        </Wrapper>
      )}
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper
        bgColor="bg-white"
        containerClassName="border-b border-zinc-200"
        className="flex w-full items-center justify-between gap-1 py-4 md:hidden"
      >
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-2">
          {/* HamMenu Icon  */}
          <HamIcon isMobileMenuOpen={isMobileMenuOpen} handleMobileMenu={handleMobileMenu} />
        </div>
      </Wrapper>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full md:hidden">
          <MenuMobile navItemsArray={safeUpperNav} onClose={closeMobileMenu} activeItemId={activeItemId} />
          <MenuMobile navItemsArray={safeLowerNav} onClose={closeMobileMenu} activeItemId={activeItemId} />
        </div>
      )}
    </header>
  );
}

function HamIcon({ isMobileMenuOpen, handleMobileMenu }: any) {
  return (
    <button className={`navbar-toggle-btn ${isMobileMenuOpen ? "open" : ""}`} type="button" onClick={handleMobileMenu}>
      <span />
      <span />
      <span />
      <span />
    </button>
  );
}
