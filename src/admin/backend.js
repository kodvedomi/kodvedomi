// Ukládání administrace: Supabase (ostrý provoz) nebo demo režim v prohlížeči.
import { SUPABASE } from '../lib/config.js';
import { SECTIONS, DEFAULTS, DRAFT, hasBackend, slugify, mergeDeep } from '../lib/store.js';

export const isDemo = () => !hasBackend();

let client = null;
async function sb() {
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    client = createClient(SUPABASE.url, SUPABASE.key);
  }
  return client;
}

/* ---------- přihlášení ---------- */
export async function getUser() {
  if (isDemo()) return { email: 'demo', demo: true };
  const { data } = await (await sb()).auth.getSession();
  if (!data.session) return null;
  const u = data.session.user;
  if (needsCode(await mfaState())) return { email: u.email, needCode: true };
  const { data: adm } = await (await sb()).from('admins').select('email').eq('email', u.email).maybeSingle();
  return adm ? { email: u.email } : { email: u.email, notAdmin: true };
}
export async function signIn(email, password) {
  const { error } = await (await sb()).auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message === 'Invalid login credentials' ? 'Nesprávný e-mail nebo heslo.' : error.message);
}
export async function resetPassword(email) {
  const { error } = await (await sb()).auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname + '#admin' });
  if (error) throw error;
}
export async function updatePassword(password) {
  const { error } = await (await sb()).auth.updateUser({ password });
  if (error) throw error;
}
export async function signOut(all = false) { if (!isDemo()) await (await sb()).auth.signOut(all ? { scope: 'global' } : undefined); }

/* ---------- dvoufázové ověření (kód z aplikace v mobilu) ---------- */
export async function mfaState() {
  if (isDemo()) return { demo: true };
  const a = (await sb()).auth;
  const { data: lvl } = await a.mfa.getAuthenticatorAssuranceLevel();
  const { data: f } = await a.mfa.listFactors();
  return { current: lvl?.currentLevel, next: lvl?.nextLevel, factors: (f?.totp || []).filter(x => x.status === 'verified') };
}
export const needsCode = st => st && st.next === 'aal2' && st.current !== 'aal2';
export async function mfaVerify(code) {
  const a = (await sb()).auth;
  const { data: f } = await a.mfa.listFactors();
  const factor = f.totp.find(x => x.status === 'verified');
  const { error } = await a.mfa.challengeAndVerify({ factorId: factor.id, code: code.replace(/\s/g, '') });
  if (error) throw new Error('Kód nesouhlasí. Zkus ho opsat znovu, platí jen 30 sekund.');
}
export async function mfaEnroll() {
  const a = (await sb()).auth;
  const { data: f } = await a.mfa.listFactors();
  for (const x of (f?.all || []).filter(x => x.status !== 'verified')) await a.mfa.unenroll({ factorId: x.id });
  const { data, error } = await a.mfa.enroll({ factorType: 'totp', friendlyName: 'Kód Vědomí ' + new Date().toISOString().slice(0, 10) });
  if (error) throw error;
  return { id: data.id, qr: data.totp.qr_code, secret: data.totp.secret };
}
export async function mfaConfirm(factorId, code) {
  const { error } = await (await sb()).auth.mfa.challengeAndVerify({ factorId, code: code.replace(/\s/g, '') });
  if (error) throw new Error('Kód nesouhlasí. Zkus ho opsat znovu.');
}
export async function mfaRemove(factorId) {
  const { error } = await (await sb()).auth.mfa.unenroll({ factorId });
  if (error) throw error;
}

/* ---------- historie změn obsahu ---------- */
export async function listHistory(key) {
  if (isDemo()) return null;
  const { data, error } = await (await sb()).from('content_history').select('id,changed_at,changed_by').eq('key', key).order('changed_at', { ascending: false }).limit(40);
  if (error) throw error;
  return data;
}
export async function getHistory(id) {
  const { data, error } = await (await sb()).from('content_history').select('data').eq('id', id).single();
  if (error) throw error;
  return data.data;
}

/* ---------- obsah ---------- */
const readDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT)) || {}; } catch { return {}; } };

export async function loadAll() {
  if (isDemo()) return structuredClone(SECTIONS);
  const { data, error } = await (await sb()).from('content').select('key,data');
  if (error) throw error;
  const out = structuredClone(SECTIONS);
  data.forEach(r => { if (r.key in DEFAULTS) out[r.key] = mergeDeep(structuredClone(DEFAULTS[r.key]), r.data); });
  return out;
}

export async function saveSections(changes) {
  if (isDemo()) {
    const d = { ...readDraft(), ...changes };
    try { localStorage.setItem(DRAFT, JSON.stringify(d)); }
    catch { throw new Error('Prohlížeč nemá dost místa (demo režim). Nahrané obrázky jsou velké – po připojení databáze už to omezení nebude.'); }
    return;
  }
  const rows = Object.entries(changes).map(([key, data]) => ({ key, data, updated_at: new Date().toISOString() }));
  const { error } = await (await sb()).from('content').upsert(rows);
  if (error) throw error;
}

export async function resetSection(key) {
  if (isDemo()) { const d = readDraft(); delete d[key]; localStorage.setItem(DRAFT, JSON.stringify(d)); return; }
  const { error } = await (await sb()).from('content').delete().eq('key', key);
  if (error) throw error;
}

export function exportJSON(work) {
  const blob = new Blob([JSON.stringify(work, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `kod-vedomi-obsah-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}

/* ---------- obrázky ---------- */
async function toWebp(file, max = 1800, q = 0.84) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise(r => c.toBlob(r, 'image/webp', q));
}

export async function uploadImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Vyber prosím obrázek (JPG, PNG, WebP).');
  if (isDemo()) {
    const blob = await toWebp(file, 1200, 0.78);
    return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
  }
  const blob = await toWebp(file);
  const name = `uploads/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'obrazek'}.webp`;
  const s = await sb();
  const { error } = await s.storage.from('media').upload(name, blob, { contentType: 'image/webp', cacheControl: '31536000' });
  if (error) throw error;
  return s.storage.from('media').getPublicUrl(name).data.publicUrl;
}

/* ---------- provoz: objednávky, zprávy, odběratelé ---------- */
export async function listRows(table, order = 'created_at') {
  if (isDemo()) return null;
  const { data, error } = await (await sb()).from(table).select('*').order(order, { ascending: false }).limit(500);
  if (error) throw error;
  return data;
}
export async function updateRow(table, id, patch) {
  const { error } = await (await sb()).from(table).update(patch).eq('id', id);
  if (error) throw error;
}
export async function listAdmins() { return listRows('admins', 'email'); }
export async function addAdmin(email) { const { error } = await (await sb()).from('admins').insert({ email }); if (error) throw error; }
export async function removeAdmin(email) { const { error } = await (await sb()).from('admins').delete().eq('email', email); if (error) throw error; }
