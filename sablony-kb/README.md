# Šablony obrázků do KB

Formát „KB – článek znalostní báze“ z `../FORMATY.md`: **šířka 1700 px**
(rám 850 CSS px, render v hustotě 2×), výška podle poměru 16 : 9 / 3 : 2 / 4 : 3.
Zvýraznění vždy **červené `#FF0000`** podle manuálu „Obrázky do znalostní báze Aptien“.

Jsou dva typy a nemíchají se:

| Typ | Šablona | Co to je | Pozadí |
|---|---|---|---|
| **A · Screen** | `kb-screen.html` | samotný screenshot aplikace přes celý obrázek + zvýraznění | žádné – aplikace začíná u hrany |
| **B · Kombinovaný** | `kb-kombinovany.html` | text s kroky + mockup notebooku (+ telefonu) | určené pozadí `--kb-bg` přes celý obrázek |

## A · Screen

- ⛔ **Žádné okno se zaoblenými rohy na pozadí, žádný stín, žádný okraj.** Je to screen,
  ne mockup – horní lišta aplikace začíná přímo u horní hrany obrázku.
- Aplikace je v článku vidět **1 : 1** (sloupec 850 px) → písmo UI se čte bez rozkliknutí.
- Výška rámu: 478 (16 : 9) · 567 (3 : 2) · 638 (4 : 3) CSS px.
- Dole smí obrázek useknout jen pokračující seznam. Nikdy dialog nebo prvek z kroku.
- Zvýraznění v poli `KROKY`: `cil` (CSS selektor), `cislo`, volitelně `sipka: [x, y]`
  (začátek rovné šipky), `zoom: 1.3` + `kurzor` (zvětšený detail s ručičkou).
- Pro skutečný návod: místo poskládaného UI vlož do `.ap` screenshot ze vzorové instance
  (`<img>` přes celou plochu), nasnímaný v hustotě 2× při šířce okna 850 (max. 1100) CSS px.

Příklady: `priklad-kb-screen.png` (16 : 9), `priklad-kb-screen-3x2.png`, `priklad-kb-screen-4x3.png`.

## B · Kombinovaný

- Rám **850 × 478** (16 : 9) → PNG 1700 × 956.
- ⛔ **Pozadí je jednolitá plocha `--kb-bg` (výchozí `#F5F3FF`) přes celý obrázek** – bez
  zaoblených rohů, bez stínu, bez gradientu. Zaoblení a stín mají jen zařízení.
- Vlevo text: nadpis (Nunito 900, 23 px) + 2–4 kroky s červenými čísly.
  **Čísla v textu = čísla u zvýraznění v mockupech.**
- Vpravo notebook (UI se navrhuje na 800 px a zmenší se na 0,57×), přes jeho pravý dolní
  roh telefon (UI na 300 px, zmenšené na 0,45×).
- ⛔ Pointa je v textu – UI v notebooku je ilustrace. Co se má přečíst, patří do textu
  nebo do telefonu.

Příklad: `priklad-kb-kombinovany.png`.

## Render

```bash
node render-kb.js kb-screen.html            # → kb-screen.png, šířka 1700 px
```

(jednorázově `npm i -D playwright && npx playwright install chromium`; šablony berou
fonty a ikony z CDN, render potřebuje internet)

## Historie

- **3. 11. 2026** – založeno. Dva typy KB obrázků: A „screen“ (screenshot přes celou
  plochu, bez okna na pozadí) a B „kombinovaný“ (text + mockup notebooku a telefonu na
  určeném pozadí bez zaoblení a stínu). Nahrazuje první ukázky, kde bylo okno aplikace
  se zaoblenými rohy na bílém pozadí.
