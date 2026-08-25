import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'TCG Business Elite — The story behind every card',
  description: 'Explore the cards featured on TCG Business Elite, with verified details, condition notes and source-led market history.',
  icons: { icon: '/og.png' },
  openGraph: {
    title: 'TCG Business Elite',
    description: 'The story behind every card—complete collection records, connected Shorts and source-led market context.',
    type: 'website',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'TCG Business Elite — The story behind every card' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TCG Business Elite',
    description: 'The story behind every card.',
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
