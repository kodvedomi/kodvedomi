import { legal, brand } from '../content.js';
import { PageTitle, Html } from '../components/Ornaments.jsx';

const KEYS = { podminky: 'terms', gdpr: 'privacy', reklamace: 'complaints' };

export default function Legal({ page }) {
  const d = legal[KEYS[page]] || {};
  return (
    <section className="wrap">
      <PageTitle title={d.title} lotus={false} />
      <div className="card legal">
        <Html as="div" className="legal__text" html={d.text || ''} />
        <p className="legal__firm">{brand.company?.name} · IČO {brand.company?.ico} · {brand.company?.address} · <a href={`mailto:${brand.email}`}>{brand.email}</a></p>
      </div>
    </section>
  );
}
