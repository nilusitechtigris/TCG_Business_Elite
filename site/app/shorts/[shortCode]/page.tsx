import type { Metadata } from 'next';
import { CardInspector } from '../../components/CardInspector';
import { DataChart } from '../../components/DataChart';
import { Footer, Header } from '../../components/Header';
import { cards } from '../../data';
import { money, valueCard } from '../../valuation';

export function generateStaticParams() { return [{ shortCode: 'deco-red-07-10' }]; }
export const metadata: Metadata = { title: 'Short Campaign Preview | TCG Business Elite', description: 'A mobile-first card landing page for TCG Business Elite YouTube Shorts.', openGraph: { images: [] }, twitter: { images: [] } };

export default async function ShortPage({ params }: { params: Promise<{ shortCode: string }> }) {
  const code = (await params).shortCode;
  const card = cards[0];
  const valuation = valueCard(card);
  const isPreview = code === 'deco-red-07-10';
  return <main className="short-page"><Header />
    <section className="short-landing">
      <div className="short-copy"><p className="eyebrow"><span /> {isPreview ? 'Campaign preview' : 'Campaign not published'} · {code}</p><h1>The <em>07/10</em><br />Topps Deco.</h1><p>2024 · Liverpool FC · Red frame<br /><span>Official parallel name not confirmed</span></p><div className="short-value"><span>Model estimate · {valuation.currency}</span><strong>{money(valuation.estimate)}</strong><small>Range {money(valuation.low)} – {money(valuation.high)} · {valuation.confidence}% confidence, no confirmed sale yet.</small><div className="confidence-meter"><i style={{ width: `${valuation.confidence}%` }} /></div></div><div className="hero-actions"><a className="button-primary" href={`/cards/${card.slug}`} data-track="card-page-from-short">Complete card page <span>↗</span></a><a className="text-link" data-track="youtube-return-click" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div></div>
      <div className="short-card"><CardInspector card={card} priority /></div>
    </section>
    <section className="short-data"><div className="detail-section-head"><div><p className="eyebrow"><span /> Value timeline</p><h2>Evidence before estimates.</h2></div><p>The estimate is modelled from the card&apos;s own attributes. It moves only when a confirmed sale replaces it.</p></div><DataChart compact /></section>
    <section className="short-next"><p className="eyebrow"><span /> Continue exploring</p><h2>See the complete<br />Szoboszlai collection.</h2><a className="button-primary" href="/szoboszlai" data-track="collection-from-short">Explore 22 cards <span>↗</span></a></section>
    <Footer />
  </main>;
}
