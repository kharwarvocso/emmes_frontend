"use client";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Footer1 from "./footer/Footer1";
import Header1 from "./header/Header1/Header1";
import ScrollToTopButton from "../ScrollToTopButton";
import { usePathname, useRouter } from "next/navigation";
import Header2 from "./header/Header2/Header2";

export default function LayoutClient({ header1Data, header2Data, footerData, headerStyle = 1, footerStyle = 1, children }: any) {
  const upperNavItems = header1Data?.upperNav;
  const middleNavItems = header1Data?.middleNav;
  const lowerNavItems = header1Data?.lowerNav;

  const upperNavItems2 = header2Data?.upperNav;
  // Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [show, setShow] = useState<string>("translate-y-0");
  // Use refs to avoid effect churn from state changes during scroll
  const lastScrollYRef = useRef<number>(0);
  const isMobileMenuOpenRef = useRef<boolean>(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const [isSidebar, setSidebar] = useState(false);

  const [isSearchModal, setIsSearchModal] = useState<Boolean>(false);

  const controlNavbar = () => {
    if (typeof window === "undefined") return;
    const currentY = window.scrollY;
    if (currentY > 200) {
      if (currentY > lastScrollYRef.current && !isMobileMenuOpenRef.current) {
        setShow("-translate-y-[92px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    lastScrollYRef.current = currentY;
  };

  const getBasePath = (url: string) => {
    const urlSegments = url.split("/");
    return `/${urlSegments[1]}`;
  };
  useEffect(() => {
    const activeItem =
      upperNavItems.find((item: any) => item.href === getBasePath(pathname)) ||
      upperNavItems.find((item: any) => item.subNav?.some((subItem: { href: string }) => subItem.href === getBasePath(pathname)));
    if (activeItem) {
      setActiveItemId(activeItem.id.toString());
    } else {
      setActiveItemId(null);
    }
  }, [pathname, upperNavItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // keep ref in sync without causing effect re-run
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
    // Attach once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavItemClick = (itemId: string, href: string) => {
    setActiveItemId(itemId.toString());
    setIsMobileMenuOpen(false);
    isMobileMenuOpenRef.current = false;
    router.push(href);
  };

  return (
    <>
      {headerStyle == 1 && (
        <Header1
          show={show}
          handleMobileMenu={() => setIsMobileMenuOpen((pre) => !pre)}
          isMobileMenuOpen={isMobileMenuOpen}
          upperNavItems={upperNavItems}
          middleNavItems={middleNavItems}
          lowerNavItems={lowerNavItems}
          activeItemId={activeItemId}
          handleNavItemClick={handleNavItemClick}
          handleSearchModal={() => setIsSearchModal((pre) => !pre)}
          handleSidebar={() => setSidebar((pre) => !pre)}
          handleLogout={() => {}}
        />
      )}
      {headerStyle == 2 && (
        <Header2
          show={show}
          handleMobileMenu={() => setIsMobileMenuOpen((pre) => !pre)}
          isMobileMenuOpen={isMobileMenuOpen}
          upperNavItems={upperNavItems2}
          lowerNavItems={lowerNavItems}
          activeItemId={activeItemId}
          handleNavItemClick={handleNavItemClick}
          handleSearchModal={() => setIsSearchModal((pre) => !pre)}
          handleSidebar={() => setSidebar((pre) => !pre)}
          handleLogout={() => {}}
        />
      )}
      {isSearchModal && <Search handleSearchModal={() => setIsSearchModal(false)} />}
      <main className="h-[600vh]">{children}</main>
      {footerStyle == 1 && <Footer1 footerData={footerData} />}
      {isSidebar && <Sidebar isSidebar={isSidebar} handleSidebar={() => setSidebar((pre) => !pre)} />}
      <ScrollToTopButton />
    </>
  );
}

