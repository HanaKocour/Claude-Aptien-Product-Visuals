# Aptien – Referenční menu (sidebar) k doslovnému zkopírování

*Kompletní levé menu — závazné pořadí a ikony. Při generování **vlož vždy
celé menu se všemi položkami**, ve stejném pořadí, se stejnými ikonami.
Nic nevynechávej, nepřidávej ani nepřejmenovávej.*

> ✅ **Nejjednodušší a nejspolehlivější cesta: vlož hotový statický blok
> `partials/sidebar-menu.html` CELÝ** (obsahuje všech 15 + 7 položek,
> inline SVG ikony, správné barvy, aktivní stav i badge). Neskládej menu
> z hlavy – jen přesuň aktivní stav na položku dle otevřené obrazovky a
> uprav personu. Tabulka níže je referenční přehled obsahu toho bloku.

> ✅ **Sbalený (collapsed) stav = samostatný soubor
> `partials/sidebar-menu-collapsed.html`.** Použij ho MÍSTO otevřeného
> menu jen na výslovné zadání ("sbalené menu", "zavřený sidebar",
> "collapsed", "jen ikony"). Jinak generuj vždy otevřený stav — to je
> výchozí chování (odpovídá `sidebarCollapsed:false` v master prototypu).

> **Ikony:** názvy ve sloupci „Ikona" jsou přesné soubory ze složky
> **`Awesome-font-icons/`** (Font Awesome, styl `solid` + `fw`).
> Použij právě tyto soubory.

> ⛔ **Ikony menu ber jako INLINE SVG z prototypu, NE jako Font Awesome
> třídy z Free CDN.** V master prototypu je renderuje funkce `mkNavIcon`
> z vložené mapy **`SVG_ICONS`** (klíč = pole `svg` dané položky). Proto
> jsou v prototypu vždy správně.
>
> **Proč to generátor kazí:** design system používá `<i class="fa-solid
> fa-…">` z **Free** CDN (`font-awesome/6.5.0`). Jenže část ikon menu jsou
> **Font Awesome Pro** a ve Free CDN NEEXISTUJÍ → vykreslí se jako prázdný
> čtvereček / špatný glyf. Konkrétně:
>
> | Položka | `svg` klíč | Pozn. |
> |---|---|---|
> | Moje směrnice, Nastavení směrnic | `books` | Pro (Free má jen `book`) |
> | Co jsem dělal | `chart-network` | Pro |
> | Nástěnka | `grid-horizontal` | Pro |
> | Reporty | `file-chart-column` | Pro |
>
> Design system „vypadá OK", protože jeho *vlastní* menu používá jinou,
> Free sadu (palette, font, keyboard…) – to není menu aplikace.
>
> **Správně:** ikony menu vždy z prototypu (`SVG_ICONS` / soubory v
> `Awesome-font-icons/`). Pokud přesto musíš použít FA třídy, buď načti
> **FA Pro**, nebo Pro ikony nahraď Free ekvivalentem (`books`→`book`,
> `grid-horizontal`→`table-cells` apod.) – ale první volba je prototyp.

> **Nejčastější chyby, kterých se vyvaruj:**
> 1. Vynechání položek (menu musí mít **všech 15 + 7** položek).
> 2. Označení špatné nebo více položek jako aktivní.
> 3. Záměna **badge** (počet) za **aktivní stav** (zvýraznění).

---

## Struktura sidebaru (odshora dolů)

1. **Hlavička profilu** – avatar + jméno + role + název pracovního prostoru
   (persona se mění dle zadání, ale skladba zůstává).
2. **Skupina „MŮJ PRACOVNÍ PROSTOR"** – 15 osobních položek (viz níže).
3. **Skupina „NAŠE FIRMA"** – 7 firemních položek (viz níže).
4. Menu je **sbalitelné** (jen ikony, přes šipku nahoře) a **rolovatelné**.
   Otevřený stav (výchozí, 220px) = `sidebar-menu.html`. Sbalený stav
   (56px, jen ikony, bez badge a nadpisů skupin, obsah vedle sidebaru se
   automaticky roztáhne) = `sidebar-menu-collapsed.html` — použij ho jen
   na výslovné zadání, jinak vždy generuj otevřený stav.

---

## Skupina 1 — MŮJ PRACOVNÍ PROSTOR (15 položek)

| # | Text položky | Ikona (soubor) | Badge |
|---|---|---|---|
| 1 | Moje domovská stránka | `house-chimney.svg` | – |
| 2 | Moje upozornění | `bell.svg` | **60** (alert) |
| 3 | Můj kalendář | `calendar-days.svg` | – |
| 4 | Moje úkoly | `clipboard-check.svg` | **7** (alert) |
| 5 | Moje konverzace | `comments.svg` | **5** (alert) |
| 6 | Můj tým | `people-group.svg` | – |
| 7 | Moje oblíbené | `star.svg` | **1** (grey) |
| 8 | Moje žádanky | `file-invoice.svg` | – |
| 9 | Moje hlídače | `dog.svg` | – |
| 10 | Ke schválení | `circle-check.svg` | **2** (alert) |
| 11 | Reporty | `file-chart-column.svg` | – |
| 12 | O mě | `user.svg` | – |
| 13 | Poznámky | `clipboard.svg` | **2** (grey) |
| 14 | Moje směrnice | `books.svg` | – |
| 15 | Co jsem dělal | `chart-network.svg` | – |

## Skupina 2 — NAŠE FIRMA (7 položek)

| # | Text položky | Ikona (soubor) | Badge |
|---|---|---|---|
| 1 | Nástěnka | `grid-horizontal.svg` | – |
| 2 | Směrnice a dokumenty | `book-open.svg` | – |
| 3 | Kolegové | `users.svg` | – |
| 4 | Katalog školení | `book-open-reader.svg` | – |
| 5 | Nastavení směrnic | `books.svg` | – |
| 6 | Nastavení organizace | `sitemap.svg` | – |
| 7 | Inventura | `boxes-stacked.svg` | – |

> Badge (počty) jsou ukázkové hodnoty; zobrazují se **pořád** u dané
> položky bez ohledu na to, která je aktivní.

---

## Pravidla aktivního stavu (zvýraznění)

- **Aktivní je vždy právě JEDNA položka menu** – ta, která odpovídá
  aktuálně otevřené obrazovce. Všechny ostatní jsou tlumené (neaktivní).
- **Nikdy nezvýrazňuj víc položek najednou** ani položku, která
  neodpovídá otevřené obrazovce.
- Pokud je otevřený **modul přes horní záložku** (tab strip) a nemá přímý
  protějšek v menu, nech jako aktivní výchozí **„Moje domovská stránka"** –
  nezvýrazňuj náhodnou položku.
- **Badge ≠ aktivní stav.** Čísla (60, 7, 5, 1, 2, 2) jsou počítadla, ne
  zvýraznění. Neplet si oranžový/šedý badge s označením aktivní položky.
- Ikony: Font Awesome `solid` + `fw` (zarovnané na šířku), soubory ze
  složky `Awesome-font-icons/`.

---

## Horní záložky (tab strip) – pro úplnost

Aktivní **záložka** (nahoře) **přebírá barvu svého modulu (`c800`)** – tj.
tu, kterou má text/ikona záložky, když je neaktivní (pozadí aktivní záložky
= její `c800`, text bílý). Pruh za taby je tmavě šedý `#424242` (dřív fialový
`#6200EA`). Barvy a ikony
jednotlivých záložek viz `Aptien-pravidla-pouziti-UI.md`, sekce *Tab strip*.

---

## Menu → obsah (routing) — kam „sáhnout" při generování

> **Klíčové:** položky menu nejsou samostatné komponenty. Obsah obrazovky
> žije v **master prototypu `Aptien-aplikace-offline.html`** jako blok
> `<sc-if value="{{ showX }}">…</sc-if>` v content area, řízený stavem.
> Design system tohle routování nezná – **závazný je prototyp.**

**Stav, který o obrazovce rozhoduje:**

- `activeNav` – `id` aktivní položky menu (viz `id` v `NAV_WORK` / `NAV_COMPANY`).
- `activeTab` – index otevřené horní záložky (`TABS`), nebo `null`.
- `navOwnsContent` – když `activeNav` je `smern` nebo `dok`, položka menu
  „vlastní" celou content area (překryje modul).

**Které obrazovky jsou v prototypu HOTOVÉ (a jejich flag → blok):**

| Položka menu (`id`) | Flag | Datový zdroj |
|---|---|---|
| Moje směrnice (`smern`) | `showSmernMain` / `showSmernDetail` | `DOCS`, `CONFIRMED_DOCS_LIST`, `SMERNICE_CATEGORIES`, `SMERNICE_CAT_DOCS` |
| Směrnice a dokumenty (`dok`) | `showDokTilesView` / `showDokDetailView` | `DOK_CATEGORIES` |
| Moje konverzace (`konv`) | `isKonv` (`konvShowList`/`konvShowDetail`) | `KONV_LIST`, `KONV_THREADS` |
| Rizika / Ochranné pomůcky / Zakázky / Zaměstnanec | přes `activeTab` (8 / 2 / 12 / 0) | modulová data |

Ostatní položky menu **zatím vlastní obrazovku nemají** → padají na
`showPlaceholder` / `showEmpty`. „Moje domovská stránka" = výchozí prázdný
stav.

**Jak vygenerovat obrazovku pro položku menu (obecný postup):**

1. Položka už je v `NAV_WORK` / `NAV_COMPANY` (má `id`). Nepřidávej duplicitně.
2. Přidej routing flag: `const showX = activeNav === '<id>' && …;`.
3. Pokud má překrýt modulovou plochu, přidej `id` do `navOwnsContent`.
4. V `navWork` / `navCompany` mapě přidej `id` do `clearTab`, ať otevření
   položky vynuluje `activeTab`.
5. Přidej blok `<sc-if value="{{ showX }}">…</sc-if>` do content area –
   **zkopíruj nejbližší existující obrazovku** (např. `showSmernMain`) a
   vyměň jen data.
6. Vystav `showX` (a případné render-vals) v `return {…}` objektu `renderVals`.

> **Kam sahá „Moje směrnice":** flag `showSmernMain`
> (`activeTab === 4 || activeNav === 'smern'`), blok v content area,
> data z `CONFIRMED_DOCS_LIST` / `DOCS` / `SMERNICE_CATEGORIES`. Když se
> nezobrazuje, není nastavené `activeNav = 'smern'` (nebo se generuje jen
> z design systému, který blok neobsahuje).
