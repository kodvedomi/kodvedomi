import { useState, useMemo } from 'react';
import { botGuard } from '../lib/safe.js';
import { submit as saveRow } from '../lib/store.js';
import { blog, m, img } from '../content.js';
import { PageTitle, Trap } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';

import { slugify, visiblePosts, featuredPost, postSlug } from '../lib/store.js';
export { slugify };

function Article({ id }) {
  const all = visiblePosts();
  const i = all.findIndex(p => postSlug(p) === id);
  const a = all[i];
  if (!a) return <section className="wrap"><a href="#blog" className="back"><Line.chevL /> Zpět na blog</a><p className="empty">Článek jsme nenašli.</p></section>;
  const next = all[(i + 1) % all.length];
  return (
    <article className="wrap article">
      <a href="#blog" className="back"><Line.chevL /> Zpět na blog</a>
      <div className={`card article__card${a.body ? " article__card--full" : ""} reveal`}>
        <div className="article__img"><img src={img(a.img)} alt="" /></div>
        <div className="article__body">
          <PostMeta p={a} />
          <h1>{a.title}</h1>
          <p className="article__lead">{a.text}</p>
          {a.body?.length ? (
            <div className="article__text">
              {a.body.map((b, k) => b.h ? <h2 key={k}>{b.h}</h2> : b.q ? <blockquote key={k}>{b.q}</blockquote> : b.img ? <figure key={k} className="article__fig"><img src={img(b.img)} alt={b.caption || ''} loading="lazy" />{b.caption && <figcaption>{b.caption}</figcaption>}</figure> : <p key={k}>{b.p}</p>)}
              <p className="article__sign">S láskou<br /><span>{a.author || 'Sonia Edde Arael'}</span></p>
            </div>
          ) : <p className="article__soon">Celý text článku brzy doplníme.</p>}
          <div className="article__nav">
            <a href="#blog" className="pill-btn pill-btn--ghost"><Line.chevL /> Všechny články</a>
            <a href={`#blog-${postSlug(next)}`} className="pill-btn">Další článek <Line.arrow /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

const PostMeta = ({ p }) => <div className="meta"><span className="tag">{p.tag}</span><span className="meta__sep" /><em>{p.demo ? 'Ukázkový článek' : (p.author || 'Sonia Edde Arael')}</em></div>;

export default function Blog({ sub }) {
  const [f, setF] = useState('Vše');
  const [q, setQ] = useState('');
  const [more, setMore] = useState(false);
  const [sent, setSent] = useState(false);
  const guard = useMemo(botGuard, []);
  const match = p => (f === 'Vše' || p.tag === f) && (p.title + p.text + (p.body || []).map(b => b.p || b.h || b.q).join(' ')).toLowerCase().includes(q.trim().toLowerCase());
  const feat = featuredPost();
  const list = visiblePosts().filter(p => p !== feat && match(p));
  const showFeatured = feat && match(feat);
  if (sub) return <Article id={sub} />;

  return (
    <section className="wrap">
      <PageTitle title="Blog" subtitle={blog.subtitle} lead={blog.lead} />
      <div className="filters">
        <div className="filters__chips" role="group" aria-label="Kategorie">
          {blog.filters.map(x => <button key={x} className={`chip${f === x ? ' is-on' : ''}`} aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>)}
        </div>
        <span className="filters__sep" aria-hidden="true" />
        <label className="search"><Line.search /><span className="sr">Hledat článek</span>
          <input id="blog-search" type="search" placeholder="Hledat článek…" value={q} onChange={e => setQ(e.target.value)} />
        </label>
      </div>

      {showFeatured && (
        <article className="card featured reveal">
          <div className="featured__img"><img src={img(feat.img)} alt="" /></div>
          <div className="featured__copy">
            <PostMeta p={feat} />
            <h2>{feat.title}</h2>
            <p>{feat.text}</p>
            <a href={`#blog-${postSlug(feat)}`} className="pill-btn">Přečíst článek <Line.arrow /></a>
          </div>
        </article>
      )}

      <div className="posts">
        {list.map(p => (
          <article key={p.title} className="card post">
            <div className="post__img"><img src={img(p.img)} alt="" loading="lazy" /></div>
            <div className="post__copy">
              <PostMeta p={p} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <a href={`#blog-${postSlug(p)}`} className="pill-btn pill-btn--sm">Číst dál <Line.arrow /></a>
            </div>
          </article>
        ))}
        {!list.length && !showFeatured && <p className="empty">Nic jsme nenašli. Zkus jiné slovo nebo kategorii.</p>}
      </div>

      <div className="stitle stitle--thin"><span />
        <button className="pill-btn" onClick={() => setMore(true)} disabled={more}>{more ? 'Další články brzy přibudou' : 'Načíst další články'}</button>
      <span /></div>

      <div className="card newsletter">
        <Line.mail />
        <p className="newsletter__title">Ať ti nic neunikne</p>
        <span className="newsletter__sep" aria-hidden="true" />
        {sent ? <p className="newsletter__ok" role="status">Děkujeme, jsi v tom s námi. 🤍</p> : (
          <form onSubmit={e => { e.preventDefault(); if (guard.ok(e.currentTarget)) saveRow('subscribers', { email: e.target.nl.value, source: 'blog' }); setSent(true); }}>
            <Trap />
            <label htmlFor="nl" className="sr">E-mail</label>
            <input id="nl" type="email" required placeholder="Tvůj e-mail" />
            <button className="pill-btn pill-btn--sm" type="submit">Chci novinky</button>
          </form>
        )}
      </div>
    </section>
  );
}
