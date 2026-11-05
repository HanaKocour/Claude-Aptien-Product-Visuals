# Obrázky na web — rodiny A, B, C (datová grafika, UI + data, základ)

Šablony obrázků k článkům a produktovým stránkám na aptien.com (první použití:
stránka NIS2). Výstup je PNG **1820 × 980**, na web se nahrává **@2x 3640 × 1960**. Rozměr je
formát „web – produktové stránky“ ze zdroje pravdy `../FORMATY.md`
(KB obrázky mají jiný formát: šířka 1700). Každá šablona je jeden HTML
soubor: vzhled je pevný a měníš jen objekt `const DATA = {…}` na konci souboru.

Náhledy: `priklad-*.png` v každé složce rodiny; přehled všech šablon je v katalogu
`Claude-Aptien-Templates/README.md`.

## Vzhled výstupu (platí pro všechny šablony)

- ⛔ Obrázek je **rovnou bílá karta**: rovné rohy, žádná šedá plocha kolem,
  žádný stín karty. Šablony to mají v rámu (`.dg-frame` 1820 × 980), takže
  render nic neořezává a náhled HTML vypadá stejně jako PNG.
- Stín pod výřezem UI aplikace uvnitř obrázku zůstává (patří k návrhu).
- Rozhodnuto 3. 11. 2026. Starší verze se zaoblenou kartou na šedém pozadí
  (1920 × 1080) se už nevyrábí.

## Kterou šablonu vzít

### Rodina A · Datová grafika (`datova-grafika/`)

Pro obsah, který screenshotem neukážeš: lhůty, postupy, cykly a výčty.

| Šablona | Kdy |
|---|---|
| `data-casova-osa.html` | lhůty od jedné události (hlášení incidentu, termíny) |
| `data-postup.html` | 3–5 kroků za sebou, volitelně s lhůtou |
| `data-cyklus.html` | opakující se proces (řízení rizik, životní cyklus majetku) |
| `data-cislovany-seznam.html` | výčet 4–7 bodů (co doložit, co zákazníci oceňují) |
| `data-pred-a-po.html` | srovnání bez Aptienu a s Aptienem |
| `data-screen-a-cisla.html` | hotový screenshot (PNG) a 2–3 klíčová čísla |

### Rodina B · UI + data (`ui-a-data/`)

Vlevo je výřez aplikace Aptien postavený podle `Claude-Aptien-Product-Visuals`
(horní lišta `#424242`, záložky, toolbar, pilulky stavů, karta záznamu). Vpravo
je datový panel, který nese pointu.

| Šablona | Výřez UI | Datový panel |
|---|---|---|
| `ui-tabulka-a-cisla.html` | tabulka evidence | 2–3 velká čísla |
| `ui-tabulka-a-matice.html` | tabulka rizik | matice rizik 5×5 |
| `ui-tabulka-a-plneni.html` | tabulka směrnic | procento plnění a kdo ještě chybí |
| `ui-zaznam-a-lhuty.html` | karta záznamu s poli | svislá osa lhůt |
| `ui-zaznam-a-vazby.html` | karta záznamu s poli | strom vazeb |
| `ui-zaznam-a-odpovedi.html` | karta záznamu s ukazateli a seznamem (např. odpovědi lidí z distribučního seznamu s pracovní pozicí a stavem) | seznámení podle pracovních pozic (`pozice`), nebo souhrn odpovědí (`odpovedi`) |

Všech 6 souborů běží na stejném jádru. V `DATA` se dá přepnout
`app.typ` (`tabulka` / `karta`) a `data.typ` (`karty` / `lhuty` / `matice` /
`vazby` / `plneni` / `odpovedi` / `pozice`), takže kombinace jdou volně skládat.
Karta záznamu umí navíc `aktivni` (index otevřené záložky záznamu) a `seznam`
(řádky s ikonou, popisem, počtem a pruhem plnění) místo polí.

**Motivy pozadí (`DATA.motiv`)** — každá šablona B má tři varianty; ke každé je hotový
soubor `ui-…-sky.html` / `ui-…-midnight.html` a náhled `priklad-ui-…-sky/-midnight.png`.

| Motiv | Plocha | Nadpis a text na ploše | Tečka za nadpisem | Logo |
|---|---|---|---|---|
| `svetly` (výchozí) | bílá `#FFFFFF` | Midnight `#1A0050` | Amber `#FFA200` | barevné PNG |
| `sky` | Sky `#6200EA` (primární) | bílá, podnadpis `#EDE6FF`, popisky `#D4C4FF` | Amber `#FFA200` | bílé (značka + oranžová tečka) |
| `midnight` | Midnight `#1A0050` | bílá, podnadpis `#C9BDF2`, popisky `#B3A6E0` | Magenta `#E602FF` | bílé (značka + oranžová tečka) |

- Mění se jen plocha, text přímo na ploše, oddělovače/pruhy (průsvitná bílá) a logo.
  Výřez UI aplikace i bílé karty v datovém panelu zůstávají beze změny.
- Na `sky` by fialová v datech splynula s plochou, proto se mění na Midnight
  (2. bod osy lhůt, kořen stromu vazeb). Šipka ve stromu vazeb je v tmavých motivech bílá.
- Prázdná pole matice rizik jsou světlý odstín barvy (míchaný s bílou), ne průhlednost —
  na tmavé ploše by zešedla.
- Barvy motivů odpovídají rodině C (`zaklad/README.md`). ⛔ Sada obrázků = jeden motiv.

### Rodina C · Základ (`zaklad/`)

Dělené pozadí (bílá + `#F5F3FF`, nebo tmavé motivy Sky a Midnight), logo, velký nadpis Nunito a pružina v 7 barvách dole vlevo;
vpravo volný slot pro screen nebo mockupy. Vzniklo z vizuálu „Vydávání klíčů v7“.
Detaily v `zaklad/README.md`.

## Čitelnost v miniatuře (hlavní pravidlo sady)

Na webu se obrázek nejdřív zobrazí jako miniatura (~600 × 322 CSS px, tedy ~⅓ výstupu;
CMS z @2x dělá `medium_` 1800 px a `detail_` 2880 px). Musí
fungovat ve dvou vrstvách:

| Vrstva | Co nese | Velikost (návrhové px) | V miniatuře |
|---|---|---|---|
| **1 · pointa** | nadpis, velká čísla, názvy kroků | nadpis 60, čísla 30–56, titulky 22–24 | čitelné, obrázek dává smysl bez kliknutí |
| **2 · detail** | UI, popisky, zdroj | 11–16 | nečitelné, a to je důvod obrázek zvětšit |

- ⛔ Pointa nesmí být jen ve vrstvě 2. Když se nevejde do nadpisu a čísel,
  zkrať ji. Detail nezvětšuj.
- Nadpis je téma nebo přínos v 2–6 slovech, max 2 řádky. Za ním je Amber
  tečka (brand detail „tečka za headlinem").

## Odkud se berou hodnoty

| Co | Zdroj |
|---|---|
| barvy, fonty, logo, tečka za nadpisem | `Claude-Aptien-Brand-Manual` (`aptien_brand_brief.md`): Sky `#6200EA`, Teal `#00B4B4`, Emerald `#1DB87A`, Amber `#FFA200`, Magenta `#E602FF`, Blue `#3660FF`, text Midnight `#1A0050`; Nunito 900 pro nadpisy a čísla, Poppins pro text |
| výřez UI aplikace | `../prototypes/` (prototypy, partialy, barevné role modulů) |
| tvary (kolo, kroky, osa, tmavá karta, před/po) | `Aptien pictures template - 2026.pptx` |
| rám 1820 × 980 (bílá karta bez okraje), vrstva 1456 × 784 se `scale(1.25)` | původně `Claude-Aptien-Product-Visuals/sablony-vizualu`, upraveno 3. 11. 2026 |

⛔ Z pptx se **nepřebírají** tahy štětcem, konfety ani fialové gradientové
pozadí plochy. V Product-Visuals byly 12. 8. 2026 zamítnuty, protože vedle
screenshotů rušily.

⛔ Zvýraznění v UI je na produktové stránce modré `#3D5AFE`. Červená platí
jen pro návodové obrázky v KB.

⛔ Každé faktické číslo (lhůta, počet, datum) má řádek `zdroj`. Ukázková
data označ „ukázková data".

## Jak vyrobit obrázek

```bash
cp ui-a-data/ui-zaznam-a-lhuty.html ui-a-data/nis2-incident.html   # pracovní kopie; hotový výstup patří do Claude outputs/<projekt>/
# přepiš jen const DATA = {…}
node render.js ui-a-data/nis2-incident.html nis2-incident.png
SCALE=2 node render.js ui-a-data/nis2-incident.html nis2-incident@2x.png   # 3640 × 1960
```

Render poprvé: `npm i -D playwright && npx playwright install chromium`.
Šablony načítají Nunito, Poppins a Font Awesome z CDN, takže render potřebuje internet.

`build/gen.py` a `build/gen_ui.py` jsou generátory všech šablon. Když se
mění vzhled celé rodiny, uprav generátor a šablony z něj přegeneruj:

```bash
cd build && python3 gen.py && python3 gen_ui.py
```

## Historie rozhodnutí

- **2. 11. 2026**: sada založena pro stránku NIS2. Rodina A vznikla
  z `Aptien pictures template - 2026.pptx`. Rodina B je verze prvního
  „kresleného" náhledu, předělaná do skutečného UI Aptienu. Nadpis má 60 px
  a klíčová čísla 30–56 px, protože miniatura má být čitelná a zároveň lákat
  ke zvětšení. Sada byla nejdřív v `Claude-Aptien-Product-Visuals/sablony-vizualu/datova-grafika/`
  a pak se přesunula sem, protože jde o kombinované marketingové vizuály.
- **2. 11. 2026 (odpoledne)**: sada 2 pro stránku kybernetické bezpečnosti
  (`kyberneticka-bezpecnost-sada-2/`), jen 5 obrázků, jeden na každý claim
  (feature blok) stránky. Pro blok směrnic přibyla šablona `ui-zaznam-a-odpovedi.html`
  (distribuční seznamy podle rolí + statistiky odpovědí). Generátor `gen_ui.py`
  umí nově `seznam`, `aktivni` a datový panel `odpovedi`.
- **3. 11. 2026**: všechny šablony (obě rodiny) přešly na plochý výstup – jen bílá
  karta s rovnými rohy, bez šedého pozadí a bez stínu, 1820 × 980 px. Upraven
  `build/gen.py` (rám), `render.js` (kontrola rozměru, `SCALE=2`) a přegenerovány
  šablony i sada 2 kybernetické bezpečnosti. Náhledy v `priklady/` jsou ještě ve
  staré podobě.
- **3. 11. 2026**: přibyla rodina C „Základ – pozadí a písmo“ (`zaklad/`) podle
  `aptien_klic_v7.html`, převedená na 1820 × 980 bez zaoblení a stínu.
- **3. 11. 2026**: rodiny A, B, C se vrátily z `Claude-Aptien-Templates` sem – jeden zdroj pravdy
  pro všechny obrázky je `Claude-Aptien-Product-Visuals`. Templates je jen katalog. Hotové sady
  (kybernetická bezpečnost 1 a 2) jsou v `Claude outputs/kyberneticka-bezpecnost/`.
- **5. 11. 2026**: rodina B (UI + data) dostala motivy pozadí `sky` (primární barva Sky `#6200EA`)
  a `midnight` (`#1A0050`) přes `DATA.motiv`; generuje je `build/gen_ui.py` (3 soubory na šablonu).
