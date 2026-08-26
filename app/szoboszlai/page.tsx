import type { Metadata } from 'next';
import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { CollectionExplorer } from '@/components/interactive';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards } from '@/lib/data';
import { collectionPhotos } from '@/lib/photo-inventory';

export const metadata: Metadata = {
  title: 'The Szoboszlai Collection | TCG Business Elite',
  description: 'Explore the documented Dominik Szoboszlai card collection, including cards featured in TCG Business Elite YouTube Shorts.',
};

export default function SzoboszlaiCollectionPage() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="collection-hero">
        <div className="collection-hero-photo" />
        <div className="collection-hero-overlay" />
        <div className="collection-hero-copy">
          <p className="eyebrow"><span /> Player collection · Hungary</p>
          <h1>Dominik<br /><i>Szoboszlai.</i></h1>
          <p>A living index of every documented card in the TCG Business Elite collection—identity, condition, video links and evidence status included.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#collection">Browse {cards.length} records <span>↓</span></a>
            <a className="button-ghost" href="https://www.youtube.com/@TCGBusinessElite/shorts" target="_blank" rel="noreferrer" data-track="youtube_return"><span className="play-ring">▶</span> Watch the collection Shorts <span>↗</span></a>
          </div>
        </div>
        <aside className="collection-stats">
          <div><span>Documented records</span><strong>{String(cards.length).padStart(2, '0')}</strong></div>
          <div><span>Appeared in videos</span><strong>{cards.filter((card) => card.videoIds.length).length}</strong></div>
          <div><span>Primary focus</span><b>Context over hype</b></div>
        </aside>
      </section>

      <section className="collection-index content-section" id="collection">
        <div className="section-kicker">The collection</div>
        <div className="split-heading">
          <h2>Every record,<br /><i>connected.</i></h2>
          <p>Filter for cards seen on the channel, then open a record to inspect its identity, source Short and verification notes.</p>
        </div>
        <CollectionExplorer cards={cards} />
      </section>

      <section className="photo-inventory-section" id="photo-inventory">
        <div className="content-section">
          <div className="tracker-section-head">
            <div><p className="ux-kicker">Photo inventory</p><h2>{collectionPhotos.length} collection photos ready for records.</h2></div>
            <p>The card or protective case is centered in each preview. Original uploads remain untouched while titles, sets and parallels are reviewed.</p>
          </div>
          <div className="photo-inventory-grid">
            {collectionPhotos.map((photo) => (
              <article className="photo-inventory-item" key={photo.id}>
                <span><img src={photo.src} alt={`Szoboszlai collection photo ${photo.id}`} loading="lazy" /></span>
                <div><b>{photo.id}</b><small>{photo.status}</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collection-guide investment-guide">
        <div><span>Investment tracking</span><h2>Cost basis. Market evidence. Performance.</h2></div>
        <p>Keep purchase data and comparable sales beside the collection without mixing verified evidence with assumptions.</p>
        <Link className="button-primary" href="/prices">Open investment tracker →</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
