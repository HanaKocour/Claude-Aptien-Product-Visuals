# TODO: Plné srovnání prototypů s app kitem (`Claude-HK-Aptien-App`)

Rozhodnutí uživatele: **srovnat všechno dle app kitu**, včetně identity
(top bar modrý, sidebar bílý, aktivní tab modrý). Zdroj hodnot =
`aptien-design-system-app.html`.

Doplňující rozhodnutí (2026-07-16, revize): **top bar zůstává fialový
`#6200EA`** (celý), **pruh se záložkami rovněž fialový `#6200EA`**,
**aktivní tab přebírá barvu svého modulu (`c800`)** – tj. tu, kterou má
text neaktivní záložky. **Sidebar srovnán na přesné hodnoty app kitu.**
Mobilní „AI souhrn" zůstává fialové `#6200EA`.

## ✅ Hotovo
- Desktop `Aptien-aplikace-offline.html`:
  - **top bar** ponechán fialový `#6200EA`, padding `0 18px` → `0 32px`.
  - **notifikační badge** okraj ponechán `1.5px solid #6200EA`.
  - **aktivní tab**: pozadí = **barva modulu `c800`** (bílý text);
    3px separátor pod pruhem rovněž `c800`. Neaktivní tab bílý s textem
    v barvě modulu (`c800`). (Modrá varianta zkoušena a vrácena zpět.)
  - **sidebar** (už byl světlý) srovnán na app kit: šířka `236px` → `220px`,
    pravý okraj `#ededf2` → `#ececec` (gray-10); nav-item padding `10px 18px`
    → `7px 12px`, radius `9px` → `6px`, font `12px` → `13px`, gap `13px` →
    `8px`, barva `#4a4660` → `#555`; aktivní tint `#eef4fe` →
    `rgba(21,114,232,.10)`; popisky skupin weight `600` → `700`, LS `.07em`
    → `.08em`, barva `#b0aac8` → `#878787` (gray-60).
  - **primární akce (PŘIDAT …)** v toolbarech: barva modulu (E91E63 /
    D84315 / 1565C0) → **`#1572e8`** (dle role „tlačítko = modré"); stín
    sladěn na modrou.
  - **toolbar hledání**: pozadí `#fff` + okraj `#e0dded` → `#f2f5f7` +
    `transparent` (app kit search).
- Mobil `Aptien-mobil-intranet.html`: tlačítko „AI souhrn" ponecháno
  fialové `#6200EA`. Mobilní home top bar je záměrně tmavý (`#111`,
  zaměstnanecký rozcestník) – ponechán, není to fialový leftover.
- Badge: obecný 4px, `.badge-deadline` 3px / **10px** (dle app kitu).
- Tokeny: aliasy šedých `--gray-05..80`, `--neutral #7D90A6`, body font Nunito.
- Pravidla přepsána: `CLAUDE.md` (tabulka barevných rolí) a
  `prototypes/Aptien-pravidla-pouziti-UI.md` (sekce 1, 4, 8, 9.1, 10).

## 🔵 Vědomě NEzměněno (app-kit hodnoty by rozbily layout prototypu)
Zdroj pravdy = `aptien-design-system-app.html`; tam, kde jeho „demo"
hodnoty kolidují s app-kit HTML nebo layoutem prototypu, platí prototyp:
- **Radius tlačítek 17px** (z projektových SCSS) – NEaplikováno. App-kit
  HTML používá pilulky (`btn-base` radius `50px`); toolbar tlačítka
  prototypu jsou pilulky `999px`, což je konzistentní. Ponecháno.
- **Drawer 65%** – NEaplikováno. Prototyp má záměrně široký dvousloupcový
  drawer (`80%`, `min-width:920px`); `65%` je jen velikost demo-stage
  v app kitu. Ponecháno.
- **Taby výška 40px** – tab strip prototypu používá padding `7px 15px`
  (browser-tab metafora), ne fixní výšku. Ponecháno.
- **Inputy** (radius 6px / padding 8px 12px / 14px) – pole ve drawerech
  nebyla samostatně auditována; drží styl prototypu. K ověření příště.

## ✔ Ověření
- Provedeno textově:
  - V desktop prototypu žádné `#6200EA` v identitě mimo: token
    `--a700-deep-purple` (ř. 54), **záměrný** tab strip (ř. 401) a
    avatar-data (ř. 1997).
  - Aktivní tab už nepoužívá `#E65100`/`c800`, ale `#1572e8`.
  - V mobilu jen token `#6200EA` (ř. 331).
- **Nedokončeno:** render přes prohlížeč – sandbox VM byl při této práci
  nedostupný. Doporučeno příště otevřít oba master prototypy přes lokální
  server a vizuálně ověřit (hlavně kontrast modrý aktivní tab na fialovém
  pruhu a čitelnost světlého sidebaru).
