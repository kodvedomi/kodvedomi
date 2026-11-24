// Jednoduchý košík: drží se v prohlížeči návštěvníka (localStorage), bez účtu.
import { useSyncExternalStore } from 'react';

const KEY = 'kv-cart';
let items = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } })();
const subs = new Set();
const emit = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} subs.forEach(f => f()); };

export const cart = {
  add(it) {
    const id = it.name + '|' + (it.meta || '');
    const ex = items.find(x => x.id === id);
    items = ex ? items.map(x => (x.id === id ? { ...x, qty: x.qty + 1 } : x)) : [...items, { id, name: it.name, meta: it.meta, price: it.price, physical: !!it.physical, qty: 1 }];
    emit();
  },
  setQty(id, q) { items = q <= 0 ? items.filter(x => x.id !== id) : items.map(x => (x.id === id ? { ...x, qty: q } : x)); emit(); },
  clear() { items = []; emit(); }
};

export const useCart = () => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => items);
