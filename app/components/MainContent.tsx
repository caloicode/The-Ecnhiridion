'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRouter, useParams } from 'next/navigation';

type Props = {
  chapters: {
    id: number;
    chapter: string;
    title: string;
    content: string;
  }[];
  translator: {
    name: string;
    year: number;
  };
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

export default function MainContent({
  chapters,
  translator,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const currentChapter = chapters[currentIndex];
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { translator: translatorSlug, chapter: chapterParam } = useParams();

  // Scroll to top of content when chapter changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  useEffect(() => {
    const chapterId = chapters[currentIndex]?.id;
    const expectedPath = `/${translatorSlug}/${chapterId}`;
    
    if (typeof window !== 'undefined' && window.location.pathname !== expectedPath) {
      window.history.replaceState(null, '', expectedPath);
    }
  }, [currentIndex, chapters, translatorSlug]);
  
  

  const nextChapter = () => {
    const nextIndex = (currentIndex + 1) % chapters.length;
    setCurrentIndex(nextIndex);
  };

  const prevChapter = () => {
    const prevIndex = currentIndex === 0 ? chapters.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="max-w-screen-md w-full flex flex-col items-center gap-4">
        {/* Chapter Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-center">
          {currentChapter.chapter}. {currentChapter.title}
        </h2>

        {/* Translator Info */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center -mt-2 md:mt-0">
          Translation by: {translator.name} ({translator.year})
        </p>

        {/* Nav Buttons */}
        <div className="flex justify-between items-center gap-6 mt-2">
          <button
            onClick={prevChapter}
            className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
            aria-label="Previous Chapter"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
          <button
            onClick={nextChapter}
            className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
            aria-label="Next Chapter"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Content Card */}
        <div
          ref={contentRef}
          className="bg-white dark:bg-zinc-800 shadow rounded-lg max-w-full md:max-w-[30vw] w-full max-h-[60vh] overflow-y-auto p-4"
        >
          <div
            className="prose dark:prose-invert prose-sm"
            dangerouslySetInnerHTML={{
              __html: currentChapter.content,
            }}
          />
        </div>
      </div>
    </div>
  );
}
