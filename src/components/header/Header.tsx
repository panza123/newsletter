"use client";
import React, { useState } from "react";
import navHeader from "./index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";

interface Blog {
  id: number;
  title: string;
  path: string;
}

export default function Header() {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);

  function handleClick() {
    setNav(!nav);
  }

  return (
    <header className="w-full h-20 bg-blue-950 text-white px-6 py-2 flex justify-between items-center relative">
      <h1 className="uppercase text-2xl lg:text-4xl font-semibold">
        panza <span className="text-red-500">news</span>
      </h1>
      <div className="hidden lg:flex gap-4 ">
        {" "}
        {/* Hide on small screens */}
        {navHeader.map((nav: Blog) => (
          <Link
            href={nav.path}
            key={nav.id}
            passHref
            className={pathname === nav.path ? "underline" : ""}
          >
            {nav.title}
          </Link>
        ))}
      </div>
      {/* Toggle button */}
      <button
        className="cursor-pointer z-20 block lg:hidden"
        onClick={handleClick}
      >
        {!nav ? (
          <CiMenuBurger size={30} className="text-black" />
        ) : (
          <FaTimes size={30} className="text-black" />
        )}
      </button>
      {/* Toggle menu display - Hamburger menu */}
      <menu
        className={
          nav
            ? "absolute top-20 right-0 px-4  pt-5 w-full h-[200px] lg:hidden bg-black  z-10"
            : "hidden"
        }
        onClick={handleClick}
      >
        <div className="flex flex-col gap-3">
          {navHeader.map((nav: Blog) => (
            <Link
              href={nav.path}
              key={nav.id}
              passHref
              className={pathname === nav.path ? "underline" : ""}
            >
              {nav.title}
            </Link>
          ))}
        </div>
      </menu>
    </header>
  );
}
