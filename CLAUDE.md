# CLAUDE.md

Tento repozitář je **kit pro produktové vizuály** (screenshoty, mockupy,
prototypy pro web a knowledge base) a zároveň **hlavní zdroj pravdy** pro
jejich tvorbu. Vedle sebe se připojují dvě foundation vrstvy – **brandová**
a **aplikační (UI kit)** – ty ale slouží jen jako doplněk.

---

## ⛔ ZÁKLADNÍ DIREKTIVA PRO GENEROVÁNÍ (čti první, platí vždy)

**Vezmi layout odpovídajícího prototypu 1:1 a měň POUZE data.**
Nic víc. Struktura obrazovky se nikdy nepředělává.

- ✅ **Měň jen data:** texty, názvy, jména, čísla, stavy, datumy,
  avatary / profilové obrázky.
- ⛔ **Nikdy neměň (kopíruj přesně z prototypu):** rozvržení a strukturu,
  všechny komponenty a sekce, **celé levé menu se VŠEMI položkami**
  (obě skupiny – osobní i „Naše firma"), taby, barvy a jejich role,
  fonty, rozměry, skladbu banneru a karet.

Když zadání zmiňuje nový modul/obrazovku, **nestav nový layout** – vezmi
nejbližší existující prototyp, zkopíruj ho 1:1 a jen vyměň data. Nikdy
nevynechávej položky menu ani žádnou sekci. Když si nejsi jistý, radši se
zeptej, než abys cokoli domýšlel.

> **Menu vždy celé a se správným aktivním stavem.** Kompletní levé menu
> (všech 15 osobních + 7 firemních položek) k doslovnému zkopírování je v
> **`prototypes/Aptien-menu-reference.md`**. Vždy vlož všechny položky,
> označ jako aktivní **jen jednu** (dle otevřené obrazovky, jinak „Moje
> domovská stránka") a nezaměňuj badge (počty) za zvýraznění.

> Tohle je nejčastější chyba: generátor začne vynechávat položky menu,
> měnit barvy podle „tématu" modulu nebo předělávat layout. **Nedělej to.**
> Prototyp je předloha, ne inspirace.

> **Ikony menu = inline SVG z prototypu (`SVG_ICONS` / `mkNavIcon`), NE
> Font Awesome třídy z Free CDN.** Část ikon menu jsou FA **Pro** (`books`,
> `chart-network`, `grid-horizontal`, `file-chart-column`), které ve Free
> CDN neexistují a vykreslí se jako prázdný čtvereček – to je nejčastější
> příčina „rozbitých ikon". Design system používá FA Free třídy, proto to
> kazí; **ber ikony z prototypu.** Detail v `Aptien-menu-reference.md`,
> sekce *Ikony*.

> ✅ **Hotové bloky k DOSLOVNÉMU vložení (nerekonstruovat!)** v
> `prototypes/partials/`:
> - `sidebar-menu-collapsed.html` – **výchozí stav sidebaru** (56 px, jen ikony, bez badge, bez posuvníku) – použij vždy, pokud zadání výslovně nežádá otevřené menu
> - `sidebar-menu.html` – otevřené menu (220 px, celé levé menu 15 + 7 položek, inline SVG ikony, aktivní stav, badge) – generuj JEN na výslovné zadání („otevřené menu“, „rozbalený sidebar“, „menu s texty“)
> - `evidence-toolbar.html` – **toolbar** (ikona+název, PŘIDAT v barvě modulu, hledání, view switcher – všech 5, aktivní modrá)
> - `evidence-dashboard.html` – pohled **Dashboard** (hero banner „pruh" + mřížka bílých karet)
> - `evidence-table.html` – pohled **Tabulka** (horní lišta, sticky sloupec, hlavička + filtry, řádky)
> - `evidence-list.html` – pohled **Seznam** (karta: řazení → řádky → spodní lišta)
> - `evidence-kanban.html` – pohled **Kanban** (5 sloupců s pevnými barvami, karty, +Přidat)
> - `evidence-kalendar-zamestnanci.html` – pohled **Kalendář**, evidence Zaměstnanci, období **1 Rok** (řádek = zaměstnanec, sloupec = měsíc). Modrá = plánované aktivity, červená = zápisy, fialová = události. Zahrnuje i aktivity, kde je uživatel **účastníkem** jiného záznamu.
> - `evidence-kalendar-zamestnanci-mesic.html` – tentýž pohled, období **Měsíc** (31 sloupců `S 1.` … `P 31.`, pruhy stohované v buňce dne)
> - `evidence-kalendar-zamestnanci-tyden.html` – období **Týden** (7 sloupců, plné texty s časem)
> - `evidence-kalendar-zamestnanci-den.html` – období **Den** (1 sloupec na celou šířku)
> - `evidence-kalendar-zakazky.html` – pohled **Kalendář**, evidence Zakázky (převažují zápisy a události)
> - `evidence-kalendar-audity.html` – pohled **Kalendář**, evidence Audity a kontroly (převažují zápisy a události)
> - `item-drawer-shell.html` – **rám item draweru** (backdrop → panel 80%/920 → spine → hlavička → item tabs → tělo se slotem pro obsah záložky + **kompletní akční sloupec** Zabalit → stavová pilulka → … → Historie změn → Uložit změny *(výchozí šedá/neaktivní, aktivní jen dle zadání)* + blok metadat). Zdroj pravdy pro akce; obsah záložky se vkládá do slotu.
> - `item-drawer-stacked.html` – **vrstvený drawer** (stoh spine = víc otevřených navázaných záznamů + modulová tlačítka v hlavičce + přetékací „›" u tabů); akční sloupec shodný se shellem
> - `evidence-drawer.html` – **pole záznamu (záložka Detaily)** do slotu shellu; jeho vlastní akční sloupec je zkrácený – ber ho ze shellu
> - `konverzace-list.html` – **Moje konverzace / seznam** (hledání + „+", karty konverzací)
> - `konverzace-chat.html` – **Moje konverzace / otevřený chat** (title bar, AI SOUHRN, bubliny, composer)
> - `drawer-tab-detaily.html` – obsah **záložky Detaily** (svislý seznam polí, 8 typů polí; text jednořádkový / víceřádkový a výčet mají plnou šířku, datum `120px` – pravidla §7.1.5)
> - `drawer-tab-souvislosti.html` – obsah **záložky Souvislosti** (nástroje + skupiny navázaných záznamů, **bez grafu**, vše sbalené)
> - `drawer-tab-souvislosti-graf.html` – Souvislosti **se zobrazeným grafem** – jen na výslovné zadání
> - `drawer-tab-zapisy.html` – obsah **záložky Zápisy** (filtry + hlavička sloupců + časová osa)
> - `drawer-tab-plany.html` – obsah **záložky Plány aktivit** (PŘIDAT AKTIVITU + karty skupin se stavovými chipy, **vše sbalené**)
> - `drawer-tab-plany-rozbaleno.html` – rozbalené skupiny Plánů aktivit (3 varianty) – jen na výslovné zadání
> - `drawer-tab-pracovni-zarazeni.html` – obsah **záložky Pracovní zařazení** (JEN modul Zaměstnanec, §7.1.6) – Nadřízený / Podřízení / Pracuje na pozici / Organizační jednotka / Uživatelská skupina, App-Kit User Badge + Tag komponenty. Avatary jsou VŽDY jednotná neutrální App-Kit fallback barva, NE osobní/per-person barvy.
> - `drawer-konverzace.html` – obsah **tabu Konverzace v draweru** (bubliny + composer)
>
> Celá obrazovka evidence = `evidence-toolbar` + jeden z pohledů
> (`dashboard`/`table`/`list`/`kanban`) + volitelně `evidence-drawer`.
> Když generuješ menu nebo evidenci, **vlož odpovídající soubor(y) celé a
> měň jen data** – neskládej je znovu z hlavy. Tím se odstraní vypadávání
> položek, ikon, sloupců a rozpadání layoutu.

### 🧩 Postup skládání obrazovky z partialů (ZÁVAZNÝ) 

> **Nejčastější chyba generování: partial se NEPŘEČTE.** `CLAUDE.md` je jen
> instrukce – obsah partialu musíš skutečně **otevřít (Read) a vložit**.
> Bez přečtení souboru model rekonstruuje z hlavy nebo se chytne app kitu.

Postup pro každou obrazovku:

1. **Urči potřebné partialy** podle mapy níže.
2. **Fyzicky přečti** ty soubory z `prototypes/partials/` (nástroj Read) –
   nespoléhej na paměť ani na app kit.
3. **Vlož je DOSLOVNĚ** do výstupu a měň **jen data** (texty, čísla, jména,
   stavy, datumy, aktivní stav menu/tabu). Strukturu, komponenty, barvy,
   ikony a rozměry nech.
4. **App kit (`Claude-HK-Aptien-App`) pro STRUKTURU ignoruj** – má jen
   ploché ukázky komponent v jiné skladbě. Zdroj skládání = tyto partialy.

**Mapa „co generuji → které partialy vložit":**

| Obrazovka / požadavek | Partialy (v tomto pořadí) |
|---|---|
| Rám aplikace (shell) | top bar + tab strip z `Aptien-aplikace-offline.html` + `sidebar-menu-collapsed.html` (výchozí sbalený stav; `sidebar-menu.html` jen na výslovné zadání otevřeného menu) |
| Evidence – dashboard | `evidence-toolbar.html` + `evidence-dashboard.html` |
| Evidence – tabulka | `evidence-toolbar.html` + `evidence-table.html` |
| Evidence – seznam | `evidence-toolbar.html` + `evidence-list.html` |
| Evidence – kanban | `evidence-toolbar.html` + `evidence-kanban.html` |
| Evidence – kalendář (výchozí období 1 Rok) | `evidence-toolbar.html` + `evidence-kalendar-zamestnanci.html` / `-zakazky.html` / `-audity.html` |
| Kalendář, období Měsíc / Týden / Den | `evidence-toolbar.html` + `evidence-kalendar-zamestnanci-mesic.html` / `-tyden.html` / `-den.html` |
| Detail záznamu (drawer) – **obyčejný, častější** | výše + `item-drawer-shell.html`, do jeho slotu `drawer-tab-detaily.html` |
| Drawer, záložka **Detaily** | `item-drawer-shell.html`, do slotu `drawer-tab-detaily.html` |
| Akční sloupec draweru (menu akcí) | `item-drawer-shell.html` – celý výčet včetně „Zabalit" a stavové pilulky; „Uložit změny" jen při neuložených změnách (pravidla §7.2) |
| Detail záznamu – **vrstvený** (stoh spine, víc navázaných záznamů, akční tlačítka v hlavičce) | `item-drawer-stacked.html`, do jeho slotu obsah záložky — **jen při spínači v zadání, jinak se zeptej** (pravidla §7) |
| Drawer, záložka **Souvislosti** | `item-drawer-shell.html`, do slotu `drawer-tab-souvislosti.html` (se grafem jen na výslovné zadání → `-graf.html`) |
| Drawer, záložka **Zápisy** | `item-drawer-shell.html`, do slotu `drawer-tab-zapisy.html` |
| Drawer, záložka **Plány aktivit** | `item-drawer-shell.html`, do slotu `drawer-tab-plany.html` |
| Drawer, tab Konverzace | `item-drawer-shell.html`, do slotu `drawer-konverzace.html` |
| Drawer, záložka **Pracovní zařazení** (jen modul Zaměstnanec) | `item-drawer-shell.html`, do slotu `drawer-tab-pracovni-zarazeni.html` |
| Nastavení organizace (podzáložky Organizace / Pracovní pozice / Katalog požadavků / Nastavení nadřízených) | `nastorg-organizace.html` / `nastorg-pracovni-pozice.html` + `nastorg-pozice-*.html` (detail pozice) / `nastorg-katalog-pozadavku.html` / `nastorg-nastaveni-nadrizenych.html` – viz `Aptien-pravidla-pouziti-UI.md` §11 |
| Nastavení směrnic → Seznamy příjemců | `nastsm-seznamy-prijemcu.html` (hlavní stránka) + `nastsm-vytvorit-krok1.html` / `nastsm-upravit-seznam.html` (modaly) – viz `Aptien-pravidla-pouziti-UI.md` §12 |
| Moje konverzace – seznam | `konverzace-list.html` |
| Moje konverzace – chat | `konverzace-chat.html` |

Celá obrazovka evidence = `sidebar-menu` + `evidence-toolbar` + jeden pohled
(+ volitelně `evidence-drawer`).

**Jak to formulovat v promptu** (aby se partial opravdu přečetl): pojmenuj
konkrétní soubor(y), použij sloveso **„přečti a vlož doslovně"** a dodej
**„měň jen data, strukturu ani ikony neměň, app kit pro strukturu ignoruj".**
Příklad: *„Přečti a vlož doslovně `prototypes/partials/evidence-toolbar.html`
a `evidence-kanban.html`; toolbar = modul Zakázky (aktivní Kanban), měň jen
data. Nic nerekonstruuj."*

---

## 🖼 Formát výstupu screenshotů (platí pro každý vizuál)

**Každý generovaný náhled / screenshot má rozměr přesně 1920 × 1080 px.
UI se navrhuje na 1536 × 864 CSS px a zvětšuje se 1,25× do výstupního rámu.**

Uvnitř té 1536px vrstvy platí běžné velikosti aplikace (text 13–16 px, horní
lišta 66 px, sidebar 260 px) – v markupu se nic nepřepočítává, zvětšení obstará
rám. Ve výsledku má běžný text ~19 px, takže UI nepůsobí „z dálky".

Rám v `.dc.html`:

```html
<div style="width:1920px;height:1080px;overflow:hidden;position:relative">
  <div style="width:1536px;height:864px;transform:scale(1.25);transform-origin:top left">
    <!-- celé UI aplikace, navržené na 1536 × 864 -->
  </div>
</div>
```

Playwright: `viewport: {width:1536, height:864}`, `deviceScaleFactor: 1.25`.

**Rozpočet obsahu.** Do dashboardu evidence se vejde: tab strip + toolbar
včetně všech 5 pill-tlačítek + hero banner + řada 3 statistických karet +
řada 3 donut karet. **Tabulka kapitol se na dashboard už nevejde** – patří na
samostatný vizuál pohledu Tabulka / Seznam. Sidebar v 864 px končí u „Směrnice
a dokumenty" – **to je v pořádku**, v reálné app taky scrolluje. Odříznutý
**hlavní pohled** dole nebo vpravo je chyba.

Když se skladba nevejde, **ubírej obsah** (méně karet, nižší banner), nikdy
neodsekávej okraj a **nikdy nesnižuj hustotu pod 1,25×**.

⛔ **Nikdy `fullPage: true`**, nikdy neupscalovat menší obrázek.
⛔ **Nepoužívat hustotu 1,0× ani 1,5×** – obě byly 4. 8. 2026 vyzkoušené
a zamítnuté (1,0× působí příliš vzdáleně, při 1,5× se vejdou jen 2 pill-tlačítka
z 5 a screen je prázdný).
⛔ **Přetečení vždy ověřit měřením**, ne pohledem – původní `ShodaISO9001…`
náhled měl odříznuté spodní řádky tabulky, aniž to bylo na první pohled vidět.

> Detail, odůvodnění a checklist kontroly:
> **`prototypes/Aptien-pravidla-screenshotu.md`**

---

## ⭐ Zdroj pravdy: hlavní je TENTO repozitář

Při tvorbě design systému se **načítají všechny repozitáře**, ale
**hlavní a rozhodující zdroj pravdy je tento kit** (`Claude-Aptien-Product-Visuals`)
– zejména jeho **prototypy** v `prototypes/` a pravidla v `CLAUDE.md` a
`prototypes/*.md`.

Priorita (od nejvyšší):

1. **Tento repozitář** – prototypy, tokeny, barevné role a pravidla tady
   jsou závazné. Když něco definuje tento kit, **platí to** a nic to
   nepřebíjí.
2. **Aplikační UI kit** (`Claude-HK-Aptien-App`) – doplněk pro komponenty
   a hodnoty, které tento kit **nedefinuje**. Nikdy nepřebíjí prototypy tady.
3. **Brandový manuál** (`Claude-Aptien-Brand-Manual`) – logo, maskot,
   persony, marketingový rámec. Doplněk, ne zdroj UI hodnot.

Ostatní repozitáře jsou tedy **připojené vedle**, ale jen jako reference.
Barvy, tokeny, fonty, layout a chování ber **primárně z prototypů a
pravidel v tomto repu**.

> **Při konfliktu vyhrává tento repozitář.** Když se prototyp/pravidlo tady
> rozchází s app kitem nebo brand manuálem, platí to, co je tady. Foundation
> repa se použijí jen tam, kde tento kit mlčí.

> **Zároveň drž konzistenci s app kitem.** Tenhle repo je zdroj pravdy pro
> screenshoty a vizuály, ale sdílené hodnoty (barvy, tokeny, radiusy,
> velikosti štítků apod.) se **nesmí rozcházet** s aplikačním UI kitem
> (`Claude-HK-Aptien-App`) – aby vizuály ladily s návrhy generovanými do
> samotné aplikace. Když app kit nějakou hodnotu definuje, převezmi ji sem
> (stejná hodnota i název); vlastní tokeny přidávej jen tam, kde app kit
> mlčí.

---

## ⛔ Nejdůležitější pravidlo: prototyp je PŘEDLOHA, ne inspirace

**Když pro zadanou obrazovku existuje odpovídající prototyp v `prototypes/`,
NIKDY nestav nový screen od nuly.** Prototyp je závazný zdroj pravdy pro
strukturu, layout a komponenty. Postupuj takto:

1. **Zkopíruj prototyp 1:1** – převezmi jeho přesnou strukturu (DOM/vrstvy),
   rozměry, komponenty a rozvržení.
2. **Změň jen to, co je v zadání** – texty, data, konkrétní obsah. Nic
   jiného nepředělávej.
3. **Nedomýšlej ani nevylepšuj layout.** Když prototyp něco neřeší, drž se
   pravidel v `prototypes/Aptien-pravidla-pouziti-UI.md`, ne vlastního
   návrhu.

Formulace zadání typu „navrhni obrazovku pro X" NEZNAMENÁ „vymysli novou" –
znamená „vezmi odpovídající prototyp a naplň ho obsahem X". Když si nejsi
jistý, který prototyp použít, zeptej se; nikdy netvoř nový naslepo.

### ⛔ Co si NIKDY nevymýšlej

Když plníš prototyp obsahem, měň **jen texty a data**. Tohle se nikdy
nemění ani nevymýšlí:

- **Barvy a jejich role** (viz tabulka níže) – nezaváděj nové akcentové barvy.
- **Layout a komponenty** – nepřidávej ani neubírej sekce, karty, sloupce,
  metriky. Drž přesnou skladbu prototypu.
- **Nové moduly** – nevytvářej modul, který v prototypu není, jen proto, že
  ho zadání zmiňuje. Použij nejbližší existující modul jako předlohu a jen
  vyměň obsah.
- **Celé menu** – sidebar má vždy **všechny** položky z prototypu (obě
  skupiny). Nikdy žádnou položku nevynechávej ani nepřidávej.

### 🎨 Barevné role jsou PEVNÉ (nejčastější chyba)

Barvy mají v celé aplikaci **pevnou roli** a platí **stejně pro každý
modul**. NEŘIĎ se „tématem" modulu – nedělej z barvy modulu barvu celé
obrazovky.

| Prvek | Barva | Pravidlo |
|---|---|---|
| Top bar | tmavě šedá `#424242` | vždy, na všech obrazovkách (`#6200EA` je STARÁ barva, v prototypu už není) |
| Pruh se záložkami (tab strip) | tmavě šedá `#424242` | pozadí pruhu za taby – stejná šedá jako top bar, splývá do jednoho šedého pásu. Jednotlivé neaktivní taby jsou bílé pilulky (`#fff`) s textem v barvě modulu `c800` – to zůstává. |
| Tlačítka / akce / odkazy / aktivní prvky | modrá `#1572e8` | aktivní pohled ve view switcheru, „Uložit změny", odkazy v polích |
| **Všechna „přidat" v evidenci** | **barva modulu `c800`** | „PŘIDAT …" v toolbaru, „+ Přidat" v kanban sloupcích, inline „+ přidat" v polích draweru — VÝJIMKA z modré |
| **Aktivní záložka (tab)** | **barva modulu `c800`** | přebírá barvu, kterou má text/ikona té záložky, když je neaktivní – pozadí aktivní záložky = její `c800`, text bílý |
| Sidebar | bílý `#fff` | světlý panel, pravý okraj `1px solid var(--gray-10)`; aktivní položka = tint `rgba(21,114,232,.10)` + text `#1572e8` |
| Barva modulu (`c800`) | dle tabulky záložek | text/ikona neaktivní záložky, **pozadí aktivní záložky** a chip dané záložky – nic víc |
| Sémantické (zelená/červená/oranžová/modrá) | dle stavu | jen stavy, ne dekorace |
| **Pruh v kalendáři – plánovaná aktivita** | **modrá `#0091EA`** | pevná role, nezávisle na modulu (pravidla §5.5.1) |
| **Pruh v kalendáři – zápis** | **červená `#EF5350`** | pevná role |
| **Pruh v kalendáři – událost** | **fialová `#6200EA`** | pevná role |
| Značka „teď" v kalendáři | `#FF3D00` | stejná červená jako notifikační bublina |
| **Přepínač období v kalendáři** (Den/Týden/Měsíc/1 Rok) + šipky `‹ ›` | tmavě šedá `#424242` | **VÝJIMKA z modré** — není to view switcher; aktivní volba = inverze (bílé pozadí, šedý text) |

> **Konkrétní chyba, které se vyvaruj:** neobarvuj **view switcher**
> „tématickou" barvou modulu (např. teal `#00BFA5`) – ten je vždy modrý.
> **Aktivní záložka přebírá barvu svého modulu (`c800`)** – tj. tu, kterou
> má její text, když je neaktivní. Banner drží skladbu a barevnost jako
> v prototypu, ne libovolný gradient.

> ⛔ **„Přidat" = VŽDY barva evidence (modulu `c800`), nikdy modrá.**
> Platí pro **všechna** přidávací UI v evidenci: velké „PŘIDAT …"
> v toolbaru (plné pozadí `c800`, bílý text, stín `0 2px 6px rgba(<c800>,.28)`),
> „+ Přidat" v kanban sloupcích i inline „+ přidat" v polích draweru
> (text v `c800`, `700`). **Modrá `#1572e8` zůstává** view switcheru,
> „Uložit změny" a odkazům na hodnoty v polích.
>
> | Modul | Barva „přidat" (`c800`) |
> |---|---|
> | Rizika | `#E91E63` |
> | Ochranné pomůcky | `#D84315` |
> | Zakázky | `#1565C0` |
> | Zaměstnanci | `#f1c40f` |

> **Notifikační bublina u zvonečku v top baru = VŽDY červená `#FF3D00`.**
> Je to počítadlo/alert, nikdy ne modrá. Lem bubliny drží barvu top baru.
> Platí i pro počítadla „alert" v levém menu.

> **Toolbar evidence se chová VŽDY jako v prototypu (`Aptien-aplikace-offline.html`).**
> Skladba: ikona + název modulu (`16px/800`, `#1e1b2e`; ikona v barvě
> modulu `c800`) → tlačítko „PŘIDAT …" **v barvě modulu `c800`** → hledání (pilulka
> **bílá `#fff` + jemný okraj `1px solid #e0dded`**, ne šedá výplň – ať
> nesplývá s okolím) → view switcher vpravo. **Přepínání pohledů je VŽDY modré**:
> aktivní pohled = lem/text `#1572e8` + tint `#e8f0fd`, neaktivní = bílé,
> šedý lem `#c8c4d8`, text `#3d3a52`. **View switcher ani hledání nikdy
> nepřebírají barvu modulu** – na rozdíl od tlačítka „PŘIDAT …", které ji
> má vždy. (Design system to dělal špatně – závazný je prototyp.)

> **View switcher = VŽDY viditelný a VŽDY všech 5 pohledů** (Dashboard ·
> Seznam · Kanban · Tabulka · Kalendář) na každé obrazovce evidence. Žádný
> pohled nevynechávej, i když modul nemá vlastní layout.

> **Dashboard evidence má POVINNOU skladbu: toolbar → hero banner
> (gradientový „pruh") → mřížka bílých karet.** Nejčastější chyba
> generátoru je vynechání hero banneru a start rovnou kartami – **to není
> dashboard.** Hero banner je 1. prvek obsahu (2-stupňový gradient `c800`
> → +30 % bílé, název `26px/800` + popis). Zkopíruj celý blok
> `show…Dashboard` z prototypu (Rizika/Zakázky). Detail:
> `Aptien-pravidla-pouziti-UI.md` §5.3.

> **Skelet ostatních pohledů i drawer je taky pevný a bere se z prototypu
> (referenční modul Zakázky):** Seznam / Kanban / Tabulka viz
> `Aptien-pravidla-pouziti-UI.md` §5.4, **Kalendář má vlastní sekci §5.5**; item detail drawer (backdrop →
> panel `80%`/`min 920px` → spine → hlavička → item tabs → tělo + pravý
> sloupec akcí) viz §7.1. Nezačínej žádný pohled od nuly – kopíruj blok.

> **Gradient hero banneru na dashboardu evidence = přesně 2 stupně.**
> 1. barva (`0%`) = **základní barva modulu (`c800`)** tak, jak je
> popsaná v tabulce záložek; 2. barva (`100%`) = **stejná barva
> zesvětlená smícháním s 30 % bílé** (poměr `70 % base + 30 % #fff`,
> shodný s odvozením `--primary #1572e8` → `--primary-light #5b9cef`).
> Úhel `135deg`. Žádný tmavší úvodní stupeň, žádné tři a víc stupňů.
>
> | Modul | 1. barva (`c800`) | 2. barva (+30 % bílá) |
> |---|---|---|
> | Rizika | `#E91E63` | `#F06292` |
> | Ochranné pomůcky | `#D84315` | `#E47B5B` |
> | Zakázky | `#1565C0` | `#5B93D3` |
>
> Pro jiný modul spočti 2. barvu stejným poměrem:
> `round(kanál × 0,7 + 76,5)` pro R, G i B.

> **Kalendář evidence má vlastní pevnou skladbu (§5.5) — už to není
> placeholder.** Navigační lišta (`‹ ›` + název období + přepínač
> **Den / Týden / Měsíc / 1 Rok**) → mřížka, kde **řádek = položka evidence**
> a **sloupec = období**. Pruhy v buňce se **stohují pod sebe a NEROZTAHUJÍ
> se přes víc sloupců** (není to Gantt). Barvy pruhů jsou pevné role
> (modrá plán / červená zápis / fialová událost) a **přepínač období je
> tmavě šedý `#424242`, ne modrý** — je to výjimka z pravidla o modrých
> přepínačích. **Mřížka vždy vyplní celou šířku okna**: sloupec jmen je pevný
> (`flex:0 0 Npx`), sloupce období pružné (`flex:1 1 0;min-width:Npx`) —
> nikdy nenechávej mřížku zmenšenou s prázdným místem vpravo. U evidence
> **Zaměstnanci** se v řádku zobrazují i aktivity, kde je uživatel jen
> **účastníkem** jiného záznamu.

> **Termínové barvy u „Moje směrnice":** tlačítko „POTVRDIT" i štítek se
> barví podle termínu – **červená jen dnes a v minulosti** („X dní po
> termínu"), **oranžová zítra** („za 1 den"), **zelená pozítří a dál**
> („za X dní") a **bez termínu** zelená („∞ Bez termínu"). Není to vždy
> červené a zelené má taky štítek! Detail viz
> `Aptien-pravidla-pouziti-UI.md`, sekce 6.6.1.

> **`.md` popis je jen doplněk, ne zadání.** `Aptien-pravidla-pouziti-UI.md`
> popisuje pravidla a chování. Zdrojem struktury je vždy konkrétní **HTML
> prototyp**, ne prozaický popis. Nikdy nestav screen jen podle `.md`.

> **Formát master prototypu (čitelné HTML + assets).** Hlavní prototyp
> `prototypes/Aptien-aplikace-offline.html` je zeštíhlené, čitelné HTML:
> fonty, ikony a JS jsou vytažené do `prototypes/assets/` a HTML na ně
> odkazuje relativně. Reálná struktura je přímo v DOM – dá se číst i
> kopírovat bez rozbalování. Pro plné vykreslení otevírej přes lokální
> server / v design nástroji (kvůli relativním `fetch`), ne dvojklikem
> z disku.

> **Staré bundled prototypy jsou v `prototypes/_archive/`.** Jsou to původní
> „bundled" stránky (struktura zabalená v `<script type="__bundler/template">`,
> rozbaluje ji až JS). Neber je jako předlohu – slouží jen jako historická
> reference. Závaznou předlohou je vždy master prototyp výše.

### Mapa: obrazovka → prototyp

Existují **dva master prototypy** – desktop a mobil/intranet. Podle zadání
vyber správný, najdi v něm odpovídající obrazovku a tu kopíruj –
nezakládej nový soubor.

**Desktop** – `prototypes/Aptien-aplikace-offline.html` (plná evidence,
tab strip + sidebar):

| Zadaná obrazovka / modul | Kde v master prototypu |
|---|---|
| Menu, top bar, app bar, shell aplikace | společný rámec `Aptien-aplikace-offline.html` |
| Evidence rizik (riziková matice, přehled) | modul *Rizika* |
| Zakázky | modul *Zakázky* |
| Ochranné pomůcky | modul *Ochranné pomůcky* |
| Směrnice (policies) | modul *Směrnice* |
| Obecná evidence + pohledy (dashboard / list / tabulka / drawer) | přepínač pohledů v evidenci |
| Pohledy evidence (Dashboard / Seznam / Kanban / Tabulka) | referenční modul **Zakázky** (má všechny pohledy zvlášť); řízeno `views[tab]` / `activeView` – viz `Aptien-pravidla-pouziti-UI.md` §5.2 |
| Pohled **Kalendář** (Zaměstnanci / Zakázky / Audity a kontroly) | generický blok `showCalendar`; období řídí `calPeriods[tab]` + `calVals()` – viz §5.5 |
| Audity a kontroly | modul *Audity a kontroly* (tab 14, `c800 #FF8F00`) – zatím jen pohled Kalendář |
| Moje směrnice | blok `showSmernMain` (menu `smern` / tab 4) – viz routing níže |
| Směrnice a dokumenty | blok `showDokTilesView` (menu `dok`) – viz routing níže |
| Moje konverzace | blok `isKonv` (menu `konv`) |
| Nastavení organizace | blok `showNastOrg` (menu `nastorg`) – vlastní stránka se 4 podzáložkami (Organizace / Pracovní pozice / Katalog požadavků / Nastavení nadřízených), viz §11 a `Aptien-menu-reference.md` |
| Nastavení směrnic → Seznamy příjemců | blok `showNastSm` (menu `nastsm`) – vlastní stránka BEZ podzáložek (na rozdíl od Nastavení organizace), viz §12 a `Aptien-menu-reference.md` |
| Pravidla a chování UI (referenční spec) | `prototypes/Aptien-pravidla-pouziti-UI.md` |

> **Obrazovky z menu nejsou komponenty – jsou to bloky `<sc-if>` v master
> prototypu, řízené stavem `activeNav` / `activeTab`.** Kompletní mapa
> „položka menu → flag → blok → data" a postup, jak vygenerovat obrazovku
> pro položku menu (Moje směrnice, Směrnice a dokumenty i ostatní), je v
> **`prototypes/Aptien-menu-reference.md`**, sekce *„Menu → obsah (routing)"*.
> Design system tohle routování nezná – když tvrdí, že obrazovku „udělal",
> ale nenapojí se, **platí prototyp**: sáhni pro flag a blok tam.

**Mobil / intranet** – `prototypes/Aptien-mobil-intranet.html`
(zaměstnanecké zobrazení na telefonu, rám 390 × 844):

| Zadaná obrazovka / modul | Kde v master prototypu |
|---|---|
| Mobilní intranet – rozcestník zaměstnance | obrazovka *home* v `Aptien-mobil-intranet.html` |
| Odkazy na externí stránky / aplikace | dlaždice na obrazovce *home* (ne přihlášení) |
| Konverzace / chat + AI souhrn | obrazovky *conversations* / *chat* |
| Co je viditelné pro zaměstnance (podmínky) | `prototypes/Aptien-mobil-intranet-pravidla.md` |

> Mobil sdílí assety, tokeny, fonty a ikony s desktopem – je to jiný
> layout téhož produktu, ne jiná značka.

---

## Postup při generování vizuálu

1. **Najdi odpovídající prototyp** v mapě výše. Pokud existuje → řiď se
   pravidlem „prototyp je předloha" (kopíruj 1:1, měň jen obsah). Pokud
   žádný neodpovídá → zeptej se, nebo teprve pak stav nový podle pravidel.
2. Jako **doplněk** načti brandový manuál (`Claude-Aptien-Brand-Manual`) –
   logo, maskot, persony. Nepřebíjí prototypy tady.
3. Jako **doplněk** načti aplikační UI kit (`Claude-HK-Aptien-App`) –
   jen pro komponenty/hodnoty, které tento repozitář nedefinuje.
4. Vyber typ výstupu a podle něj zdroj v tomto kitu:
   - `screenshots/` – syrové záběry aplikace
   - `mockups/` – desktop / mobil rámečky s UI
   - `prototypes/` – **předlohy** UI (master prototyp; kopíruj, needituj naslepo)
   - `profile-images/` – profilovky person do avatarů (viz `profile-images/README.md`)
5. Drž jednotný styl podle existujících ukázek a podkladů ve `files/`.
6. Vygeneruj vizuál, který vychází z prototypu (když existuje), je on-brand,
   odpovídá reálnému UI aplikace a je konzistentní se zbytkem knihovny.

> **Stylové hodnoty ber z tohoto repozitáře.** Barvy, tokeny, fonty a
> chování jsou závazně definované v prototypech a pravidlech tady
> (`prototypes/`, `Aptien-pravidla-pouziti-UI.md`). App kit a brand manuál
> jsou jen doplněk pro to, co tento repozitář nedefinuje.

> **Při konfliktu vyhrává TENTO repozitář.** Když se prototyp/pravidlo tady
> rozchází s app kitem nebo brand manuálem, platí to, co je tady. Foundation
> repa nikdy nepřebíjejí prototypy a pravidla v tomto kitu.

---

## Obsah kitu

- `screenshots/` – syrové záběry aplikace
- `mockups/` – desktop / mobil rámečky s vloženým UI
- `prototypes/` – **závazné předlohy** UI (kopíruj 1:1, viz pravidlo výše)
  - `Aptien-aplikace-offline.html` – **master prototyp: desktop** (celá aplikace, čitelné HTML)
  - `Aptien-mobil-intranet.html` – **master prototyp: mobil / intranet** (zaměstnanecké zobrazení)
  - `item-drawer-prototyp.html` – **klikací ukázka vrstveného draweru** (přepínání Detaily / Souvislosti). ⛔ **NEBER z něj strukturu** – má vlastní `.kd-*` CSS, které se do generovaných obrazovek nehodí. Předlohou k vložení je `partials/item-drawer-stacked.html`.
  - `assets/` – fonty, ikony, JS a obrázky (sdílené oběma prototypy, odkazované relativně)
  - `Aptien-pravidla-pouziti-UI.md` – referenční spec chování UI (desktop)
  - `Aptien-menu-reference.md` – kompletní levé menu k doslovnému zkopírování + pravidla aktivního stavu
  - `Aptien-mobil-intranet-pravidla.md` – spec + podmínky viditelnosti pro zaměstnance (mobil)
  - `Aptien-pravidla-screenshotu.md` – **formát výstupu vizuálů** (1920 × 1080, návrh na 1536 × 864 se zvětšením 1,25×), rozpočet obsahu a checklist
  - `Aptien-pravidla-anotovanych-vizualu.md` – pravidla pro anotační vrstvu nad vizuálem (viz `partials/anotace-vrstva.html`)
  - `Aptien-pravidla-kombinovanych-vizualu.md` – pravidla pro kombinované vizuály víc obrazovek najednou (viz `partials/combo-scena.html`)
  - `prompt-sablona-aptien.md` – šablona promptu pro zadání nového vizuálu
  - `partials/` – **hotové statické bloky k doslovnému vložení** (nerekonstruovat):
    `sidebar-menu-collapsed.html` (výchozí sbalené menu, jen ikony) /
    `sidebar-menu.html` (otevřené menu, jen na výslovné zadání),
    `evidence-toolbar.html` (toolbar), `evidence-dashboard.html` (Dashboard),
    `evidence-table.html` (Tabulka), `evidence-list.html` (Seznam),
    `evidence-kanban.html` (Kanban),
    `evidence-kalendar-zamestnanci.html` / `-mesic` / `-tyden` / `-den`,
    `evidence-kalendar-zakazky.html`, `evidence-kalendar-audity.html` (Kalendář),
    `item-drawer-shell.html` (rám draweru + akční sloupec),
    `item-drawer-stacked.html` (vrstvený drawer se stohem spine),
    `evidence-drawer.html` (pole záznamu do záložky Detaily),
    `drawer-tab-detaily.html` / `-souvislosti.html` / `-souvislosti-graf.html` /
    `-zapisy.html` / `-plany.html` / `-plany-rozbaleno.html` (obsah dalších
    záložek draweru),
    `drawer-tab-pracovni-zarazeni.html` (záložka Pracovní zařazení, jen
    modul Zaměstnanec, §7.1.6),
    `konverzace-list.html` (Moje konverzace – seznam),
    `konverzace-chat.html` (Moje konverzace – otevřený chat),
    `drawer-konverzace.html` (tab Konverzace v draweru),
    `smernice-moje.html` / `-nepotvrzeno.html` / `-potvrzeno-rozbaleno.html` /
    `-splneno.html` (Moje směrnice – jednotlivé stavy),
    `nastorg-organizace.html`, `nastorg-pracovni-pozice.html`,
    `nastorg-pozice-*.html` (detail pracovní pozice – záložky + modal),
    `nastorg-katalog-pozadavku.html`, `nastorg-nastaveni-nadrizenych.html`
    (Nastavení organizace, §11),
    `nastsm-seznamy-prijemcu.html`, `nastsm-vytvorit-krok1.html`,
    `nastsm-upravit-seznam.html` (Nastavení směrnic → Seznamy příjemců, §12),
    `anotace-vrstva.html` (anotační vrstva nad vizuálem, viz
    `Aptien-pravidla-anotovanych-vizualu.md`),
    `combo-scena.html` (kombinovaný vizuál víc obrazovek najednou, viz
    `Aptien-pravidla-kombinovanych-vizualu.md`)
  - `_archive/` – původní bundled prototypy (jen historická reference)
- `profile-images/` – profilové obrázky person do avatarů (viz README uvnitř)
- `files/` – zdrojové podklady, šablony rámečků
