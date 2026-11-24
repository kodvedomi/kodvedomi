import { useState, useMemo } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import { brand } from '../content.js';
import { PageTitle, Trap } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';
import { SocialCards } from '../components/Layout.jsx';

const TOPICS = ['Dotaz', 'Poptávka', 'Koučink', 'Rozbor', 'Objednávka z e-shopu', 'Spolupráce / média', 'Jiné'];

export default function Contact() {
  const [f, setF] = useState({ first: '', last: '', email: '', phone: '', topic: TOPICS[0], msg: '', gdpr: false });
  const guard = useMemo(botGuard, []);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const submit = e => {
    e.preventDefault();
    if (!guard.ok(e.currentTarget)) { setSent(true); return; }
    if (!f.first.trim() || !f.last.trim()) return setErr('Vyplň prosím jméno a příjmení.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Zkontroluj prosím e-mail.');
    if (!f.msg.trim()) return setErr('Napiš prosím, s čím ti můžu pomoci.');
    if (!f.gdpr) return setErr('Potvrď prosím souhlas se zpracováním osobních údajů.');
    setErr('');
    const body = `${f.msg}\n\n—\n${f.first} ${f.last}\n${f.email}${f.phone ? '\n' + f.phone : ''}`;
    saveRow('messages', { kind: 'kontakt', topic: f.topic, name: `${f.first} ${f.last}`.trim(), email: f.email, phone: f.phone, message: f.msg });
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`${f.topic} – ${f.first} ${f.last}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section className="wrap">
      <PageTitle title="Kontakt" subtitle="Napiš mi, ráda se ti ozvu." lead="Dotaz, poptávka, koučink, rozbor i spolupráce – vše na jednom místě." />
      <div className="contact">
        <form className="card contact__form reveal" onSubmit={submit} noValidate>
            <Trap />
          <h2 className="gold-caps">Napiš mi</h2>
          <div className="row2">
            <label><span>Jméno *</span><input id="k-first" autoComplete="given-name" value={f.first} onChange={set('first')} /></label>
            <label><span>Příjmení *</span><input id="k-last" autoComplete="family-name" value={f.last} onChange={set('last')} /></label>
          </div>
          <div className="row2">
            <label><span>E-mail *</span><input id="k-mail" type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
            <label><span>Telefon</span><input id="k-phone" type="tel" autoComplete="tel" placeholder="nepovinné" value={f.phone} onChange={set('phone')} /></label>
          </div>
          <div className="topics" role="radiogroup" aria-label="S čím ti můžu pomoci">
            {TOPICS.map(t => (
              <button type="button" key={t} role="radio" aria-checked={f.topic === t} className={`chip${f.topic === t ? ' is-on' : ''}`} onClick={() => setF({ ...f, topic: t })}>{t}</button>
            ))}
          </div>
          <label><span>Zpráva *</span><textarea id="k-text" rows="6" value={f.msg} onChange={set('msg')} placeholder="S čím ti můžu pomoci?" /></label>
          <label className="check"><input id="k-gdpr" type="checkbox" checked={f.gdpr} onChange={set('gdpr')} /><span>Souhlasím se zpracováním osobních údajů pro vyřízení mé zprávy *</span></label>
          {err && <p className="lc__err" role="alert">{err}</p>}
          <button className="pill-btn pill-btn--caps" type="submit">Odeslat zprávu</button>
          {sent && <p className="booking__ok" role="status">Otevřeli jsme ti e-mail s tvou zprávou – stačí ho odeslat. Pokud se neotevřel, napiš na {brand.email}.</p>}
        </form>
        <div className="contact__side">
          <div className="card reveal">
            <h2 className="gold-caps">Sonia Edde Arael</h2>
            <p className="mail-line"><Line.mail /> <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
            {brand.phone && <p className="mail-line"><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a></p>}
          </div>
          <div className="card reveal">
            <h2 className="gold-caps">Sleduj mě</h2>
            <SocialCards />
          </div>
          <div className="card reveal">
            <h2 className="gold-caps">Fakturační údaje</h2>
            <p><b>{brand.company.name}</b><br />{brand.company.address}<br />IČO {brand.company.ico} · DIČ {brand.company.dic}<br />Datová schránka: {brand.company.databox}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
