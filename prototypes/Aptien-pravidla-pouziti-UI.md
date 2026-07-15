# Aptien – Pravidla použití UI

*Referenční „design guideline" odvozená z aktuálního master prototypu
`prototypes/Aptien-aplikace-offline.html`. Popisuje strukturu rozhraní,
menu, taby, moduly, chování, komponenty a vizuální styl (design tokeny).*

> **Zdroj pravdy je HTML prototyp, ne tento dokument.** Spec popisuje, co
> prototyp ukazuje; při tvorbě vizuálů se řídí strukturou prototypu a
> stylovými hodnotami z UI kitu aplikace. Aktualizováno podle verze
> prototypu z 15. 07. 2026.

---

## 1. Základní layout aplikace

Aplikace používá jednotný rámec (shell), stejný na všech obrazovkách,
odshora dolů a zleva doprava:

1. **Top bar (app bar)** – horní pruh přes celou šířku, výška **56 px**,
   pozadí **`#6200EA`** (brandová fialová), vlevo bílé logo + název
   pracovního prostoru.
2. **Tab strip** – lišta otevřených záložek/modulů pod app barem.
3. **Color separator** – tenká barevná linka mezi lištou záložek a obsahem.
4. **Levé menu (sidebar)** + **Content area** – navigace vlevo, hlavní
   obsah vpravo.

Nad obsahem se podle potřeby vysouvá **Item detail drawer** (panel detailu
záznamu) z pravé strany.

```
┌─────────────────────────────────────────────┐
│  TOP BAR (#6200EA, výška 56px)                │
├─────────────────────────────────────────────┤
│  TAB STRIP (barevné záložky)                  │
├─────────────────────────────────────────────┤ ← color separator
│ SIDEBAR │  CONTENT AREA        │ ITEM DETAIL  │
│ (menu)  │ (dashboard/kanban/   │ DRAWER →     │
│         │  tabulka/seznam)     │              │
└─────────────────────────────────────────────┘
```

---

## 2. Persona a pracovní prostor

Prototyp je naplněný ukázkovou personou:

- **Přihlášený uživatel:** *Karolína Fišerová* – role *Zaměstnanec*
  (avatar `assets/img/karAvatar.png`, viz `profile-images/`).
- **Pracovní prostor / firma:** *„Naše skvělá firma"* (top bar),
  *„Můj pracovní prostor"* (profil), firemní skupina menu *„Naše firma"*.
- **Další jména v ukázkových datech:** Jan Novák, Tomáš Novák,
  Kocourková Hana, Jana Nováková, Petr Kovář, Lucie Marková,
  Tomáš Dvořák, Eva Horáková, Martin Beneš.

---

## 3. Levé menu (sidebar)

Menu je rozdělené do dvou logických skupin. Každá položka = **ikona
(`fw`) + text**, případně **badge** (počet) vpravo. Aktivní položka je
zvýrazněná, ostatní tlumené. Menu je **sbalitelné** (jen ikony) a
**rolovatelné** nezávisle na obsahu; dole je sekce profilu.

### 3.1 Osobní / pracovní věci uživatele (NAV_WORK)

| Položka | Ikona | Badge |
|---|---|---|
| Moje domovská stránka | house | – |
| Moje upozornění | bell | 60 (alert) |
| Moje konverzace | comments | 5 (alert) |
| Můj kalendář | calendar-days | – |
| Moje úkoly | clipboard-check | 7 (alert) |
| Můj tým | people-group | – |
| Moje oblíbené | star | 1 (grey) |
| Moje žádanky | file-lines | – |
| Moje hlídače | binoculars | – |
| Ke schválení | circle-check | 2 (alert) |
| Reporty | chart-column | – |
| O mě | user | – |
| Poznámky | note-sticky | 2 (grey) |
| Moje směrnice | book | – |
| Co jsem dělal | clock-rotate-left | – |

### 3.2 Firemní evidence – „Naše firma" (NAV_COMPANY)

| Položka | Ikona |
|---|---|
| Nástěnka | table-cells-large |
| Směrnice a dokumenty | book-open |
| Katalog školení | graduation-cap |
| Inventura | boxes-stacked |
| Nastavení směrnic | gear |
| Nastavení organizace | sitemap |

**Badge:** `alert` = výrazný (akcent/červená) pro položky vyžadující
pozornost; `grey` = neutrální počítadlo.

---

## 4. Tab strip (otevřené moduly)

Otevřené záznamy/moduly jsou **barevné záložky** pod app barem, každá se
svou ikonou a barvou (`c800`). Aktivní záložka je zvýrazněná (oranžová),
neaktivní tlumené. Záložky mají zaoblené horní rohy a napojují se na obsah.

| Záložka | Barva `c800` | Ikona |
|---|---|---|
| Zaměstnanci | `#f1c40f` | users |
| Hotely | `#37474F` | hotel |
| Ochranné pomůcky | `#D84315` | helmet-safety |
| Smlouvy | `#37474F` | file-signature |
| Směrnice | `#1572e8` | book |
| Certifikáty | `#FF8F00` | award |
| Profesní certifikáty | `#E65100` | medal |
| Přijaté faktury | `#2E7D32` | file-invoice |
| Rizika | `#E91E63` | triangle-exclamation |
| Stavební stroje | `#37474F` | tractor |
| Stroje a zařízení | `#37474F` | gears |
| Zákazníci | `#0277BD` | building-user |
| Zakázky | `#1565C0` | briefcase |
| Stavby | `#2E7D32` | building |
| Audity a kontroly | `#FF8F00` | clipboard-check |
| Vydané certifikáty | `#00695C` | certificate |

---

## 5. Přepínání pohledů (view switcher)

Evidenční obrazovky umí zobrazit stejná data v několika pohledech,
přepínaných výsuvným „pill" přepínačem. Každá záložka si drží svůj pohled
(např. jedna v *dashboardu*, jiná v *kanbanu*).

| Pohled | Ikona | Poznámka |
|---|---|---|
| Dashboard | table-cells-large | přehledová obrazovka |
| Seznam | list | jednoduchý výpis |
| Kanban | table-columns | sloupce podle stavu |
| Tabulka | table | řádky × sloupce, stránkování po 10 |
| Kalendář | calendar | *„Vyžaduje připojení na internet"* (placeholder) |

Přepnutí pohledu nemění data, jen jejich prezentaci.

---

## 6. Moduly evidence

Prototyp obsahuje tyto plně vykreslené moduly (`drawerModule`:
`rizika` | `op` | `zakazky` | `zamestnanec`):

### 6.1 Rizika

Evidence kybernetických rizik. Dashboard: hero banner, **Matice rizik**
(stupně *NÍZKÉ / MÍRNÉ / VYSOKÉ / KRITICKÉ*), karty *Základní informace*,
*Přehled stavů*, *Poslední vytvořené*. Primární akce **PŘIDAT RIZIKO**.

- *Základní informace* (kategorie rizik): Rizika dat (71), software (1),
  sítě a komunikace (3), hardware (2), fyzické infrastruktury (1),
  procesů (0), nakupovaných služeb (3), lidských zdrojů (2).
- *Přehled stavů*: Bez stavu (71), Riziko k okamžitému řešení (4),
  Riziko k řešení (3), Akceptovatelná rizika (5).
- Detail (drawer) – pole: Název, Závažnost, Pravděpodobnost, Dopad,
  Vlastník (*Karolína Fišerová*), Termín řešení.

### 6.2 Ochranné pomůcky

Evidence OOPP. Dashboard: hero banner, karty *Kategorie pomůcek*,
*Platnost a kontroly*, *Přidělení zaměstnancům*, *Poslední přidané*.
Primární akce **PŘIDAT POMŮCKU**.

- *Platnost a kontroly*: Platné (28), Vyprší do 30 dní (4), Prošlé (2),
  Celkem (34).
- Detail – pole: Dodavatel, Kategorie, Přiděleno, Zodpovědná osoba,
  Norma / standard (např. *EN 397:2012*), Platnost do.

### 6.3 Zakázky

Přehled obchodních zakázek. Dashboard: hero banner, metrické karty
(*Celkem zakázek 10*, *V realizaci 3*, *Hodnota portfolia 1,3 M Kč*),
karty *Hodnoty zakázek*, *Zodpovědné osoby*, *Přehled stavů*,
*Poslední zakázky*. Primární akce **PŘIDAT ZAKÁZKU**.

- **Kanban sloupce:** Poptávka (`#DD2C00`), Nabídka poslána (`#FF8F00`),
  Realizace (`#558B2F`), Hotovo (`#00897B`), Zrušeno (`#9E9E9E`).
- **Tabulka – sloupce:** Prefix, Název položky / Název zakázky, Číslo
  zakázky, Kategorie, Stav, Popis zakázky, Termín dokončení, Přijaté
  faktury.
- **Filtry:** typ (*Výroba na zakázku / Sériová výroba / Dodávka*),
  stav (*Poptávka / Nabídka poslána / Realizace / Hotovo*).
- Detail – pole: Název zakázky, Zákazník, Zodpovědná osoba, Splněno
  (chip), Datum přijetí, Termín dokončení, Hodnota zakázky, Stručný popis.

### 6.4 Zaměstnanci / Zaměstnanec

Seznam zaměstnanců (dashboard placeholder *„bude přidáno v dalším
kroku"*) + detail zaměstnance (drawer). Detail – pole: Jméno, Příjmení,
Oddělení, Pracovní pozice, Datum nástupu, Typ úvazku, E-mail, Telefon.

### 6.5 Směrnice (dva pohledy)

- **Moje směrnice** (osobní) – *„Zkontrolujte a potvrďte své dokumenty"*,
  vyhledávání *„Vyhledejte dokument nebo kategorii"*, stav *Máte splněno!*
  / *Zbývá vám potvrdit N dokumentů*, štítky *po termínu / SPLNĚNO*,
  akce *OTEVŘÍT*, *POTVRDIT*, *Procházet Všechny dokumenty*.
- **Směrnice a dokumenty** (firemní) – *„Všechny oficiální směrnice,
  návody a materiály na jednom místě."*, členění na kategorie.

### 6.6 Konverzace

Panel konverzace s prvkem **AI SOUHRN**.

---

## 7. Detail záznamu (drawer)

Otevření záznamu ze seznamu/karty **vysune panel detailu zprava**. Panel
má vlevo **tenký barevný akcent** podle typu/stavu, hlavičku se jménem
záznamu, tělo s poli a **záložky detailu (item tabs)** a **akční tlačítka**.
Panel překrývá obsah; zavírá se zpět.

**Item tabs podle modulu:**

| Modul | Záložky detailu |
|---|---|
| Rizika | Detaily · Přílohy · Souvislosti · Úkoly · Konverzace |
| Ochranné pomůcky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Úkoly · Poznámky · Konverzace |
| Zakázky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Zápisy · Úkoly · Poznámky · Konverzace |
| Zaměstnanec | Detaily · Přílohy · Souvislosti · Kalendář · Úkoly · Poznámky · Konverzace |

**Akce v detailu** (sdílené, dle modulu): Oblíbená, Nový report, Moje
reporty, Online formuláře, Výsledky formulářů, Sdílet, Náhled, Oprávnění,
Historie změn, Uložit změny.

---

## 8. UI komponenty

| Komponenta | Popis a pravidla |
|---|---|
| **Top bar** | Fialový pruh (`#6200EA`, výška 56 px), vlevo bílé logo + název prostoru, vpravo akční ikony. |
| **Tab strip** | Barevné záložky otevřených záznamů; aktivní oranžová, zaoblené horní rohy, barva dle `c800`. |
| **Sidebar menu** | Dvě skupiny (osobní / „Naše firma"), ikona+text, badge, sbalitelné, rolovatelné, profil dole. |
| **Content area** | Hlavní plocha; hostí dashboard / seznam / kanban / tabulku. Světlé pozadí (`--canvas #f9f9fb`). |
| **View switcher** | Výsuvný „pill" přepínač pohledů (Dashboard / Seznam / Kanban / Tabulka / Kalendář). |
| **Hero banner** | Úvodní blok dashboardu s názvem oblasti a popisem. |
| **Metrické karty** | Číselné přehledy (např. *Celkem zakázek*, *Hodnota portfolia*). |
| **Karty (cards)** | Bílé pozadí, jemný okraj, zaoblení (`--radius-md 10px`), lehký stín (`--shadow`). |
| **Riziková matice** | Mřížka závažnosti NÍZKÉ / MÍRNÉ / VYSOKÉ / KRITICKÉ. |
| **Kanban** | Sloupce podle stavu s barevnou tečkou (dot) a hlavičkou. |
| **Tabulka** | Řádky × sloupce, stránkování po 10. |
| **Item detail drawer** | Vysouvací panel zprava, tenký barevný akcent, tělo + item tabs + akce. |
| **Badge** | Počítadlo u menu / záložek; `alert` (výrazné) nebo `grey` (neutrální). |
| **Tlačítka** | Primární (akcentová výplň, bílý text) pro hlavní akci; sekundární (obrys / světlé). |
| **Ikony** | Font Awesome 6 `solid` (výchozí), `brands`, `fw` (zarovnání). |

---

## 9. Vizuální styl (design tokeny)

Prototyp má token vrstvu v `:root`. **Vždy používej tyto proměnné, ne
natvrdo zapsané hodnoty.**

### 9.1 Barvy

**Interaktivní akcent (primární):**

- `--primary #1572e8`, `--primary-light #5b9cef`, `--primary-dark #0f50a2`,
  `--primary-deep #082e5d`, `--primary-wash rgba(21,114,232,.08)`.

**Brandová plocha:**

- Top bar `#6200EA` (`--a700-deep-purple`).

**Sidebar (tmavé menu):** tmavě fialová plocha `#1E1B2E`–`#3D3A52`,
tlumený lila text `#9A95AD` / `#B0AAC8`.

**Záložky:** aktivní oranžová (`#D84315` / `#E65100`), neaktivní tlumené.

**Sémantické (stavové):**

- Úspěch `--green #00C853`; varování `--amber #FFA200` / `--yellow #FFCD00`;
  chyba `--red #EF5350` / `--red-dark #D50000`, pozadí `--red-bg #FEE8E8`;
  `--danger #f73446`; info/cyan `--cyan #00B8D4`.

**Systémová paleta A700** (kategorie / štítky / rozlišení záznamů):

`#D50000` · `#C51162` · `#AA00FF` · `#6200EA` · `#304FFE` · `#2962FF` ·
`#0091EA` · `#00B8D4` · `#00BFA5` · `#00C853` · `#64DD17` · `#AEEA00` ·
`#FFD600` · `#FFAB00` · `#FF6D00` · `#DD2C00`.

**Neutrální (šedé):** `--white #FFFFFF`, `--canvas #f9f9fb`, `--g5 #F6F6F6`,
`--g10 #ECECEC`, `--g20 #CCCCCC`, `--g40 #B1B2B3`, `--g60 #878787`,
`--g80 #565656`, `--ink #1a1a1a` (text).

### 9.2 Typografie

- **Displej / nadpisy:** `--font-display: 'Nunito', system-ui, sans-serif`.
- **Text / body:** `--font-body: 'Open Sans', system-ui, sans-serif`.
- **Škála:** `--t-page 26px`, `--t-h2 20px`, `--t-h3 16px`,
  `--t-body 14px`, `--t-small 12px`, `--t-label 11px`.

### 9.3 Tvary, plochy, rozestupy

- **Zaoblení:** `--radius-sm 4px`, `--radius-md 10px`, `--radius-lg 14px`,
  `--radius-pill 999px` (pill přepínač, badge).
- **Stíny:** `--shadow 0 0 10px rgba(0,0,0,.10)`,
  `--shadow-soft 0 0 10px rgba(0,0,0,.06)`,
  `--shadow-pop 0 8px 28px rgba(0,0,0,.16)` (drawer, popovery).
- **Focus:** `--focus-ring 0 0 0 3px rgba(21,114,232,.15)`.
- **Pozadí:** obsah `--canvas`, karty bílé – jemný kontrast plochy.

### 9.4 Ikony

Font Awesome 6 – rodiny `Font Awesome 6 Free` (`solid`, výchozí),
`Font Awesome 6 Brands`. V menu, akční liště a tlačítkách vždy `solid` +
`fw` (fixed width) kvůli optickému zarovnání.

---

## 10. Shrnutí klíčových pravidel

1. Rámec aplikace (top bar `#6200EA` → tab strip → separator → sidebar +
   content) je **vždy stejný**; drawer se vysouvá zprava.
2. **Fialová `#6200EA` = brand/top bar, modrá `#1572e8` = akce,
   sémantické barvy = stavy.** Stylové hodnoty ber z tokenů `:root`.
3. Menu má dvě skupiny (osobní / „Naše firma"), je sbalitelné a
   rolovatelné, s badge (`alert` / `grey`) a profilem dole.
4. Otevřené moduly = barevné záložky (barva dle `c800`, aktivní oranžová).
5. Evidence nabízí pohledy Dashboard / Seznam / Kanban / Tabulka /
   Kalendář přes „pill" přepínač; pohled je per záložka.
6. Detail = drawer zprava s tenkým akcentem, item taby a sdílenými akcemi.
7. Typografie: Nunito (nadpisy) + Open Sans (text); ikony Font Awesome 6
   `solid` + `fw`.
8. Komponenty (drawer, karty, view switcher, badge, tlačítka) jsou sdílené
   a chovají se napříč moduly konzistentně.

---

*Poznámka: Dokument je odvozen z master prototypu
`Aptien-aplikace-offline.html`. Konkrétní texty, jména a hodnoty jsou
ukázková data z prototypu; závaznou předlohou struktury je vždy HTML
prototyp, stylové hodnoty drží UI kit aplikace.*
