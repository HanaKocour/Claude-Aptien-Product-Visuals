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
│  TAB STRIP (#6200EA, aktivní tab = barva c800)│
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

Otevřené záznamy/moduly jsou **záložky** pod app barem na fialovém pruhu
(`#6200EA`). **Aktivní záložka přebírá barvu svého modulu (`c800`)** – tj.
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
| Kalendář | calendar | *„Vyžaduje připojení na internet"* (placeholder) |

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
- **Primární akce „PŘIDAT …"** = **modré** tlačítko `#1572e8` (pilulka),
  bílý text – bez ohledu na modul.
- **Hledání** = pilulka s lupou, **bílé pozadí `#fff` + jemný okraj
  `1px solid #e0dded`** (aby nesplývalo se šedým okolím toolbaru). NE šedá
  výplň – ta se v toolbaru ztrácí.
- **View switcher** vpravo – **VŽDY viditelný a VŽDY všech 5 pohledů**
  (Dashboard · Seznam · Kanban · Tabulka · Kalendář), aktivní pohled
  **modrý** (viz výše). Žádný pohled nevynechávej, i když modul zatím
  nemá jeho vlastní layout (spadne do generického seznamu, ale tlačítko
  tam být musí).

Nic z toho nepřebírá „tématickou" barvu modulu – barva modulu (`c800`) je
jen na ikoně názvu a na záložce.

Toolbar (a v něm view switcher) je viditelný na **všech** pohledech
evidence – nezmizí při přepnutí z dashboardu na seznam/kanban/tabulku.

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
| Kalendář | `showZakCalPlaceholder` | placeholder („Vyžaduje připojení…") |

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

1. **Toolbar** (viz §5.1) – ikona + název modulu, modré „PŘIDAT …",
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

**Kalendář** (`showZakCalPlaceholder`): placeholder na střed (ikona +
„Kalendář" + „Tento pohled bude dostupný v dalším kroku").

> Rizika a Ochranné pomůcky zatím vlastní Seznam/Kanban/Tabulku nemají –
> spadnou do generického seznamu. Když je potřeba plný pohled, **zkopíruj
> blok ze Zakázek** a vyměň data.

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

#### 6.5.1 Barva tlačítka „POTVRDIT" a štítku podle termínu (PEVNÉ pravidlo)

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

### 6.6 Moje konverzace (menu `konv`)

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

> **Dvě varianty draweru — vyber podle zadání:**
>
> | Varianta | Kdy použít | Předloha |
> |---|---|---|
> | **Obyčejný drawer** (výchozí, ČASTĚJŠÍ) | Detail **jednoho** záznamu otevřený ze seznamu/karty. | partial `partials/evidence-drawer.html` (vlož doslovně) |
> | **Vrstvený drawer** (stohované spine) | Když je otevřeno **víc navázaných záznamů nad sebou** – uživatel se proklikal z jednoho záznamu do souvisejícího (např. z vozidla na přiděleného zaměstnance). Vlevo je pak **stoh spine** (breadcrumb otevřených záznamů), v hlavičce bývají **akční tlačítka modulu** (např. „Předání zaměstnanci", „Tisk protokolu") a v akcích **„Zabalit"** místo „Uložit změny". | prototyp `item-drawer-prototyp.html` (zkopíruj strukturu) |
>
> Pravidlo: **není-li v zadání řeč o vrstvení / prokliknutí do souvisejícího
> záznamu, použij obyčejný drawer.** Vrstvený drawer jen když zadání
> explicitně chce víc otevřených záznamů nad sebou (spine stoh) nebo modul
> s akčními tlačítky v hlavičce.

**Item tabs podle modulu:**

| Modul | Záložky detailu |
|---|---|
| Rizika | Detaily · Přílohy · Souvislosti · Úkoly · Konverzace |
| Ochranné pomůcky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Úkoly · Poznámky · Konverzace |
| Zakázky | Detaily · Přílohy · Souvislosti (3) · Kalendář · Zápisy · Úkoly · Poznámky · Konverzace |
| Zaměstnanec | Detaily · Přílohy · Souvislosti · Kalendář · Úkoly · Poznámky · Konverzace |

**Akce v detailu** (sdílené, dle modulu): Oblíbená, Nový report, Moje
reporty, Online formuláře, Výsledky formulářů, Sdílet, Náhled, Oprávnění,
Historie změn. **„Uložit změny" je primární tlačítko** (modré `#1572e8`,
bílý text, pilulka), ne řádek v seznamu akcí – v pravém sloupci akcí je
vizuálně oddělené jako hlavní akce.

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
  3. **Tělo** – **levý sloupec**: pole záznamu (řádky `min-height:52px`,
     oddělovač `#f0eef8`); **pravý sloupec akcí** (`210px`, `border-left`):
     seznam akcí + **primární tlačítko „Uložit změny"** (modré, pilulka) +
     blok *ID / Vytvořeno / Vytvořil / Poslední úprava*.

---

## 8. UI komponenty

| Komponenta | Popis a pravidla |
|---|---|
| **Top bar** | Fialový pruh (`#6200EA`, výška 56 px), vlevo bílé logo + název prostoru, vpravo akční ikony. Notifikační bublina u zvonečku je **vždy červená `#FF3D00`** (počítadlo/alert), nikdy modrá; lem v barvě top baru. |
| **Tab strip** | Fialový pruh (`#6200EA`) se záložkami otevřených záznamů; **aktivní záložka = barva modulu `c800`** (bílý text), neaktivní bílé s textem dle `c800`, zaoblené horní rohy. |
| **Sidebar menu** | **Bílý panel** (`#fff`, šířka 220 px, pravý okraj `1px solid var(--gray-10)`), dvě skupiny (osobní / „Naše firma"), ikona+text, badge, sbalitelné, rolovatelné, profil dole; aktivní položka = tint `rgba(21,114,232,.10)` + text `#1572e8`. |
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
> záložkami (tab strip) = fialová `#6200EA`; akce / tlačítka / aktivní
> prvky = modrá `#1572e8`; **aktivní záložka = barva modulu `c800`**
> (přebírá barvu neaktivního textu); barva modulu (`c800`) pro text/ikonu
> neaktivní záložky, pozadí aktivní záložky a chip. Nezaváděj „tématickou"
> barvu modulu na banner, tlačítka ani pohledy (žádný teal banner apod.).

**Interaktivní akcent (primární):**

- `--primary #1572e8`, `--primary-light #5b9cef`, `--primary-dark #0f50a2`,
  `--primary-deep #082e5d`, `--primary-wash rgba(21,114,232,.08)`.

**Brandová plocha:**

- Top bar `#6200EA` (`--a700-deep-purple`). Pruh se záložkami (tab strip)
  rovněž `#6200EA` – stejná fialová, splývá s top barem.

**Sidebar (světlé menu):** bílá plocha `#fff`, pravý okraj
`1px solid var(--gray-10)`, šířka 220 px; popisky skupin `10px/700`
uppercase `var(--gray-60)` LS `.08em`; položky text `#555`, aktivní =
tint `rgba(21,114,232,.10)` + text `#1572e8`.

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

1. Rámec aplikace (top bar `#6200EA` → tab strip `#6200EA` → separator →
   sidebar + content) je **vždy stejný**; drawer se vysouvá zprava.
2. **Fialová `#6200EA` = top bar i pruh se záložkami, modrá `#1572e8` =
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
