import Link from 'next/link';

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="TCG Business Elite home">
      <span className="brand-mark" aria-hidden="true">BE</span>
      <span className="brand-name"><b>TCG BUSINESS</b><em>ELITE</em></span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/szoboszlai">Collection</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/learn">Learn</Link>
      </nav>
      <a
        className="youtube-link"
        href="https://www.youtube.com/@TCGBusinessElite"
        target="_blank"
        rel="noreferrer"
        data-track="youtube_return"
      >
        <span className="play-dot" aria-hidden="true">▶</span>
        YouTube <span aria-label="opens in a new tab">↗</span>
      </a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Brand />
        <p>Documenting the details, context and evidence behind a focused football-card collection.</p>
      </div>
      <div className="footer-links">
        <span>Explore</span>
        <Link href="/szoboszlai">Szoboszlai collection</Link>
        <Link href="/youtube">Featured on YouTube</Link>
        <Link href="/learn">Collector glossary</Link>
      </div>
      <div className="footer-links">
        <span>Follow</span>
        <a href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer" data-track="youtube_return">YouTube ↗</a>
        <Link href="/insights">Campaign insights</Link>
      </div>
      <div className="footer-bottom">
        <p>Independent collection documentation. No affiliation with any player, club, league, manufacturer or grading company.</p>
        <p>Player photo: Timmy96, CC0 via Wikimedia Commons. YouTube thumbnails belong to their respective channel content.</p>
      </div>
    </footer>
  );
}
