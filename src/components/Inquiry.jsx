import { useState, useMemo, useEffect, useRef } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import { deliver } from '../lib/notify.js';
import { Trap } from './Ornaments.jsx';
import { Line } from './Icons.jsx';

// Krátký formulář „Poptat / Mám zájem“ – zpráva jde rovnou Sonii na e-mail.
export default function Inquiry({ ask, onClose }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', msg: ask.text || '', gdpr: false });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState('');
  const guard = useMemo(botGuard, []);
  const first = useRef(null);
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    document.documentElement.classList.add('modal-open');
    first.current?.focus();
    return () => { window.removeEventListener('keydown', esc); document.documentElement.classList.remove('modal-open'); };
  }, [onClose]);
  const submit = async e => {
    e.preventDefault();
    if (!guard.ok(e.currentTarget)) { setSent('ok'); return; }
    if (!f.name.trim()) return setErr('Vyplň prosím jméno.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Zkontroluj prosím e-mail.');
    if (!f.gdpr) return setErr('Potvrď prosím souhlas se zpracováním osobních údajů.');
    setErr('');
    const body = `${ask.subject}\n\n${f.msg}\n\n—\n${f.name}\n${f.email}${f.phone ? '\n' + f.phone : ''}`;
    saveRow('messages', { kind: 'poptavka', topic: ask.subject, name: f.name, email: f.email, phone: f.phone, message: f.msg });
    setBusy(true);
    setSent(await deliver(`Web: ${ask.subject} – ${f.name}`, body, { name: f.name, email: f.email }));
    setBusy(false);
  };
  return (
    <div className="modal" data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="inq-title" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="modal__box card inq">
        <button className="modal__close" onClick={onClose} aria-label="Zavřít"><Line.close /></button>
        <h2 id="inq-title" className="gold-caps">{ask.subject}</h2>
        {sent === 'ok' ? (
          <div role="status">
            <p className="modal__lead">Děkuji, zpráva je odeslaná. Ozvu se ti brzy na {f.email}.</p>
            <button className="pill-btn" onClick={onClose}>Zavřít</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="inq__form">
            <Trap />
            <label><span>Jméno a příjmení *</span><input ref={first} autoComplete="name" value={f.name} onChange={set('name')} /></label>
            <div className="row2">
              <label><span>E-mail *</span><input type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
              <label><span>Telefon</span><input type="tel" autoComplete="tel" placeholder="nepovinné" value={f.phone} onChange={set('phone')} /></label>
            </div>
            <label><span>Zpráva</span><textarea rows="4" value={f.msg} onChange={set('msg')} /></label>
            <label className="check"><input type="checkbox" checked={f.gdpr} onChange={set('gdpr')} /><span>Souhlasím se zpracováním osobních údajů pro vyřízení poptávky *</span></label>
            {err && <p className="lc__err" role="alert">{err}</p>}
            <button className="pill-btn pill-btn--caps" type="submit" disabled={busy}>{busy ? 'Odesílám…' : 'Odeslat'}</button>
            {sent === 'mail' && <p className="booking__ok" role="status">Otevřeli jsme ti e-mail se zprávou – stačí ho odeslat.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
