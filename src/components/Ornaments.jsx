import { cleanHtml } from '../lib/safe.js';
// Ornamenty a společné prvky převzaté z grafiky Sonie
import { brand } from '../content.js';

export const Lotus = ({ className = 'lotus' }) => (
  <svg className={className} viewBox="0 0 120 64" aria-hidden="true">
    <g fill="none" stroke="url(#gold)" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M60 8c-9 10-12 22-12 32 0 9 5 16 12 18 7-2 12-9 12-18 0-10-3-22-12-32z" />
      <path d="M48 40c-6-6-15-11-26-12 2 12 9 22 21 26 6 2 12 3 17 4" />
      <path d="M72 40c6-6 15-11 26-12-2 12-9 22-21 26-6 2-12 3-17 4" />
      <path d="M44 48c-10-1-22 1-34 5 10 6 24 7 38 4" />
      <path d="M76 48c10-1 22 1 34 5-10 6-24 7-38 4" />
      <path d="M30 60h60" />
    </g>
  </svg>
);

export const GoldDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f3d79a" />
        <stop offset=".55" stopColor="#c99a48" />
        <stop offset="1" stopColor="#9a6a24" />
      </linearGradient>
    </defs>
  </svg>
);

export const StarRule = () => (
  <div className="star-rule" aria-hidden="true">
    <span /><svg viewBox="0 0 24 24"><path d="M12 2l1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8z" /></svg><span />
  </div>
);

export const LotusRule = () => (
  <div className="lotus-rule" aria-hidden="true"><span /><Lotus /><span /></div>
);

/** Nadpis sekce: zlaté verzálky s linkami, kurzívní podtitul, úvod, lotos */
export function PageTitle({ title, subtitle, lead, lotus = true, as: H = 'h1' }) {
  return (
    <header className="ptitle">
      <div className="ptitle__row"><span /><H className="gold-caps">{title}</H><span /></div>
      {subtitle && <p className="ptitle__sub">{subtitle}</p>}
      {lead && <p className="ptitle__lead">{lead}</p>}
      {lotus && <LotusRule />}
    </header>
  );
}

export const SectionTitle = ({ children, as: H = 'h2' }) => (
  <div className="stitle"><span /><H className="gold-caps">{children}</H><span /></div>
);

export const Band = ({ text = brand.claim + '.', big = false }) => (
  <div className={`band${big ? ' band--big' : ''}`}><p>{text}</p></div>
);

export const Html = ({ as: T = 'p', html, ...rest }) => <T {...rest} dangerouslySetInnerHTML={{ __html: cleanHtml(html) }} />;

// Skryté pole – vyplní ho jen robot (ochrana formulářů proti spamu)
export const Trap = () => <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-trap" defaultValue="" />;
