'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import Icon from '../Icon';
import ArchScene from '../ArchScene';

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 } };

// Rotating hero: one slide per collection. It advances on its own every
// `rotateMs`, keeps going after a visitor picks a tab, and only stops when the
// pause button is pressed or the browser tab is hidden.
export default function HeroBento({ slides, rotateMs = 6500 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const count = slides.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (paused || hidden) return undefined;
    const timer = window.setTimeout(() => go(index + 1), rotateMs);
    return () => window.clearTimeout(timer);
  }, [index, paused, hidden, rotateMs, go]);

  // Only the first photo loads with the page; the others follow shortly after.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setWarm(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  const s = slides[index];
  const running = !paused && !hidden;

  // Restart the tab's progress bar whenever the slideshow (re)starts.
  const [runId, setRunId] = useState(0);
  useEffect(() => { if (running) setRunId((r) => r + 1); }, [running]);

  return (
    <section aria-roledescription="carousel" aria-label="CEZLIAR collections" className="container-site flex flex-wrap gap-4 pt-5">
      <div className="relative flex min-w-0 flex-[1.55_1_560px] flex-col overflow-hidden rounded-tile bg-sand sm:block sm:min-h-[700px]">
        <div className="relative h-[300px] overflow-hidden sm:absolute sm:inset-0 sm:h-auto">
          {slides.map((slide, i) => (warm || i === index) && (
            <motion.img
              key={slide.image}
              src={slide.image}
              srcSet={slide.srcSet}
              sizes="(min-width: 1024px) 58vw, 100vw"
              alt={i === index ? slide.alt : ''}
              aria-hidden={i === index ? undefined : true}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06 }}
              transition={{ opacity: { duration: 0.9 }, scale: { duration: i === index ? rotateMs / 1000 + 1 : 0.9, ease: 'linear' } }}
              style={{ objectPosition: slide.imagePosition || '72% center' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </div>

        <div className="absolute left-4 right-4 top-4 z-10 flex items-center gap-2 sm:left-5 sm:right-5 sm:top-5">
          <div role="tablist" aria-label="Choose a collection" className="flex min-w-0 gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:overflow-visible">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.tab}
                  type="button"
                  role="tab"
                  id={`hero-tab-${i}`}
                  aria-selected={active}
                  aria-controls="hero-panel"
                  onClick={() => go(i)}
                  className={`relative min-h-[44px] flex-none overflow-hidden whitespace-nowrap rounded-full px-4 text-sm transition-colors sm:px-[18px] ${active ? 'bg-forest font-medium text-white' : 'bg-ivory text-ink hover:bg-white'}`}
                >
                  {active && (
                    <span
                      key={`${index}-${runId}`}
                      aria-hidden="true"
                      className="hero-progress absolute inset-y-0 left-0 bg-forest-deep"
                      style={{ animationDuration: `${rotateMs}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    />
                  )}
                  <span className="relative">{slide.tab}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ivory/90 text-forest hover:bg-white"
          >
            <Icon name={paused ? 'play' : 'pause'} size={16} strokeWidth={2} filled={paused} />
          </button>
        </div>

        <div
          id="hero-panel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${index}`}
          aria-live={running ? 'off' : 'polite'}
          className="relative z-10 mx-3 -mt-12 mb-3 flex flex-col gap-4 rounded-[18px] bg-ivory p-[clamp(20px,3vw,34px)] shadow-[0_18px_40px_-24px_rgba(15,46,37,0.45)] sm:absolute sm:bottom-[clamp(12px,3vw,28px)] sm:left-[clamp(12px,3vw,28px)] sm:right-[clamp(12px,3vw,28px)] sm:m-0 sm:max-w-[560px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <p className="eyebrow tracking-[0.16em]">{s.eyebrow}</p>
              <h2 className="font-display text-[clamp(36px,4vw,62px)] font-light leading-[1.02] tracking-[-0.02em] text-forest-ink">
                {s.titleStart} <em className="italic">{s.titleEnd}</em>
              </h2>
              <p className="text-[17px] leading-relaxed text-body">{s.description}</p>
              <div className="flex flex-col gap-2.5 rounded-[14px] border border-line-soft bg-white p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.12em] text-muted">{s.rail.label}</span>
                  <Link href={s.href} className="text-xs font-medium no-underline">View all →</Link>
                </div>
                <ul className="flex gap-2 overflow-x-auto pb-0.5" aria-label={s.rail.label}>
                  {s.rail.products.map((p) => (
                    <li key={p.id} className="flex-none">
                      <Link
                        href={`/product/${p.slug}`}
                        title={`${p.shortName} · ${p.priceLabel}`}
                        aria-label={`${p.shortName}, ${p.priceLabel}`}
                        className="block h-12 w-12 overflow-hidden rounded-full border border-line-soft bg-white transition-transform hover:-translate-y-0.5 hover:border-forest"
                      >
                        {p.image
                          ? <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                          : <span className="flex h-full w-full items-center justify-center bg-placeholder text-forest"><Icon name="filter" size={20} /></span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href={s.href} className="btn-primary min-h-[50px]">
              {s.cta} <Icon name="arrow-right" size={16} strokeWidth={1.8} />
            </Link>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous collection" onClick={() => go(index - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest">
                <Icon name="chevron-left" size={16} strokeWidth={1.7} />
              </button>
              <span className="min-w-[56px] text-center text-sm tracking-[0.12em] text-muted">0{index + 1} / 0{count}</span>
              <button type="button" aria-label="Next collection" onClick={() => go(index + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest">
                <Icon name="chevron-right" size={16} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 flex-[1_1_380px] grid-cols-2 grid-rows-[minmax(330px,1.3fr)_minmax(260px,1fr)] gap-4">
        <Link href={s.top.href} className="relative col-span-2 block overflow-hidden rounded-tile bg-[#2F4A3E] no-underline">
          <AnimatePresence initial={false}>
            <motion.div key={index} {...fade} className="absolute inset-0">
              {s.top.cutout
                ? <ArchScene cutout={s.top.cutout} alt={s.top.alt} scale={s.top.scale} baseline={s.top.baseline} />
                : <img src={s.top.photo} alt={s.top.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[center_70%]" />}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <span className="flex flex-col gap-0.5 rounded-[14px] bg-ivory px-3.5 py-2.5 text-ink">
              <span className="font-display text-lg">{s.top.label}</span>
              <span className="text-[13px] text-body">{s.top.meta}</span>
            </span>
            <span className="rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-white">{s.top.priceLabel} →</span>
          </div>
        </Link>
        <div className="relative overflow-hidden rounded-tile bg-forest text-ivory-on-forest">
          <AnimatePresence initial={false}>
            <motion.div key={index} {...fade} className="absolute inset-0 flex flex-col justify-between gap-3 p-6">
              <span className="text-xs uppercase tracking-[0.16em] text-gold-light">{s.stat.label}</span>
              <span className="font-display text-[clamp(48px,5vw,64px)] font-light leading-[0.9]">{s.stat.value}</span>
              <p className="text-[15px] leading-snug">{s.stat.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <Link href={s.side.href} className="relative block overflow-hidden rounded-tile bg-white no-underline">
          <AnimatePresence initial={false}>
            <motion.img key={index} {...fade} src={s.side.image} alt={s.side.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
          <span className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between gap-2 rounded-[14px] bg-ivory px-3 py-2.5 text-ink">
            <span className="truncate font-display text-[17px]">{s.side.name}</span>
            <span className="whitespace-nowrap text-sm font-medium">{s.side.priceLabel}</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
