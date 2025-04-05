"use client";

import Image from "next/image";
import Link from "next/link";
import translations from "@/data/translations.json";

type Translation = {
  author: string;
  year: number;
  source: string;
  link: string; // this should now be just 'carter', 'higginson', etc.
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-800 dark:text-gray-100 transition-colors">
      <div className="flex flex-col items-center text-center px-4">
        {/* Circular Logo */}
        <Image
          src="https://placehold.co/200x200.png?text=Enchiridion"
          alt="Enchiridion Logo"
          width={200}
          height={200}
          className="rounded-full mb-4"
          priority // ✅ this fixes the LCP warning
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">The Enchiridion</h1>

        {/* Description */}
        <p className="max-w-xl mb-8 text-lg">
          A short manual of Stoic ethical advice compiled by Arrian, based on
          the teachings of the Greek philosopher Epictetus.
        </p>

        {/* Section Title */}
        <h2 className="text-xl font-semibold mb-4">Explore Translations:</h2>

        {/* Translations as Buttons */}
        <div className="flex flex-col gap-3">
          {(translations as Translation[]).map((t) => (
            <Link
              key={t.link}
              href={`/${t.link}/1`} // ✅ Add chapter 1 to make it a clickable route
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              {t.author} ({t.year})
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
