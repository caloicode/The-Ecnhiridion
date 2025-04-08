// app/layout.tsx
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Enchiridion',
  description:
    'A short manual of Stoic ethical advice by Epictetus. Explore multiple translations of this timeless Stoic handbook.',
  openGraph: {
    title: 'The Enchiridion',
    description:
      'A short manual of Stoic ethical advice by Epictetus. Explore multiple translations of this timeless Stoic handbook.',
    url: 'https://yourdomain.com',
    siteName: 'The Enchiridion',
    images: [
      {
        url: '/thumbnail.png', // place in public/thumbnail.png
        width: 1200,
        height: 630,
        alt: 'The Enchiridion – Stoic Handbook',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Enchiridion',
    description:
      'A short manual of Stoic ethical advice by Epictetus. Explore multiple translations of this timeless Stoic handbook.',
    images: ['/thumbnail.png'],
    creator: '@your_twitter_handle', // optional
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
