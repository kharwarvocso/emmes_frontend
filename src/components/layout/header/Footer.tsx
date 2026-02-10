"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import Wrapper from "@/components/Wrappers";
import TextWithLineBreak from "@/components/TextWithLineBreak";
import Logo from "@/components/Logo";

export default function Footer({ footerData }: any) {
  const links = footerData?.list1?.links ?? [];
  return (
    <Wrapper
      as="footer"
      containerClassName="w-full text-zinc-600"
      className="pt-5 md:pt-12"
      bgColor="bg-white"
    >
      <div className="flex flex-col items-center gap-6 border-b border-zinc-200 pb-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <Logo mode="light" />
          <p className="max-w-xl text-sm text-zinc-600">
            <TextWithLineBreak text={footerData?.text} />
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {links.map((link: any) => (
            <Link key={link?.href} href={link?.href} className="hover:text-sky-700">
              {link?.label}
            </Link>
          ))}
          <Link href="/privacy-policy" className="hover:text-sky-700">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-sky-700">
            Terms & Conditions
          </Link>
          <Link href="/contact" className="hover:text-sky-700">
            Contact
          </Link>
        </div>
      </div>
      {/* copyright  */}
      <div className="flex flex-col items-center justify-center gap-3 py-5">
        <p className="text-center text-sm">
          Copyright (c) {new Date().getFullYear()} <span className="font-medium">Blog</span>. All rights reserved. Designed and Developed by{" "}
          <Link target="_blank" className="font-medium hover:underline" href={"https://www.spritegenix.com/"}>
            Sprite Genix
          </Link>
          .{" "}
        </p>

        {/* Socials  */}
        {footerData?.socials && (
          <div className="flex items-center justify-center gap-3 text-3xl text-zinc-500">
            {footerData?.socials?.facebook && (
              <FaFacebook
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:text-sky-700"
                onClick={() => window.open(footerData?.socials?.facebook, "_blank")}
              />
            )}
            {footerData?.socials?.instagram && (
              <AiFillInstagram
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:text-sky-700"
                onClick={() => window.open(footerData?.socials?.instagram, "_blank")}
              />
            )}
            {footerData?.socials?.linkedin && (
              <FaLinkedinIn
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:text-sky-700"
                onClick={() => window.open(footerData?.socials?.linkedin, "_blank")}
              />
            )}
            {footerData?.socials?.youtube && (
              <TbBrandYoutubeFilled
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:text-sky-700"
                onClick={() => window.open(footerData?.socials?.youtube, "_blank")}
              />
            )}
            {footerData?.socials?.twitter && (
              <FaXTwitter
                className="social-icon cursor-pointer text-xl transition-all duration-300 hover:text-sky-700"
                onClick={() => window.open(footerData?.socials?.twitter, "_blank")}
              />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
