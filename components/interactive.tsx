'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CardBack, CardFront } from './card-visual';
import type { CardRecord, YouTubeContent } from '@/lib/data';

export function CardExplorer({ card }: { card: CardRecord }) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  return (
    <div className="card-explorer">
      <div className="explorer-stage">
        <div className={`flip-shell ${side === 'back' ? 'is-back' : ''}`}>
          <div className="flip-face"><CardFront card={card} /></div>
          <div className="flip-face flip-back"><CardBack card={card} /></div>
        </div>
      </div>
      <div className="side-switch" aria-label="Choose card side">
        <button className={side === 'front' ? 'active' : ''} onClick={() => setSide('front')}><span>01</span> Front</button>
        <button className={side === 'back' ? 'active' : ''} onClick={() => setSide('back')}><span>02</span> Back</button>
      </div>
    </div>
  );
}

export function PrivacyVideo({ video }: { video: YouTubeContent }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="privacy-video">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button className="video-poster" onClick={() => setLoaded(true)} aria-label={`Load ${video.title} from YouTube`}>
          <span className="poster-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.7), rgba(0,0,0,.1)), url('${video.thumbnail}')` }} />
          <span className="poster-copy"><i>Featured on YouTube</i><b>{video.title}</b><em><span>▶</span> Click to load from YouTube</em></span>
        </button>
      )}
      <p>Video loads only after you choose to play it. Playback uses YouTube’s privacy-enhanced domain; YouTube may still process data once loaded.</p>
    </div>
  );
}

export function CollectionExplorer({ cards }: { cards: CardRecord[] }) {
  const [youtubeOnly, setYoutubeOnly] = useState(false);
  const visible = cards.filter((card) => !youtubeOnly || card.videoIds.length > 0);
  return (
    <div>
      <div className="collection-toolbar">
        <div><span>Collection index</span><b>{visible.length} records</b></div>
        <button className={youtubeOnly ? 'active' : ''} onClick={() => setYoutubeOnly(!youtubeOnly)}>
          <span className="toggle"><i /></span> Featured on YouTube
        </button>
      </div>
      <div className="collection-grid">
        {visible.map((card, index) => (
          <Link className="collection-item" href={`/cards/${card.slug}`} key={card.slug}>
            <div className="collection-image" style={{ backgroundImage: `url('${card.image}')` }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {card.videoIds.length > 0 && <b>▶ On YouTube</b>}
            </div>
            <div className="collection-copy">
              <small>{card.year} · {card.cardNumber}</small>
              <h3>{card.title}</h3>
              <p>{card.parallel}</p>
              <span>View record →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
