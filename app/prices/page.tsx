import type { Metadata } from 'next';
import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Investment Tracking | Szoboszlai Collection',
  description: 'Track acquisition cost, verified comparable sales, evidence confidence and collection performance.',
};

const confirmedEntries = cards.reduce((total, card) => total + card.priceHistory.length, 0);

export default function PricesPage() {
  return (
    <main className="ux-home prices-page">
      <AttributionTracker />
      <SiteHeader />

      <section className="price-hero content-section">
        <p className="ux-kicker">Investment tracking</p>
        <h1>Cost basis.<br />Market evidence.<br />Performance.</h1>
        <p>Track what each card cost, compare it with verified sales, and measure performance only when the supporting evidence is strong enough.</p>
      </section>

      <section className="price-summary content-section" aria-label="Investment tracking summary">
        <div><span>Tracked assets</span><strong>{String(cards.length).padStart(2, '0')}</strong><small>Documented card records</small></div>
        <div><span>Cost basis entries</span><strong>00</strong><small>Acquisition data to add</small></div>
        <div><span>Verified market entries</span><strong>{String(confirmedEntries).padStart(2, '0')}</strong><small>Confirmed comparable sales</small></div>
        <div><span>Portfolio value</span><strong>Pending</strong><small>No unsupported valuation</small></div>
      </section>

      <section className="investment-setup content-section">
        <div><span>Investment data model</span><h2>Ready for responsible tracking.</h2><p>The tracker separates three different numbers so they cannot be confused.</p></div>
        <div className="investment-setup-grid">
          <article><b>Acquisition cost</b><p>Purchase price, date, currency and related fees for the exact copy.</p></article>
          <article><b>Market evidence</b><p>Verified completed sales that genuinely match the card and condition.</p></article>
          <article><b>Performance</b><p>Calculated change only after both cost basis and reliable market evidence exist.</p></article>
        </div>
      </section>

      <section className="price-records content-section" aria-labelledby="price-records-heading">
        <div className="tracker-section-head">
          <div><p className="ux-kicker">Investment records</p><h2 id="price-records-heading">Asset-level tracking.</h2></div>
          <p>Missing information stays visible. No performance is calculated until acquisition cost and comparable-sale evidence are available.</p>
        </div>
        <div className="price-table">
          <div className="price-table-head"><span>Asset</span><span>Cost basis</span><span>Latest market evidence</span><span>Performance</span><span>Confidence</span><span /></div>
          {cards.map((card) => {
            const latest = card.priceHistory.at(-1);
            return (
              <article className="price-row" key={card.slug}>
                <div className="price-card-name"><span style={{ backgroundImage: `url('${card.image}')` }} /><p><b>{card.title}</b><small>{card.recordId}</small></p></div>
                <p>Not recorded</p>
                <p>{latest ? `${latest.amount} ${latest.currency} · ${latest.date}` : 'No confirmed comparable sale'}</p>
                <p>Pending</p>
                <p><span className={`price-confidence ${latest ? 'confirmed' : ''}`}>{latest ? latest.confidence : 'Insufficient data'}</span></p>
                <Link href={`/cards/${card.slug}`}>Open record →</Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="price-method">
        <div className="content-section">
          <div className="tracker-section-head">
            <div><p className="ux-kicker">Investment discipline</p><h2>What makes the numbers useful?</h2></div>
          </div>
          <div className="price-method-grid">
            <article><span>01</span><h3>Match the exact card</h3><p>Release, insert, parallel, serial status and condition must be genuinely comparable.</p></article>
            <article><span>02</span><h3>Record the source</h3><p>Completed sales need a date, amount, currency and source—not an unsold asking price.</p></article>
            <article><span>03</span><h3>Show confidence</h3><p>Evidence quality appears beside the price so uncertainty is never hidden.</p></article>
          </div>
        </div>
      </section>

      <section className="tracker-final compact">
        <p>Evidence-led investing</p>
        <h2>Track the collection without turning guesses into valuations.</h2>
        <Link className="ux-button primary" href="/szoboszlai">Open the collection <span aria-hidden="true">→</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
