import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { CardFront } from '@/components/card-visual';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards, youtubeContent } from '@/lib/data';

const featured = cards[1];

export default function Home() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />

      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow"><span /> From the Short to the full story</p>
          <h1>Every card has<br /><i>more to tell.</i></h1>
          <p className="dek">TCG Business Elite is the field guide behind the channel—complete card records, honest verification status, collector education and market context without the hype.</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/szoboszlai?utm_source=website&utm_medium=homepage&utm_campaign=szoboszlai_collection">Explore the collection <span>→</span></Link>
            <a className="button-ghost" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer" data-track="youtube_return"><span className="play-ring">▶</span> Visit YouTube <span>↗</span></a>
          </div>
          <div className="trust-row"><span>01 <b>Documented</b></span><span>02 <b>Source-led</b></span><span>03 <b>No hype</b></span></div>
        </div>

        <div className="home-feature-card">
          <span className="floating-label">Latest collection story</span>
          <CardFront card={featured} />
          <div className="home-feature-meta">
            <span>{featured.recordId}</span>
            <b>{featured.title}</b>
            <Link href={`/cards/${featured.slug}`}>Open card record →</Link>
          </div>
        </div>
      </section>

      <section className="journey-section content-section">
        <div className="section-kicker">A better next step</div>
        <div className="split-heading">
          <h2>The Short is the hook.<br /><i>This is the evidence.</i></h2>
          <p>No generic link dump. Each video can continue on a page that already knows the card, the terminology and the next useful question.</p>
        </div>
        <div className="journey-grid">
          <div><span>01</span><b>Watch</b><p>A card catches your eye in a TCG Business Elite Short.</p></div>
          <div><span>02</span><b>Identify</b><p>The memorable link lands on that exact card—not a generic homepage.</p></div>
          <div><span>03</span><b>Understand</b><p>Inspect both sides, set, parallel, condition and confidence notes.</p></div>
          <div><span>04</span><b>Explore</b><p>Move naturally into related cards, sets and collector education.</p></div>
        </div>
      </section>

      <section className="youtube-section" id="youtube">
        <div className="section-head-light">
          <div><span>On the channel now</span><h2>Featured on <i>YouTube</i></h2></div>
          <a href="https://www.youtube.com/@TCGBusinessElite/shorts" target="_blank" rel="noreferrer" data-track="youtube_return">All Shorts ↗</a>
        </div>
        <div className="shorts-grid">
          {youtubeContent.map((video, index) => (
            <Link className="short-tile" href={`/${video.landingPageSlug}`} key={video.youtubeId}>
              <div className="short-image" style={{ backgroundImage: `url('${video.thumbnail}')` }}><span>0{index + 1}</span><b>▶</b></div>
              <small>SHORT · COLLECTION DISCOVERY</small>
              <h3>{video.title}</h3>
              <p>Continue the story →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="method-section content-section">
        <div className="method-quote"><span>“</span><blockquote>Show what’s known.<br />Label what isn’t.<br /><i>Never sell certainty.</i></blockquote></div>
        <div className="method-copy">
          <span>Our method</span>
          <h2>Confidence belongs beside the number.</h2>
          <p>Market observations only become useful when the source, date, card match and confidence are visible. When no verified data exists, the page says so—and still explains the card.</p>
          <Link href="/learn">Read the collector guides →</Link>
        </div>
      </section>

      <section className="final-cta">
        <p>Start with the player at the heart of the collection.</p>
        <h2>Explore Szoboszlai,<br /><i>card by card.</i></h2>
        <Link className="button-primary" href="/szoboszlai">Open the collection <span>→</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
