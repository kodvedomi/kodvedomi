import Galaxy from '../rb/Galaxy.jsx';
import ShinyText from '../rb/ShinyText.jsx';
import Magnet from '../rb/Magnet.jsx';
import { home, links, m, img } from '../content.js';
import CardOfDay from '../components/CardOfDay.jsx';
import { visiblePosts, featuredPost, postSlug } from '../lib/store.js';
import { Welcome } from './About.jsx';
import { SectionTitle, Html, LotusRule } from '../components/Ornaments.jsx';
import { Line } from '../components/Icons.jsx';

export default function Home() {
  return (
    <>
      {/* ústřední ilustrace – meditující postava a mandala */}
      <section className="hero-frame" aria-label="Úvod">
        <div className="hero-frame__inner">
          <img src={m('hero-mandala.webp')} alt="Mandala Kódu Vědomí s meditující postavou v kosmickém světle" className="hero-frame__bg" fetchpriority="high" />
          <div className="hero-frame__gl" aria-hidden="true">
            <Galaxy dpr={1.5} starColors={['#ffffff', '#f3e8ff', '#ffe6c2']} density={0.6} glowIntensity={0.4} twinkleIntensity={0.9}
              rotationSpeed={0.01} starSpeed={0.12} speed={0.3} repulsionStrength={1.2} clickWarp={false} flareIntensity={0.15} starSize={0.7} transparent />
          </div>
          <div className="hero-frame__pulse" aria-hidden="true" />
          <div className="hero-frame__shine" aria-hidden="true" />
          <Magnet padding={70} magnetStrength={3} wrapperClassName="hero-frame__cta">
            <a href="#kod" className="pill-btn pill-btn--hero">
              <ShinyText color="#3a1550" shineColor="#ffffff" speed={3} delay={1.5} shineWidth={28}>Kód tvého života</ShinyText>
            </a>
          </Magnet>
        </div>
      </section>

      {/* filozofie */}
      <section className="philo wrap" id="filozofie">
        <figure className="philo__img photo photo--frame reveal"><img src={m('philo-portrait.webp')} alt="Sonia Edde Arael" loading="lazy" /></figure>
        <div className="philo__copy reveal">
          <h2 className="gold-caps gold-caps--lg">{home.philo.title}</h2>
          <p className="ptitle__sub">{home.philo.sub}</p>
          {home.philo.text.map((t, i) => <Html key={i} html={t} />)}
          <a href="#kod" className="pill-btn pill-btn--caps pill-btn--title">{home.code.cta}</a>
        </div>
      </section>

      {/* poznej kód svého života */}
      <section className="codeband wrap reveal">
        <div className="codeband__card card">
          <div className="codeband__seal" aria-hidden="true"><img src={m('seal-33.webp')} alt="" loading="lazy" /></div>
          <div className="codeband__copy">
            <h2 className="gold-caps">{home.code.title}</h2>
            {home.code.text.map((t, i) => <Html key={i} html={t} />)}
            <a href="#kod" className="pill-btn pill-btn--caps">{home.code.cta}</a>
          </div>
        </div>
      </section>

      {/* úvodní video */}
      <section className="introvid wrap">
        <SectionTitle>Co je Kód Vědomí</SectionTitle>
        <p className="introvid__lead reveal">Sonia Edde Arael o sobě, o svém druhém já a o tom, proč vzniká Kód Vědomí.</p>
        <Welcome src="kv-intro.mp4" poster="kv-intro-poster.webp" label="Přehrát úvodní video (5 min)" className="introvid__card" />
      </section>

      <CardOfDay />

      {/* jak funguje */}
      <section className="how wrap">
        <SectionTitle>{home.howTitle}</SectionTitle>
        <p className="how__lead">{home.howLead}</p>
        <div className="how__grid">
          <article className="card how__card reveal">
            <span className="pill-btn pill-btn--caps pill-btn--title pill-btn--static">{home.hero.pill}</span>
            <p className="how__kicker">{home.hero.kicker}</p>
            <p>{home.hero.text}</p>
            <p className="b">{home.hero.listTitle}</p>
            <ul>{home.hero.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            <p>{home.hero.after}</p>
            <p className="b">{home.hero.outro}</p>
            <a href={links.herohero} target="_blank" rel="noopener" className="pill-btn how__cta">{home.hero.cta} <Line.out /></a>
          </article>
          <article className="card how__card reveal">
            <span className="pill-btn pill-btn--caps pill-btn--title pill-btn--static">{home.community.pill}</span>
            <p className="how__kicker">{home.community.kicker}</p>
            {home.community.text.map((t, i) => <p key={i}>{t}</p>)}
            <p className="b">{home.community.principle}</p>
            <p>{home.community.after}</p>
            <figure className="how__img"><img src={m('community.webp')} alt="Společné setkání komunity" loading="lazy" /></figure>
            <a href="#komunita" className="pill-btn how__cta">{home.community.cta} <Line.arrow /></a>
          </article>
        </div>
      </section>

      {/* koučink */}
      <section className="coach wrap">
        <figure className="coach__img photo photo--frame reveal"><img src={m('coach.webp')} alt="Sonia při koučinku" loading="lazy" /></figure>
        <div className="coach__copy reveal">
          <h2 className="serif-title">{home.coach.title[0]} <span>{home.coach.title[1]}</span></h2>
          <LotusRule />
          {home.coach.text.map((t, i) => <Html key={i} html={t} />)}
          <a href="#eshop-koucink" className="pill-btn pill-btn--caps pill-btn--title">{home.coach.cta}</a>
        </div>
      </section>

      {/* z blogu */}
      <section className="homeblog wrap">
        <div className="stitle"><span /><h2 className="gold-caps">Z blogu</h2><span /></div>
        <p className="how__lead">Novinky, inspirace a dění v Kódu Vědomí.</p>
        <div className="posts">
          {(() => { const f = featuredPost(); return [f, ...visiblePosts().filter(x => x !== f)].filter(Boolean).slice(0, 3); })().map(p => (
            <a key={p.title} href={`#blog-${postSlug(p)}`} className="card post post--link reveal">
              <div className="post__img"><img src={img(p.img)} alt="" loading="lazy" /></div>
              <div className="post__copy"><span className="tag">{p.tag}</span><h3>{p.title}</h3><p>{p.text}</p></div>
            </a>
          ))}
        </div>
        <p className="center homeblog__more"><a href="#blog" className="pill-btn pill-btn--caps">Všechny články</a></p>
      </section>

      {/* nástroje */}
      <section className="tools">
        <div className="tools__band">
          <div className="tools__inner wrap">
            <h2>{home.tools.title}</h2>
            <p>{home.tools.text}</p>
            <a href="#eshop" className="pill-btn pill-btn--caps">{home.tools.cta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
