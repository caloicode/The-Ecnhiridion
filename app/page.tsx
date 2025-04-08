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
    <main
      className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-800 dark:text-gray-100 transition-colors bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
      }}
    >
      <div className="flex flex-col items-center text-center w-full max-w-xl p-6 transition-all">
        {/* Circular Logo */}
        <Image
          src="/logo.png"
          alt="Enchiridion Logo"
          width={100}
          height={100}
          className="mb-4"
          priority
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">The Enchiridion</h1>

        {/* Description */}
        <p className="mb-8 text-sm md:text-lg text-gray-700 dark:text-gray-300">
          A short handbook of Stoic ethical advice compiled by Arrian, based on
          the teachings of Epictetus, a former slave turned influential Greek
          philosopher. Its insights emphasize resilience, self-control, and the
          importance of living in harmony with nature and reason.
        </p>

        {/* Section Title */}
        <h2 className="text-xl font-semibold mb-4">Explore Translations:</h2>

        {/* Translations as Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {(translations as Translation[]).map((t) => (
            <Link
              key={t.link}
              href={`/${t.link}/1`}
              className="px-4 py-2 rounded bg-[#455045] text-[#EFEDDD] hover:bg-[#5a645a] transition text-center"
            >
              {t.author} ({t.year})
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
