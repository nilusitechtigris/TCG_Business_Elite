import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { CardFront } from '@/components/card-visual';
import { GuidedCollectionPath } from '@/components/guided-path';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { cards, youtubeContent } from '@/lib/data';

const featured = cards[0];

export default function Home() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />

      <section className="collectr-hero">
        <div className="collectr-glow collectr-glow-one" />
        <div className="collectr-glow collectr-glow-two" />
        <div className="collectr-copy">
          <p className="product-kicker"><span>●</span> The companion to TCG Business Elite Shorts</p>
          <h1>Know the story<br />behind <i>every card.</i></h1>
          <p>Continue beyond the Short with connected card records, visible verification status and collector education—built around evidence, not hype.</p>
          <div className="collectr-actions">
            <Link className="app-button" href="/szoboszlai?utm_source=website&utm_medium=homepage&utm_campaign=szoboszlai_collection">Explore the collection <span>→</span></Link>
            <a className="app-button secondary" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer" data-track="youtube_return"><span className="mini-play">▶</span> Watch on YouTube <i>↗</i></a>
          </div>
          <div className="hero-microproof"><span><i>✓</i> Card-specific landings</span><span><i>✓</i> Privacy-first video</span><span><i>✓</i> Honest confidence</span></div>
        </div>

        <div className="product-stage" aria-label="TCG Business Elite collection dashboard preview">
          <span className="float-chip chip-top"><i>✓</i> Record verified</span>
          <span className="float-chip chip-side">▶ Featured in Short</span>
          <div className="dashboard-shell">
            <div className="dashboard-topbar"><div><span className="dash-logo">BE</span><b>Collection pulse</b></div><span className="live-pill"><i /> LIVE ARCHIVE</span></div>
            <div className="dashboard-tabs"><b>Overview</b><span>Shorts</span><span>Evidence</span></div>
            <div className="dashboard-main-stat"><small>Documented collection</small><strong>03 <em>cards</em></strong><p><span>↑</span> 3 connected YouTube Shorts</p></div>
            <div className="signal-chart" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="dashboard-records">
              <div className="record-row"><span className="record-thumb" style={{ backgroundImage: `url('${cards[0].image}')` }} /><p><b>Future Stars · PSA 10</b><small>Identity verified</small></p><strong>High</strong></div>
              <div className="record-row"><span className="record-thumb" style={{ backgroundImage: `url('${cards[1].image}')` }} /><p><b>Chrome · Blue parallel</b><small>Checklist review pending</small></p><strong>Open</strong></div>
            </div>
          </div>
          <div className="stage-card"><CardFront card={featured} /></div>
          <div className="confidence-float"><small>Market confidence</small><b>Insufficient data</b><span><i /></span><p>We wait for evidence.</p></div>
        </div>
      </section>

      <section className="proof-strip">
        <div><strong>03</strong><span>Documented records</span><small>Identity and condition</small></div>
        <div><strong>03</strong><span>Connected Shorts</span><small>Real video IDs</small></div>
        <div><strong>00</strong><span>Unverified price claims</span><small>Evidence before estimate</small></div>
        <div><strong>100%</strong><span>Source-led</span><small>Context over hype</small></div>
      </section>

      <GuidedCollectionPath />

      <section className="feature-hub">
        <div className="content-section">
          <p className="product-kicker dark"><span>●</span> One place, the whole story</p>
          <div className="hub-heading"><h2>Everything your<br /><i>collection needs.</i></h2><p>Each feature is designed to answer the next useful question after a viewer discovers a card on YouTube.</p></div>
          <div className="bento-grid">
            <Link className="bento-card bento-large" href={`/cards/${featured.slug}`}>
              <div className="bento-icon">↗</div><span>Connected records</span><h3>Land on the exact card.</h3><p>Front, back, set, parallel, condition and verification status are visible without hunting.</p>
              <div className="mini-record-stack">
                {cards.slice(0,3).map((card, index) => <span key={card.slug} style={{ backgroundImage: `url('${card.image}')`, transform: `translateX(${index * 70}px) rotate(${index * 3 - 3}deg)` }} />)}
              </div>
            </Link>
            <Link className="bento-card bento-video" href="/youtube">
              <div className="bento-icon play">▶</div><span>Featured on YouTube</span><h3>The Short stays connected.</h3><p>Continue the exact story with a privacy-conscious video preview.</p>
              <div className="bento-video-thumb" style={{ backgroundImage: `url('${youtubeContent[1].thumbnail}')` }}><b>CLICK TO LOAD</b></div>
            </Link>
            <Link className="bento-card" href="/learn">
              <div className="bento-icon">?</div><span>Collector education</span><h3>Learn the language.</h3><p>Parallel, insert, serial number and condition—explained with cards from the collection.</p><em>Open the glossary →</em>
            </Link>
            <Link className="bento-card" href="/insights">
              <div className="bento-icon">⌁</div><span>Market confidence</span><h3>Evidence beside the number.</h3><p>Every market observation carries its source and confidence. Missing data stays honest.</p><em>See the method →</em>
            </Link>
            <Link className="bento-card bento-wide" href="/szoboszlai">
              <div><div className="bento-icon">▦</div><span>Collection discovery</span><h3>Explore card by card.</h3><p>Filter the archive for cards that appeared in videos, then move naturally into related records and sets.</p><em>Browse Szoboszlai →</em></div>
              <div className="collection-preview">
                {cards.map((card) => <span key={card.slug} style={{ backgroundImage: `url('${card.image}')` }}><i>▶</i><b>{card.recordId}</b></span>)}
              </div>
            </Link>
          </div>
        </div>
      </section>

      <div className="brand-ribbon"><span>CARDS</span><i>✦</i><span>SHORTS</span><i>✦</i><span>CONTEXT</span><i>✦</i><span>EVIDENCE</span><i>✦</i><span>COLLECTION</span></div>

      <section className="channel-showcase">
        <div className="content-section">
          <div className="hub-heading light"><div><p className="product-kicker"><span>●</span> Live from the channel</p><h2>Every Short gets<br /><i>a useful next step.</i></h2></div><a href="https://www.youtube.com/@TCGBusinessElite/shorts" target="_blank" rel="noreferrer" data-track="youtube_return">View all Shorts ↗</a></div>
          <div className="new-shorts-grid">
            {youtubeContent.map((video, index) => (
              <Link href={`/${video.landingPageSlug}`} className="new-short" key={video.youtubeId}>
                <div className="new-short-image" style={{ backgroundImage: `url('${video.thumbnail}')` }}><span>0{index + 1}</span><i>▶</i><b>CONNECTED</b></div>
                <small>SHORT · {video.ctaVersion.replace('-', ' ')}</small><h3>{video.title}</h3><p>Continue the story <span>→</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-panel">
        <div className="content-section">
          <p className="product-kicker dark"><span>●</span> Built for the viewer journey</p>
          <div className="hub-heading"><h2>One Short.<br /><i>One clear path.</i></h2><p>No generic link dump. Every campaign can continue with the card and terminology the viewer already recognizes.</p></div>
          <div className="new-journey-grid">
            <div><span>01</span><b>Watch</b><p>A card catches your eye in a TCG Business Elite Short.</p></div><i>→</i>
            <div><span>02</span><b>Identify</b><p>A memorable URL lands on that exact card record.</p></div><i>→</i>
            <div><span>03</span><b>Understand</b><p>Inspect identity, condition and confidence without friction.</p></div><i>→</i>
            <div><span>04</span><b>Explore</b><p>Move into related cards, sets and collector education.</p></div>
          </div>
        </div>
      </section>

      <section className="new-final-cta">
        <div className="cta-orbit"><span>BE</span></div>
        <p>Start with the player at the heart of the collection.</p><h2>Explore Szoboszlai,<br /><i>card by card.</i></h2>
        <Link className="app-button dark" href="/szoboszlai">Open the collection <span>→</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
