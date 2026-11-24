// Karta dne – tarotová numerologie, velká arkána (22 karet).
// Postup podle zadání Sonie: datum narození (rok, měsíc a den pod sebou) se sečte → kód života.
// K němu se přičte dnešní datum (stejně sečtené) → výsledek se zredukuje na 1–22 → karta dne.
// Texty karet jsou ukázkové, Sonia je nahradí svými.

export const reduce22 = n => { while (n > 22) n = String(n).split('').reduce((a, b) => a + +b, 0); return n; };
export const dateSum = d => d.getFullYear() + (d.getMonth() + 1) + d.getDate();
export const lifeCode = (day, month, year) => reduce22(year + month + day);
export const cardOfDay = (code, today = new Date()) => reduce22(code + reduce22(dateSum(today)));

export const arcana = {
  1: { name: 'Mág', text: 'Máš v rukou všechny nástroje. Dnes je den začít – tvůj záměr má sílu se zhmotnit.' },
  2: { name: 'Velekněžka', text: 'Zpomal a naslouchej intuici. Odpovědi dnes přicházejí v tichu, ne v hluku.' },
  3: { name: 'Císařovna', text: 'Den hojnosti, tvořivosti a péče. Dopřej si krásu a nech věci růst.' },
  4: { name: 'Císař', text: 'Struktura a pevné hranice. Udělej si plán a postav se za svá rozhodnutí.' },
  5: { name: 'Velekněz', text: 'Hledej moudrost u učitelů a tradice. Dnes je dobrý den učit se – i předávat.' },
  6: { name: 'Milenci', text: 'Den volby srdcem. Rozhoduj se v souladu se svými hodnotami.' },
  7: { name: 'Vůz', text: 'Vítězství přes odhodlání. Drž směr a veď své protiklady jedním směrem.' },
  8: { name: 'Spravedlnost', text: 'Rovnováha a pravda. Co dáváš, se ti vrací – jednej poctivě k sobě i druhým.' },
  9: { name: 'Poustevník', text: 'Čas na ztišení a vnitřní světlo. Pobuď sama se sebou, odpovědi jsou v tobě.' },
  10: { name: 'Kolo štěstí', text: 'Život se otáčí. Přijmi změnu s důvěrou – cyklus se uzavírá a nový začíná.' },
  11: { name: 'Síla', text: 'Jemná síla zvítězí. Laskavost a trpělivost dnes zmůžou víc než tlak.' },
  12: { name: 'Viselec', text: 'Podívej se na situaci z jiného úhlu. Pustit kontrolu může přinést úlevu.' },
  13: { name: 'Smrt', text: 'Něco končí, aby mohlo začít nové. Pusť to, co už ti neslouží.' },
  14: { name: 'Mírnost', text: 'Den harmonie a uzdravení. Hledej střední cestu a dopřej si klid.' },
  15: { name: 'Ďábel', text: 'Všimni si svých připoutaností a vzorců. Uvědomění je první krok ke svobodě.' },
  16: { name: 'Věž', text: 'Staré struktury se otřásají. Co padá, uvolňuje místo pravdě.' },
  17: { name: 'Hvězda', text: 'Naděje a inspirace. Věř svému světlu – vesmír tě vede.' },
  18: { name: 'Měsíc', text: 'Sny a podvědomí mluví. Nenech se vést strachem, naslouchej intuici.' },
  19: { name: 'Slunce', text: 'Radost, úspěch a lehkost. Dovol si zářit a sdílej své světlo.' },
  20: { name: 'Soud', text: 'Probuzení a nové volání. Odpusť minulosti a odpověz na svůj vnitřní hlas.' },
  21: { name: 'Svět', text: 'Završení a celistvost. Oslav, kam jsi došla – jsi na správném místě.' },
  22: { name: 'Blázen', text: 'Nový začátek s otevřeným srdcem. Udělej krok do neznáma s důvěrou.' }
};
