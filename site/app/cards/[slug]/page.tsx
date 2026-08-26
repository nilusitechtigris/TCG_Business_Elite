import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CardInspector } from '../../components/CardInspector';
import { DataChart } from '../../components/DataChart';
import { Footer, Header } from '../../components/Header';
import { cardBySlug, cardImage, cardSrcSet, cards, setSlug } from '../../data';
import { money, valueCard } from '../../valuation';

export function generateStaticParams() { return cards.map((card) => ({ slug: card.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const card = cardBySlug((await params).slug);
  if (!card) return { title: 'Card not found | TCG Business Elite', openGraph: { images: [] }, twitter: { images: [] } };
  const title = `${card.year} ${card.set} ${card.serial ?? card.cardNumber ?? ''} | TCG Business Elite`;
  const description = `${card.player} · ${card.parallel}. View verified front/back photography and market-data confidence.`;
  return { title, description, openGraph: { title, description, images: [{ url: cardImage(card, 'front', 1920), alt: `Front of ${card.player}'s ${card.set} card` }] }, twitter: { card: 'summary_large_image', title, description, images: [cardImage(card, 'front', 1920)] } };
}

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const card = cardBySlug((await params).slug);
  if (!card) notFound();
  const related = cards.filter((item) => item.id !== card.id && item.set === card.set).slice(0, 3);
  const valuation = valueCard(card);
  return <main><Header />
    <div className="breadcrumbs"><a href="/szoboszlai">Collection</a><span>/</span><a href={`/sets/${setSlug(card.set)}`}>{card.set}</a><span>/</span><b>{card.serial ?? card.cardNumber ?? card.id}</b></div>
    <section className="card-detail-hero">
      <div className="detail-visual"><div className="detail-label"><span>{card.id}</span><b>Pair confidence · High</b></div><CardInspector card={card} priority /></div>
      <div className="detail-copy"><p className="eyebrow"><span /> Owned card · {String(card.index).padStart(2, '0')}</p><h1>{card.player.split(' ')[0]}<br /><em>{card.player.split(' ')[1]}.</em></h1><p className="detail-subtitle">{card.year} · {card.set}<br />{card.parallel}</p>
        <div className="detail-value"><div><span>Model estimate · {valuation.currency}</span><strong>{money(valuation.estimate)}</strong><small>Range {money(valuation.low)} – {money(valuation.high)} · modelled {valuation.valuedOn}</small></div><div className="confidence-dial"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" /><circle cx="22" cy="22" r="19" className="dial-value" style={{ strokeDasharray: `${(valuation.confidence / 100) * 119.4} 119.4` }} /></svg><b>{valuation.confidence}%</b><span>{valuation.confidenceBand}</span></div></div>
        <div className="detail-finance"><div><span>Acquisition cost</span><strong>Not entered</strong></div><div><span>Acquisition date</span><strong>Not entered</strong></div><div><span>Unrealized P/L</span><strong>—</strong></div></div>
        <dl className="metadata-grid"><div><dt>Manufacturer</dt><dd>{card.manufacturer}</dd></div><div><dt>Year</dt><dd>{card.year}</dd></div><div><dt>Card number</dt><dd>{card.cardNumber ?? 'Not confirmed'}</dd></div><div><dt>Serial</dt><dd>{card.serial ?? 'Not confirmed'}</dd></div><div><dt>Condition / grade</dt><dd>{card.grade ?? card.condition}</dd></div><div><dt>Grading company</dt><dd>{card.gradingCompany ?? 'Ungraded'}</dd></div></dl>
        {card.metadataNote ? <p className="review-note"><span>Manual review</span>{card.metadataNote}</p> : null}
      </div>
    </section>
    <section className="detail-data"><div className="detail-section-head"><div><p className="eyebrow"><span /> Value record</p><h2>Price history.</h2></div><p>The estimate below comes from a published model, not from sales. Confirmed sales, reviewed estimates and acquisition events will override it as they arrive.</p></div><DataChart compact />
      <div className="proof-panels">
        <article className="proof-checks">
          <h3>What backs this number</h3>
          <p className="proof-lede">Confidence is the share of available evidence that is actually present. It stays capped at 35% while no confirmed sale supports the figure.</p>
          <ul>
            {valuation.evidence.map((check) => <li key={check.label} className={check.met ? 'met' : 'missing'}><i aria-hidden="true">{check.met ? '✓' : '✕'}</i><div><b>{check.label}</b><span>{check.detail}</span></div><em>{check.weight}%</em></li>)}
          </ul>
        </article>
        <article className="proof-model">
          <h3>How the estimate is built</h3>
          <p className="proof-lede">Every factor is read off the card itself. Multiply them together and you get the figure above—no hidden inputs.</p>
          <ul>
            {valuation.factors.map((factor) => <li key={factor.label}><b>{factor.label}</b><span>{factor.detail}</span><em>×{factor.multiplier}</em></li>)}
          </ul>
          <div className="proof-total"><span>Model estimate</span><strong>{money(valuation.estimate)}</strong></div>
          <p className="proof-warning"><b>Not market evidence.</b> {card.comparableSales.length === 0 ? 'No comparable sale has been recorded for this card. Treat the figure as a starting point for research, not a price.' : `Backed by ${card.comparableSales.length} recorded sale(s).`}</p>
        </article>
      </div>
      <div className="evidence-grid"><article><span>Comparable sales</span><strong>{card.comparableSales.length === 0 ? 'No confirmed records' : `${card.comparableSales.length} confirmed`}</strong><p>Add a sale date, price, currency, venue, condition match and source URL before it affects confidence.</p></article><article><span>Valuation source</span><strong>{card.valuationSource ?? 'TBE internal model'}</strong><p>No third-party estimate, dealer quote or price-guide figure has been supplied for this card.</p></article><article><span>Photography record</span><strong>Verified pair · High confidence</strong><p>Front and back match by capture order, design and visible identifiers. Documented 26 Aug 2026.</p></article></div>
    </section>
    <section className="youtube-card-link"><div><span className="youtube-play" aria-hidden="true">▶</span><div><p className="eyebrow">YouTube connection</p><h2>No linked video yet.</h2><p>A card may connect to multiple Shorts once IDs and associations are confirmed.</p></div></div><a className="button-primary" data-track="youtube-return-click" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer">Watch on YouTube <span>↗</span></a></section>
    {related.length ? <section className="related-cards"><div className="detail-section-head"><div><p className="eyebrow"><span /> Same set</p><h2>Related cards.</h2></div><a className="text-link" href={`/sets/${setSlug(card.set)}`}>View complete set →</a></div><div className="related-row">{related.map((item) => <a href={`/cards/${item.slug}`} key={item.id}><img src={cardImage(item, 'front', 480)} srcSet={cardSrcSet(item, 'front')} sizes="(max-width: 700px) 78vw, 30vw" alt={`Front of ${item.parallel} card`} loading="lazy" /><span>{item.parallel}</span><strong>{item.serial ?? item.cardNumber ?? 'Not confirmed'}</strong></a>)}</div></section> : null}
    <Footer />
  </main>;
}
