"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import Portal from "./Portal";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Portal>
      <button
        className="fixed bottom-20 right-5 z-[999999] rounded-full border border-sky-200 bg-sky-50 p-3 text-sky-700 duration-300 hover:bg-sky-100 md:right-10"
        onClick={scrollToTop}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <FaArrowUp className="text-sky-700" />
      </button>
    </Portal>
  );
};

export default ScrollToTopButton;
