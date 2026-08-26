'use client';

import { useRef, useState } from 'react';
import type { CardRecord } from '../data';
import { cardImage, cardSrcSet } from '../data';

export function CardInspector({ card, priority = false }: { card: CardRecord; priority?: boolean }) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [zoom, setZoom] = useState(1);
  const touchX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const changeSide = (next: 'front' | 'back') => {
    setSide(next);
    setZoom(1);
  };

  const open = () => dialogRef.current?.showModal();
  const close = () => {
    dialogRef.current?.close();
    setZoom(1);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') changeSide('front');
    if (event.key === 'ArrowRight') changeSide('back');
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const difference = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(difference) > 42) changeSide(difference < 0 ? 'back' : 'front');
    touchX.current = null;
  };

  return (
    <div className="inspector">
      <div
        className={`flip-scene ${side === 'back' ? 'show-back' : ''}`}
        data-track="card-fullscreen-open"
        tabIndex={0}
        role="button"
        aria-label={`Inspect ${side} of ${card.year} ${card.set} card. Use left and right arrow keys to change side; press Enter for fullscreen.`}
        onKeyDown={handleKey}
        onClick={open}
        onTouchStart={(event) => { touchX.current = event.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        <div className="flip-card">
          <div className="flip-face flip-front">
            <img src={cardImage(card, 'front', 960)} srcSet={cardSrcSet(card, 'front')} sizes="(max-width: 700px) 92vw, 520px" alt={`Front of ${card.player}'s ${card.year} ${card.set} card`} fetchPriority={priority ? 'high' : 'auto'} />
          </div>
          <div className="flip-face flip-back">
            <img src={cardImage(card, 'back', 960)} srcSet={cardSrcSet(card, 'back')} sizes="(max-width: 700px) 92vw, 520px" alt={`Back of ${card.player}'s ${card.year} ${card.set} card`} />
          </div>
        </div>
        <span className="inspect-cue"><b>+</b> Fullscreen inspection</span>
      </div>

      <div className="side-controls" aria-label="Card side">
        <button data-track="card-side-change" type="button" onClick={() => changeSide('front')} className={side === 'front' ? 'active' : ''} aria-pressed={side === 'front'}><span>01</span> Front</button>
        <button data-track="card-side-change" type="button" onClick={() => changeSide('back')} className={side === 'back' ? 'active' : ''} aria-pressed={side === 'back'}><span>02</span> Back</button>
        <button data-track="card-fullscreen-open" type="button" className="fullscreen-control" onClick={open}>Fullscreen <span aria-hidden="true">↗</span></button>
      </div>
      <p className="gesture-note" aria-live="polite">Showing {side}. Swipe or use ← → to change side.</p>

      <dialog className="image-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) close(); }} onClose={() => setZoom(1)}>
        <div className="dialog-shell">
          <div className="dialog-head">
            <div><span>High-resolution inspection</span><strong>{card.player} · {side}</strong></div>
            <button type="button" onClick={close} aria-label="Close fullscreen image">Close ×</button>
          </div>
          <div className="zoom-stage" onDoubleClick={() => setZoom(zoom === 1 ? 2 : 1)}>
            <img src={cardImage(card, side, 1920)} alt={`${side} of ${card.player}'s ${card.set} card at high resolution`} style={{ transform: `scale(${zoom})` }} />
          </div>
          <div className="dialog-controls">
            <button type="button" onClick={() => changeSide(side === 'front' ? 'back' : 'front')}>Show {side === 'front' ? 'back' : 'front'}</button>
            <div><button type="button" onClick={() => setZoom(Math.max(1, zoom - .5))} disabled={zoom <= 1} aria-label="Zoom out">−</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom(Math.min(3, zoom + .5))} disabled={zoom >= 3} aria-label="Zoom in">+</button></div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
