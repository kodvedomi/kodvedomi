// Co se dá v administraci upravovat. Typy polí viz fields.jsx.
const HTML_HELP = 'Tučně: <b>text</b>. Nový odstavec = nová položka.';
const paras = (k, label = 'Odstavce') => ({ k, label, type: 'strings', long: true, help: HTML_HELP, addLabel: 'Přidat odstavec' });

/* ---------- Blog ---------- */
export const postFields = (tags = []) => [
  { k: 'title', label: 'Název článku', req: true },
  { k: 'tag', label: 'Rubrika', type: 'select', half: true, options: () => ['', ...tags] },
  { k: 'date', label: 'Datum', type: 'date', half: true },
  { k: 'img', label: 'Úvodní obrázek', type: 'image', help: 'Ideálně na šířku (16 : 9).' },
  { k: 'text', label: 'Perex (krátký úvod do přehledu článků)', type: 'textarea' },
  { k: 'body', label: 'Text článku', type: 'blocks' },
  { k: 'author', label: 'Podpis pod článkem', half: true, placeholder: 'Sonia Edde Arael' },
  { k: 'slug', label: 'Adresa článku', half: true, help: 'Nech prázdné – vytvoří se z názvu.' },
  { k: 'featured', label: 'Hlavní článek (velká dlaždice nahoře na blogu)', type: 'bool' },
  { k: 'draft', label: 'Koncept – na webu se zatím nezobrazí', type: 'bool' }
];
export const blogSettings = [
  { k: 'subtitle', label: 'Podnadpis stránky Blog' },
  { k: 'lead', label: 'Úvodní věta' },
  { k: 'filters', label: 'Rubriky (filtry)', type: 'tags', help: 'První rubrika „Vše“ zobrazí všechny články.' }
];

/* ---------- E-shop ---------- */
export const catFields = [
  { k: 'title', label: 'Název dlaždice', req: true, half: true },
  { k: 'id', label: 'Kód (do adresy)', half: true, help: 'Malými písmeny bez diakritiky, např. „ebooky“.' },
  { k: 'img', label: 'Obrázek dlaždice', type: 'image' },
  { k: 'text', label: 'Popis na dlaždici', type: 'textarea' },
  { k: 'cta', label: 'Text tlačítka', half: true },
  { k: 'soon', label: 'Štítek „Již brzy“', type: 'bool', half: true }
];
const offerItem = [
  { k: 'name', label: 'Název', req: true },
  { k: 'meta', label: 'Upřesnění (délka, rozsah…)', half: true },
  { k: 'price', label: 'Cena v Kč', type: 'number', half: true, help: 'Prázdné = „Cena bude doplněna“ a tlačítko Poptat.' },
  { k: 'note', label: 'Poznámka pod cenou' },
  { k: 'perks', label: 'Výhody / bonusy', type: 'tags' },
  { k: 'best', label: 'Zvýraznit jako „Nejvýhodnější“', type: 'bool', half: true },
  { k: 'soon', label: 'Připravujeme (nelze koupit)', type: 'bool', half: true }
];
export const productFields = [
  { k: 'name', label: 'Název produktu', req: true },
  { k: 'meta', label: 'Krátké upřesnění', help: 'Např. „v dárkové krabičce“ nebo „E-kniha v PDF“.' },
  { k: 'img', label: 'Fotografie', type: 'image' },
  { k: 'text', label: 'Popis', type: 'textarea', rows: 4 },
  { k: 'price', label: 'Cena v Kč vč. DPH', type: 'number', half: true },
  { k: 'variants', label: 'Varianty (zákazník vybírá)', type: 'tags', half: true, placeholder: 'např. Růženín' },
  { k: 'physical', label: 'Fyzický produkt – posílá se poštou', type: 'bool', half: true },
  { k: 'digital', label: 'Digitální (PDF ke stažení po zaplacení)', type: 'bool', half: true },
  { k: 'best', label: 'Zvýraznit („Dárkový set“)', type: 'bool', half: true },
  { k: 'soon', label: 'Již brzy (nelze koupit)', type: 'bool', half: true }
];
export const detailFields = [
  { k: 'title', label: 'Nadpis stránky' },
  { k: 'intro', label: 'Úvodní text', type: 'textarea', rows: 4 },
  { k: 'free', label: 'Tlačítko „zdarma“ (nepovinné)', help: 'Např. „Domluvit setkání zdarma“. Prázdné = tlačítko se nezobrazí.' },
  {
    k: 'subs', label: 'Podnabídky (malé dlaždice nahoře)', type: 'list', addLabel: 'Přidat podnabídku', thumb: x => x.img,
    help: 'Kliknutím sjedou na skupinu se stejným kódem.',
    fields: [{ k: 'title', label: 'Název', half: true }, { k: 'id', label: 'Kód skupiny', half: true }, { k: 'img', label: 'Obrázek', type: 'image' }, { k: 'text', label: 'Popis', type: 'textarea' }]
  },
  {
    k: 'groups', label: 'Ceník (skupiny nabídek)', type: 'list', addLabel: 'Přidat skupinu', summary: g => g.title || `Skupina (${g.items?.length || 0} položek)`,
    blank: { title: '', items: [] },
    fields: [
      { k: 'title', label: 'Nadpis skupiny', half: true }, { k: 'id', label: 'Kód skupiny (nepovinné)', half: true },
      { k: 'lead', label: 'Úvod skupiny', type: 'textarea' },
      { k: 'items', label: 'Položky ceníku', type: 'list', fields: offerItem, addLabel: 'Přidat položku', summary: x => `${x.name || '(bez názvu)'}${x.meta ? ' · ' + x.meta : ''}`, badge: x => (x.price ? x.price.toLocaleString('cs-CZ') + ' Kč' : 'bez ceny') }
    ]
  },
  { k: 'products', label: 'Produkty (s fotkou)', type: 'list', fields: productFields, addLabel: 'Přidat produkt', thumb: x => x.img, badge: x => (x.soon ? 'již brzy' : x.price ? x.price.toLocaleString('cs-CZ') + ' Kč' : '') }
];
export const shopSettings = [
  { k: 'subtitle', label: 'Podnadpis e-shopu' },
  { k: 'lead', label: 'Úvodní věta', type: 'textarea' }
];

export const checkoutFields = [
  {
    k: 'shipping', label: 'Způsoby doručení', type: 'list', addLabel: 'Přidat dopravu', badge: x => (x.price ? x.price + ' Kč' : 'zdarma'),
    fields: [
      { k: 'label', label: 'Název', half: true }, { k: 'price', label: 'Cena v Kč', type: 'number', half: true },
      { k: 'note', label: 'Popis' }, { k: 'id', label: 'Kód', half: true },
      { k: 'digital', label: 'Elektronické doručení (pro služby a e-knihy)', type: 'bool', half: true }
    ]
  },
  { k: 'giftWrap', label: 'Dárkové balení', type: 'object', fields: [{ k: 'label', label: 'Název', half: true }, { k: 'price', label: 'Cena v Kč', type: 'number', half: true }] }
];

/* ---------- Kontakt, firma, sítě ---------- */
export const brandFields = [
  { k: 'email', label: 'Kontaktní e-mail', type: 'email', half: true, help: 'Sem chodí objednávky a zprávy z formulářů.' },
  { k: 'phone', label: 'Telefon (nepovinné)', half: true, help: 'Prázdné = na webu se nezobrazí.' },
  { k: 'contactLead', label: 'Věta v kontaktu v patičce' },
  { k: 'name', label: 'Název webu', half: true }, { k: 'claim', label: 'Slogan', half: true },
  { k: 'footerLine', label: 'Věta v patičce' },
  {
    k: 'company', label: 'Fakturační údaje', type: 'object', fields: [
      { k: 'name', label: 'Firma' }, { k: 'address', label: 'Sídlo' },
      { k: 'ico', label: 'IČO', half: true }, { k: 'dic', label: 'DIČ', half: true }, { k: 'databox', label: 'Datová schránka', half: true }
    ]
  }
];
export const linkFields = [
  { k: 'herohero', label: 'HeroHero', type: 'url' },
  { k: 'facebook', label: 'Facebook (skupina)', type: 'url' },
  { k: 'instagram', label: 'Instagram', type: 'url' },
  { k: 'youtube', label: 'YouTube', type: 'url', help: 'Prázdný odkaz = ikona sítě se na webu skryje.' }
];

/* ---------- Stránky ---------- */
export const homeFields = [
  { k: 'philo', label: 'Filozofie', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, { k: 'sub', label: 'Podnadpis' }, paras('text')] },
  { k: 'code', label: 'Poznej kód svého života', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, paras('text'), { k: 'cta', label: 'Tlačítko' }] },
  { k: 'howTitle', label: 'Nadpis „Jak Kód Vědomí funguje“' },
  { k: 'howLead', label: 'Úvod sekce', type: 'textarea' },
  {
    k: 'hero', label: 'Karta HeroHero', type: 'object', fields: [
      { k: 'kicker', label: 'Podtitul' }, { k: 'text', label: 'Text', type: 'textarea', rows: 5 }, { k: 'listTitle', label: 'Nadpis seznamu' },
      { k: 'bullets', label: 'Seznam', type: 'strings' }, { k: 'after', label: 'Text za seznamem', type: 'textarea' }, { k: 'outro', label: 'Závěr' }, { k: 'cta', label: 'Tlačítko' }
    ]
  },
  {
    k: 'community', label: 'Karta Komunita', type: 'object', fields: [
      { k: 'kicker', label: 'Podtitul' }, paras('text'), { k: 'principle', label: 'Zvýrazněný princip', type: 'textarea' }, { k: 'after', label: 'Text pod principem', type: 'textarea' }, { k: 'cta', label: 'Tlačítko' }
    ]
  },
  { k: 'coach', label: 'Spirituální koučink', type: 'object', fields: [{ k: 'title', label: 'Nadpis (2 řádky)', type: 'strings' }, paras('text'), { k: 'cta', label: 'Tlačítko' }] },
  { k: 'tools', label: 'Nástroje pro tvou cestu', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, { k: 'text', label: 'Text', type: 'textarea' }, { k: 'cta', label: 'Tlačítko' }] }
];

export const aboutFields = [
  { k: 'title', label: 'Nadpis stránky' },
  { k: 'greeting', label: 'Pozdrav' },
  paras('intro', 'Úvod'),
  {
    k: 'chapters', label: 'Kapitoly příběhu', type: 'list', addLabel: 'Přidat kapitolu', thumb: c => c.img, summary: c => c.quote || c.title,
    fields: [
      { k: 'quote', label: 'Citát (růžová pilulka)', half: true }, { k: 'title', label: 'nebo Nadpis', half: true },
      { k: 'lead', label: 'Podtitul', type: 'textarea' }, { k: 'img', label: 'Fotografie', type: 'image' },
      { k: 'pos', label: 'Ořez fotky (např. 50% 20%)', half: true }, { k: 'seal', label: 'Zobrazit jako pečeť (kruh)', type: 'bool', half: true },
      paras('text')
    ]
  },
  {
    k: 'finale', label: 'Závěr stránky', type: 'object', fields: [
      { k: 'lead', label: 'Úvod' }, { k: 'big', label: 'Velká věta' }, { k: 'text', label: 'Text', type: 'textarea' },
      { k: 'fordLead', label: 'Uvedení citátu' }, { k: 'ford', label: 'Citát' }, paras('after', 'Text za citátem'),
      { k: 'welcome', label: 'Přivítání', half: true }, { k: 'sign', label: 'Podpis', half: true }
    ]
  }
];

export const communityFields = [
  { k: 'title', label: 'Nadpis', half: true }, { k: 'subtitle', label: 'Podnadpis', half: true },
  { k: 'lead', label: 'Úvod', type: 'textarea' }, { k: 'foot', label: 'Věta pod kartami' },
  {
    k: 'channels', label: 'Kanály komunity', type: 'list', summary: c => c.name,
    help: 'Odkazy na sítě se nastavují v sekci Kontakt a sítě.',
    fields: [
      { k: 'name', label: 'Název' }, { k: 'badge', label: 'Štítek (např. Zdarma)', half: true }, { k: 'paid', label: 'Placené', type: 'bool', half: true },
      { k: 'kicker', label: 'Podtitul' }, paras('text'), { k: 'cta', label: 'Tlačítko' }
    ]
  }
];

export const soniaFields = [
  { k: 'roles', label: 'Role pod logem' }, { k: 'headline', label: 'Hlavní nadpis' },
  { k: 'intro', label: 'Úvodní věta' }, { k: 'introText', label: 'Úvodní text', type: 'textarea', rows: 4 },
  { k: 'bridge', label: 'Most mezi světy', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, { k: 'text', label: 'Text', type: 'textarea' }] },
  { k: 'dj', label: 'DJing', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, paras('text'), { k: 'photos', label: 'Fotky (3)', type: 'strings', image: true, addLabel: 'Přidat fotku' }] },
  {
    k: 'mod', label: 'Moderování', type: 'object', fields: [
      { k: 'title', label: 'Nadpis' }, paras('text'), { k: 'showsTitle', label: 'Uvedení pořadů' },
      { k: 'shows', label: 'Pořady', type: 'list', addLabel: 'Přidat pořad', fields: [{ k: 'name', label: 'Pořad', half: true }, { k: 'note', label: 'Popis', half: true }] },
      paras('text2', 'Text pod pořady'), { k: 'photos', label: 'Fotky (3)', type: 'strings', image: true, addLabel: 'Přidat fotku' }
    ]
  },
  { k: 'events', label: 'Organizace akcí', type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, paras('text'), { k: 'photos', label: 'Fotky (2)', type: 'strings', image: true, addLabel: 'Přidat fotku' }] },
  { k: 'stats', label: 'Čísla', type: 'list', summary: s => `${s.n}${s.suffix || ''} ${s.label}`, fields: [{ k: 'n', label: 'Číslo', type: 'number', half: true }, { k: 'suffix', label: 'Přípona (+)', half: true }, { k: 'label', label: 'Popis' }] },
  {
    k: 'videos', label: 'Ukázky práce (videa na YouTube)', type: 'list', addLabel: 'Přidat video', thumb: v => v.img,
    fields: [{ k: 'title', label: 'Název' }, { k: 'href', label: 'Odkaz na YouTube', type: 'url' }, { k: 'img', label: 'Náhledová fotka', type: 'image' }, { k: 'pos', label: 'Ořez fotky (např. 50% 20%)' }]
  },
  { k: 'gallery', label: 'Galerie', type: 'strings', image: true, addLabel: 'Přidat fotku do galerie' },
  {
    k: 'booking', label: 'Poptávka', type: 'object', fields: [
      { k: 'title', label: 'Nadpis' }, paras('text'), { k: 'priceFrom', label: 'Cena od' }, { k: 'services', label: 'Služby ve formuláři', type: 'tags' }
    ]
  }
];

const numFields = [{ k: 'name', label: 'Název' }, { k: 'text', label: 'Text', type: 'textarea', rows: 5 }];
export const lifePathFields = [{ k: '_', type: 'map', keys: () => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'], fields: numFields }];
export const arcanaFields = [{ k: '_', type: 'map', keys: () => Array.from({ length: 22 }, (_, i) => String(i + 1)), fields: numFields }];

export const seoFields = [
  { k: 'title', label: 'Název webu ve vyhledávači (title)', help: 'Ideálně do 60 znaků.' },
  { k: 'description', label: 'Popis ve vyhledávači', type: 'textarea', help: 'Ideálně 120–160 znaků.' },
  { k: 'image', label: 'Obrázek pro sdílení na sítích', type: 'image' }
];

const legalDoc = label => ({ k: label[0], label: label[1], type: 'object', fields: [{ k: 'title', label: 'Nadpis' }, { k: 'text', label: 'Text (HTML)', type: 'html', rows: 14, help: 'Odstavec <p>…</p>, nadpis <h2>…</h2>, seznam <ul><li>…</li></ul>.' }] });
export const legalFields = [legalDoc(['terms', 'Obchodní podmínky']), legalDoc(['privacy', 'Ochrana osobních údajů (GDPR)']), legalDoc(['complaints', 'Reklamační řád'])];
