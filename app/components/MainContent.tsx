"use client";

import { useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";

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
  const { translator: translatorSlug } = useParams();

  // Scroll to top when chapter changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  // Update URL without reload
  useEffect(() => {
    const chapterId = chapters[currentIndex]?.id;
    const expectedPath = `/${translatorSlug}/${chapterId}`;
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== expectedPath
    ) {
      window.history.replaceState(null, "", expectedPath);
    }
  }, [currentIndex, chapters, translatorSlug]);

  const nextChapter = () => {
    const nextIndex = (currentIndex + 1) % chapters.length;
    setCurrentIndex(nextIndex);
  };

  const prevChapter = () => {
    const prevIndex =
      currentIndex === 0 ? chapters.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (clickX < width * 0.3) prevChapter();
    else if (clickX > width * 0.7) nextChapter();
  };

  return (
    <div className="flex justify-center items-center py-8 px-4">
      <div className="w-full max-w-[600px] flex flex-col items-center gap-4 relative">
        {/* Top Right Arrows */}
        <div className="absolute right-0 -top-6 flex gap-2 mb-2">
          <button
            onClick={prevChapter}
            className="p-1 rounded-full bg-gray-200/80 dark:bg-zinc-700/80 hover:bg-gray-300 dark:hover:bg-zinc-600 transition backdrop-blur-sm"
            aria-label="Previous Chapter"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
          <button
            onClick={nextChapter}
            className="p-1 rounded-full bg-gray-200/80 dark:bg-zinc-700/80 hover:bg-gray-300 dark:hover:bg-zinc-600 transition backdrop-blur-sm"
            aria-label="Next Chapter"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
        </div>

        {/* Chapter Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-center mt-4">
          {currentChapter.chapter}. {currentChapter.title}
        </h2>

        {/* Translator Info */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center -mt-2 md:mt-0">
          Translation by: {translator.name} ({translator.year})
        </p>

 {/* Content Card with Glass Effect and Max Height */}
<div
  ref={contentRef}
  onClick={handleContentClick}
  className="w-full max-h-[60vh] overflow-y-auto rounded-xl p-6 cursor-default border border-white/30 dark:border-zinc-600/30 bg-white/30 dark:bg-zinc-800/30 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl"
>
  <div
    className="prose dark:prose-invert prose-sm max-w-none"
    dangerouslySetInnerHTML={{ __html: currentChapter.content }}
  />
</div>

      </div>
    </div>
  );
}
