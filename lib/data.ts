export type VideoKind = 'short' | 'standard' | 'live';
export type Visibility = 'public' | 'unlisted' | 'draft';

export type PricePoint = {
  date: string;
  amount: number;
  currency: 'EUR';
  source: string;
  confidence: 'confirmed' | 'probable';
};

export type CardRecord = {
  slug: string;
  recordId: string;
  player: string;
  title: string;
  year: string;
  set: string;
  setSlug: string;
  insert: string;
  parallel: string;
  serial: string | null;
  condition: string;
  cardNumber: string;
  description: string;
  image: string;
  videoIds: string[];
  priceHistory: PricePoint[];
};

export type YouTubeContent = {
  id: string;
  youtubeId: string;
  videoType: VideoKind;
  title: string;
  publicationDate: string | null;
  thumbnail: string;
  associatedCards: string[];
  associatedSet: string;
  associatedArticle: string;
  landingPageSlug: string;
  campaignId: string;
  ctaVersion: 'card-showcase' | 'price-history' | 'investment-record' | 'collection-discovery';
  visibility: Visibility;
};

export const cards: CardRecord[] = [
  {
    slug: 'future-stars-psa-10',
    recordId: 'TCGBE–0014',
    player: 'Dominik Szoboszlai',
    title: 'Future Stars · PSA 10',
    year: '2020–21',
    set: 'Topps Chrome UEFA Champions League',
    setSlug: '2020-topps-chrome-ucl',
    insert: 'Future Stars',
    parallel: 'Base insert',
    serial: null,
    condition: 'PSA Gem Mint 10',
    cardNumber: 'FS–DS',
    description: 'A graded Future Stars insert from Szoboszlai’s Salzburg era, shown in the TCG Business Elite collection Short.',
    image: '/media/short-WbuR2PnN2j4.jpg',
    videoIds: ['WbuR2PnN2j4'],
    priceHistory: [],
  },
  {
    slug: 'chrome-blue-refractor',
    recordId: 'TCGBE–0015',
    player: 'Dominik Szoboszlai',
    title: 'Chrome · Blue parallel',
    year: 'Collection record',
    set: 'Topps Chrome football',
    setSlug: 'topps-chrome-football',
    insert: 'Base card',
    parallel: 'Blue refractor',
    serial: 'Verification pending',
    condition: 'Raw · protected',
    cardNumber: 'Record pending',
    description: 'A blue Chrome parallel featured in the channel’s latest collection sequence. Checklist details are intentionally marked pending until verified.',
    image: '/media/short-DKqnPqKVZJk.jpg',
    videoIds: ['DKqnPqKVZJk', 'NCD3FpmPEl8'],
    priceHistory: [],
  },
  {
    slug: 'szoboszlai-collection-003',
    recordId: 'TCGBE–0016',
    player: 'Dominik Szoboszlai',
    title: 'Collection card · 003',
    year: 'Collection record',
    set: 'Szoboszlai collection',
    setSlug: 'szoboszlai-collection',
    insert: 'Collection feature',
    parallel: 'Under review',
    serial: null,
    condition: 'Raw · protected',
    cardNumber: '003',
    description: 'Part of the channel’s card-by-card collection discovery series, linked to its source Short and verification notes.',
    image: '/media/short-NCD3FpmPEl8.jpg',
    videoIds: ['NCD3FpmPEl8'],
    priceHistory: [],
  },
];

export const youtubeContent: YouTubeContent[] = [
  {
    id: 'short-blue-collection',
    youtubeId: 'DKqnPqKVZJk',
    videoType: 'short',
    title: 'Szoboszlai collection · blue Chrome card',
    publicationDate: null,
    thumbnail: '/media/short-DKqnPqKVZJk.jpg',
    associatedCards: ['chrome-blue-refractor'],
    associatedSet: 'topps-chrome-football',
    associatedArticle: 'what-is-a-refractor',
    landingPageSlug: 'shorts/DKqnPqKVZJk',
    campaignId: 'szoboszlai_collection',
    ctaVersion: 'collection-discovery',
    visibility: 'public',
  },
  {
    id: 'short-future-stars',
    youtubeId: 'WbuR2PnN2j4',
    videoType: 'short',
    title: 'Szoboszlai Future Stars · PSA 10',
    publicationDate: null,
    thumbnail: '/media/short-WbuR2PnN2j4.jpg',
    associatedCards: ['future-stars-psa-10'],
    associatedSet: '2020-topps-chrome-ucl',
    associatedArticle: 'what-does-graded-mean',
    landingPageSlug: 'shorts/WbuR2PnN2j4',
    campaignId: 'future_stars_psa10',
    ctaVersion: 'card-showcase',
    visibility: 'public',
  },
  {
    id: 'short-collection-003',
    youtubeId: 'NCD3FpmPEl8',
    videoType: 'short',
    title: 'Szoboszlai collection · card 003',
    publicationDate: null,
    thumbnail: '/media/short-NCD3FpmPEl8.jpg',
    associatedCards: ['szoboszlai-collection-003', 'chrome-blue-refractor'],
    associatedSet: 'szoboszlai-collection',
    associatedArticle: 'how-we-document-cards',
    landingPageSlug: 'shorts/NCD3FpmPEl8',
    campaignId: 'szoboszlai_collection',
    ctaVersion: 'collection-discovery',
    visibility: 'public',
  },
];

export const sets = [
  {
    slug: '2020-topps-chrome-ucl',
    name: '2020–21 Topps Chrome UEFA Champions League',
    summary: 'The set behind the graded Future Stars insert in the collection.',
    cardSlugs: ['future-stars-psa-10'],
  },
  {
    slug: 'szoboszlai-collection',
    name: 'The Szoboszlai Collection',
    summary: 'A player-focused collection documented card by card, with verification status made visible.',
    cardSlugs: cards.map((card) => card.slug),
  },
];

export function getCard(slug: string) {
  return cards.find((card) => card.slug === slug);
}

export function getVideo(id: string) {
  return youtubeContent.find((video) => video.youtubeId === id || video.id === id);
}
