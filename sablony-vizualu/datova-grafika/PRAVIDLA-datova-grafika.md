# Pravidla rodiny „datová grafika"

Pátá rodina vizuálů ve `sablony-vizualu/`, vedle scén toku, nadpisu + screenshotu,
kaskády s anotací a mobilu v ruce. Ukazuje **fakta, lhůty, postupy a srovnání**,
které se jedním screenshotem říct nedají. Grafický jazyk vychází
z `Aptien pictures template - 2026.pptx`.

| Šablona | K čemu | Předloha v pptx |
|---|---|---|
| `data-cyklus.html` | opakující se proces (řízení rizik, životní cyklus majetku) | slidy 95, 101, 104 |
| `data-postup.html` | 3–5 kroků za sebou, volitelně s lhůtou | slidy 64, 68 |
| `data-casova-osa.html` | lhůty od jedné události (hlášení incidentu, termíny) | slidy 70, 106–107 |
| `data-cislovany-seznam.html` | výčet 4–7 bodů (co doložit, co zákazníci oceňují) | slide 112 |
| `data-screen-a-cisla.html` | skutečný screenshot + 2–3 klíčová čísla | slidy 23–27, 36 |
| `data-pred-a-po.html` | srovnání bez Aptienu / s Aptienem | slidy 113, 116 |

## Jak vyrobit obrázek

1. Zkopíruj šablonu pod novým názvem (`nis2-lhuty-incidentu.html`).
2. Přepiš **jen objekt `const DATA = {…}`** v `<script>` dole. Vzhled se nemění.
3. `node ../render.js nis2-lhuty-incidentu.html` → PNG 1920 × 1080.

## Čitelnost v miniatuře (hlavní pravidlo rodiny)

Obrázek na webu se nejdřív vidí jako miniatura (~400–600 px šířky). Má fungovat
ve dvou vrstvách:

| Vrstva | Co nese | Velikost (návrhové px) | V miniatuře |
|---|---|---|---|
| **1 · pointa** | nadpis + klíčová čísla / názvy kroků | nadpis 60 px, čísla 46–56 px, titulky 23–24 px | čitelné — obrázek dává smysl bez kliknutí |
| **2 · detail** | popisky, zdroj, vysvětlení | 15–16 px | nečitelné — důvod obrázek zvětšit |

- ⛔ Pointu nikdy nedávej do vrstvy 2. Když se to, co čtenář potřebuje, nevejde
  do nadpisu a čísel, zkrať to — nezvětšuj detail.
- Nadpis pojmenovává téma nebo pointu („Lhůty pro hlášení incidentu"),
  2–6 slov, max 2 řádky, bez tečky.

## Pevná pravidla

- Rám 1920 × 1080, vrstva 1536 × 864 se `scale(1.25)`, `id="vizual"` — jako celá složka.
- Celý obrázek je bílý: karta s rovnými rohy, bez stínu a bez šedé plochy (3. 11. 2026). Karta se nebarví.
- ⚠️ Aktuální verze téhle rodiny žije v `Claude-Aptien-Templates/visuals/web-obrazky/` (výstup 1820 × 980, jen karta). Tahle kopie zůstává jen kvůli historii.
- Nadpis Nunito 900 / 60 px / `#311B92` — stejně jako rodina „nadpis + screenshot".
- Popisky Poppins (jako pptx), velká čísla Nunito 900.
- Barvy jen z **Palety 2025** v pevném pořadí: `#7602FF` → `#00B8D4` → `#00C853`
  → `#FFAB00` → `#E602FF` → `#1A237E`. Čísla kroků `#3D5AFE`.
- Časová osa: první (nejnaléhavější) milník červený `#E53935`.
- ⛔ Z pptx se **nepřebírají** tahy štětcem, konfety, jiskry ani fialové
  gradientové pozadí plochy — zamítnuto 12. 8. 2026 (viz `README.md`).
  Jediná sytá plocha je pravý sloupec v `data-pred-a-po` a tmavá karta seznamu.
- ⛔ Každé faktické číslo (lhůta, počet, datum) má řádek `zdroj`.
- `data-screen-a-cisla`: screenshot je **skutečné UI** (PNG ze skutečné instance
  1:1 nebo render z `prototypes/partials/`), nikdy kresba z hlavy.
- Sada obrázků na jedné stránce = stejná rodina nebo aspoň stejný nadpis a karta.

## Historie rozhodnutí

- **2. 11. 2026** — rodina zavedena z `Aptien pictures template - 2026.pptx`
  pro stránku NIS2. Nadpis zvětšen ze 48 na 60 px a klíčová čísla na 46–56 px
  na přání: miniatura musí být čitelná a zároveň lákat ke zvětšení.
