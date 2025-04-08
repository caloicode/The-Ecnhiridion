"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import MenuCanvas from "./MenuCanvas";
import Image from "next/image";
import Link from "next/link";

type Props = {
  currentTranslation: string;
  chapterList: { id: number; chapter: string; title: string }[];
  setCurrentIndex: (index: number) => void; // ✅ added
};

export default function Navbar({
  currentTranslation,
  chapterList,
  setCurrentIndex, // ✅ included
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-900 shadow z-10 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            The Enchiridion
          </h1>
        </Link>
        <button onClick={() => setShowMenu(true)} aria-label="Open Menu">
          <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </nav>

      {showMenu && (
        <MenuCanvas
          onClose={() => setShowMenu(false)}
          currentTranslation={currentTranslation}
          chapterList={chapterList}
          setCurrentIndex={setCurrentIndex} // ✅ passed down
        />
      )}
    </>
  );
}
