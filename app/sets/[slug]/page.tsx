import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards, sets } from '@/lib/data';

export function generateStaticParams() {
  return sets.map((set) => ({ slug: set.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const set = sets.find((item) => item.slug === slug);
  return set ? { title: `${set.name} | TCG Business Elite`, description: set.summary } : {};
}

export default async function SetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const set = sets.find((item) => item.slug === slug);
  if (!set) notFound();
  const setCards = cards.filter((card) => set.cardSlugs.includes(card.slug));
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="editorial-hero set-hero"><p className="eyebrow"><span /> Set / series record</p><h1>{set.name}</h1><p>{set.summary}</p></section>
      <section className="set-record content-section">
        <div className="set-facts"><div><span>Cards documented</span><b>{setCards.length}</b></div><div><span>Connected Shorts</span><b>{new Set(setCards.flatMap((card) => card.videoIds)).size}</b></div><div><span>Record status</span><b>Living index</b></div></div>
        <div className="related-grid">
          {setCards.map((card) => <Link href={`/cards/${card.slug}`} key={card.slug} style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.9), transparent), url('${card.image}')` }}><small>{card.recordId}</small><div><span>{card.year}</span><h3>{card.title}</h3><p>Open record →</p></div></Link>)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
