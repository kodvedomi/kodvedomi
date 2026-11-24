// Obsah webu: výchozí hodnoty jsou v content.js, administrace ukládá přepisy.
// Přepisy se vkládají přímo do exportovaných objektů, takže stránky nic dalšího řešit nemusí.
import { useSyncExternalStore } from 'react';
import * as C from '../content.js';
import { arcana } from './tarot.js';
import { SUPABASE } from './config.js';
import { safeUrl, clip } from './safe.js';

export const SECTIONS = {
  brand: C.brand, links: C.links, home: C.home, about: C.about, community: C.community,
  blog: C.blog, shop: C.shop, checkout: C.checkout, sonia: C.sonia,
  lifePath: C.lifePath, arcana, seo: C.seo, legal: C.legal
};
export const DEFAULTS = structuredClone(SECTIONS);

const CACHE = 'kv-content-cache';
export const DRAFT = 'kv-admin-demo'; // demo režim administrace (bez Supabase)
export const hasBackend = () => !!(SUPABASE.url && SUPABASE.key);

let version = 0;
const subs = new Set();
const bump = () => { version++; subs.forEach(f => f()); };
export const useContentVersion = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => version);

const replaceInPlace = (target, value) => {
  if (Array.isArray(target)) { target.length = 0; target.push(...value); return; }
  for (const k of Object.keys(target)) delete target[k];
  Object.assign(target, value);
};

// Uložený obsah se skládá přes výchozí: když v kódu později přibude nové pole, web nespadne.
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
export const mergeDeep = (def, val) => {
  if (val === undefined || val === null) return def;
  if (!isObj(def) || !isObj(val)) return val;
  const out = { ...def };
  for (const k of Object.keys(val)) out[k] = mergeDeep(def[k], val[k]);
  return out;
};

// data = { sekce: obsah } – chybějící sekce zůstávají výchozí
export function applyContent(data, notify = true) {
  for (const key of Object.keys(SECTIONS)) {
    const value = structuredClone(mergeDeep(DEFAULTS[key], data?.[key]));
    replaceInPlace(SECTIONS[key], value);
  }
  // odkazy z administrace pouštíme jen bezpečné (https, mailto, tel)
  for (const k of Object.keys(C.links)) C.links[k] = safeUrl(C.links[k]);
  C.sonia.videos?.forEach(v => { v.href = safeUrl(v.href); });
  C.community.channels?.forEach(ch => { ch.href = safeUrl(C.links[ch.id] || ch.href); });
  if (notify) bump();
}

const readJSON = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };

// Načte veřejný obsah z databáze (bez knihovny – stačí REST)
export async function fetchPublished() {
  const r = await fetch(`${SUPABASE.url}/rest/v1/content?select=key,data`, { headers: { apikey: SUPABASE.key, Authorization: `Bearer ${SUPABASE.key}` } });
  if (!r.ok) throw new Error('content ' + r.status);
  const rows = await r.json();
  return Object.fromEntries(rows.map(x => [x.key, x.data]));
}

// Spouští se před vykreslením webu
export function bootContent() {
  if (!hasBackend()) {
    const demo = readJSON(DRAFT);
    if (demo) applyContent(demo, false);
    return;
  }
  const cached = readJSON(CACHE);
  if (cached) applyContent(cached, false);
  fetchPublished()
    .then(data => {
      const json = JSON.stringify(data);
      if (json === JSON.stringify(cached)) return;
      try { localStorage.setItem(CACHE, json); } catch {}
      applyContent(data);
    })
    .catch(() => {});
}

// Pomocníci pro blog
export const slugify = t => String(t || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const postSlug = p => p.slug || slugify(p.title);
export const visiblePosts = () => (C.blog.posts || []).filter(p => !p.draft).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
export const featuredPost = () => { const v = visiblePosts(); return v.find(p => p.featured) || v[0]; };

// Odeslání formuláře do databáze (objednávka, zpráva, odběr). Bez databáze nic nedělá – formuláře jdou e-mailem.
export async function submit(table, row) {
  if (!hasBackend()) return false;
  try {
    const r = await fetch(`${SUPABASE.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: { apikey: SUPABASE.key, Authorization: `Bearer ${SUPABASE.key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(Object.fromEntries(Object.entries(row).map(([k, v]) => [k, clip(v)])))
    });
    return r.ok;
  } catch { return false; }
}
