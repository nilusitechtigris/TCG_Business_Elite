import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { CardFront } from '@/components/card-visual';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards, youtubeContent } from '@/lib/data';

const featured = cards[0];
const featuredVideo = youtubeContent.find((video) => video.youtubeId === featured.videoIds[0]) ?? youtubeContent[0];

export default function Home() {
  return (
    <main className="ux-home">
      <AttributionTracker />
      <SiteHeader />

      <section className="ux-hero">
        <div className="ux-hero-copy">
          <p className="ux-kicker"><span aria-hidden="true">▶</span> Featured in a TCG Business Elite Short</p>
          <h1>See the card.<br /><i>Understand the story.</i></h1>
          <p className="ux-lead">
            Start with the exact card from the video, then explore its identity, condition and collector context at your own pace.
          </p>
          <div className="ux-actions">
            <Link className="ux-button primary" href={`/${featuredVideo.landingPageSlug}`}>
              Open the featured card <span aria-hidden="true">→</span>
            </Link>
            <Link className="ux-button secondary" href="/szoboszlai">
              Browse the collection
            </Link>
          </div>
          <p className="ux-value-note"><span aria-hidden="true">✓</span> Full card record first. No registration required.</p>
        </div>

        <div className="ux-featured">
          <div className="ux-card-wrap"><CardFront card={featured} /></div>
          <article className="ux-card-summary">
            <p>Featured record</p>
            <h2>{featured.title}</h2>
            <dl>
              <div><dt>Set</dt><dd>{featured.year} {featured.set}</dd></div>
              <div><dt>Condition</dt><dd>{featured.condition}</dd></div>
              <div><dt>Record</dt><dd>{featured.recordId}</dd></div>
            </dl>
            <Link href={`/cards/${featured.slug}`}>View the complete record <span aria-hidden="true">→</span></Link>
          </article>
        </div>
      </section>

      <section className="ux-trust" aria-label="What to expect">
        <div><span aria-hidden="true">✓</span><p><strong>No signup wall</strong><small>Explore before you commit</small></p></div>
        <div><span aria-hidden="true">▶</span><p><strong>Video loads by choice</strong><small>Privacy-conscious playback</small></p></div>
        <div><span aria-hidden="true">◎</span><p><strong>Honest verification</strong><small>Unknown details stay marked</small></p></div>
      </section>

      <section className="ux-start content-section" aria-labelledby="start-heading">
        <div className="ux-section-head">
          <div><p className="ux-kicker dark">Choose your starting point</p><h2 id="start-heading">What would you like to do?</h2></div>
          <p>Pick the path that matches why you are here. You can switch paths at any time.</p>
        </div>
        <div className="ux-start-grid">
          <Link className="ux-start-card recommended" href="/youtube">
            <span className="ux-badge">Recommended</span>
            <i aria-hidden="true">▶</i>
            <p>Continue from YouTube</p>
            <h3>Find the card from a Short.</h3>
            <small>See every connected video and its exact next step.</small>
            <b>View featured Shorts <span aria-hidden="true">→</span></b>
          </Link>
          <Link className="ux-start-card" href="/szoboszlai">
            <i aria-hidden="true">▦</i>
            <p>Browse the collection</p>
            <h3>Explore every documented card.</h3>
            <small>Open clear records for set, parallel and condition details.</small>
            <b>Open the collection <span aria-hidden="true">→</span></b>
          </Link>
          <Link className="ux-start-card" href="/learn">
            <i aria-hidden="true">?</i>
            <p>Learn the basics</p>
            <h3>Understand collector terms.</h3>
            <small>Use plain-language explanations grounded in real cards.</small>
            <b>Open the glossary <span aria-hidden="true">→</span></b>
          </Link>
        </div>
      </section>

      <section className="ux-flow">
        <div className="content-section">
          <div className="ux-section-head light">
            <div><p className="ux-kicker">A simple viewer journey</p><h2>From Short to full context.</h2></div>
            <p>Each step answers the next natural question without sending you through a generic link page.</p>
          </div>
          <div className="ux-flow-grid">
            <article><span>01</span><i aria-hidden="true">▶</i><h3>Watch</h3><p>A card catches your attention in a YouTube Short.</p></article>
            <article><span>02</span><i aria-hidden="true">⌁</i><h3>Identify</h3><p>The video leads directly to that card’s record.</p></article>
            <article><span>03</span><i aria-hidden="true">◎</i><h3>Understand</h3><p>Check the set, condition and verification status.</p></article>
            <article><span>04</span><i aria-hidden="true">↗</i><h3>Explore</h3><p>Continue to related cards, videos and learning guides.</p></article>
          </div>
        </div>
      </section>

      <section className="ux-collection content-section" aria-labelledby="collection-heading">
        <div className="ux-section-head">
          <div><p className="ux-kicker dark">The documented collection</p><h2 id="collection-heading">Start with a real card.</h2></div>
          <Link href="/szoboszlai">View the full collection <span aria-hidden="true">→</span></Link>
        </div>
        <div className="ux-card-grid">
          {cards.map((card) => (
            <Link className="ux-collection-card" href={`/cards/${card.slug}`} key={card.slug}>
              <div className="ux-collection-image" style={{ backgroundImage: `url('${card.image}')` }}>
                <span>{card.recordId}</span>
              </div>
              <p>{card.year}</p>
              <h3>{card.title}</h3>
              <small>{card.condition}</small>
              <b>Open card record <span aria-hidden="true">→</span></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="ux-knowledge">
        <div className="content-section ux-knowledge-grid">
          <Link href="/learn" className="ux-knowledge-card">
            <span>Collector education</span>
            <h2>Not sure what “parallel” or “graded” means?</h2>
            <p>Learn the terminology with short, readable explanations and examples from the collection.</p>
            <b>Visit the glossary <span aria-hidden="true">→</span></b>
          </Link>
          <Link href="/insights" className="ux-knowledge-card accent">
            <span>Evidence and confidence</span>
            <h2>Know what is verified—and what is still unknown.</h2>
            <p>Prices and claims never appear without context. When the evidence is incomplete, the site says so.</p>
            <b>See the method <span aria-hidden="true">→</span></b>
          </Link>
        </div>
      </section>

      <section className="ux-shorts content-section" aria-labelledby="shorts-heading">
        <div className="ux-section-head">
          <div><p className="ux-kicker dark">Connected to the channel</p><h2 id="shorts-heading">Continue from a Short.</h2></div>
          <a href="https://www.youtube.com/@TCGBusinessElite/shorts" target="_blank" rel="noreferrer" data-track="youtube_return">Watch on YouTube <span aria-label="opens in a new tab">↗</span></a>
        </div>
        <div className="ux-shorts-grid">
          {youtubeContent.map((video, index) => (
            <Link href={`/${video.landingPageSlug}`} className="ux-short" key={video.youtubeId}>
              <div className="ux-short-image" style={{ backgroundImage: `url('${video.thumbnail}')` }}>
                <span>0{index + 1}</span><i aria-hidden="true">▶</i>
              </div>
              <p>YouTube Short</p>
              <h3>{video.title}</h3>
              <b>Continue the story <span aria-hidden="true">→</span></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="ux-final">
        <p>Ready to explore?</p>
        <h2>See the Szoboszlai collection, card by card.</h2>
        <Link className="ux-button dark" href="/szoboszlai">Open the collection <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
