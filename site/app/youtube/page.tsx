import Link from 'next/link';
import { CardInspector } from '../components/CardInspector';
import { Footer, Header } from '../components/Header';
import { cards } from '../data';

export const metadata = { title: 'YouTube Companion | TCG Business Elite', description: 'The campaign bridge from TCG Business Elite videos and Shorts to individual collection cards.' };

export default function YouTubePage() {
  const card = cards[0];
  return <main><Header />
    <section className="youtube-hero">
      <div className="youtube-copy"><p className="eyebrow"><span /> YouTube companion</p><h1>Watch the story.<br /><em>Inspect the card.</em></h1><p>Short-specific routes connect an exact physical card to its photography, its modelled price, the confidence behind it and the rest of the collection.</p><div className="hero-actions"><a className="button-primary" data-track="youtube-return-click" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer">Visit the channel <span>↗</span></a><Link className="text-link" href="/shorts/deco-red-07-10">Preview a Short landing →</Link></div><div className="privacy-note"><span aria-hidden="true">◎</span><p><strong>Privacy first</strong>YouTube embeds load only after a visitor chooses to play. This site currently links out without loading third-party tracking.</p></div></div>
      <div className="youtube-feature"><div className="short-frame"><span>SHORT PREVIEW</span><CardInspector card={card} priority /></div><div className="short-caption"><span>Featured route</span><strong>/shorts/deco-red-07-10</strong><small>Video association not yet confirmed</small></div></div>
    </section>
    <section className="campaign-model"><div><p className="eyebrow"><span /> Campaign structure</p><h2>One Short.<br />One direct route.</h2></div><ol><li><span>01</span><strong>Campaign visit</strong><p>UTM and route context are captured device-locally.</p></li><li><span>02</span><strong>Exact card</strong><p>Front, back and confirmed identity appear immediately.</p></li><li><span>03</span><strong>Value context</strong><p>History, comparables and confidence stay source-aware.</p></li><li><span>04</span><strong>Return to YouTube</strong><p>A prominent action completes the loop without a gate.</p></li></ol></section>
    <section className="youtube-empty"><span className="youtube-play" aria-hidden="true">▶</span><div><p className="eyebrow">Linked content</p><h2>No videos linked yet.</h2><p>The channel URL is confirmed. Individual video IDs, titles, publication dates and card associations remain unconfirmed and have not been invented.</p></div><a className="text-link" data-track="youtube-return-click" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer">Open TCG Business Elite on YouTube ↗</a></section>
    <Footer />
  </main>;
}
