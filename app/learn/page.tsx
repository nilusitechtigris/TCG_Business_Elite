import type { Metadata } from 'next';
import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Collector Guides | TCG Business Elite',
  description: 'Plain-English football-card guides covering parallels, inserts, serial numbering, condition and market confidence.',
};

const terms = [
  ['Parallel', 'A visually distinct version of an existing card, usually created by changing color, finish or foil. Some are serial-numbered; others are not.'],
  ['Insert', 'A themed subset placed within a larger release. It has its own design, name and checklist position.'],
  ['Serial-numbered', 'A card marked as one copy within a stated print run—for example, 42/99. The number identifies scarcity, not automatic value.'],
  ['Condition', 'The physical state of one copy: corners, edges, surface and centering. A grade is an opinion from a grading service, not a guarantee of market price.'],
  ['Comparable sale', 'A completed sale of a genuinely comparable card. Asking prices and unsold listings are not sales evidence.'],
  ['Confidence', 'How closely available evidence matches the exact card and how well the source can be verified. Confidence should sit beside any market observation.'],
];

export default function LearnPage() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="editorial-hero learn-hero">
        <p className="eyebrow"><span /> Collector education</p>
        <h1>Know what<br /><i>you’re looking at.</i></h1>
        <p>Six essential terms, explained without jargon and connected to cards already documented in the collection.</p>
      </section>
      <section className="glossary content-section">
        {terms.map(([term, definition], index) => (
          <article key={term}><span>{String(index + 1).padStart(2, '0')}</span><h2>{term}</h2><p>{definition}</p></article>
        ))}
      </section>
      <section className="confidence-guide content-section">
        <div><span>Market method</span><h2>Three levels of<br /><i>confidence.</i></h2></div>
        <div className="confidence-levels">
          <article><b>High</b><span>Exact card · verified sale</span><p>Same release, parallel, serial status and meaningful condition match from a confirmed transaction.</p></article>
          <article><b>Moderate</b><span>Close comparable</span><p>Useful context, but one material detail differs or the evidence set is small.</p></article>
          <article><b>Insufficient</b><span>No responsible estimate</span><p>The page explains the card and waits for evidence instead of manufacturing a number.</p></article>
        </div>
      </section>
      <section className="final-cta"><p>Ready to apply the terms?</p><h2>See them on a<br /><i>real collection record.</i></h2><Link className="button-primary" href="/cards/future-stars-psa-10">Open a card record →</Link></section>
      <SiteFooter />
    </main>
  );
}
