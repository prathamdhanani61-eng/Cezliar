'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '../Icon';
import ArchScene from '../ArchScene';

const ROTATE_MS = 6500;

export default function HeroBento({ slides }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (userPaused || hovering || reducedMotion) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [userPaused, hovering, reducedMotion, slides.length]);

  const go = (i) => {
    setUserPaused(true);
    setIndex((i + slides.length) % slides.length);
  };

  const s = slides[index];

  return (
    <section
      aria-label="Featured collections"
      className="container-site flex flex-wrap gap-4 pt-5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative min-h-[640px] min-w-0 flex-[1.55_1_560px] overflow-hidden rounded-tile bg-sand sm:min-h-[660px]">
        {slides.map((slide, i) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={i === index ? slide.alt : ''}
            aria-hidden={i === index ? undefined : true}
            fetchPriority={i === 0 ? 'high' : 'low'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-[72%_center] transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        <div role="tablist" aria-label="Choose a collection" className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.tab}
              type="button"
              role="tab"
              id={`hero-tab-${i}`}
              aria-selected={i === index}
              aria-controls="hero-panel"
              onClick={() => go(i)}
              className={`min-h-[44px] rounded-full px-[18px] text-sm transition-colors ${i === index ? 'bg-forest font-medium text-white' : 'bg-ivory text-ink hover:bg-white'}`}
            >
              {slide.tab}
            </button>
          ))}
        </div>

        <div
          id="hero-panel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${index}`}
          className="absolute bottom-[clamp(12px,3vw,28px)] left-[clamp(12px,3vw,28px)] right-[clamp(12px,3vw,28px)] flex max-w-[560px] flex-col gap-4 rounded-[18px] bg-ivory p-[clamp(22px,3vw,36px)]"
        >
          <p className="eyebrow tracking-[0.16em]">{s.eyebrow}</p>
          <h1 className="font-display text-[clamp(38px,4.2vw,64px)] font-light leading-[1.02] tracking-[-0.02em] text-forest-ink">
            {s.titleStart} <em className="italic">{s.titleEnd}</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-body">{s.description}</p>
          {s.featured && (
            <div className="flex items-center gap-3.5 rounded-[14px] border border-line-soft bg-white p-3">
              {s.featured.image && <img src={s.featured.image} alt="" className="h-14 w-14 flex-none rounded-[10px] bg-white object-cover" />}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-xs uppercase tracking-[0.12em] text-muted">Featured</span>
                <span className="truncate font-display text-[19px]">{s.featured.name}</span>
                <span className="truncate text-sm text-body">{s.featured.meta}</span>
              </div>
              <Link href={`/product/${s.featured.slug}`} className="btn-outline min-h-[44px] flex-none px-4 text-sm">
                View<span className="sr-only"> {s.featured.name}</span>
              </Link>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={s.href} className="btn-primary min-h-[50px]">
              {s.cta} <Icon name="arrow-right" size={16} strokeWidth={1.8} />
            </Link>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous collection" onClick={() => go(index - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest">
                <Icon name="chevron-left" size={16} strokeWidth={1.7} />
              </button>
              <span className="min-w-[56px] text-center text-sm tracking-[0.12em] text-muted">0{index + 1} / 0{slides.length}</span>
              <button type="button" aria-label="Next collection" onClick={() => go(index + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest">
                <Icon name="chevron-right" size={16} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 flex-[1_1_380px] grid-cols-2 grid-rows-[minmax(350px,1.3fr)_minmax(270px,1fr)] gap-4">
        <Link href={s.top.href} className="relative col-span-2 block overflow-hidden rounded-tile bg-[#2F4A3E] no-underline">
          {s.top.cutout
            ? <ArchScene cutout={s.top.cutout} alt={s.top.alt} scale={s.top.scale} />
            : <img src={s.top.bg} alt={s.top.label} className="absolute inset-0 h-full w-full object-cover object-[center_70%]" />}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <span className="flex flex-col gap-0.5 rounded-[14px] bg-ivory px-3.5 py-2.5 text-ink">
              <span className="font-display text-lg">{s.top.label}</span>
              <span className="text-[13px] text-body">{s.top.meta}</span>
            </span>
            <span className="rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-white">{s.top.priceLabel} →</span>
          </div>
        </Link>
        <div className="flex flex-col justify-between gap-3 rounded-tile bg-forest p-6 text-ivory-on-forest">
          <span className="text-xs uppercase tracking-[0.16em] text-gold-light">{s.stat.label}</span>
          <span className="font-display text-[64px] font-light leading-[0.9]">{s.stat.value}</span>
          <p className="text-[15px] leading-snug">{s.stat.text}</p>
        </div>
        <Link href={s.side.href} className="relative block overflow-hidden rounded-tile bg-white no-underline">
          <img src={s.side.image} alt={s.side.alt} className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-2 rounded-[14px] bg-ivory px-3 py-2.5 text-ink">
            <span className="truncate font-display text-[17px]">{s.side.name}</span>
            <span className="whitespace-nowrap text-sm font-medium">{s.side.priceLabel}</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
