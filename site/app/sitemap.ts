import type { MetadataRoute } from 'next';
import { cards, setSlug } from './data';

const siteUrl = 'https://tcgbusinesselite.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/portfolio', '/szoboszlai', '/youtube'];
  const setPages = Array.from(new Set(cards.map((card) => card.set))).map((set) => `/sets/${setSlug(set)}`);
  const cardPages = cards.map((card) => `/cards/${card.slug}`);

  return [...staticPages, ...setPages, ...cardPages].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
