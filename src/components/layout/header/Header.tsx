import { IoSearchOutline } from "react-icons/io5";
import { Fragment } from "react";
import Menu from "./Menu";
import MenuMobile from "../MenuMobile";
import AuthButton from "./AuthButton";
import CartButton from "@/components/layout/header/CartButton";
import Logo from "@/components/Logo";
import Wrapper from "@/components/Wrappers";
import GlobalSearch from "@/components/globalSearch/GlobalSearch";
export default function Header({
  show,
  handleMobileMenu,
  isMobileMenuOpen,
  upperNavItems,
  middleNavItems,
  lowerNavItems,
  activeItemId,
  handleNavItemClick,
  handleSearchModal,
  handleSidebar,
}: any) {
  return (
    <header className={`bg-primary-50 fixed top-0 z-50 w-full transition-transform duration-300 md:h-20 ${show}`}>
      {/* Desktop Section */}
      {/* Upper Nav  */}
      <Wrapper bgColor="bg-primary" as="nav" className="item-center flex w-full gap-2 py-1.5 text-xs text-white max-md:hidden">
        {upperNavItems?.map((item: any, index: number) => (
          <Fragment key={item.id}>
            <a href={item.url} className="flex items-center gap-1 hover:underline">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
            {index < middleNavItems.length && <span className="mx-2">|</span>}
          </Fragment>
        ))}
      </Wrapper>
      {/* middle Nav  */}
      <Wrapper bgColor="bg-primary-50" className="flex w-full items-center justify-between py-2 max-md:hidden">
        {/* Logo with Link */}
        <Logo />
        <GlobalSearch />
        <div className="flex items-center gap-2 md:gap-4">
          <ul className="hidden items-center gap-x-5 font-medium md:flex">
            <Menu navItemsArray={middleNavItems} activeItemId={activeItemId} onItemClick={handleNavItemClick} />
          </ul>
          <CartButton />
          <AuthButton />
        </div>
      </Wrapper>
      {/* Lower Nav  */}
      <Wrapper bgColor="bg-white" containerClassName="border-b border-t border-zinc-200" className="max-md:hidden">
        <ul className="text- hidden items-center gap-x-2 font-medium md:flex">
          <Menu navItemsArray={lowerNavItems} activeItemId={activeItemId} onItemClick={handleNavItemClick} />
        </ul>
      </Wrapper>
      {/* -------------------------------------  */}
      {/* Mobile Section */}
      <Wrapper className="flex w-full items-center justify-between gap-1 py-2 md:hidden">
        {/* Logo with Link */}
        <Logo />
        <div className="flex items-center gap-x-2">
          {/* Search Icon  */}
          <button className="hover:text-primary text-3xl duration-300" onClick={handleSearchModal}>
            <IoSearchOutline />
          </button>
          <AuthButton />
          {/* HamMenu Icon  */}
          <HamIcon isMobileMenuOpen={isMobileMenuOpen} handleMobileMenu={handleMobileMenu} />
        </div>
      </Wrapper>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full md:hidden">
          <MenuMobile navItemsArray={upperNavItems} setIsMobileMenuOpen={handleMobileMenu} activeItemId={activeItemId} />
          <MenuMobile navItemsArray={lowerNavItems} setIsMobileMenuOpen={handleMobileMenu} activeItemId={activeItemId} />
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