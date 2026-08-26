import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "szoboszlai-2023-prizm-silver",
    slug: "szoboszlai-2023-prizm-silver",
    player: "Dominik Szoboszlai",
    set: "2023-24 Panini Prizm Premier League",
    parallel: "Silver Prizm",
    condition: "PSA 10",
    number: null,
    year: 2023,
    front: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?w=400&h=560&fit=crop&auto=format",
    back: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=560&fit=crop&auto=format",
    priceHistory: [
      { date: "Jan 24", price: 42 },
      { date: "Feb 24", price: 55 },
      { date: "Mar 24", price: 61 },
      { date: "Apr 24", price: 58 },
      { date: "May 24", price: 74 },
      { date: "Jun 24", price: 89 },
    ],
    currentPrice: 89,
    confidence: "high",
    videoId: "dQw4w9WgXcQ",
    videoType: "Short",
    videoTitle: "Why this Szoboszlai Prizm is heating up 🔥",
    featured: true,
    tags: ["prizm", "premier-league", "graded"],
  },
  {
    id: "szoboszlai-2022-topps-chrome",
    slug: "szoboszlai-2022-topps-chrome",
    player: "Dominik Szoboszlai",
    set: "2022-23 Topps Chrome UEFA",
    parallel: "Gold Refractor",
    condition: "PSA 9",
    number: "/50",
    year: 2022,
    front: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=560&fit=crop&auto=format",
    back: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=560&fit=crop&auto=format",
    priceHistory: [
      { date: "Jan 24", price: 180 },
      { date: "Feb 24", price: 195 },
      { date: "Mar 24", price: 210 },
      { date: "Apr 24", price: 228 },
      { date: "May 24", price: 245 },
      { date: "Jun 24", price: 267 },
    ],
    currentPrice: 267,
    confidence: "medium",
    videoId: "dQw4w9WgXcQ",
    videoType: "Short",
    videoTitle: "Numbered /50 — what does that mean?",
    featured: true,
    tags: ["chrome", "numbered", "graded", "refractor"],
  },
  {
    id: "szoboszlai-2023-select-tri",
    slug: "szoboszlai-2023-select-tri",
    player: "Dominik Szoboszlai",
    set: "2023-24 Panini Select",
    parallel: "Tri-Color",
    condition: "Raw NM-MT",
    number: null,
    year: 2023,
    front: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=560&fit=crop&auto=format",
    back: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=560&fit=crop&auto=format",
    priceHistory: [
      { date: "Jan 24", price: 18 },
      { date: "Feb 24", price: 21 },
      { date: "Mar 24", price: 19 },
      { date: "Apr 24", price: 24 },
      { date: "May 24", price: 27 },
      { date: "Jun 24", price: 31 },
    ],
    currentPrice: 31,
    confidence: "high",
    videoId: "dQw4w9WgXcQ",
    videoType: "Short",
    videoTitle: "Entry-level Szoboszlai find under £30",
    featured: false,
    tags: ["select", "tri-color"],
  },
];

const YOUTUBE_CHANNEL = "https://www.youtube.com/@TCGBusinessElite";

const JOURNEY_STEPS = [
  { icon: "▶", label: "YouTube Short", sub: "60-second card story" },
  { icon: "📌", label: "Channel Profile Link", sub: "First link — always clickable" },
  { icon: "🎯", label: "Landing Page", sub: "/szoboszlai or /shorts/{code}" },
  { icon: "🃏", label: "Card Detail", sub: "Front · Back · Price history" },
  { icon: "🔍", label: "Collection", sub: "Explore related cards" },
  { icon: "📬", label: "Return Visit", sub: "Education · Newsletter" },
];

// ─── Mini Sparkline ──────────────────────────────────────────────────────────

function Sparkline({ data, color = "#00e87a" }: { data: { price: number }[]; color?: string }) {
  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 120;
  const h = 36;
  const pts = prices
    .map((p, i) => `${(i / (prices.length - 1)) * w},${h - ((p - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={(((prices.length - 1) / (prices.length - 1)) * w)}
        cy={h - ((prices[prices.length - 1] - min) / range) * h}
        r="3"
        fill={color}
      />
    </svg>
  );
}

// ─── Price Bar ───────────────────────────────────────────────────────────────

function PriceBar({ history }: { history: { date: string; price: number }[] }) {
  const max = Math.max(...history.map((h) => h.price));
  return (
    <div className="flex items-end gap-1 h-16">
      {history.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
          <div
            className="w-full rounded-sm transition-all"
            style={{
              height: `${(h.price / max) * 48}px`,
              background: i === history.length - 1 ? "#00e87a" : "#2a2a3d",
            }}
          />
          <span className="text-[9px] text-[#8888aa] font-mono">{h.date.split(" ")[0]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Card Chip ───────────────────────────────────────────────────────────────

function ConfidenceBadge({ level }: { level: string }) {
  const colors = {
    high: "text-[#00e87a] border-[#00e87a]/30 bg-[#00e87a]/10",
    medium: "text-[#f5c842] border-[#f5c842]/30 bg-[#f5c842]/10",
    low: "text-[#ff4b4b] border-[#ff4b4b]/30 bg-[#ff4b4b]/10",
  } as Record<string, string>;
  return (
    <span
      className={`text-[10px] font-mono uppercase tracking-widest border px-1.5 py-0.5 rounded ${colors[level] ?? colors.low}`}
    >
      {level} confidence
    </span>
  );
}

// ─── Card Detail Modal ───────────────────────────────────────────────────────

function CardModal({ card, onClose }: { card: (typeof CARDS)[0]; onClose: () => void }) {
  const [side, setSide] = useState<"front" | "back">("front");
  const change = card.priceHistory[card.priceHistory.length - 1].price - card.priceHistory[0].price;
  const pct = ((change / card.priceHistory[0].price) * 100).toFixed(1);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-8"
      style={{ background: "rgba(8,8,15,0.92)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-t-2xl md:rounded-2xl"
        style={{ background: "#10101c", border: "1px solid #2a2a3d" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#2a2a3d]">
          <div>
            <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-1">
              Card Detail
            </p>
            <h2
              className="text-3xl font-bold uppercase leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.player}
            </h2>
            <p className="text-[#8888aa] text-sm mt-1">{card.set}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8888aa] hover:text-[#f0f0f8] text-xl transition-colors ml-4 mt-1"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Card image */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-[#2a2a3d]">
            <div className="flex gap-2 mb-4">
              {(["front", "back"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded transition-all ${
                    side === s
                      ? "bg-[#00e87a] text-[#08080f]"
                      : "border border-[#2a2a3d] text-[#8888aa] hover:border-[#00e87a] hover:text-[#00e87a]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ background: "#18182a", aspectRatio: "5/7" }}
            >
              <img
                src={side === "front" ? card.front : card.back}
                alt={`${card.player} ${card.parallel} — ${side}`}
                className="w-full h-full object-cover"
              />
              {card.number && (
                <div
                  className="absolute top-3 right-3 text-[11px] font-mono px-2 py-1 rounded"
                  style={{ background: "#f5c842", color: "#08080f" }}
                >
                  {card.number}
                </div>
              )}
            </div>

            {/* Specs */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { label: "Parallel", value: card.parallel },
                { label: "Condition", value: card.condition },
                { label: "Year", value: card.year.toString() },
                { label: "Number", value: card.number ?? "Base" },
              ].map((spec) => (
                <div key={spec.label} className="rounded-lg p-3" style={{ background: "#18182a" }}>
                  <p className="text-[10px] font-mono text-[#8888aa] uppercase tracking-wider mb-0.5">
                    {spec.label}
                  </p>
                  <p className="text-sm font-medium text-[#f0f0f8]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price + actions */}
          <div className="p-6 flex flex-col gap-6">
            {/* Price */}
            <div>
              <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-2">
                Market Overview
              </p>
              <div className="flex items-end gap-4 mb-3">
                <span
                  className="text-5xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#00e87a" }}
                >
                  £{card.currentPrice}
                </span>
                <span
                  className={`text-sm font-mono mb-1 ${
                    +pct >= 0 ? "text-[#00e87a]" : "text-[#ff4b4b]"
                  }`}
                >
                  {+pct >= 0 ? "↑" : "↓"} {Math.abs(+pct)}% (6mo)
                </span>
              </div>
              <ConfidenceBadge level={card.confidence} />
              <p className="text-[11px] text-[#8888aa] mt-2 leading-relaxed">
                Price is based on recent comparable sales. Confidence reflects data availability and
                consistency — not a valuation or investment advice.
              </p>
            </div>

            {/* Price bars */}
            <div>
              <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-3">
                6-Month History
              </p>
              <PriceBar history={card.priceHistory} />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-mono text-[#8888aa]">
                  Low £{Math.min(...card.priceHistory.map((h) => h.price))}
                </span>
                <span className="text-[10px] font-mono text-[#8888aa]">
                  High £{Math.max(...card.priceHistory.map((h) => h.price))}
                </span>
              </div>
            </div>

            {/* Video */}
            {card.videoId && (
              <div
                className="rounded-xl overflow-hidden border border-[#2a2a3d]"
                style={{ background: "#18182a" }}
              >
                <p className="text-[10px] font-mono text-[#8888aa] uppercase tracking-wider px-4 pt-3 pb-2">
                  Featured Short
                </p>
                <div
                  className="relative mx-4 mb-4 rounded-lg overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: "9/16", maxHeight: "180px" }}
                  onClick={() =>
                    window.open(`https://youtube.com/watch?v=${card.videoId}`, "_blank")
                  }
                >
                  <img
                    src={`https://i.ytimg.com/vi/${card.videoId}/hqdefault.jpg`}
                    alt={card.videoTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "#ff0000" }}
                    >
                      <span className="text-white text-sm ml-0.5">▶</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#f0f0f8] px-4 pb-3 leading-snug">{card.videoTitle}</p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-[#2a2a3d] text-[#8888aa]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#ff0000", color: "#fff" }}
            >
              <span>▶</span> Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card Tile ───────────────────────────────────────────────────────────────

function CardTile({ card, onClick }: { card: (typeof CARDS)[0]; onClick: () => void }) {
  const change =
    card.priceHistory[card.priceHistory.length - 1].price - card.priceHistory[0].price;
  const up = change >= 0;
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl overflow-hidden border border-[#2a2a3d] hover:border-[#00e87a]/50 transition-all group"
      style={{ background: "#10101c" }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "5/3", background: "#18182a" }}
      >
        <img
          src={card.front}
          alt={`${card.player} ${card.parallel}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10101c] via-transparent to-transparent" />
        {card.number && (
          <div
            className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: "#f5c842", color: "#08080f" }}
          >
            {card.number}
          </div>
        )}
        {card.videoId && (
          <div
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#ff0000" }}
          >
            <span className="text-white text-[9px] ml-px">▶</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-mono text-[#8888aa] uppercase tracking-wider mb-1">
          {card.parallel} · {card.condition}
        </p>
        <h3
          className="text-lg font-bold uppercase leading-tight mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {card.player}
        </h3>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold" style={{ color: "#00e87a" }}>
              £{card.currentPrice}
            </p>
            <p
              className={`text-[11px] font-mono ${up ? "text-[#00e87a]" : "text-[#ff4b4b]"}`}
            >
              {up ? "↑" : "↓"} £{Math.abs(change)} (6mo)
            </p>
          </div>
          <Sparkline data={card.priceHistory} color={up ? "#00e87a" : "#ff4b4b"} />
        </div>
      </div>
    </button>
  );
}

// ─── Journey Step ────────────────────────────────────────────────────────────

function JourneyStep({
  step,
  index,
  total,
}: {
  step: (typeof JOURNEY_STEPS)[0];
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 mb-3"
        style={{ borderColor: "#00e87a", background: "rgba(0,232,122,0.08)" }}
      >
        {step.icon}
      </div>
      <p
        className="text-base font-bold uppercase leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {step.label}
      </p>
      <p className="text-[11px] text-[#8888aa] mt-1">{step.sub}</p>
      {index < total - 1 && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-[#2a2a3d]" />
      )}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-[#2a2a3d]"
      style={{ background: "rgba(8,8,15,0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
          style={{ background: "#00e87a", color: "#08080f", fontFamily: "var(--font-display)" }}
        >
          TCG
        </div>
        <span
          className="text-lg font-bold uppercase tracking-wide hidden sm:block"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TCG Business Elite
        </span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="#collection"
          className="text-[13px] text-[#8888aa] hover:text-[#f0f0f8] transition-colors px-3 py-1 hidden sm:block"
        >
          Collection
        </a>
        <a
          href="#youtube"
          className="text-[13px] text-[#8888aa] hover:text-[#f0f0f8] transition-colors px-3 py-1 hidden sm:block"
        >
          YouTube
        </a>
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
          style={{ background: "#ff0000", color: "#fff" }}
        >
          <span className="text-[10px]">▶</span> Subscribe
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(0,232,122,0.06)" }}
      />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest mb-6 px-3 py-1.5 rounded-full border"
            style={{ borderColor: "#00e87a33", color: "#00e87a", background: "rgba(0,232,122,0.08)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#00e87a" }}
            />
            YouTube Channel · TCG Business Elite
          </div>

          <h1
            className="text-6xl md:text-7xl font-extrabold uppercase leading-[0.9] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Szoboszlai
            <br />
            <span style={{ color: "#00e87a" }}>Cards.</span>
            <br />
            <span className="text-[#8888aa]">Decoded.</span>
          </h1>

          <p className="text-[#8888aa] text-base leading-relaxed mb-8 max-w-sm">
            Every Short tells a story. This is where the full picture lives — card details, price
            history, and the context YouTube can't fit in 60 seconds.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#collection"
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#00e87a", color: "#08080f" }}
            >
              Explore Collection
            </a>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:border-[#ff0000] hover:text-[#ff0000]"
              style={{ borderColor: "#2a2a3d", color: "#f0f0f8" }}
            >
              ▶ Watch Shorts
            </a>
          </div>
        </div>

        {/* Stats panel */}
        <div
          className="rounded-2xl p-6 border border-[#2a2a3d]"
          style={{ background: "#10101c" }}
        >
          <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-4">
            Collection at a Glance
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Cards tracked", value: "3", suffix: "" },
              { label: "Avg. 6mo gain", value: "+51", suffix: "%" },
              { label: "Highest PSA grade", value: "PSA 10", suffix: "" },
              { label: "Numbered cards", value: "1", suffix: "" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: "#18182a" }}>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "#00e87a" }}
                >
                  {s.value}
                  <span className="text-lg">{s.suffix}</span>
                </p>
                <p className="text-[11px] text-[#8888aa] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#2a2a3d] pt-4">
            <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-3">
              From the Latest Short
            </p>
            <div
              className="flex items-center gap-3 p-3 rounded-xl border border-[#2a2a3d] hover:border-[#ff0000]/40 transition-all cursor-pointer group"
              onClick={() => window.open(YOUTUBE_CHANNEL, "_blank")}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#ff0000" }}
              >
                <span className="text-white text-xs ml-px">▶</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#f0f0f8] truncate group-hover:text-[#ff4b4b] transition-colors">
                  Why this Szoboszlai Prizm is heating up 🔥
                </p>
                <p className="text-[11px] text-[#8888aa]">YouTube Short · TCG Business Elite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Journey Section ─────────────────────────────────────────────────────────

function JourneySection() {
  return (
    <section className="px-6 py-16 border-t border-[#2a2a3d]" id="youtube">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            YouTube → Website
          </h2>
          <p className="text-[#8888aa] mt-3 max-w-md mx-auto text-sm">
            Every Short has a corresponding page here. No generic homepage — just the card you came
            for.
          </p>
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-6 gap-6">
          {JOURNEY_STEPS.map((step, i) => (
            <JourneyStep key={step.label} step={step} index={i} total={JOURNEY_STEPS.length} />
          ))}
        </div>

        {/* CTA paths */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            {
              label: "Channel Profile Link",
              icon: "🔗",
              desc: "The first link on the TCG Business Elite profile — always clickable from any Short.",
              highlight: true,
            },
            {
              label: "Spoken / On-Screen CTA",
              icon: "🎙",
              desc: '"Check the first link on my profile for the full card breakdown."',
              highlight: false,
            },
            {
              label: "QR Code",
              icon: "📱",
              desc: "Direct URL in thumbnail or end-screen for screen-to-device journeys.",
              highlight: false,
            },
          ].map((p) => (
            <div
              key={p.label}
              className={`rounded-xl p-5 border transition-all ${
                p.highlight ? "border-[#00e87a]/40" : "border-[#2a2a3d]"
              }`}
              style={{ background: "#10101c" }}
            >
              <div className="text-2xl mb-3">{p.icon}</div>
              <p
                className="text-base font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.label}
              </p>
              <p className="text-[13px] text-[#8888aa] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Collection Section ───────────────────────────────────────────────────────

function CollectionSection({
  onCardClick,
}: {
  onCardClick: (card: (typeof CARDS)[0]) => void;
}) {
  const [filter, setFilter] = useState<"all" | "graded" | "numbered" | "featured">("all");

  const filtered = CARDS.filter((c) => {
    if (filter === "graded") return c.condition.startsWith("PSA");
    if (filter === "numbered") return c.number !== null;
    if (filter === "featured") return c.featured;
    return true;
  });

  const filters: { key: typeof filter; label: string }[] = [
    { key: "all", label: "All Cards" },
    { key: "featured", label: "Featured on YouTube" },
    { key: "graded", label: "Graded" },
    { key: "numbered", label: "Numbered" },
  ];

  return (
    <section className="px-6 py-16 border-t border-[#2a2a3d]" id="collection">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-2">
              Szoboszlai Collection
            </p>
            <h2
              className="text-4xl font-extrabold uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {filtered.length} Cards
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-[12px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                  filter === f.key
                    ? "text-[#08080f] bg-[#00e87a]"
                    : "text-[#8888aa] border border-[#2a2a3d] hover:border-[#00e87a]/40 hover:text-[#00e87a]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((card) => (
            <CardTile key={card.id} card={card} onClick={() => onCardClick(card)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Attribution Banner ───────────────────────────────────────────────────────

function AttributionBanner() {
  return (
    <section className="px-6 py-12 border-t border-[#2a2a3d]">
      <div
        className="max-w-5xl mx-auto rounded-2xl p-8 border border-[#2a2a3d] relative overflow-hidden"
        style={{ background: "#10101c" }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ background: "rgba(0,232,122,0.04)" }}
        />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-3">
              Campaign Paths
            </p>
            <h3
              className="text-3xl font-extrabold uppercase mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Came from a Short?
            </h3>
            <p className="text-[#8888aa] text-sm leading-relaxed">
              Landing pages are matched to individual Shorts so you always see exactly the card
              featured in the video — not a generic homepage.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { path: "/szoboszlai", desc: "Szoboszlai collection hub" },
              { path: "/shorts/{code}", desc: "Short-specific landing page" },
              { path: "/cards/{card-slug}", desc: "Individual card detail" },
              { path: "/sets/{set-slug}", desc: "Full set exploration" },
            ].map((p) => (
              <div
                key={p.path}
                className="flex items-center gap-3 rounded-lg px-4 py-3 border border-[#2a2a3d]"
                style={{ background: "#18182a" }}
              >
                <code
                  className="text-[12px] text-[#00e87a] flex-shrink-0"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {p.path}
                </code>
                <span className="text-[12px] text-[#8888aa] truncate">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────

function EducationSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "What does a numbered card mean?",
      a: "A numbered card has a print run printed on it — for example /50 means only 50 copies exist. Lower numbers generally indicate greater scarcity, though demand and the player's profile drive market value more than print run alone.",
    },
    {
      q: "What is a parallel?",
      a: "A parallel is an alternate version of a base card within the same set, distinguished by a different foil treatment, color, or pattern. Panini Prizm uses Silver, Gold, and other Prizm patterns; Topps Chrome uses Refractors and colored variants.",
    },
    {
      q: "PSA 10 vs Raw — what's the difference?",
      a: "A raw card is ungraded — sold as-is. A PSA 10 (Gem Mint) has been professionally evaluated and sealed in a tamper-evident case. Graded cards typically command higher prices but grading fees and wait times add cost.",
    },
    {
      q: "How reliable is the price data here?",
      a: "Price data is sourced from recent comparable sales on secondary markets. Confidence levels (high / medium / low) reflect how many data points are available and how consistent they are. This is not a valuation or investment advice.",
    },
  ];

  return (
    <section className="px-6 py-16 border-t border-[#2a2a3d]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="text-[11px] font-mono text-[#8888aa] uppercase tracking-widest mb-3">
              Education
            </p>
            <h2
              className="text-4xl font-extrabold uppercase leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              New to trading cards?
            </h2>
            <p className="text-[#8888aa] text-sm leading-relaxed">
              The Shorts assume some knowledge — here's the full explanation for every term used.
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-[#2a2a3d] overflow-hidden"
                style={{ background: "#10101c" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#18182a] transition-colors"
                >
                  <span
                    className="text-base font-bold uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="text-[#00e87a] ml-4 flex-shrink-0 transition-transform"
                    style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-[13px] text-[#8888aa] leading-relaxed border-t border-[#2a2a3d] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-[#2a2a3d]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "#00e87a", color: "#08080f", fontFamily: "var(--font-display)" }}
            >
              TCG
            </div>
            <span
              className="font-bold uppercase text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TCG Business Elite
            </span>
          </div>
          <p className="text-[12px] text-[#8888aa] max-w-xs">
            Price data is informational only and not investment advice. All trademarks belong to
            their respective owners.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#ff4b4b]"
            style={{ color: "#f0f0f8" }}
          >
            <span
              className="w-6 h-6 rounded flex items-center justify-center text-[10px]"
              style={{ background: "#ff0000" }}
            >
              ▶
            </span>
            @TCGBusinessElite
            <span className="text-[10px] text-[#8888aa]">↗</span>
          </a>
          <p className="text-[11px] font-mono text-[#8888aa]">
            youtube.com/@TCGBusinessElite
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeCard, setActiveCard] = useState<(typeof CARDS)[0] | null>(null);

  return (
    <div className="min-h-full" style={{ background: "#08080f", color: "#f0f0f8" }}>
      <Nav />
      <Hero />
      <CollectionSection onCardClick={setActiveCard} />
      <JourneySection />
      <AttributionBanner />
      <EducationSection />
      <Footer />

      {activeCard && (
        <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
      )}
    </div>
  );
}
