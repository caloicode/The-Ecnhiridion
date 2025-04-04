'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';

export default function CarterPage() {
  const [data, setData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/enchiridion')
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  if (data.length === 0) return <div className="p-6">Loading...</div>;

  const chapters = data.map((entry) => ({
    id: entry.id,
    chapter: entry.chapter,
    title: entry.title,
    content: entry.translations.carter,
  }));

  const chapterList = chapters.map(({ id, chapter, title }) => ({
    id,
    chapter,
    title,
  }));

  const translator = {
    name: 'Elizabeth Carter',
    year: 1750,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar
        currentTranslation="carter"
        chapterList={chapterList}
        setCurrentIndex={setCurrentIndex}
      />
      <MainContent
        chapters={chapters}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        translator={translator}
      />
    </div>
  );
}
