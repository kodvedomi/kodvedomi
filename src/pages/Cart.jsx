import { useState, useMemo } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import { brand, checkout } from '../content.js';
import { PageTitle, Trap } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';
import { cart, useCart } from '../lib/cart.js';

const czk = n => new Intl.NumberFormat('cs-CZ').format(n) + ' Kč';

export default function Cart() {
  const items = useCart();
  const [f, setF] = useState({ name: '', phone: '', email: '', street: '', city: '', zip: '', ship: 'email', ico: '', company: '', voucher: false, giftFor: '', wrap: false, terms: false, gdpr: false, news: false });
  const guard = useMemo(botGuard, []);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const needPost = items.some(x => x.physical);
  const options = checkout.shipping.filter(s => !(needPost && s.digital));
  const ship = options.find(s => s.id === f.ship) || options[0];
  const physical = !ship.digital;
  const sub = items.reduce((a, x) => a + x.price * x.qty, 0);
  const total = sub + ship.price + (f.wrap ? checkout.giftWrap.price : 0);

  const submit = e => {
    e.preventDefault();
    if (!guard.ok(e.currentTarget)) { setSent(true); return; }
    if (!items.length) return setErr('Košík je prázdný.');
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || !f.phone.trim()) return setErr('Vyplň prosím jméno a příjmení, telefon a e-mail.');
    if ((physical || f.wrap) && (!f.street.trim() || !f.city.trim() || !f.zip.trim())) return setErr('Pro doručení poštou vyplň prosím adresu.');
    if (!f.terms || !f.gdpr) return setErr('Pro odeslání objednávky je potřeba souhlas s obchodními podmínkami a zpracováním osobních údajů.');
    setErr('');
    const lines = items.map(x => `- ${x.name}${x.meta ? ' (' + x.meta + ')' : ''} × ${x.qty} = ${czk(x.price * x.qty)}`).join('\n');
    const body = `OBJEDNÁVKA Z WEBU KÓD VĚDOMÍ\n\n${lines}\n\nDoprava: ${ship.label} (${czk(ship.price)})${f.wrap ? `\nDárkové balení s poštou: ${czk(checkout.giftWrap.price)}` : ''}${f.voucher ? `\nJako dárkový certifikát (voucher)${f.giftFor ? ' pro: ' + f.giftFor : ''}` : ''}\nCELKEM: ${czk(total)}\n\nJméno a příjmení: ${f.name}\nTelefon: ${f.phone}\nE-mail: ${f.email}\nAdresa: ${[f.street, f.city, f.zip].filter(Boolean).join(', ') || '-'}\nFirma / IČO: ${[f.company, f.ico].filter(Boolean).join(', ') || '-'}\n\nSouhlas s obchodními podmínkami: ano\nSouhlas se zpracováním osobních údajů: ano\nOdběr novinek: ${f.news ? 'ano' : 'ne'}`;
    saveRow('orders', { name: f.name, email: f.email, phone: f.phone, items, shipping: ship.label, shipping_price: ship.price, gift_wrap: f.wrap, voucher: f.voucher, gift_for: f.giftFor, address: [f.street, f.city, f.zip].filter(Boolean).join(', '), company: f.company, ico: f.ico, newsletter: f.news, total, status: 'nová' });
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Objednávka – ' + f.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="wrap">
      <PageTitle title="Košík" subtitle="Tvoje objednávka" lead="Bez registrace, jen pár údajů." lotus={false} />
      {!items.length ? (
        <div className="card cart-empty">
          <p>Košík je zatím prázdný.</p>
          <a href="#eshop" className="pill-btn">Prohlédnout e-shop <Line.arrow /></a>
        </div>
      ) : (
        <div className="checkout">
          <form className="card checkout__form" onSubmit={submit} noValidate>
            <Trap />
            <h2 className="gold-caps">Kontaktní údaje</h2>
            <label><span>Jméno a příjmení *</span><input id="c-name" autoComplete="name" value={f.name} onChange={set('name')} /></label>
            <div className="row2">
              <label><span>Telefon *</span><input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} /></label>
              <label><span>E-mail *</span><input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
            </div>

            <h2 className="gold-caps">Doprava</h2>
            {needPost && <p className="ship__hint">V košíku máš fyzický produkt, proto vyber doručení. Služby a e-knihy ti pošleme e-mailem.</p>}
            <div className="ship">
              {options.map(s => (
                <label key={s.id} className={`ship__opt${ship.id === s.id ? ' is-on' : ''}`}>
                  <input type="radio" name="ship" value={s.id} checked={ship.id === s.id} onChange={set('ship')} />
                  <span><b>{s.label}</b><em>{s.note}</em></span>
                  <strong>{s.price ? czk(s.price) : 'zdarma'}</strong>
                </label>
              ))}
            </div>

            <h2 className="gold-caps">Adresa {physical || f.wrap ? '*' : '(pro fakturu)'}</h2>
            <label><span>Ulice a číslo</span><input id="c-street" autoComplete="street-address" value={f.street} onChange={set('street')} /></label>
            <div className="row2">
              <label><span>Město</span><input id="c-city" autoComplete="address-level2" value={f.city} onChange={set('city')} /></label>
              <label><span>PSČ</span><input id="c-zip" autoComplete="postal-code" value={f.zip} onChange={set('zip')} /></label>
            </div>
            <div className="row2">
              <label><span>Firma (nepovinné)</span><input id="c-company" autoComplete="organization" value={f.company} onChange={set('company')} /></label>
              <label><span>IČO (nepovinné)</span><input id="c-ico" inputMode="numeric" value={f.ico} onChange={set('ico')} /></label>
            </div>

            <h2 className="gold-caps">Dárek</h2>
            <label className="check"><input id="c-voucher" type="checkbox" checked={f.voucher} onChange={set('voucher')} /><span>Chci objednávku jako <b>dárkový certifikát (voucher)</b></span></label>
            {f.voucher && <label><span>Pro koho je dárek (nepovinné)</span><input id="c-giftfor" value={f.giftFor} onChange={set('giftFor')} /></label>}
            <label className="check"><input id="c-wrap" type="checkbox" checked={f.wrap} onChange={set('wrap')} /><span><b>{checkout.giftWrap.label}</b> (+ {czk(checkout.giftWrap.price)})</span></label>

            <h2 className="gold-caps">Souhlasy</h2>
            <label className="check"><input id="c-terms" type="checkbox" checked={f.terms} onChange={set('terms')} /><span>Souhlasím s <a href="#podminky">obchodními podmínkami</a> *</span></label>
            <label className="check"><input id="c-gdpr" type="checkbox" checked={f.gdpr} onChange={set('gdpr')} /><span>Souhlasím se <a href="#gdpr">zpracováním osobních údajů (GDPR)</a> *</span></label>
            <label className="check"><input id="c-news" type="checkbox" checked={f.news} onChange={set('news')} /><span>Chci dostávat newsletter Kódu Vědomí</span></label>
            {err && <p className="lc__err" role="alert">{err}</p>}
            <button className="pill-btn pill-btn--caps" type="submit">Odeslat objednávku</button>
            {sent && <p className="booking__ok" role="status">Otevřeli jsme ti e-mail s objednávkou – stačí ho odeslat. Pokud se neotevřel, napiš na {brand.email}.</p>}
          </form>

          <aside className="card checkout__sum">
            <h2 className="gold-caps">Shrnutí</h2>
            <ul className="sum">
              {items.map(x => (
                <li key={x.id}>
                  <div><b>{x.name}</b><em>{x.meta}</em></div>
                  <div className="qty">
                    <button type="button" onClick={() => cart.setQty(x.id, x.qty - 1)} aria-label="Ubrat">−</button>
                    <span>{x.qty}</span>
                    <button type="button" onClick={() => cart.setQty(x.id, x.qty + 1)} aria-label="Přidat">+</button>
                  </div>
                  <strong>{czk(x.price * x.qty)}</strong>
                </li>
              ))}
            </ul>
            <p className="sum__row"><span>Doprava</span><span>{ship.price ? czk(ship.price) : 'zdarma'}</span></p>
            {f.wrap && <p className="sum__row"><span>Dárkové balení</span><span>{czk(checkout.giftWrap.price)}</span></p>}
            <p className="sum__row sum__total"><span>Celkem</span><span>{czk(total)}</span></p>
            <p className="shopnote">Platbu kartou, Apple Pay a Google Pay s automatickou fakturou připravujeme. Zatím ti objednávku potvrdíme e-mailem.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
