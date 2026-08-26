import type { CardRecord } from './data';

/**
 * Outbound links that let a reader check the card and the price themselves.
 *
 * None of these assert a value. They are searches and lookups: eBay shows what
 * comparable cards actually sold for, PSA confirms a slab is genuine and what
 * the grade really is. They exist so the modelled estimate can be checked
 * rather than taken on trust.
 */

/**
 * eBay regional site used for comparable sales. `.com` has the deepest
 * sports-card sold history; switch to `www.ebay.co.uk` or `www.ebay.de` to
 * favour European listings and EUR/GBP prices.
 */
export const EBAY_DOMAIN = 'www.ebay.com';

const FILLER = /\b(frame|finish|numbered|edition|soccer|premier|league|uefa|champions|bundesliga|stickers?|base)\b/gi;

/** Collectors title listings with the maker and line, not the full product name. */
function shortSet(set: string) {
  return set.split(' ').slice(0, 2).join(' ');
}

/** "Future Stars · numbered finish" -> "Future Stars"; keeps the distinguishing words. */
function shortParallel(parallel: string) {
  const cleaned = parallel
    .replace(/[·—–-]/g, ' ')
    .replace(FILLER, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.split(' ').slice(0, 3).join(' ');
}

/** eBay listings write season ranges with a plain hyphen. */
const normalizeYear = (year: string) => year.replace(/[–—]/g, '-');

function searchTerms(card: CardRecord, { broad = false } = {}) {
  const surname = card.player.split(' ').at(-1) ?? card.player;
  if (broad) return [surname, shortSet(card.set)].filter(Boolean).join(' ');
  return [
    surname,
    normalizeYear(card.year),
    shortSet(card.set),
    shortParallel(card.parallel),
    card.printRun ? `/${card.printRun}` : '',
  ].filter(Boolean).join(' ');
}

function ebayUrl(query: string, sold: boolean) {
  const params = new URLSearchParams({ _nkw: query, _sacat: '0' });
  if (sold) {
    params.set('LH_Sold', '1');
    params.set('LH_Complete', '1');
  }
  return `https://${EBAY_DOMAIN}/sch/i.html?${params.toString()}`;
}

/** Completed and sold listings — the closest thing to real price evidence. */
export const ebaySoldSearch = (card: CardRecord) => ebayUrl(searchTerms(card), true);

/** Current asking prices for the same card. */
export const ebayActiveSearch = (card: CardRecord) => ebayUrl(searchTerms(card), false);

/** Wider net for when the exact parallel returns nothing. */
export const ebayBroadSearch = (card: CardRecord) => ebayUrl(searchTerms(card, { broad: true }), true);

/**
 * PSA's public certificate lookup. Returns null when the slab's certification
 * number has not been recorded, because there is nothing to look up yet.
 */
export const psaCertUrl = (card: CardRecord) =>
  card.gradingCompany === 'PSA' && card.certification
    ? `https://www.psacard.com/cert/${encodeURIComponent(card.certification)}`
    : null;

/** The search term to paste into PSA's population report for this card. */
export const psaPopSearch = (card: CardRecord) =>
  `https://www.psacard.com/pop?q=${encodeURIComponent(searchTerms(card, { broad: true }))}`;

export const searchQueryFor = (card: CardRecord) => searchTerms(card);
