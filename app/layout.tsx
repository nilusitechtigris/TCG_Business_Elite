import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'My Szoboszlai Collection | TCG Business Elite',
  description: 'Track the Szoboszlai card collection, connect every record to its related videos, and organize acquisition costs and market evidence.',
  icons: { icon: '/og.png' },
  openGraph: {
    title: 'TCG Business Elite',
    description: 'A personal Szoboszlai card collection archive with connected Shorts and evidence-led investment tracking.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'TCG Business Elite — The story behind every card' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCG Business Elite',
    description: 'Track the cards. Connect the stories.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
