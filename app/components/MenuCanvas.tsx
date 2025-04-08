'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

type Props = {
  onClose: () => void;
  currentTranslation: string;
  chapterList: { id: number; chapter: string; title: string }[];
  setCurrentIndex: (index: number) => void;
};

const translations = [
  { label: 'Elizabeth Carter', slug: 'carter' },
  { label: 'T.W. Higginson', slug: 'higginson' },
  { label: 'P.E. Matheson', slug: 'matheson' },
  { label: 'Stephen Walton', slug: 'walton' },
];

export default function MenuCanvas({
  onClose,
  currentTranslation,
  chapterList,
  setCurrentIndex,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeout(() => setVisible(true), 10);

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        triggerClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
  };

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-20 flex justify-end">
      <div
        ref={ref}
        className={`w-72 h-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white p-6 flex flex-col transition-transform duration-300 transform ${
          visible && !closing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={triggerClose} aria-label="Close">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Translations dropdown */}
        <div className="mb-6">
          <h3 className="font-medium text-sm mb-1">Translations:</h3>
          <select
            className="w-full p-2 rounded border dark:bg-zinc-800"
            value={currentTranslation}
            onChange={(e) => {
              router.push(`/${e.target.value}/1`);
              triggerClose();
            }}
          >
            {translations.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Chapter list */}
        <div className="overflow-y-auto flex-1 no-scrollbar">
          <h3 className="font-medium text-sm mb-2">Chapter List:</h3>
          <ul className="space-y-2 text-sm pr-1">
            {chapterList.map((chapter, index) => (
              <li key={chapter.id}>
                <button
                  onClick={() => {
                    setCurrentIndex(index);
                    triggerClose();
                  }}
                  className="w-full text-left block p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  <div className="border-b pb-1 border-gray-200 dark:border-zinc-700">
                    {chapter.chapter}: {chapter.title}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Dark mode toggle */}
        <div className="mt-2">
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 dark:hidden" />
            <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 hidden dark:inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
