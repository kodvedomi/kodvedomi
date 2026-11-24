import { useEffect, useMemo, useRef, useState } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import { deliver } from '../lib/notify.js';
import gsap from 'gsap';
import { sonia, brand, m, img } from '../content.js';
import { Html, Trap } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';

const scrollToForm = () => document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function Stats() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current.querySelectorAll('[data-n]');
    const st = gsap.context(() => {
      els.forEach(el => {
        const n = +el.dataset.n, o = { v: 0 };
        gsap.to(o, { v: n, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = new Intl.NumberFormat('cs-CZ').format(Math.round(o.v))) });
      });
    }, ref);
    return () => st.revert();
  }, []);
  return (
    <div ref={ref} className="stats wrap">
      {sonia.stats.map(s => (
        <div key={s.label} className="stat"><p className="stat__n"><span data-n={s.n}>{new Intl.NumberFormat('cs-CZ').format(s.n)}</span>{s.suffix}</p><p className="stat__l">{s.label}</p></div>
      ))}
    </div>
  );
}

function Feature({ data, flip, children, id }) {
  return (
    <section id={id} className={`feature wrap${flip ? ' feature--flip' : ''}`}>
      <div className="feature__copy reveal">
        <h2 className="feature__title">{data.title}</h2>
        {data.text.map((t, i) => <Html key={i} html={t} />)}
        {children}
      </div>
      <div className={`feature__photos feature__photos--${data.photos.length}`}>
        {data.photos.map((p, i) => <figure key={p} className={`feature__ph ph-${i} reveal`} data-depth={i}><img src={img(p)} alt="" loading="lazy" /></figure>)}
      </div>
    </section>
  );
}

function Gallery() {
  const [i, setI] = useState(-1);
  const g = sonia.gallery;
  useEffect(() => {
    if (i < 0) return;
    const k = e => { if (e.key === 'Escape') setI(-1); if (e.key === 'ArrowRight') setI(x => (x + 1) % g.length); if (e.key === 'ArrowLeft') setI(x => (x - 1 + g.length) % g.length); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [i, g.length]);
  return (
    <section className="gallery wrap" aria-labelledby="gal-h">
      <h2 id="gal-h" className="feature__title center">Galerie</h2>
      <div className="gallery__grid">
        {g.map((p, k) => (
          <button key={p} className={`gallery__item gi-${k} reveal`} onClick={() => setI(k)} aria-label="Zvětšit fotografii">
            <img src={img(p)} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {i >= 0 && (
        <div className="lightbox" data-lenis-prevent role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && setI(-1)}>
          <img src={img(g[i])} alt="" />
          <button className="lightbox__btn lightbox__close" onClick={() => setI(-1)} aria-label="Zavřít"><Line.close /></button>
          <button className="lightbox__btn lightbox__prev" onClick={() => setI((i - 1 + g.length) % g.length)} aria-label="Předchozí"><Line.chevL /></button>
          <button className="lightbox__btn lightbox__next" onClick={() => setI((i + 1) % g.length)} aria-label="Další"><Line.chevR /></button>
        </div>
      )}
    </section>
  );
}

function Booking() {
  const b = sonia.booking;
  const [f, setF] = useState({ name: '', email: '', phone: '', service: b.services[0], date: '', place: '', msg: '' });
  const [sent, setSent] = useState(false);
  const guard = useMemo(botGuard, []);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const body = `Jméno: ${f.name}\nE-mail: ${f.email}\nTelefon: ${f.phone || '-'}\nSlužba: ${f.service}\nTermín: ${f.date || 'zatím neznám'}\nMísto: ${f.place || '-'}\n\n${f.msg}`;
  const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault();
    if (!guard.ok(e.currentTarget)) { setSent('ok'); return; }
    saveRow('messages', { kind: 'poptavka', topic: f.service, name: f.name, email: f.email, phone: f.phone, data: { date: f.date, place: f.place }, message: f.msg });
    setBusy(true);
    setSent(await deliver(`Web: nezávazná poptávka – ${f.service} – ${f.name}`, body, { name: f.name, email: f.email }));
    setBusy(false);
  };
  return (
    <section id="poptavka" className="booking">
      <div className="booking__inner wrap">
        <div className="booking__copy reveal">
          <h2 className="feature__title">{b.title}</h2>
          {b.text.map((t, i) => <p key={i}>{t}</p>)}
          <p className="price-from">{b.priceFrom}</p>
          <p className="mail-line mail-line--light"><Line.mail /> <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
        </div>
        <form className="booking__form card reveal" onSubmit={submit}>
            <Trap />
          <div className="row2">
            <label><span>Jméno *</span><input id="b-name" required value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label><span>E-mail *</span><input id="b-email" type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></label>
          </div>
          <div className="row2">
            <label><span>Telefon</span><input id="b-phone" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="nepovinné" /></label>
            <label><span>Požadovaná služba</span><select id="b-service" value={f.service} onChange={set('service')}>{b.services.map(s => <option key={s}>{s}</option>)}</select></label>
          </div>
          <div className="row2">
            <label><span>Termín akce</span><input id="b-date" type="date" value={f.date} onChange={set('date')} /></label>
            <label><span>Místo akce</span><input id="b-place" value={f.place} onChange={set('place')} placeholder="Město nebo adresa" /></label>
          </div>
          <label><span>Tvoje představa o akci</span><textarea id="b-msg" rows="4" value={f.msg} onChange={set('msg')} placeholder="Typ akce, délka vystoupení, počet hostů, aparatura…" /></label>
          <p className="booking__hint">Přesný termín ani všechny podrobnosti zatím znát nemusíš.</p>
          <button className="pill-btn pill-btn--caps" type="submit" disabled={busy}>{busy ? 'Odesílám…' : 'Odeslat nezávaznou poptávku'}</button>
          {sent === 'ok' && <p className="booking__ok" role="status">Děkujeme, poptávku jsme odeslali. Sonia se vám brzy ozve na zadaný e-mail.</p>}
          {sent === 'mail' && <p className="booking__ok" role="status">Otevřeli jsme ti e-mail se zprávou – stačí ho odeslat. Pokud se neotevřel, napiš na {brand.email}.</p>}
        </form>
      </div>
    </section>
  );
}

export default function Sonia() {
  const video = useRef(null);
  useEffect(() => { video.current?.play?.().catch(() => {}); }, []);
  const words = ['DJing', 'Moderování', 'Ibiza', 'Duplex', 'Rádio Kiss', 'Prima COOL', 'TV Barrandov', 'Eventy', 'Open-air', 'Festivaly'];
  return (
    <div className="sonia">
      {/* úvodní video */}
      <section className="se-hero">
        <video ref={video} className="se-hero__video" src={m('se-event.mp4')} poster={m('se-event-poster.webp')} autoPlay muted loop playsInline aria-hidden="true" />
        <div className="se-hero__veil" />
        <div className="se-hero__inner wrap">
          <img src={m('se-logo.webp')} alt="" className="se-hero__logo" />
          <h1 className="se-hero__title">Sonia Edde</h1>
          <p className="se-hero__roles">{sonia.roles}</p>
          <p className="se-hero__lead">{sonia.intro}</p>
          <p className="se-hero__text">{sonia.introText}</p>
          <button className="pill-btn pill-btn--caps" onClick={scrollToForm}>Poptat spolupráci</button>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">{[...words, ...words].map((w, i) => <span key={i}>{w}<i>✦</i></span>)}</div>
      </div>

      {/* most mezi světy */}
      <section className="bridge wrap reveal">
        <figure className="bridge__img"><img src={m('se-portrait.webp')} alt="Sonia Edde" loading="lazy" /></figure>
        <div className="bridge__copy">
          <p className="quote-pill">„{sonia.bridge.title}“</p>
          <p>{sonia.bridge.text}</p>
          <h2 className="bridge__headline">{sonia.headline}</h2>
        </div>
      </section>

      <Stats />

      <Feature id="djing" data={sonia.dj} />
      <Feature id="moderovani" data={sonia.mod} flip>
        <p className="b">{sonia.mod.showsTitle}</p>
        <ul className="shows">{sonia.mod.shows.map(s => <li key={s.name}><strong>{s.name}</strong><span>{s.note}</span></li>)}</ul>
        {sonia.mod.text2.map((t, i) => <Html key={i} html={t} />)}
      </Feature>
      <Feature id="akce" data={sonia.events}>
        <button className="pill-btn" onClick={scrollToForm}>Naplánovat akci <Line.arrow /></button>
      </Feature>

      <section className="videos wrap" aria-labelledby="vid-h">
        <h2 id="vid-h" className="feature__title center">Ukázky mé práce</h2>
        <p className="center videos__lead">Videa se otevřou na YouTube.</p>
        <div className="videos__grid">
          {sonia.videos.map(v => (
            <a key={v.href} href={v.href} target="_blank" rel="noopener" className="vcard reveal">
              <img src={img(v.img)} alt="" loading="lazy" style={{ objectPosition: v.pos }} />
              <span className="vcard__play"><Line.play /></span>
              <span className="vcard__title">{v.title}</span>
              <span className="vcard__yt">YouTube <Line.out /></span>
            </a>
          ))}
        </div>
      </section>

      <Gallery />
      <Booking />
    </div>
  );
}
