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
| Zaměstnanec | Detaily · Přílohy · Souvislosti · Kalendář · Úkoly · Poznámky · Konverzace |

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

---

*Poznámka: Dokument je odvozen z master prototypu
`Aptien-aplikace-offline.html`. Konkrétní texty, jména a hodnoty jsou
ukázková data z prototypu; závaznou předlohou struktury je vždy HTML
prototyp, stylové hodnoty drží UI kit aplikace.*
