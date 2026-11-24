// Bezpečnostní pojistky pro obsah z administrace a formuláře.
import DOMPurify from 'dompurify';

// HTML z administrace: jen základní formátování, žádné skripty, styly ani vložené rámy
const HTML_CFG = {
  ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'br', 'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'span', 'small'],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#)/i
};
DOMPurify.addHook('afterSanitizeAttributes', n => {
  if (n.tagName === 'A' && /^https?:/i.test(n.getAttribute('href') || '')) { n.setAttribute('target', '_blank'); n.setAttribute('rel', 'noopener noreferrer'); }
});
export const cleanHtml = h => DOMPurify.sanitize(String(h ?? ''), HTML_CFG);

// Odkazy: jen web, e-mail, telefon nebo kotva na webu
export const safeUrl = u => (/^(https?:\/\/|mailto:|tel:|#)/i.test(String(u || '').trim()) ? String(u).trim() : '');

// Obrázky: soubor z /media, https adresa nebo obrázek nahraný v administraci
export const safeImg = u => (/^(https:\/\/|data:image\/(webp|png|jpe?g|gif);base64,|blob:|media\/)/i.test(u) ? u : '');

// Formuláře: past na roboty (skryté pole) + minimální doba vyplnění
export function botGuard() {
  const start = Date.now();
  return { ok: form => !(form?.elements?.website?.value) && Date.now() - start > 2500 };
}

// Ořez délky textů z formulářů (ochrana před zahlcením)
export const clip = (v, n = 2000) => (typeof v === 'string' ? v.slice(0, n) : v);
