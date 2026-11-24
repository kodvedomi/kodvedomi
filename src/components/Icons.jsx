// Ikony: barevné sociální sítě (jako v návrhu) a linkové ikony služeb
const S = ({ children, vb = '0 0 24 24' }) => <svg viewBox={vb} aria-hidden="true">{children}</svg>;

export const Social = {
  facebook: () => <S><circle cx="12" cy="12" r="12" fill="#1877f2" /><path fill="#fff" d="M13.4 19.5v-6.2h2.1l.3-2.4h-2.4V9.4c0-.7.2-1.2 1.2-1.2h1.3V6.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H8.7v2.4h2.1v6.2z" /></S>,
  instagram: () => (
    <S>
      <defs><radialGradient id="ig" cx=".3" cy="1" r="1.2"><stop offset="0" stopColor="#fdd36e" /><stop offset=".35" stopColor="#f5793a" /><stop offset=".6" stopColor="#d6237a" /><stop offset="1" stopColor="#7a35c9" /></radialGradient></defs>
      <circle cx="12" cy="12" r="12" fill="url(#ig)" /><rect x="6.5" y="6.5" width="11" height="11" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.7" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="15.3" cy="8.7" r=".8" fill="#fff" />
    </S>
  ),
  youtube: () => <S><circle cx="12" cy="12" r="12" fill="#ff0000" /><rect x="5.5" y="7.8" width="13" height="8.4" rx="2.4" fill="#fff" /><path d="M10.6 10.2v3.6l3.2-1.8z" fill="#ff0000" /></S>,
  x: () => <S><circle cx="12" cy="12" r="12" fill="#000" /><path fill="#fff" d="M13.1 11.2 17.2 6.5h-1L12.7 10.6 9.9 6.5H6.6l4.3 6.2-4.3 4.8h1l3.7-4.3 3 4.3h3.3zm-1.3 1.5-.4-.6-3.5-5h1.5l2.8 4 .4.6 3.6 5.2h-1.5z" /></S>,
  linkedin: () => <S><circle cx="12" cy="12" r="12" fill="#0a66c2" /><path fill="#fff" d="M8.2 17.2H6V10h2.2zM7.1 9a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm10.2 8.2h-2.2v-3.5c0-.8 0-1.9-1.2-1.9s-1.4.9-1.4 1.9v3.5h-2.2V10h2.1v1c.3-.6 1-1.2 2.1-1.2 2.3 0 2.7 1.5 2.7 3.4z" /></S>,
  tiktok: () => <S><circle cx="12" cy="12" r="12" fill="#000" /><path fill="#25f4ee" d="M13.3 5.8h2c.2 1.5 1.1 2.6 2.6 2.8v2a5 5 0 0 1-2.6-.8v4.4a3.9 3.9 0 1 1-3.9-3.9h.4v2a1.9 1.9 0 1 0 1.5 1.9z" transform="translate(-.6 .4)" /><path fill="#fe2c55" d="M13.3 5.8h2c.2 1.5 1.1 2.6 2.6 2.8v2a5 5 0 0 1-2.6-.8v4.4a3.9 3.9 0 1 1-3.9-3.9h.4v2a1.9 1.9 0 1 0 1.5 1.9z" transform="translate(.6 -.4)" /><path fill="#fff" d="M13.3 5.8h2c.2 1.5 1.1 2.6 2.6 2.8v2a5 5 0 0 1-2.6-.8v4.4a3.9 3.9 0 1 1-3.9-3.9h.4v2a1.9 1.9 0 1 0 1.5 1.9z" /></S>
};

const L = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export const Line = {
  cart: () => <L><path d="M3 4h2.4l2.2 10.4h10.3L20.4 7H7" /><circle cx="9.5" cy="19" r="1.3" /><circle cx="17" cy="19" r="1.3" /></L>,
  mail: () => <L><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></L>,
  dj: () => <L><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="7" rx="1.5" /><rect x="17" y="13" width="4" height="7" rx="1.5" /></L>,
  mic: () => <L><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" /></L>,
  cal: () => <L><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" /></L>,
  share: () => <L><circle cx="18" cy="5.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" /></L>,
  search: () => <L><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></L>,
  arrow: () => <L><path d="M5 12h14M13 6l6 6-6 6" /></L>,
  out: () => <L><path d="M8 16 16 8M9 8h7v7" /></L>,
  people: () => <L><circle cx="9" cy="9" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="10" r="2.3" /><path d="M15.5 14.5A4.5 4.5 0 0 1 21 19" /></L>,
  area: () => <L><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></L>,
  pin: () => <L><path d="M12 21s-6-5.5-6-10.5a6 6 0 0 1 12 0C18 15.5 12 21 12 21z" /><circle cx="12" cy="10.5" r="2" /></L>,
  clock: () => <L><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></L>,
  chevL: () => <L><path d="m14.5 6-6 6 6 6" /></L>,
  chevR: () => <L><path d="m9.5 6 6 6-6 6" /></L>,
  play: () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#e8344e" /><path d="M10 8v8l6-4z" fill="#fff" /></svg>,
  close: () => <L><path d="M6 6l12 12M18 6 6 18" /></L>,
  herohero: () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="url(#hh)" /><defs><linearGradient id="hh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8e3fb0" /><stop offset="1" stopColor="#4a1661" /></linearGradient></defs><path d="M8.2 6.5h2.5v4.2h2.6V6.5h2.5l-1.6 11h-2.5l.6-4.5h-2.6l-.6 4.5H6.6z" fill="#fff" /></svg>,
  youtubeTile: () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect y="3" width="24" height="18" rx="5" fill="#5b2178" /><path d="M10 8.5v7l6-3.5z" fill="#fff" /></svg>,
  facebookTile: () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11.5" fill="#5b2178" /><path fill="#fff" d="M13.4 21v-7.5h2.4l.4-2.9h-2.8V8.8c0-.8.2-1.4 1.4-1.4h1.5V4.8a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.9h2.4V21z" /></svg>,
  instagramTile: () => <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#5b2178" strokeWidth="2.2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.4" /><circle cx="17.6" cy="6.4" r="1" fill="#5b2178" stroke="none" /></svg>
};
