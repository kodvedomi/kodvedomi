import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { arcana, lifeCode, cardOfDay, reduce22, dateSum } from '../lib/tarot.js';
import { TarotCard, TarotBack } from './Tarot.jsx';
const KEY = 'kv-birth';

/** Karta dne – gamifikace: z kódu života a dnešního data vytáhne kartu velkých arkán. */
export default function CardOfDay() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } })();
  const [d, setD] = useState(saved || { day: '', month: '', year: '' });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState('');
  const card = useRef(null);
  const today = new Date();

  const draw = e => {
    e?.preventDefault();
    const day = +d.day, month = +d.month, year = +d.year;
    const dt = new Date(year, month - 1, day);
    if (!day || !month || !year || dt.getDate() !== day || dt.getMonth() !== month - 1 || year < 1900 || year > today.getFullYear()) return setErr('Zadej prosím celé datum narození, například 14. 3. 1987.');
    setErr('');
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {}
    const code = lifeCode(day, month, year);
    setRes({ code, todayN: reduce22(dateSum(today)), n: cardOfDay(code, today) });
  };

  useEffect(() => {
    if (!res || !card.current) return;
    gsap.timeline()
      .fromTo(card.current, { y: 0, scale: .9 }, { y: -18, scale: 1.04, duration: .35, ease: 'power2.out' })
      .fromTo(card.current.querySelector('.flip__inner'), { rotateY: 0 }, { rotateY: 180, duration: 1.1, ease: 'back.out(1.2)' }, '-=.1')
      .to(card.current, { y: 0, scale: 1, duration: .5, ease: 'power2.inOut' }, '-=.4');
  }, [res]);

  const set = k => e => setD({ ...d, [k]: e.target.value.replace(/\D/g, '') });
  const a = res && arcana[res.n];
  const dateTxt = today.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <section className="cod wrap" id="karta-dne" aria-labelledby="cod-h">
      <div className="cod__card card">
        <div className="cod__intro">
          <p className="cod__date">{dateTxt}</p>
          <h2 id="cod-h" className="gold-caps">Jaký máš dnes den?</h2>
          <p>Tvůj kód života a dnešní datum ti ukážou <b>kartu dne</b> z velkých arkán tarotové numerologie. Vrať se zítra – každý den je jiný.</p>
          <form className="cod__form" onSubmit={draw} noValidate>
            <label><span>Den</span><input id="cod-day" inputMode="numeric" maxLength={2} placeholder="14" value={d.day} onChange={set('day')} /></label>
            <label><span>Měsíc</span><input id="cod-month" inputMode="numeric" maxLength={2} placeholder="3" value={d.month} onChange={set('month')} /></label>
            <label><span>Rok</span><input id="cod-year" inputMode="numeric" maxLength={4} placeholder="1987" value={d.year} onChange={set('year')} /></label>
            <button className="pill-btn pill-btn--caps" type="submit">Vytáhnout kartu</button>
          </form>
          {err && <p className="lc__err" role="alert">{err}</p>}
          {res && <p className="cod__calc">Tvůj kód života: <b>{res.code}</b> · dnešní den: <b>{res.todayN}</b> → karta <b>{res.n}</b></p>}
        </div>
        <div className="cod__stage" aria-live="polite">
          <div className="deck">
            {!res && <><div className="deck__card deck__card--l"><TarotBack /></div><div className="deck__card deck__card--r"><TarotBack /></div></>}
            <div ref={card} className="flip" key={res ? res.n : 'back'}>
              <div className="flip__inner" style={res ? undefined : { transform: 'none' }}>
                <div className="flip__face"><TarotBack /></div>
                <div className="flip__face flip__face--front">{res && <TarotCard n={res.n} name={a.name} />}</div>
              </div>
            </div>
          </div>
          {a && <p className="cod__text"><b>{a.name}:</b> {a.text}</p>}
        </div>
      </div>
    </section>
  );
}
