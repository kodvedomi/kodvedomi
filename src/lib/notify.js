import { FORMS_KEY } from './config.js';
import { brand } from '../content.js';

// Pošle zprávu z formuláře rovnou Sonii na e-mail.
// Když to nejde (klíč chybí, výpadek), otevře záložně e-mail u návštěvníka.
// Vrací 'ok' (odesláno) nebo 'mail' (otevřen e-mail).
export async function deliver(subject, body, who = {}) {
  if (FORMS_KEY) {
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORMS_KEY,
          subject,
          from_name: 'Web Kód Vědomí',
          name: who.name || '',
          email: who.email || '',
          replyto: who.email || '',
          'Zpráva': body
        })
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success !== false) return 'ok';
    } catch { /* záložně e-mail níže */ }
  }
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mail';
}
