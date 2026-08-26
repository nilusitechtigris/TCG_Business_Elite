'use client';

import { useState } from 'react';

const ranges = ['1M', '3M', '6M', '1Y', 'ALL'] as const;

export function DataChart({ compact = false }: { compact?: boolean }) {
  const [range, setRange] = useState<(typeof ranges)[number]>('ALL');
  return (
    <section className={`chart-panel${compact ? ' compact-chart' : ''}`} aria-labelledby="chart-title">
      <div className="chart-head">
        <div><span id="chart-title">Estimated market value over time</span><strong>One modelled point so far</strong></div>
        <div className="range-tabs" aria-label="Chart time range">
          {ranges.map((item) => <button data-track="chart-range-change" type="button" key={item} className={range === item ? 'active' : ''} aria-pressed={range === item} onClick={() => setRange(item)}>{item}</button>)}
        </div>
      </div>
      <div className="chart-empty" role="img" aria-label={`No valuation trend available for the ${range} period; a single modelled valuation exists`}>
        <div className="chart-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="axis-labels" aria-hidden="true"><span>€—</span><span>€—</span><span>€—</span></div>
        <div className="empty-note"><span>{range} PRICE HISTORY</span><strong>No trend yet</strong><p>A trend line needs at least two dated valuations. The current model run is dated 26 Aug 2026; confirmed sales and future runs will plot here.</p></div>
      </div>
      <div className="chart-legend">
        <span><i className="dot gold" /> Model estimate</span>
        <span><i className="dash" /> Cost basis</span>
        <span><i className="marker" /> Acquisition event</span>
        <span><i className="diamond" /> Valuation update</span>
      </div>
    </section>
  );
}
