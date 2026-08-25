'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Goal = 'shorts' | 'collection' | 'learn';
type Depth = 'guided' | 'complete' | 'evidence';

const goals: { id: Goal; label: string; description: string }[] = [
  { id: 'shorts', label: 'Cards from Shorts', description: 'Continue from the channel' },
  { id: 'collection', label: 'Explore Szoboszlai', description: 'Browse card by card' },
  { id: 'learn', label: 'Learn the hobby', description: 'Start with plain English' },
];

const depths: { id: Depth; label: string; description: string }[] = [
  { id: 'guided', label: 'Beginner-friendly', description: 'Recommended starting point' },
  { id: 'complete', label: 'Complete records', description: 'Show every documented field' },
  { id: 'evidence', label: 'Evidence first', description: 'Focus on confidence and sources' },
];

const recommendations: Record<Goal, { eyebrow: string; title: string; description: string; href: string; action: string }> = {
  shorts: { eyebrow: 'Recommended from your goal', title: 'Follow the Short to its card.', description: 'Start with the latest connected video, then open the exact record and related collection cards.', href: '/youtube', action: 'Open connected Shorts' },
  collection: { eyebrow: 'Recommended from your goal', title: 'Build the Szoboszlai story.', description: 'Browse the player collection with video status, card identity and verification notes in one view.', href: '/szoboszlai', action: 'Open the collection' },
  learn: { eyebrow: 'Recommended from your goal', title: 'Understand the card first.', description: 'Learn six essential terms, then see each one applied to a documented collection record.', href: '/learn', action: 'Open the collector guide' },
};

const storageKey = 'tcgbe_collection_path_v1';

export function GuidedCollectionPath() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [goal, setGoal] = useState<Goal>('shorts');
  const [depth, setDepth] = useState<Depth>('guided');
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null') as { goal?: Goal; depth?: Depth; phase?: 0 | 1 | 2 } | null;
      if (stored?.goal) setGoal(stored.goal);
      if (stored?.depth) setDepth(stored.depth);
      if (stored?.phase) { setPhase(stored.phase); setRestored(true); }
    } catch { /* A missing local preference simply uses the smart default. */ }
  }, []);

  useEffect(() => {
    if (phase === 0) return;
    localStorage.setItem(storageKey, JSON.stringify({ goal, depth, phase }));
  }, [goal, depth, phase]);

  const progress = phase === 0 ? 25 : phase === 1 ? 65 : 100;
  const result = useMemo(() => recommendations[goal], [goal]);

  const reset = () => {
    localStorage.removeItem(storageKey);
    setGoal('shorts');
    setDepth('guided');
    setPhase(0);
    setRestored(false);
  };

  return (
    <section className="guided-path-section">
      <div className="content-section guided-path-shell">
        <div className="guided-path-head">
          <div>
            <p className="product-kicker"><span>●</span> Your collection path</p>
            <h2>A useful starting point,<br /><i>already prepared.</i></h2>
          </div>
          <div className="path-progress">
            <div><span>{restored ? 'Welcome back' : 'Your path'}</span><b>{progress}% ready</b></div>
            <span className="path-progress-track"><i style={{ width: `${progress}%` }} /></span>
            <small>{phase === 0 ? 'You already have a head start.' : phase === 1 ? 'One quick choice left.' : 'Ready whenever you are.'}</small>
          </div>
        </div>

        <div className="guided-path-grid">
          <div className="path-builder">
            <div className="builder-step-title"><span>{phase === 0 ? '01' : phase === 1 ? '02' : '✓'}</span><div><b>{phase === 0 ? 'What brought you here?' : phase === 1 ? 'How much detail would you like?' : 'Your path is ready.'}</b><small>{phase === 0 ? 'We selected the most common choice for YouTube visitors.' : phase === 1 ? 'A beginner-friendly view is selected by default.' : 'You can change these choices at any time.'}</small></div></div>

            {phase === 0 && (
              <div className="path-options" role="radiogroup" aria-label="Choose your collection goal">
                {goals.map((item) => <button key={item.id} role="radio" aria-checked={goal === item.id} className={goal === item.id ? 'selected' : ''} onClick={() => setGoal(item.id)}><i>{goal === item.id ? '✓' : ''}</i><span><b>{item.label}</b><small>{item.description}</small></span>{item.id === 'shorts' && <em>Smart default</em>}</button>)}
              </div>
            )}

            {phase === 1 && (
              <div className="path-options" role="radiogroup" aria-label="Choose your preferred detail level">
                {depths.map((item) => <button key={item.id} role="radio" aria-checked={depth === item.id} className={depth === item.id ? 'selected' : ''} onClick={() => setDepth(item.id)}><i>{depth === item.id ? '✓' : ''}</i><span><b>{item.label}</b><small>{item.description}</small></span>{item.id === 'guided' && <em>Recommended</em>}</button>)}
              </div>
            )}

            {phase === 2 && (
              <div className="path-complete">
                <span>Built by you</span><b>{goals.find((item) => item.id === goal)?.label}</b><p>{depths.find((item) => item.id === depth)?.label} · saved on this device</p>
              </div>
            )}

            <div className="builder-actions">
              {phase === 0 && <button className="app-button" onClick={() => setPhase(1)}>Continue with this goal <span>→</span></button>}
              {phase === 1 && <><button className="path-back" onClick={() => setPhase(0)}>← Back</button><button className="app-button" onClick={() => setPhase(2)}>Build my path <span>→</span></button></>}
              {phase === 2 && <button className="path-back" onClick={reset}>Start over</button>}
            </div>
            <p className="local-note"><span>◉</span> No account needed. Your choices stay only in this browser, so you can return without losing your place.</p>
          </div>

          <aside className="path-result">
            <div className="result-top"><span>{result.eyebrow}</span><i>{phase === 2 ? 'READY' : 'FREE PREVIEW'}</i></div>
            <h3>{result.title}</h3><p>{result.description}</p>
            <div className="result-contrast">
              <div className="known"><span>Known</span><b>6 verified fields</b><small>Identity · set · condition</small></div>
              <div className="pending"><span>Pending</span><b>Market evidence</b><small>Never replaced by a guess</small></div>
            </div>
            <Link className={`app-button result-button ${phase < 2 ? 'preview' : ''}`} href={result.href}>{phase < 2 ? 'Preview this path' : result.action} <span>→</span></Link>
            <small className="value-first">Full card information comes before any request to register.</small>
          </aside>
        </div>
      </div>
    </section>
  );
}
