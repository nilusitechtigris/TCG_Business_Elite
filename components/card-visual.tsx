import type { CardRecord } from '@/lib/data';

export function CardFront({ card, compact = false }: { card: CardRecord; compact?: boolean }) {
  return (
    <div className={`record-card ${compact ? 'compact' : ''}`}>
      <div className="record-card-shine" aria-hidden="true" />
      <div className="record-card-photo" style={{ backgroundImage: `linear-gradient(0deg, #09100e 1%, transparent 52%), url('${card.image}')` }} />
      <div className="record-card-frame" aria-hidden="true" />
      <span className="record-card-series">TCGBE<br />ARCHIVE</span>
      <span className="record-card-number">{card.cardNumber}</span>
      <div className="record-card-title">
        <small>{card.insert.toUpperCase()}</small>
        <strong>DOMINIK<br />SZOBOSZLAI</strong>
      </div>
      <span className="record-card-year">{card.year}</span>
    </div>
  );
}

export function CardBack({ card }: { card: CardRecord }) {
  return (
    <div className="record-card card-back">
      <div className="back-monogram" aria-hidden="true">BE</div>
      <p>TCG BUSINESS ELITE · COLLECTION RECORD</p>
      <h3>{card.player}</h3>
      <div className="back-rule" />
      <dl>
        <div><dt>Record</dt><dd>{card.recordId}</dd></div>
        <div><dt>Set</dt><dd>{card.year} {card.set}</dd></div>
        <div><dt>Card no.</dt><dd>{card.cardNumber}</dd></div>
        <div><dt>Status</dt><dd>{card.condition}</dd></div>
      </dl>
      <span className="back-disclaimer">Archive visual · inspect the physical card for manufacturer printing</span>
    </div>
  );
}
