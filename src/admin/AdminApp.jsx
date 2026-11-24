import { useEffect, useMemo, useState } from 'react';
import './admin.css';
import { img, m } from '../content.js';
import { DEFAULTS, slugify } from '../lib/store.js';
import { Field, Fields } from './fields.jsx';
import * as S from './schemas.js';
import * as B from './backend.js';

/* ---------- navigace ---------- */
const NAV = [
  { g: 'Obsah', items: [
    { id: 'blog', label: 'Blog', icon: '✎', keys: ['blog'] },
    { id: 'shop', label: 'E-shop a ceník', icon: '◈', keys: ['shop'] },
    { id: 'checkout', label: 'Doprava a košík', icon: '⇄', keys: ['checkout'] }
  ] },
  { g: 'Stránky', items: [
    { id: 'home', label: 'Úvodní stránka', icon: '⌂', keys: ['home'], fields: S.homeFields },
    { id: 'about', label: 'O mně', icon: '❀', keys: ['about'], fields: S.aboutFields },
    { id: 'community', label: 'Komunita', icon: '◎', keys: ['community'], fields: S.communityFields },
    { id: 'sonia', label: 'Sonia Edde', icon: '♫', keys: ['sonia'], fields: S.soniaFields },
    { id: 'lifePath', label: 'Kód života – čísla', icon: '33', keys: ['lifePath'], map: S.lifePathFields[0], lead: 'Texty, které se zobrazí po vyplnění okna „Kód tvého života“.' },
    { id: 'arcana', label: 'Karta dne – 22 karet', icon: '✦', keys: ['arcana'], map: S.arcanaFields[0], lead: 'Názvy a výklady karet pro hru „Jaký máš dnes den?“.' }
  ] },
  { g: 'Nastavení', items: [
    { id: 'contact', label: 'Kontakt, firma a sítě', icon: '@', keys: ['brand', 'links'] },
    { id: 'seo', label: 'Vyhledávače (SEO)', icon: '⌕', keys: ['seo'], fields: S.seoFields },
    { id: 'legal', label: 'Obchodní podmínky a GDPR', icon: '§', keys: ['legal'], fields: S.legalFields },
    { id: 'security', label: 'Zabezpečení', icon: '⛨', ops: 'security' }
  ] },
  { g: 'Provoz', items: [
    { id: 'orders', label: 'Objednávky', icon: '▤', ops: 'orders' },
    { id: 'messages', label: 'Zprávy a poptávky', icon: '✉', ops: 'messages' },
    { id: 'subscribers', label: 'Odběratelé a Kód života', icon: '♡', ops: 'subscribers' },
    { id: 'admins', label: 'Správci', icon: '⚿', ops: 'admins' }
  ] }
];
const ALL = NAV.flatMap(g => g.items);

/* ---------- přihlášení ---------- */
function Login({ onIn }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async e => {
    e.preventDefault(); setBusy(true); setErr('');
    try { await B.signIn(email, pw); onIn(); } catch (x) { setErr(x.message); }
    setBusy(false);
  };
  return (
    <div className="adm-login">
      <form className="adm-card adm-login__card" onSubmit={submit}>
        <img src={m('logo-sm.webp')} alt="" />
        <h1>Administrace</h1>
        <p className="adm-help">Kód Vědomí</p>
        <label className="adm-label" htmlFor="l-email">E-mail</label>
        <input id="l-email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="adm-label" htmlFor="l-pw">Heslo</label>
        <input id="l-pw" type="password" autoComplete="current-password" value={pw} onChange={e => setPw(e.target.value)} required />
        {err && <p className="adm-err">{err}</p>}
        <button className="adm-btn adm-btn--main" disabled={busy}>{busy ? 'Přihlašuji…' : 'Přihlásit se'}</button>
        <button type="button" className="adm-link" onClick={async () => { if (!email) return setErr('Nejdřív vyplň e-mail.'); await B.resetPassword(email).catch(() => {}); setSent(true); }}>Zapomenuté heslo</button>
        {sent && <p className="adm-help">Pokud je e-mail mezi správci, přijde na něj odkaz pro nové heslo.</p>}
      </form>
    </div>
  );
}

function CodeStep({ onOk, onCancel }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  return (
    <div className="adm-login">
      <form className="adm-card adm-login__card" onSubmit={async e => { e.preventDefault(); try { await B.mfaVerify(code); onOk(); } catch (x) { setErr(x.message); } }}>
        <img src={m('logo-sm.webp')} alt="" />
        <h1>Ověření</h1>
        <p className="adm-help">Opiš 6místný kód z ověřovací aplikace v mobilu.</p>
        <input id="l-code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={code} onChange={e => setCode(e.target.value)} autoFocus required />
        {err && <p className="adm-err">{err}</p>}
        <button className="adm-btn adm-btn--main">Ověřit</button>
        <button type="button" className="adm-link" onClick={onCancel}>Přihlásit se jiným účtem</button>
      </form>
    </div>
  );
}

function Security({ user }) {
  const [st, setSt] = useState(null);
  const [enr, setEnr] = useState(null);
  const [code, setCode] = useState('');
  const [pw, setPw] = useState({ a: '', b: '' });
  const [msg, setMsg] = useState('');
  const load = () => B.mfaState().then(setSt).catch(() => setSt({}));
  useEffect(() => { load(); }, []);
  const strong = p => p.length >= 12 && /[a-zá-ž]/.test(p) && /[A-ZÁ-Ž]/.test(p) && /\d/.test(p);
  const CHECK = [
    ['Přihlášení', 'Jen správci s vlastním e-mailem a heslem. Po 30 minutách nečinnosti se administrace sama odhlásí.'],
    ['Dvoufázové ověření', 'Kromě hesla i kód z aplikace v mobilu. Bez telefonu se do administrace nikdo nedostane, ani s ukradeným heslem.'],
    ['Databáze', 'Návštěvníci smějí obsah jen číst a formuláře jen odeslat. Měnit obsah, číst objednávky a zprávy smějí jen přihlášení správci (pravidla přímo v databázi).'],
    ['Historie změn', 'Každá uložená změna obsahu se zálohuje i s tím, kdo ji udělal. Starší verzi jde kdykoli obnovit tlačítkem Historie.'],
    ['Obsah webu', 'Texty z administrace se před zobrazením čistí – nejde do nich vložit skript ani cizí rámeček. Odkazy jen https, e-mail a telefon.'],
    ['Formuláře', 'Ochrana proti robotům (skryté pole a kontrola rychlosti vyplnění), omezení délky textů.'],
    ['Hosting', 'Vynucené HTTPS, bezpečnostní hlavičky (zákaz vkládání webu do cizích stránek, povolené zdroje skriptů), skryté systémové soubory.'],
    ['Platby', 'Kartu zadává zákazník jen u platební brány, k číslům karet se web nikdy nedostane.']
  ];
  if (B.isDemo()) return <div className="adm-stack"><div className="adm-card"><h3>Jak je web chráněný</h3><ul className="adm-check">{CHECK.map(([a, b]) => <li key={a}><b>{a}</b><span>{b}</span></li>)}</ul></div><div className="adm-card adm-empty"><p className="adm-note">Nastavení hesla a dvoufázového ověření bude dostupné po připojení databáze.</p></div></div>;
  return (
    <div className="adm-stack">
      <section className="adm-card">
        <h3>Dvoufázové ověření</h3>
        {st?.factors?.length ? (
          <div className="adm-stack">
            <p className="adm-ok">✓ Zapnuto. Při přihlášení chceme i kód z mobilu.</p>
            <button className="adm-btn adm-btn--ghost" onClick={async () => { if (confirm('Opravdu vypnout dvoufázové ověření? Účet pak chrání jen heslo.')) { await B.mfaRemove(st.factors[0].id); load(); } }}>Vypnout</button>
          </div>
        ) : enr ? (
          <form className="adm-stack" onSubmit={async e => { e.preventDefault(); try { await B.mfaConfirm(enr.id, code); setEnr(null); setCode(''); load(); setMsg('Dvoufázové ověření je zapnuté.'); } catch (x) { setMsg(x.message); } }}>
            <p>1. Do mobilu si nainstaluj aplikaci <b>Google Authenticator</b> nebo <b>Microsoft Authenticator</b>.<br />2. V ní naskenuj tento QR kód.<br />3. Opiš sem 6místný kód, který aplikace ukáže.</p>
            <img className="adm-qr" src={enr.qr} alt="QR kód pro ověřovací aplikaci" />
            <p className="adm-help">Nejde naskenovat? Zadej ručně klíč: <code>{enr.secret}</code></p>
            <div className="adm-row"><input inputMode="numeric" autoComplete="one-time-code" placeholder="123456" value={code} onChange={e => setCode(e.target.value)} required /><button className="adm-btn">Zapnout</button></div>
          </form>
        ) : (
          <div className="adm-stack">
            <p>Doporučujeme zapnout oběma správcům. I kdyby někdo získal heslo, bez tvého mobilu se nepřihlásí.</p>
            <button className="adm-btn adm-btn--main" onClick={async () => { try { setEnr(await B.mfaEnroll()); } catch (x) { setMsg(x.message); } }}>Zapnout dvoufázové ověření</button>
          </div>
        )}
      </section>
      <section className="adm-card">
        <h3>Změna hesla</h3>
        <form className="adm-fields" onSubmit={async e => { e.preventDefault(); if (pw.a !== pw.b) return setMsg('Hesla se neshodují.'); if (!strong(pw.a)) return setMsg('Heslo musí mít aspoň 12 znaků, velké a malé písmeno a číslici.'); try { await B.updatePassword(pw.a); setPw({ a: '', b: '' }); setMsg('Heslo změněno.'); } catch (x) { setMsg(x.message); } }}>
          <div className="adm-half"><label className="adm-label">Nové heslo</label><input type="password" autoComplete="new-password" value={pw.a} onChange={e => setPw({ ...pw, a: e.target.value })} /></div>
          <div className="adm-half"><label className="adm-label">Znovu pro kontrolu</label><input type="password" autoComplete="new-password" value={pw.b} onChange={e => setPw({ ...pw, b: e.target.value })} /></div>
          <p className="adm-help adm-full">Aspoň 12 znaků, velké i malé písmeno a číslice. Nepoužívej heslo z jiných služeb.</p>
          <div className="adm-full"><button className="adm-btn">Změnit heslo</button></div>
        </form>
      </section>
      <section className="adm-card">
        <h3>Přihlášená zařízení</h3>
        <p>Ztratila jsi telefon nebo ses přihlásila na cizím počítači? Odhlas se všude najednou.</p>
        <button className="adm-btn adm-btn--ghost" onClick={async () => { if (confirm('Odhlásit ze všech zařízení včetně tohoto?')) { await B.signOut(true); location.reload(); } }}>Odhlásit všude</button>
      </section>
      {msg && <p className="adm-note">{msg}</p>}
      <section className="adm-card"><h3>Jak je web chráněný</h3><ul className="adm-check">{CHECK.map(([a, b]) => <li key={a}><b>{a}</b><span>{b}</span></li>)}</ul><p className="adm-help">Přihlášen(a): {user.email}</p></section>
    </div>
  );
}

function History({ secKey, onRestore, onClose }) {
  const [rows, setRows] = useState(undefined);
  const [err, setErr] = useState('');
  useEffect(() => { B.listHistory(secKey).then(setRows).catch(x => setErr(x.message)); }, [secKey]);
  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Historie změn">
      <div className="adm-card adm-modal__box">
        <div className="adm-row adm-row--between"><h3>Historie změn</h3><button className="adm-btn adm-btn--ghost" onClick={onClose}>Zavřít</button></div>
        {B.isDemo() ? <p className="adm-note">Historie se začne ukládat po připojení databáze. Každá uložená verze tu pak bude i s tím, kdo ji uložil.</p>
          : err ? <p className="adm-err">{err}</p> : !rows ? <p className="adm-help">Načítám…</p> : !rows.length ? <p className="adm-help">Zatím žádné starší verze.</p> : (
            <div className="adm-table">
              {rows.map(r => (
                <div key={r.id} className="adm-trow">
                  <span className="adm-trow__main"><span><b>{new Date(r.changed_at).toLocaleString('cs-CZ')}</b><em>{r.changed_by || '—'}</em></span></span>
                  <button className="adm-btn adm-btn--ghost" onClick={async () => { onRestore(await B.getHistory(r.id)); onClose(); }}>Obnovit tuto verzi</button>
                </div>
              ))}
            </div>
          )}
        <p className="adm-help">Obnovená verze se načte do editoru. Na web se dostane až po kliknutí na Uložit.</p>
      </div>
    </div>
  );
}

function RecoveryStep({ onDone }) {
  const [pw, setPw] = useState({ a: '', b: '' });
  const [err, setErr] = useState('');
  const strong = p => p.length >= 12 && /[a-zá-ž]/.test(p) && /[A-ZÁ-Ž]/.test(p) && /\d/.test(p);
  return (
    <div className="adm-login">
      <form className="adm-card adm-login__card" onSubmit={async e => {
        e.preventDefault();
        if (pw.a !== pw.b) return setErr('Hesla se neshodují.');
        if (!strong(pw.a)) return setErr('Heslo musí mít aspoň 12 znaků, velké i malé písmeno a číslici.');
        try { await B.updatePassword(pw.a); onDone(); } catch (x) { setErr(x.message); }
      }}>
        <img src={m('logo-sm.webp')} alt="" />
        <h1>Nové heslo</h1>
        <p className="adm-help">Nastav si nové heslo do administrace.</p>
        <label className="adm-label" htmlFor="r-a">Nové heslo</label>
        <input id="r-a" type="password" autoComplete="new-password" value={pw.a} onChange={e => setPw({ ...pw, a: e.target.value })} required />
        <label className="adm-label" htmlFor="r-b">Znovu pro kontrolu</label>
        <input id="r-b" type="password" autoComplete="new-password" value={pw.b} onChange={e => setPw({ ...pw, b: e.target.value })} required />
        <p className="adm-help">Aspoň 12 znaků, velké i malé písmeno a číslice.</p>
        {err && <p className="adm-err">{err}</p>}
        <button className="adm-btn adm-btn--main">Uložit heslo</button>
      </form>
    </div>
  );
}

/* ---------- blog ---------- */
function BlogEditor({ value, onChange }) {
  const [edit, setEdit] = useState(null);
  const [q, setQ] = useState('');
  const posts = value.posts || [];
  const setPosts = p => onChange({ ...value, posts: p });
  const tags = (value.filters || []).filter(t => t !== 'Vše');

  if (edit != null && posts[edit]) {
    const p = posts[edit];
    const set = v => {
      let next = posts.map((x, i) => (i === edit ? v : x));
      if (v.featured && !p.featured) next = next.map((x, i) => (i === edit ? x : { ...x, featured: false }));
      setPosts(next);
    };
    return (
      <div>
        <div className="adm-row adm-row--between adm-sticky">
          <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setEdit(null)}>← Všechny články</button>
          <a className="adm-btn adm-btn--ghost" href={`./#blog-${p.slug || slugify(p.title)}`} target="_blank" rel="noopener">Náhled článku ↗</a>
        </div>
        <div className="adm-card"><Fields fields={S.postFields(tags)} value={p} onChange={set} /></div>
      </div>
    );
  }

  const list = posts.map((p, i) => ({ p, i })).filter(({ p }) => (p.title + p.tag).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (b.p.date || '').localeCompare(a.p.date || ''));
  return (
    <div className="adm-stack">
      <div className="adm-row adm-row--between">
        <input className="adm-search" placeholder="Hledat článek…" value={q} onChange={e => setQ(e.target.value)} />
        <button type="button" className="adm-btn adm-btn--main" onClick={() => {
          setPosts([{ title: 'Nový článek', tag: tags[0] || '', date: new Date().toISOString().slice(0, 10), img: '', text: '', body: [], draft: true }, ...posts]);
          setEdit(0);
        }}>+ Nový článek</button>
      </div>
      <div className="adm-table">
        {list.map(({ p, i }) => (
          <div key={i} className="adm-trow">
            <button type="button" className="adm-trow__main" onClick={() => setEdit(i)}>
              <span className="adm-thumb">{p.img && <img src={img(p.img)} alt="" />}</span>
              <span><b>{p.title || '(bez názvu)'}</b><em>{[p.tag, p.date && new Date(p.date).toLocaleDateString('cs-CZ')].filter(Boolean).join(' · ')}</em></span>
            </button>
            <span className="adm-trow__badges">
              {p.featured && <em className="adm-badge adm-badge--gold">Hlavní</em>}
              {p.draft && <em className="adm-badge">Koncept</em>}
              {p.demo && <em className="adm-badge">Ukázka</em>}
            </span>
            <span className="adm-tools">
              <button type="button" onClick={() => setEdit(i)} title="Upravit">✎</button>
              <button type="button" onClick={() => setPosts([...posts.slice(0, i + 1), { ...structuredClone(p), title: p.title + ' (kopie)', slug: '', featured: false, draft: true }, ...posts.slice(i + 1)])} title="Duplikovat">⧉</button>
              <button type="button" className="adm-danger" onClick={() => { if (confirm(`Smazat článek „${p.title}“?`)) setPosts(posts.filter((_, j) => j !== i)); }} title="Smazat">✕</button>
            </span>
          </div>
        ))}
        {!list.length && <p className="adm-help">Žádný článek.</p>}
      </div>
      <details className="adm-card">
        <summary>Nastavení blogu (podnadpis, rubriky)</summary>
        <Fields fields={S.blogSettings} value={value} onChange={onChange} />
      </details>
    </div>
  );
}

/* ---------- e-shop ---------- */
const plural = n => `${n} ${n === 1 ? 'položka' : n >= 2 && n <= 4 ? 'položky' : 'položek'}`;
function ShopEditor({ value, onChange }) {
  const [sel, setSel] = useState(null);
  const cats = value.categories || [];
  const detail = value.detail || {};
  if (sel != null && cats[sel]) {
    const c = cats[sel];
    const d = detail[c.id] || { title: c.title, intro: '', groups: [] };
    const setCat = v => {
      const next = { ...value, categories: cats.map((x, i) => (i === sel ? v : x)) };
      if (v.id !== c.id) { const det = { ...detail }; det[v.id] = det[c.id] || d; delete det[c.id]; next.detail = det; }
      onChange(next);
    };
    return (
      <div className="adm-stack">
        <div className="adm-row adm-row--between adm-sticky">
          <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setSel(null)}>← Všechny dlaždice</button>
          <a className="adm-btn adm-btn--ghost" href={`./#eshop-${c.id}`} target="_blank" rel="noopener">Náhled ↗</a>
        </div>
        <section className="adm-card"><h3>Dlaždice v přehledu e-shopu</h3><Fields fields={S.catFields} value={c} onChange={setCat} /></section>
        <section className="adm-card"><h3>Stránka „{c.title}“ – texty, ceník a produkty</h3>
          <Fields fields={S.detailFields} value={d} onChange={v => onChange({ ...value, detail: { ...detail, [c.id]: v } })} />
        </section>
      </div>
    );
  }
  return (
    <div className="adm-stack">
      <p className="adm-help">Dlaždice se na webu zobrazují v tomto pořadí (3 vedle sebe). Kliknutím otevřeš texty, ceník a produkty dané sekce.</p>
      <div className="adm-tiles">
        {cats.map((c, i) => (
          <div key={c.id + i} className="adm-tile">
            <button type="button" onClick={() => setSel(i)}>
              <img src={img(c.img)} alt="" />
              <b>{c.title}</b>
              <em>{c.soon ? 'Již brzy' : plural((detail[c.id]?.groups || []).reduce((a, g) => a + (g.items?.length || 0), 0) + (detail[c.id]?.products?.length || 0))}</em>
            </button>
            <span className="adm-tools">
              <button type="button" disabled={!i} onClick={() => { const a = [...cats]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; onChange({ ...value, categories: a }); }}>←</button>
              <button type="button" disabled={i === cats.length - 1} onClick={() => { const a = [...cats]; [a[i + 1], a[i]] = [a[i], a[i + 1]]; onChange({ ...value, categories: a }); }}>→</button>
              <button type="button" className="adm-danger" onClick={() => { if (confirm(`Smazat celou sekci „${c.title}“ včetně ceníku?`)) { const det = { ...detail }; delete det[c.id]; onChange({ ...value, categories: cats.filter((_, j) => j !== i), detail: det }); } }}>✕</button>
            </span>
          </div>
        ))}
        <button type="button" className="adm-tile adm-tile--add" onClick={() => {
          const id = 'nova-sekce-' + (cats.length + 1);
          onChange({ ...value, categories: [...cats, { id, title: 'Nová sekce', text: '', img: '', cta: 'Prohlédnout' }], detail: { ...detail, [id]: { title: 'Nová sekce', intro: '', groups: [], products: [] } } });
          setSel(cats.length);
        }}>+ Přidat sekci</button>
      </div>
      <details className="adm-card"><summary>Texty přehledu e-shopu</summary><Fields fields={S.shopSettings} value={value} onChange={onChange} /></details>
    </div>
  );
}

/* ---------- provoz (vyžaduje databázi) ---------- */
const OPS = {
  orders: { title: 'Objednávky', text: 'Objednávky z košíku se zde objeví se stavem (nová, zaplaceno, odesláno), po zapojení platební brány i s informací o platbě a fakturou.' },
  messages: { title: 'Zprávy a poptávky', text: 'Zprávy z kontaktního formuláře a poptávky DJ/moderování se budou ukládat sem a zároveň chodit e-mailem.' },
  subscribers: { title: 'Odběratelé a Kód života', text: 'Kdo se přihlásil k newsletteru nebo vyplnil „Kód tvého života“. Seznam půjde stáhnout do Excelu (CSV).' },
  admins: { title: 'Správci', text: 'Kdo se smí přihlásit do administrace (Sonia a Nela).' }
};
const STATUS = ['nová', 'zaplaceno', 'odesláno', 'vyřízeno', 'zrušeno'];
const csv = rows => {
  const keys = [...new Set(rows.flatMap(r => Object.keys(r)))];
  const esc = v => `"${String(typeof v === 'object' && v ? JSON.stringify(v) : v ?? '').replace(/"/g, '""')}"`;
  const blob = new Blob(['﻿' + [keys.join(';'), ...rows.map(r => keys.map(k => esc(r[k])).join(';'))].join('\n')], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'export.csv'; a.click();
};

function Ops({ kind, user }) {
  const [rows, setRows] = useState(undefined);
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const table = kind === 'admins' ? 'admins' : kind;
  const load = () => (kind === 'admins' ? B.listAdmins() : B.listRows(table)).then(setRows).catch(x => setErr(x.message));
  useEffect(() => { load(); }, [kind]);
  const info = OPS[kind];
  if (B.isDemo()) return (
    <div className="adm-card adm-empty">
      <h3>{info.title}</h3><p>{info.text}</p>
      <p className="adm-note">Tato část začne fungovat po připojení databáze (Supabase). Zatím chodí objednávky a zprávy e-mailem na adresu z nastavení.</p>
    </div>
  );
  if (err) return <p className="adm-err">{err}</p>;
  if (!rows) return <p className="adm-help">Načítám…</p>;
  if (kind === 'admins') return (
    <div className="adm-card adm-stack">
      <p className="adm-help">{info.text} Nový správce se pak přihlásí přes „Zapomenuté heslo“ a nastaví si vlastní.</p>
      {rows.map(r => (
        <div key={r.email} className="adm-row adm-row--between">
          <span><b>{r.name || r.email}</b>{r.name && <em className="adm-help"> {r.email}</em>}</span>
          {r.protected ? <em className="adm-badge adm-badge--gold" title="Technická správa webu – nelze odebrat">Technická správa</em>
            : r.email === user?.email ? <em className="adm-badge">Ty</em>
            : <button className="adm-btn adm-btn--ghost" onClick={async () => { if (confirm('Odebrat správce?')) { await B.removeAdmin(r.email).catch(x => setErr(x.message)); load(); } }}>Odebrat</button>}
        </div>
      ))}
      <form className="adm-row" onSubmit={async e => { e.preventDefault(); await B.addAdmin(email).catch(x => setErr(x.message)); setEmail(''); load(); }}>
        <input type="email" required placeholder="e-mail nového správce" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="adm-btn">Přidat</button>
      </form>
    </div>
  );
  return (
    <div className="adm-stack">
      <div className="adm-row adm-row--between"><p className="adm-help">{rows.length} záznamů</p>{!!rows.length && <button className="adm-btn adm-btn--ghost" onClick={() => csv(rows)}>Stáhnout CSV</button>}</div>
      {!rows.length && <div className="adm-card adm-empty"><p>Zatím tu nic není.</p></div>}
      {rows.map(r => (
        <details key={r.id} className="adm-card adm-rec">
          <summary>
            <b>{r.name || r.email}</b>
            <em>{new Date(r.created_at).toLocaleString('cs-CZ')}</em>
            {r.total != null && <span>{Number(r.total).toLocaleString('cs-CZ')} Kč</span>}
            {r.status && <em className="adm-badge">{r.status}</em>}
            {r.topic && <em className="adm-badge">{r.topic}</em>}
          </summary>
          <pre>{JSON.stringify(Object.fromEntries(Object.entries(r).filter(([k]) => !['id'].includes(k))), null, 2)}</pre>
          {kind === 'orders' && (
            <div className="adm-row">{STATUS.map(s => <button key={s} className={`adm-btn${r.status === s ? '' : ' adm-btn--ghost'}`} onClick={async () => { await B.updateRow('orders', r.id, { status: s }); load(); }}>{s}</button>)}</div>
          )}
        </details>
      ))}
    </div>
  );
}

/* ---------- aplikace ---------- */
const readHashSection = () => (location.hash.startsWith('#admin') ? location.hash.replace(/^#admin-?/, '') : '') || 'blog';
const RECOVERY = /type=recovery/.test(location.hash);
const LINK_ERROR = /error_description=([^&]+)/.exec(location.hash);

export default function AdminApp() {
  const [user, setUser] = useState(undefined);
  const [saved, setSaved] = useState(null);
  const [work, setWork] = useState(null);
  const [sec, setSec] = useState(readHashSection);
  const [msg, setMsg] = useState(null);
  const [menu, setMenu] = useState(false);
  const [recovery, setRecovery] = useState(RECOVERY);
  const [busy, setBusy] = useState(false);

  const check = () => B.getUser().then(setUser).catch(() => setUser(null));
  const [hist, setHist] = useState(false);
  // automatické odhlášení po 30 minutách nečinnosti
  useEffect(() => {
    if (!user || user.demo) return;
    let t;
    const arm = () => { clearTimeout(t); t = setTimeout(async () => { await B.signOut(); alert('Z bezpečnostních důvodů jsme tě po 30 minutách nečinnosti odhlásili.'); location.reload(); }, 30 * 60 * 1000); };
    const ev = ['pointerdown', 'keydown', 'scroll'];
    ev.forEach(e => addEventListener(e, arm, { passive: true })); arm();
    return () => { clearTimeout(t); ev.forEach(e => removeEventListener(e, arm)); };
  }, [user]);
  useEffect(() => {
    // počkat, až knihovna přečte přihlašovací údaje z odkazu v e-mailu, pak adresu uklidit
    const t = setTimeout(() => { check().then(() => { if (/access_token|error_description/.test(location.hash)) history.replaceState(null, '', location.pathname + '#admin'); }); }, 0);
    document.title = 'Administrace · Kód Vědomí';
    if (LINK_ERROR) setMsg({ err: true, t: 'Odkaz z e-mailu už neplatí. Nech si poslat nový přes „Zapomenuté heslo“.' });
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!user || user.notAdmin) return;
    B.loadAll().then(d => { setSaved(d); setWork(structuredClone(d)); }).catch(x => setMsg({ err: true, t: 'Obsah se nepodařilo načíst: ' + x.message }));
  }, [user]);
  useEffect(() => { const on = () => { if (location.hash.startsWith('#admin')) setSec(readHashSection()); else location.reload(); }; addEventListener('hashchange', on); return () => removeEventListener('hashchange', on); }, []);

  const dirty = useMemo(() => (work && saved ? Object.keys(work).filter(k => JSON.stringify(work[k]) !== JSON.stringify(saved[k])) : []), [work, saved]);
  useEffect(() => {
    const warn = e => { if (dirty.length) { e.preventDefault(); e.returnValue = ''; } };
    addEventListener('beforeunload', warn); return () => removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async () => {
    if (!dirty.length) return;
    const bad = (work.blog?.posts || []).find(p => !p.title?.trim());
    if (bad) return setMsg({ err: true, t: 'Každý článek musí mít název.' });
    setBusy(true);
    try {
      await B.saveSections(Object.fromEntries(dirty.map(k => [k, work[k]])));
      setSaved(structuredClone(work));
      setMsg({ t: B.isDemo() ? 'Uloženo. V demo režimu se změny projeví jen v tomto prohlížeči.' : 'Uloženo a zveřejněno na webu.' });
    } catch (x) { setMsg({ err: true, t: 'Uložení se nepovedlo: ' + x.message }); }
    setBusy(false);
  };
  useEffect(() => { const k = e => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); });
  useEffect(() => { if (msg && !msg.err) { const t = setTimeout(() => setMsg(null), 4000); return () => clearTimeout(t); } }, [msg]);

  if (user === undefined) return <div className="adm-loading">Načítám…</div>;
  if (!user) return <Login onIn={check} />;
  if (recovery && !user.demo) return <RecoveryStep onDone={() => { setRecovery(false); check(); setMsg({ t: 'Heslo je změněné.' }); }} />;
  if (user.needCode) return <CodeStep onOk={check} onCancel={() => B.signOut().then(check)} />;
  if (user.notAdmin) return <div className="adm-login"><div className="adm-card adm-login__card"><h1>Bez oprávnění</h1><p>Účet {user.email} není mezi správci.</p><button className="adm-btn" onClick={() => B.signOut().then(check)}>Odhlásit</button></div></div>;
  if (!work) return <div className="adm-loading">{msg?.t || 'Načítám obsah…'}</div>;

  const item = ALL.find(x => x.id === sec) || ALL[0];
  const set = (key, v) => setWork(w => ({ ...w, [key]: v }));
  const secDirty = (item.keys || []).some(k => dirty.includes(k));
  const reset = async () => {
    if (!confirm('Vrátit tuto sekci do původní podoby z doby spuštění webu? Tvoje úpravy v ní se smažou.')) return;
    for (const k of item.keys) { await B.resetSection(k); }
    const d = { ...saved }; item.keys.forEach(k => { d[k] = structuredClone(DEFAULTS[k]); });
    setSaved(d); setWork(w => ({ ...w, ...Object.fromEntries(item.keys.map(k => [k, structuredClone(DEFAULTS[k])])) }));
    setMsg({ t: 'Sekce vrácena do výchozí podoby.' });
  };

  let body;
  if (item.ops === 'security') body = <Security user={user} />;
  else if (item.ops) body = <Ops kind={item.ops} user={user} />;
  else if (item.id === 'blog') body = <BlogEditor value={work.blog} onChange={v => set('blog', v)} />;
  else if (item.id === 'shop') body = <ShopEditor value={work.shop} onChange={v => set('shop', v)} />;
  else if (item.id === 'checkout') body = <div className="adm-card"><Fields fields={S.checkoutFields} value={work.checkout} onChange={v => set('checkout', v)} /><p className="adm-note">Platební bránu a automatické faktury zapojíme, až Sonia dodá přístupy. Ceny jsou včetně DPH.</p></div>;
  else if (item.id === 'contact') body = (
    <div className="adm-stack">
      <section className="adm-card"><h3>Kontakt a firma</h3><Fields fields={S.brandFields} value={work.brand} onChange={v => set('brand', v)} /></section>
      <section className="adm-card"><h3>Sociální sítě a odkazy</h3><Fields fields={S.linkFields} value={work.links} onChange={v => set('links', v)} /></section>
    </div>
  );
  else if (item.map) body = <div className="adm-card">{item.lead && <p className="adm-help">{item.lead}</p>}<Field f={item.map} value={work[item.keys[0]]} onChange={v => set(item.keys[0], v)} /></div>;
  else body = <div className="adm-card"><Fields fields={item.fields} value={work[item.keys[0]]} onChange={v => set(item.keys[0], v)} /></div>;

  const go = id => { location.hash = 'admin-' + id; setMenu(false); window.scrollTo(0, 0); };

  return (
    <div className="adm">
      <aside className={`adm-side${menu ? ' is-open' : ''}`}>
        <a className="adm-brand" href="./#domu" target="_blank" rel="noopener"><img src={m('logo-sm.webp')} alt="" /><span>Kód Vědomí<em>administrace</em></span></a>
        <nav>
          {NAV.map(g => (
            <div key={g.g} className="adm-nav">
              <p>{g.g}</p>
              {g.items.map(x => (
                <button key={x.id} type="button" className={x.id === item.id ? 'is-on' : ''} onClick={() => go(x.id)}>
                  <i>{x.icon}</i>{x.label}{(x.keys || []).some(k => dirty.includes(k)) && <b className="adm-dot" title="Neuložené změny" />}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="adm-side__foot">
          <p>{B.isDemo() ? 'Demo režim' : user.email}</p>
          {!B.isDemo() && <button type="button" className="adm-link" onClick={() => B.signOut().then(check)}>Odhlásit</button>}
        </div>
      </aside>
      {menu && <button className="adm-scrim" aria-label="Zavřít menu" onClick={() => setMenu(false)} />}

      <main className="adm-main">
        <header className="adm-top">
          <button type="button" className="adm-burger" onClick={() => setMenu(true)} aria-label="Menu">☰</button>
          <h1>{item.label}</h1>
          <div className="adm-top__act">
            {!item.ops && <button type="button" className="adm-btn adm-btn--ghost adm-hide-s" onClick={() => setHist(true)} title="Starší verze této sekce">Historie</button>}
            {!item.ops && <button type="button" className="adm-btn adm-btn--ghost adm-hide-s" onClick={reset} title="Vrátit výchozí obsah sekce">Výchozí</button>}
            <a className="adm-btn adm-btn--ghost adm-hide-s" href="./#domu" target="_blank" rel="noopener">Zobrazit web ↗</a>
            <button type="button" className="adm-btn adm-btn--main" onClick={save} disabled={!dirty.length || busy}>{busy ? 'Ukládám…' : dirty.length ? `Uložit změny${secDirty ? '' : ' (jinde)'}` : 'Uloženo ✓'}</button>
          </div>
        </header>
        {B.isDemo() && <p className="adm-banner">Demo režim: změny se ukládají jen v tomto prohlížeči, aby šlo administraci vyzkoušet. Po připojení databáze se budou ukládat přímo na web.</p>}
        {msg && <p className={`adm-msg${msg.err ? ' adm-msg--err' : ''}`} role="status">{msg.t}<button onClick={() => setMsg(null)} aria-label="Zavřít">×</button></p>}
        <div className="adm-body">{body}</div>
        {hist && item.keys && <History secKey={item.keys[item.keys.length > 1 ? 0 : 0]} onClose={() => setHist(false)} onRestore={d => set(item.keys[0], d)} />}
        {B.isDemo() && <p className="adm-foot"><button className="adm-link" onClick={() => B.exportJSON(work)}>Stáhnout zálohu obsahu (JSON)</button></p>}
      </main>
    </div>
  );
}
