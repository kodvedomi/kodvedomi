import { useRef, useState } from 'react';
import { about, m, img } from '../content.js';
import { LotusRule, Html } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';

function Welcome({ src = 'sonia-welcome.mp4', poster = 'sonia-welcome-poster.webp', label = 'Pozdrav od Sonie', className = '' }) {
  const v = useRef(null);
  const [play, setPlay] = useState(false);
  return (
    <figure className={`welcome card reveal ${className}`}>
      <div className="welcome__media">
        <video ref={v} src={m(src)} poster={m(poster)} playsInline controls={play} preload="none" onEnded={() => setPlay(false)} />
        {!play && (
          <button className="welcome__play" onClick={() => { setPlay(true); v.current.play(); }} aria-label={`Přehrát: ${label}`}>
            <Line.play /><span>{label}</span>
          </button>
        )}
      </div>
    </figure>
  );
}

export { Welcome };
export default function About() {
  return (
    <>
      <section className="about-hero wrap">
        <figure className="about-hero__img photo--glow reveal"><img src={m('about-portrait.webp')} alt="Sonia Edde Arael" /></figure>
        <div className="about-hero__copy reveal">
          <div className="stitle stitle--left"><span /><h1 className="gold-caps">{about.title}</h1><span /></div>
          <p className="about__greet">{about.greeting}</p>
          {about.intro.map((t, i) => <Html key={i} html={t} />)}
        </div>
      </section>

      {about.chapters.map((c, i) => (
        <section key={i} className={`chapter wrap${i % 2 ? ' chapter--rev' : ''}${c.img ? '' : ' chapter--noimg'}`}>
          <div className="chapter__head">
            {c.quote && <p className="quote-pill reveal">„{c.quote}“</p>}
            {c.title && <h2 className="gold-caps chapter__title reveal">{c.title}</h2>}
            {c.lead && <p className="chapter__lead">{c.lead}</p>}
            <LotusRule />
          </div>
          <div className="chapter__body">
            {c.img && (
              <figure className={`chapter__img reveal${c.seal ? ' chapter__img--seal' : ' photo photo--frame'}`}>
                <img src={img(c.img)} alt="" loading="lazy" style={c.pos ? { objectPosition: c.pos } : undefined} />
              </figure>
            )}
            <div className="prose reveal">{c.text.map((t, j) => <Html key={j} html={t} />)}{c.seal && <a href="#kod" className="pill-btn pill-btn--caps prose__cta">Zjisti svůj kód</a>}</div>
          </div>
        </section>
      ))}

      <section className="finale wrap">
        <div className="finale__card card reveal">
          <p className="finale__lead">{about.finale.lead}</p>
          <p className="finale__big">{about.finale.big}</p>
          <p>{about.finale.text}</p>
          <LotusRule />
          <p className="finale__lead">{about.finale.fordLead}</p>
          <p className="quote-pill">{about.finale.ford}</p>
          {about.finale.after.map((t, i) => <p key={i}>{t}</p>)}
          <p className="finale__welcome">{about.finale.welcome}</p>
          <p className="finale__sign">{about.finale.sign}</p>
          <div className="finale__ctas">
            <a href="#domu" className="pill-btn pill-btn--caps">Prozkoumat Kód Vědomí</a>
            <a href="#komunita" className="pill-btn">Připojit se ke komunitě <Line.arrow /></a>
          </div>
        </div>
        <Welcome />
      </section>
    </>
  );
}
