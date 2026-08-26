import type { CardRecord } from './data';

/**
 * Transparent valuation model.
 *
 * There are no confirmed sale records for these cards yet, so nothing here is
 * market evidence. Every figure below is produced by the reproducible model in
 * this file from attributes that are visible on the card itself: product, print
 * run, autograph, third-party grade and era. The factors are exposed alongside
 * the number so a reader can check the arithmetic and disagree with it, and the
 * confidence score is capped low for as long as no comparable sale backs it.
 *
 * Replacing a modelled figure with real evidence is the intended path: add
 * entries to `comparableSales` on the card record and the confidence score
 * rises accordingly.
 */

export type ValuationFactor = { label: string; detail: string; multiplier: number };

export type EvidenceCheck = { label: string; detail: string; met: boolean; weight: number };

export type Valuation = {
  currency: 'EUR';
  estimate: number;
  low: number;
  high: number;
  confidence: number;
  confidenceBand: 'Modelled' | 'Low' | 'Medium' | 'High';
  basis: 'Model only' | 'Comparable sales';
  factors: ValuationFactor[];
  evidence: EvidenceCheck[];
  valuedOn: string;
};

const MODEL_DATE = '2026-08-26';

/** Typical raw, unnumbered base price for each product, in EUR. */
const productBase: Record<string, number> = {
  'Topps Deco UEFA Champions League': 22,
  'Topps Chrome UEFA Champions League': 18,
  'Topps Chrome Bundesliga': 16,
  'Topps Finest Bundesliga': 16,
  'Topps Bundesliga': 8,
  'Panini Prizm Premier League Soccer': 20,
  'Panini Noir Soccer': 60,
  'Panini Fussball Bundesliga Stickers': 3,
  'Topps UEFA Champions League Stickers': 3,
};

const DEFAULT_BASE = 12;

/** Scarcity premium implied by the print run stamped on the card. */
function scarcity(printRun: number | null): ValuationFactor {
  if (printRun === null) return { label: 'Print run', detail: 'Unnumbered', multiplier: 1 };
  const steps: [number, number][] = [[1, 14], [10, 6.5], [25, 4], [30, 3.6], [50, 2.6], [75, 2], [99, 1.7], [150, 1.4], [299, 1.2]];
  const step = steps.find(([limit]) => printRun <= limit);
  return { label: 'Print run', detail: `Numbered to ${printRun}`, multiplier: step ? step[1] : 1.1 };
}

/** Era premium: Liverpool-era cards trade above the Salzburg and Leipzig years. */
function era(year: string): ValuationFactor {
  const startYear = Number(year.slice(0, 4));
  if (startYear >= 2023) return { label: 'Era', detail: 'Liverpool era', multiplier: 1.15 };
  if (startYear >= 2021) return { label: 'Era', detail: 'Leipzig era', multiplier: 1 };
  return { label: 'Era', detail: 'Salzburg / early era', multiplier: 0.95 };
}

function roundEstimate(value: number) {
  if (value >= 200) return Math.round(value / 10) * 10;
  if (value >= 40) return Math.round(value / 5) * 5;
  return Math.round(value);
}

export function valueCard(card: CardRecord): Valuation {
  const base = productBase[card.set] ?? DEFAULT_BASE;
  const factors: ValuationFactor[] = [
    { label: 'Product', detail: card.set, multiplier: base },
    scarcity(card.printRun),
    era(card.year),
  ];

  if (card.autograph) {
    const multiAuto = /triple/i.test(card.parallel);
    factors.push({
      label: 'Autograph',
      detail: multiAuto ? 'Multi-signature card' : 'Signed card',
      multiplier: multiAuto ? 4.5 : 3.2,
    });
  }

  if (/sapphire/i.test(card.parallel)) {
    factors.push({ label: 'Parallel', detail: 'Sapphire Edition', multiplier: 1.8 });
  }

  if (card.grade === 'Gem Mint 10') {
    factors.push({ label: 'Grade', detail: `${card.gradingCompany} Gem Mint 10`, multiplier: 2.4 });
  } else if (card.gradingCompany) {
    factors.push({ label: 'Grade', detail: `${card.gradingCompany} ${card.grade ?? 'graded'}`, multiplier: 1.2 });
  }

  const raw = factors.reduce((total, factor) => total * factor.multiplier, 1);
  const estimate = roundEstimate(raw);

  const evidence = buildEvidence(card);
  const confidence = scoreConfidence(evidence, card.comparableSales.length);

  // Low confidence has to read as a wide range, not a precise-looking number.
  const spread = 0.62 - (confidence / 100) * 0.55;

  return {
    currency: 'EUR',
    estimate,
    low: roundEstimate(estimate * (1 - spread)),
    high: roundEstimate(estimate * (1 + spread)),
    confidence,
    confidenceBand: confidence >= 75 ? 'High' : confidence >= 55 ? 'Medium' : confidence >= 40 ? 'Low' : 'Modelled',
    basis: card.comparableSales.length ? 'Comparable sales' : 'Model only',
    factors,
    evidence,
    valuedOn: MODEL_DATE,
  };
}

/** What actually backs the number, and what does not. */
function buildEvidence(card: CardRecord): EvidenceCheck[] {
  return [
    {
      label: 'Product identified',
      detail: `${card.year} · ${card.set}`,
      met: true,
      weight: 12,
    },
    {
      label: 'Parallel identified',
      detail: card.metadataNote?.includes('parallel name not confirmed')
        ? `${card.parallel} — official name not confirmed`
        : card.parallel,
      met: !card.metadataNote?.includes('parallel name not confirmed'),
      weight: 10,
    },
    {
      label: 'Print run confirmed',
      detail: card.serial ? `Serial ${card.serial} read from the card` : 'No serial numbering visible',
      met: card.serial !== null,
      weight: 8,
    },
    {
      label: 'Card number confirmed',
      detail: card.cardNumber ? `Card no. ${card.cardNumber}` : 'Card number not confirmed',
      met: card.cardNumber !== null,
      weight: 6,
    },
    {
      label: 'Third-party grade',
      detail: card.gradingCompany
        ? `${card.gradingCompany} ${card.grade}${card.certification ? ` · cert ${card.certification}` : ' · certification number not recorded'}`
        : 'Raw — not graded',
      met: card.gradingCompany !== null,
      weight: 10,
    },
    {
      label: 'Confirmed comparable sales',
      detail: card.comparableSales.length
        ? `${card.comparableSales.length} recorded sale${card.comparableSales.length === 1 ? '' : 's'}`
        : 'None recorded — the estimate rests on the model alone',
      met: card.comparableSales.length > 0,
      weight: 34,
    },
    {
      label: 'Reviewed market estimate',
      detail: card.valuationSource ? card.valuationSource : 'No third-party estimate supplied',
      met: card.valuationSource !== null,
      weight: 20,
    },
  ];
}

/**
 * Confidence is the share of available evidence that is actually present, and
 * it stays capped at 35% while no sale record backs the figure.
 */
function scoreConfidence(evidence: EvidenceCheck[], comparableCount: number): number {
  const total = evidence.reduce((sum, item) => sum + item.weight, 0);
  const met = evidence.reduce((sum, item) => sum + (item.met ? item.weight : 0), 0);
  const score = Math.round((met / total) * 100);
  return comparableCount === 0 ? Math.min(score, 35) : score;
}

export const money = (value: number, currency: 'EUR' = 'EUR') =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

/** Collection-level roll-up of the per-card model. */
export function valuePortfolio(cards: CardRecord[]) {
  const valuations = cards.map((card) => ({ card, valuation: valueCard(card) }));
  const estimate = valuations.reduce((sum, item) => sum + item.valuation.estimate, 0);
  const low = valuations.reduce((sum, item) => sum + item.valuation.low, 0);
  const high = valuations.reduce((sum, item) => sum + item.valuation.high, 0);
  const confidence = Math.round(
    valuations.reduce((sum, item) => sum + item.valuation.confidence * item.valuation.estimate, 0) / (estimate || 1),
  );
  const withSales = valuations.filter((item) => item.card.comparableSales.length > 0).length;
  const ranked = [...valuations].sort((a, b) => b.valuation.estimate - a.valuation.estimate);
  return { valuations, estimate, low, high, confidence, withSales, ranked, currency: 'EUR' as const, valuedOn: MODEL_DATE };
}
