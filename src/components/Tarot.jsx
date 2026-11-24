// Karty velkých arkán v klasickém tarotovém formátu (vlastní kresba v zlatých liniích, styl Kódu Vědomí).
import { m } from '../content.js';

export const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', '0'];

const star = (cx, cy, r, n = 5, k = 0.45) => {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2, rr = i % 2 ? r * k : r;
    p.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return <polygon points={p.join(' ')} />;
};
const rays = (cx, cy, r1, r2, n) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  return <line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} />;
});
const INF = 'M38 18c-6-6-14 0-8 5s10-1 12-5 6-10 12-5-2 11-8 5';

// symboly 1–22 (viewBox 0 0 100 100)
const SYM = {
  1: <><path d="M50 22c-6-8-18-8-18 0s12 8 18 0 18-8 18 0-12 8-18 0z" /><path d="M50 32v34" /><circle cx="50" cy="32" r="2.5" /><path d="M18 70h64v4H18z" /><path d="M24 74v14M76 74v14" /><path d="M26 58h10l-1.5 8h-7z" /><path d="M44 66v-12l-3 3M44 54l3 3" /><circle cx="60" cy="61" r="5" />{star(60, 61, 3.4)}<path d="M72 66V52" /></>,
  2: <><path d="M38 20a12 12 0 1 0 24 0a9 9 0 1 1 -24 0z" /><rect x="18" y="34" width="10" height="52" /><rect x="72" y="34" width="10" height="52" /><path d="M40 50h20v28H40z" /><path d="M43 58h14M43 64h14M43 70h10" /><path d="M42 40c5 4 11 4 16 0" /></>,
  3: <><circle cx="50" cy="52" r="14" /><path d="M50 66v18M42 76h16" />{[0, 1, 2, 3, 4, 5, 6].map(i => <g key={i}>{star(26 + i * 8, 22 + Math.abs(i - 3) * 2.5, 2.6)}</g>)}<path d="M20 88c6-8 6-14 0-20M80 88c-6-8-6-14 0-20" /></>,
  4: <><path d="M30 86V44h40v42" /><path d="M26 44c0-10 8-14 10-6M74 44c0-10-8-14-10-6" /><path d="M38 30l6-10 6 8 6-8 6 10z" /><circle cx="50" cy="60" r="6" /><path d="M50 66v14M44 72h12" /></>,
  5: <><path d="M50 16v58" /><path d="M42 26h16M38 36h24M34 46h32" /><circle cx="36" cy="72" r="4" /><path d="M39 75l14 12" /><circle cx="64" cy="72" r="4" /><path d="M61 75L47 87" /></>,
  6: <><circle cx="50" cy="24" r="9" />{rays(50, 24, 12, 17, 12)}<path d="M50 84c-14-10-22-18-22-27a9 9 0 0 1 18-3a9 9 0 0 1 18 3c0 9-8 17-14 27" /><path d="M38 86c10-8 18-16 18-25" /></>,
  7: <><path d="M26 46h48v26H26z" /><path d="M22 46l6-14h44l6 14" />{[0, 1, 2].map(i => <g key={i}>{star(38 + i * 12, 38, 2.5)}</g>)}<circle cx="34" cy="80" r="8" /><circle cx="66" cy="80" r="8" /><path d="M34 72v16M26 80h16M66 72v16M58 80h16" /></>,
  8: <><path d="M50 14v68M30 30h40" /><path d="M24 30l-8 18h16zM76 30l-8 18h16z" /><path d="M16 48a8 4 0 0 0 16 0M68 48a8 4 0 0 0 16 0" /><path d="M40 86h20" /><path d="M50 14l-3 6h6z" /></>,
  9: <><path d="M66 14v76" /><path d="M30 36h22v28H30z" /><path d="M41 28v8M30 36l11-9 11 9M30 64l11 6 11-6" />{star(41, 50, 8, 6, 0.5)}<path d="M14 90l22-22 14 14 12-12 24 20" /></>,
  10: <><circle cx="50" cy="52" r="28" /><circle cx="50" cy="52" r="18" /><circle cx="50" cy="52" r="5" />{rays(50, 52, 5, 28, 8)}<path d="M50 18v-4M50 86v4" /></>,
  11: <><path d={INF} transform="translate(0 0)" /><circle cx="50" cy="56" r="14" />{rays(50, 56, 14, 26, 16)}<path d="M44 54h1M55 54h1M46 62c3 2 5 2 8 0" /></>,
  12: <><path d="M22 18h56M30 18v68M70 18v68" /><path d="M50 18v14" /><circle cx="50" cy="66" r="7" /><circle cx="50" cy="66" r="12" strokeDasharray="2 3" /><path d="M50 32v26M42 44l8 6 8-6M44 32l6 8 6-8" /></>,
  13: <><path d="M12 68h76" /><path d="M20 68V38h10v30M70 68V38h10v30M18 38l7-6 7 6M68 38l7-6 7 6" /><path d="M36 68a14 14 0 0 1 28 0" />{rays(50, 68, 18, 25, 9).slice(5)}<circle cx="50" cy="40" r="10" /><circle cx="50" cy="40" r="4" /><path d="M42 34c4 2 12 2 16 0M42 46c4-2 12-2 16 0" /><path d="M50 50v12M50 56l6-4M50 58l-6-4" /><path d="M20 80c10-4 20-4 30 0s20 4 30 0" /></>,
  14: <><path d="M50 14l12 20H38z" /><circle cx="50" cy="28" r="3" /><path d="M24 44h20l-3 18H27zM56 58h20l-3 18H59z" /><path d="M42 48c14-4 22 2 20 12" /><path d="M42 54c12-2 18 2 17 8" strokeDasharray="2 3" /><path d="M20 88c8-6 18-6 26 0s18 6 26 0" /></>,
  15: <><g transform="rotate(180 50 40)">{star(50, 40, 18)}</g><circle cx="50" cy="40" r="22" /><path d="M30 66l-6 22M70 66l6 22" /><path d="M24 74h8M68 74h8M26 82h6M70 82h6" /><path d="M38 66c4 4 20 4 24 0" /></>,
  16: <><path d="M38 86V34h24v52" /><path d="M36 34l6-8h16l6 8" /><path d="M46 46h8v10h-8zM46 66h8v10h-8z" /><path d="M76 12l-12 18h8l-10 16" />{[0, 1, 2].map(i => <circle key={i} cx={22 + i * 6} cy={30 + i * 12} r="1.6" />)}</>,
  17: <>{star(50, 30, 16, 8, 0.4)}{[[22, 18], [78, 18], [18, 40], [82, 40], [30, 54], [70, 54], [50, 54]].map(([x, y], i) => <g key={i}>{star(x, y, 3.2, 8, 0.4)}</g>)}<path d="M34 64h12l-2 10h-8z" /><path d="M40 74c0 6-4 10-10 14M58 70c6 4 14 4 20 0" /></>,
  18: <><path d="M50 14a18 18 0 1 0 0 36a14 14 0 1 1 0-36z" /><path d="M20 86V60h10v26M70 86V60h10v26" /><path d="M50 86c-4-8 4-12 0-24" strokeDasharray="2 3" />{[0, 1, 2, 3].map(i => <path key={i} d={`M${38 + i * 8} 56l-2 4h4z`} />)}</>,
  19: <><circle cx="50" cy="44" r="16" />{rays(50, 44, 19, 30, 16)}<path d="M44 42h1M55 42h1M44 50c4 3 8 3 12 0" /><path d="M20 86c10-8 20-8 30 0s20 8 30 0" /></>,
  20: <><path d="M30 26l30 12v6L30 32z" /><path d="M60 38l14-4v14l-14-4" /><path d="M42 30v12M38 36h8" /><path d="M24 86V70h12v16M44 86V66h12v20M64 86V70h12v16" /><path d="M30 64v-6M50 60v-6M70 64v-6" /></>,
  21: <><ellipse cx="50" cy="52" rx="20" ry="30" /><ellipse cx="50" cy="52" rx="24" ry="34" strokeDasharray="1 4" /><circle cx="50" cy="38" r="4" /><path d="M50 42v18M42 50l8-4 8 4M50 60l-6 12M50 60l6 10" />{[[16, 16], [84, 16], [16, 88], [84, 88]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" />)}</>,
  22: <><circle cx="72" cy="22" r="8" />{rays(72, 22, 10, 15, 10)}<path d="M14 88h40l10-14" /><path d="M36 30l14 30M36 30c-6 2-10 6-8 12" /><path d="M48 58l-8 16M50 60l8 14" /><circle cx="50" cy="56" r="4" /><path d="M28 62c4-4 8-4 10 0" />{star(22, 78, 4, 6, 0.5)}</>
};

export function TarotCard({ n, name }) {
  return (
    <div className="tcard">
      <div className="tcard__bg" style={{ backgroundImage: `url(${m('hero-mandala.webp')})` }} />
      <svg className="tcard__frame" viewBox="0 0 200 330" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="tgold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1c9" /><stop offset=".45" stopColor="#dcae5c" /><stop offset="1" stopColor="#a8722b" /></linearGradient>
        </defs>
        <rect x="6" y="6" width="188" height="318" rx="10" fill="none" stroke="url(#tgold)" strokeWidth="2.2" />
        <rect x="12" y="12" width="176" height="306" rx="6" fill="none" stroke="url(#tgold)" strokeWidth=".8" />
        {[[12, 12, 1, 1], [188, 12, -1, 1], [12, 318, 1, -1], [188, 318, -1, -1]].map(([x, y, sx, sy], i) => (
          <path key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`} d="M0 22C0 10 10 0 22 0M6 22c0-9 7-16 16-16M0 0l9 9" fill="none" stroke="url(#tgold)" strokeWidth="1.2" />
        ))}
      </svg>
      <div className="tcard__num"><span>{ROMAN[n]}</span></div>
      <div className="tcard__art">
        <div className="tcard__halo" />
        <svg viewBox="0 0 100 100" className="tcard__sym" aria-hidden="true">
          <defs><linearGradient id={`sg${n}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff6dc" /><stop offset="1" stopColor="#e9bd6c" /></linearGradient></defs>
          <g fill="none" stroke={`url(#sg${n})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{SYM[n]}</g>
        </svg>
      </div>
      <div className="tcard__name"><span>{name}</span></div>
    </div>
  );
}

export function TarotBack() {
  return (
    <div className="tcard tcard--back">
      <div className="tcard__bg tcard__bg--back" />
      <svg className="tcard__frame" viewBox="0 0 200 330" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="tgoldb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff1c9" /><stop offset=".45" stopColor="#dcae5c" /><stop offset="1" stopColor="#a8722b" /></linearGradient></defs>
        <rect x="6" y="6" width="188" height="318" rx="10" fill="none" stroke="url(#tgoldb)" strokeWidth="2.2" />
        <rect x="12" y="12" width="176" height="306" rx="6" fill="none" stroke="url(#tgoldb)" strokeWidth=".8" />
        {[[12, 12, 1, 1], [188, 12, -1, 1], [12, 318, 1, -1], [188, 318, -1, -1]].map(([x, y, sx, sy], i) => (
          <path key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`} d="M0 22C0 10 10 0 22 0M6 22c0-9 7-16 16-16M0 0l9 9" fill="none" stroke="url(#tgoldb)" strokeWidth="1.2" />
        ))}
        <g fill="none" stroke="url(#tgoldb)" strokeWidth=".7" opacity=".7">
          <circle cx="100" cy="165" r="70" /><circle cx="100" cy="165" r="56" />
          {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={100 + Math.cos(i * Math.PI / 6) * 28} cy={165 + Math.sin(i * Math.PI / 6) * 28} r="28" />)}
        </g>
      </svg>
      <img src={m('logo.webp')} alt="" className="tcard__logo" />
    </div>
  );
}
