'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/szoboszlai', label: 'Collection' },
  { href: '/youtube', label: 'YouTube' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        type="button"
        className={`menu-toggle${open ? ' open' : ''}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        data-track="mobile-menu-toggle"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div id="mobile-menu" className="mobile-panel" ref={panelRef} hidden={!open}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}<span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        <a
          className="mobile-subscribe"
          href="https://www.youtube.com/@TCGBusinessElite"
          target="_blank"
          rel="noreferrer noopener"
          data-track="youtube-return-click"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden="true">▶</span> Subscribe on YouTube
        </a>
      </div>
    </div>
  );
}
