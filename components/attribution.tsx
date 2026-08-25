'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export type FunnelEventName =
  | 'first_visit'
  | 'return_visit'
  | 'landing_view'
  | 'engaged_visit'
  | 'card_view'
  | 'collection_view'
  | 'education_view'
  | 'youtube_return';

type FunnelEvent = {
  event: FunnelEventName;
  at: string;
  page: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  referrerDomain?: string;
};

const STORE_KEY = 'tcgbe_privacy_events_v1';
const LAST_VISIT_KEY = 'tcgbe_last_visit_v1';

function readEvents(): FunnelEvent[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]') as FunnelEvent[]; }
  catch { return []; }
}

function pageEvent(pathname: string): FunnelEventName {
  if (pathname.startsWith('/cards/') || pathname.startsWith('/shorts/')) return 'card_view';
  if (pathname.startsWith('/szoboszlai') || pathname.startsWith('/sets/')) return 'collection_view';
  if (pathname.startsWith('/learn')) return 'education_view';
  return 'landing_view';
}

function persist(event: FunnelEvent) {
  const events = [...readEvents(), event].slice(-200);
  localStorage.setItem(STORE_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('tcgbe:analytics'));
}

export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clean = (key: string) => (params.get(key) || '').slice(0, 80) || undefined;
    let referrerDomain: string | undefined;
    try { referrerDomain = document.referrer ? new URL(document.referrer).hostname.slice(0, 80) : undefined; }
    catch { referrerDomain = undefined; }

    const base = {
      at: new Date().toISOString(),
      page: pathname,
      source: clean('utm_source'),
      medium: clean('utm_medium'),
      campaign: clean('utm_campaign'),
      content: clean('utm_content'),
      referrerDomain,
    };

    const today = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    if (!lastVisit) persist({ ...base, event: 'first_visit' });
    else if (lastVisit !== today) persist({ ...base, event: 'return_visit' });
    localStorage.setItem(LAST_VISIT_KEY, today);
    persist({ ...base, event: pageEvent(pathname) });

    const engaged = window.setTimeout(() => persist({ ...base, at: new Date().toISOString(), event: 'engaged_visit' }), 12000);
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-track="youtube_return"]')) {
        persist({ ...base, at: new Date().toISOString(), event: 'youtube_return' });
      }
    };
    document.addEventListener('click', click);
    return () => { window.clearTimeout(engaged); document.removeEventListener('click', click); };
  }, [pathname]);

  return null;
}

const funnelStages: { event: FunnelEventName; label: string; note: string }[] = [
  { event: 'landing_view', label: 'Landing visits', note: 'Campaign or direct entry' },
  { event: 'engaged_visit', label: 'Engaged visits', note: '12+ seconds on page' },
  { event: 'card_view', label: 'Card interactions', note: 'Card or Short detail views' },
  { event: 'collection_view', label: 'Collection exploration', note: 'Collection and set views' },
  { event: 'education_view', label: 'Education visits', note: 'Glossary or guide views' },
  { event: 'youtube_return', label: 'YouTube return clicks', note: 'Outbound channel or Short clicks' },
];

export function LocalFunnelDashboard() {
  const [events, setEvents] = useState<FunnelEvent[]>([]);
  useEffect(() => {
    const refresh = () => setEvents(readEvents());
    refresh();
    window.addEventListener('tcgbe:analytics', refresh);
    return () => window.removeEventListener('tcgbe:analytics', refresh);
  }, []);

  const campaign = useMemo(() => {
    const hit = [...events].reverse().find((event) => event.campaign);
    return hit?.campaign || 'direct / untagged';
  }, [events]);

  return (
    <div className="funnel-dashboard">
      <div className="dashboard-head">
        <div><span>Private preview</span><h2>This device’s journey</h2></div>
        <p>No cookies · no fingerprinting · stored only in this browser</p>
      </div>
      <div className="campaign-chip">Current campaign <b>{campaign}</b></div>
      <div className="funnel-grid">
        {funnelStages.map((stage, index) => {
          const count = events.filter((event) => event.event === stage.event).length;
          return (
            <div className="funnel-stage" key={stage.event}>
              <span>0{index + 1}</span>
              <strong>{count}</strong>
              <b>{stage.label}</b>
              <small>{stage.note}</small>
            </div>
          );
        })}
      </div>
      <p className="dashboard-note">Advertising engagement is deliberately excluded from this funnel and should be reported separately.</p>
    </div>
  );
}
