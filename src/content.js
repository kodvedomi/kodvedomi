// Veškerý obsah webu na jednom místě – texty dodala Sonia Edde (13. 11. 2026).
// Stejný soubor později použije i mobilní aplikace. Obrázky leží v /public/media.

import { safeImg } from './lib/safe.js';

export const m = name => `media/${name}`;
// Obrázek z obsahu: krátký název ('blog-1') = soubor v /media, jinak plná adresa (nahraný obrázek z administrace).
export const img = n => !n ? '' : /^(https?:|data:|blob:|media\/)/.test(n) ? safeImg(n) : /^[\w.-]+$/.test(n) ? `media/${n}.webp` : '';

export const brand = {
  name: 'Kód Vědomí',
  claim: 'Staré poznání v novém jazyce',
  footerLine: 'Vaše cesta k transformaci začíná pochopením vlastního kódu.',
  company: { name: 'Kód Vědomí s.r.o.', ico: '29582016', dic: 'CZ29582016', address: 'Kaprova 42/14, Staré Město, 110 00 Praha', databox: 'nm6sgmf' },
  email: 'eddesonia@gmail.com',
  phone: '',
  contactLead: 'Máš dotaz, poptávku nebo chceš spolupracovat? Napiš mi.'
};

export const links = {
  herohero: 'https://herohero.co/successfulngzohswuvqgaj',
  facebook: 'https://www.facebook.com/groups/417158089517198/',
  instagram: 'https://www.instagram.com/kodvedomi/',
  youtube: 'https://www.youtube.com/channel/UCtvHRFkmmlXyvImavbdlEAQ'
};

// Pořadí menu podle zadání Sonie
export const nav = [
  { id: 'domu', label: 'Úvodní stránka', short: 'Úvod' },
  { id: 'o-mne', label: 'O mně' },
  { id: 'komunita', label: 'Komunita' },
  { id: 'blog', label: 'Blog' },
  { id: 'eshop', label: 'E-shop' },
  { id: 'sonia', label: 'Sonia Edde' },
  { id: 'kontakt', label: 'Kontakt' }
];

/* ---------------- ÚVODNÍ STRÁNKA ---------------- */
export const home = {
  philo: {
    title: 'Filozofie Kódu Vědomí',
    sub: 'Staré poznání v novém jazyce.',
    text: [
      'V Kódu Vědomí propojujeme starověkou moudrost s poznatky moderní vědy a praktickými zkušenostmi. Naším cílem je hluboká proměna, která se přirozeně promítne do tvého každodenního života — do toho, jak přemýšlíš, jak se cítíš, jaké vztahy tvoříš a jak se rozhoduješ.',
      'Tato cesta vyžaduje otevřenost, vlastní praxi a ochotu podívat se pod povrch. Je pro ty, kteří chtějí lépe porozumět sami sobě, rozpoznat své zažité vzorce a převzít zodpovědnost za to, co mohou ve svém životě ovlivnit.',
      '<b>Věříme, že skutečná změna začíná poznáním sebe sama.</b> A právě tady začíná i cesta k tvému osobnímu kódu.'
    ]
  },
  code: {
    title: 'Poznej kód svého života',
    text: [
      'Každý z nás přichází na tento svět s určitou výbavou — s dary, přednostmi i výzvami, které postupně poznává.',
      'V numerologickém pojetí vnímáme <b>datum narození jako osobní kód</b>: symbolickou mapu, která může nabídnout nový pohled na tvé přirozené sklony, opakující se témata i možnosti dalšího rozvoje. Může ti pomoci klást si otázky, uvidět souvislosti a vědoměji hledat vlastní směr.',
      'Chceš svůj kód poznat? Vyplň krátký formulář a získej svůj osobní výpis zdarma. Společně s ním ti představíme i první fázi projektu na platformě HeroHero, kde můžeš ve své cestě pokračovat.'
    ],
    cta: 'Zjistit kód svého života'
  },
  howTitle: 'Jak Kód Vědomí funguje',
  howLead: 'Projekt budujeme postupně. Už teď se ale můžeš stát součástí prostoru, ve kterém se poznání mění v praxi a osobní cesta získává podporu komunity.',
  hero: {
    pill: 'HeroHero',
    kicker: 'Jdi pod povrch. Prolom svůj kód.',
    text: 'Na HeroHero najdeš inspiraci a konkrétní postupy, které můžeš začít zapojovat do svého každodenního života. Věnujeme se tělu, mysli, vztahům i práci s energií a hledáme souvislosti mezi tím, co prožíváme uvnitř, a tím, jak žijeme. Bavit se budeme o konspiraci i inspiraci, tak neváhej a buď také součástí komunity a bezpečného prostoru, kde nebudeš za svůj názor zesměšňován.',
    listTitle: 'Čekají na tebe:',
    bullets: [
      'Vedené meditace, afirmace a podprahové nahrávky.',
      'Praktické techniky a rady či recepty pro práci s tělem, myslí a pozorností.',
      'Hlubší souvislosti i alternativní pohledy, které otevírají prostor pro vlastní zkoumání.',
      'Minikurzy a transformační výzvy, které tě podpoří v pravidelné praxi.',
      'Rozhovory s léčiteli, terapeuty, kartářkami, kouči, umělci, živá vysílání',
      'a mnoho dalšího'
    ],
    after: 'Každý podnět je pozvánkou něco vyzkoušet, pozorovat a postupně začlenit do života. Krok za krokem, vlastním tempem.',
    outro: 'Na svou cestu už nemusíš být sám nebo sama. Jsme v tom spolu.',
    cta: 'Připojit se na HeroHero'
  },
  community: {
    pill: 'Komunita',
    kicker: 'Prostor pro sdílení a vzájemnou podporu',
    text: [
      'Součástí Kódu Vědomí je také uzavřená komunita, ve které se navzájem podporujeme, sdílíme zkušenosti a předáváme si své dovednosti.',
      'Možná pracuješ s energií, čísly nebo kartami. Možná přinášíš jinou zkušenost. A možná chceš především naslouchat, ptát se a učit se. I pro tebe je tu místo.'
    ],
    principle: 'Naším základním principem je vzájemnost: energie musí proudit. Přines hodnotu a otevři se i jejímu přijímání.',
    after: 'Hodnotou může být zkušenost, podpora, pozornost nebo laskavé naslouchání. V rovnováze mezi dáváním a přijímáním vzniká prostor pro společný růst.',
    cta: 'Poznat komunitu'
  },
  coach: {
    title: ['Individuální cesta:', 'Spirituální koučink'],
    text: [
      'Pokud cítíš, že potřebuješ osobní vedení, ráda se stanu tvou průvodkyní.',
      '<b>Ve své práci propojuji klasické koučovací metody s intuitivním přístupem a numerologií.</b> Jsem certifikovaný kouč s praxí. Pracuji s myslí, podvědomými vzorci i vnímáním energie. Podle zaměření našeho setkání využívám také čísla, karty nebo kyvadlo jako podněty k sebereflexi a hlubšímu porozumění.',
      '<b>Mým cílem je podpořit tě v rozpoznání a proměně vzorců, které tě drží na místě</b>, a pomoci ti najít konkrétní kroky směrem k životu, který chceš tvořit.',
      'Pokud s tebou tyto řádky rezonují a cítíš, že nastal čas na změnu, můžeme se na tvou cestu podívat společně.'
    ],
    cta: 'Domluvit si konzultaci'
  },
  tools: {
    title: 'Nástroje pro tvou cestu',
    text: 'Objev další podporu pro svou praxi — od fyzických předmětů po digitální obsah. Vyber si to, co ti pomůže přenést inspiraci do každodenního života.',
    cta: 'Prozkoumat e-shop'
  }
};

/* ---------------- O MNĚ ---------------- */
export const about = {
  title: 'Sonia Edde Arael',
  greeting: 'Zdravím tě, drahý Tvůrce či Tvůrkyně, vítej…',
  intro: [
    'Možná máš pocit, že už jsme se někde viděli. A ano… možná máš pravdu.',
    'Možná mě znáš z rádiového éteru, zpoza mixážního pultu nebo z televizních obrazovek. Možná sis mě zařadil/a jako „tu kozatou blondýnu z Úplně debilních zpráv“, holku z Playboye nebo Sexoňu z Barrandova. A možná mě vnímáš přes sociální sítě jako sebevědomou ženu, která ví, co chce, a jde si za tím.',
    '<b>Ale ne všechno je takové, jak se na první pohled zdá.</b>',
    'Tady bych ti chtěla ukázat člověka za veřejným obrazem. Svůj příběh, své hledání a cestu, ze které vznikl Kód Vědomí.'
  ],
  chapters: [
    {
      quote: 'Zvenku úspěšná. Uvnitř ztracená.',
      img: 'about-home',
      text: [
        'Do showbyznysu jsem vstoupila už v patnácti letech. Do prostředí, kde tě lidé neustále hodnotí, srovnávají a dávají ti najevo, kým bys měla být. Jak máš vypadat, jak se chovat a co říkat.',
        'Velmi brzy jsem začala slýchat, že nejsem dost. Že bych mohla být víc. Hezčí, lepší, úspěšnější. A postupně jsem tomu začala věřit.',
        'V takovém světě se jednu věc naučíš velmi rychle: nasadit si masku. Vytvořit si brnění. Být silná navenek, i když se uvnitř rozpadáš.',
        'A pak přišla rána, která to celé ještě prohloubila. Moje maminka, moje největší opora, odešla, když mi bylo sedmnáct let. A přestože mám skvělého tátu, svět se pro mě v tu chvíli stal místem, kde se spíš přežívá než žije.',
        'A tak jsem jela dál. Výkon, tlak, soutěžení, srovnávání. Potřeba být lepší. Potřeba být dost.',
        'Pokud si tedy myslíš, že jsem všechno, co dnes mám, dostala zdarma, pak znáš jen část mého příběhu.',
        'Prošla jsem si toxickými vztahy, domácím násilím, úzkostmi i závislostmi. Dlouho jsem hledala svou hodnotu venku — u partnerů, přátel, rodiny i v práci.',
        'Uvnitř jsem ale pořád byla tou holkou, která se snaží dokázat, že je dost. Byla jsem vděčná i za drobek, který vypadal jako láska. A nechávala jsem si líbit věci, které bych dnes už nepřijala.',
        'I tahle část patří ke mně. A právě její pochopení mi pomohlo začít se vracet sama k sobě.'
      ]
    },
    {
      quote: 'Život se mi neděje. Já ho tvořím.',
      img: 'about-flowers',
      text: [
        'Zlom přišel ve chvíli, kdy jsem pochopila, že mohu ovlivnit, jak budu dál žít. Nemohla jsem změnit svou minulost ani rozhodování druhých. Mohla jsem ale postupně měnit svůj vztah k sobě, své hranice a vlastní rozhodnutí.',
        '<b>Přestala jsem jen reagovat na okolnosti a začala přebírat zodpovědnost za svůj život.</b>',
        'Pro mě to znamenalo přestat sama sebe opouštět. Uvědomit si, že za ubližování odpovídá ten, kdo ubližuje, a že já si mohu hledat podporu a cestu do bezpečnějšího života.',
        'Začala jsem jít do hloubky — skrze studium, kurzy, techniky, nejrůznější psychonautické výpravy, ale především skrze sebe.',
        'Učila jsem se pozorovat své myšlenky, reakce a opakující se vzorce. Rozpoznávat, co dělám ze strachu, co kvůli přijetí druhými a co skutečně vychází ze mě.',
        'Postupně jsem si začala skládat souvislosti. Chápat, proč se do některých situací vracím, co si z nich odnáším a kde potřebuji udělat změnu.',
        'A tehdy jsem si začala zvědomovat i svůj vlastní <b>„Kód Vědomí“</b>.'
      ]
    },
    {
      title: 'Co pro mě znamená můj vlastní kód',
      img: 'seal-33',
      seal: true,
      text: [
        'Součástí mého sebepoznání se stala také numerologie. Ve výkladu, se kterým pracuji, nesu <b>mistrovské číslo 33</b>, spojované s empatií, předáváním zkušeností a podporou druhých.',
        'Vnímám ho jako symbol daru i zodpovědnosti. Připomíná mi také témata, která dobře znám: dávat víc, než přijímám. Zachraňovat druhé. Hledat svou hodnotu ve výkonu a přitom zapomínat sama na sebe.',
        'Právě tím jsem si musela projít a stále procházím i já. Začalo mi dávat smysl, proč jsem tolik usilovala o to být lepší a proč mě to zároveň vždy táhlo k lidem, k hloubce, k růstu a k pochopení života.',
        'Čísla pro mě představují jazyk symbolů a souvislostí, který mi pomáhá klást si otázky a dívat se na sebe z dalšího úhlu. To, jak se svým životem naložíme, ale zůstává na nás.',
        'Moje cesta pokračuje. I dnes se učím držet rovnováhu mezi péčí o druhé a péčí o sebe.'
      ]
    },
    {
      quote: 'Jsem mostem mezi těmito světy.',
      img: 'about-speaking', pos: '88% 50%',
      lead: 'Mezi logikou a intuicí. Mezi hlavou a srdcem. Mezi každodenním životem a spiritualitou.',
      text: [
        'Zajímá mě, jak funguje naše mysl, jak nás ovlivňují návyky a vnitřní nastavení a jaký prostor dáváme tělu, emocím a vlastnímu prožívání. Vedle poznatků vědy má v mém životě své místo také osobní spirituální zkušenost.',
        'Velkou inspirací je pro mě <b>Joe Dispenza</b>. Miluji jeho práci, meditace a způsob, jakým otevírá téma osobní změny. Mám všechny jeho kurzy, které vyšly v češtině, a k jeho učení se ráda vracím. Oslovují mě témata neurovědy i jeho výklady inspirované kvantovou fyzikou. Jsou pro mě podnětem k dalšímu studiu, otázkám a vlastní praxi. Rozlišuji přitom mezi vědeckými poznatky, jejich interpretacemi a tím, co sama prožívám.',
        'Mým darem je slovo a silná intuice, které jsem ne vždy naslouchala. Dnes jí ve svém životě dávám větší prostor. Baví mě otevírat hluboká témata a předávat je srozumitelně, lidsky a v souvislostech s běžným životem.',
        'Naslouchám tomu, co člověk říká, a dávám prostor i tomu, co se mu zatím těžko pojmenovává. Sama znám chvíle, kdy člověk navenek funguje, ale uvnitř potřebuje, aby ho někdo opravdu vyslechl.',
        'A miluji také všechny ty obyčejné i neobyčejné dary života. Jsem požitkářka. Přestože hodně času trávím v meditacích, umím si život náležitě užít — i s občasným hříchem a chutí dopřát si radost.'
      ]
    },
    {
      title: 'Předávám to, co sama žiju.',
      img: 'blog-1',
      text: [
        'Všechno, co sdílím ze svého příběhu, jsem nejdřív odžila na vlastní kůži. To, co předávám dál, vychází také z mého studia, hledání a praxe.',
        'Nemám odpověď na všechno. Mám ale chuť dál se učit, ptát se a sdílet to, co může být užitečné i někomu dalšímu.',
        '<b>Tak vznikl Kód Vědomí — staré poznání v novém jazyce.</b>',
        'Prostor pro poznávání sebe sama, sdílení zkušeností a praktické kroky. Pro chvíle, kdy cítíš, že potřebuješ něco změnit, ale zatím nevíš, kde začít.',
        'Chci pomáhat lidem objevovat souvislosti, které jim dosud unikaly, rozpoznávat vlastní možnosti a začít svůj život vědoměji tvořit.',
        'Nabídnout inspiraci, informace, techniky i podporu. Tak, abys s nimi mohl/a pracovat vlastním tempem a s respektem k tomu, kde právě jsi.',
        'Nečekej ode mě zázraky bez práce. Změna potřebuje tvoje zapojení, ochotu podívat se na sebe upřímně a odvahu zkoušet nové kroky. Někdy malé. Někdy nepohodlné. A někdy i s pomocí, kterou si dovolíš přijmout.'
      ]
    },
    {
      quote: 'Miluju život. A vím, že život miluje mě.',
      text: [
        'Dnes cítím velkou vděčnost za to, co jsem se na své cestě naučila. Některé zkušenosti opravdu bolely a jejich pochopení potřebovalo čas. Nemusela bych si je vybrat znovu, abych dokázala ocenit, kam jsem od té doby došla.',
        'Pomohly mi lépe rozumět sobě, svým hranicím i tomu, co chci předávat dál. Znám pocit ztracenosti, tlak na výkon i potřebu zavděčit se. A znám také úlevu, když se postupně začneš rozhodovat víc v souladu se sebou.',
        'Věřím, že v sobě máme možnosti, které zatím ani nevidíme. Že stojí za to brát své touhy vážně a hledat, co pro jejich naplnění můžeme skutečně udělat.',
        '<b>Ráda se i na tvé cestě stanu průvodkyní, podporou a motivací.</b> Pomohu ti hledat vlastní odpovědi, uvidět možnosti, které možná přehlížíš, a pojmenovat kroky, které pro tebe budou dávat smysl.'
      ]
    }
  ],
  finale: {
    lead: 'Pokud si z mého příběhu odneseš jednu jedinou věc, přála bych si, aby to byla tato:',
    big: 'To, kde jsi dnes, nemusí být místo, kde zůstaneš.',
    text: 'Když jsem dokázala začít měnit svůj život já, věřím, že i ty můžeš najít svou cestu. Bude jiná než moje. Bude tvoje.',
    fordLead: 'Blízká je mi myšlenka připisovaná Henrymu Fordovi:',
    ford: '„Ať už si myslíš, že to dokážeš, nebo že to nedokážeš, máš pravdu.“',
    after: [
      'Připomíná mi, jak silně naše přesvědčení ovlivňují, do čeho se vůbec pustíme, jaké možnosti připustíme a zda po prvním nezdaru zkusíme pokračovat.',
      'Naše myšlenky ovlivňují, jak svůj život prožíváme a jak v něm jednáme. Proto pro mě vědomá změna začíná i tím, jak se sebou mluvíme, čemu o sobě věříme a co se rozhodneme udělat dál.',
      'Nemusíš mít hned celý plán. Někdy stačí začít jedním upřímným rozhodnutím.'
    ],
    welcome: 'Vítej v Kódu Vědomí.',
    sign: 'Sonia Edde Arael'
  }
};

/* ---------------- KOMUNITA ---------------- */
export const community = {
  title: 'Komunita',
  subtitle: 'V jednotě je síla. Najdi svůj prostor v Kódu Vědomí.',
  lead: 'Vyber si, kde se potkáme. Část obsahu je volně dostupná, hlubší praxe tě čeká v placeném členství.',
  foot: 'Každý začínáme jinde. Důležité je vykročit.',
  channels: [
    {
      id: 'herohero', name: 'Kód Vědomí na HeroHero', short: 'HeroHero', badge: 'Placené členství', paid: true, href: links.herohero,
      kicker: 'Prostor, kde jdeme společně do hloubky.',
      text: [
        'Chceš se na chvíli zastavit, vystoupit z každodenního shonu a věnovat pozornost sobě? Na HeroHero s tebou sdílím inspiraci, osobní zkušenosti i praktické techniky pro vědomější, zdravější a hlavně spokojenější život.',
        'Čekají tě tam nejrůznější informace, techniky jako meditace, afirmace, dechová cvičení, rozhovory i témata, která otevírají nové pohledy na sebe a svět kolem nás. Ale i věci z mého běžného života — natáčení, akce, focení, večírky, vaření, nakupování, make-up tutoriály, prostě vše, co ke mně patří a co skutečně žiju.',
        'Propojuji poznání s každodenní praxí — vlastním tempem, s otevřenou myslí a prostorem pro otázky. Přidej se k nám a objevuj, co můžeš ve svém životě tvořit vědoměji.'
      ],
      cta: 'Objevit Kód Vědomí na HeroHero'
    },
    {
      id: 'facebook', name: 'Kód Vědomí na Facebooku', short: 'Facebook', badge: 'Soukromá skupina · Zdarma', href: links.facebook,
      kicker: 'Místo, kde můžeš sdílet, inspirovat se a být mezi svými.',
      text: [
        'Přidej se do soukromé skupiny Kódu Vědomí, kde sdílím příspěvky, inspiraci a motivaci pro vědomější a spokojenější život.',
        'Prostor tu máš i ty. Můžeš sdílet své zkušenosti, myšlenky, otázky i to, co tě právě inspiruje nebo čím procházíš. Vzájemně se podporujeme, objevujeme nové pohledy a připomínáme si, že na své cestě nemusíme být sami.',
        'Nemusíš mít všechno vyřešené ani vědět, kde začít. Přijď tak, jak jsi — s otevřeností a respektem k ostatním.'
      ],
      cta: 'Přidat se do skupiny'
    },
    {
      id: 'instagram', name: 'Kód Vědomí na Instagramu', short: 'Instagram', badge: 'Sledování zdarma', href: links.instagram,
      kicker: 'Malé impulzy, které mohou proměnit tvůj den.',
      text: [
        'Někdy stačí jedna myšlenka, krátké video nebo připomenutí ve správnou chvíli, aby ses zastavil/a, nadechl/a a podíval/a se na věci jinak.',
        'Na Instagramu Kódu Vědomí s tebou sdílím reelska, střípky ve stories i každodenní inspiraci a motivaci pro vědomější, zdravější a spokojenější život. Najdeš tu praktické tipy, otázky k zamyšlení, pozvánky na chystané akce i momenty ze zákulisí.',
        'Potkávat se můžeme také při živých vysíláních, kde je prostor pro tvoje otázky, sdílení a společné objevování. Buď se mnou v kontaktu a vezmi si do svého dne to, co s tebou právě rezonuje.'
      ],
      cta: 'Sledovat Kód Vědomí'
    }
  ]
};

/* ---------------- BLOG ---------------- */
// Články se spravují v administraci. featured = hlavní článek, draft = koncept (na webu se nezobrazí), demo = ukázkový bez textu.
// Bloky: h = mezititulek, p = odstavec, q = otázka/zvýraznění.
export const blog = {
  subtitle: 'Novinky, inspirace a dění v Kódu Vědomí.',
  lead: 'Příběhy, nové pohledy i společné chvíle. Zůstaň v obraze.',
  filters: ['Vše', 'Vztahy', 'Duchovno', 'Zdraví', 'Inspirace', 'Komunita'],
  posts: [
    {
    featured: true, date: '2026-11-24', tag: 'Vztahy', img: 'blog-manipulator', title: 'Vztah s manipulátorem',
    text: 'Love bombing, kolotoč rozchodů a návratů i traumatická vazba. Moje osobní zkušenost a co mi pomohlo udělat řez.',
    body: [
      { p: 'Dávej pozor. I já jsem si prošla touhle obrovskou školou. A prošla jsem si jí víckrát. Vím, jak hluboce se můžeš zamilovat do někoho, u koho máš pocit, že ti konečně rozumí. A taky vím, jak dlouho se pak můžeš držet toho, co bylo na začátku, i když už vedle něj dávno zažíváš něco úplně jiného.' },
      { p: 'Možná právě teď čteš tyhle řádky a říkáš si, že něco z toho znáš. Jak já říkám, nic není náhoda.' },
      { h: 'Na začátku je to přesně to, co sis představovala' },
      { p: 'Je pozorný, umí být za gentlemana a všímá si věcí, které ostatním unikají. Zapamatuje si, co máš ráda, co ti v minulých vztazích chybělo i po čem toužíš. Najednou tě někdo zahrnuje pozorností a ty máš pocit, že tě opravdu vidí. A než se naděješ, jsi v tom až po uši. Tomu přívalu pozornosti, velkých slov a slibů se říká love bombing, když je součástí tlaku na rychlé sblížení. Jenže když to prožíváš, může ti to připadat jako láska, na kterou jsi celou dobu čekala.' },
      { p: 'Hodně se ukáže, když chceš na chvíli zpomalit. Vezme tvoje „dneska chci být sama“ v klidu? Nebo skončíš u vysvětlování, proč ho ještě pořád miluješ? A nebo vše proběhne v klidu, ale vzápětí přijde trest?' },
      { h: 'Červené prapory už vlají. Jenže ty máš pořád v hlavě ten začátek' },
      { p: 'Přistihneš ho při lži a on ti bez mrknutí oka nabídne další verzi. Řekneš mu, že ti něco ublížilo, a najednou se řeší tvoje reakce. A když se omluví, umí říct přesně to, co v tu chvíli potřebuješ slyšet. Otázka je, co se stane potom. Za týden se totiž můžete bavit o úplně stejné věci. A ty si říkáš: Vždyť na začátku se ke mně takhle nechoval. To jsem se v něm mohla až tak seknout?' },
      { p: 'Tohle pro mě bylo jedno z nejtěžších přiznání. Byla jsem zamilovaná i do představy, kterou jsem si o něm na začátku udělala. Každá hezká chvíle mi pak dávala důvod věřit, že se ten člověk, do kterého jsem se zamilovala, zase vrátí.' },
      { h: 'Když tě v tom drží právě ty chvíle, kdy je zase dobře' },
      { p: 'Chvíli je všechno nádherné, pak přijde hádka, chlad nebo ticho. A zrovna když máš pocit, že už toho máš dost, přijde něha, omluva nebo jeden krásný večer. Po tom všem napětí si konečně vydechneš. Ta úleva je tak silná, že si řekneš: Tak přece. Ještě to může být jako dřív. Ano, v takovém vztahu se člověk opravdu nenudí.' },
      { p: 'Já jsem ale postupně zjistila, kolik sil mě ten kolotoč stojí. Ráno přemýšlíš, v jaké náladě se probudí. Přes den řešíš, co znamenala ta poslední zpráva. Večer zvažuješ, jestli je vhodná chvíle otevřít něco, co tě už týden trápí. A mezitím skoro nemáš čas se zastavit a zeptat se, jak je vlastně tobě. A když jsme neřešili nás, řešili jsme jen jeho problémy a chaos, který v životě měl. Můj život jako by přestal existovat a práci i všechno ostatní jsem dělala s vypětím sil, tak nějak na autopilota. Když říkám, že mi takový vztah vysával energii, myslím přesně tohle. Najednou se velká část mého života točila kolem toho jeho. A protože jsem empat, velmi těžce říkám ne někomu, koho miluji.' },
      { h: 'Neustálé rozchody a návraty, aneb proč to může připomínat závislost?' },
      { p: 'V těle se při stresu aktivuje poplachová reakce, na které se podílejí adrenalin a kortizol. Když pak nečekaně přijde něco příjemného, do učení z takové odměny se zapojuje dopamin. S blízkostí se spojuje i oxytocin. Všechno se to nemusí odehrávat v přesném sledu. Podstatné je, že se můžeš naučit vyhlížet další chvíli něhy právě proto, že nevíš, kdy přijde. A časem tě může přitahovat i ta obrovská úleva, že napětí konečně povolilo.' },
      { p: 'V odborné literatuře se silné vazbě, kterou může udržovat střídání ubližování a vlídnosti spolu s nerovnováhou moci, říká traumatická vazba. Když jsem ve svém původním textu psala, že z takového vztahu může být závislost, myslela jsem právě ten pocit, kdy už víš, jak moc ti to ubližuje, a stejně čekáš, až se ozve. Mezitím nemáš čas se zastavit a všimnout si, kolik sebe a své energie jsi v tom vztahu nechala nebo nechal.' },
      { h: 'Jak dlouho trvá, než tě to přestane táhnout zpátky?' },
      { p: 'Rozchod má datum. Odpoutání ho většinou nemá. Síla vazby může polevovat postupně a ozývat se i po měsících. V jedné studii byla citová vazba na bývalého partnera po šesti měsících v průměru slabší, ale stále měřitelná. Možná se ti nejdřív uleví a pak tě rozhodí jediná zpráva, písnička nebo vzpomínka na to hezké. To, že se ti stýská, samo o sobě nic neříká o tom, jestli by ti návrat udělal dobře.' },
      { p: 'Po dlouhých letech vedle manipulátora může závislost povolit i až po několika letech. V tomhle případě určitě doporučuji vyhledat pomoc psychologa či terapeuta. Není se za co stydět. Pokud se z toho opravdu chcete dostat, udělejte to. Sami se z tak silných vazeb dostanou opravdu jen ti nejsilnější jedinci.' },
      { h: 'Jaký řez to chce?' },
      { p: 'Tohle je ta část, kterou jsem sama nechtěla slyšet. Když je to bezpečné a nemáte žádné společné závazky, řez pro mě znamená opravdu přerušit kontakt. Žádná kontrola sítí, žádné vyptávání přes známé, žádná schůzka „jen abychom si to ještě jednou vysvětlili“. Pokud vás spojují děti, bydlení nebo peníze, může řez znamenat držet komunikaci u nezbytných praktických věcí, pokud možno písemně. Když hrozí výhrůžky, pronásledování nebo násilí, je důležitější naplánovat bezpečný odchod s podporou než udělat rychlý řez o samotě.' },
      { q: 'A kdybych si tehdy měla položit jedinou otázku, byla by to tahle: Kdyby se mezi námi už nic nezměnilo, chtěla bych v tomhle vztahu dál žít tak, jak v něm žiju dnes?' }
    ]
  },
    {
      date: '2026-11-24', tag: 'Duchovno', img: 'blog-jiskra', title: 'Program, nebo jiskra?',
      text: 'Může bytost vypadat jako člověk, žít mezi námi, a přesto nemít duši? O jiskrách, programech a architektuře života.',
      body: [
        { p: 'Možná ti budou následující řádky připadat zvláštní. Ale jestli tě k nim něco přitáhlo, třeba se právě teď potkáváme u otázky, kterou si už nějakou dobu kladeš i ty. Jak já říkám, nic není náhoda.' },
        { p: 'Napadlo tě někdy, že bytost může vypadat jako člověk, mluvit jako my a žít mezi námi, a přesto v sobě nemít to, čemu říkám jiskra?' },
        { h: 'Kdo je jiskra a kdo program?' },
        { p: 'Jiskrou nazývám bytost, která má duši. Věřím, že duše smrtí těla nekončí, že je nesmrtelná a že její příběh může pokračovat v dalším životě.' },
        { p: 'Programem ve svém duchovním pohledu nazývám bytost, která má lidskou podobu a může žít mezi námi, ale lidskou bytostí v tomto smyslu není. Nemá duši. Když její život skončí, znovu se nenarodí. V jiném příběhu může podobnou úlohu sehrát jiný program.' },
        { h: 'Jakou úlohu tu programy mají?' },
        { p: 'Vezmeme-li v úvahu pojem Losh nebo představu takzvané farmy duší, možná už tušíš, kam mířím. V téhle představě se silné emoce, jako je strach, bolest nebo zoufalství, chápou jako zdroj energie. Programy nám podle tohoto pohledu často připravují ty nejtěžší zkoušky v životě. Právě při nich můžeme prožívat emoce tak intenzivní, že ještě dlouho po samotné události neseme její tíhu.' },
        { p: 'A tady se pro mě otevírá další otázka. Co když nás právě taková zkouška může zároveň probudit o stupeň víc v našem vědomí? Když jsem si procházela těžkým vztahem, viděla jsem hlavně to, co mě bolelo. Až s odstupem jsem si všimla, kolikrát jsem přešla něco, co mi vadilo, protože jsem doufala, že se vrátí to krásné ze začátku.' },
        { h: 'Je to součást plánu naší duše?' },
        { p: 'Když mluvím o architektuře života, představuju si, že některá setkání mají v příběhu naší duše své místo. A víš, co je pro mě na té představě nejodvážnější? Že jsme se na tom plánu možná podíleli my sami. Pak přijdeme sem, zapomeneme na něj a všechno prožíváme se vším, co to obnáší.' },
        { p: 'Smysl některých zkušeností jsem začala hledat až ve chvíli, kdy jsem z nich měla odstup. A pořád platí, že každý nese odpovědnost za to, jak se k druhým chová.' },
        { h: 'Dá se program poznat?' },
        { p: 'Když někdo lže bez mrknutí oka, působí chladně nebo jedná bezohledně, může mě napadnout, jestli právě tohle je program. Jenže i hluboce zraněná jiskra může lhát, manipulovat a ubližovat. Z chování druhého člověka jeho duši spolehlivě nevyčtu.' },
        { p: 'Můžu si ale všimnout toho, co se mezi námi opravdu děje. Respektuje moje „ne“? Změní se po omluvě něco? Můžu vedle něj říct, co mě bolí, aniž bych každé slovo předem třikrát zvažovala? Odpovědi na tyhle otázky mi pomáhají rozhodnout, koho si pustím blíž a koho nechám v patřičné vzdálenosti.' },
        { h: 'Když už tu křivdu nechci nosit dál' },
        { p: 'Někdy v sobě nosíme jednu křivdu celé roky. Pořád si přehráváme stejný rozhovor a napadá nás, co jsme tehdy mohli říct nebo udělat jinak. Pro mě odpuštění znamená, že se mi ta vzpomínka může vrátit, ale bez emocí, které ve mně tehdy vyvolávala. Pokud mám problém s odpuštěním, a někdy je to opravdu těžké, používám Ho’oponopono, havajskou techniku, která opravdu funguje, nebo jen afirmaci ODPOUŠTÍM A OSVOBOZUJI SE. O odpuštění samotném vás čeká článek zase příště.' },
        { p: 'Důležité je uvědomit si, že jakékoli neodpuštění bude mít vždy vliv hlavně na vás samotné. Nevěřili byste, kolik zdravotních problémů a blokád v hojnosti života může takové neodpuštění přinášet. Ať se nám v životě stalo cokoliv, když už se to stalo, nezměníme to. Můžeme z toho jen vytěžit, nebo být doživotně v roli oběti.' },
        { q: 'A tak ti tu nechám otázku, ke které se sama vracím. Když se ohlédneš za jednou ze svých nejtěžších zkoušek, co o sobě dnes víš, co ti tehdy ještě nedocházelo?' }
      ]
    },
    {
      date: '2026-11-24', tag: 'Zdraví', img: 'blog-hrebicek', title: 'Hřebíček',
      text: 'Malý zázrak našich babiček. Zázračná voda, ranní nápoj, ústní voda i domácí hřebíčkový olej.',
      body: [
        { p: 'Přiblížila se nám zima a co si budeme, období rýmiček, chřipek a všelijakých jiných moribundusů právě začíná. A tak vám tady na stránkách Kódu Vědomí nesu rychlou záchranu, kterou si velmi často pomáhám já. Drží mou imunitu, a když už mě něco skolí, velmi rychle mi zase pomůže zpět na nohy.' },
        { p: 'Ráno si z něj dělám voňavý nápoj s citronem a medem. Trochu stejného odvaru si můžu nechat i na ústní výplach. A večer před spaním si ráda rozžvýkám jeden celý hřebíček a zbytek spolknu. Nejen že podporuje zdravý spánek, ale mezitím, co ty spíš, se on věnuje očistě a ozdravení tvého těla. Myslím, že naprostým právem naše babičky považovaly právě hřebíček za malý zázrak.' },
        { p: 'Dnes už ho většina z nás zná jen z Vánoc při zdobení pomerančů, v létě jako repelent a ze svařáků, které v tomhle čase tečou proudem. Ale opravdu ti dokáže zlepšit zdraví ohromným způsobem. Tohle dělám pro své zdraví s hřebíčkem já. Tak se inspiruj, pokud chceš…' },
        { h: 'Zázračná voda' },
        { p: '15 celých hřebíčků povařím 8 minut v 0,5 l vody. Přeleji do konvice a tam je nechám ještě alespoň 3 dny louhovat, čím déle, tím lépe. Někdo si odvar přecedí do uzavřené sklenice a ponechá ho v lednici, tam by měl déle vydržet. Já ho mám na lince v měděné konvici, a vždy když mi dochází, doliju do něj horkou vodu a přidám čerstvé hřebíčky. V měděné konvici se voda nekazí. Jednou za cca 10 dní konvici obnovím stejným postupem.' },
        { h: 'Odvar, který piji každé ráno' },
        { p: 'Odleju si cca 1 dl odvaru a doliju horkou vodou do 300–400 ml. Přidám citron a lžičku medu. A můj žaludek se vznáší :-)' },
        { h: 'Ústní voda' },
        { p: 'Lžíci stejného odvaru smíchám se 3 lžícemi vody. Vychladlým výplachem si osvěžím ústa a vyplivnu ho. Nebo si ho dávám do zubní sprchy, výborná věc proti kazivosti zubů.' },
        { h: 'Domácí hřebíčkový olej' },
        { p: '10 suchých hřebíčků lehce rozmáčkni, zalij 30 ml jojobového oleje, na chvíli zahřej a přelij do čisté, suché lahvičky. Nech alespoň 7 dní louhovat v tmavé skleničce na poličce či ve skříňce a pak jemně přeceď. Vznikne voňavý olejový macerát.' },
        { p: 'Pokud ho chceš vyzkoušet, začni kapkou na malé ploše zdravé kůže na předloktí. Na obličej bych použila samotnou jojobu. Eugenol z hřebíčku může citlivou pleť podráždit.' }
      ]
    },
    { demo: true, tag: 'Inspirace', img: 'blog-1', title: 'Ráno, které začíná u tebe', text: 'Malé rituály pro vědomější začátek dne.' },
    { demo: true, tag: 'Komunita', img: 'blog-6', title: 'Prostor pro společné zastavení', text: 'Inspirace pro budoucí komunitní setkání.' },
    { demo: true, tag: 'Inspirace', img: 'blog-5', title: 'Chvíle ticha uprostřed běžného dne', text: 'Jak si vytvořit prostor pro sebe.' }
  ]
};

/* ---------------- E-SHOP (ceník od Sonie) ---------------- */
export const shop = {
  subtitle: 'Nástroje a inspirace pro tvou vědomou cestu.',
  lead: 'Vyber si osobní vedení, rozbor, online program nebo něco pro svůj každodenní rituál.',
  categories: [
    { id: 'produkty', img: 'prod-atlas-set', title: 'Produkty', text: 'Kyvadla, Atlas kyvadla v dárkovém balení a další pomocníci pro tvou praxi.', cta: 'Prohlédnout produkty' },
    { id: 'koucink', img: 'shop-koucink', title: 'Koučink', text: 'Osobní podpora a prostor pro tvou změnu.', cta: 'Prohlédnout nabídku' },
    { id: 'rozbory', img: 'shop-numero', title: 'Numero rozbory', text: 'Numerologický a karmologický rozbor – tvůj osobní kód i životní vzorce.', cta: 'Vybrat rozbor' },
    { id: 'programy', img: 'shop-programy', title: 'Online programy', text: 'Tvá cesta do hloubky, vlastním tempem.', cta: 'Prohlédnout programy' },
    { id: 'audio', img: 'shop-audio', title: 'Audionahrávky', text: 'Vedené meditace, afirmace a podprahové nahrávky.', cta: 'Prohlédnout nahrávky', soon: true },
    { id: 'ebooky', img: 'prod-atlas-kyvadlo', title: 'E-knihy', text: 'Atlas kyvadla v PDF ke stažení a další poznání Kódu Vědomí.', cta: 'Prohlédnout e-knihy' }
  ],
  detail: {
    koucink: {
      title: 'Koučink – prostor pro tvou změnu',
      intro: 'První krok můžeš udělat nezávazně. Úvodní setkání v délce 40 minut je zdarma. Seznámíme se, probereme, co právě řešíš, a získáš ukázku mé práce. Společně zjistíme, zda ti můj přístup vyhovuje.',
      free: 'Domluvit setkání zdarma',
      groups: [
        {
          title: 'Osobní koučink',
          items: [
            { name: 'Samostatná konzultace', meta: '60 minut', price: 3500 },
            { name: 'Balíček 5 hodin', meta: '1 hodina týdně po dobu 5 týdnů · 5 setkání', price: 15000, perks: ['Přístup na HeroHero zdarma na 5 týdnů', 'Sleva 5 % na online programy'], note: 'Jedna hodina vychází na 3 000 Kč' },
            { name: 'Balíček 10 hodin', meta: '1 hodina týdně po dobu 10 týdnů · 10 setkání', price: 30000, perks: ['Přístup na HeroHero zdarma na 10 týdnů', 'Sleva 10 % na online programy', 'Numerologický rozbor v ceně'], note: 'Jedna hodina vychází na 3 000 Kč', best: true }
          ]
        },
        {
          title: 'Online koučink',
          lead: 'Individuální konzultace online, odkudkoli se právě nacházíš. Zatím jako jednotlivé konzultace, bez balíčků.',
          items: [
            { name: 'Online konzultace', meta: '60 minut', price: 1500 },
            { name: 'Online konzultace', meta: '90 minut', price: 2000 }
          ]
        }
      ]
    },
    rozbory: {
      title: 'Numero rozbory',
      intro: 'Vyber si, kterým směrem se chceš podívat hlouběji. Podrobný obsah rozborů a způsob jejich předání budou brzy doplněny. Numerologický rozbor je také bonusem balíčku 10 hodin koučinku.',
      subs: [
        { id: 'numero', img: 'shop-numero', title: 'Numerologický rozbor', text: 'Datum narození jako mapa tvých darů a výzev.' },
        { id: 'karmo', img: 'shop-karmo', title: 'Karmologický rozbor', text: 'Pohled na životní vzorce a souvislosti.' }
      ],
      groups: [
        { id: 'numero', title: 'Numerologický rozbor', items: [{ name: 'Numerologický rozbor', meta: 'Osobní rozbor podle data narození', price: null }, { name: 'Tarotová numerologie + výklad', meta: 'Propojení čísel a tarotových archetypů', price: 4500 }] },
        { id: 'karmo', title: 'Karmologický rozbor', items: [{ name: 'Karmologický rozbor', meta: 'Pohled na životní vzorce a souvislosti', price: 3000 }] }
      ]
    },
    programy: {
      title: 'Online programy',
      intro: 'Na programech právě pracuji. Podrobné popisy, obsah a průběh budou doplněny – můžeš se ale už teď nechat zapsat mezi první zájemce.',
      groups: [{ items: [
        { name: 'Sebeláska', meta: 'Online program', price: 3333, soon: true },
        { name: 'Cyklická žena', meta: 'Online program', price: 5555, soon: true },
        { name: 'Velký transformační program', meta: '8 týdnů', price: 8888, soon: true }
      ] }]
    },
    produkty: {
      title: 'Produkty',
      intro: 'Pomocníci pro tvou každodenní praxi. Fyzické produkty posíláme Zásilkovnou, ceny jsou včetně DPH.',
      products: [
        { name: 'Balíček Kódu Vědomí', meta: 'Atlas kyvadla + Kyvadlo Anděl strážný v dárkovém balení', text: 'Praktický průvodce prací s kyvadlem v kroužkové vazbě a kyvadlo Anděl strážný v dárkové krabičce. Krásný dárek pro tebe i tvé blízké.', img: 'prod-atlas-set', price: 1500, physical: true, best: true },
        { name: 'Kyvadlo Anděl strážný', meta: 'v dárkové krabičce', text: 'Kyvadlo s andělskými křídly a přívěskem stromu života, uložené v dárkové krabičce s mašlí.', img: 'prod-kyvadla', price: 350, physical: true, variants: ['Růženín', 'Křišťál', 'Ametyst'] },
        { name: 'Měděná konvice a plecháčky Araël', text: 'Dárkové balení: ručně tepaná měděná konvice (2 l) a dva plecháčky (550 ml).', img: 'shop-produkty', soon: true },
        { name: 'Magnety Kódu Vědomí', text: 'Magnety s posvátnou geometrií – láska, zdraví, štěstí, vitalita, hojnost, vděčnost.', img: 'shop-magnet', soon: true },
        { name: 'Léčivé kameny', text: 'Kameny a krystaly pro tvou každodenní praxi.', img: 'prod-kameny', soon: true }
      ],
      groups: []
    },
    audio: {
      title: 'Audionahrávky',
      intro: 'Vedené meditace, afirmace a podprahové nahrávky ke stažení. Připravujeme – zapiš se a dáme ti vědět jako první.',
      groups: []
    },
    ebooky: {
      title: 'E-knihy',
      intro: 'Poznání Kódu Vědomí ke čtení, kdykoli a kdekoli. E-knihu dostaneš po zaplacení e-mailem jako odkaz ke stažení.',
      products: [
        { name: 'Atlas kyvadla', meta: 'E-kniha v PDF ke stažení', text: 'Kompletní průvodce prací s kyvadlem: základy a principy, testovací tabulky a šablony, diagnostika a harmonizace, ochrana a očista, rituály a pokročilé techniky.', img: 'prod-atlas-kyvadlo', price: 500, digital: true }
      ],
      groups: []
    }
  }
};

/* ---------------- KOŠÍK ---------------- */
// Zásilkovna 89 Kč potvrdila Sonia. Balíkovna a dárkové balení jsou zatím ZÁSTUPNÉ ceny.
export const checkout = {
  shipping: [
    { id: 'email', label: 'Elektronicky e-mailem', note: 'služby, rozbory, programy, e-knihy', price: 0, digital: true },
    { id: 'zasilkovna', label: 'Zásilkovna', note: 'výdejní místo nebo Z-BOX', price: 89 },
    { id: 'balikovna', label: 'Balíkovna', note: 'výdejní místo České pošty', price: 79 }
  ],
  giftWrap: { label: 'Dárkové balení s poštou', price: 99 }
};

/* ---------------- SONIA EDDE – mediální činnost ---------------- */
export const sonia = {
  title: 'Sonia Edde',
  roles: 'DJka · moderátorka · organizátorka akcí',
  headline: 'DJka, moderátorka a průvodkyně tvojí akcí',
  intro: 'Hudba, mikrofon a kontakt s lidmi. To je můj svět už více než 20 let.',
  introText: 'Potkat mě můžeš za mixážním pultem, v rádiovém éteru, na televizní obrazovce i na pódiích po celé republice. Ať už hraji, moderuji nebo pomáhám připravovat program, záleží mi na tom, aby si lidé odnesli zážitek, na který budou rádi vzpomínat.',
  bridge: {
    title: 'Jsem mostem mezi světy',
    text: 'Duchovní cesta a pozemský život se v mém pojetí prolínají. Patří do něj hloubka i lehkost, klid i divokost, meditace i tanec. Jsem mostem mezi světy, které se na první pohled mohou zdát neslučitelné.'
  },
  dj: {
    title: 'DJing: dvě velké lásky v jednom',
    text: [
      'Na DJingu miluji propojení svých dvou velkých lásek — hudby a moderování. Baví mě vnímat lidi na parketu, reagovat na jejich energii a vybírat hudbu, která je zvedne ze židlí.',
      'Hraji na firemních večírcích, svatbách, soukromých oslavách, open-air akcích, festivalech i v klubech. Za mixážním pultem jsem stála na <b>Ibize</b>, v pražském <b>Duplexu</b> i v dalších vyhlášených klubech. Jsem také součástí <b>Kissparty Live</b> — hudební tour rádia Kiss, se kterou vyrážíme za posluchači napříč republikou.',
      'Hraji multižánrově a hudbu přizpůsobuji typu akce i lidem na parketu. Vedle toho mám také vlastní drum and bassové a komerční techno sety pro ty, kteří si chtějí užít pořádnou taneční jízdu.',
      '<b>Chceš DJku, která tvoji akci zároveň odmoderuje? Ráda se postarám o obojí.</b>'
    ],
    photos: ['se-dj-1', 'se-dj-slavia', 'se-dj-bigbou']
  },
  mod: {
    title: 'Moderování: mikrofon je moje přirozenost',
    text: [
      'Do showbyznysu jsem vstoupila už v patnácti letech jako zpěvačka. Postupně mě ale moje cesta přivedla k moderování, které se stalo mou profesí i životní vášní. Zpěv mi zůstal jako milovaný koníček.',
      'V rádiích a televizi působím přes patnáct let. Začínala jsem v <b>Rádiu Jihlava</b>, pokračovala přes <b>Hitrádio Vysočina</b> a později zamířila do <b>Country Radia</b>, kde působím přibližně devět let.'
    ],
    showsTitle: 'Z televizních obrazovek mě můžeš znát například z těchto pořadů:',
    shows: [
      { name: 'Úplně debilní zprávy', note: 'satirická rubrika na Prima COOL' },
      { name: 'WTF', note: 'série humorných skečů na Prima COOL' },
      { name: 'ČSMT After Show', note: 'doprovodný pořad k soutěži Česko Slovensko má talent' },
      { name: 'Sexoňa', note: 'pořad TV Barrandov' },
      { name: 'Šlajska House', note: 'reality show' }
    ],
    text2: [
      'Vedle studií je mým druhým domovem živé pódium. Mám za sebou nespočet akcí — od komorních setkání v malých hospůdkách až po velké open-air akce s návštěvností kolem <b>25 000 lidí</b>.',
      'Moderuji firemní večírky, plesy, křty, festivaly, společenské události i programy pro děti a dospělé. Umím se držet scénáře, pohotově improvizovat i reagovat na nečekané situace. Každá akce má své publikum a svůj rytmus — a právě to mě na moderování tolik baví.'
    ],
    photos: ['se-podcast', 'se-mic', 'se-radio']
  },
  events: {
    title: 'Organizace akcí: od nápadu k realizaci',
    text: [
      'Akce nejen moderuji, ale také je pomáhám vymýšlet a organizovat. Za sebou mám dlouholetou praxi v event managementu a baví mě propojovat jednotlivé nápady v program, který dává smysl a přirozeně plyne.',
      'Ráda ti pomohu s konceptem, sestavením programu i koordinací jeho průběhu. Ať připravuješ soukromou oslavu, firemní večírek nebo větší veřejnou událost, společně najdeme podobu, která bude odpovídat tvým představám, publiku i rozpočtu.'
    ],
    photos: ['se-crowd', 'se-event']
  },
  // Ukázky práce – otevírají se na YouTube v nové záložce
  videos: [
    { title: 'Zpěvačka', img: 'se-stage', pos: '50% 20%', href: 'https://www.youtube.com/watch?v=ANLrf_qD7TI' },
    { title: 'DJka', img: 'se-dj-3', pos: '50% 30%', href: 'https://www.youtube.com/watch?v=k_rxQXkeMF8' },
    { title: 'Sexoňa · TV Barrandov', img: 'se-show', pos: '60% 50%', href: 'https://www.youtube.com/watch?v=zANjKlny9H8' },
    { title: 'WTF · Prima COOL', img: 'se-tv-2', pos: '50% 22%', href: 'https://www.youtube.com/watch?v=1LujsKOXZeQ' },
    { title: 'Úplně debilní zprávy', img: 'se-tv-1', pos: '50% 22%', href: 'https://www.youtube.com/watch?v=uOYDhp9_KKE' }
  ],
  stats: [
    { n: 20, suffix: '+', label: 'let s mikrofonem a hudbou' },
    { n: 15, suffix: '+', label: 'let v rádiu a televizi' },
    { n: 25000, suffix: '', label: 'lidí na největší open-air akci' },
    { n: 5, suffix: '', label: 'televizních pořadů' }
  ],
  // galerie – každá fotka jen jednou a žádná se neopakuje z horních sekcí
  gallery: ['se-dj-hero', 'se-redcarpet', 'se-talent', 'se-selfie', 'se-red', 'se-kiss', 'se-studio', 'se-sofa'],
  booking: {
    title: 'Pojďme vytvořit akci, na kterou se nezapomíná',
    text: [
      'Hledáš DJku, moderátorku nebo někoho, kdo ti pomůže s celým programem? Ozvi se mi.',
      'Napiš mi termín, místo a typ akce, předpokládanou délku vystoupení a zda potřebuješ zajistit také zvukovou aparaturu. Pokud ještě nemáš všechny podrobnosti, doladíme je společně.',
      'Cena se odvíjí od rozsahu spolupráce, délky vystoupení, typu akce a technických požadavků. Na základě tvé poptávky ti ráda připravím nezávaznou cenovou nabídku na míru.'
    ],
    priceFrom: 'Ceny služeb od 10 000 Kč',
    services: ['DJing', 'Moderování', 'Organizace akce', 'Kombinace']
  }
};

// Numerologie: číslo životní cesty – krátké ukázkové texty, Sonia je nahradí svými.
export const lifePath = {
  1: { name: 'Průkopník', text: 'Síla začátků, odvaha a vlastní cesta. Učíš se vést, aniž bys ztratil(a) srdce.' },
  2: { name: 'Prostředník', text: 'Citlivost, spolupráce a harmonie. Tvou silou je naslouchat a spojovat.' },
  3: { name: 'Tvůrce', text: 'Radost, výraz a kreativita. Slova a umění jsou tvým nástrojem.' },
  4: { name: 'Stavitel', text: 'Řád, vytrvalost a pevné základy. Proměňuješ sny v něco skutečného.' },
  5: { name: 'Poutník', text: 'Svoboda, změna a zkušenost. Život tě učí skrze pohyb a odvahu zkoušet.' },
  6: { name: 'Pečovatel', text: 'Láska, odpovědnost a domov. Učíš se dávat, aniž bys zapomněl(a) na sebe.' },
  7: { name: 'Hledač', text: 'Moudrost, intuice a vnitřní poznání. Hledáš pravdu pod povrchem věcí.' },
  8: { name: 'Manifestor', text: 'Síla, hojnost a vliv. Učíš se zacházet s mocí moudře a v rovnováze.' },
  9: { name: 'Humanista', text: 'Soucit, uzavírání cyklů a služba celku. Tvá cesta vede přes odpuštění.' },
  11: { name: 'Mistrovské číslo 11 · Světlonoš', text: 'Silná intuice a inspirace pro druhé. Vysoká citlivost je tvým darem i úkolem.' },
  22: { name: 'Mistrovské číslo 22 · Mistr stavitel', text: 'Schopnost uskutečnit velké vize. Spojuješ duchovní s praktickým.' },
  33: { name: 'Mistrovské číslo 33 · Mistr učitel', text: 'Bezpodmínečná láska a léčení skrze službu. Učíš svým příkladem.' }
};

/* ---------------- SEO a právní texty (spravuje se v administraci) ---------------- */
export const seo = {
  title: 'Kód Vědomí – Staré poznání v novém jazyce',
  description: 'Spirituální koučink, numerologie a komunita Sonie Edde Arael. Rozbory, online programy, e-shop a blog Kódu Vědomí.',
  image: 'hero-mandala'
};

export const legal = {
  terms: { title: 'Obchodní podmínky', text: '<p>Obchodní podmínky připravujeme. Do jejich zveřejnění nás prosím kontaktuj e-mailem.</p>' },
  privacy: { title: 'Ochrana osobních údajů', text: '<p>Zásady zpracování osobních údajů připravujeme. Do jejich zveřejnění nás prosím kontaktuj e-mailem.</p>' },
  complaints: { title: 'Reklamační řád', text: '<p>Reklamační řád připravujeme.</p>' }
};
