import type { Metadata } from 'next';
import { AttributionTracker, LocalFunnelDashboard } from '@/components/attribution';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Campaign Insights | TCG Business Elite',
  description: 'A privacy-conscious view of the YouTube-to-website funnel and reusable Short campaign templates.',
};

const templates = [
  { letter: 'A', name: 'Card showcase', hook: 'Do you know what makes this Szoboszlai card different?', body: 'Show the card, manufacturer, set, parallel and one distinguishing feature.', cta: 'See the front, back, complete details and available price history through the first link on my channel profile.' },
  { letter: 'B', name: 'Price-history story', hook: 'How has this Szoboszlai card’s market changed?', body: 'Explain one confirmed market observation without presenting it as a guaranteed valuation.', cta: 'See the complete timeline, sources and confidence level on the website through my profile.' },
  { letter: 'C', name: 'Education', hook: 'What does a numbered football card actually mean?', body: 'Give a concise explanation using a card from the collection.', cta: 'The complete beginner’s guide and examples are available through the first profile link.' },
  { letter: 'D', name: 'Collection discovery', hook: 'Card number {number} in my Szoboszlai collection.', body: 'Highlight why the card was added and what makes it interesting.', cta: 'Explore the full Szoboszlai collection through the link on my channel profile.' },
];

export default function InsightsPage() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="editorial-hero insights-hero">
        <p className="eyebrow"><span /> Audience acquisition</p>
        <h1>Measure the journey.<br /><i>Respect the visitor.</i></h1>
        <p>A simple funnel that separates useful audience behavior from vanity metrics—and keeps advertising performance in its own lane.</p>
      </section>

      <section className="dashboard-section content-section">
        <div className="section-kicker">Funnel dashboard</div>
        <LocalFunnelDashboard />
      </section>

      <section className="path-section content-section">
        <div className="split-heading"><h2>One Short.<br /><i>One clear path.</i></h2><p>Ordinary Shorts URLs are not treated as the primary conversion mechanism. Calls to action point viewers to compliant surfaces and memorable destinations.</p></div>
        <div className="path-flow">
          <div><span>01</span><b>YouTube Short</b><small>spoken + on-screen CTA</small></div><i>→</i>
          <div><span>02</span><b>First profile link</b><small>or qualifying related video</small></div><i>→</i>
          <div><span>03</span><b>/szoboszlai</b><small>campaign-aware landing page</small></div><i>→</i>
          <div><span>04</span><b>Card record</b><small>identity, context, next action</small></div>
        </div>
        <div className="campaign-examples">
          <div><span>Profile campaign</span><code>/szoboszlai?utm_source=youtube&amp;utm_medium=channel_profile&amp;utm_campaign=szoboszlai_collection</code></div>
          <div><span>Memorable on-screen path</span><code>/shorts/WbuR2PnN2j4</code></div>
        </div>
      </section>

      <section className="template-section">
        <div className="content-section"><div className="section-kicker">Reusable campaign kit</div><div className="split-heading"><h2>Four Short<br /><i>story engines.</i></h2><p>Each template preserves the same low-friction promise: the website continues the exact story introduced in the video.</p></div></div>
        <div className="template-grid content-section">
          {templates.map((template) => (
            <article key={template.letter}>
              <div><span>Template</span><strong>{template.letter}</strong></div>
              <small>{template.name}</small>
              <h3>“{template.hook}”</h3>
              <p>{template.body}</p>
              <blockquote><b>CTA</b>{template.cta}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-principles content-section">
        <div><span>Privacy baseline</span><h2>Useful attribution,<br /><i>nothing personal.</i></h2></div>
        <ul><li>Allowlisted UTM and content identifiers only</li><li>Referrer domain, never the full URL</li><li>No email or personal data in campaign links</li><li>No cookies or browser fingerprinting</li><li>Local return-visit signal in this prototype</li><li>YouTube loads only after deliberate play</li></ul>
      </section>
      <SiteFooter />
    </main>
  );
}
