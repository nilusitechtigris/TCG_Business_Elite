import Link from 'next/link';
import { AttributionTracker } from './attribution';
import { CardExplorer, PrivacyVideo } from './interactive';
import { SiteFooter, SiteHeader } from './site-chrome';
import { cards, type CardRecord, type YouTubeContent, youtubeContent } from '@/lib/data';

export function CardDetailPage({ card, sourceVideo }: { card: CardRecord; sourceVideo?: YouTubeContent }) {
  const relatedVideo = sourceVideo || youtubeContent.find((video) => video.associatedCards.includes(card.slug));
  const relatedCards = cards.filter((item) => item.slug !== card.slug).slice(0, 2);
  const facts = [
    ['Set', `${card.year} ${card.set}`],
    ['Insert', card.insert],
    ['Parallel', card.parallel],
    ['Serial number', card.serial || 'Not serial-numbered'],
    ['Card number', card.cardNumber],
    ['Condition', card.condition],
  ];

  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="detail-hero">
        <div className="detail-copy">
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/szoboszlai">Szoboszlai collection</Link><span>/</span><b>{card.recordId}</b></div>
          {sourceVideo && <p className="arrival-confirm"><span>✓</span> You found the card from the Short.</p>}
          {!sourceVideo && relatedVideo && <p className="eyebrow"><span /> Featured on YouTube</p>}
          <h1>{card.player}<br /><i>{card.title}</i></h1>
          <p className="dek">{card.description}</p>
          <div className="hero-actions">
            {relatedVideo && (
              <a className="button-primary youtube-button" href={`https://www.youtube.com/shorts/${relatedVideo.youtubeId}`} target="_blank" rel="noreferrer" data-track="youtube_return"><span>▶</span> Watch this card’s Short <i>↗</i></a>
            )}
            <Link className="button-ghost" href="/prices">Investment tracker <span>→</span></Link>
          </div>
          <div className="record-code"><span>Collection record</span><b>{card.recordId}</b><em>Published</em></div>
        </div>

        <CardExplorer card={card} />

        <aside className="detail-facts">
          <div className="fact-heading"><span>Card identity</span><b>Verified fields</b></div>
          {facts.map(([label, value]) => <div className="fact" key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </aside>
      </section>

      <section className="identity-strip">
        <div><span>Player</span><b>{card.player}</b></div>
        <div><span>Collection status</span><b>Owned · documented</b></div>
        <div><span>Video connections</span><b>{card.videoIds.length} {card.videoIds.length === 1 ? 'Short' : 'Shorts'}</b></div>
        <div><span>Last record review</span><b>25 Aug 2026</b></div>
      </section>

      <section className="market-section">
        <div className="market-head"><span>01 · Investment history</span><h2>Evidence before estimate.</h2></div>
        {card.priceHistory.length === 0 ? (
          <div className="empty-market">
            <div className="empty-signal"><span /><span /><span /><span /><span /></div>
            <div><b>No verified sales attached—yet.</b><p>Rather than display an unverified price, this record stays useful through identity, condition and collection context. Confirmed comparable sales can be added with date, source and confidence.</p><Link className="text-link" href="/prices">Open the collection price tracker →</Link></div>
            <aside><span>Confidence</span><strong>Insufficient data</strong><small>0 confirmed comparable sales</small></aside>
          </div>
        ) : null}
      </section>

      <div className="ad-reserve" aria-label="Reserved advertising space"><span>Reserved ad space</span><p>Any future advertising stays below the promised card information and uses a fixed-height placement to prevent layout shift.</p></div>

      {relatedVideo && (
        <section className="video-section content-section">
          <div className="video-copy"><span>02 · Source Short</span><h2>See the card in the video.</h2><p>The preview is local. YouTube is contacted only if you choose to play it.</p></div>
          <PrivacyVideo video={relatedVideo} />
        </section>
      )}

      <section className="related-section content-section">
        <div className="section-head-light"><div><span>Continue exploring</span><h2>Related <i>Szoboszlai</i> cards</h2></div><Link href="/szoboszlai">Full collection →</Link></div>
        <div className="related-grid">
          {relatedCards.map((item) => (
            <Link href={`/cards/${item.slug}`} key={item.slug} style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.9), transparent), url('${item.image}')` }}>
              <small>{item.recordId}</small><div><span>{item.year}</span><h3>{item.title}</h3><p>Open record →</p></div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
