import { shop, brand, m, img } from '../content.js';
import { PageTitle, LotusRule } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';
import { cart } from '../lib/cart.js';
import { useState } from 'react';
import Inquiry from '../components/Inquiry.jsx';

const czk = n => new Intl.NumberFormat('cs-CZ').format(n) + ' Kč';

function AddBtn({ it }) {
  const [done, setDone] = useState(false);
  return (
    <button className="pill-btn" onClick={() => { cart.add(it); setDone(true); setTimeout(() => setDone(false), 1800); }}>
      {done ? 'Přidáno do košíku ✓' : <>Do košíku <Line.cart /></>}
    </button>
  );
}

function Offer({ it, cat, onAsk }) {
  return (
    <article className={`card offer${it.best ? ' offer--best' : ''}`}>
      {it.best && <span className="offer__flag">Nejvýhodnější</span>}
      {it.soon && <span className="offer__flag offer__flag--soon">Připravujeme</span>}
      <h3>{it.name}</h3>
      <p className="offer__meta">{it.meta}</p>
      <p className="offer__price">{it.price ? czk(it.price) : 'Cena bude doplněna'}</p>
      {it.note && <p className="offer__note">{it.note}</p>}
      {it.perks && <ul className="offer__perks">{it.perks.map(p => <li key={p}>{p}</li>)}</ul>}
      {it.soon || !it.price ? (
        <button type="button" className="pill-btn" onClick={() => onAsk({ subject: it.soon ? `Zájem: ${it.name}` : `Poptávka: ${it.name}`, text: it.soon ? 'Mám zájem dozvědět se o tom jako první.' : `Dobrý den, mám zájem o: ${it.name}${it.meta ? ' – ' + it.meta : ''}.` })}>
          {it.soon ? 'Chci vědět první' : 'Poptat'} <Line.arrow />
        </button>
      ) : (
        <AddBtn it={it} />
      )}
    </article>
  );
}

function Prod({ p }) {
  const [v, setV] = useState(p.variants ? p.variants[0] : null);
  const it = { name: p.name, meta: [p.meta, v].filter(Boolean).join(' · '), price: p.price, physical: !!p.physical, digital: !!p.digital };
  return (
    <article className={`card prod reveal${p.best ? ' offer--best' : ''}`}>
      {p.best && <span className="offer__flag">Dárkový set</span>}
      <div className="prod__img"><img src={img(p.img)} alt={p.name} loading="lazy" />{p.soon && <span className="product__soon">Již brzy</span>}</div>
      <h3>{p.name}</h3>
      {p.meta && <p className="offer__meta">{p.meta}</p>}
      <p>{p.text}</p>
      {p.variants && (
        <div className="variants" role="group" aria-label="Vyber kámen">
          {p.variants.map(x => <button key={x} type="button" className={`chip${v === x ? ' is-on' : ''}`} aria-pressed={v === x} onClick={() => setV(x)}>{x}</button>)}
        </div>
      )}
      {p.price && <p className="offer__price">{czk(p.price)}<small> vč. DPH{p.physical ? ' + doprava' : ''}</small></p>}
      {p.digital && <p className="offer__note">Odkaz ke stažení PDF ti přijde e-mailem po zaplacení.</p>}
      {p.price && !p.soon && <AddBtn it={it} />}
    </article>
  );
}

function Detail({ id }) {
  const d = shop.detail[id];
  const cat = shop.categories.find(c => c.id === id);
  const [ask, setAsk] = useState(null);
  return (
    <section className="wrap shopdetail">
      <a href="#eshop" className="back"><Line.chevL /> Zpět do e-shopu</a>
      <div className="shopdetail__head card reveal">
        <div className="shopdetail__img"><img src={img(cat.img)} alt="" /></div>
        <div className="shopdetail__copy">
          <h1 className="gold-caps">{d.title}</h1>
          <LotusRule />
          <p>{d.intro}</p>
          {d.free && <button type="button" className="pill-btn pill-btn--caps" onClick={() => setAsk({ subject: 'Úvodní setkání zdarma (40 minut)', text: 'Dobrý den, ráda bych si domluvila úvodní setkání zdarma.' })}>{d.free}</button>}
        </div>
      </div>
      {d.subs && (
        <div className="subtiles">
          {d.subs.map(x => (
            <button key={x.id} type="button" className="card subtile reveal" onClick={() => document.getElementById('sk-' + x.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <div className="subtile__img"><img src={img(x.img)} alt="" loading="lazy" /></div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
              <span className="pill-btn pill-btn--sm">Zobrazit nabídku <Line.arrow /></span>
            </button>
          ))}
        </div>
      )}
      {d.groups.map((g, i) => (
        <div key={i} id={g.id ? 'sk-' + g.id : undefined} className="offers-group">
          {g.title && <div className="stitle"><span /><h2 className="gold-caps">{g.title}</h2><span /></div>}
          {g.lead && <p className="offers-group__lead">{g.lead}</p>}
          <div className={`offers offers--${g.items.length}`}>{g.items.map((it, j) => <Offer key={j} it={it} cat={id} onAsk={setAsk} />)}</div>
        </div>
      ))}
      {d.products && (
        <div className="offers offers--3 prods">
          {d.products.map(p => <Prod key={p.name} p={p} />)}
        </div>
      )}
      {!d.groups.length && !(d.products || []).some(p => p.price) && <p className="center soonbtn"><button type="button" className="pill-btn" onClick={() => setAsk({ subject: `Zájem: ${d.title}`, text: 'Dejte mi prosím vědět, až bude nabídka k dispozici.' })}>Chci vědět první <Line.arrow /></button></p>}
      {ask && <Inquiry ask={ask} onClose={() => setAsk(null)} />}
      <p className="shopnote">Platbu kartou, Apple Pay a Google Pay s automatickou fakturou připravujeme. Zatím ti objednávku potvrdíme e-mailem.</p>
    </section>
  );
}

export default function Shop({ sub }) {
  if (sub === 'numero' || sub === 'karmo') sub = 'rozbory';
  if (sub && shop.detail[sub]) return <Detail id={sub} />;
  return (
    <section className="wrap">
      <PageTitle title="E-shop" subtitle={shop.subtitle} lead={shop.lead} />
      <div className="shop">
        {shop.categories.map((s, i) => (
          <a key={s.id} href={`#eshop-${s.id}`} className={`card product reveal${i > 2 ? ' product--wide' : ''}`}>
            <div className="product__img"><img src={img(s.img)} alt="" loading="lazy" />{s.soon && <span className="product__soon">Již brzy</span>}</div>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <span className="pill-btn">{s.cta} <Line.arrow /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
