import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { nav, brand, links, m } from '../content.js';
import { Social, Line } from './Icons.jsx';
import { useCart } from '../lib/cart.js';

const CartLink = ({ className }) => {
  const n = useCart().reduce((a, x) => a + x.qty, 0);
  return <a href="#kosik" className={className} aria-label={`Košík, ${n} položek`}><Line.cart />{n > 0 && <span className="cart-n">{n}</span>}</a>;
};
import { StarRule } from './Ornaments.jsx';

const Brand = () => (
  <a href="#domu" className="brand" aria-label="Kód vědomí – domů">
    <img src={m('logo-sm.webp')} alt="" className="brand__logo" />
    <span className="gold-caps">Kód Vědomí</span>
  </a>
);

function Menu({ route, framed }) {
  return (
    <nav className={framed ? 'menu menu--framed' : 'menu'} aria-label="Hlavní menu">
      {nav.map(n => (
        <a key={n.id} href={`#${n.id}`} className={route === n.id ? 'is-active' : ''} aria-current={route === n.id ? 'page' : undefined}>{n.label}</a>
      ))}
      <CartLink className="menu__cart" />
    </nav>
  );
}

function MobileMenu({ open, setOpen, route }) {
  const ref = useRef(null);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (open) gsap.fromTo(ref.current.querySelectorAll('a'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: 'power3.out', delay: 0.15 });
  }, [open]);
  return (
    <div ref={ref} id="mmenu" className={`mmenu${open ? ' is-open' : ''}`} onClick={e => e.target.closest('a') && setOpen(false)}>
      <img src={m('logo-sm.webp')} alt="" className="mmenu__logo" />
      {nav.map(n => <a key={n.id} href={`#${n.id}`} className={route === n.id ? 'is-active' : ''}>{n.label}</a>)}
      <a href="#kod" className="pill-btn">Kód tvého života</a>
    </div>
  );
}

const Burger = ({ open, setOpen }) => (
  <button className="burger" aria-expanded={open} aria-controls="mmenu" aria-label={open ? 'Zavřít menu' : 'Otevřít menu'} onClick={() => setOpen(o => !o)}>
    <span /><span /><span />
  </button>
);

/** Hlavička: na úvodní stránce velký nadpis + rámované menu, jinde kompaktní lišta */
export function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const home = route === 'domu';
  useEffect(() => {
    const on = () => setStuck(window.scrollY > (home ? 340 : 10));
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [home]);
  useEffect(() => setOpen(false), [route]);

  return (
    <>
      <div className={`bar${home && !stuck ? ' bar--hidden' : ''}${home && stuck ? ' bar--stuck' : ''}`}>
        <Brand />
        <span className="bar__div" aria-hidden="true" />
        <Menu route={route} />
        <CartLink className="bar__cart" />
        <Burger open={open} setOpen={setOpen} />
      </div>
      {home && (
        <header className="masthead">
          <h1 className="masthead__title gold-caps" aria-label="Kód Vědomí">
            {'Kód Vědomí'.split('').map((c, i) => <span key={i} className="mask" aria-hidden="true"><span className="ch">{c === ' ' ? '\u00a0' : c}</span></span>)}
          </h1>
          <StarRule />
          <p className="masthead__claim">{brand.claim}</p>
          <Menu route={route} framed />
          <div className="masthead__mobile"><Burger open={open} setOpen={setOpen} /></div>
        </header>
      )}
      <MobileMenu open={open} setOpen={setOpen} route={route} />
    </>
  );
}

const SocialRow = () => (
  <div className="socials">
    {['facebook', 'instagram', 'youtube'].map(k => {
      const I = Social[k];
      return <a key={k} href={links[k]} target="_blank" rel="noopener" aria-label={k}><I /></a>;
    })}
  </div>
);

const SOC = [
  { k: 'facebook', name: 'Facebook', sub: 'Skupina Kód Vědomí' },
  { k: 'instagram', name: 'Instagram', sub: '@kodvedomi' },
  { k: 'youtube', name: 'YouTube', sub: 'Kanál Kód Vědomí' }
];

export const SocialCards = ({ compact }) => (
  <div className={`soccards${compact ? ' soccards--compact' : ''}`}>
    {SOC.filter(x => links[x.k]).map(({ k, name, sub }) => {
      const I = Social[k];
      return (
        <a key={k} href={links[k]} target="_blank" rel="noopener" className="soccard">
          <span className="soccard__icon"><I /></span>
          <span className="soccard__txt"><b>{name}</b><em>{sub}</em></span>
        </a>
      );
    })}
  </div>
);

export function Footer() {
  return (
    <footer className="footer2">
      <div className="footer2__contact wrap">
        <div className="stitle"><span /><h2 className="gold-caps">Kontakt</h2><span /></div>
        <p className="footer2__lead">{brand.contactLead}</p>
        <p className="mail-line"><Line.mail /> <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
        {brand.phone && <p className="mail-line"><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a></p>}
        <SocialCards compact />
        <a href="#kontakt" className="pill-btn pill-btn--caps">Napsat zprávu</a>
      </div>
      <div className="footer2__bottom wrap">
        <a href="#domu" className="brand"><img src={m('logo-sm.webp')} alt="" className="brand__logo" /><span className="gold-caps">Kód Vědomí</span></a>
        <p className="footer__lines"><em>{brand.footerLine}</em></p>
        <div className="footer__legal">
          <p>© {new Date().getFullYear()} {brand.name}. Všechna práva vyhrazena.</p>
          <p className="footer__links"><a href="#kontakt">Kontakt</a> · <a href="#podminky">Obchodní podmínky</a> · <a href="#gdpr">Ochrana osobních údajů</a> · <a href="#reklamace">Reklamační řád</a></p>
        </div>
      </div>
    </footer>
  );
}
