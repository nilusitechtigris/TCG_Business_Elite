import Link from 'next/link';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="nav-shell">
      <Link className="brand" href="/" aria-label="TCG Business Elite home">
        <span className="brand-mark" aria-hidden="true">TBE</span>
        <span>TCG Business Elite</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/szoboszlai">Collection</Link>
        <Link href="/youtube">YouTube</Link>
      </nav>
      <div className="nav-right">
        <a className="nav-action" data-track="youtube-return-click" href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer noopener">
          <span aria-hidden="true">▶</span> Subscribe
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" href="/">
        <span className="brand-mark" aria-hidden="true">TBE</span>
        <span>TCG Business Elite</span>
      </Link>
      <p>Collection documentation and estimated market tracking. Not financial advice.</p>
      <div>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/szoboszlai">Collection</Link>
        <a href="https://www.youtube.com/@TCGBusinessElite" target="_blank" rel="noreferrer">YouTube ↗</a>
      </div>
      <small>© 2026 TCG Business Elite · Original collection photography</small>
    </footer>
  );
}

const tickerItems = [
  '22 cards owned',
  '44 original photographs',
  '18 serial numbered',
  '6 × PSA 10',
  'Topps · Panini',
  'Salzburg → Leipzig → Liverpool',
];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((loop) => (
          <span key={loop}>
            {tickerItems.map((item) => <span key={item}><b>{item}</b><i>✦</i></span>)}
          </span>
        ))}
      </div>
    </div>
  );
}
