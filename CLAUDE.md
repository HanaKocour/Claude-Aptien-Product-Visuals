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
| Top bar | fialová `#6200EA` | vždy, na všech obrazovkách |
| Pruh se záložkami (tab strip) | fialová `#6200EA` | pozadí pruhu za taby – stejná fialová jako top bar, splývá do jednoho fialového pásu |
| Tlačítka / akce / odkazy / aktivní prvky | modrá `#1572e8` | primární akce („Přidat…"), aktivní pohled ve view switcheru |
| **Aktivní záložka (tab)** | **barva modulu `c800`** | přebírá barvu, kterou má text/ikona té záložky, když je neaktivní – pozadí aktivní záložky = její `c800`, text bílý |
| Sidebar | bílý `#fff` | světlý panel, pravý okraj `1px solid var(--gray-10)`; aktivní položka = tint `rgba(21,114,232,.10)` + text `#1572e8` |
| Barva modulu (`c800`) | dle tabulky záložek | text/ikona neaktivní záložky, **pozadí aktivní záložky** a chip dané záložky – nic víc |
| Sémantické (zelená/červená/oranžová/modrá) | dle stavu | jen stavy, ne dekorace |

> **Konkrétní chyba, které se vyvaruj:** neobarvuj tlačítka ani
> view switcher „tématickou" barvou modulu (např. teal `#00BFA5`).
> Tlačítko „Přidat" je **modré** bez ohledu na modul. **Aktivní záložka
> ale přebírá barvu svého modulu (`c800`)** – tj. tu, kterou má její text,
> když je neaktivní. Banner drží skladbu a barevnost jako v prototypu,
> ne libovolný gradient.

> **Notifikační bublina u zvonečku v top baru = VŽDY červená `#FF3D00`.**
> Je to počítadlo/alert, nikdy ne modrá. Lem bubliny drží barvu top baru.
> Platí i pro počítadla „alert" v levém menu.

> **Toolbar evidence se chová VŽDY jako v prototypu (`Aptien-aplikace-offline.html`).**
> Skladba: ikona + název modulu (`16px/800`, `#1e1b2e`; ikona v barvě
> modulu `c800`) → modré tlačítko „PŘIDAT …" (`#1572e8`) → hledání (pilulka
> `#f2f5f7`) → view switcher vpravo. **Přepínání pohledů je VŽDY modré**:
> aktivní pohled = lem/text `#1572e8` + tint `#e8f0fd`, neaktivní = bílé,
> šedý lem `#c8c4d8`, text `#3d3a52`. View switcher, tlačítko ani hledání
> nikdy nepřebírají barvu modulu. (Design system to dělal špatně – závazný
> je prototyp.)

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

> **Termínové barvy u „Moje směrnice":** tlačítko „POTVRDIT" i štítek se
> barví podle termínu – **červená jen dnes a v minulosti** („X dní po
> termínu"), **oranžová zítra** („za 1 den"), **zelená pozítří a dál**
> („za X dní") a **bez termínu** zelená („∞ Bez termínu"). Není to vždy
> červené a zelené má taky štítek! Detail viz
> `Aptien-pravidla-pouziti-UI.md`, sekce 6.5.1.

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
| Pohledy evidence (Dashboard / Seznam / Kanban / Tabulka / Kalendář) | referenční modul **Zakázky** (má všechny pohledy zvlášť); řízeno `views[tab]` / `activeView` – viz `Aptien-pravidla-pouziti-UI.md` §5.2 |
| Moje směrnice | blok `showSmernMain` (menu `smern` / tab 4) – viz routing níže |
| Směrnice a dokumenty | blok `showDokTilesView` (menu `dok`) – viz routing níže |
| Moje konverzace | blok `isKonv` (menu `konv`) |
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
  - `assets/` – fonty, ikony, JS a obrázky (sdílené oběma prototypy, odkazované relativně)
  - `Aptien-pravidla-pouziti-UI.md` – referenční spec chování UI (desktop)
  - `Aptien-menu-reference.md` – kompletní levé menu k doslovnému zkopírování + pravidla aktivního stavu
  - `Aptien-mobil-intranet-pravidla.md` – spec + podmínky viditelnosti pro zaměstnance (mobil)
  - `_archive/` – původní bundled prototypy (jen historická reference)
- `profile-images/` – profilové obrázky person do avatarů (viz README uvnitř)
- `files/` – zdrojové podklady, šablony rámečků
