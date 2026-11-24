import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './fonts.js';
import './index.css';
import App from './App.jsx';
import { bootContent } from './lib/store.js';

bootContent();

import { Component } from 'react';
// Když administrace narazí na chybu, ukáže ji místo prázdné obrazovky.
class AdminBoundary extends Component {
  state = { err: null };
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div style={{ fontFamily: 'Mulish, sans-serif', maxWidth: 560, margin: '15vh auto', padding: 24, background: '#fff', borderRadius: 16, color: '#2b1838' }}>
        <h1 style={{ fontSize: 22 }}>V administraci nastala chyba</h1>
        <p>Obnov prosím stránku. Pokud se chyba opakuje, pošli tenhle text Nele:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f0fa', padding: 12, borderRadius: 8 }}>{String(this.state.err?.message || this.state.err)}</pre>
        <button onClick={() => location.reload()}>Obnovit stránku</button>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
// odkaz z e-mailu (zapomenuté heslo) nese přihlašovací údaje v adrese → otevřít administraci
const authLink = /(access_token|type=recovery|error_description)/.test(location.hash);
if (location.hash.startsWith('#admin') || authLink) {
  // administraci nechceme ve vyhledávačích
  const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex, nofollow'; document.head.append(robots);
  // administrace je samostatný balíček – návštěvníkům webu se nenačítá
  import('./admin/AdminApp.jsx').then(({ default: AdminApp }) => root.render(<StrictMode><AdminBoundary><AdminApp /></AdminBoundary></StrictMode>));
} else {
  root.render(<StrictMode><App /></StrictMode>);
}
