import Icon from './Icon';
import { SITE } from '../data/site';

export default function MarketplaceBand() {
  return (
    <section aria-label="Our marketplace stores" className="mt-[clamp(56px,7vw,96px)] flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-panel bg-forest p-[clamp(28px,4vw,56px)] text-ivory-on-forest">
      <div className="flex flex-[1_1_380px] flex-col gap-2.5">
        <h2 className="font-display text-[clamp(30px,3vw,44px)] font-light leading-[1.08]">Prefer to browse on a <em className="italic">marketplace?</em></h2>
        <p className="text-base leading-relaxed text-mist">Find CEZLIAR on Amazon or Flipkart — delivery, offers and returns are handled by them.</p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <a href={SITE.amazonStore} target="_blank" rel="noopener noreferrer" className="btn-light min-h-[52px]">CEZLIAR on Amazon <Icon name="arrow-right" size={16} /></a>
        <a href={SITE.flipkartStore} target="_blank" rel="noopener noreferrer" className="btn-outline-light min-h-[52px]">CEZLIAR on Flipkart <Icon name="arrow-right" size={16} /></a>
      </div>
    </section>
  );
}
