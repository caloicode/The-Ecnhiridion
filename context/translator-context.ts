'use client';

import { createContext, useContext } from 'react';

type ChapterEntry = {
  id: number;
  chapter: string;
  title: string;
  translations: Record<string, string>;
};

type TranslatorContextType = {
  chapters: ChapterEntry[];
};

export const TranslatorContext = createContext<TranslatorContextType>({
  chapters: [],
});

export const useTranslatorContext = () => useContext(TranslatorContext);
