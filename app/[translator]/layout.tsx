'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TranslatorContext } from '@/context/translator-context';

export default function TranslatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { translator } = useParams();
  const router = useRouter();
  const [chapters, setChapters] = useState<any[]>([]);
  const [hasFetched, setHasFetched] = useState(false); // ✅

  useEffect(() => {
    if (hasFetched || !translator) return;

    fetch('/api/enchiridion')
      .then((res) => res.json())
      .then((json) => {
        if (
          !json?.data ||
          !json.data[0]?.translations?.[translator as string]
        ) {
          router.replace('/carter/1');
          return;
        }

        setChapters(json.data);
        setHasFetched(true); // ✅ Prevent re-fetch
      });
  }, [hasFetched, translator, router]); // ✅ depend only on hasFetched and translator

  if (!hasFetched || chapters.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <TranslatorContext.Provider value={{ chapters }}>
      {children}
    </TranslatorContext.Provider>
  );
}
