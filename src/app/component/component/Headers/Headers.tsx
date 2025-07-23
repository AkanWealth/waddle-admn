"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SVGAssets from "@/assets/assets/svg";

interface HeaderProps {
  usedFor: "started" | "download";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = ({ usedFor }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white">
      <div className="flex items-center justify-between mx-4 md:mx-7 py-4">
        {/* Logo */}
        <Image src={SVGAssets.HomeLogo} alt="Home Logo" className="h-12 w-12" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center w-auto gap-[100px]">
          {/* Links */}
          <div className="flex items-center gap-6 text-[16px] text-[#303237]">
            <Link href="/">Home</Link>
            <Link href="/">About us</Link>
            <Link href="/">FAQs</Link>
            <Link href="/">Contact us</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4 font-semibold">
            <button className="bg-[#2853A6] flex items-center gap-2 px-4 py-2 rounded-[12px] text-white">
              <span>Download Waddle</span> <ArrowRight />
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="text-black" size={28} />
          ) : (
            <Menu className="text-black" size={28} />
          )}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white transition-all duration-300 z-50 md:hidden ${
          isMenuOpen ? "max-h-screen py-6" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-start gap-4 px-6">
          <Link
            href="/"
            className="text-[#303237] text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-[#303237] text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            About us
          </Link>
          <Link
            href="/"
            className="text-[#303237] text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQs
          </Link>
          <Link
            href="/"
            className="text-[#303237] text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
          </Link>
          <div className="flex flex-col gap-3 pt-4 w-full">
            <button className="bg-[#2853A6] flex items-center justify-center gap-2 px-4 py-2 rounded-[12px] text-white w-full">
              <span>Download Waddle</span> <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
