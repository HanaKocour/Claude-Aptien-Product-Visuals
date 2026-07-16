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
> (všech 15 osobních + 6 firemních položek) k doslovnému zkopírování je v
> **`prototypes/Aptien-menu-reference.md`**. Vždy vlož všechny položky,
> označ jako aktivní **jen jednu** (dle otevřené obrazovky, jinak „Moje
> domovská stránka") a nezaměňuj badge (počty) za zvýraznění.

> Tohle je nejčastější chyba: generátor začne vynechávat položky menu,
> měnit barvy podle „tématu" modulu nebo předělávat layout. **Nedělej to.**
> Prototyp je předloha, ne inspirace.

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
| Tlačítka / akce / odkazy / aktivní prvky | modrá `#1572e8` | primární akce („Přidat…"), aktivní pohled ve view switcheru |
| **Aktivní záložka (tab)** | **oranžová `#E65100`** | vždy oranžová, NIKDY barva modulu |
| Barva modulu (`c800`) | dle tabulky záložek | **jen** barevný proužek/chip dané záložky – nic víc |
| Sémantické (zelená/červená/oranžová/modrá) | dle stavu | jen stavy, ne dekorace |

> **Konkrétní chyba, které se vyvaruj:** neobarvuj banner, tlačítka,
> aktivní záložku ani view switcher „tématickou" barvou modulu (např.
> teal `#00BFA5`). Tlačítko „Přidat" je **modré**, aktivní záložka
> **oranžová** – bez ohledu na to, o jaký modul jde. Banner drží skladbu
> a barevnost jako v prototypu, ne libovolný gradient.

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
| Pravidla a chování UI (referenční spec) | `prototypes/Aptien-pravidla-pouziti-UI.md` |

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
