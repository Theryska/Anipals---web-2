# AniPals — web

Statický web AniPals: ověření hlídači mazlíčků po celé ČR.
Čisté HTML, žádný build ani instalace. Logo a ikony jsou vložené přímo v souborech.

## Stránky

| Soubor | Stránka |
|---|---|
| `index.html` | Domů |
| `jak-to-funguje.html` | Jak to funguje |
| `sluzby.html` | Služby |
| `cenik.html` | Ceník |
| `storno.html` | Storno podmínky |
| `caste-dotazy.html` | Časté dotazy |
| `kontakt.html` | Kontakt |

`.nojekyll` říká GitHub Pages, ať soubory nijak nezpracovává. Nemažte ho.

## Nahrání na GitHub a zveřejnění (GitHub Pages)

1. Na github.com vytvořte nový repozitář (např. `anipals-web`). Pro bezplatné GitHub Pages musí být **Public**.
2. V repozitáři klikněte na **Add file → Upload files** a přetáhněte **obsah** této složky (ne složku samotnou), tak aby `index.html` ležel v kořeni repozitáře. Potvrďte **Commit changes**.
   - Pokud se skrytý soubor `.nojekyll` nenahraje, vytvořte ho přes **Add file → Create new file** s názvem `.nojekyll` a prázdným obsahem.
3. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, Branch **main**, složka **/ (root)** → **Save**.
4. Za 1–2 minuty bude web na adrese `https://<vaše-uživatelské-jméno>.github.io/anipals-web/`.
5. Vlastní doménu (např. anipals.cz) nastavíte v **Settings → Pages → Custom domain** a u registrátora domény přidáte DNS záznamy podle návodu GitHubu.

Každá další změna nahraná do repozitáře se na webu objeví automaticky.

## Před spuštěním doplnit

- **Kontaktní formulář** zatím jen otevře e-mailový program návštěvníka s připravenou zprávou na info@anipals.cz (GitHub Pages neumí formuláře odesílat). Pro odesílání přímo z webu napojte službu typu Formspree nebo Web3Forms.
- Odkazy bez cíle (`href="#"`): Přihlásit se, Stáhnout aplikaci, Staňte se hlídačem, Instagram, Facebook, Obchodní podmínky, Ochrana osobních údajů, Cookies, přepínač CZ/EN.
- Storno podmínky a další právní texty jsou návrh. Před zveřejněním je nechte zkontrolovat právníkem.
