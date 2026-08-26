'use client';

import { useEffect } from 'react';

type LocalAnalytics = {
  version: 1;
  visits: number;
  firstVisit: string;
  lastVisit: string;
  pages: Record<string, number>;
  events: Record<string, number>;
  lastCampaign?: { source?: string; medium?: string; campaign?: string; path: string };
};

export function PrivacyAnalytics() {
  useEffect(() => {
    if (navigator.doNotTrack === '1') return;
    const key = 'tbe_local_analytics_v1';
    const now = new Date().toISOString();
    let record: LocalAnalytics;
    try {
      record = JSON.parse(localStorage.getItem(key) ?? '') as LocalAnalytics;
      if (record.version !== 1) throw new Error('version');
    } catch {
      record = { version: 1, visits: 0, firstVisit: now, lastVisit: now, pages: {}, events: {} };
    }
    record.visits += 1;
    record.lastVisit = now;
    record.pages[location.pathname] = (record.pages[location.pathname] ?? 0) + 1;
    const params = new URLSearchParams(location.search);
    const source = params.get('utm_source')?.slice(0, 80);
    const medium = params.get('utm_medium')?.slice(0, 80);
    const campaign = params.get('utm_campaign')?.slice(0, 80);
    if (source || medium || campaign || document.referrer.includes('youtube.com')) {
      record.lastCampaign = { source: source ?? (document.referrer.includes('youtube.com') ? 'youtube' : undefined), medium, campaign, path: location.pathname };
    }
    localStorage.setItem(key, JSON.stringify(record));

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-track]');
      const name = target?.dataset.track;
      if (!name) return;
      try {
        const current = JSON.parse(localStorage.getItem(key) ?? '{}') as LocalAnalytics;
        current.events ??= {};
        current.events[name] = (current.events[name] ?? 0) + 1;
        localStorage.setItem(key, JSON.stringify(current));
      } catch { /* Device-local measurement is intentionally fail-soft. */ }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
