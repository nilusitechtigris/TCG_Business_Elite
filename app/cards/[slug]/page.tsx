import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardDetailPage } from '@/components/card-detail-page';
import { cards, getCard } from '@/lib/data';

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  const title = `${card.player} — ${card.title} | TCG Business Elite`;
  const description = `${card.year} ${card.set}. ${card.parallel}; ${card.condition}. View the complete collection record and linked Short.`;
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: card.image, alt: card.title }] },
    twitter: { card: 'summary_large_image', title, description, images: [card.image] },
  };
}

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();
  return <CardDetailPage card={card} />;
}
