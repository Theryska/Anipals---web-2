# AniPals — web (sjednocená verze)

Čtyři propojené stránky se sdíleným designem, hlavičkou, patičkou a chováním
(vodítko/scroll animace, roletky v menu, hamburger na mobilu).

## Obsah

- `index.html` — Domů
- `sluzby.html` — Služby (detailní karty + porovnání + Záchranná síť)
- `jak-to-funguje.html` — Jak to funguje (7 kroků, záložky Pro majitele/Pro hlídače, FAQ)
- `cenik.html` — Ceník (jak vzniká cena, platba, slevy, storno podmínky)
- `css/style.css` — **jeden sdílený stylopis** pro všechny stránky (barvy, typografie, komponenty)
- `js/script.js` — **jeden sdílený skript** (hamburger menu, roletky, záložky, FAQ, vodítko)
- `assets/logo.png` — reálné logo AniPals, použité v hlavičce všech stránek

## Co bylo sjednoceno

Čtyři soubory, které jste poslala, vznikly zjevně v různých kolech/sezeních —
každý používal mírně jiné názvy CSS proměnných a tříd (např. `--mustard-dark`
vs. `--mustard-ink`, `.section` vs. `.sekce` vs. `.sec`, čeští vs. angličtí
názvy tříd) a tři různé implementace stejné animované "vodítko" linky.
Sjednotila jsem to na jeden systém (podle nejnovější varianty — Domů a Jak to
funguje) a podle něj přepsala i Ceník a Služby. Hlavička, patička, tlačítka,
karty, tabulky a upozornění teď vypadají a chovají se úplně stejně na všech
čtyřech stránkách. Zároveň jsem do hlavičky všude vrátila vaše skutečné logo
(dřív ho mělo jen Domů a Jak to funguje, Ceník a Služby měly jen textovou
značku).

Navigace teď má na každé stránce stejné 3 rozklikávací položky (Jak to
funguje / Služby / Ceník), které vedou na sekce dané stránky — dřív to bylo
jen na jedné stránce z každé dvojice.

## Odkazy, které zatím nikam nevedou

Web odkazuje na několik stránek, které mezi zaslanými soubory nejsou a bude
potřeba je časem doplnit:

- `prihlaseni.html` — Přihlásit se
- `registrace-hlidac.html` — Staňte se hlídačem / registrace hlídače
- `podminky.html` — Obchodní podmínky
- `soukromi.html` — Ochrana osobních údajů
- `cookies.html` — Cookies

Do té doby povedou tyto odkazy na Cloudflare Pages na chybu 404 — to je
v pořádku, jde jen o přirozený důsledek toho, že tyto stránky ještě
neexistují. Odkaz „Stáhnout aplikaci" v hlavičce zatím míří na závěrečnou
sekci Domů (`#stahnout`) — pokud mobilní aplikace zatím neexistuje, stojí za
to tuto CTA později přeformulovat.

## Nasazení na Cloudflare Pages (přes Git)

1. Nahrajte **obsah** této složky (ne složku samotnou) do nového repozitáře
   na GitHubu — přes *Add file → Upload files* stačí přetáhnout `index.html`,
   `sluzby.html`, `jak-to-funguje.html`, `cenik.html`, `css/`, `js/` a
   `assets/`.
2. V Cloudflare Dashboardu: **Workers & Pages → Create → Pages → Connect to Git**.
3. Vyberte repozitář. **Build command nechte prázdné**, **output directory
   nastavte na `/`** (kořen repozitáře) — jde o čistý statický web bez
   buildovacího kroku.
4. Deploy. Dostanete adresu typu `*.pages.dev`, ke které pak můžete připojit
   vlastní doménu (Cloudflare Pages → Custom domains).

Každá další změna nahraná do repozitáře na GitHubu se automaticky znovu
nasadí.
