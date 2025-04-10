'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import MainContent from '@/app/components/MainContent';
import { useTranslatorContext } from '@/context/translator-context';
import Loader from '@/app/components/Loader'; // ✅ add this

const TRANSLATOR_MAP: Record<string, { name: string; year: number }> = {
  carter: { name: 'Elizabeth Carter', year: 1750 },
  higginson: { name: 'T.W. Higginson', year: 1865 },
  matheson: { name: 'P.E. Matheson', year: 1916 },
  walton: { name: 'Stephen Walton', year: 1997 },
};

export default function ChapterPage() {
  const { chapters } = useTranslatorContext();
  const { translator, chapter } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && chapter && chapters.length > 0) {
      const idx = chapters.findIndex((entry) => String(entry.id) === String(chapter));
      setCurrentIndex(idx >= 0 ? idx : 0);
      setInitialized(true);
    }
  }, [chapter, chapters, initialized]);

  const selectedTranslator = translator as keyof typeof TRANSLATOR_MAP;
  const translatorInfo = TRANSLATOR_MAP[selectedTranslator];

  const contentChapters = chapters.map((entry) => ({
    id: entry.id,
    chapter: entry.chapter,
    title: entry.title,
    content: entry.translations[selectedTranslator],
  }));

  const chapterList = contentChapters.map(({ id, chapter, title }) => ({
    id,
    chapter,
    title,
  }));

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-white/20 dark:bg-black/60 min-h-screen">
        <Navbar
          currentTranslation={selectedTranslator}
          chapterList={chapterList}
          setCurrentIndex={setCurrentIndex}
        />
        <MainContent
          chapters={contentChapters}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          translator={translatorInfo}
        />
      </div>
    </div>
  );
}
