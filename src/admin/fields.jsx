// Univerzální editor polí podle schématu. Každé pole: { k, label, type, help, ... }
import { useRef, useState } from 'react';
import { img } from '../content.js';
import { MEDIA } from './media.js';
import { uploadImage } from './backend.js';

export const setIn = (obj, path, value) => {
  if (!path.length) return value;
  const [h, ...rest] = path;
  const base = Array.isArray(obj) ? [...obj] : { ...(obj || {}) };
  base[h] = setIn(base[h], rest, value);
  return base;
};
export const getIn = (obj, path) => path.reduce((o, k) => (o == null ? o : o[k]), obj);

const uid = () => Math.random().toString(36).slice(2, 8);

export function Field({ f, value, onChange }) {
  const id = useRef('f' + uid()).current;
  const label = f.label && <label htmlFor={id} className="adm-label">{f.label}{f.req && ' *'}</label>;
  const help = f.help && <p className="adm-help">{f.help}</p>;
  const wrap = (input, cls = '') => <div className={`adm-field adm-field--${f.type || 'text'} ${cls}`}>{label}{input}{help}</div>;

  switch (f.type) {
    case 'textarea':
    case 'html':
      return wrap(<textarea id={id} rows={f.rows || (f.type === 'html' ? 6 : 3)} value={value ?? ''} onChange={e => onChange(e.target.value)} />);
    case 'number':
      return wrap(<input id={id} type="number" inputMode="decimal" value={value ?? ''} onChange={e => onChange(e.target.value === '' ? null : +e.target.value)} />);
    case 'bool':
      return (
        <div className="adm-field adm-field--bool">
          <label className="adm-switch"><input id={id} type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} /><span />{f.label}</label>
          {help}
        </div>
      );
    case 'select':
      return wrap(
        <select id={id} value={value ?? ''} onChange={e => onChange(e.target.value)}>
          {(typeof f.options === 'function' ? f.options() : f.options).map(o => <option key={o.v ?? o} value={o.v ?? o}>{o.l ?? o}</option>)}
        </select>
      );
    case 'date':
      return wrap(<input id={id} type="date" value={value ?? ''} onChange={e => onChange(e.target.value)} />);
    case 'image':
      return wrap(<ImageInput id={id} value={value} onChange={onChange} />);
    case 'tags':
      return wrap(<TagsInput id={id} value={value || []} onChange={onChange} placeholder={f.placeholder} />);
    case 'strings':
      return <StringList f={f} value={value || []} onChange={onChange} />;
    case 'list':
      return <ListField f={f} value={value || []} onChange={onChange} />;
    case 'object':
      return (
        <fieldset className="adm-group">
          {f.label && <legend>{f.label}</legend>}
          {help}
          <Fields fields={f.fields} value={value || {}} onChange={onChange} />
        </fieldset>
      );
    case 'map':
      return <MapField f={f} value={value || {}} onChange={onChange} />;
    case 'blocks':
      return <BlocksField f={f} value={value || []} onChange={onChange} />;
    default:
      return wrap(<input id={id} type={f.type === 'email' ? 'email' : f.type === 'url' ? 'url' : 'text'} value={value ?? ''} placeholder={f.placeholder} onChange={e => onChange(e.target.value)} />);
  }
}

export function Fields({ fields, value, onChange }) {
  return (
    <div className="adm-fields">
      {fields.filter(f => !f.when || f.when(value)).map(f => (
        <div key={f.k} className={f.half ? 'adm-half' : 'adm-full'}>
          <Field f={f} value={value?.[f.k]} onChange={v => onChange({ ...value, [f.k]: v })} />
        </div>
      ))}
    </div>
  );
}

const move = (arr, i, d) => { const a = [...arr]; const j = i + d; if (j < 0 || j >= a.length) return a; [a[i], a[j]] = [a[j], a[i]]; return a; };

function ItemTools({ i, n, onMove, onDup, onDel }) {
  return (
    <span className="adm-tools">
      <button type="button" onClick={() => onMove(-1)} disabled={i === 0} title="Posunout nahoru">↑</button>
      <button type="button" onClick={() => onMove(1)} disabled={i === n - 1} title="Posunout dolů">↓</button>
      {onDup && <button type="button" onClick={onDup} title="Duplikovat">⧉</button>}
      <button type="button" className="adm-danger" onClick={() => { if (confirm('Opravdu smazat?')) onDel(); }} title="Smazat">✕</button>
    </span>
  );
}

export function ListField({ f, value, onChange }) {
  const [open, setOpen] = useState(null);
  const summary = it => (f.summary ? f.summary(it) : it?.name || it?.title || it?.label) || '(bez názvu)';
  return (
    <div className="adm-list">
      {f.label && <div className="adm-list__head"><span className="adm-label">{f.label}</span>{f.help && <p className="adm-help">{f.help}</p>}</div>}
      {value.map((it, i) => (
        <div key={i} className={`adm-item${open === i ? ' is-open' : ''}`}>
          <div className="adm-item__bar">
            <button type="button" className="adm-item__toggle" onClick={() => setOpen(open === i ? null : i)}>
              {f.thumb && f.thumb(it) && <img src={img(f.thumb(it))} alt="" />}
              <span>{summary(it)}</span>
              {f.badge && f.badge(it) && <em className="adm-badge">{f.badge(it)}</em>}
            </button>
            <ItemTools i={i} n={value.length} onMove={d => { onChange(move(value, i, d)); setOpen(null); }}
              onDup={() => onChange([...value.slice(0, i + 1), structuredClone(it), ...value.slice(i + 1)])}
              onDel={() => { onChange(value.filter((_, j) => j !== i)); setOpen(null); }} />
          </div>
          {open === i && <div className="adm-item__body"><Fields fields={f.fields} value={it} onChange={v => onChange(value.map((x, j) => (j === i ? v : x)))} /></div>}
        </div>
      ))}
      <button type="button" className="adm-add" onClick={() => { onChange([...value, structuredClone(f.blank || {})]); setOpen(value.length); }}>+ {f.addLabel || 'Přidat položku'}</button>
    </div>
  );
}

function StringList({ f, value, onChange }) {
  return (
    <div className="adm-list adm-strings">
      {f.label && <div className="adm-list__head"><span className="adm-label">{f.label}</span>{f.help && <p className="adm-help">{f.help}</p>}</div>}
      {value.map((t, i) => (
        <div key={i} className="adm-string">
          {f.html || f.long ? <textarea rows={f.rows || 3} value={t} onChange={e => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
            : f.image ? <ImageInput value={t} onChange={v => onChange(value.map((x, j) => (j === i ? v : x)))} />
            : <input value={t} onChange={e => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />}
          <ItemTools i={i} n={value.length} onMove={d => onChange(move(value, i, d))} onDel={() => onChange(value.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className="adm-add" onClick={() => onChange([...value, ''])}>+ {f.addLabel || 'Přidat'}</button>
    </div>
  );
}

function TagsInput({ id, value, onChange, placeholder }) {
  const [t, setT] = useState('');
  const add = () => { const v = t.trim(); if (v && !value.includes(v)) onChange([...value, v]); setT(''); };
  return (
    <div className="adm-tags">
      {value.map(x => <span key={x} className="adm-tag">{x}<button type="button" onClick={() => onChange(value.filter(y => y !== x))} aria-label={`Odebrat ${x}`}>×</button></span>)}
      <input id={id} value={t} placeholder={placeholder || 'Napiš a stiskni Enter'} onChange={e => setT(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }} onBlur={add} />
    </div>
  );
}

function MapField({ f, value, onChange }) {
  const [open, setOpen] = useState(null);
  const keys = f.keys();
  return (
    <div className="adm-list">
      {keys.map(k => (
        <div key={k} className={`adm-item${open === k ? ' is-open' : ''}`}>
          <div className="adm-item__bar">
            <button type="button" className="adm-item__toggle" onClick={() => setOpen(open === k ? null : k)}>
              <b className="adm-num">{k}</b><span>{value[k]?.name || '(bez názvu)'}</span>
            </button>
          </div>
          {open === k && <div className="adm-item__body"><Fields fields={f.fields} value={value[k] || {}} onChange={v => onChange({ ...value, [k]: v })} /></div>}
        </div>
      ))}
    </div>
  );
}

// Obsah článku: odstavce, mezititulky, zvýraznění, obrázky
const BLOCKS = [
  { t: 'p', l: 'Odstavec' },
  { t: 'h', l: 'Mezititulek' },
  { t: 'q', l: 'Zvýraznění / otázka' },
  { t: 'img', l: 'Obrázek' }
];
const typeOf = b => (b.h != null ? 'h' : b.q != null ? 'q' : b.img != null ? 'img' : 'p');

// Vložený text → bloky (prázdný řádek odděluje odstavce, krátký řádek bez tečky = mezititulek)
export const textToBlocks = txt => txt.replace(/\r/g, '').split(/\n\s*\n/).map(x => x.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  .map(x => (x.length < 90 && !/[.!…:;,]$/.test(x) ? { h: x.replace(/\?$/, '?') } : { p: x }));

function BlocksField({ f, value, onChange }) {
  const [paste, setPaste] = useState(null);
  const set = (i, b) => onChange(value.map((x, j) => (j === i ? b : x)));
  const insert = (i, t) => onChange([...value.slice(0, i), { [t]: '' }, ...value.slice(i)]);
  return (
    <div className="adm-blocks">
      <div className="adm-list__head">
        <span className="adm-label">{f.label}</span>
        <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setPaste('')}>Vložit celý text najednou</button>
      </div>
      {paste != null && (
        <div className="adm-paste">
          <p className="adm-help">Vlož text článku (třeba z Wordu nebo PDF). Odstavce odděl prázdným řádkem. Krátké řádky bez tečky se převedou na mezititulky. Vše pak můžeš upravit.</p>
          <textarea rows={10} value={paste} onChange={e => setPaste(e.target.value)} />
          <div className="adm-row">
            <button type="button" className="adm-btn" onClick={() => { onChange([...value, ...textToBlocks(paste)]); setPaste(null); }}>Přidat na konec</button>
            <button type="button" className="adm-btn adm-btn--ghost" onClick={() => { if (!value.length || confirm('Nahradit celý dosavadní text?')) { onChange(textToBlocks(paste)); setPaste(null); } }}>Nahradit celý text</button>
            <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setPaste(null)}>Zrušit</button>
          </div>
        </div>
      )}
      {value.map((b, i) => {
        const t = typeOf(b);
        return (
          <div key={i} className={`adm-block adm-block--${t}`}>
            <div className="adm-block__bar">
              <select value={t} onChange={e => { const v = b[t] ?? ''; set(i, e.target.value === 'img' ? { img: '', caption: '' } : { [e.target.value]: typeof v === 'string' && t !== 'img' ? v : '' }); }}>
                {BLOCKS.map(x => <option key={x.t} value={x.t}>{x.l}</option>)}
              </select>
              <ItemTools i={i} n={value.length} onMove={d => onChange(move(value, i, d))} onDel={() => onChange(value.filter((_, j) => j !== i))} />
            </div>
            {t === 'img' ? (
              <div className="adm-fields">
                <div className="adm-full"><ImageInput value={b.img} onChange={v => set(i, { ...b, img: v })} /></div>
                <div className="adm-full"><input placeholder="Popisek obrázku (nepovinné)" value={b.caption || ''} onChange={e => set(i, { ...b, caption: e.target.value })} /></div>
              </div>
            ) : t === 'h' ? <input value={b.h} onChange={e => set(i, { h: e.target.value })} placeholder="Mezititulek" />
              : <textarea rows={t === 'q' ? 3 : 5} value={b[t]} onChange={e => set(i, { [t]: e.target.value })} />}
            <div className="adm-block__ins">
              {BLOCKS.map(x => <button key={x.t} type="button" onClick={() => insert(i + 1, x.t)}>+ {x.l}</button>)}
            </div>
          </div>
        );
      })}
      {!value.length && (
        <div className="adm-block__ins adm-block__ins--empty">
          {BLOCKS.map(x => <button key={x.t} type="button" onClick={() => insert(0, x.t)}>+ {x.l}</button>)}
        </div>
      )}
    </div>
  );
}

export function ImageInput({ id, value, onChange }) {
  const [lib, setLib] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const file = useRef(null);
  const pick = async e => {
    const fl = e.target.files?.[0];
    e.target.value = '';
    if (!fl) return;
    setBusy(true); setErr('');
    try { onChange(await uploadImage(fl)); } catch (x) { setErr(x.message || 'Nahrání se nepovedlo.'); }
    setBusy(false);
  };
  return (
    <div className="adm-image">
      <div className="adm-image__prev">{value ? <img src={img(value)} alt="" /> : <span>bez obrázku</span>}</div>
      <div className="adm-image__ctrl">
        <div className="adm-row">
          <button type="button" className="adm-btn" onClick={() => file.current.click()} disabled={busy}>{busy ? 'Nahrávám…' : 'Nahrát obrázek'}</button>
          <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setLib(!lib)}>{lib ? 'Zavřít knihovnu' : 'Vybrat z knihovny'}</button>
          {value && <button type="button" className="adm-btn adm-btn--ghost" onClick={() => onChange('')}>Odebrat</button>}
        </div>
        <input ref={file} type="file" accept="image/*" hidden onChange={pick} />
        <input id={id} className="adm-image__name" value={value && value.startsWith('data:') ? '(nahraný obrázek)' : value || ''} readOnly={value?.startsWith('data:')} onChange={e => onChange(e.target.value)} placeholder="název obrázku nebo adresa" />
        {err && <p className="adm-err">{err}</p>}
      </div>
      {lib && (
        <div className="adm-lib">
          {MEDIA.map(n => <button key={n} type="button" className={n === value ? 'is-on' : ''} onClick={() => { onChange(n); setLib(false); }} title={n}><img src={img(n)} alt={n} loading="lazy" /></button>)}
        </div>
      )}
    </div>
  );
}
