'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Smooth scrolling (Lenis, driven by GSAP's ticker) plus scroll effects:
//   data-reveal           fades and lifts an element in when it scrolls into view
//   data-reveal-stagger   does the same for each child, one after another
//   data-parallax="8"     drifts an image by ±8% while its frame scrolls past
// The libraries load once the page is idle so they never delay the first paint,
// and everything is skipped when the visitor prefers reduced motion.
let engine = null;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const whenIdle = (fn) => {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 300);
  return () => window.clearTimeout(id);
};

const loadEngine = () => {
  if (!engine) {
    engine = Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(([lenisModule, gsapModule, triggerModule]) => {
      const { gsap } = gsapModule;
      const { ScrollTrigger } = triggerModule;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new lenisModule.default({ lerp: 0.11, anchors: { offset: -96 } });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      return { gsap, ScrollTrigger, lenis };
    });
  }
  return engine;
};

function setUpEffects({ gsap, ScrollTrigger }) {
  const fold = window.innerHeight * 0.92;
  const below = (el) => el.getBoundingClientRect().top > fold;
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-reveal]').filter(below).forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 48, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
      });
    });
    gsap.utils.toArray('[data-reveal-stagger]').filter(below).forEach((group) => {
      gsap.from(group.children, {
        opacity: 0, y: 36, duration: 0.8, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'clamp(top 88%)', once: true },
      });
    });
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax) || 8;
      gsap.fromTo(el, { yPercent: -amount }, {
        yPercent: amount, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
  ScrollTrigger.refresh();
  return ctx;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let ctx;
    if (engine) engine.then(({ lenis }) => lenis.scrollTo(0, { immediate: true, force: true }));
    else window.scrollTo(0, 0);
    if (prefersReducedMotion()) return undefined;

    const cancelIdle = whenIdle(() => {
      loadEngine().then((lib) => {
        if (!cancelled) ctx = setUpEffects(lib);
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
