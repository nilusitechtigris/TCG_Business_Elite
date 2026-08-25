import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardDetailPage } from '@/components/card-detail-page';
import { getCard, getVideo, youtubeContent } from '@/lib/data';

export function generateStaticParams() {
  return youtubeContent.map((video) => ({ code: video.youtubeId }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const video = getVideo(code);
  const card = video ? getCard(video.associatedCards[0]) : undefined;
  if (!video || !card) return {};
  const title = `${video.title} — Card details | TCG Business Elite`;
  const description = `You found the card from the Short. See ${card.player}, ${card.title}, both sides, set details and market-data confidence.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: video.thumbnail, alt: video.title }] },
    twitter: { card: 'summary_large_image', title, description, images: [video.thumbnail] },
  };
}

export default async function ShortLandingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const video = getVideo(code);
  const card = video ? getCard(video.associatedCards[0]) : undefined;
  if (!video || !card) notFound();
  return <CardDetailPage card={card} sourceVideo={video} />;
}
