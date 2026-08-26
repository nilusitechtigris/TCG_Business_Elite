import { CollectionExplorer } from '../components/CollectionExplorer';
import { DataChart } from '../components/DataChart';
import { Footer, Header } from '../components/Header';
import { cards } from '../data';
import { money, valuePortfolio } from '../valuation';

export const metadata = { title: 'Portfolio | TCG Business Elite', description: 'Collection-level cost basis, estimated market value, confidence and historical performance for TCG Business Elite.' };

export default function PortfolioPage() {
  const portfolio = valuePortfolio(cards);
  const leaders = portfolio.ranked.slice(0, 5);
  return <main><Header />
    <section className="page-hero portfolio-hero"><p className="eyebrow"><span /> Portfolio dashboard</p><h1>Collection<br /><em>performance.</em></h1><div><p>Every figure here is a model estimate. Acquisition cost, confirmed sales and modelled value stay in separate columns so nothing borrows credibility from anything else.</p><span>Model run</span><strong>{portfolio.valuedOn}</strong></div></section>
    <section className="portfolio dashboard-section">
      <div className="dashboard-metrics">
        <article><span>Total model estimate</span><strong>{money(portfolio.estimate)}</strong><small>Range {money(portfolio.low)} – {money(portfolio.high)}</small></article>
        <article><span>Model confidence</span><strong>{portfolio.confidence}%</strong><small>Value-weighted · {portfolio.withSales} of {cards.length} cards backed by a sale</small></article>
        <article><span>Total acquisition cost</span><strong>Not entered</strong><small>0 of 22 cards</small></article>
        <article><span>Unrealized gain / loss</span><strong>—</strong><small>Needs acquisition cost</small></article>
      </div>
      <DataChart />
      <div className="portfolio-breakdown">
        <article><p className="eyebrow"><span /> Value leaders</p><ol className="leader-list">{leaders.map((item, rank) => <li key={item.card.id}><b>{rank + 1}</b><a href={`/cards/${item.card.slug}`}><strong>{item.card.parallel}</strong><span>{item.card.year} · {item.card.set}</span></a><em>{money(item.valuation.estimate)}<small>{item.valuation.confidence}%</small></em></li>)}</ol></article>
        <article><p className="eyebrow"><span /> Evidence health</p><div className="donut" aria-label={`${portfolio.withSales} of ${cards.length} cards are backed by a confirmed sale`}><span><strong>{portfolio.withSales}</strong>/{cards.length}</span></div><p>Cards backed by a confirmed sale. The rest rest on the model alone.</p></article>
        <article><p className="eyebrow"><span /> Source policy</p><ul><li><b>Confirmed sale</b><span>Transaction evidence</span></li><li><b>Reviewed estimate</b><span>Range + confidence</span></li><li><b>Model estimate</b><span>Published factors only</span></li><li><b>Acquisition event</b><span>Cost basis only</span></li></ul></article>
      </div>
    </section>
    <CollectionExplorer initialCards={cards} compact />
    <Footer />
  </main>;
}
