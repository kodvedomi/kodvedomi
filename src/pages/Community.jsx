import { useState } from 'react';
import { community, m } from '../content.js';
import { PageTitle } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';

const tile = { herohero: Line.herohero, facebook: Line.facebookTile, instagram: Line.instagramTile };

function Channel({ c }) {
  const [open, setOpen] = useState(false);
  const T = tile[c.id];
  return (
    <article className={`card channel reveal${c.paid ? ' channel--primary' : ''}`}>
      <div className="channel__head">
        <span className="channel__icon"><T /></span>
        <span className="channel__sep" />
        <span className="channel__name"><strong>{c.short}</strong><em className={c.paid ? 'is-paid' : 'is-free'}>{c.paid ? 'Placené' : 'Zdarma'}</em></span>
      </div>
      <h2 className="channel__title">{c.name}</h2>
      <p className="channel__kicker">{c.kicker}</p>
      <div className={`channel__text${open ? ' is-open' : ''}`}>{c.text.map((t, i) => <p key={i}>{t}</p>)}</div>
      <button className="channel__more" onClick={() => setOpen(o => !o)} aria-expanded={open}>{open ? 'Méně' : 'Číst více'}</button>
      <p className="channel__badge">{c.badge}</p>
      <a href={c.href} target="_blank" rel="noopener" className="pill-btn">{c.cta} <Line.out /></a>
    </article>
  );
}

export default function Community() {
  return (
    <section className="wrap">
      <PageTitle title={community.title} subtitle={community.subtitle} lead={community.lead} />
      <figure className="community__hero reveal">
        <img src={m('community.webp')} alt="Kruh lidí při společné meditaci" />
        <div className="community__ring" aria-hidden="true" />
      </figure>
      <div className="community__grid">{community.channels.map(c => <Channel key={c.id} c={c} />)}</div>
      <div className="stitle stitle--thin"><span /><p className="ptitle__sub">{community.foot}</p><span /></div>
    </section>
  );
}
