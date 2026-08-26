import { CollectionExplorer } from '../components/CollectionExplorer';
import { Footer, Header } from '../components/Header';
import { cards } from '../data';

export const metadata = { title: 'Dominik Szoboszlai Collection | TCG Business Elite', description: 'Explore 22 owned Dominik Szoboszlai cards with verified front and back photography.' };

export default function CollectionPage() {
  return <main><Header />
    <section className="page-hero collection-hero"><p className="eyebrow"><span /> Player collection · 01</p><h1>Dominik<br /><em>Szoboszlai.</em></h1><div><p>Twenty-two owned cards spanning Salzburg, Leipzig, Liverpool and Hungary—each paired from the original capture sequence.</p><dl><div><dt>Cards</dt><dd>22</dd></div><div><dt>Numbered</dt><dd>18</dd></div><div><dt>PSA 10</dt><dd>6</dd></div></dl></div></section>
    <CollectionExplorer initialCards={cards} />
    <Footer />
  </main>;
}
