import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards, youtubeContent } from '@/lib/data';
import { collectionPhotos } from '@/lib/photo-inventory';

const connectedVideoCount = new Set(cards.flatMap((card) => card.videoIds)).size;
const confirmedPriceCount = cards.reduce((total, card) => total + card.priceHistory.length, 0);
const connections = youtubeContent.flatMap((video) => {
  const card = cards.find((item) => video.associatedCards.includes(item.slug));
  return card ? [{ video, card }] : [];
});

export default function Home() {
  return (
    <main className="ux-home tracker-home">
      <AttributionTracker />
      <SiteHeader />

      <section className="tracker-hero">
        <div className="tracker-hero-copy">
          <p className="ux-kicker">Personal collection archive</p>
          <h1>My Szoboszlai<br />card collection.</h1>
          <p>
            One place to document every card I own, connect each record to its YouTube videos, and track acquisition costs and market evidence over time.
          </p>
          <div className="ux-actions">
            <Link className="ux-button primary" href="/szoboszlai">Open the collection <span aria-hidden="true">→</span></Link>
            <Link className="ux-button secondary" href="/youtube">View connected videos</Link>
          </div>
        </div>

        <div className="tracker-dashboard">
          <div className="tracker-dashboard-head"><span>Collection at a glance</span><b>Updated 26 Aug 2026</b></div>
          <div className="tracker-dashboard-photo">
            <img src={collectionPhotos.at(-2)?.src} alt="Szoboszlai triple autograph card from the collection" />
            <span>Actual collection photo</span>
          </div>
          <div className="tracker-dashboard-grid">
            <div><strong>{cards.length}</strong><small>documented</small></div>
            <div><strong>{collectionPhotos.length}</strong><small>photos ready</small></div>
            <div><strong>{connectedVideoCount}</strong><small>video links</small></div>
          </div>
        </div>
      </section>

      <section className="tracker-stats" aria-label="Collection summary">
        <div><span>Documented cards</span><strong>{String(cards.length).padStart(2, '0')}</strong><small>Owned collection records</small></div>
        <div><span>Photo queue</span><strong>{String(collectionPhotos.length).padStart(2, '0')}</strong><small>Ready to catalog</small></div>
        <div><span>Connected videos</span><strong>{String(connectedVideoCount).padStart(2, '0')}</strong><small>Shorts linked to records</small></div>
        <div><span>Confirmed prices</span><strong>{String(confirmedPriceCount).padStart(2, '0')}</strong><small>Waiting for sales evidence</small></div>
      </section>

      <section className="tracker-photo-preview content-section" aria-labelledby="photo-preview-heading">
        <div className="tracker-section-head">
          <div><p className="ux-kicker">New photo inventory</p><h2 id="photo-preview-heading">Your actual cards, ready to catalog.</h2></div>
          <Link href="/szoboszlai#photo-inventory">View all {collectionPhotos.length} photos <span aria-hidden="true">→</span></Link>
        </div>
        <div className="photo-preview-grid">
          {collectionPhotos.slice(0, 8).map((photo) => (
            <Link href="/szoboszlai#photo-inventory" className="photo-preview-item" key={photo.id}>
              <span><img src={photo.src} alt={`Szoboszlai collection photo ${photo.id}`} loading="lazy" /></span>
              <div><b>{photo.id}</b><small>{photo.status}</small></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="tracker-collection content-section" aria-labelledby="tracker-collection-heading">
        <div className="tracker-section-head">
          <div><p className="ux-kicker">Collection overview</p><h2 id="tracker-collection-heading">Every owned card has a record.</h2></div>
          <Link href="/szoboszlai">Browse all records <span aria-hidden="true">→</span></Link>
        </div>
        <div className="tracker-card-grid">
          {cards.map((card) => (
            <Link className="tracker-card" href={`/cards/${card.slug}`} key={card.slug}>
              <div className="tracker-card-image" style={{ backgroundImage: `url('${card.image}')` }}>
                <span>{card.recordId}</span>
                {card.videoIds.length > 0 && <b>▶ {card.videoIds.length} {card.videoIds.length === 1 ? 'video' : 'videos'}</b>}
              </div>
              <div className="tracker-card-copy">
                <small>{card.year} · {card.cardNumber}</small>
                <h3>{card.title}</h3>
                <p>{card.condition}</p>
                <span>View collection record →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="tracker-connections">
        <div className="content-section">
          <div className="tracker-section-head">
            <div><p className="ux-kicker">Card ↔ video connections</p><h2>Move between the collection and the channel.</h2></div>
            <p>Every video leads to the card it features. Every card record links back to its related Short.</p>
          </div>
          <div className="connection-list">
            {connections.map(({ video, card }, index) => (
              <article className="connection-row" key={video.youtubeId}>
                <Link className="connection-card" href={`/cards/${card.slug}`}>
                  <span className="connection-thumb" style={{ backgroundImage: `url('${card.image}')` }} />
                  <span><small>Collection record</small><b>{card.title}</b><em>{card.recordId}</em></span>
                </Link>
                <div className="connection-direction" aria-label="Connected both ways"><span>←</span><small>connected</small><span>→</span></div>
                <Link className="connection-video" href={`/${video.landingPageSlug}`}>
                  <span className="connection-thumb video" style={{ backgroundImage: `url('${video.thumbnail}')` }}><i aria-hidden="true">▶</i></span>
                  <span><small>YouTube Short · 0{index + 1}</small><b>{video.title}</b><em>Open video landing page</em></span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tracker-areas content-section" aria-labelledby="areas-heading">
        <div className="tracker-section-head">
          <div><p className="ux-kicker">Collection intelligence</p><h2 id="areas-heading">Track the asset and its audience.</h2></div>
          <p>The collection stays central. Investment evidence and connected videos each have a focused workspace.</p>
        </div>
        <div className="tracker-area-grid investment-grid">
          <Link href="/prices" className="tracker-area investment-area">
            <span>01 · Primary workspace</span><i aria-hidden="true">€</i><h3>Investment tracking</h3>
            <p>Monitor cost basis, verified comparable sales, evidence confidence and performance without inventing valuations.</p><b>Open investment tracker →</b>
          </Link>
          <Link href="/youtube" className="tracker-area">
            <span>02 · Audience workspace</span><i aria-hidden="true">▶</i><h3>Connected videos</h3>
            <p>Browse every Short and move directly to the exact collection record featured in it.</p><b>Open video library →</b>
          </Link>
        </div>
      </section>

      <section className="tracker-final">
        <p>Investment view</p>
        <h2>Know what you own, what it cost, and what the evidence supports.</h2>
        <Link className="ux-button primary" href="/prices">Open investment tracker <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
