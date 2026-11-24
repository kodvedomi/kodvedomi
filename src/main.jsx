import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App.jsx';
import { bootContent } from './lib/store.js';

bootContent();

const root = createRoot(document.getElementById('root'));
// odkaz z e-mailu (zapomenuté heslo) nese přihlašovací údaje v adrese → otevřít administraci
const authLink = /(access_token|type=recovery|error_description)/.test(location.hash);
if (location.hash.startsWith('#admin') || authLink) {
  // administraci nechceme ve vyhledávačích
  const robots = document.createElement('meta'); robots.name = 'robots'; robots.content = 'noindex, nofollow'; document.head.append(robots);
  // administrace je samostatný balíček – návštěvníkům webu se nenačítá
  import('./admin/AdminApp.jsx').then(({ default: AdminApp }) => root.render(<StrictMode><AdminApp /></StrictMode>));
} else {
  root.render(<StrictMode><App /></StrictMode>);
}
