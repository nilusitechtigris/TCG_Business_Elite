import type { Metadata } from 'next';
import { PrivacyAnalytics } from './components/PrivacyAnalytics';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tcg-business-elite-cards.yetikdd.chatgpt.site'),
  title: 'TCG Business Elite | Collection Value Tracker',
  description: 'A documented Dominik Szoboszlai football-card collection with transparent market-value tracking and source confidence.',
  openGraph: {
    title: 'TCG Business Elite',
    description: 'Collection Value Tracker',
    type: 'website',
    images: [{ url: '/og.png', width: 1744, height: 909, alt: 'TCG Business Elite — Collection Value Tracker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCG Business Elite',
    description: 'Collection Value Tracker',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<PrivacyAnalytics /></body></html>;
}
