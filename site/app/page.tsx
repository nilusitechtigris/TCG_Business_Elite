import { CardInspector } from './components/CardInspector';
import { DataChart } from './components/DataChart';
import { Footer, Header, Ticker } from './components/Header';
import { cardImage, cardSrcSet, cards } from './data';
import { money, valuePortfolio } from './valuation';

export default function Home() {
  const featured = cards[0];
  const portfolio = valuePortfolio(cards);
  const metrics = [
    { label: 'Model estimate', value: money(portfolio.estimate), note: `Range ${money(portfolio.low)} – ${money(portfolio.high)}` },
    { label: 'Model confidence', value: `${portfolio.confidence}%`, note: 'Value-weighted across 22 cards' },
    { label: 'Confirmed sales', value: `${portfolio.withSales} of ${cards.length}`, note: 'Everything else is modelled' },
    { label: 'Acquisition cost', value: 'Not entered', note: 'Cost basis kept separate' },
    { label: 'Unrealized P/L', value: '—', note: 'Needs acquisition cost' },
    { label: 'Owned cards', value: String(cards.length), note: '44 original photographs' },
  ];
  return (
    <main>
      <Header />
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Private vault · Liverpool</p>
          <h1>The Szoboszlai<br /><em>card vault.</em></h1>
          <p className="hero-intro">Twenty-two owned cards, shot front and back, catalogued properly — and tracked over time without a single invented market value.</p>
          <div className="hero-actions">
            <a className="button-primary" href="/szoboszlai">Open the vault <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="/portfolio">See the numbers <span aria-hidden="true">→</span></a>
          </div>
          <div className="hero-stats" aria-label="Collection summary">
            <div><span>Owned</span><strong>22</strong><small>cards</small></div>
            <div><span>Numbered</span><strong>18</strong><small>confirmed</small></div>
            <div><span>Graded</span><strong>6</strong><small>PSA 10</small></div>
          </div>
          <p className="disclaimer">Prices on this site are model estimates built from print run, autograph, grade and era—not confirmed sales. Every card shows how sure the model is and what evidence is missing. Not investment advice.</p>
        </div>

        <div className="hero-inspector" id="featured">
          <div className="hero-card-label"><span>Featured · TBE-SZO-001</span><strong>2024 Topps Deco</strong></div>
          <CardInspector card={featured} priority />
          <div className="card-caption"><div><span className="caption-kicker">Red frame · Liverpool FC</span><strong>Dominik Szoboszlai</strong></div><div className="serial">07<span>/10</span></div></div>
        </div>
      </section>

      <Ticker />

      <section className="portfolio home-portfolio" id="portfolio">
        <div className="section-heading">
          <p className="eyebrow"><span /> Collection overview</p>
          <h2>Receipts,<br />not vibes.</h2>
          <p>Every price is a published formula you can check, with the confidence score and the missing evidence shown next to it. Real sales overwrite the model as they arrive.</p>
        </div>
        <div className="metrics-grid metrics-six">
          {metrics.map((metric, index) => <article className="metric" key={metric.label}><span className="metric-index">0{index + 1}</span><p>{metric.label}</p><strong>{metric.value}</strong><small>{metric.note}</small></article>)}
        </div>
        <DataChart />
        <div className="signal-grid">
          <article><span>01 · Biggest increases</span><strong>No verified movements yet</strong><p>Value changes appear only after at least two dated valuations.</p></article>
          <article><span>02 · Biggest decreases</span><strong>No verified movements yet</strong><p>Loss indicators will use text, symbols and color together.</p></article>
          <article><span>03 · Market confidence</span><strong>{portfolio.confidence}% value-weighted</strong><p>Capped at 35% per card while no confirmed sale backs the estimate.</p></article>
          <article><span>04 · Recently documented</span><strong>22 cards · 26 Aug 2026</strong><p>All source photographs preserved at original resolution.</p></article>
          <article><span>05 · Value contribution</span><strong>{portfolio.ranked[0].card.parallel}</strong><p>Top of the modelled ranking at {money(portfolio.ranked[0].valuation.estimate)}. See the full order on the portfolio page.</p></article>
          <article><span>06 · Model run</span><strong>{portfolio.valuedOn}</strong><p>Every future update is preserved as a dated historical point.</p></article>
          <article><span>07 · YouTube featured</span><strong>No confirmed links</strong><p>Video-to-card associations remain empty until their IDs are supplied.</p></article>
          <article><span>08 · Recently added</span><strong>Acquisition dates not entered</strong><p>Documentation date is shown without pretending it is the purchase date.</p></article>
        </div>
      </section>

      <section className="home-collection">
        <div className="home-collection-head"><div><p className="eyebrow"><span /> The archive</p><h2>22 cards.<br />44 angles.</h2></div><div><p>Every front/back pairing was verified from capture order, matching serials and visible designs.</p><a className="text-link" href="/szoboszlai">Open complete collection <span aria-hidden="true">→</span></a></div></div>
        <div className="home-card-row">
          {cards.slice(0, 4).map((card) => <article key={card.id}><a href={`/cards/${card.slug}`}><img src={cardImage(card, 'front', 480)} srcSet={cardSrcSet(card, 'front')} sizes="(max-width: 700px) 82vw, 25vw" alt={`Front of ${card.year} ${card.set} card`} loading="lazy" /><span className="home-tile-overlay"><b>{String(card.index).padStart(2, '0')}</b><em>Inspect ↗</em></span></a><p>{card.year} · {card.parallel}</p><strong>{card.serial ?? card.cardNumber ?? 'Not confirmed'}</strong></article>)}
        </div>
      </section>

      <section className="youtube-band">
        <div><span className="youtube-play" aria-hidden="true">▶</span><p className="eyebrow"><span /> YouTube companion</p><h2>From the Short<br />to the card.</h2></div>
        <div><p>Campaign-ready routes can bring viewers directly to the physical card, its confirmed metadata and its value record—then back to TCG Business Elite on YouTube.</p><a className="button-primary" href="/youtube">Explore YouTube bridge <span aria-hidden="true">↗</span></a></div>
      </section>
      <Footer />
    </main>
  );
}
