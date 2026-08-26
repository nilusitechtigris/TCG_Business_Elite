export type ComparableSale = {
  date: string;
  price: number;
  currency: string;
  venue: string;
  condition: string | null;
  sourceUrl: string;
};

export type HistoricalValue = {
  date: string;
  estimatedValue: number;
  lowEstimate: number | null;
  highEstimate: number | null;
  currency: string;
  source: string;
  evidenceType: 'confirmed comparable sale' | 'reviewed estimate' | 'acquisition event';
  confidence: 'low' | 'medium' | 'high';
  notes?: string | null;
};

export type YouTubeContent = {
  videoId: string;
  type: 'short' | 'video' | 'livestream';
  title: string;
  publicationDate: string;
  thumbnail: string;
  associatedSet: string | null;
  landingPageSlug: string;
  campaignIdentifier: string;
  ctaVersion: string;
  visibilityStatus: 'draft' | 'published' | 'unlisted';
};

export type CardRecord = {
  id: string;
  index: number;
  slug: string;
  player: string;
  manufacturer: 'Topps' | 'Panini';
  year: string;
  set: string;
  parallel: string;
  cardNumber: string | null;
  serial: string | null;
  printRun: number | null;
  autograph: boolean;
  condition: string;
  gradingCompany: string | null;
  grade: string | null;
  certification: string | null;
  documentedAt: string;
  pairConfidence: 'High' | 'Manual review';
  metadataNote: string | null;
  notes: string | null;
  acquisitionDate: string | null;
  acquisitionPrice: number | null;
  acquisitionCurrency: string | null;
  estimatedValue: number | null;
  lowEstimate: number | null;
  highEstimate: number | null;
  valuationCurrency: string | null;
  valuationDate: string | null;
  valuationSource: string | null;
  confidence: 'Insufficient market data' | 'Low' | 'Medium' | 'High';
  comparableSales: ComparableSale[];
  historicalValues: HistoricalValue[];
  youtube: YouTubeContent[];
};

const defaults = {
  player: 'Dominik Szoboszlai',
  condition: 'Not confirmed',
  documentedAt: '2026-08-26',
  pairConfidence: 'High' as const,
  notes: null,
  acquisitionDate: null,
  acquisitionPrice: null,
  acquisitionCurrency: null,
  estimatedValue: null,
  lowEstimate: null,
  highEstimate: null,
  valuationCurrency: null,
  valuationDate: null,
  valuationSource: null,
  confidence: 'Insufficient market data' as const,
  comparableSales: [] as ComparableSale[],
  historicalValues: [] as HistoricalValue[],
  youtube: [] as YouTubeContent[],
};

export const cards: CardRecord[] = [
  { id: 'TBE-SZO-001', index: 1, slug: '2024-topps-deco-red-07-10', manufacturer: 'Topps', year: '2024', set: 'Topps Deco UEFA Champions League', parallel: 'Red frame', cardNumber: null, serial: '07/10', printRun: 10, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-002', index: 2, slug: '2024-topps-deco-purple-07-25', manufacturer: 'Topps', year: '2024', set: 'Topps Deco UEFA Champions League', parallel: 'Purple frame', cardNumber: null, serial: '07/25', printRun: 25, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-003', index: 3, slug: '2019-topps-chrome-ucl-blue-26', manufacturer: 'Topps', year: '2019–20', set: 'Topps Chrome UEFA Champions League', parallel: 'Blue refractor finish', cardNumber: '26', serial: null, printRun: null, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name and serial numbering not confirmed.', ...defaults },
  { id: 'TBE-SZO-004', index: 4, slug: '2024-panini-prizm-signatures-s-ds', manufacturer: 'Panini', year: '2024–25', set: 'Panini Prizm Premier League Soccer', parallel: 'Signatures', cardNumber: 'S-DS', serial: null, printRun: null, autograph: true, gradingCompany: null, grade: null, certification: null, metadataNote: null, ...defaults },
  { id: 'TBE-SZO-005', index: 5, slug: '2022-topps-finest-orange-17-25', manufacturer: 'Topps', year: '2022–23', set: 'Topps Finest Bundesliga', parallel: 'Orange finish', cardNumber: '86', serial: '17/25', printRun: 25, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-006', index: 6, slug: '2022-topps-finest-orange-09-25', manufacturer: 'Topps', year: '2022–23', set: 'Topps Finest Bundesliga', parallel: 'Orange finish', cardNumber: '86', serial: '09/25', printRun: 25, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-007', index: 7, slug: '2022-topps-chrome-triple-auto-08-10', manufacturer: 'Topps', year: '2022–23', set: 'Topps Chrome Bundesliga', parallel: 'Triple Autographs', cardNumber: 'CTA-SOS', serial: '08/10', printRun: 10, autograph: true, gradingCompany: null, grade: null, certification: null, metadataNote: 'Also features Dani Olmo and André Silva.', ...defaults },
  { id: 'TBE-SZO-008', index: 8, slug: '2024-topps-deco-blue-15-49', manufacturer: 'Topps', year: '2024', set: 'Topps Deco UEFA Champions League', parallel: 'Blue frame', cardNumber: null, serial: '15/49', printRun: 49, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-009', index: 9, slug: '2024-topps-deco-pink-28-75', manufacturer: 'Topps', year: '2024', set: 'Topps Deco UEFA Champions League', parallel: 'Pink frame', cardNumber: null, serial: '28/75', printRun: 75, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-010', index: 10, slug: '2024-topps-deco-green-65-99', manufacturer: 'Topps', year: '2024', set: 'Topps Deco UEFA Champions League', parallel: 'Green frame', cardNumber: null, serial: '65/99', printRun: 99, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-011', index: 11, slug: '2022-topps-bundesliga-orange-13-25', manufacturer: 'Topps', year: '2022–23', set: 'Topps Bundesliga', parallel: 'Orange finish', cardNumber: '100', serial: '13/25', printRun: 25, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-012', index: 12, slug: '2020-topps-chrome-future-stars-37-50', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Future Stars · numbered finish', cardNumber: 'FS-DS', serial: '37/50', printRun: 50, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-013', index: 13, slug: '2020-topps-chrome-future-stars-25-75', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Future Stars · numbered finish', cardNumber: 'FS-DS', serial: '25/75', printRun: 75, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-014', index: 14, slug: '2020-topps-chrome-future-stars-20-99', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Future Stars · numbered finish', cardNumber: 'FS-DS', serial: '20/99', printRun: 99, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-015', index: 15, slug: '2020-topps-chrome-future-stars-19-25', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Future Stars · numbered finish', cardNumber: 'FS-DS', serial: '19/25', printRun: 25, autograph: false, gradingCompany: null, grade: null, certification: null, metadataNote: 'Official parallel name not confirmed.', ...defaults },
  { id: 'TBE-SZO-016', index: 16, slug: '2024-panini-noir-auto-10-10', manufacturer: 'Panini', year: '2024–25', set: 'Panini Noir Soccer', parallel: 'Auto Noir', cardNumber: 'AN-DS', serial: '10/10', printRun: 10, autograph: true, gradingCompany: null, grade: null, certification: null, metadataNote: 'Displayed in a magnetic holder; no grading label is visible.', ...defaults },
  { id: 'TBE-SZO-017', index: 17, slug: '2020-topps-chrome-sapphire-green-38-75-psa-10', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Sapphire Edition Future Stars — Green', cardNumber: 'FS-DS', serial: '38/75', printRun: 75, autograph: false, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '92707282', metadataNote: null, ...defaults },
  { id: 'TBE-SZO-018', index: 18, slug: '2020-topps-chrome-sapphire-aqua-037-150-psa-10', manufacturer: 'Topps', year: '2020–21', set: 'Topps Chrome UEFA Champions League', parallel: 'Sapphire Edition Future Stars — Aqua', cardNumber: 'FS-DS', serial: '037/150', printRun: 150, autograph: false, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '71497513', metadataNote: null, ...defaults },
  { id: 'TBE-SZO-019', index: 19, slug: '2019-panini-fussball-bundesliga-24-psa-10', manufacturer: 'Panini', year: '2019', set: 'Panini Fussball Bundesliga Stickers', parallel: 'Base sticker', cardNumber: '24', serial: null, printRun: null, autograph: false, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '61425155', metadataNote: null, ...defaults },
  { id: 'TBE-SZO-020', index: 20, slug: '2019-topps-ucl-sticker-412-psa-10', manufacturer: 'Topps', year: '2019–20', set: 'Topps UEFA Champions League Stickers', parallel: 'Base sticker', cardNumber: '412', serial: null, printRun: null, autograph: false, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '71102663', metadataNote: null, ...defaults },
  { id: 'TBE-SZO-021', index: 21, slug: '2022-topps-finest-auto-green-wave-01-30-psa-10', manufacturer: 'Topps', year: '2022–23', set: 'Topps Finest Bundesliga', parallel: 'Autograph — Green Wave', cardNumber: '86', serial: '01/30', printRun: 30, autograph: true, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '92485277', metadataNote: null, ...defaults },
  { id: 'TBE-SZO-022', index: 22, slug: '2022-topps-chrome-triple-auto-07-25-psa-10', manufacturer: 'Topps', year: '2022–23', set: 'Topps Chrome Bundesliga', parallel: 'Triple Autographs', cardNumber: 'CTA-SOS', serial: '07/25', printRun: 25, autograph: true, gradingCompany: 'PSA', grade: 'Gem Mint 10', certification: '125984627', metadataNote: 'Also features Dani Olmo and André Silva.', ...defaults },
];

export const cardImage = (card: CardRecord, side: 'front' | 'back', width: 480 | 960 | 1920 = 960) =>
  `/cards/${String(card.index).padStart(2, '0')}-${side}-${width}.webp`;

export const cardSrcSet = (card: CardRecord, side: 'front' | 'back') =>
  ([480, 960, 1920] as const).map((width) => `${cardImage(card, side, width)} ${width}w`).join(', ');

export const setSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const cardBySlug = (slug: string) => cards.find((card) => card.slug === slug);
