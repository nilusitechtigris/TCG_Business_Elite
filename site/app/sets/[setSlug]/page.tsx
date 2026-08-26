import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionExplorer } from '../../components/CollectionExplorer';
import { Footer, Header } from '../../components/Header';
import { cards, setSlug } from '../../data';

const sets = Array.from(new Set(cards.map((card) => card.set)));
export function generateStaticParams() { return sets.map((set) => ({ setSlug: setSlug(set) })); }

export async function generateMetadata({ params }: { params: Promise<{ setSlug: string }> }): Promise<Metadata> {
  const slug = (await params).setSlug;
  const set = sets.find((item) => setSlug(item) === slug);
  return set ? { title: `${set} | TCG Business Elite`, description: `Owned ${set} cards in the TCG Business Elite collection.` } : { title: 'Set not found | TCG Business Elite' };
}

export default async function SetPage({ params }: { params: Promise<{ setSlug: string }> }) {
  const slug = (await params).setSlug;
  const set = sets.find((item) => setSlug(item) === slug);
  if (!set) notFound();
  const setCards = cards.filter((card) => card.set === set);
  return <main><Header />
    <section className="page-hero set-hero"><p className="eyebrow"><span /> Set archive</p><h1>{set.split(' ').slice(0, 2).join(' ')}<br /><em>{set.split(' ').slice(2).join(' ')}.</em></h1><div><p>{setCards.length} owned {setCards.length === 1 ? 'card' : 'cards'} with verified front/back photography.</p><dl><div><dt>Owned</dt><dd>{setCards.length}</dd></div><div><dt>Numbered</dt><dd>{setCards.filter((card) => card.serial).length}</dd></div><div><dt>Graded</dt><dd>{setCards.filter((card) => card.grade).length}</dd></div></dl></div></section>
    <CollectionExplorer initialCards={setCards} />
    <Footer />
  </main>;
}
