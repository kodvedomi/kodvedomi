import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { nav, seo } from './content.js';
import { useContentVersion } from './lib/store.js';
import { Header, Footer } from './components/Layout.jsx';
import { GoldDefs, Band } from './components/Ornaments.jsx';
import LiveBackground from './components/LiveBackground.jsx';
import LifeCodeModal from './components/LifeCodeModal.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Community from './pages/Community.jsx';
import Blog from './pages/Blog.jsx';
import Shop from './pages/Shop.jsx';
import Sonia from './pages/Sonia.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Legal from './pages/Legal.jsx';

gsap.registerPlugin(ScrollTrigger);

const PAGES = { domu: Home, 'o-mne': About, komunita: Community, blog: Blog, eshop: Shop, sonia: Sonia, kontakt: Contact, kosik: Cart, podminky: Legal, gdpr: Legal, reklamace: Legal };
const TITLES = { ...Object.fromEntries(nav.map(n => [n.id, n.label])), kontakt: 'Kontakt', kosik: 'Košík', podminky: 'Obchodní podmínky', gdpr: 'Ochrana osobních údajů', reklamace: 'Reklamační řád' };
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const readHash = () => decodeURIComponent(location.hash.replace('#', ''));
// #eshop-koucink → stránka eshop, podstránka koucink
const parse = h => {
  if (PAGES[h]) return { page: h, sub: null };
  const [p, ...rest] = h.split('-');
  if ((p === 'eshop' || p === 'blog') && rest.length) return { page: p, sub: rest.join('-') };
  return null;
};

export default function App() {
  const [r, setR] = useState(() => parse(readHash()) || { page: 'domu', sub: null });
  const [modal, setModal] = useState(() => readHash() === 'kod');
  const ver = useContentVersion();
  const lenisRef = useRef(null);
  const main = useRef(null);
  const key = r.page + (r.sub || '');
  const keyRef = useRef(key);
  keyRef.current = r.page + (r.sub ? '-' + r.sub : '');

  // router přes #kotvy; #kod otevře „Kód tvého života“
  useEffect(() => {
    const on = () => {
      const h = readHash();
      if (h.startsWith('admin')) { location.reload(); return; }
      if (h === 'kod') { setModal(true); history.replaceState(null, '', '#' + keyRef.current); return; }
      const p = parse(h);
      if (p) setR(p); else if (!h) setR({ page: 'domu', sub: null });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // plynulé scrollování (Lenis + GSAP)
  useEffect(() => {
    if (reduce()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = t => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => { if (modal) lenisRef.current?.stop(); else lenisRef.current?.start(); }, [modal]);

  // přechod mezi stránkami + animace
  useLayoutEffect(() => {
    document.title = r.page === 'domu' ? seo.title : `${TITLES[r.page]} · Kód Vědomí`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description || '');
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      if (reduce()) return;
      gsap.fromTo(main.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' });
      if (r.page === 'domu') {
        gsap.from('.masthead__title .ch', { yPercent: 110, filter: 'blur(8px)', duration: 1.1, stagger: 0.045, ease: 'power4.out' });
        gsap.from('.masthead .star-rule, .masthead__claim, .masthead .menu', { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.1, delay: 0.4 });
        gsap.fromTo('.hero-frame__bg', { scale: 1.15, filter: 'blur(8px) brightness(1.4)' }, { scale: 1.04, filter: 'blur(0px) brightness(1)', duration: 2.4, ease: 'expo.out' });
        gsap.to('.hero-frame__bg', { scale: 1.1, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.4 });
        gsap.from('.hero-frame__cta', { y: 30, autoAlpha: 0, duration: 1, delay: 1, ease: 'power3.out' });
      }
      if (r.page === 'sonia') {
        gsap.from('.se-hero__inner > *', { y: 40, autoAlpha: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
        gsap.utils.toArray('.feature__ph').forEach(el => {
          const d = +el.dataset.depth;
          gsap.fromTo(el, { y: 30 + d * 25 }, { y: -30 - d * 25, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
    }, document.body);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [key, ver]);

  const close = useCallback(() => setModal(false), []);
  const Page = PAGES[r.page];

  return (
    <div className="site">
      <GoldDefs />
      <LiveBackground />
      <Header route={r.page} />
      <main ref={main} key={key + ver} className={`page page--${r.page}`}><Page sub={r.sub} page={r.page} /></main>
      {r.page !== 'domu' && <Band />}
      <Footer home={r.page === 'domu'} />
      <LifeCodeModal open={modal} onClose={close} />
    </div>
  );
}
