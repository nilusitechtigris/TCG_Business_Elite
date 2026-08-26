'use client';

import { useMemo, useState } from 'react';
import { cardImage, cardSrcSet, type CardRecord } from '../data';
import { money, valueCard } from '../valuation';

type View = 'gallery' | 'table';
type Sort = 'documented' | 'recent-added' | 'recent-updated' | 'highest' | 'gain' | 'loss' | 'print-run' | 'year' | 'parallel';
type GradeFilter = 'all' | 'graded' | 'ungraded';
type MarketFilter = 'all' | 'available' | 'missing';

export function CollectionExplorer({ initialCards, compact = false }: { initialCards: CardRecord[]; compact?: boolean }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('documented');
  const [manufacturer, setManufacturer] = useState('all');
  const [set, setSet] = useState('all');
  const [year, setYear] = useState('all');
  const [parallel, setParallel] = useState('all');
  const [numberedOnly, setNumberedOnly] = useState(false);
  const [gradeStatus, setGradeStatus] = useState<GradeFilter>('all');
  const [marketStatus, setMarketStatus] = useState<MarketFilter>('all');
  const [youtubeOnly, setYoutubeOnly] = useState(false);
  const [view, setView] = useState<View>('gallery');
  const sets = useMemo(() => Array.from(new Set(initialCards.map((card) => card.set))).sort(), [initialCards]);
  const years = useMemo(() => Array.from(new Set(initialCards.map((card) => card.year))).sort().reverse(), [initialCards]);
  const parallels = useMemo(() => Array.from(new Set(initialCards.map((card) => card.parallel))).sort(), [initialCards]);

  const visible = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return initialCards
      .filter((card) => !normalized || [card.player, card.year, card.set, card.parallel, card.serial, card.cardNumber].some((value) => value?.toLowerCase().includes(normalized)))
      .filter((card) => manufacturer === 'all' || card.manufacturer === manufacturer)
      .filter((card) => set === 'all' || card.set === set)
      .filter((card) => year === 'all' || card.year === year)
      .filter((card) => parallel === 'all' || card.parallel === parallel)
      .filter((card) => !numberedOnly || card.serial)
      .filter((card) => gradeStatus === 'all' || (gradeStatus === 'graded' ? card.gradingCompany : !card.gradingCompany))
      .filter((card) => marketStatus === 'all' || (marketStatus === 'available' ? card.comparableSales.length > 0 : card.comparableSales.length === 0))
      .filter((card) => !youtubeOnly || card.youtube.length)
      .sort((a, b) => {
        const movement = (card: CardRecord) => card.historicalValues.length > 1 ? card.historicalValues.at(-1)!.estimatedValue - card.historicalValues[0].estimatedValue : Number.NEGATIVE_INFINITY;
        if (sort === 'highest') return valueCard(b).estimate - valueCard(a).estimate;
        if (sort === 'gain') return movement(b) - movement(a);
        if (sort === 'loss') return movement(a) - movement(b);
        if (sort === 'recent-added') return (b.acquisitionDate ?? b.documentedAt).localeCompare(a.acquisitionDate ?? a.documentedAt) || b.index - a.index;
        if (sort === 'recent-updated') return (b.valuationDate ?? '').localeCompare(a.valuationDate ?? '') || b.index - a.index;
        if (sort === 'print-run') return (a.printRun ?? 99999) - (b.printRun ?? 99999);
        if (sort === 'year') return b.year.localeCompare(a.year);
        if (sort === 'parallel') return a.parallel.localeCompare(b.parallel);
        return a.index - b.index;
      });
  }, [gradeStatus, initialCards, manufacturer, marketStatus, numberedOnly, parallel, query, set, sort, year, youtubeOnly]);

  return (
    <section className={`explorer ${compact ? 'explorer-compact' : ''}`} aria-labelledby="collection-title">
      <div className="explorer-head">
        <div><p className="eyebrow"><span /> Collection explorer</p><h2 id="collection-title">The owned archive.</h2></div>
        <p>Search every verified front/back pair. Every price is a model estimate with its confidence shown—no card here is backed by a confirmed sale yet.</p>
      </div>

      <div className="explorer-tools">
        <label className="search-box"><span>Search collection</span><input data-track="collection-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Player, set, serial…" /><b aria-hidden="true">⌕</b></label>
        <label><span>Sort</span><select data-track="collection-sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
          <option value="documented">Recently documented</option><option value="recent-added">Recently added</option><option value="recent-updated">Recently updated valuation</option><option value="highest">Highest estimated value</option><option value="gain">Largest gain · data pending</option><option value="loss">Largest loss · data pending</option><option value="print-run">Lowest print run</option><option value="year">Year</option><option value="parallel">Parallel</option>
        </select></label>
        <div className="view-switch" aria-label="Collection view"><button data-track="collection-view-change" type="button" className={view === 'gallery' ? 'active' : ''} aria-pressed={view === 'gallery'} onClick={() => setView('gallery')}><span aria-hidden="true">▦</span> Gallery</button><button data-track="collection-view-change" type="button" className={view === 'table' ? 'active' : ''} aria-pressed={view === 'table'} onClick={() => setView('table')}><span aria-hidden="true">☷</span> Portfolio</button></div>
      </div>

      <div className="filter-bar" aria-label="Collection filters">
        <label><span className="sr-only">Manufacturer</span><select data-track="collection-filter-change" value={manufacturer} onChange={(event) => setManufacturer(event.target.value)}><option value="all">All manufacturers</option><option>Topps</option><option>Panini</option></select></label>
        <label><span className="sr-only">Year</span><select data-track="collection-filter-change" value={year} onChange={(event) => setYear(event.target.value)}><option value="all">All years</option>{years.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Set</span><select data-track="collection-filter-change" value={set} onChange={(event) => setSet(event.target.value)}><option value="all">All sets</option>{sets.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Parallel</span><select data-track="collection-filter-change" value={parallel} onChange={(event) => setParallel(event.target.value)}><option value="all">All parallels</option>{parallels.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span className="sr-only">Grade status</span><select data-track="collection-filter-change" value={gradeStatus} onChange={(event) => setGradeStatus(event.target.value as GradeFilter)}><option value="all">Graded &amp; ungraded</option><option value="graded">Graded only</option><option value="ungraded">Ungraded only</option></select></label>
        <label><span className="sr-only">Market-data availability</span><select data-track="collection-filter-change" value={marketStatus} onChange={(event) => setMarketStatus(event.target.value as MarketFilter)}><option value="all">All evidence states</option><option value="available">Backed by sales</option><option value="missing">Model estimate only</option></select></label>
        <button data-track="collection-filter-change" type="button" className={numberedOnly ? 'selected' : ''} aria-pressed={numberedOnly} onClick={() => setNumberedOnly(!numberedOnly)}>Numbered</button>
        <button data-track="collection-filter-change" type="button" className={youtubeOnly ? 'selected' : ''} aria-pressed={youtubeOnly} onClick={() => setYoutubeOnly(!youtubeOnly)}>On YouTube</button>
      </div>

      <div className="result-count"><span>{String(visible.length).padStart(2, '0')} cards</span><span>44 original photographs · 22 confirmed pairs · 0 confirmed sales</span></div>

      {visible.length === 0 ? <div className="no-results"><strong>No cards match these filters.</strong><button type="button" onClick={() => { setQuery(''); setManufacturer('all'); setSet('all'); setYear('all'); setParallel('all'); setNumberedOnly(false); setGradeStatus('all'); setMarketStatus('all'); setYoutubeOnly(false); }}>Clear filters</button></div> : null}

      {view === 'gallery' ? (
        <div className="card-grid">
          {visible.map((card) => <CollectionTile card={card} key={card.id} />)}
        </div>
      ) : (
        <div className="collection-table-wrap"><table className="collection-table"><thead><tr><th>Card</th><th>Identity</th><th>Serial</th><th>Grade</th><th>Estimated value</th><th>Confidence</th></tr></thead><tbody>
          {visible.map((card) => { const valuation = valueCard(card); return <tr key={card.id}><td><img src={cardImage(card, 'front', 480)} alt="" loading="lazy" /></td><td><a href={`/cards/${card.slug}`}><strong>{card.parallel}</strong><span>{card.year} · {card.set}</span><small>{card.player}</small></a></td><td>{card.serial ?? '—'}</td><td>{card.grade ?? 'Ungraded'}</td><td><b className="value-cell">{money(valuation.estimate)}</b><em>{money(valuation.low)}–{money(valuation.high)}</em></td><td><span className="confidence-pill"><i /> {valuation.confidence}% · {valuation.confidenceBand}</span></td></tr>; })}
        </tbody></table></div>
      )}
    </section>
  );
}

function CollectionTile({ card }: { card: CardRecord }) {
  const valuation = valueCard(card);
  return (
    <article className="collection-card">
      <a className="tile-image" href={`/cards/${card.slug}`} aria-label={`View ${card.year} ${card.set}, ${card.parallel}${card.serial ? `, serial ${card.serial}` : ''}`}>
        <img src={cardImage(card, 'front', 480)} srcSet={cardSrcSet(card, 'front')} sizes="(max-width: 600px) 88vw, (max-width: 1100px) 42vw, 24vw" alt={`Front of ${card.player}'s ${card.year} ${card.set} card`} loading="lazy" />
        <span className="tile-number">{String(card.index).padStart(2, '0')}</span>
        <span className="tile-inspect">Inspect <b aria-hidden="true">↗</b></span>
      </a>
      <div className="tile-meta">
        <div className="tile-kicker"><span>{card.year} · {card.manufacturer}</span><b>{card.gradingCompany ? `${card.gradingCompany} ${card.grade?.replace('Gem Mint ', '')}` : 'Raw'} · {card.youtube.length ? 'On YouTube' : 'Not linked'}</b></div>
        <h3><a href={`/cards/${card.slug}`}>{card.parallel}</a></h3>
        <p>{card.set}<br />{card.player}</p>
        <div className="tile-facts"><span>Serial <b>{card.serial ?? 'Not confirmed'}</b></span><span>Card no. <b>{card.cardNumber ?? 'Not confirmed'}</b></span></div>
        <div className="tile-value"><div><span>Model estimate</span><strong>{money(valuation.estimate)}</strong><small>{money(valuation.low)} – {money(valuation.high)}</small></div><span className="confidence-pill"><i /> {valuation.confidence}%</span></div>
        <div className="confidence-meter" role="img" aria-label={`Confidence ${valuation.confidence} percent, ${valuation.basis}`}><i style={{ width: `${valuation.confidence}%` }} /></div>
      </div>
    </article>
  );
}
