import { useEffect, useMemo, useRef, useState } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import gsap from 'gsap';
import { lifePath, links, m } from '../content.js';
import { lifePathNumber } from '../lib/numerology.js';
import { Line } from './Icons.jsx';
import { LotusRule, Trap } from './Ornaments.jsx';

/** „Kód tvého života“ – vyskakovací okno: formulář (jméno, e-mail, datum narození)
 *  → mini rozbor + přihlášení k odběru novinek. Odeslání e-mailu napojíme na newsletter službu. */
export default function LifeCodeModal({ open, onClose }) {
  const [f, setF] = useState({ name: '', email: '', day: '', month: '', year: '', ok: false });
  const guard = useMemo(botGuard, []);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const box = useRef(null), num = useRef(null), ring = useRef(null), txt = useRef(null), first = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('modal-open');
    gsap.fromTo(box.current, { y: 40, scale: 0.96, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out' });
    setTimeout(() => first.current?.focus(), 60);
    const esc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.documentElement.classList.remove('modal-open'); };
  }, [open, onClose]);

  useEffect(() => {
    if (!res) return;
    const c = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo(ring.current, { rotate: 0 }, { rotate: 720, duration: 2, ease: 'expo.inOut' }, 0)
      .to(c, { v: res.steps[0], duration: 1.1, ease: 'power2.out', onUpdate: () => (num.current.textContent = Math.round(c.v)) }, 0.1)
      .add(() => (num.current.textContent = res.result), 1.4)
      .fromTo(num.current, { scale: 0.4, filter: 'blur(10px)' }, { scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(2)' }, 1.4)
      .fromTo(txt.current, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 1.7);
    return () => tl.kill();
  }, [res]);

  if (!open) return null;

  const set = k => e => setF({ ...f, [k]: k === 'ok' ? e.target.checked : ['day', 'month', 'year'].includes(k) ? e.target.value.replace(/\D/g, '') : e.target.value });
  const submit = e => {
    e.preventDefault();
    if (!guard.ok(e.currentTarget)) { return; }
    const day = +f.day, month = +f.month, year = +f.year;
    const dt = new Date(year, month - 1, day);
    if (!f.name.trim()) return setErr('Napiš prosím své jméno.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Zkontroluj prosím e-mail – pošleme ti na něj výpis.');
    if (!day || !month || !year || dt.getDate() !== day || dt.getMonth() !== month - 1 || year < 1900 || year > new Date().getFullYear()) return setErr('Zkontroluj prosím datum narození, například 14. 3. 1987.');
    if (!f.ok) return setErr('Potvrď prosím souhlas se zasíláním výpisu a novinek.');
    const r = lifePathNumber(day, month, year);
    saveRow('subscribers', { name: f.name, email: f.email, source: 'kod-zivota', birth: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, life_number: r.result });
    setErr(''); setRes(r);
  };
  const md = res && lifePath[res.result];

  return (
    <div className="modal" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="lc-title" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div ref={box} className="modal__box card">
        <button className="modal__close" onClick={onClose} aria-label="Zavřít"><Line.close /></button>
        <h2 id="lc-title" className="gold-caps">Kód tvého života</h2>
        <p className="modal__lead">Datum tvého narození je tvůj osobní kód.</p>
        <LotusRule />
        <div className="lc">
          <form onSubmit={submit} className="lc__form" noValidate>
            <Trap />
            <label className="lc__field lc__field--wide"><span>Jméno</span><input ref={first} id="lc-name" autoComplete="given-name" value={f.name} onChange={set('name')} /></label>
            <label className="lc__field lc__field--wide"><span>E-mail</span><input id="lc-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
            <div className="lc__fields">
              <label className="lc__field"><span>Den</span><input id="lc-day" inputMode="numeric" maxLength={2} placeholder="14" value={f.day} onChange={set('day')} /></label>
              <label className="lc__field"><span>Měsíc</span><input id="lc-month" inputMode="numeric" maxLength={2} placeholder="3" value={f.month} onChange={set('month')} /></label>
              <label className="lc__field"><span>Rok</span><input id="lc-year" inputMode="numeric" maxLength={4} placeholder="1987" value={f.year} onChange={set('year')} /></label>
            </div>
            <label className="lc__check"><input id="lc-ok" type="checkbox" checked={f.ok} onChange={set('ok')} /> <span>Souhlasím se zasláním výpisu a s odběrem novinek Kódu Vědomí. Odhlásit se můžeš kdykoli.</span></label>
            <button type="submit" className="pill-btn pill-btn--caps">Odhal svůj kód</button>
            {err && <p className="lc__err" role="alert">{err}</p>}
          </form>
          <div className="lc__oracle" aria-live="polite">
            <div className="oracle">
              <img src={m('hero-mandala.webp')} alt="" className="oracle__bg" />
              <svg ref={ring} className="oracle__ring" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="94" /><circle cx="100" cy="100" r="78" strokeDasharray="2 6" />
                {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2 - Math.PI / 2; return <text key={i} x={100 + Math.cos(a) * 86} y={100 + Math.sin(a) * 86 + 3}>{i + 1}</text>; })}
              </svg>
              <span ref={num} className="oracle__num">{res ? res.result : '?'}</span>
            </div>
            {res && <p className="lc__steps">{res.digits.join(' + ')} = {res.steps.join(' → ')}</p>}
          </div>
        </div>
        <div ref={txt} className="lc__result">
          {md && (
            <>
              <h3>{f.name.split(' ')[0]}, tvé číslo je {res.result} – {md.name}</h3>
              <p>{md.text}</p>
              <p className="lc__note">Celý osobní výpis ti pošleme na {f.email}. Na své cestě můžeš pokračovat na HeroHero.</p>
              <div className="lc__ctas">
                <a href={links.herohero} target="_blank" rel="noopener" className="pill-btn">Pokračovat na HeroHero <Line.arrow /></a>
                <a href="#eshop-rozbory" className="pill-btn pill-btn--ghost" onClick={onClose}>Objednat celý rozbor <Line.arrow /></a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
