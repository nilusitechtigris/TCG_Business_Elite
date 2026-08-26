import type { Metadata } from 'next';
import Link from 'next/link';
import { AttributionTracker } from '@/components/attribution';
import { PrivacyVideo } from '@/components/interactive';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { youtubeContent } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Featured on YouTube | TCG Business Elite',
  description: 'Continue from TCG Business Elite Shorts to the exact cards, collection records and market tracking featured in each video.',
};

export default function YouTubePage() {
  return (
    <main>
      <AttributionTracker />
      <SiteHeader />
      <section className="editorial-hero">
        <p className="eyebrow"><span /> Channel companion</p>
        <h1>From 30 seconds<br /><i>to the full record.</i></h1>
        <p>Choose the Short you came from. Each landing page reconnects you with the featured card, its collection record and available market evidence.</p>
        <a className="button-primary youtube-button" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer" data-track="youtube_return"><span>▶</span> Visit TCG Business Elite <i>↗</i></a>
      </section>

      <section className="video-index content-section">
        <div className="section-kicker">Selected Shorts</div>
        <div className="video-index-grid">
          {youtubeContent.map((video, index) => (
            <Link href={`/${video.landingPageSlug}`} className="video-index-item" key={video.youtubeId}>
              <div className="video-index-image" style={{ backgroundImage: `url('${video.thumbnail}')` }}><span>0{index + 1}</span><b>▶</b></div>
              <div><small>{video.videoType} · {video.ctaVersion.replace('-', ' ')}</small><h2>{video.title}</h2><p>Open its connected card page →</p></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="privacy-demo content-section">
        <div className="video-copy"><span>Privacy by design</span><h2>Preview first.<br /><i>Load by choice.</i></h2><p>Channel thumbnails load locally on this site. The embedded player is created only after a visitor actively asks for it.</p></div>
        <PrivacyVideo video={youtubeContent[1]} />
      </section>
      <SiteFooter />
    </main>
  );
}
