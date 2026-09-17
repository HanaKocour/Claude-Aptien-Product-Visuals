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
   pozadí **`#424242`** (tmavě šedá, dřív brandová fialová `#6200EA`),
   vlevo bílé logo + název pracovního prostoru.
2. **Tab strip** – lišta otevřených záložek/modulů pod app barem.
3. **Color separator** – tenká barevná linka mezi lištou záložek a obsahem.
4. **Levé menu (sidebar)** + **Content area** – navigace vlevo, hlavní
   obsah vpravo.

Nad obsahem se podle potřeby vysouvá **Item detail drawer** (panel detailu
záznamu) z pravé strany.

```
┌─────────────────────────────────────────────┐
│  TOP BAR (#424242, výška 56px)                │
├─────────────────────────────────────────────┤
│  TAB STRIP (#424242, aktivní tab = barva c800)│
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

#### 3.0 Výchozí stav sidebaru = SBALENÝ (PEVNÉ pravidlo)

> ⭐ **Výchozí stav menu je SBALENÝ (collapsed).** Odpovídá
> `sidebarCollapsed:true` v master prototypu. Otevřený (rozbalený) stav se
> generuje **jen na výslovné zadání.**

| Stav | Šířka | Obsah | Kdy |
|---|---|---|---|
| **Sbalený (VÝCHOZÍ)** | **56 px** | jen ikony (15 + 7), aktivní stav, avatar; **bez textů, bez nadpisů skupin, bez badgí** | vždy, pokud zadání nežádá jinak |
| Otevřený | 220 px | ikona + text, nadpisy skupin, badge, profil s jménem a rolí | jen na výslovné zadání („otevřené menu", „rozbalený sidebar", „menu s texty") |

Hotové bloky: `partials/sidebar-menu-collapsed.html` (výchozí) a
`partials/sidebar-menu.html` (otevřený). Přepínají se šipkou nahoře
(`fa-angles-right` ve sbaleném, `fa-angles-left` v otevřeném) přes
`toggleSidebar()`.

⛔ **SBALENÝ SIDEBAR NEZOBRAZUJE POSUVNÍK.** Obsah se dál roluje (22 položek
se do 864 px nevejde), ale scrollbar je **skrytý**:

```
scrollbar-width: none;  -ms-overflow-style: none;
.aptien-sb-collapsed::-webkit-scrollbar { width: 0; height: 0; }
```

V 56px pruhu by posuvník zabral přes desetinu šířky a opticky rozsekal
svislou řadu ikon. V **otevřeném** stavu posuvník zůstává normální.

Obsah vedle sidebaru má vždy `flex:1;min-width:0`, takže se při sbaleném
menu automaticky roztáhne o uvolněných ~164 px — nic se nepřepočítává.

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
| O mně | user | – |
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

Otevřené záznamy/moduly jsou **záložky** pod app barem na tmavě šedém pruhu
(`#424242`). **Aktivní záložka přebírá barvu svého modulu (`c800`)** – tj.
tu, kterou má její text/ikona, když je neaktivní: pozadí aktivní záložky =
její `c800`, text bílý. Neaktivní jsou bílé s textem/ikonou v barvě modulu.
Barevný separátor pod pruhem je u aktivní záložky rovněž v barvě `c800`.
Záložky mají zaoblené horní rohy a napojují se na obsah.

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
| Kalendář | calendar | **plný pohled** — období Den / Týden / Měsíc / 1 Rok, viz **§5.5** |

Přepnutí pohledu nemění data, jen jejich prezentaci.

> **Přepínání pohledů je VŽDY modré (`#1572e8`), nezávisle na modulu.**
> Aktivní pohled = lem a text `#1572e8` + tint pozadí `#e8f0fd`; neaktivní =
> bílé pozadí, šedý lem `#c8c4d8`, text `#3d3a52`. Nikdy nepřebírá barvu
> modulu ani barvu aktivní záložky. (Design system to renderoval špatně –
> závazné je chování v prototypu `Aptien-aplikace-offline.html`.)

### 5.1 Toolbar evidence (název, akce, hledání, přepínač)

Horní lišta evidenčního modulu má **vždy** stejnou skladbu a barevnost jako
v prototypu:

- **Ikona + název modulu** vlevo (název `16px/800`, tmavý `#1e1b2e`;
  ikona v barvě modulu `c800`), následovaný info/edit ikonou.
- **Primární akce „PŘIDAT …"** = pilulka **v barvě evidence (`c800`)**,
  bílý text, stín `0 2px 6px rgba(<c800 rgb>,.28)`. **Nikdy modrá** –
  viz §5.1.1.
- **Hledání** = pilulka s lupou, **bílé pozadí `#fff` + jemný okraj
  `1px solid #e0dded`** (aby nesplývalo se šedým okolím toolbaru). NE šedá
  výplň – ta se v toolbaru ztrácí.
- **View switcher** vpravo – **VŽDY viditelný a VŽDY všech 5 pohledů**
  (Dashboard · Seznam · Kanban · Tabulka · Kalendář), aktivní pohled
  **modrý** (viz výše). Žádný pohled nevynechávej, i když modul zatím
  nemá jeho vlastní layout (spadne do generického seznamu, ale tlačítko
  tam být musí).

Hledání ani view switcher barvu modulu **nepřebírají** – ta patří ikoně
názvu, aktivní záložce a **všem přidávacím akcím** (§5.1.1).

Toolbar (a v něm view switcher) je viditelný na **všech** pohledech
evidence – nezmizí při přepnutí z dashboardu na seznam/kanban/tabulku.

#### 5.1.1 „Přidat" = barva evidence — ale JEN na úrovni evidence

**Barva modulu (`c800`) patří přidávacím akcím v EVIDENCI. V itemu
(draweru) se barva modulu NEPOUŽÍVÁ — tam jsou všechna tlačítka
v defaultní modré `#1572e8`.**

| Prvek | Kde | Vzhled |
|---|---|---|
| „PŘIDAT …" v toolbaru | evidence | plná pilulka, `background: c800`, `color:#fff`, `11px/800`, `padding:6px 14px`, `border-radius:999px`, stín `0 2px 6px rgba(<c800 rgb>,.28)` |
| „+ Přidat" na konci kanban sloupce | evidence | text v `c800`, `12px/700`, ikona `plus` `11px` |

| Modul | `c800` |
|---|---|
| Rizika | `#E91E63` |
| Ochranné pomůcky | `#D84315` |
| Zakázky | `#1565C0` |
| Zaměstnanci | `#f1c40f` |

⛔ **Nikdy nepřebarvuj podle modulu:** view switcher, hledání, cokoli
uvnitř item draweru (včetně „+ přidat" v polích, „PŘIDEJ DALŠÍ DO",
kruhového „+" v Zápisech a „PŘIDAT AKTIVITU" v Plánech aktivit).
Vzhled tlačítek v draweru viz **§7.1.4**.

### 5.2 Načítání layoutu pohledu (routing pro generování)

> **Každý pohled = vlastní blok `<sc-if value="{{ showX }}">` v master
> prototypu, řízený stavem.** Generátor musí layout pohledu **vzít
> z prototypu**, ne skládat vlastní – design system layouty pohledů nezná.

**Stav, který o pohledu rozhoduje:**

- `views` – mapa `{ indexZáložky: 'klíčPohledu' }`; **každá záložka si drží
  svůj pohled** (jedna může být v `dashboard`, jiná v `kanban`). Default
  `{ 2:'dashboard', 8:'dashboard', 12:'kanban' }`.
- `activeView = views[activeTab] || 'dashboard'`.
- `setActiveView(key)` nastaví `views[activeTab] = key` (přepínač pohledů).

**Mapa pohled → flag → data. Referenční modul je *Zakázky* (tab 12) – má
všechny pohledy zvlášť:**

| Pohled | Flag (Zakázky) | Datový zdroj |
|---|---|---|
| Dashboard | `showZakDashboard` | `zak_statusRows`, `zak_valueRows`, `zak_respRows`, `zak_recentItems` |
| Seznam | `showZakList` | `zak_listRows` |
| Kanban | `showZakKanban` | `zak_kanbanCols` |
| Tabulka | `showZakTable` | `zak_tableRows` (stránkování `tablePageSize`) |
| Kalendář | `showCalendar` (generický) | `calVals(activeTab, calPeriods[activeTab])` — viz §5.5 |

> **Rizika (tab 8) a Ochranné pomůcky (tab 2) mají zatím jen dva layouty:**
> `dashboard` a generický **seznam** (`showRizikaList` / `showOPList` =
> `activeView !== 'dashboard'`, tj. Seznam/Kanban/Tabulka spadnou do
> stejného seznamu). Když nějaký modul potřebuje vlastní Kanban/Tabulku,
> **zkopíruj příslušný blok ze Zakázek** a vyměň data.

**Postup, jak vygenerovat konkrétní pohled:**

1. Nastav `views[<indexZáložky>] = '<klíč>'` (`dashboard` / `seznam` /
   `kanban` / `tabulka` / `kalendar`).
2. Vyrenderuj odpovídající blok `<sc-if value="{{ show… }}">` – zkopíruj
   ho z prototypu (referenční Zakázky), naplň jen data.
3. View switcher se řídí `activeView` a aktivní pohled je **vždy modrý**
   (viz §5).

### 5.3 Dashboard evidence — POVINNÁ skladba

> Dashboard (výchozí pohled evidence) má **vždy** tuto skladbu shora dolů.
> Generátor nesmí žádnou vrstvu vynechat – nejčastější chyba je vynechání
> hero banneru („toho pruhu") a start rovnou kartami. **To není dashboard.**

1. **Toolbar** (viz §5.1) – ikona + název modulu, „PŘIDAT …" v barvě modulu,
   hledání, **view switcher (všech 5 pohledů)**. Je nad obsahem, mimo blok
   dashboardu, a drží se na všech pohledech.
2. **Hero banner (gradientový pruh)** – **PRVNÍ prvek obsahu dashboardu**.
   2-stupňový gradient `135deg` (base `c800` → +30 % bílé, viz §9.1),
   radius `10px`, padding `28px 32px`, bílý text: **název modulu**
   (`26px/800`) + krátký **popis** (`13px`, `opacity .88`). Bez tohoto
   pruhu to není dashboard.
3. **Mřížka přehledových karet** – `grid-template-columns:1fr 1fr; gap:16px`,
   `align-items:start`. Karty: bílé pozadí, radius `10px`,
   `1px solid #eeedf4`, padding `20px`, hlavička (název `14px/700`
   `#1e1b2e` + ikona „rozbalit"). Obsah karet dle modulu (metriky, matice
   rizik, přehled stavů, poslední vytvořené…), ale **skelet je vždy stejný:
   hero banner → grid bílých karet**.

Referenční dashboard = modul **Rizika** / **Zakázky** v prototypu. Zkopíruj
celý blok `show…Dashboard` (obal `flex:1;overflow-y:auto;padding:16px 20px 20px`
→ hero banner → grid karet) a vyměň jen data. Nikdy nezačínej dashboard
rovnou kartami bez hero banneru.

### 5.4 Ostatní pohledy — POVINNÁ skladba (Seznam / Kanban / Tabulka / Kalendář)

> Stejně jako dashboard mají i ostatní pohledy pevný skelet. Referenční je
> modul **Zakázky** – zkopíruj příslušný blok a vyměň jen data. Toolbar
> (§5.1) je nad všemi pohledy; view switcher zůstává (všech 5).

**Seznam** (`showZakList` → `zak_listRows`): jedna bílá karta (radius `10px`,
`1px solid #e4e2ed`, jemný stín) se třemi vrstvami:
1. horní lišta s řazením („dle abecedy ↑", zarovnaná vpravo),
2. rolovatelný seznam řádků (ikona + název, hover),
3. spodní akční lišta (`#ebebef`, ikony: „…", složka | nahrát, stáhnout).

**Kanban** (`showZakKanban` → `zak_kanbanCols`): vodorovný scroll sloupců
(`min-width:210px; max-width:340px`). Sloupec = barevná hlavička
(`headerBg` + tečka `dot` + název + počet) → karty `.k-card`
(název + ikona, „⋮", datum) → řádek „+ Přidat". Barvy sloupců drží data.

**Tabulka** (`showZakTable` → `zak_tableRows`, `tablePageSize`): horní lišta
(počet položek, oko, výběr počtu `10 / 50 / 100`, „⋮") → scroll kontejner
s tabulkou: **sticky první sloupec** (akce oko + tužka), hlavička se
seřaditelnými sloupci + **řádek filtrů** (inputy/selecty), tělo řádků
(kategorie = chip, stav = pilulka, název = modrý odkaz).

**Kalendář** (`showCalendar` → `calVals()`): **vlastní plná skladba**, viz
**§5.5** — navigační lišta (`‹ ›` + název období + přepínač Den/Týden/Měsíc/
1 Rok) + mřížka období × položky. Dřívější placeholder „Tento pohled bude
dostupný v dalším kroku" **už neplatí**.

> Rizika a Ochranné pomůcky zatím vlastní Seznam/Kanban/Tabulku nemají –
> spadnou do generického seznamu. Když je potřeba plný pohled, **zkopíruj
> blok ze Zakázek** a vyměň data.


### 5.5 Kalendář — POVINNÁ skladba

> Kalendář zobrazuje **stejná data jako ostatní pohledy**, jen v časové ose.
> Referenční layouty = `partials/evidence-kalendar-zamestnanci*.html` (čtyři
> období) a blok `<sc-if value="{{ showCalendar }}">` v master prototypu.
> **Nezačínej kalendář od nuly** — vlož partial a vyměň data.

Skladba shora dolů:

1. **Toolbar evidence** (§5.1) — nad kalendářem, aktivní pohled *Kalendář*
   modrý. Nemizí.
2. **Navigační lišta kalendáře** — `‹` `›` **plné tmavě šedé kruhy**
   (`#424242`, bílá ikona, `29px`) → název období vycentrovaný
   (`17px/800`, `#1e1b2e`) → **přepínač období** vpravo.
   **Žádná legenda barev** — v aplikaci není.
3. **Mřížka** — bílá karta (`radius 10px`, `1px solid #e4e2ed`), uvnitř
   rolovatelná:
   - **sticky hlavička** (bílá, `border-bottom #e4e2ed`) — první buňka =
     název evidence („Zaměstnanci", „Zakázky", „Audity a kontroly"),
     dále buňky period;
   - **sticky levý sloupec** = položky evidence, jeden **řádek = jedna
     položka**, řazeno abecedně, `min-height:28px`;
   - **buňka** = svisle **stohované pruhy** (max 3) + `+další: N`
     (`10px/700`, `#8b8698`).

**Mřížka VŽDY vyplní celou šířku okna** — nikdy nezůstává zmenšená
s prázdným místem vpravo. Řádek i hlavička jsou `display:flex` a:

| Sloupec | Chování |
|---|---|
| **jmen** (první) | **pevný**: `width:Npx;flex:0 0 Npx` + `position:sticky;left:0` |
| **období** (ostatní) | **pružný**: `flex:1 1 0;min-width:Npx` — roztáhne se na dostupnou šířku |

Obal mřížky má `position:relative;min-width:<jmen + počet × min. sloupce>px`.
Při širokém okně se sloupce roztáhnou (a texty pruhů jsou čitelnější), při
úzkém spadnou na minimum a mřížka se **vodorovně roluje**.

Všechny buňky mají `box-sizing:border-box` — bez toho se mřížka rozjede
o šířku rámečků a padding.

#### 5.5.1 Barvy pruhů jsou PEVNÉ (role, ne dekorace)

| Typ záznamu | Barva | Kde vzniká |
|---|---|---|
| **Plánované aktivity** | **modrá `#0091EA`** | Plány aktivit (§7.1.3) — periodické i jednorázové |
| **Zápisy** | **červená `#EF5350`** | záložka Zápisy (§7.1.2) |
| **Události** | **fialová `#6200EA`** | termíny / události navázané na položku |

⛔ Tyto tři barvy **nepřebírají barvu modulu** a nemění se podle evidence.

Pruh: `border-radius:2px`, text `10px/600` bílý, jednořádkový s `…`, plný
text v tooltipu (`title`). **Časovaný záznam má čas na začátku pruhu tučně**
(`font-weight:800`, `margin-right:4px`) — `14:39 - 14:54 Zápis z jednání`,
`15 - 17 Meeting s dodavatelem`, `8:30 Pravidelná lékařská prohlídka`.

Zastoupení typů se liší podle evidence — **skladba je vždy stejná**:

| Evidence | Co v kalendáři převažuje |
|---|---|
| Zaměstnanci | plánované aktivity (modrá) + zápisy + události |
| Zakázky | **zápisy (červená) a události (fialová)**; modrá výjimečně (např. měsíční fakturace) |
| Audity a kontroly | **zápisy (červená) a události (fialová)**; modrá u periodických kontrol |

#### 5.5.2 Značka „teď"

Svislá linka **`#FF3D00`** (2 px) přes celou výšku mřížky + trojúhelník téže
barvy v hlavičce. Leží **proporčně v aktuálním sloupci** — v ročním pohledu
podle dne v měsíci, v pohledech po dnech podle času v rámci dne. Za sticky
sloupcem jmen se skrývá (`z-index:1` proti `z-index:2` sloupce).

⛔ Poloha se **nezadává v pixelech** (sloupce jsou pružné), ale **poměrem**:

```
left: calc(<šířka sloupce jmen>px + (100% - <šířka sloupce jmen>px) * k)
k = (index sloupce + podíl uvnitř sloupce) / počet sloupců
```

Trojúhelník je na `calc(<totéž> - 4px)`. Pevný pixelový offset by se při
roztažení okna rozjel.

#### 5.5.3 Přepínač období — Den / Týden / Měsíc / 1 Rok

> ⚠️ **Výjimka z §5.** Přepínač období **NENÍ view switcher** a **není
> modrý.** Je **tmavě šedý `#424242`** a aktivní volba se značí **inverzí.**

| Stav | Vzhled |
|---|---|
| **neaktivní** | plné pozadí `#424242`, **bílý text**, lem `#424242` |
| **aktivní** | **bílé pozadí**, text `#424242`, lem `#424242` |

Pilulka `padding:6px 15px`, `border-radius:999px`, `11.5px/700`. Vždy
všechny 4 volby, v pořadí **Den · Týden · Měsíc · 1 Rok**. Šipky `‹ ›`
mají stejnou šedou jako neaktivní pilulka.
⛔ Nikdy nepřebírá barvu modulu ani modrou `#1572e8`.

#### 5.5.4 Období a jejich mřížka

| Období | Sloupce | Sloupec jmen (pevný) | **Min.** šířka sloupce období | Nadpis |
|---|---|---|---|---|
| **Den** | 1 (dnešní den) | `240 px` | `1030 px` | `12. srpna 2026` |
| **Týden** | 7 dní | `240 px` | `147 px` | `10. – 16. 8. 2026` |
| **Měsíc** | dny měsíce (28–31) | `188 px` | `35 px` | `Srpen 2026` |
| **1 Rok** | 12 měsíců | `240 px` | `86 px` | `2026` |

Uvedené hodnoty jsou **minima**, ne pevné šířky — minima jsou nastavená tak,
aby se každé období právě vešlo do návrhové šířky 1536 px. V širším okně se
sloupce **roztáhnou rovnoměrně** na celou šířku (např. při 2600 px má měsíc
v ročním pohledu ~175 px a den v měsíčním ~69 px, takže texty pruhů jsou
čitelné bez tooltipu).

**Hlavička sloupce v pohledech po dnech = písmeno dne týdne + číslo dne
s tečkou:** `S 1.` `N 2.` `P 3.` `Ú 4.` `S 5.` `Č 6.` `P 7.` …
(Po=`P`, Út=`Ú`, St=`S`, Čt=`Č`, Pá=`P`, So=`S`, Ne=`N`; jednopísmenná
zkratka je záměrně nejednoznačná — takhle to má aplikace.) V ročním pohledu
jsou hlavičky `led` … `pro`.

⛔ **Pruh se NIKDY neroztahuje přes víc sloupců** — není to Gantt. Patří
vždy do buňky svého dne / měsíce; víc záznamů v jedné buňce se **stohuje
pod sebe**. **Víkendy se nepodbarvují.**

#### 5.5.5 Periodicita — jak se aktivita promítá do období

> Každá aktivita se v kalendáři zobrazí **podle své periody**, a to
> tolikrát, kolikrát do zobrazeného období spadne.

| Perioda aktivity | Den | Týden | Měsíc | 1 Rok |
|---|---|---|---|---|
| **denní** | 1× | 7× | 28–31× | 12× (jeden pruh v každém měsíci) |
| **týdenní** | 0–1× | 1× | 4–5× | 12× |
| **měsíční** | 0–1× | 0–1× | **1×** (na svém dni) | **12×** (v každém sloupci měsíce) |
| **čtvrtletní** | 0–1× | 0–1× | 0–1× | **4×** |
| **roční** | 0–1× | 0–1× | 0–1× | **1×** (v měsíci, kdy nastává) |
| **jednorázová** | 0–1× | 0–1× | 0–1× | 1× |

Obecné pravidlo ve dvou větách:

- **Aktivita s periodou kratší nebo rovnou šířce jednoho sloupce se v tom
  sloupci zobrazí jen JEDNOU.** Proto je denní aktivita v ročním pohledu
  vidět 12× — jednou za měsíc, ne 365× — a roční aktivita je v ročním
  pohledu vidět jen 1×, i když „rok se také opakuje".
- **Aktivita s periodou kratší než celé zobrazené období, ale delší než
  sloupec, se duplikuje do každého sloupce, do kterého spadne.**

Přebývající pruhy v buňce (nad 3) se schovají pod `+další: N`.

> **Kontrola konzistence dat.** Partialy `-mesic`, `-tyden` a `-den` vycházejí
> z **jednoho datasetu srpna 2026** — Měsíc = 1.–31., Týden = 10.–16., Den = 12.
> Roční pohled má ve sloupci `srp` **tytéž záznamy** (nad 3 pod `+další: N`).
> Když se data mění, měň je ve všech partialech i v prototypu současně,
> jinak přestanou na sebe navazovat.

#### 5.5.6 Zaměstnanci — dva zdroje aktivit

**U evidence Zaměstnanci se v řádku zobrazují dvě skupiny záznamů:**

1. aktivity, zápisy a události **vázané na položku** (na zaměstnance jako
   záznam) — školení, prohlídky, mzdové úkony, předání majetku;
2. aktivity, **kde je uživatel účastníkem** jiného záznamu — např.
   *„Interní audit ISO 9001 – účastník"*, *„Kontrola OIP – účastník"*.

Obě skupiny se zobrazují **stejnými pruhy, bez rozlišení** — barva se řídí
typem záznamu (§5.5.1), ne tím, odkud záznam přišel.

> U ostatních evidencí (Zakázky, Audity a kontroly, …) je zdroj jen jeden:
> záznamy vázané na položku.

#### 5.5.7 Stav a routing v prototypu

- `calPeriods` – mapa `{ indexZáložky: 'den'|'tyden'|'mesic'|'rok' }`;
  **období se drží per záložka** stejně jako `views`. Default `rok`.
- `setCalPeriod(key)` nastaví `calPeriods[activeTab] = key`.
- `showCalendar = (isZakázky || isZamestnanec || isAudity) && activeView === 'kalendar'`
  — **jeden generický blok pro všechny evidence**; data přepíná `calVals()`.
- `calVals(activeTab, period)` počítá hlavičku, řádky, styly buněk
  (`boxN` pevný sloupec jmen / `boxC` pružné sloupce období), `cal_innerStyle`
  s `min-width`, poměrovou značku „teď" a pilulky období. Datové konstanty: `CAL_ZAM_YEAR` / `CAL_ZAM_AUG`,
  `CAL_ZAK_YEAR` / `CAL_ZAK_AUG`, `CAL_AUD_YEAR` / `CAL_AUD_AUG`,
  geometrie `CAL_GEOM`, „teď" `CAL_NOW`.

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

**Zaměstnanec je jediná evidence se skutečně speciálním drawerem** (27. 8.
2026, podle reálné produkční aplikace) – zbytek draweru (rám, akční
sloupec, generické záložky) je stejný jako u ostatních modulů, ale navíc
má:

1. **vlastní záložku „Pracovní zařazení"**, kterou nemá žádná jiná
   evidence – viz **§7.1.6**;
2. **badge osoby v hlavičce** (druhý chip vedle kategorie), který se
   nikde jinde nepoužívá – viz **§7.1.7**.

Záložka **Detaily** má u Zaměstnance jiná pole než u ostatních modulů
(viz výše), ale **stejné zobrazení/chování vstupů** jako všude (§7.1.5) –
to není odchylka. Stejně tak záložka **Žádanky** (pokud je u záznamu
zapnutá) vypadá a chová se **stejně jako u kterékoli jiné evidence** –
není to specifikum Zaměstnance a nemá vlastní partial.

### 6.5 Audity a kontroly

Evidence auditů, kontrol a revizí (záložka 14, `c800 #FF8F00`, ikona
`clipboard-check`). Primární akce **PŘIDAT AUDIT**. Zatím má vlastní layout
jen pohled **Kalendář** (§5.5) — v něm převažují **zápisy** (červená) a
**události / termíny** (fialová), modrá u periodických kontrol (čtvrtletní
inventura, kalibrace měřidel). Ostatní pohledy spadnou do placeholderu
„Tento pohled bude přidán v dalším kroku"; až budou potřeba, **zkopíruj
příslušný blok ze Zakázek** a vyměň data.

### 6.6 Směrnice (dva pohledy)

- **Moje směrnice** (osobní) – *„Zkontrolujte a potvrďte své dokumenty"*,
  vyhledávání *„Vyhledejte dokument nebo kategorii"*, stav *Máte splněno!*
  / *Zbývá vám potvrdit N dokumentů*, štítky *po termínu / SPLNĚNO*,
  akce *OTEVŘÍT*, *POTVRDIT*, *Procházet Všechny dokumenty*.
- **Směrnice a dokumenty** (firemní) – *„Všechny oficiální směrnice,
  návody a materiály na jednom místě."*, členění na kategorie.

#### 6.6.1 Barva tlačítka „POTVRDIT" a štítku podle termínu (PEVNÉ pravidlo)

Na stránce **„Moje směrnice"** se barva potvrzovacího tlačítka a štítku
u každého dokumentu řídí **výhradně termínem potvrzení**. Barva se
**nedědí** od kategorie ani modulu a **není vždy červená** – to je častá
chyba při generování.

| Termín dokumentu | Barva | Tlačítko „POTVRDIT" | Štítek (badge) | Text štítku |
|---|---|---|---|---|
| **Dnes nebo v minulosti** (po termínu) | 🔴 červená | `#d9463e` | pozadí `#fde8e8`, text `#d9463e` | „X dní po termínu" |
| **Zítra** | 🟠 oranžová | `#FF6D00` | pozadí `#fff3e0`, text `#FF6D00` | „za 1 den" |
| **Pozítří a později** | 🟢 zelená | `#00C853` | pozadí `#e8f8ed`, text `#2E7D32` | „za X dní" (kolik zbývá) |
| **Bez termínu** | 🟢 zelená | `#00C853` | pozadí `#e8f8ed`, text `#2E7D32` | „∞ Bez termínu" (ikona nekonečna) |

Pravidla:

- **Červená = jen dnešek a minulost.** Nikdy neobarvuj červeně dokumenty
  s termínem v budoucnu – to je nejčastější chyba (vše skončí červené).
- **Oranžová = pouze zítřek** (přesně jeden den do termínu).
- **Zelená = vše s termínem pozítří a dál, plus „bez termínu".**
- **Zelené mají VŽDY štítek:** s termínem ukazuje **„za X dní"** (počet dní
  do splnění), bez termínu ukazuje **„∞ Bez termínu"** s ikonou nekonečna.
- Štítek se zobrazuje u **všech** stavů (červená / oranžová / zelená).
- Odpovídá funkci `getBadgeBtn` v prototypu: `overdue` → červená,
  `soon` → oranžová, `future` → zelená „za X dní", `noDeadline` → zelená
  „∞ Bez termínu".
- **Tvar štítku je hranatý**, ne pill: `border-radius: 3px`, padding
  `2px 6px`, **font-size `10px`** (Nunito) – hranatost dle třídy
  `.badge-deadline` a velikost dle typografie systémových štítků v app
  kitu (`Claude-HK-Aptien-App`: „systémové štítky / badge / micro labely
  = Nunito · 10px"). Zaoblený „pill" (`999px`) se pro štítky nepoužívá.

#### 6.6.2 Ukazatel „% SPLNĚNO" (PEVNÉ pravidlo)

Číslo v pravé části hero boxu je **podíl potvrzených dokumentů**, nic
jiného:

```
% SPLNĚNO = potvrzené dokumenty / všechny přiřazené dokumenty × 100
```

- **100 % nastane VÝHRADNĚ tehdy, když jsou potvrzené všechny dokumenty.**
  Dokud zbývá byť jediný nepotvrzený dokument, ukazatel nesmí být na 100 %
  a hero box nesmí být v zeleném stavu *„Máte splněno!"*.
- **Procenta se NEVÁŽOU na termín potvrzení.** Dokument po termínu, zítřejší,
  budoucí i bez termínu se do čitatele i jmenovatele počítá **úplně stejně**.
  Termín ovlivňuje **jen barvu** tlačítka a štítku (§6.6.1) a štítek
  *„N po termínu"* v hero boxu – **nikdy ne procenta**.
- **Jmenovatel se nezadává ručně.** Je to počet dokumentů k potvrzení plus
  počet již potvrzených (v prototypu `DOCS.length + CONFIRMED_DOCS_LIST.length`),
  takže se nemůže rozejít se seznamy na stránce. Nikdy nepiš do prototypu
  pevnou konstantu typu „celkem 29".
- Text pod pruhem je vždy **„N z M potvrzeno"** se stejnými čísly, ze
  kterých vzniklo procento. Procento se zapisuje s **mezerou před `%`**
  (`29 %`), dle české typografie.
- **Dlaždice kategorií se řídí stejnou logikou:** dokud má kategorie
  nepotvrzené dokumenty → modré **„N k potvrzení"**; když je vše potvrzené →
  šedé **„N dokumentů"**. Ve stavu 100 % tedy na žádné dlaždici nesmí zůstat
  „k potvrzení".

#### 6.6.3 Sbalitelná skupina „Potvrzeno" – kdy je otevřená a kdy zavřená

| Stav stránky | Sekce „Dokumenty" | Skupina „Potvrzeno" |
|---|---|---|
| **Nic nepotvrzeno** (0 %) | nadpis *„K potvrzení"*, všechny dokumenty v seznamu | **nezobrazuje se vůbec** (není co ukázat) |
| **Částečně potvrzeno** | nadpis *„K potvrzení"* + seznam nepotvrzených | sbalitelná skupina s ikonou ✔, názvem *Potvrzeno* a počtem – **výchozí stav ZAVŘENÝ** (`chevron-down`); rozbalí se **jen kliknutím** uživatele (`chevron-up`) |
| **Vše splněno** (100 %) | nadpis *„Potvrzeno"* | **žádná sbalitelná skupina** – potvrzené dokumenty jsou rovnou **rozbalený** seznam pod nadpisem |

- Skupina „Potvrzeno" je tedy **vždy zavřená po otevření stránky**
  (`smernConfirmedOpen: false`) – ať je potvrzený jeden dokument, nebo
  šestnáct. Otevírá ji výhradně uživatel klikem na hlavičku.
- **Právě potvrzený dokument se přesune** ze seznamu „K potvrzení" do
  skupiny „Potvrzeno", počet v zeleném štítku i procenta se okamžitě
  přepočítají.
- Řádek potvrzeného dokumentu má sloupec **„Potvrzeno"** s datem a časem a
  sekundární lemovanou akci **OTEVŘÍT** – nikdy tam není tlačítko POTVRDIT
  ani štítek termínu.

#### 6.6.4 Hotové bloky stránky „Moje směrnice"

Celá stránka je hotová ve čtyřech stavech – **neskládej ji z hlavy**, vlož
příslušný partial doslovně:

| Stav | Partial | Čísla v bloku |
|---|---|---|
| Částečně potvrzeno (**výchozí**, skupina „Potvrzeno" zavřená) | `partials/smernice-moje.html` | 5 z 17 → 29 %, 12 k potvrzení, 7 po termínu |
| Nic nepotvrzeno | `partials/smernice-moje-nepotvrzeno.html` | 0 z 17 → 0 %, 17 k potvrzení, 9 po termínu |
| Částečně potvrzeno, skupina „Potvrzeno" **rozbalená** | `partials/smernice-moje-potvrzeno-rozbaleno.html` | stejné jako výchozí, seznam otevřený |
| Vše splněno | `partials/smernice-moje-splneno.html` | 17 z 17 → 100 %, zelený hero |

Skladba všech bloků je shodná: nadpis + podnadpis → hledání (pilulka) →
hero box s procenty → sekce „Dokumenty" (K potvrzení / Potvrzeno) →
sbalitelná skupina „Potvrzeno" (jen když něco zbývá) → „Procházet /
Všechny dokumenty" s dlaždicemi kategorií. **Měň jen data**, nikoli logiku
procent (§6.6.2), barvy dle termínu (§6.6.1) ani chování skupiny (§6.6.3).

### 6.7 Moje konverzace (menu `konv`)

Obrazovka „Moje konverzace" (položka menu `konv`, `activeNav = 'konv'`) má
**dva stavy** řízené `openKonvId`:

- **Seznam** (`konvShowList`, když `openKonvId` je prázdné) – hotový blok
  `partials/konverzace-list.html`. Skladba: horní lišta (`#f3f3f7`) s
  hledáním (pilulka) a **modrým kruhovým „+"**, pod ní sloupec karet
  konverzací. Karta = ikona dle typu + název + čas, poslední zpráva,
  kategorie (uppercase), volitelně **zvoneček „ztlumeno"** (`bell-slash`)
  a šipka. **Ikona podle typu:** `doc` (šedý box, `file-lines`), `warn`
  (šedý kruh, `circle-exclamation`), `sheet` (zelený box, `table`), `pdf`
  (červený box, `file-pdf`), `img` (barevný box, `image`). Smazaná zpráva =
  kurzíva; „Zatím žádné zprávy" = tlumená.
- **Otevřený chat** (`konvShowDetail`, po kliknutí na kartu) – hotový blok
  `partials/konverzace-chat.html`. Skladba: title bar (**← zpět** vrací na
  seznam + název), sub-header (*Konverzace* · hledání · **AI SOUHRN** ·
  ⋮), bubliny zpráv, composer (spona + input + modré odeslání).

**Pravidla bublin (chat):** cizí zprávy jsou **vlevo, šedá bublina**
(`#9ba5ac`); **vlastní („Vy") vpravo, MODRÁ bublina** (`#2962FF`) přes
třídu `.toRight`. Avatar = kruh s iniciálami v barvě osoby. Datumové
oddělovače jsou šedé pilulky.

> **„AI SOUHRN" je fialové tlačítko `#6200EA`** (aptien fialová, ne modré,
> ne barva modulu) – jediná výjimka, drží se prototypu. Ikona
> `wand-magic-sparkles`.

**Konverzace v draweru:** stejné bubliny + composer jsou i jako **item tab
„Konverzace" v detailu záznamu** – hotový blok `partials/drawer-konverzace.html`
(vkládá se do levého těla draweru, pravý sloupec akcí zůstává). **Nahoře má
sub-header lištu „Konverzace" + hledání + AI SOUHRN + ⋮** (stejnou jako
otevřený chat; AI SOUHRN = fialové `#6200EA`). Viz §7.1.

---

## 7. Detail záznamu (drawer)

Otevření záznamu ze seznamu/karty **vysune panel detailu zprava**. Panel
má vlevo **tenký barevný akcent** podle typu/stavu, hlavičku se jménem
záznamu, tělo s poli a **záložky detailu (item tabs)** a **akční tlačítka**.
Panel překrývá obsah; zavírá se zpět.

> **Dvě varianty draweru — oba jsou PARTIALY, vkládej doslovně:**
>
> | Varianta | Kdy použít | Co vložit |
> |---|---|---|
> | **Obyčejný drawer** (VÝCHOZÍ, častější) | Detail **jednoho** záznamu otevřený ze seznamu/karty. | `partials/item-drawer-shell.html` + do slotu obsah záložky (pole *Detailů* z `partials/evidence-drawer.html`) |
> | **Vrstvený drawer** (stoh spine) | Otevřeno je **víc navázaných záznamů nad sebou** – proklik z jednoho záznamu do souvisejícího (např. z vozidla na přiděleného zaměstnance). | `partials/item-drawer-stacked.html` + do slotu obsah záložky |
>
> #### Rozhodovací pravidlo (dodržet přesně)
>
> 1. **Výchozí je vždy obyčejný drawer** (`item-drawer-shell.html`).
> 2. Vrstvenou variantu (`item-drawer-stacked.html`) použij **jen když je v
>    zadání spínač**: „proklik do souvisejícího záznamu", „dva/víc otevřených
>    záznamů", „nad sebou", „stoh", „vrstvení", „breadcrumb otevřených
>    záznamů", nebo modulová **akční tlačítka v hlavičce** („Předání
>    zaměstnanci", „Tisk protokolu").
> 3. **Když to ze zadání není jednoznačné → ZEPTEJ SE.** Nehádej a nekombinuj
>    obě varianty.
> 4. Ani v jednom případě nestav drawer z hlavy a **neber strukturu z
>    `item-drawer-prototyp.html`** – ten je jen klikací ukázka (má vlastní
>    `.kd-*` CSS, které se do generovaných obrazovek nehodí).
>
> Rozdíl variant je **jen** ve třech místech: počet spine, akční tlačítka
> v hlavičce a přetékací „›" u tabů. Akční sloupec (§7.2), rozměry panelu,
> hlavička a taby jsou v obou shodné.

**Item tabs podle modulu:**

| Modul | Záložky detailu |
|---|---|
| Rizika | Detaily · Přílohy · Souvislosti · Úkoly · Konverzace |
| Ochranné pomůcky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Úkoly · Poznámky · Konverzace |
| Zakázky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Zápisy · Úkoly · Poznámky · Konverzace |
| **Zaměstnanec** ⚠ jediný modul se speciálním drawerem, viz §6.4 | Detaily · Plány aktivit · Přílohy · Souvislosti · Kalendář · **Pracovní zařazení** (jen zde, §7.1.6) · Zápisy · Úkoly · Poznámky · Konverzace · **Onboarding** (jen zde, POSLEDNÍ tab, §7.1.8) |

**Akce v detailu:** závazný výčet, pořadí a styly jsou v **§7.2**. Rám
draweru (backdrop → panel → spine → hlavička → item tabs → tělo + akční
sloupec) je hotový v partialu **`partials/item-drawer-shell.html`** –
vlož ho doslovně a do slotu přidej obsah aktivní záložky.

### 7.1 Skelet panelu (POVINNÁ skladba)

> Referenční je drawer modulu **Zakázky** (`drawerZakOpen`). Zkopíruj celou
> strukturu a vyměň jen data – neskládej vlastní layout.

- **Podklad (backdrop):** `position:fixed;inset:0;background:rgba(0,0,0,.15)`,
  klik zavírá panel.
- **Panel:** `position:fixed;top:0;right:0;bottom:0;`, **šířka `80%`
  (`min-width:920px`)**, bílé pozadí, stín `-8px 0 32px rgba(0,0,0,.18)`,
  animace `drawerIn`, dvousloupcový (`flex-direction:row`). (Prototyp má
  záměrně široký dvousloupcový drawer – ne 65 %.)
- **Svislý pruh (spine)** `38px` vlevo: ikona modulu + svislý název záznamu.
- **Hlavní část:**
  1. **Hlavička** – název záznamu (`26px`, tenký řez `300`), kategorie jako
     chip (`#eceff1` / `#59676d`), placeholder obrázku (`110px`, přerušovaný
     okraj) a křížek „zavřít".
  2. **Item tabs** (viz tabulka výše) – volitelný počet = **modrý** badge
     `#1572e8`.
  3. **Tělo** – **levý sloupec**: obsah aktivní záložky (u *Detailů* pole
     záznamu, řádky `min-height:52px`, oddělovač `#f0eef8`); **pravý
     sloupec akcí** (`210px`, `border-left`) dle §7.2 + blok
     *ID / Vytvořeno / Vytvořil / Poslední úprava*.

> **Rám neskládej z hlavy** – vlož doslovně `partials/item-drawer-shell.html`
> (backdrop, panel, spine, hlavička, item tabs, tělo se slotem, kompletní
> akční sloupec, blok metadat) a měň jen data. Obsah záložky vkládej do
> vyznačeného slotu.

**Obsah jednotlivých záložek = hotové partialy do slotu:**

| Záložka | Partial | Skladba (zkráceně) |
|---|---|---|
| Detaily | `partials/drawer-tab-detaily.html` | svislý seznam polí – řádek `min-height:52px`, ikona nápovědy `32px` + label `210px` vpravo + hodnota; **8 typů polí, chování vstupů viz §7.1.5** |
| Souvislosti | `partials/drawer-tab-souvislosti.html` | řádek nástrojů (oko · graf · „PŘIDEJ DALŠÍ DO") → skupiny navázaných záznamů, **bez grafu** |
| Souvislosti **s grafem** | `partials/drawer-tab-souvislosti-graf.html` | totéž + graf `740 × 480` a odkaz „Skrýt graf" — **jen na výslovné zadání** |
| Zápisy | `partials/drawer-tab-zapisy.html` | 4 šedé filtry → hlavička (kruhové „+", sloupce, EXPORT) → časová osa s kolečky dle typu |
| Plány aktivit | `partials/drawer-tab-plany.html` | „PŘIDAT AKTIVITU" (**sekundární** lemovaná pilulka) → karty skupin (hlavička `#efeef4` + počet + stavové chipy), **všechny sbalené** |
| Plány aktivit – **rozbalená skupina** | `partials/drawer-tab-plany-rozbaleno.html` | 3 varianty rozbalené skupiny (splněné aktivity / čekající na akci / hromadné akce) — **jen na výslovné zadání** |
| Konverzace | `partials/drawer-konverzace.html` | bubliny + composer |
| **Pracovní zařazení** (jen Zaměstnanec) | `partials/drawer-tab-pracovni-zarazeni.html` | pole pod sebou s tučným popiskem nahoře (ne řádkový layout Detailů): Nadřízený (1 tag v rámečku) → Podřízení (needitovatelný seznam) → Pracuje na pozici (1 tag + odkaz na požadavky) → Organizační jednotka (prázdný stav) → Uživatelská skupina (víc tagů); ULOŽIT vpravo dole, **viz §7.1.6** |
| **Onboarding** (jen Zaměstnanec, POSLEDNÍ tab) | `partials/drawer-tab-onboarding.html` | hlavička + „STÁHNOUT SOUHRN (PDF)" → progress bar „Splněno X z Y" (jen z položek) → sbalitelné fáze nástupu (položky + aktivity, chip „N splněno"/„N zbývá") → readonly „Směrnice platné pro tohoto zaměstnance"; badge rozsahu jen když NENÍ „Pro všechny" (modrý „Pro pracovní pozici" / fialový mazatelný „Pouze pro tohoto zaměstnance"), **viz §7.1.8** |

Sady záložek podle modulu jsou v tabulce výše; **záložka bez partialu má
prázdný stav** (ikona modulu + název záložky), ne vymyšlený obsah.

> ⚠ `partials/evidence-drawer.html` je **starší celý drawer** – pro nové
> vizuály ho nepoužívej. Rám ber ze shellu, pole z `drawer-tab-detaily.html`.

#### 7.1.0 Výchozí stavy v draweru (PEVNÉ pravidlo)

**Co má být rozbalené nebo zobrazené, určuje ZADÁNÍ. Bez zmínky platí
nejjednodušší stav:**

| Prvek | Výchozí stav (bez zmínky v zadání) |
|---|---|
| Skupiny v **Plánech aktivit** | **všechny SBALENÉ** (chevron „›"), žádné řádky aktivit vidět |
| Skupiny navázaných záznamů v **Souvislostech** | **všechny SBALENÉ** |
| **Graf souvislostí** | **SKRYTÝ** – použij variantu `drawer-tab-souvislosti.html` |
| Graf **s daty** (uzly, spojnice) | jen na **výslovné zadání** („se grafem") → `drawer-tab-souvislosti-graf.html` |
| Item tab | **Detaily** |
| „Uložit změny" | šedé/neaktivní (§7.2) |

Pravidla:

1. **Nerozbaluj nic „pro ukázku".** Když zadání neřekne, která skupina je
   otevřená, jsou všechny sbalené.
2. **Rozbalí se jen to, co zadání jmenuje** – např. *„Plány aktivit,
   rozbalená skupina Školení a osobní rozvoj"*.
3. **Graf si nikdy nedomýšlej.** Bez zmínky se nekreslí ani prázdná plocha
   – v záložce je jen řádek nástrojů a seznam skupin.
4. Chevron musí odpovídat stavu: sbalené `fa-chevron-right`, rozbalené
   `fa-chevron-down`. Nikdy nenech `chevron-down` u sbalené skupiny.

> **Jak to napsat do promptu:** *„…záložka Plány aktivit, rozbalená
> skupina Nástup zaměstnance"* nebo *„…záložka Souvislosti se grafem"*.

#### 7.1.5 Záložka Detaily — pole a chování vstupů

Řádek pole je vždy stejný: **ikona nápovědy `32px`** → **label `210px`
zarovnaný vpravo + tužka** → **hodnota** (`padding:0 18px`).
Řádek `min-height:52px`, `padding:10px 0`, spodní linka `1px solid #f0eef8`.

**Šířky hodnot — pravidlo:** text jednořádkový, text víceřádkový a výčet
jsou `width:100%` sloupce hodnoty, takže jsou **vizuálně stejně široké
a zarovnané pod sebou**. Jediná výjimka je **datum** (`120px` + ikona
kalendáře) — to zůstává přesně jako v prototypu, neroztahuj ho.

| Typ pole | Vzhled a chování |
|---|---|
| **Text jednořádkový** | krátká hodnota. `<input>` `width:100%`, lem `1px solid #e0dded`, `radius:4px`, `padding:6px 10px`, `13px`. Zůstává na jednom řádku. |
| **Text víceřádkový** | dlouhá hodnota. **Šířka se nemění** (`width:100%`, stejná jako input), **roste jen do výšky** podle obsahu; text se řádně **zalamuje** (`white-space:pre-wrap`, `word-break:break-word`, `line-height:1.5`), `min-height:72px` (~3 řádky). **Nikdy neroluje, nemá scrollbar, netvoří `…`.** Řádek pole má `align-items:flex-start`, aby label zůstal nahoře. V aplikaci je to auto-rostoucí `textarea`, ve statickém vizuálu `div` se stejným rámem. |
| **Výčet (enum)** | `width:100%` jako input, stejný rám. Uvnitř **barevný puntík `10px`** (`border-radius:50%`) + **text hodnoty** `13px` `#1a1a2e`, vpravo `chevron-down` `#9a95ad` `10px`. Ne nativní `<select>` s automatickou šířkou. |
| **Datum** | `<input>` **pevných `120px`** + ikona `calendar-days` `#b0aac5` vedle. Beze změn dle prototypu. |
| **Datum prázdné** | totéž, placeholder `dd.mm.rrrr`, text `#aaa`. |
| **Odkaz na záznam / osobu** | „→" `#888` + podtržený odkaz `#1a1a2e` `13px/600`; u vícehodnotového pole pod ním „+ přidat". |
| **Prázdné pole** | jen odkaz „+ přidat" (`#1572e8`, `12px/600`). |

**Barva puntíku u výčtu** je barva té hodnoty (sémantická — např. stav
zakázky: Poptávka `#DD2C00`, Nabídka poslána `#FF8F00`, Realizace
`#00C853`, Hotovo `#00BFA5`, Zrušeno `#9E9E9E`). **Nikdy barva modulu.**

**Jak vybrat text jednořádkový vs. víceřádkový:** podle délky hodnoty —
krátká (název, číslo, částka, SPZ) → jednořádkový; víceřádková věta a víc
(popis, poznámka, adresa) → víceřádkový. Nemíchej to v jednom poli.

#### 7.1.4 Tlačítka v itemu (draweru) — barva a TVAR

**V draweru se barva modulu nepoužívá. Všechna tlačítka mají defaultní
barvu tlačítka aplikace `#1572e8`** – bez ohledu na to, z jakého modulu
záznam je. Barva modulu končí na úrovni evidence (§5.1.1).

**Tlačítka mají dvě úrovně – primární a sekundární. Tvar je u obou
pilulka; liší se výplní:**

| Úroveň | Vzhled |
|---|---|
| **Primární** | plné pozadí `#1572e8`, bílý text, stín `0 2px 6px rgba(21,114,232,.28)`, bez lemu |
| **Sekundární** | **bílé pozadí, lem `1px solid #1572e8`, text `#1572e8`, BEZ stínu** |

Přiřazení k prvkům (nedomýšlej si ho):

| Tlačítko | Úroveň | Tvar a vzhled |
|---|---|---|
| „PŘIDEJ DALŠÍ DO" (Souvislosti) | primární | pilulka `50px`, plná `#1572e8`, bílý text, `12px/800`, `padding:9px 18px` |
| „+" v hlavičce Zápisů | primární | **kruh** `36px`, `border-radius:50%`, plná `#1572e8`, bílá ikona `plus` `14px` |
| „EXPORT" (Zápisy) | primární | pilulka `50px`, plná `#1572e8`, `11px/700`, výška `30px` |
| **„PŘIDAT AKTIVITU" (Plány aktivit)** | ⚠ **sekundární** | pilulka `999px`, **lem `1px solid #1572e8`, bílé pozadí, text `#1572e8`**, `12px/800`, `padding:9px 18px`, bez stínu |
| „Uložit změny" v akčním sloupci | primární | pilulka `999px`, dle §7.2 (šedý řádek / modrá pilulka) |
| inline „+ přidat" v polích | – | text `#1572e8`, `12px/600`, bez rámu a podtržení |

Výjimka jsou **akce v řádcích Plánů aktivit** (`NAPLÁNOVAT`, `POTVRDIT`) –
ty mají pilulku `border-radius:20px` a **sémantickou barvu podle termínu**
(tmavá / červená / oranžová), ne modrou. Viz §7.1.3.

#### 7.1.1 Záložka Souvislosti

- Řádek nástrojů: **oko** (náhled) → **ikona grafu** (přepínač
  „Zobrazit / Skrýt graf") → vpravo **„PŘIDEJ DALŠÍ DO"** (plná modrá
  pilulka `#1572e8`).
- Skupiny: řádek „*Skupina* (*počet*)" + zelené „+" `#00c853`; rozbalená
  skupina má odsazené řádky se dvěma modrými podtrženými odkazy
  (skupina → záznam) a vpravo dole „Zobrazeno 1 - N z N záznamů".
- **Výchozí stav: všechny skupiny sbalené, graf skrytý** (§7.1.0).

**Graf souvislostí** (jen na výslovné zadání, partial
`drawer-tab-souvislosti-graf.html`):

- Plocha `740 × 480`, vycentrovaná (`margin:0 auto`), pod ní odkaz
  **„Skrýt graf"** (šedý `#9a95ad`, `12px`, s ikonou `diagram-project`).
- **Střed** = tento záznam: bod `#2b2540`, `r=6`, na souřadnici `370,240`.
- **1. úroveň = skupiny**: text `13px/600` `#3c3a52` na bílém podkladu
  (`padding:3px 8px`), popisek ve formátu „Skupina (n/n)".
- **2. úroveň = navázané záznamy**: zelené pilulky `#43a047`, bílý text
  `11px/700`, `border-radius:6px`.
- **Spojnice**: `<line>` `stroke:#c9d6e8`, `stroke-width:1.5` – střed →
  skupina a skupina → záznam.
- Uzly jsou HTML `div`y absolutně pozicované **nad** `<svg>`
  (`transform:translate(-50%,-50%)`), ne `<text>` v SVG – text je ostrý.
- Souřadnice uzlů uprav tak, aby se popisky nepřekrývaly; rozměry plochy,
  barvy a tloušťky linek neměň.

#### 7.1.2 Záložka Zápisy

- Filtry jsou **šedé pilulky `#a4a4a4`** s bílým textem: *Od · Do ·
  Účastníci · Vytvořil* (poslední dvě s `chevron-down`).
- Kruhové **„+" v barvě modulu** vlevo v hlavičce, **„EXPORT" modré
  `#1572e8`** vpravo (není to přidávání).
- Řádky jsou **časová osa**: svislá spojnice `#e5e3ee` `2px`, kolečko
  `40px` s ikonou typu, vedle bílá karta `border-radius:10px` se stínem
  `0 2px 12px rgba(0,0,0,.07)`.
- **Barva kolečka dle typu zápisu** (sémantická, nepřebarvuj na modul):
  Schůzka `#7e57c2` · Telefonát `#43a047` · Mail `#1572e8`.
- První řádek nemá spojnici nahoru, poslední dolů. Šířky sloupců drž
  shodné v hlavičce i v kartách (90 / flex / 150 / 150 / 190 / 190 / 44).

#### 7.1.3 Záložka Plány aktivit

- Nahoře **„PŘIDAT AKTIVITU"** – **sekundární** tlačítko: pilulka s lemem
  `1px solid #1572e8`, bílé pozadí, modrý text (§7.1.4). Ne plné.
- Skupiny jsou **karty** (`border:1px solid #e9e7f1`, `radius:6px`) s
  hlavičkou `#efeef4`: chevron + název `14/800` + **tmavý počet** `#2b2942`
  + **stavové chipy**.
- Stavové chipy (sémantické): *V pořádku* `#00C853` · *Blížící se*
  `#FFAB00` · *Urgentní* `#EF5350` · *nenaplánované* `#78788c`.
- Řádek aktivity má dvě podoby:
  **splněno** → vpravo zelené `fa-circle-check` `#00c853` (`31px`) + časová
  značka; **čeká na akci** → pilulka akce, jejíž barva **kopíruje chip
  termínu**: `NAPLÁNOVAT` tmavá `#2b2942` (bez termínu), `POTVRDIT`
  červená `#EF5350` (po termínu) nebo oranžová `#FFAB00` (blíží se).
- Skupina s hromadnými akcemi má první řádek **„Vybrat vše"** s checkboxem.
- **Výchozí stav: všechny skupiny sbalené** – rozbal jen tu, kterou zadání
  jmenuje (§7.1.0).

#### 7.1.6 Záložka Pracovní zařazení (JEN Zaměstnanec — PEVNÉ pravidlo)

> Zdroj pravdy = reálná produkční aplikace (screenshot 27. 8. 2026,
> záznam „FABIÁN Vladimír") **+ Aptien App Kit**
> (`Claude-HK-Aptien-App/aptien-design-system-app.html`, sekce **Tag**
> `#labels` a **User Badge** `#avatar`). Tahle záložka **nemá partial pro
> jiné moduly** – na rozdíl od Detailů/Souvislostí/Zápisů/Plánů aktivit ji
> nekopíruj nikam jinam, i kdyby zadání říkalo „stejně jako u
> Zaměstnance".

Pole jsou pod sebou, každé má **tučný popisek nahoře** (`13px/700
#374151`, mezera `8px` k hodnotě) – **ne** řádkový layout Detailů
(ikona/label vpravo/hodnota z §7.1.5). Pořadí polí (závazné):

| Pole | Vzhled | Chování |
|---|---|---|
| **Nadřízený** | rámeček (`border:1px solid #d9dde8;border-radius:4px;padding:8px 10px` — stejná rodina jako `.apt-f-select`) s **jedním** App-Kit **User Badge** standalone (`.userBadge.userBadge--standalone`: kolečkový avatar 27→22px s iniciálami + jméno, bez pill pozadí) + samostatné kolečkové tlačítko „×" (`.tag-remove`) | jednohodnotový odkaz na osobu |
| **Podřízení** | **bez rámečku**, jen zalomený seznam **User Badge standalone** vedle sebe (`gap:6px 4px`), **bez „×"** | needitovatelné, odvozeno z organizační struktury (kdo má tohoto zaměstnance jako Nadřízeného) |
| **Pracuje na pozici** | stejný rámeček jako Nadřízený, App-Kit **Tag removable** (`.styled-tag.styled-tag--removable`, defaultní světlá varianta, bez avataru/ikony) | jednohodnotový odkaz na pracovní pozici; pod rámečkem modrý odkaz `12px/700` s ikonou `circle-info`: **„UKÁZAT POŽADAVKY PRACOVNÍ POZICE"** |
| **Organizační jednotka** | rámeček jako výše, prázdný stav = šedý placeholder text `„Klikněte pro přidání organizační jednotky"` (`color:#aaa`) | bez zvláštní „+ přidat" ikony (na rozdíl od §7.1.5) |
| **Uživatelská skupina** | stejný rámeček, **víc App-Kit Tagů removable** vedle sebe | mnohohodnotové |

**Komponenty jsou skutečné App-Kit komponenty, ne vymyšlené CSS:**

- **Tag** (`src/components/core/Tag`, App Kit `#labels`) – `.styled-tag`:
  pozadí `#eceff1`, text `#59676d`, `9px/600 Nunito`, `padding:6px 12px`,
  `radius:4px`. Removable varianta `.styled-tag--removable` přidává
  kolečkové tlačítko `.styled-tag__remove` (`16×16px`, `rgba(0,0,0,.08)`,
  hover `rgba(0,0,0,.18)`) s `fa-xmark`. **Vždy defaultní světlá
  varianta** – nepoužívej barevné varianty `--blue/--red/--green/--yellow`
  ani žlutou barvu modulu Zaměstnanci (`#f1c40f`).
- **User Badge** (Latte makro `{userBadge $user}`, App Kit `#avatar`) –
  `.userBadge` (pill `#f2f5f7`, radius `30px`) s `._avatar` (kolečko
  `27px`, fallback `#e2e4e6`, iniciály `#fff`) a `._name` (`12px #333`).
  V této záložce se používá **vždy varianta `--standalone`** (průhledné
  pozadí, bez pillu). ⚠ **Na rozdíl od avatarů v Konverzaci**
  (`msg.avatarBg` podle osoby) mají tyto avatary **vždy jednotnou
  neutrální fallback barvu App Kitu** (`#e2e4e6` + bílé iniciály) –
  reálný screenshot (27. 8. 2026) ukazuje všechny osoby stejnou šedou
  barvou, ne barevné kolečko podle člověka. Nikdy sem nepřidávej
  per-osobu barvu (`avatarBg`/`p.color`).
- Toto je **jiná komponenta** než pilulka „Přiřazení zaměstnanci"
  v modalu pozice (§11.5, `.apt-chip-user`) – tam je pravidlo fotka/obecná
  ikona `user`, nikdy barevné iniciály. Nepleť si je.

**Tlačítko ULOŽIT** je **uvnitř záložky** vpravo dole (modrá pilulka,
vždy aktivní), **ne** v pravém akčním sloupci a **nezávisí** na pravidle
„Uložit změny" z §7.2 – to v pravém sloupci zůstává podle normálních
pravidel (obvykle neaktivní řádek).

#### 7.1.7 Hlavička draweru Zaměstnanec — badge osoby (JEN tento drawer)

Navíc k jedinému chipu kategorie ze **§7.1** („kategorie jako chip") má
hlavička draweru Zaměstnanec **druhý chip hned vedle prvního**: stejný
vzhled (`#eceff1`/`#59676d`, `4px/12px`, `10px/600`), ikona `user`, text
= **celé jméno zaměstnance** (duplicitně k velkému nadpisu nahoře –
funguje jako personální identifikační štítek/breadcrumb na konkrétní
osobu). Stavová pilulka „AKTIVNÍ" (zelená) zůstává třetí v pořadí beze
změny. **Tenhle druhý chip se nikde jinde v aplikaci nepoužívá** – u
žádného jiného modulu hlavička druhý chip nemá.

#### 7.1.8 Záložka Onboarding (JEN Zaměstnanec — PEVNÉ pravidlo, POSLEDNÍ tab)

> Zdroj pravdy = Claude Design, projekt „Onboarding checklist umístění",
> soubor `Onboarding v2.dc.html` (import 10. 9. 2026) + master prototyp
> (`zam_showOnboarding` / `ZAM_ONBOARD_PHASES` / `ZAM_ONBOARD_SMERNICE`).
> Stejné pravidlo jako u „Pracovní zařazení" (§7.1.6): **tahle záložka
> nemá partial pro jiné moduly** — nekopíruj ji do jiných evidencí, i
> kdyby zadání říkalo „stejně jako u Zaměstnance".

**Pozice v pásu záložek:** úplně **POSLEDNÍ**, za „Konverzace" (viz
tabulka sad záložek výše). Pořadí ostatních záložek se touto změnou
nemění.

Skladba (pořadí závazné):

1. **Hlavička** — název záložky + podtitulek shrnující, pro koho platí
   (položky pro všechny + položky pro konkrétní pracovní pozici
   zaměstnance) + sekundární lemovaná pilulka „STÁHNOUT SOUHRN (PDF)"
   (placeholder, bez funkce — export je mimo rozsah zadání).
2. **Souhrnný progress bar** „Splněno X z Y" — počítá se **jen z
   POLOŽEK checklistu**, nikdy z aktivit (aktivita se plánuje a hlídá,
   „plní" se jen položka).
3. **Sbalitelné skupiny = FÁZE nástupu** — stejné fáze jako v Editaci
   evidence (§13.3), sdílené pro položky i aktivity. Hlavička skupiny:
   tmavý pill s celkovým počtem řádků fáze + zelený chip „N splněno" +
   šedý chip „N zbývá" (oba počty **jen z položek**, ne z aktivit).
   - **Řádek POLOŽKA:** text nahoře; pod ním „Splněno &lt;datum&gt;"
     (když splněno) nebo nic, volitelně poznámka zaměstnance; vpravo
     pilulka Splněno/Nesplněno + ikona tužky. Šablonové řádky (scope
     „Pro všechny" / „Pro pracovní pozici") **nejdou přejmenovat ani
     smazat** — jen zaškrtnout a napsat poznámku. Koš má **jen** řádek
     přidaný přímo u tohoto zaměstnance.
   - **Řádek AKTIVITA:** text nahoře; pod ním datum + šedý štítek typu
     „Jednorázová"; vpravo kolečkový checkmark (zelený když
     splněno/naplánováno) + datum + kebab menu „⋮".
   - **Štítek rozsahu** pod textem řádku, zobrazí se **jen když řádek
     NENÍ „Pro všechny"**: fialový **„Pouze pro tohoto zaměstnance"**
     (řádek přidaný přímo v této záložce — jediný s košem) nebo modrý
     s ikonou aktovky **„Pro pracovní pozici: &lt;pozice&gt;"** (zděděno
     ze zdrojového checklistu podle pracovní pozice zaměstnance,
     needitovatelné a nemazatelné tady).
   - Pod výčtem řádků skupiny: odkazy „+ VLASTNÍ POLOŽKA" /
     „+ VLASTNÍ AKTIVITA" — otevírají **stejný sdílený modal** jako
     „+ POLOŽKA"/„+ AKTIVITA" v Editaci evidence (§13.3), jen pole „Je
     pro" je tady **zamčené** na „Pouze pro tohoto zaměstnance" (na
     rozdíl od needitovatelného zdroje, kde je volba otevřená).
4. **Readonly seznam směrnic** platných pro tohoto zaměstnance, se
   štítkem rozsahu platnosti u každé — **bez** tlačítka POTVRDIT (to
   existuje jen na agendě „Moje směrnice" samotného zaměstnance).

**Datový model (neplést se sourozeneckými funkcemi):** zobrazení tady je
**ilustrační INSTANCE se stavem splnění** (`ZAM_ONBOARD_PHASES`),
NEZÁVISLÁ 1:1 na zdrojovém checklistu Editace evidence (`EV_ONBOARD_PHASES`,
§13.3) — stejná konvence jako `ZAM_PLANY_GROUPS` vs `POZ_ACT_GROUPS`.
Nepleť ani s `POZ_ONBOARD_GROUPS` (needitovatelný seznam školení v modalu
„Upravit pracovní pozici", §11.5) — to je třetí, samostatná funkce.

Barvy: výchozí primární modrá `#1572e8` (progress bar, ikony aktivit,
odkazy) — **nikdy** žlutá barva modulu Zaměstnanci (`#f1c40f`).

Partial k doslovnému vložení: `partials/drawer-tab-onboarding.html`.

### 7.2 Pravý sloupec akcí (KOMPLETNÍ VÝČET, pořadí závazné)

> Zdroj pravdy = master prototyp, blok `drawerZakOpen` / `zak_drawerActions`,
> otevřený záznam **Sloupek 120**. Nejčastější chyba je **vynechání
> „Zabalit" a stavové pilulky** – sloupec má **12 položek**, ne 9.

| # | Položka | Ikona (FA Free) | Poznámka |
|---|---|---|---|
| 1 | Zabalit | `fa-solid fa-right-from-bracket` | **vždy první, v každém modulu** |
| 2 | *stav záznamu* | tečka + `fa-solid fa-chevron-down` | pilulka – **jen modul se stavovým workflow**, viz níže |
| 3 | Oblíbená | `fa-solid fa-star` | |
| 4 | Nový report | `fa-solid fa-file-circle-plus` | |
| 5 | Moje reporty | `fa-solid fa-chart-bar` | |
| 6 | Online formuláře | `fa-solid fa-file-pen` | |
| 7 | Výsledky formulářů | `fa-solid fa-table-list` | |
| 8 | Sdílet | `fa-solid fa-share-nodes` | |
| 9 | Náhled | `fa-solid fa-eye` | |
| 10 | Oprávnění | `fa-solid fa-id-badge` | |
| 11 | Historie změn | `fa-solid fa-clock-rotate-left` | |
| 12 | Uložit změny | `fa-solid fa-floppy-disk` | **vždy vidět**, výchozí stav šedý/neaktivní – viz níže |

**Styl řádku akce:** `display:flex;align-items:center;gap:10px;padding:7px 16px;`
`font-size:12.5px;color:#374151;cursor:pointer`; ikona
`width:18px;text-align:center;font-size:13px;color:#9a95ad`.
**Hover:** text `#1572e8` + podklad `rgba(21,114,232,.05)`.
Sloupec je jinak **bez barev** – jediný barevný prvek je stavová pilulka.

**Stavová pilulka (položka 2):** podklad `#EEF4FE`, text `#1572e8`
`12.5px/700`, `padding:6px 12px;margin:4px 8px;border-radius:999px`,
vlevo tečka `10px` v **barvě stavu**, vpravo `chevron-down` `#1572e8`.
Barvy tečky pro Zakázky: Poptávka `#DD2C00` · Nabídka poslána `#FF8F00` ·
Realizace `#00C853` · Hotovo `#00BFA5` · Zrušeno `#9E9E9E`.
Pilulka **nepřebírá barvu modulu** a u modulu bez stavů se vynechá.

#### „Uložit změny" – PRAVIDLO ZOBRAZENÍ

**Položka je ve sloupci VŽDY – mění jen stav. Zda je aktivní, se určuje
V ZADÁNÍ (promptu); nikdy si to nedomýšlej.**

| Zadání | Vzhled položky |
|---|---|
| **Bez zmínky** (VÝCHOZÍ) | **neaktivní řádek seznamu** – text `#bbb`, ikona diskety `#ccc`, jinak stejné rozměry jako ostatní akce. Je vidět, jen zešedivělá. |
| Zadání říká, že má být **aktivní** (rozeditovaný záznam, neuložené změny, „uložit změny aktivní") | **modrá primární pilulka** `#1572e8`, bílý text, ikona diskety, `border-radius:999px`, stín `0 2px 6px rgba(21,114,232,.28)`, vlastní blok `padding:12px 16px 4px` nad metadaty |

Položku **nikdy nevynechávej** a nikdy nemíchej oba stavy – v jednom
screenshotu je buď šedý řádek, nebo modrá pilulka.

> **Jak to napsat do promptu:** *„…detail záznamu, Uložit změny AKTIVNÍ
> (rozeditovaný záznam)"* → modrá pilulka. Bez této zmínky zůstane šedý
> neaktivní řádek.

> ✅ Výchozí (šedý) stav odpovídá master prototypu – `Sloupek 120`
> i Ochranné pomůcky mají `{ label: 'Uložit změny', disabled: true }`.
>
> ⚠ **Odchylka master prototypu:** Rizika a Ochranné pomůcky tam nemají
> „Zabalit" ani stavovou pilulku. To je nedodělek – **závazný je výčet
> v tabulce výše**, prototyp se srovná při nejbližší úpravě.

**Blok metadat** je vždy poslední: `margin-top:16px`, `border-top:1px solid #eef0f3`,
řádky `11px` `#9a95ad` s hodnotami `#5a5478` – *ID · Vytvořeno · Vytvořil ·
Poslední úprava*.

---

## 8. UI komponenty

| Komponenta | Popis a pravidla |
|---|---|
| **Top bar** | Tmavě šedý pruh (`#424242`, výška 56 px), vlevo bílé logo + název prostoru, vpravo akční ikony. Notifikační bublina u zvonečku je **vždy červená `#FF3D00`** (počítadlo/alert), nikdy modrá; lem v barvě top baru. |
| **Tab strip** | Tmavě šedý pruh (`#424242`) se záložkami otevřených záznamů; **aktivní záložka = barva modulu `c800`** (bílý text), neaktivní bílé s textem dle `c800`, zaoblené horní rohy. |
| **Sidebar menu** | **Bílý panel** (`#fff`, pravý okraj `1px solid var(--gray-10)`), **výchozí stav sbalený = 56 px jen ikony bez posuvníku**, otevřený 220 px (ikona+text, badge, nadpisy skupin) jen na zadání; dvě skupiny (osobní / „Naše firma"), rolovatelné, profil dole; aktivní položka = tint `rgba(21,114,232,.10)` + text `#1572e8`. Viz §3.0. |
| **Content area** | Hlavní plocha; hostí dashboard / seznam / kanban / tabulku. Světlé pozadí (`--canvas #f9f9fb`). |
| **View switcher** | Výsuvný „pill" přepínač pohledů (Dashboard / Seznam / Kanban / Tabulka / Kalendář). |
| **Hero banner** | Úvodní blok dashboardu s názvem oblasti a popisem. Pozadí = **2-stupňový gradient** (`135deg`): 1. barva = základní barva modulu (`c800`), 2. barva = tatáž barva +30 % bílé. Viz 9.1. |
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

> **Role barev jsou pevné a nemění se podle modulu.** Top bar i pruh se
> záložkami (tab strip) = tmavě šedá `#424242`; akce / tlačítka / aktivní
> prvky = modrá `#1572e8`, **kromě všech „přidat" v evidenci, která mají
> barvu modulu `c800` (§5.1.1)**; **aktivní záložka = barva modulu `c800`**
> (přebírá barvu neaktivního textu); barva modulu (`c800`) pro text/ikonu
> neaktivní záložky, pozadí aktivní záložky a chip. Nezaváděj „tématickou"
> barvu modulu na banner ani na pohledy (žádný teal banner apod.).

**Interaktivní akcent (primární):**

- `--primary #1572e8`, `--primary-light #5b9cef`, `--primary-dark #0f50a2`,
  `--primary-deep #082e5d`, `--primary-wash rgba(21,114,232,.08)`.

**Plocha top baru / tab stripu:**

- Top bar `#424242`. Pruh se záložkami (tab strip) rovněž `#424242` –
  stejná tmavě šedá, splývá s top barem. (Dřív brandová fialová `#6200EA` /
  `--a700-deep-purple` – ten token zůstává v systémové paletě A700 pro
  avatary/štítky, jen se už nepoužívá pro top bar.)

**Sidebar (světlé menu):** bílá plocha `#fff`, pravý okraj
`1px solid var(--gray-10)`; **šířka 56 px ve výchozím sbaleném stavu**,
220 px v otevřeném (§3.0); popisky skupin `10px/700` uppercase
`var(--gray-60)` LS `.08em` (jen v otevřeném stavu); položky text `#555`,
aktivní = tint `rgba(21,114,232,.10)` + text `#1572e8`. Sbalený stav je
bez viditelného posuvníku.

**Záložky:** aktivní = barva modulu (`c800`, bílý text), neaktivní bílé
s textem v barvě modulu (`c800`).

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

**Gradient hero banneru (dashboard evidence):** vždy **2 stupně**,
`linear-gradient(135deg, <c800> 0%, <c800 +30 % bílé> 100%)`. 1. barva =
základní barva modulu tak, jak je popsaná (`c800`); 2. barva = tatáž barva
zesvětlená smícháním s 30 % bílé – stejný poměr jako `--primary #1572e8`
→ `--primary-light #5b9cef`. Pro libovolný modul:
`kanál₂ = round(kanál × 0,7 + 76,5)` pro R, G, B.

| Modul | 1. barva (`c800`) | 2. barva (+30 % bílá) |
|---|---|---|
| Rizika | `#E91E63` | `#F06292` |
| Ochranné pomůcky | `#D84315` | `#E47B5B` |
| Zakázky | `#1565C0` | `#5B93D3` |

Bez tmavšího úvodního stupně a bez tří a více stupňů.

### 9.2 Typografie

- **Displej / nadpisy:** `--font-display: 'Nunito', system-ui, sans-serif`.
- **Text / body:** `--font-body: 'Nunito', system-ui, sans-serif`
  (sladěno s app kitem – celá aplikace jede na Nunito; Open Sans zůstává
  jen uložený v `assets/fonts`, nepoužívá se).
- **Škála:** `--t-page 26px`, `--t-h2 20px`, `--t-h3 16px`,
  `--t-body 14px`, `--t-small 12px`, `--t-label 11px`.

### 9.3 Tvary, plochy, rozestupy

- **Zaoblení:** `--radius-sm 4px`, `--radius-md 10px`, `--radius-lg 14px`,
  `--radius-pill 999px` (jen „pill" přepínač pohledů). **Štítky/badge jsou
  hranaté** – `--radius-sm` (4px), termínový štítek `.badge-deadline` = 3px
  dle app kitu; pill se pro štítky nepoužívá.
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

## 11. Nastavení organizace (menu `nastorg`)

Obrazovka „Nastavení organizace" (položka sidebaru `nastorg`,
`activeNav = 'nastorg'`) je **nav-owned content** — otevřením se ruší
aktivní záložka topbaru (`activeTab = null`), stejně jako u „Směrnice a
dokumenty". Nemá toolbar evidence ani view switcher; **nejde o evidenci,
ale o konfiguraci.**

### 11.1 Podzáložky (folder taby uvnitř obsahu) — PEVNÉ pravidlo

Obrazovka má **přesně 4 podzáložky v tomto pořadí a s tímto textem**:

`Organizace` · `Pracovní pozice` · `Katalog požadavků na pracovní pozice` · `Nastavení nadřízených`

- Pruh podzáložek sedí **nad** bílou kartou obsahu, na ploše `#f5f6f7`,
  padding `8px 20px 0`, mezera mezi taby 2px.
- Tab: padding `9px 18px`, radius `7px 7px 0 0`, font 13px.
  **Aktivní** = pozadí `#fff`, text `#1572e8`, řez 700 (navazuje na kartu
  pod sebou). **Neaktivní** = pozadí `transparent`, text `#4a4660`, řez 600.
- Karta obsahu má radius `0 10px 10px 10px` (levý horní roh je hranatý,
  protože na něj dosedá aktivní tab), `border:1px solid #e4e2ed`,
  `box-shadow:0 1px 6px rgba(0,0,0,.07)`, `margin:0 12px 12px`.
- **Výchozí podzáložka = `Organizace`.** Stav drží `orgTab`.
- Podzáložky **NEJSOU** view switcher — nikdy nemají tvar pilulky ani
  modrý lem (viz §5).

Hotové bloky: `partials/nastorg-organizace.html`,
`partials/nastorg-pracovni-pozice.html`,
`partials/nastorg-katalog-pozadavku.html`,
`partials/nastorg-nastaveni-nadrizenych.html`.

### 11.2 Záložka „Organizace" — organizační strom

Nadpis `Naše organizace` (18px, řez 700, `#2b2540`), pod ním strom
jednotek. Strom je klasický CSS org-chart: vnořené `<ul>/<li>`
(`.orgchart`), spojnice kreslí pseudo-elementy `::before` / `::after`,
barva spojnice `#c9c6d6`, tloušťka 1px, svislý úsek 22px.

**Uzel (`.org-node`) — PEVNÉ rozměry a barvy:**

- šířka `190px`, `border:1px solid #5b9cef`, radius 3px, tělo bílé;
- hlavička: pozadí `#5b9cef`, text bílý 11.5px řez 800, na střed,
  vlevo volitelný „grip" `bars` (jen u jednotek, které lze přesouvat);
  dlouhý název se **ořezává třemi tečkami**, nezalamuje se;
- tělo: pomlčka `—` (`#b0aac8`) = prázdný popis jednotky, pod ní řádek
  ikon akcí `#6b7280`, hover `#1572e8`:
  `layer-group` (přidat podřízenou jednotku) · `pen` (upravit) ·
  `trash` (smazat — **jen u listových uzlů bez potomků**).

Modrá `#5b9cef` je `--primary-light`; **nepoužívej `#1572e8`** — plná
primární modrá je vyhrazená akcím, ne hlavičkám uzlů.

### 11.3 Záložka „Pracovní pozice" — seznam a filtrování

Skladba karty: **řádek filtrů** → **sloupec karet pozic**.

- **Filtry** (`.poz-filter`) jsou 4 v mřížce `1.15fr 1.35fr 1.6fr 1fr`,
  mezera 14px: `Název pracovní pozice` (bez šipky, textový) ·
  `Organizační jednotka` · `Požadavek pracovních pozic` · `Proces`
  (všechny tři s `caret-down`).
  Vzhled: pozadí **`#a6a6ad`**, text bílý 12.5px řez 600, výška 32px,
  radius 4px. Filtr této obrazovky je **šedý, ne bílý s lemem** — je to
  jiná komponenta než hledání v toolbaru evidence (§5.1).
- **Karta pozice** (`.poz-card`): bílá, `border:1px solid #e8e6f0`,
  radius 8px, padding `14px 18px`, mezera 10px. Obsahuje název pozice
  (14px, řez 700, `#3f4457`), pod ním **obsazení** = řádky s **jen
  jménem** (13px, `#6b7280`, `margin-top:9px`) — **bez avataru**.
  Vpravo nahoře ikona `box-archive` (`#9096a6`) = archivace pozice.
  **Pozice bez obsazení je normální stav** — karta pak obsahuje jen název.
- Klik na kartu otevírá **modal „Upravit pracovní pozici"** (§11.5),
  ne drawer.

### 11.4 Záložka „Katalog požadavků na pracovní pozice"

Filtry `Název požadavku` + `Kategorie požadavku` (stejný šedý styl jako
§11.3), vpravo modré `PŘIDAT POŽADAVEK`. Pod nimi tabulka se sloupci
**Požadavek · Kategorie · Použito v pozicích · akce** (`pen`, `trash`).
Hlavička tabulky: pozadí `#f4f7fd`, text 11px uppercase `#7b8092`.

Kategorie je barevný štítek — barvy jsou **pevné**, nevymýšlej vlastní:

| Kategorie | pozadí | text |
|---|---|---|
| Jazyky | `#EDE7F6` | `#4527A0` |
| IT dovednosti | `#E3F2FD` | `#1565C0` |
| Vybavení | `#FFF3E0` | `#E65100` |
| Oprávnění | `#E8F5E9` | `#2E7D32` |
| Školení | `#FCE4EC` | `#C2185B` |
| Zdravotní | `#E0F7FA` | `#00695C` |

### 11.5 Modal „Upravit pracovní pozici" — POVINNÁ skladba

Detail pracovní pozice se **NEOTEVÍRÁ jako drawer** (§7). Je to
**formulářové modální okno nad celou aplikací**:

- overlay `rgba(20,22,30,.55)`, `z-index:120`, obsah vystředěný;
- okno `min(1180px, 94vw) × min(760px, 92vh)`, bílé, radius 12px,
  stín `0 24px 60px rgba(0,0,0,.35)`;
- **hlavička**: `Upravit pracovní pozici` (19px, řez 700, `#3f4457`),
  vpravo `✕` (`#8a90a3`);
- **tělo** = levá navigace (246px, bílá) + obsah sekce
  (pozadí **`#f7f8fc`**, padding `26px 30px 30px`, rolovatelný);
- **patička**: vlevo dvě **šedé pilulky** `#6b7280` s ikonou `print` —
  `PŘEHLED PRACOVNÍ POZICE`, `PODKLAD PRO INZERÁT`; vpravo **modrá
  pilulka** `#4a7fe8` `ULOŽIT`.

**Levá navigace — 3 skupiny, pořadí a texty závazné:**

| Skupina | Položky (ikona) |
|---|---|
| `POZICE` | Základní info `sliders` · Přiřazení zaměstnanci `users` · Organizační zařazení `sitemap` · Pracovní náplň `list-check` |
| `POŽADAVKY` | Požadavky na kvalifikaci `graduation-cap` · Požadavky na způsobilost `user-check` · Vybavení, nástroje, systémy `screwdriver-wrench` · Pracoviště a rizika `triangle-exclamation` |
| `NÁVAZNÉ` | Onboarding checklist `clipboard-check` (počet) · Rozvoj zaměstnance `calendar-check` (počet) · Dokumenty `folder-open` (počet) · Školení `chalkboard-user` (**bez počtu**) |

- Nadpis skupiny: 10.5px, uppercase, letter-spacing `.09em`, `#a4a9ba`.
- **Aktivní položka** = modrá pilulka `#4a7fe8`, bílý text, řez 700,
  radius 8px, ikona bílá. **Neaktivní** = průhledná, text `#2b2540`
  řez 500, ikona `#7b8092`.
- Skupina `NÁVAZNÉ` zobrazuje vpravo počet (aktivní bíle, jinak `#a4a9ba`)
  — **kromě `Školení`, to badge nikdy nemá** (design ho tam nedefinuje).
- **Výchozí otevřená sekce = `Základní info`** (`pozModalSection`).

**Formulářové prvky v obsahu (pevné):**

- popisek pole: 12.5px `#5b6070`, mezera pod 6px;
- `input`: bílý, `border:1px solid #e2e5ef`, radius 6px, výška 34px;
- `textarea`: totéž, min. výška 56px, vpravo dole úchyt pro změnu velikosti;
- `select`: bílý, `border:1px solid #d9dde8`, radius 5px, výchozí hodnota
  `---`, vpravo `chevron-down`;
- rozvržení dvousloupcové `1fr 1fr`, mezery `22px 46px`, max. šířka 1040px;
- **richtextové pole** (`.apt-rte-toolbar` + `.apt-rte-body`) — **VŠECHNA
  víceřádková textová pole v modalu** (tj. každé místo, kde byla dřív
  obyčejná `.apt-f-area`) mají tuto lištu, **bez výjimky** — obyčejná
  `.apt-f-area` (bez lišty) se v tomto modalu už nikde nepoužívá; mimo
  modal (např. formulář školení, editace evidence) zůstává `.apt-f-area`
  beze změny a lištu nedostává. Lišta nástrojů: bílá,
  `border:1px solid #e2e5ef` (spodní hrana světlejší `#eef0f6`), radius
  `6px 6px 0 0`, padding `5px 8px`; ikony `bold` · `italic` · `underline`,
  oddělovač (`1px × 14px`, `#e2e5ef`), `list-ul` · `list-ol` · `link` —
  všechny `11px`, `#7b8092`, padding `5px 7px`. Tělo hned pod lištou:
  bílé, lem bez horní hrany (navazuje na lištu), radius `0 0 6px 6px`,
  min. výška 90px, padding `8px 11px`. Je to **jen vzhled** (statický
  blok), žádná funkční editace textu.

  | Sekce | Pole s richtextem |
  |---|---|
  | Základní info | Další informace k pracovní pozici |
  | Organizační zařazení | Další informace k organizačnímu zařazení |
  | Pracovní náplň | Pracovní náplň · Popis odpovědnosti · Další informace k pracovní náplni |
  | Požadavky na kvalifikaci | Požadavky na vzdělání a kvalifikaci · Požadavky na praxi · Požadavky na dovednosti |
  | Požadavky na způsobilost | Požadavky na zdravotní způsobilost · Další požadavky na způsobilost |
  | Vybavení, nástroje, systémy | Požadavky na pracovní pomůcky · Další požadavky pracovní pozice |
  | Pracoviště a rizika | Bezpečnostní rizika pracovní pozice · Zdravotní rizika pracovní pozice · Další rizika |

  Jednořádková pole (`input`) a výběrová pole (`select`, katalogový
  výběr) richtext lištu **nikdy** nemají — patří jen k víceřádkovým
  textovým polím výše.
- **katalogový select** (kvalifikace, způsobilost, vybavení, rizika) —
  **skutečný funkční `<select class="apt-native-select">` s `<optgroup>`
  kategoriemi**, přesně podle designu (viz jeho `<select>` element, ne jen
  vzhled jako u ostatních `.apt-f-*` polí). Klik na pole **otevírá nativní
  dropdown prohlížeče** — u zavřeného pole nic dalšího implementovat
  netřeba, otevírání je čistě nativní chování `<select>`u. Katalog je
  **jeden sdílený seznam pro všechny 4 sekce** (stejný jako v designu),
  12 kategorií: Adaptace · Aplikace a licence · Auta · Fyzické předpoklady
  · Klíče a vstupní karty · Ochranné prostředky · Oprávnění · Počítače ·
  Vybavení · Zdravotní · Znalosti a dovednosti · Školení. Styl:
  bílé pozadí, `border:1px solid #d9dde8`, radius 5px, výška 34px, text
  `#2b2540`.
  ⛔ Dřívější `.apt-f-select` div s `<span>---</span>` + `chevron-down`
  (bez skutečné interaktivity) byl u těchto 4 polí **chybný** — nešlo ho
  otevřít vůbec, protože to nebyl `<select>`. U ostatních výběrů v appce
  (Organizační zařazení, „Vyberte proces…" v Pracovní náplni) tahle
  dekorativní varianta zůstává záměrně — jde jen o statický vzhled, ne
  o repliku designu s reálným katalogem.
- **řádek přiřazené položky** (kvalifikace, způsobilost, vybavení, rizika):
  bílý pruh `border:1px solid #eceef5`, radius 5px, text **`#c2703a`**,
  vpravo `trash`; prázdný stav = tentýž pruh s textem
  „Žádný přiřazený pracovní proces". **Výčet je vždy z pevně daného
  katalogu** (stejně jako v designu, ze kterého modal vychází) —
  položka se **nepřidává jako volný text ani se neotevírá do detailu**;
  přidání jde výhradně přes katalogový select + pilulku `PŘIDAT`,
  odebrání jen ikonou `trash` na řádku. Řádky samotné nejsou klikací
  (žádné rozkliknutí/detail) — je to prostý plochý seznam vybraných
  katalogových položek. **Funkční v master prototypu** (§ výše): PŘIDAT
  přidá vybranou položku (kontrola duplicity podle názvu), koš ji
  odebere — stav žije v `pozSel_kvalifikace` / `pozSel_zpusobilost` /
  `pozSel_vybaveni` / `pozSel_rizikaReqs` (viz `addPozSel`/`removePozSel`).
  V partialech (statické snímky bez `<script>`) select zůstává reálný
  a jde otevřít (nativní chování prohlížeče), ale PŘIDAT/koš tam
  nefungují — partial nemá běžící frameworkový stav, stejná konvence
  jako u ostatních partialů v repu.

**Sekce `Základní info`:** jen `Název pracovní pozice` / `Krátký popis` /
`Další informace k pracovní pozici`, dvousloupcové rozvržení. **Chipy
zaměstnanců tu už nejsou** — mají vlastní sekci vedle.

**Sekce `Přiřazení zaměstnanci`:** krátký úvodní text + **pilulky
zaměstnanců** obsazujících pozici: pozadí `#4a7fe8`, bílý text 13px řez
600, vlevo avatar 24px — **fotka, jinak světlý kroužek `#dfe6f5`
s obecnou ikonou `user`**, nikdy barevné iniciály; za posledním chipem
kruhové tlačítko `user-plus` s modrým lemem.

**Sekce `Požadavky na kvalifikaci` / `Požadavky na způsobilost` /
`Vybavení, nástroje, systémy` / `Pracoviště a rizika`:** shodný vzorec —
2–3 textarea pole (volný popis) + katalogový výběr + seznam vybraných
položek jako **řádek přiřazené položky** (viz výše). `Vybavení, nástroje,
systémy` je přejmenovaná bývalá „Požadavky pracovní pozice" — pole
**„Mzdové podmínky" bylo odstraněno**. `Pracoviště a rizika` je
přejmenovaná bývalá „Bezpečnostní a zdravotní rizika", obsah beze změny.

**Sekce `Rozvoj zaměstnance` a `Dokumenty` — dvě úrovně dědičnosti:**
(`Rozvoj zaměstnance` je přejmenovaná bývalá „Plánované aktivity",
obsah beze změny)

1. panel **„Pouze pro tuto pracovní pozici"** (hlavička `#f4f7fd`, ikona
   `user-group` modrá) — u rozvoje i s tlačítkem `PŘIDAT NOVOU AKTIVITU`;
   prázdný stav = **modrá poznámka** (pozadí `#eef4fe`, levý pruh
   `3px solid #4a7fe8`);
2. oddělovač **„PŘEVZATO Z NASTAVENÍ ZAMĚSTNANCŮ"** (10.5px uppercase
   `#a4a9ba` + tenká linka);
3. panel **„Pro všechny zaměstnance"** s počtem; u rozvoje má ikonu
   `lock` a větu „Odsud je nelze měnit." Uvnitř **sbalitelné skupiny**
   (§11.5.1); položka = název (`#4a7fe8`) + **šedý štítek periodicity**
   `#9096a6` (Ročně / Nepravidelná / Jednorázová).
   U dokumentů je položka **distribuční list**: název + popisek
   `DISTRIBUČNÍ LIST` + počet, vpravo stav — `Vyžaduje potvrzení · Za N dní`
   (modře, `circle-check`) nebo `Pouze zveřejněno` (šedě, `circle-info`);
   pod tím název dokumentu a soubory (`file-pdf` červeně, `file-image` modře).

**Sekce `Školení` — dvě úrovně dědičnosti, BEZ sbalitelných skupin:**
stejná dvoupanelová skladba jako výše (1. „Pouze pro tuto pracovní
pozici" → 2. oddělovač → 3. „Pro všechny zaměstnance" s počtem), ale
panel „Pro všechny zaměstnance" má ikonu `people-group` (**ne `lock`**,
žádná věta „Odsud je nelze měnit.") a položky jsou **plochý seznam** bez
skupin a bez periodicity: ikona `chalkboard-user` modře + název modře
(`#4a7fe8`), žádný trash/edit. Panel „Pouze pro tuto pracovní pozici" je
v prototypu vždy prázdný (modrá poznámka „Pro tuto pracovní pozici
zatím není nastavené žádné vlastní školení.") — vlastní školení na
úrovni pozice tu zatím není modelováno.

#### 11.5.1 Sbalitelné skupiny — PEVNÉ pravidlo

Skupiny v sekcích `Rozvoj zaměstnance`, `Dokumenty` a `Onboarding
checklist` jsou **sbalitelné a chovají se stejně**:

- **kliká se na celou hlavičku skupiny**, ne jen na šipku
  (`cursor:pointer`, hover `#eef2f9`, `user-select:none`);
- ikona vlevo: **`chevron-down` = otevřeno**, **`chevron-right` = zavřeno**;
  má pevnou šířku 11px a `text-align:center`, aby text neposkakoval;
- **výchozí stav = otevřeno**. Stav drží `pozActOpen` (rozvoj),
  `pozDocOpen` (distribuční listy) a `pozOnbOpen` (fáze onboardingu),
  klíčem je `key` skupiny; **chybějící klíč znamená otevřeno** — zavírá
  se až explicitním `false`;
- zavřená skupina schová celý obsah, hlavička (název + počet) zůstává,
  takže je z počtu pořád vidět, co se skrývá;
- v sekci `Dokumenty` je sbalitelnou jednotkou **jeden distribuční list**
  (hlavička = název + `DISTRIBUČNÍ LIST` + počet + stav vpravo);
  v sekci `Onboarding checklist` je sbalitelnou jednotkou **jedna fáze
  nástupu** (hlavička = název fáze + počet položek), viz §11.5.3.

#### 11.5.2 Prázdné stavy návazných sekcí — PEVNÉ pravidlo

Čerstvě založená pozice nemá nastavené nic. **Prázdný stav nikdy nemaže
strukturu sekce** — oba panely i oddělovač zůstávají, jen místo obsahu je
**modrá poznámka** (`.apt-note`: pozadí `#eef4fe`, levý pruh
`3px solid #4a7fe8`, text `#4a5163`):

| Panel | Sekce | Text prázdného stavu |
|---|---|---|
| Pouze pro tuto pracovní pozici | Rozvoj zaměstnance | „Pro tuto pracovní pozici zatím není vyžadována žádná plánovaná aktivita." |
| Pro všechny zaměstnance | Rozvoj zaměstnance | „Zatím nejsou nastavené žádné plánované aktivity pro všechny zaměstnance." |
| Pouze pro tuto pracovní pozici | Dokumenty | „Tato pracovní pozice není v žádném distribučním listu, takže k ní není přiřazen žádný dokument." |
| Pro všechny zaměstnance | Dokumenty | „Zatím není nastavený žádný distribuční list pro všechny zaměstnance." |
| Pouze pro tuto pracovní pozici | Školení | „Pro tuto pracovní pozici zatím není nastavené žádné vlastní školení." (v prototypu **vždy** — vlastní školení na úrovni pozice zatím není modelováno) |
| Pro všechny zaměstnance | Školení | „Zatím není nastavené žádné školení pro všechny zaměstnance." |
| Fáze nástupu (celá sekce) | Onboarding checklist | „Pro tuto pracovní pozici zatím není nastavený žádný onboarding checklist." |

- **Počty musí sedět s obsahem.** Když je panel „Pro všechny zaměstnance"
  prázdný, má štítek `0` a **stejně tak počet u položky v levé navigaci**.
  Nikdy nenech v navigaci 39 / 11 / 6, když je sekce prázdná. (`Školení`
  je výjimka — nemá v navigaci badge vůbec, viz výše.)
- Tlačítko `PŘIDAT NOVOU AKTIVITU` zůstává i v prázdném stavu sekce
  `Rozvoj zaměstnance` — je to jediná cesta, jak aktivitu založit.
- Panel „Pro všechny zaměstnance" si u `Rozvoj zaměstnance`/`Dokumenty`
  i v prázdném stavu drží ikonu `lock` a vysvětlující větu; mizí jen
  sbalitelné skupiny. U `Školení` tato ikona/věta není nikdy (viz výše).
- V prototypu tento stav drží pozice s příznakem `fresh: true`
  (**„Referent nákupu"**, poslední karta v seznamu) — otevři ji a uvidíš
  prázdný stav sekcí `Rozvoj zaměstnance`, `Dokumenty` i `Onboarding
  checklist`. Ostatní pozice zůstávají s daty.

#### 11.5.3 Sekce „Onboarding checklist" — POVINNÁ skladba

Nová sekce, jiná stavba než zbytek `NÁVAZNÉ` — **není** rozdělená na
„Pouze pro tuto pozici" / „Pro všechny zaměstnance", je to jeden celek:

- pod nadpisem `apt-modal-h2` krátký vysvětlující text (13px, `#7b8092`):
  „Fáze jsou společné pro položky checklistu i aktivity. Položka je jen
  splněno / nesplněno, aktivita se plánuje a hlídá. Pořadí lze měnit
  tažením.";
- jeden `apt-panel` „Fáze nástupu" s hlavičkou (ikona `list-check`
  modrá) a souhrnným štítkem vpravo `{{ N }} položek · {{ M }} aktivit`;
- uvnitř **sbalitelné skupiny** (§11.5.1) — jedna skupina = jedna fáze
  (např. „Před nástupem", „První den"), hlavička = chevron + název fáze +
  počet;
- obsah skupiny: max. jedna **aktivita** nahoře (ikona `grip-vertical`
  pro přetažení, název `#4a7fe8`, štítek pozice — světle modré pozadí
  `#eaf1fd`, text `#1572e8` — a ikony `pen`/`trash`), pak **položky
  checklistu** — text modře, vpravo šedý štítek `Pro všechny` a ikona
  `lock` (položky jsou vždy „pro všechny", nejdou editovat tady);
  splněná položka má vlevo `square-check` modře místo prázdného místa;
- patička skupiny = dva odkazy `+ POLOŽKA` a `+ AKTIVITA` (modře,
  řez 700, 12.5px) pro přidání dalšího řádku do dané fáze.

**Hotové bloky:** rám okna `partials/nastorg-pozice-modal.html` (prázdný
obsah, k vložení vlastní sekce), jednotlivé sekce:

| Sekce | Partial |
|---|---|
| Základní info | `partials/nastorg-pozice-zakladni.html` |
| Přiřazení zaměstnanci | `partials/nastorg-pozice-prirazeni.html` |
| Organizační zařazení | `partials/nastorg-pozice-organizacni.html` |
| Pracovní náplň | `partials/nastorg-pozice-naplne.html` |
| Požadavky na kvalifikaci | `partials/nastorg-pozice-kvalifikace.html` |
| Požadavky na způsobilost | `partials/nastorg-pozice-zpusobilost.html` |
| Vybavení, nástroje, systémy | `partials/nastorg-pozice-vybaveni.html` |
| Pracoviště a rizika | `partials/nastorg-pozice-rizika.html` |
| Onboarding checklist | `partials/nastorg-pozice-onboarding.html` |
| Rozvoj zaměstnance | `partials/nastorg-pozice-rozvoj.html` |
| Dokumenty | `partials/nastorg-pozice-dokumenty.html` |
| Školení | `partials/nastorg-pozice-skoleni.html` |
| Seznam pozic (podzáložka „Pracovní pozice", §11.3) | `partials/nastorg-pracovni-pozice.html` |

Starší partialy `nastorg-pozice-pozadavky.html` (→ nahrazeno
`nastorg-pozice-vybaveni.html`) a `nastorg-pozice-aktivity.html` (→
nahrazeno `nastorg-pozice-rozvoj.html`) jsou po tomto přejmenování
zastaralé; prázdné stavy `nastorg-pozice-aktivity-prazdne.html` a
`nastorg-pozice-dokumenty-prazdne.html` čekají na aktualizaci na nový
12položkový rám navigace.

### 11.6 Záložka „Nastavení nadřízených"

Nadpis `Jak se určuje nadřízený` + vysvětlující odstavec. Pod ním **3
karty pravidla** vedle sebe (`Podle organizační jednotky` ·
`Podle pracovní pozice` · `Ručně u zaměstnance`); karta = radio
(`circle-dot` / `circle`) + název + popis. **Aktivní** karta má
`border:1.5px solid #1572e8` a pozadí `#eef4fe`, neaktivní
`border:1.5px solid #e4e2ed` a bílé pozadí. Vybraná je právě jedna.

Pod tím sekce `Výjimky` s počtem a modrým `PŘIDAT VÝJIMKU`, dále tabulka
**Zaměstnanec / pozice · Nadřízený · Platí pro · akce** — stejný styl
tabulky jako §11.4.

---

## 12. Nastavení směrnic → Distribuční listy (menu `nastsm`)

Zdroj pravdy: v1 reálná produkční aplikace, firma „Nerospec" (screenshoty
27. 8. 2026); v2 (16. 9. 2026) nový design hlavní stránky, viz §12.5;
v3 (16. 9. 2026) přejmenování + oprava barev podle novější stránky v
Claude Design, viz §12.8. Sidebar položka „Nastavení směrnic" (`nastsm`,
skupina „Naše firma") dřív nikam nevedla — teď otevírá **celou vlastní
stránku**, ne podzáložky jako §11 (Nastavení organizace).

### 12.1 Hlavní stránka „Distribuční listy" (v3, 16. 9. 2026)

**Tahle sekce popisuje v3** — nahrazuje dřívější „Distribuční seznamy"
(ještě dřív „Seznamy příjemců") podle stránky „Seznamy prijemcu v2" v
Claude Design (POZOR na matoucí číslování stránek — viz §12.8). Skladba
(pořadí je závazné):

1. **Drobečková navigace** (nová v v3): `Nastavení směrnic › Distribuční
   listy` — malý šedý text (`#9096a6`, 12.5px) nad nadpisem, `›`
   oddělovač (`fa-chevron-right`).
2. Nadpis `Distribuční listy` na vlastním řádku (přejmenováno ze
   „Distribuční seznamy" — viz §12.8).
3. **Dvě tlačítka na dalším řádku, podle výsledné akce** — text i ikony
   změněné ve v3 (viz §12.8): primární modré `✓ POTVRZENÍ OD
   ZAMĚSTNANCE` (ikona `circle-check`) a sekundární bílé `ⓘ ZVEŘEJNĚNO
   NA PORTÁLE` (ikona `circle-info`, šedá `#9096a6`) — **BEZ `+` ikony**
   (obě otevírají modal §12.2, jen předvyplní jinou výchozí hodnotu pole
   Způsob doručení v kroku 2/§12.3 — `Vyžaduje potvrzení`, resp. `Pouze
   zveřejněno`). **Plná barva `#1572e8`** u primárního (viz „Primární"
   tlačítko výše v tomto dokumentu) — NE světlejší `#4a7fe8`, který je
   jen výchozí (needitovaný) odstín sdílené třídy `.apt-btn-blue` jinde
   v appce. Stejné pravidlo platí pro VŠECHNA primární tlačítka v této
   §12 (`POKRAČOVAT`, `UPRAVIT ZDROJ`, `ULOŽIT`). Sekundární tlačítko má
   tmavý text `#1a1a1a` a velmi světlý lem `#e2e4ea` (téměř neviditelný,
   OVĚŘENO pixel-by-pixel — NE tmavší `#c8c4d8`/`#3d3a52` z dřívějšího
   kola).
3. Toolbar, **tři odlišné komponenty** (ověřeno pixel-by-pixel na
   Claude Design, viz §12.5 čtvrté a páté kolo — nejsou to tři stejné
   pilulky!):
   - `Zobrazení` — tmavě šedý plný „chip" **`#a6a6ad`, bílý text +
     ikony**, bez lemu (dropdown vzhled, needitovatelné). Je to STEJNÁ
     komponenta jako `.poz-filter` v §11.3 (Nastavení organizace →
     Pracovní pozice) — zavedený vzor pro filtrovací tlačítka v appce,
     ne nový.
   - `Vyhledat distribuční list` a `Název dokumentu` — světlá
     šedomodrá výplň **`#f2f5f7`**, šedý text, bez lemu, **stejná
     pevná šířka** (ne search flex-grow + kratší filtr). `Název
     dokumentu` hledá napříč VŠEMI dokumenty v listu, ne jen v rámci
     aktivní záložky.
5. **Záložky s počtem, VŽDY v tomto pořadí** (nahrazují dřívější tři
   stackované sekce s nadpisy — na obrazovce je vidět vždy jen aktivní
   záložka, přepínání je funkční): `Pro všechny zaměstnance` →
   `Pro pracovní pozice` → `Pro konkrétní zaměstnance`. **Jsou to
   „folder" taby, NE podtržené (underline) taby** — aktivní záložka je
   bílá zaoblená karta (`border-radius:10px 10px 0 0`), která bez mezery
   splývá přímo s tabulkou pod ní (tabulka má nahoře nulový margin a
   levý horní roh ostrý, `border-radius:0 10px 10px 10px`) — vypadá to
   jako JEDEN spojitý bílý tvar. Text+ikona aktivní záložky modré
   (`#1572e8`), počet vpravo jako modrý kolečkový štítek
   (`#1572e8`/bílá). Neaktivní záložky nemají žádné pozadí (prosvítá
   šedá stránky), text+ikona šedé (`#8a90a3`), počet v šedém štítku
   (`#eef0f5`/`#7b8092`), jsou nižší než aktivní (nemají spodní
   padding) — nad tabulkou je proto u nich vidět šedá mezera.
6. Hlavička tabulky (`Název`, `Pravidla distribuce`, …) — OVĚŘENO na
   designu pixel-by-pixel: pozadí **čistě bílé `#fff`** (NE světle šedé
   `#fafbfd`), text **neutrální tmavší šedá `#6b7280`** (NE světlá
   modrošedá `#8a90a3`, která má proti bílému pozadí moc nízký
   kontrast) — jinak beze změny (11.5px, 700, spodní linka `#edeff5`).
7. Tabulka aktivní záložky má sloupce **Název · Pravidla distribuce ·
   Termín akce · Potvrzeno dne · Čeká · Splnění**, na konci kebab menu
   (⋮).
   - **Název** — modrý odkaz, klik otevírá editační modal (§12.3)
     předvyplněný daty toho řádku.
   - **Pravidla distribuce** (dřív sloupec „Akce zaměstnance" s prostým
     textem) — barevný pevně široký (150px, text vycentrovaný) štítek:
     `Vyžaduje potvrzení` = **ORANŽOVÝ wash `#ffede0`/`#c65600`** + ikona
     `circle-check` (OPRAVENO ve v3, viz §12.8 — dřív modrý; modrá
     zůstává jen na primárním tlačítku, štítek má vlastní „pozor/čeká
     se" barvu nezávislou na tlačítku); `Pouze zveřejněno` = neutrální
     šedá `#eef0f5`/`#7b8092` + ikona `circle-info` (design v2 canvasu
     nemá viditelný řádek s tímto stavem — barva ponechána z
     předchozího kola, dokud nebude referenční screenshot). Řez textu
     600 (NE 700, tučnější řez proti designu vypadal moc křiklavě).
   - **Termín akce** — `Za N dní` / `Bez termínu` / `---` (u
     `Pouze zveřejněno` termín vždy `---`, protože se nic nepotvrzuje).
   - **Potvrzeno dne** a **Čeká** — modrá podtržená čísla (odkazy na
     detail plnění, v prototypu bez cíle).
   - **Splnění** — pruh (`#e7e9f0` podklad, `#f2775d` výplň) + text
     `N %`. Barva pruhu je jednotná teplá — v reálné appce jsou
     všechny dosavadní seznamy nízko rozpracované (0–21 %), škála podle
     prahů není zavedená.
   - Prázdná záložka (typicky `Pro konkrétní zaměstnance`) se
     nezobrazuje jako tabulka bez řádků, ale jako samostatný šedý box
     s textem `Zatím žádný distribuční seznam.`

**⚠ Obsah řádků (ukázková data) musí být SMYSLUPLNÝ, ne testovací
smetí.** Tahle stránka je základ pro budoucí návrhovou práci, proto
`NSM_GROUPS_DATA` obsahuje realistické obecné příklady — pro `Pro
všechny zaměstnance` nejčastější firemní směrnice (`Kodex chování a
etika`, `GDPR – Ochrana osobních údajů`, `Bezpečnost práce (BOZP)
2026`, `Požární ochrana a evakuační plán`, `Etický kodex a
whistleblowing`, `Home office a práce na dálku`, `Cestovní náhrady a
diety`), pro `Pro pracovní pozice` konkrétní SOP (Standard Operating
Procedure) vázané na danou pozici (`SOP – Obsluha vysokozdvižného
vozíku`, `SOP – Práce ve výškách`, `SOP – Hygienické standardy ve
výrobě`) — NE 1:1 kopii ad-hoc testovacích záznamů z produkce (názvy
typu „test hal notifikace", „šindel", „tile komponenta test" apod.
se do prototypu jako ZÁKLADU nekopírují).

### 12.2 Modal „Vytvořit seznam příjemců" (krok 1 — Vyberte zdroj)

Jednoduchý první krok: banner `📄 Vyberte zdroj` (`#eef4fe` pozadí,
`#1572e8` text, vycentrovaný) → vysvětlující věta → **jedna karta**
zdroje `Dokument nebo manuál` (viz §12.4 pro vzhled karet — v tomto
kroku je vždy rovnou vybraná, protože je jediná možnost) → pole
`Vyberte zdroj*` → patička s modrým `POKRAČOVAT`, které otevře
editační modal (§12.3).

Pole `Vyberte zdroj*` má dva stavy:
- **Prázdný** (needitovatelné vyhledávací pole, placeholder `Klikněte
  a začněte psát……`) — při zakládání nového seznamu (`+ VYTVOŘIT
  SEZNAM PŘÍJEMCŮ`).
- **Vyplněný** (tmavý text, ikona dokumentu + název zdroje) — když se
  sem přijde přes `✏ UPRAVIT ZDROJ` z editačního modalu (§12.3) a
  seznam už MÁ vybraný zdroj; pole zobrazí ten už vložený dokument
  místo prázdného placeholderu (`nsmStep1HasSource`).

### 12.3 Modal „Upravit seznam příjemců" (nastavení seznamu)

Otevírá se jak z `POKRAČOVAT` (§12.2), tak kliknutím na název
existujícího seznamu (§12.1) — ve druhém případě předvyplněný daty
toho seznamu. Banner `⚙ Nastavení seznamu příjemců` stejného stylu
jako v §12.2.

**⚠ Pořadí sekcí je ZÁVAZNÉ** — vychází z reálné aplikace a odpovídá
logickému sledu rozhodování, NEPŘEHAZOVAT:

1. **Informace o zdroji** — CO se rozesílá. Needitovatelný box: řádky
   `Typ zdroje:` / `Název:` / `Soubory:` (soubory jako modré ikonky +
   název, barva ikony podle typu — PDF `#e53935`, obrázek `#9c27b0`).
   Vpravo od nadpisu sekce modré tlačítko `✏ UPRAVIT ZDROJ` — vrací na
   §12.2, ale **beze ztráty rozpracovaných dat**: rozeditovaný seznam
   (`nsmEdit`) se NERESETUJE, krok 1 jen zobrazí zdroj, který už je
   vložený (pole `Vyberte zdroj*` se chová jako vyplněné, ne jako
   prázdný placeholder) — uživatel tak vidí, co má nastavené, a může
   to případně změnit, ne začínat od nuly.
2. **Příjemci** — KOMU. Tři karty vedle sebe (§12.4): `Konkrétní
   zaměstnanci a skupiny` · `Pracovní pozice` · `Pro všechny
   zaměstnance`. Musí být sekce PŘED „Způsob doručení", protože u
   „Pro všechny zaměstnance" dává smysl jiný přístup k termínu než
   u malé konkrétní skupiny. **Každá karta má vlastní doplňkové pole
   pod mřížkou karet** (vždy nejvýš jedno, nikdy víc najednou):
   - `Konkrétní zaměstnanci a skupiny` → **dvě** pole pod sebou:
     `Přidání zaměstnanci` a `Skupiny zaměstnanců` (obě needitovatelné
     vyhledávací pole, placeholder `Klikněte a začněte psát……`, stejný
     vzhled jako pole zdroje v §12.2).
   - `Pracovní pozice` → **jedno** pole `Pracovní pozice` (`.apt-f-select`
     se šipkou dolů, placeholder `--- Vyberte ze seznamu ---`).
   - `Pro všechny zaměstnance` → žádné doplňkové pole (je to platné
     pro všechny, není co upřesňovat).
3. **Způsob doručení** — JAK (a případně DO KDY). Dvě karty vedle sebe
   (§12.4): `Vyžaduje potvrzení` · `Pouze zveřejněno`.
   - **JEN** když je vybráno `Vyžaduje potvrzení`, zobrazí se řádek
     `Termín potvrzení` se 3 inline radio volbami (ikona kruhu
     `circle-dot`/`circle` + ikona pole + popisek, stejný vzor jako
     §11.6): `Konkrétní datum` · `Počet dnů na potvrzení` · `Bez
     termínu potvrzení`. **Vybraná je vždy právě jedna** (jako u §11.6).
   - Termín potvrzení má i vlastní doplňkové pole (stejné pravidlo jako
     u Příjemců — nejvýš jedno najednou):
     - `Konkrétní datum` → pole `Konkrétní datum` (`.apt-f-input` s
       placeholderem `dd.mm.rrrr` + ikona kalendáře vpravo).
     - `Počet dnů na potvrzení` → pole `Počet dnů na potvrzení`
       (číselný `.apt-f-input`, výchozí `5`).
     - `Bez termínu potvrzení` → žádné doplňkové pole.
   - U `Pouze zveřejněno` se celý blok Termín potvrzení (i jeho
     případné doplňkové pole) skrývá.
4. **Základní informace** — název/popis se řeší AŽ NAKONEC, protože
   výchozí `Název*` se odvozuje ze zdroje (bod 1) a tady se jen
   případně přejmenuje/doplní `Popis` (textarea, placeholder `Zde si
   můžete napsat bližší popis k listu`).

Patička: jen modré `💾 ULOŽIT` vpravo (žádné druhé/šedé tlačítko).

### 12.4 Sdílená komponenta: selectable karta (zdroj / příjemci / doručení)

Karta použitá v §12.2 i §12.3 (zdroj, příjemci, způsob doručení) má
jednotný vzhled: bílé pozadí, `border:1.5px solid #e2e5ef`,
`border-radius:8px`, ikona + tučný název, popisek `#8a90a3` pod tím
odsazený pod text názvu (ne pod ikonu — odsazení `margin-left` přesně
= šířka ikony + mezera, `16px + 9px = 25px`). Vpravo nahoře kolečkový
**checkmark indikátor** (ne radio tečka jako u §11.6/Termín potvrzení
výše) — nevybraný je prázdné kolečko `border:1.5px solid #c7cbd8`,
vybraný je vyplněný `#1572e8` s bílou fajfkou. Vybraná karta navíc
dostává `border-color:#1572e8` a pozadí `#f3f8ff`. V každé skupině
(Příjemci / Způsob doručení) je vybraná právě jedna karta.

**⚠ Ikona je VŽDY zarovnaná nahoru (`align-items:flex-start`), ne na
střed (`center`).** Delší názvy (např. „Konkrétní zaměstnanci a
skupiny") se zalamují na 2 řádky — se zarovnáním na střed by se ikona
u takové karty posunula níž (doprostřed dvouřádkového textu) než u
karet s jednořádkovým názvem, takže by ikony napříč kartami nebyly na
stejné výšce. Se `flex-start` je ikona vždy na úrovni prvního řádku
názvu, tedy vždy „před popisem" a na stejném místě bez ohledu na délku
názvu.

### 12.5 v2 — „Distribuční seznamy" (16. 9. 2026)

Uživatel dodal nový design hlavní stránky (`Seznamy prijemcu v3.dc.html`,
Claude Design) a požádal o výměnu dosavadní „Seznamy příjemců" za tuhle
novou verzi — v master prototypu i jako partial. §12.1 výše už popisuje
VÝSLEDNÝ stav (v2); tahle podsekce jen shrnuje, co konkrétně se změnilo
a proč, pro budoucí orientaci:

- **Nadpis:** „Seznamy příjemců" → „Distribuční seznamy".
- **Tlačítko založení:** jedno `VYTVOŘIT SEZNAM PŘÍJEMCŮ` → dvě podle
  výsledné akce (`NOVÝ SEZNAM PRO POTVRZENÍ` / `NOVÝ SEZNAM PRO
  ZVEŘEJNĚNÍ`), obě s ikonou `+`. Důvod (z návrhového zadání): akce,
  která na konci nastane (musí uživatel potvrdit, nebo je to jen
  zveřejněné), je pro tenhle proces důležitá, tlačítko o ní má rovnou
  mluvit — dřív název tlačítka mluvil jen o založení seznamu, ne o tom,
  co se s ním stane.
- **Stackované sekce → záložky s počtem.** Vizuálně kompaktnější a
  odpovídá designu; pořadí záložek zůstává STEJNÉ jako dřívější pořadí
  sekcí (závazné, viz výše).
- **Sloupec „Akce zaměstnance" (prostý text) → „Pravidla distribuce"
  (barevný štítek).** V designu prošel štítek `Vyžaduje potvrzení`
  postupně tří úpravami, než se ustálil: nejdřív plná primární modrá
  (stejná jako tlačítko), pak (na žádost „až moc křiklavé") zesvětlený
  wash se stejným odstínem textu, nakonec sjednocená pevná šířka
  s `Pouze zveřejněno`, aby oba stavy měly stejně širokou „kostru"
  bez ohledu na délku textu.
- **Toolbar:** vyhledávací pole přejmenováno na „Vyhledat distribuční
  list" + přibyl samostatný filtr „Název dokumentu" (hledá napříč
  všemi dokumenty v listu, nezávisle na aktivní záložce).
- **Beze změny:** editační modal (§12.3), krok 1 „Vyberte zdroj"
  (§12.2), sdílená karta (§12.4), ukázková data (`NSM_GROUPS_DATA`) —
  jen doplněná o `badgeCls`/`badgeIcon` pro nový štítek.

Soubory tohoto kola: `Aptien-aplikace-offline.html` (routing `nastsm`,
`nsm_tabs`/`nsm_active`, `nsmOpenCreatePotvrzeni`/`nsmOpenCreateZverejneni`),
`Aptien-pravidla-pouziti-UI.md` (§12.1 přepsané na v2 + tahle §12.5),
`partials/nastsm-seznamy-prijemcu.html` (samostatná needitovatelná
ukázka, stejná konvence jako ostatní `partials/nastsm-*.html`).

### 12.6 Oprava záložek a filtrů podle Claude Design (16. 9. 2026, 2. kolo)

Uživatel po dodání v2 upozornil, že záložky a filtry **neodpovídají
designu** („opět jsi nedodržel záložky... a taky správné zobrazení
filtrů"). Ověřeno znovu na Claude Design, tentokrát **pixel-by-pixel**
(`getPixel` na screenshotu canvasu, ne jen odhad ze zoomu) — odhalilo
dvě strukturální chyby prvního kola:

- **Záložky byly „underline" styl** (celá lišta bílá, spodní linka
  `#e5e7ef`, 2px modré podtržení u aktivní) — design má ale **„folder
  tab"**: jen aktivní záložka má bílé zaoblené pozadí, které BEZ MEZERY
  splývá s tabulkou pod ní v jeden spojitý bílý tvar (`border-radius:
  10px 10px 0 0` na záložce, `0 10px 10px 10px` na tabulce, `margin-top:0`).
  Neaktivní záložky nemají žádné pozadí (prosvítá šedá stránky) a jsou
  nižší (bez spodního paddingu) — nad tabulkou je proto u nich vidět
  šedá mezera. Viz opravený popis v §12.1 bod 4.
- **Filtry byly všechny tři stejné** (bílé, lem `#d9dde8`) — design má
  ale **tři různé komponenty**: `Zobrazení` je tmavě šedý plný chip
  `#a6a6ad` s bílým textem (zjištěno, že je to STEJNÁ, už zavedená
  komponenta jako `.poz-filter` v §11.3), zatímco `Vyhledat distribuční
  list` a `Název dokumentu` mají světlou šedomodrou výplň `#f2f5f7` bez
  lemu a stejnou pevnou šířku. Viz opravený popis v §12.1 bod 3.

**Poučení pro příště:** u `/design/p/…` odkazů (Claude Design canvas)
nejde použít `Artifact.read` (jen `/artifact/<id>` funguje) — čtení
přes prohlížeč + zoom screenshot je nutné, ale **samotný zoom
screenshot nestačí k odhalení jemných rozdílů výplně** (např. `#f2f5f7`
vs `#a6a6ad` na šedém pozadí stránky vypadají v zoomu podobně). Teprve
`getPixel` (Python/PIL na uloženém screenshotu) na více bodech
spolehlivě odliší skutečné barvy a přesné hranice/šířky komponent.

Soubory tohoto kola: `Aptien-aplikace-offline.html`,
`Aptien-pravidla-pouziti-UI.md` (§12.1 opraveno + tahle §12.6),
`partials/nastsm-seznamy-prijemcu.html`.

### 12.7 Oprava hlavičky tabulky a řezu štítků (16. 9. 2026, 3. kolo)

Uživatel po druhém kole doplnil: „ještě štítky ve sloupci pravidla
distribuce a hlavička tabulky!" Design znovu ověřen pixel-by-pixel:

- **Hlavička tabulky** (`Název`, `Pravidla distribuce`, …) měla
  pozadí `#fafbfd` a text `#8a90a3` — design má ale **čistě bílé
  pozadí `#fff`** a **tmavší neutrální šedý text `#6b7280`** (žádný
  modrý nádech, vyšší kontrast). Zjištěno sampling přes `getPixel` —
  pozadí vyšlo spolehlivě `(255,255,255)`, text kolem `rgb(100,100,100)`
  i s odečtením JPEG/antialiasing šumu jasně tmavší a neutrálnější než
  `#8a90a3`.
- **Štítky v „Pravidla distribuce"** — výplň a barvy (`#e8f0fd`/
  `#1572e8` u „Vyžaduje potvrzení") už seděly přesně (potvrzeno
  samplingem), ale **řez textu byl moc tučný** (700) — v designu
  působí štítek výrazně lehčeji. Sníženo na **600**. Šířka (150px,
  pevná, vycentrovaný text) beze změny — zůstává platná z historie
  úprav v Claude Design chatu k tomuto souboru („Oba štítky mají teď
  pevnou stejnou šířku (150px), text vycentrovaný").

**Ověřeno:** partial přerenderovaný Playwrightem (bílá hlavička,
lehčí štítky) i master prototyp — beze změny chování. Bez nových
chyb v konzoli.

### Soubory tohoto kola

`Aptien-aplikace-offline.html`, `Aptien-pravidla-pouziti-UI.md`
(§12.1 opraveno + tahle §12.7), `partials/nastsm-seznamy-prijemcu.html`.

---

### 12.8 Přejmenování na „Distribuční listy" + oranžový štítek (16. 9. 2026, 4. kolo)

Uživatel po třetím kole poslal **vlastní screenshot** (ne odkaz na
Claude Design) ukazující stránku, která se od dosud implementovaného
`v2` designu (`Seznamy prijemcu v3.dc.html`) zásadně liší: jiný nadpis,
jiná tlačítka, oranžový (ne modrý) štítek. Zpráva: „pořád to vypadá
jinak, podívej na screen a znovu to zkus."

**Příčina — matoucí číslování stránek v Claude Design projektu.**
Sdílený odkaz, který jsme dostali na začátku, vede na stránku
pojmenovanou `Seznamy prijemcu v3` uvnitř Claude Design projektu — ale
ten projekt má **3 stránky** (`Seznamy příjemců` = nejstarší v1,
`Seznamy prijemcu v2`, `Seznamy prijemcu v3`), a název stránky
NEODPOVÍDÁ chronologii: uživatel od třetího kola dál upravoval stránku
pojmenovanou **„v2"**, která je ve skutečnosti NOVĚJŠÍ než „v3" (na
kterou pořád mířil náš odkaz). Screenshot dodaný uživatelem se pixel
přesně shoduje se stránkou `Seznamy prijemcu v2` (stejná data řádků —
„Libor pokus 3/4", „Metodický pokyn pro všechny 16-06" atd. — jen jiný
vzhled) — ověřeno otevřením `?file=Seznamy+prijemcu+v2.dc.html` přímo.

**Co se změnilo oproti dosavadní v2 implementaci** (podle stránky
„v2" v Claude Design, ověřeno pixel-by-pixel + přímo z uživatelova
screenshotu):

- **Nadpis:** „Distribuční seznamy" → **„Distribuční listy"**.
- **Nová drobečková navigace** nad nadpisem: `Nastavení směrnic ›
  Distribuční listy` — v dosavadní implementaci úplně chyběla.
- **Tlačítka přejmenovaná a bez `+` ikony:** `NOVÝ SEZNAM PRO
  POTVRZENÍ` → `POTVRZENÍ OD ZAMĚSTNANCE` (ikona `circle-check`
  místo `plus`); `NOVÝ SEZNAM PRO ZVEŘEJNĚNÍ` → `ZVEŘEJNĚNO NA
  PORTÁLE` (ikona `circle-info`, šedá). Sekundární tlačítko dostalo
  tmavší text (`#1a1a1a` místo `#3d3a52`) a světlejší, téměř neviditelný
  lem (`#e2e4ea` místo `#c8c4d8`).
- **Štítek „Vyžaduje potvrzení" změnil barvu z modré na ORANŽOVOU**
  (`#ffede0`/`#c65600`, ověřeno `getPixel` na uživatelově screenshotu i
  na canvasu) — primární tlačítko zůstává modré, takže barva štítku
  teď NENÍ odvozená od barvy tlačítka (na rozdíl od dřívějšího
  předpokladu v §12.1) — je to samostatná „pozor/čeká se" barva.
  `Pouze zveřejněno` badge nemá na této stránce viditelný příklad
  řádku, ponechán beze změny (šedý).
- **Toolbar, tabulka, záložky (folder-tab), hlavička tabulky** —
  BEZE ZMĚNY, stránka „v2" v tomto ohledu vypadá stejně jako to, co
  jsme už měli implementované (a co jsme ověřili v pátém/šestém kole).

**Poučení pro příště:** v Claude Design projektu s víc stránkami
nevěřit tomu, že název stránky („v2"/„v3") odpovídá časové posloupnosti
úprav — než začít další kolo oprav, otevřít `Choose design systems`/
selektor stránek (`Pages`) v levém panelu a zkontrolovat `Edited …
ago` časové razítko u KAŽDÉ stránky projektu, ne jen té, na kterou vede
uložený odkaz. Sdílený odkaz může směřovat na starší stránku, i když
uživatel dál aktivně upravuje jinou.

**Ověřeno:** partial i master prototyp přerenderované Playwrightem
(nová drobečková navigace, nadpis, tlačítka, oranžový štítek) — tab
switching a editační modal funkční beze změny. Bez nových chyb v
konzoli.

### Soubory tohoto kola

`Aptien-aplikace-offline.html`, `Aptien-menu-reference.md`,
`Aptien-pravidla-pouziti-UI.md` (§12 přejmenováno + §12.1 přepsané +
tahle §12.8), `partials/nastsm-seznamy-prijemcu.html`.

### 12.9 Ohraničení hledacích polí + tlačítka „přidat" (16. 9. 2026, 5. kolo)

Uživatel požádal o dvě věci najednou: (1) sjednotit vzhled hledacích
polí `Vyhledat distribuční list` / `Název dokumentu` s hledacím polem
na obrazovce „Moje směrnice"; (2) vylepšit texty/ikony obou tlačítek
pro založení nového listu, protože dosavadní znění (`POTVRZENÍ OD
ZAMĚSTNANCE` / `ZVEŘEJNĚNO NA PORTÁLE`, ikony `circle-check`/
`circle-info` ze 4. kola) čte jako POPIS STAVU, ne jako AKCE přidání —
uživatelčina slova: „musí být nějak dávat smysl, že to je jako
přidat".

**Ohraničení polí — zdroj pravdy přímo v souboru, ne v Claude Design.**
Jde o vnitřní sjednocení stylu v rámci téhož prototypu, ne o shodu s
externím designem, takže stačilo grepnout stávající CSS hledacího pole
„Moje směrnice" (`border:1px solid #ededf2` + `box-shadow:0 4px 10px
rgba(0,0,0,.05)` + bílé pozadí) a stejné vlastnosti doplnit do
`.nsm-search`/`.nsm-doc-filter` (dřív `background:#f2f5f7; border:none`
bez jakéhokoli ohraničení). Tvar (`border-radius:7px`, výška 36px,
šířka 260px) zůstal — kopíruje se jen OHRANIČENÍ, ne celý tvar pilulky
z „Moje směrnice" (tam je `border-radius:30px`, jiný kontext — velké
centrální hero pole, ne kompaktní toolbar).

**Tlačítka — otevřené zadání, řešeno přes 3 varianty k výběru.**
Protože uživatelka sama napsala „pomoz mi", „asi" a nechala větu
nedokončenou („...xxx"), šlo o výslovné pozvání k návrhu, ne o hotové
zadání — připraveny a odeslány (jako samostatný srovnávací obrázek,
NE rovnou zapracované do prototypu) 3 varianty:

- **A** — nadpis „Vytvořit nový distribuční list" nad tlačítky + text
  „VYTVOŘIT LIST S/KE ..." + ikona `circle-plus`.
- **B** — původní text zachován, jen s prefixem „NOVÝ LIST: ..." +
  původní ikony (`circle-check`/`circle-info`).
- **C** — zkrácený text „PŘIDAT: ..." + ikona `square-plus`.

Uživatelka vybrala **kombinaci B + ikona `circle-plus`** (ne originální
`circle-check`/`circle-info` z varianty B, ale kruhové plus z varianty
A) — výsledný text a ikony:

- `<i class="fa-solid fa-circle-plus">` **NOVÝ LIST: POTVRZENÍ OD
  ZAMĚSTNANCE** (primární modré tlačítko).
- `<i class="fa-solid fa-circle-plus" style="color:#9096a6">` **NOVÝ
  LIST: ZVEŘEJNĚNÍ NA PORTÁLE** (sekundární bílé tlačítko) — všimni si
  slovního tvaru „ZVEŘEJNĚNÍ" (podstatné jméno), ne „ZVEŘEJNĚNO"
  (dosavadní tvar) — s prefixem „NOVÝ LIST:" před ním gramaticky
  navazuje lépe.

**Poučení pro příště — jak ověřit ikony/varianty bez sítě.** V tomhle
sandboxu selhává načtení Font Awesome i přes lokální `@font-face`
(chybí `assets/fonts/*.woff2` na disku, `ERR_TUNNEL_CONNECTION_FAILED`
na CDN) — ikony se v Playwright screenshotech NEVYKRESLÍ vůbec, ani v
`partial.png`, ani nikde jinde v master prototypu. Pro srovnávací
náhled variant (kde je tvar ikony přímo předmětem rozhodování) proto
nepoužívat `<i class="fa-...">`, ale inline SVG s ručně vypsanou
`path` (viz `btn_compare.html`) — jinak návrh vypadá jako prázdné
tlačítko bez ikony a uživatel nemá z čeho vybírat. Chybějící ikony ve
screenshotech samotného prototypu (mimo srovnávací obrázek) NEJSOU
chyba tohoto kola — jde o dlouhodobé omezení prostředí, kód sám je v
pořádku a v reálném prohlížeči s přístupem k fontům se vykreslí
správně.

**Ověřeno:** partial i master prototyp přerenderované Playwrightem
(ohraničení polí, nový text/ikony tlačítek) — přepínání záložek
(„Pro pracovní pozice") a editační modal („Upravit seznam příjemců")
funkční beze změny, bez nových chyb v konzoli.

### Soubory tohoto kola

`Aptien-aplikace-offline.html` (CSS `.nsm-search`/`.nsm-doc-filter` +
obě tlačítka + komentář nad blokem), `partials/nastsm-seznamy-prijemcu.html`
(stejné změny + komentář na začátku souboru), tahle `Aptien-pravidla-pouziti-UI.md`
(§12.9).

### 12.10 Restyle podle standalone exportu z Claude Design (16. 9. 2026, 6. kolo)

Uživatel nahrál `Distribucni listy v3 - standalone.html` — samostatný,
self-contained HTML export z Claude Design (ne screenshot, ne odkaz na
canvas) — se zadáním „udělej podle toho tu stránku, zanech i původní
texty tlačítek". Tenhle typ zdroje je STRUKTURÁLNĚ jiný a spolehlivější
než dřívější zdroje (screenshot/canvas): jde o vykreslitelný HTML se
zabudovaným `<script type="text/x-dc">` obsahujícím přímo zdrojová data
(`RAW_GROUPS`, funkce `barColor()`) a inline styly na každém elementu —
šlo tedy přečíst PŘESNÉ hodnoty (`getComputedStyle` přes Playwright
`page.evaluate`), ne je odhadovat z pixelů.

**Dvě otevřené otázky vyřešené s uživatelem přes `AskUserQuestion`
(důležité, protože soubor si protiřečil s dřívějšími koly):**

1. **Obsah řádků tabulky** — soubor obsahuje 14/3/8 řádků reálných
   produkčních dat konkrétního klienta (nemocnice — `PHŘ pneumologie a
   ftizeologie`, `PHŘ sociálních lůžek` apod.), včetně jednoho řádku s
   reálným příjmením osoby (`... Malínský`) a dvou zjevně testovacích
   řádků `Libor pokus 3`/`Libor pokus 4`. Uživatel zvolil **„Jen vzhled,
   data nechat"** — VZHLED/STRUKTURA se přebírá 1:1 ze souboru, ale
   OBSAH řádků zůstává současný bezpečný ukázkový (Kodex chování a
   etika, GDPR, BOZP 2026 atd. — stejná data jako v §12.1/kolo 3),
   BEZ reálného jména osoby a BEZ testovacích záznamů. Tohle je
   pokračování pravidla z kola 3 (žádná testovací data 1:1).
2. **Nadpis „Distribuční seznamy" (ne „Distribuční listy") + modrý (ne
   oranžový) štítek „Vyžaduje potvrzení"** — přesný OPAK toho, co bylo
   opraveno v kole 7/8 podle uživatelova vlastního screenshotu reálné
   appky. Uživatel na explicitní dotaz zvolil **„Vrátit podle souboru"**
   — potvrdil, že standalone export je novější/autoritativnější zdroj
   pravdy než dřívější screenshot. Nadpis i barva štítku se tedy VRACÍ
   na verzi z kol 4-6 (modrá, „seznamy").

**Co všechno se přesně převzalo ze standalone exportu** (`getComputedStyle`
hodnoty, ne odhad):

- **Nadpis:** `font-size:21.6px; font-weight:800; color:#1a1a1a` (dřív
  22px/700/`#2b2540`).
- **Tlačítka:** ikona `fa-solid fa-plus` (prostý plus, NE `circle-plus`
  z kola 8) — TEXT ale zůstává „NOVÝ LIST: POTVRZENÍ OD ZAMĚSTNANCE" /
  „NOVÝ LIST: ZVEŘEJNĚNÍ NA PORTÁLE" z kola 8 (výslovné přání
  uživatelky, soubor sám má jiný text „NOVÝ SEZNAM PRO POTVRZENÍ" apod.
  — ten se NEPŘEVZAL). Padding primární `11px 20px`, sekundární
  `10px 20px`, lem sekundárního `1.5px solid #ececec`, ikona sekundárního
  `color:#878787`.
- **Toolbar:** `Zobrazení` chip `background:#a4a4a4; height:23px;
  border-radius:4px; padding:0 16px; font-size:12px; font-weight:600`,
  ikona `fa-table-list`. Hledací pole VRACEJÍ se na flat pilulku (kolo 9
  ruší border+shadow z kola 8): `background:#f2f5f7; border:none;
  border-radius:999px; width:320px; padding:8px 14px` — tohle je
  vědomý reverz kola 8 podle nového autoritativního zdroje, ne
  přehlédnutí.
- **Záložky (folder tab):** přidána ikona před textem — `fa-users`
  (Pro všechny zaměstnance), `fa-id-badge` (Pro pracovní pozice, dřív
  `fa-briefcase`), `fa-user` (Pro konkrétní zaměstnance). Barva ikony
  JEN u aktivní záložky (`#1572e8`/`#304FFE`/`#00B8D4` podle skupiny),
  jinak šedá `#878787`. Aktivní záložka dostala `box-shadow:0 5px 20px
  rgba(0,0,0,.1)` — STEJNÝ stín jako tabulka pod ní (`.nsm-table`, také
  nově s tímto stínem místo dřívějšího `1px solid #edeff5` okraje) —
  aby vizuálně splývaly v jednu kartu. Text neaktivní záložky
  `color:#263238` (dřív `#8a90a3`), count-pill neaktivní
  `background:#ececec; color:#878787` (dřív `#eef0f5`/`#7b8092`).
- **Štítek „Pravidla distribuce":** REVERT na modrou (viz bod 2 výše) —
  `background:rgba(21,114,232,.12); color:#1572e8`; „Pouze zveřejněno"
  `background:#ececec; color:#878787`. Užší (90px, dřív 150px),
  hranatější (`border-radius:4px`, dřív `999px` pill), menší písmo
  (9px, dřív 12px).
- **Tabulka — hlavička:** `color:#1a1a1a` (dřív `#6b7280` z kola 6),
  `font-size:12px`, `border-bottom:2px solid #ebedf2`.
- **Tabulka — název řádku:** `.nsm-link` teď TMAVÝ podtržený
  (`color:#1a1a1a; text-decoration:underline; font-weight:700`), NE
  modrý bez podtržení (dřív `#1572e8`, podtržení jen na hover) — reálný
  odkaz teď vypadá jako tmavý podtržený text, ne jako klasický modrý
  hypertextový odkaz.
- **Tabulka — čísla „Potvrzeno dne"/„Čeká":** `.nsm-num` teď šedá
  (`color:#565656`, dřív `#1572e8` modrá) s podtržením.
- **Pruh Splnění:** track užší a vyšší (`120px`/`8px`, dřív
  `170px`/`7px`), plně kulatý (`border-radius:999px`, dřív `4px`).
  **Barva teď podle škály místo jednotné `#f2775d`** — přesná funkce
  `barColor()` ze zdrojového souboru: `pct<=0` → `#ececec` (šedá),
  `pct<35` → `#EF5350` (červená), `pct<67` → `#FF6D00` (oranžová),
  jinak `#00C853` (zelená). Text procenta bez mezery (`0%`, dřív
  `0 %`), barva `#878787` (dřív `#6b7280`).
- **Kebab menu:** barva `#b1b2b3` (dřív `#9096a6`).

**Poučení pro příště — standalone HTML export je lepší zdroj pravdy
než screenshot NEBO odkaz na živý Claude Design canvas.** Dá se otevřít
přímo v Playwright a přečíst `getComputedStyle`/`outerHTML` každého
elementu i CSS proměnné z `:root` — žádné pixel-sampling, žádné
riziko špatně odhadnutého odstínu. Když uživatel takový soubor pošle,
je to silnější signál než dřívější screenshot i než živý odkaz na
canvas (ten může ukazovat jinou stránku, viz kolo 7/§12.8) — ale POKUD
si protiřečí s předchozím explicitně potvrzeným rozhodnutím (jako tady
nadpis/barva štítku), je pořád na místě se zeptat, ne mlčky přepsat
dřívější opravu bez potvrzení.

**Ověřeno:** partial i master prototyp přerenderované Playwrightem
(nadpis, tlačítka, toolbar, záložky s ikonami, modrý štítek, pruh s
barvou podle %) — přepínání všech tří záložek (včetně prázdného stavu
„Pro konkrétní zaměstnance") a editační modal funkční beze změny, bez
nových chyb v konzoli. Barva pruhu ověřena na reálných hodnotách (21 %,
13 %, 18 % → červená, pod prahem 35 %).

### Soubory tohoto kola

`Aptien-aplikace-offline.html` (CSS restyle §12.9 bloku + JS `nsmBarColor`
+ `NSM_GROUP_ICONS` s barvami + komentář nad blokem), `partials/nastsm-seznamy-prijemcu.html`
(stejné vizuální změny, komentář na začátku souboru přepsaný na v4), tahle
`Aptien-pravidla-pouziti-UI.md` (§12.10).

### 12.11 Doladění: text tlačítek 1:1 podle standalone exportu (17. 9. 2026, 7. kolo)

Dvě navazující drobnosti na §12.10, obě přímo od uživatelky v témže
vlákně:

1. **Zjištěný problém: dřívější commit se do repozitáře vůbec
   nedostal.** Když bylo kolo 9 (§12.10) hotové, `device_commit_files`
   selhal, protože se propojení s uživatelčiným počítačem mezitím
   přerušilo — uživatelka tak dál viděla PŘEDCHOZÍ (kolo 8) verzi
   souborů a nahlásila „pořád to nevidím změněný, zejména filtry a
   hledací pole a názvy tlačítek". Než cokoli dalšího opravovat, bylo
   potřeba ověřit `device_list_dir` (velikost/mtime souborů na disku
   vs. lokální verze) — potvrdilo se, že soubory na disku byly
   opravdu starší, ne že by restyle z kola 9 byl špatně. Po opětovném
   připojení se soubory domitovaly úspěšně.
2. **Text tlačítek nakonec 1:1 podle souboru.** V kole 9 uživatelka
   výslovně žádala ponechat text z kola 8 („NOVÝ LIST: POTVRZENÍ OD
   ZAMĚSTNANCE“/„NOVÝ LIST: ZVEŘEJNĚNÍ NA PORTÁLE“) a měnit jen ikonu
   na prostý „+“. Po zjištění bodu 1 výše si to rozmyslela: chtěla i
   text přesně podle standalone exportu. Finální znění: **„NOVÝ SEZNAM
   PRO POTVRZENÍ“** (primární modré) / **„NOVÝ SEZNAM PRO ZVEŘEJNĚNÍ“**
   (sekundární bílé) — ikona „+“ z kola 9 zůstává beze změny.

**Poučení pro příště:** když se `device_commit_files` nepodaří kvůli
přerušenému spojení a soubory se pošlou jen do chatu, je potřeba při
příštím připojení AKTIVNĚ ověřit stav souborů na disku (`device_list_dir`
— velikost/mtime), ne čekat, až si uživatel stěžuje, že nic nevidí
změněné. Zmatek ohledně „změny se neprojevily" může mít dvě různé
příčiny — starý soubor na disku, nebo genuinně nesprávná
implementace — a je potřeba je od sebe rozlišit dřív, než se začne
znovu upravovat kód.

**Ověřeno:** partial i master prototyp přerenderované Playwrightem
(přesný text obou tlačítek), tab switching a editační modal beze
změny, bez chyb v konzoli.

### Soubory tohoto kola

`Aptien-aplikace-offline.html` (text obou tlačítek + komentáře),
`partials/nastsm-seznamy-prijemcu.html` (stejná změna + komentáře),
tahle `Aptien-pravidla-pouziti-UI.md` (§12.11).

---

### 12.12 Bílé pozadí hledacích polí toolbaru (17. 9. 2026, 8. kolo)

Uživatelka: „ještě tedy prosím u inputů search udělej pozadí uvnitř
inputu bílé aby se zvýraznilo samotné pole".

Pole „Vyhledat distribuční list" a filtr „Název dokumentu" (`.nsm-search`,
`.nsm-doc-filter`) měly od kola 9 flat šedou výplň `#f2f5f7` bez okraje
podle standalone exportu — na světle šedém pozadí stránky se ale pole
samo vizuálně ztrácelo. Změna: pozadí pilulky **bílé** (`#fff`) + tenký
světlý okraj `#e3e6ea` (1px), aby pole proti pozadí stránky vystoupilo.
Tvar (pilulka, border-radius 999px), rozměry, ikona a placeholder text
beze změny. Tlačítko „Zobrazení" (`.nsm-toolbar-btn`, tmavě šedý chip)
zůstává beze změny — jde jen o samotná vyhledávací/filtrovací pole.

**Ověřeno:** master prototyp přerenderovaný Playwrightem — obě pole
bílá s viditelným světlým okrajem, bez chyb v konzoli.

### Soubory tohoto kola

`Aptien-aplikace-offline.html` (CSS `.nsm-search`/`.nsm-doc-filter` +
komentář), `partials/nastsm-seznamy-prijemcu.html` (stejná změna +
komentář), tahle `Aptien-pravidla-pouziti-UI.md` (§12.12).

---

### 12.13 Finální standalone export: jednořádkové štítky + „Zdrojové
evidence" (17. 9. 2026, 9. kolo)

Uživatelka nahrála „finální verzi" standalone HTML exportu z Claude
Design (`Distribucni listy v3 - standalone.html`, stejný zdroj jako
§12.10, ale s dvěma novinkami navíc) se třemi požadavky:

1. **Štítek „Pravidla distribuce" na jeden řádek, obě varianty s
   ikonou.** JS logika (`badgeCls`/`badgeIcon`) i CSS (`.nsm-badge`,
   barvy/rozměry) už od §12.10 přesně odpovídaly zdrojovému souboru —
   chybělo ale `white-space:nowrap`, takže se text v užší 90px pilulce
   (9px písmo) zalamoval na dva řádky. Doplněno u `.nsm-badge` v obou
   souborech. „Vyžaduje potvrzení" = modrý wash + `fa-circle-check`,
   „Pouze zveřejněno" = šedá + `fa-circle-info` (beze změny, jen teď
   viditelně na jednom řádku).
2. **Ozubené kolečko „Zdrojové evidence" vpravo od nadpisu.** Nová
   ikona (`.nsm-gear-btn`, kolo pill 36×36px) otevírá modal se
   seznamem evidencí, ze kterých je možné do distribučních seznamů
   vybírat dokumenty — přesně podle struktury zdrojového souboru
   (`ALL_EVIDENCES`, `linkedEvidences`/`availableEvidences`,
   `toggleGear`/`requestAddEvidence`/`confirmAddEvidence` apod.),
   přemapované na `nsm*` state/handlery master prototypu:
   - `nsmEvidences` (6 evidencí, 3 už `linked:true` — Směrnice a
     předpisy, Pracovní pozice, Zaměstnanci; 3 zatím nezapojené —
     Školení, Vybavení a technika, Smluvní dokumentace) — zapojené se
     vypisují nahoře se zelenou fajfkou.
   - Popisný text pod nadpisem modalu uživatelka výslovně chtěla
     přeformulovat, ať dává smysl — místo obecného „Distribuční
     seznamy se sestavují z těchto evidencí" (doslovný text zdroje) je
     teď: **„Evidence, ze kterých je možné do distribučních seznamů
     vybírat dokumenty."**
   - Dole vyhledávací pole „Vyhledat evidenci…" s dropdownem
     (`nsmAvailableEvidences`, filtrováno přes `nsmEvidenceQuery`) —
     klik na položku NEPŘIDÁ evidenci rovnou, ale otevře **dotazující
     se potvrzovací modal** (uživatelčin výslovný požadavek
     „nezapomeň i na dotazující se modál"): „Přidat evidenci
     „{{ nsmPendingEvidenceName }}"?" + vysvětlující text o dopadu
     (zapnutí řízené dokumentace, evidence se stane zdrojem) +
     ZRUŠIT/PŘIDAT EVIDENCI. Potvrzením se evidence přesune do horní
     (zapojené) části seznamu a modal Zdrojové evidence se otevře
     zpátky.
   - Oba modaly použily existující sdílenou třídu `.apt-modal-overlay`
     + `.apt-modal` (stejný vzor jako `nsmCreateOpen`/`nsmEditOpen`),
     ne bespoke inline styly ze zdrojového souboru — kvůli vizuální
     konzistenci s ostatními modaly v prototypu.
   - Partial (`nastsm-seznamy-prijemcu.html`) dostal jen STATICKÝ
     vzhled ozubeného kolečka (bez `sc-if`/`sc-camel-on-click` —
     partial obecně neobsahuje žádné modaly, jen výchozí pohled, viz
     §12.1 a dřívější kola).
   - Zdrojová data evidencí (skutečné názvy dokumentů typu „PHŘ
     pneumologie a ftizeologie Malínský") z nahraného souboru se
     NEKOPÍROVALA — obsahovaly reálné/testovací zdravotnické záznamy
     včetně příjmení, stejný důvod jako u §12.10 (jen vzhled/struktura
     ze souboru, data zůstávají bezpečná ukázková).

**Ověřeno:** master prototyp přerenderovaný Playwrightem — otevření
gear modalu, vyhledání a klik na nezapojenou evidenci → potvrzovací
modal se správným názvem evidence → PŘIDAT EVIDENCI → evidence se
přesune nahoru se zelenou fajfkou, modal Zdrojové evidence zůstane
otevřený. Partial přerenderovaný samostatně (statický gear icon,
jednořádkové štítky). Bez nových chyb v konzoli (existující
nesouvisející SVG/`net::ERR_FILE_NOT_FOUND` chyby jsou stejné jako
v předchozích kolech, netýkají se této oblasti).

### Soubory tohoto kola

`Aptien-aplikace-offline.html` (`.nsm-badge` nowrap, nový `.nsm-gear-btn`
+ `.nsm-ev-*` CSS, state `nsmShowGear`/`nsmEvidences`/…, markup gear
tlačítka + oba modaly, handlery v `renderVals()`), `partials/nastsm-
seznamy-prijemcu.html` (`.nsm-badge` nowrap, statický gear icon), tahle
`Aptien-pravidla-pouziti-UI.md` (§12.13).

---

## 13. Editace evidence („Nastavení evidence") — generický modal

Zdroj pravdy: reálná produkční aplikace (screenshoty 27. 8. 2026,
evidence „Zaměstnanci"). Otevírá se z **tužky vedle názvu evidence**
v toolbaru (`<i class="fa-solid fa-pen">` — stejná ikona, kterou toolbar
evidence už měl/mít měl, jen dřív nikam nevedla). Zapojeno zatím u
evidencí **Zaměstnanci, Rizika, Ochranné pomůcky** — u ostatních
evidencí tužka v toolbaru zatím nic nedělá (nebyly předmětem zadání),
zapojení dalších evidencí je mechanické opakování stejného vzoru
(`evOpen<Modul>` handler, viz §13.1).

**⚠ Tohle je GENERICKÝ modal sdílený VŠEMI evidencemi — ne jen
Zaměstnanci.** Levé menu záložek je pro každou evidenci STEJNÉ:

1. Základní nastavení
2. Kategorie
3. Stavy položek
4. Detaily
5. Přílohy
6. Plány aktivit
7. Vydávání
8. Náklady a spotřeba
9. Zápisy
10. Dashboard evidence
11. Založení položky
12. Pohledy na položky
13. Rychlé akce
14. Nastavení extranetu
15. Upozornění
16. PDF formuláře
17. Online formuláře

**Jediná výjimka: „Onboarding checklist".** Vkládá se do menu **hned ZA
„Plány aktivit"** (v2, dle importu z Claude Design 10. 9. 2026 — dřív
byl dočasně hned za „Základní nastavení", zdrojem pravdy pro pozici je
teď artboard „EDITACE EVIDENCE"), ale **JEN u evidence Zaměstnanci** —
je to obsahově specifické pro nástup nového zaměstnance a u jiné
evidence nedává smysl. Nekopíruj ho k jiným evidencím, i kdyby zadání
říkalo „stejně jako u Zaměstnanci" — je to výslovná výjimka ze
sdíleného seznamu, ne vzor k replikaci.

V prototypu jsou obsahově vypracované záložky **„Základní nastavení"**
(§13.2) a **„Onboarding checklist"** (jen Zaměstnanci, §13.3). Zbylých
16 záložek zobrazuje needitovatelný prázdný stav — šedý rámeček s
ikonou kladiva a textem „Obsah této záložky zatím není v prototypu
definován." Až bude zadání konkrétní záložky rozšiřovat, nahraď JEN
její prázdný stav skutečným obsahem — zbytek modalu (nav, ostatní
záložky) nech beze změny.

### 13.1 Zapojení tužky u další evidence (postup)

Modal je generický, ale šablonovací engine v `<sc-camel-on-click>`
neumí předat argument (`openEvEdit('Rizika')` nefunguje) — proto má
každá zapojená evidence VLASTNÍ handler v `renderVals()`:

```js
evOpenRizika: () => this.setState({ evEditOpen: true, evEditTab: 'zakladni', evEditModuleKey: 'Rizika' }),
```

`evEditModuleKey` musí přesně odpovídat `label` v `TABS` (odtud se
dopočítá ikona a barva evidence). Doplňkové údaje (výchozí zobrazení,
popisný text, jestli je název zamčený, jestli má „Onboarding checklist")
se přidají do `EV_MODULE_META[label]` — bez záznamu v `EV_MODULE_META`
modal spadne na prázdné výchozí hodnoty. Nakonec při tužce dané evidence
přidej `sc-camel-on-click="{{ evOpen<Modul> }}"` na `<i class="fa-solid
fa-pen">` v jejím `TOOLBAR:` bloku.

### 13.2 Záložka „Základní nastavení evidence"

Skladba (pořadí je závazné):

1. Jazykový přepínač **Čeština / Angličtina** — pilulky vedle sebe,
   aktivní = **barva evidence** (`evModule.c800`, ne fixní modrá — každá
   evidence má svou barvu i tady), neaktivní šedý text bez pozadí.
2. **Název evidence** — u **zamčených** evidencí (`evModule.locked`,
   např. Zaměstnanci — jsou to systémové evidence) needitovatelné šedé
   pole se zámkem vpravo + text „U této evidence nelze měnit název" pod
   polem. U ostatních (Rizika, Ochranné pomůcky) obyčejné editovatelné
   pole, bez zámku a bez upozornění.
3. **Výchozí zobrazení** — select, hodnota = `evModule.defaultView`
   (Zaměstnanci „Tabulka", Rizika „Dashboard" — odpovídá tomu, jaký
   pohled evidence v prototypu skutečně otevírá jako první).
4. Řádek **Ikona / Barva evidence / Obrázek**:
   - **Ikona** — čtvercový chip **`border-radius:10px`, fixní modré
     pozadí `#4a7fe8`** (NENÍ tónovaný barvou evidence — to je záměr,
     odpovídá reálné appce) s bílou ikonou evidence (`evModule.icon`).
   - **Barva evidence** — malé kolečko `26px`, barva = přesně
     `evModule.c800` (na rozdíl od ikony TADY barva evidence je vidět).
   - **Obrázek** — bílé obrysové tlačítko „⬆ NAHRÁT OBRÁZEK" (needitovatelné).
5. **Základní informace o evidenci** — textarea, předvyplněná popisným
   textem evidence (`evModule.desc`).
6. Odkaz **„⬇ Uložit nastavení evidence do souboru"** — modrý text
   `#1572e8`, bez rámečku.

Patička modalu: jen `ULOŽIT` (modré `.apt-btn-blue`) vpravo — žádné
druhé/šedé tlačítko, stejně jako u §12.3.

**⚠ Aktivní záložka v levém menu má PEVNOU indigovou `#4b64f5`** — je to
JINÁ barva než `#4a7fe8` u aktivní položky v modalu „Upravit pracovní
pozici" (§11.5). Obě existují v reálné appce vedle sebe (různé části UI,
různé stáří) — nesluč je do jedné a neměň jednu podle druhé, drž se
přesně toho, co ukazuje zdrojový screenshot pro daný modal.

### 13.3 Záložka „Onboarding checklist" (JEN evidence Zaměstnanci)

Zdroj pravdy: Claude Design, projekt „Onboarding checklist umístění",
soubor `Onboarding v2.dc.html` (import 10. 9. 2026), artboard „EDITACE
EVIDENCE" — pro tuto sekci zatím není referenční screenshot reálné
appky (na rozdíl od §13.2), rozložení proto vychází z vizuálního jazyka
modalu „Upravit pracovní pozici" (`.apt-panel`/`.apt-group`, §11.5).
Modal zobrazuje banner „**První verze k připomínkování**" nad obsahem
záložky — nech ho, dokud zadání výslovně neřekne jinak.

**Datový model (závazné, cituje přímo popis artboardu):** „Evidence má
**jeden** onboarding checklist. U každé položky a aktivity se určuje,
jestli platí pro všechny zaměstnance, nebo jen pro vybranou pracovní
pozici." Tedy:

- **Jedna** sada FÁZÍ (ne víc pojmenovaných šablon podle pozice — starší
  návrh, nahrazený tímto). Fáze v prototypu: „Před nástupem" · „První
  den" · „První týden" · „Do 30 dnů".
- Každá fáze = seznam řádků dvou druhů: **POLOŽKA** (checklist, jen
  splněno/nesplněno) a **AKTIVITA** (plánuje a hlídá se, ikona
  `fa-calendar-check`).
- Každý řádek má **scope**: šedý tag „Pro všechny" (výchozí) nebo modrý
  tag s ikonou aktovky „Pro pozici: &lt;název pozice&gt;" (viditelný jen
  u řádků navázaných na konkrétní pracovní pozici).
- Tohle je **ZDROJOVÁ, plně editovatelná** definice — na rozdíl od
  `pozSec_onboarding` / `POZ_ONBOARD_GROUPS` v modalu „Upravit pracovní
  pozici" (§11.5), což je **jiná, samostatná** funkce (needitovatelný
  seznam školení navázaný na pozici, se zámky u položek „Pro všechny")
  a **zůstává beze změny** — nepřebírá data odsud a neslučuj je.
- Zobrazení u konkrétního zaměstnance (drawer, záložka „Onboarding",
  §7.1.8) je **třetí**, samostatná ilustrační datová sada se stavem
  splnění — needitovatelná 1:1 vazba na tento zdroj.

Skladba obsahu záložky (pořadí závazné):

1. Banner „První verze k připomínkování" (`.apt-note`).
2. Nadpis „Onboarding checklist" + vysvětlující text (datový model výše).
3. Panel `.apt-panel` „Fáze nástupu" — hlavička s ikonou
   `fa-list-check`, souhrnný pill „N položek · M aktivit" a vysvětlující
   řádek o rozdílu položka/aktivita a přetahování pořadí.
4. Sbalitelné skupiny `.apt-group` = fáze, každá s pillem počtu řádků.
   Uvnitř řádky (drag handle `fa-grip-vertical` + ikona aktivity u
   aktivit + text + tag scope + tužka + koš), dole odkazy
   „+ POLOŽKA" / „+ AKTIVITA".
5. **⚠ v2 (10. 9. 2026): ŽÁDNÉ tlačítko „Přidat fázi"** — fáze jsou
   fixní, dají se do nich jen přidávat položky/aktivity a přetahovat
   pořadí.

**Přidání položky/aktivity** otevírá SDÍLENÝ modal (stejný, jaký
používá i „+ VLASTNÍ POLOŽKA"/„+ VLASTNÍ AKTIVITA" v drawer záložce
Onboarding, §7.1.8): pole Text, u aktivity navíc „Typ aktivity" (fixně
„Jednorázová") a „Koho upozornit"; pole „Je pro" je tady (needitovatelný
zdroj) **otevřená volba** Pro všechny / Pro vybranou pracovní pozici —
v drawer zaměstnance je stejné pole naopak **zamčené** na „Pouze pro
tohoto zaměstnance".

Patička modalu: jen `ULOŽIT` vpravo, stejně jako u §13.2.

Partial k doslovnému vložení: `partials/evx-onboarding-checklist.html`.

---

## 10. Shrnutí klíčových pravidel

1. Rámec aplikace (top bar `#424242` → tab strip `#424242` → separator →
   sidebar + content) je **vždy stejný**; drawer se vysouvá zprava.
2. **Tmavě šedá `#424242` = top bar i pruh se záložkami, modrá `#1572e8` =
   akce, aktivní záložka = barva modulu `c800`, sémantické barvy = stavy.**
   Stylové hodnoty ber z tokenů `:root`.
3. Menu (bílý sidebar) má dvě skupiny (osobní / „Naše firma"), je sbalitelné
   a rolovatelné, s badge (`alert` / `grey`) a profilem dole.
4. Otevřené moduly = záložky (barva dle `c800`; aktivní = pozadí `c800`,
   neaktivní = bílá s textem `c800`).
5. Evidence nabízí pohledy Dashboard / Seznam / Kanban / Tabulka /
   Kalendář přes „pill" přepínač; pohled je per záložka.
6. Detail = drawer zprava s tenkým akcentem, item taby a sdílenými akcemi.
7. Typografie: **Nunito** (nadpisy i text, dle app kitu); ikony Font Awesome 6
   `solid` + `fw`.
8. Komponenty (drawer, karty, view switcher, badge, tlačítka) jsou sdílené
   a chovají se napříč moduly konzistentně.
9. Konfigurační obrazovky („Nastavení organizace") mají podzáložky ve tvaru
   folder tabů nad bílou kartou; **detail konfiguračního záznamu se otevírá
   jako modální formulářové okno, ne jako drawer** (§11).

---

*Poznámka: Dokument je odvozen z master prototypu
`Aptien-aplikace-offline.html`. Konkrétní texty, jména a hodnoty jsou
ukázková data z prototypu; závaznou předlohou struktury je vždy HTML
prototyp, stylové hodnoty drží UI kit aplikace.*
