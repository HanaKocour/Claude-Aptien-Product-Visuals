# Prompt — vizuál „nadpis + screenshot"

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Šablony: `nadpis-screen-na-hrane.html` · `nadpis-screen-s-okraji.html` ·
> `nadpis-dva-screeny.html`
> Pravidla: `PRAVIDLA-nadpis-a-screen.md`
>
> Tenhle prompt je pro obrázky, kde **význam nese nadpis** a screenshot je
> důkaz. Na scény toku (e-mail → aplikace, aplikace → notifikace) jsou jiné
> prompty — tam je nadpis v obrázku zakázaný.

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `PRAVIDLA-nadpis-a-screen.md`** a **šablonu** té varianty,
   kterou zadám. Negeneruj z paměti.
2. **Vypiš jako text, než začneš:** vybranou variantu (A/B/C), nadpis a jeho
   délku ve znacích a počet řádků, cestu ke screenshotu (nebo že se má
   vyrenderovat z prototypu), a u varianty C oba snímky.
3. **Zkopíruj šablonu pod novým názvem a přepiš JEN místa označená `✏️ MĚŇ`.**
   Geometrii, barvy, velikost nadpisu, radiusy ani stíny neměň.
4. Vyrenderuj: `node render.js <soubor>.html`
5. **Podívej se na výsledek** a projdi checklist z pravidel (§7). Když nadpis
   přeteče na 3 řádky nebo se snímek nechová podle varianty, oprav DATA
   (zkrať nadpis, vyměň snímek) — ne rozvržení.
6. Ukaž mi až finální ověřený obrázek.

---

## ⛔ CO SE NESMÍ

- ⛔ **Nezmenšuj nadpis, aby se vešel delší text.** 60 px je pevných.
  Když se text nevejde na 2 řádky, **zkrať text**.
- ⛔ **Nezmenšuj screenshot, aby se vešel celý.** Orýznutí dole je součást
  rozvržení. Vidět má být horní část obrazovky.
- ⛔ **Neposouvej snímek do minusu vlevo** — uřízlo by to logo Aptienu.
- ⛔ **Snímek nenaklánět**, bez perspektivy, bez rámečku notebooku/telefonu,
  radius zůstává 14 px.
- ⛔ **Karta se nebarví** a nedostává gradient. Plocha zůstává `#f4f4f7`.
- ⛔ **Nic dalšího do obrázku nepatří** — žádná pilulka, popiska, šipka,
  jiskra, ikona ani druhý text.
- ⛔ **U varianty C je přední snímek vždy vlevo a níž** a snímky jsou dva
  RŮZNÉ.
- ⛔ **Neměň rozměr.** Vždy 1920 × 1080; návrhová vrstva 1536 × 864 se
  `scale(1.25)`.

---

## JAK VYBRAT VARIANTU

| Varianta | Soubor | Kdy |
|---|---|---|
| **A · na hraně** | `nadpis-screen-na-hrane.html` | výchozí volba; snímek leží přes hranu karty a přetéká dolů |
| **B · s okraji** | `nadpis-screen-s-okraji.html` | klidnější, snímek celý na šířku; pro úzký sloupec |
| **C · dva screeny** | `nadpis-dva-screeny.html` | schopnost stojí na dvou různých obrazovkách |

Když zadám sadu víc obrázků do jedné sekce, **použij pro všechny stejnou
variantu, stejnou velikost nadpisu i stejnou šířku snímku.** Sada musí
vypadat jako sada.

---

## NADPIS — pravidla textu

- **2–4 slova**, max ~28 znaků na řádek, max 2 řádky
- pojmenovává **oblast nebo schopnost**, ne akci a ne claim
  - ✅ „Přístroje a BTK" · „Personalistika a směrnice" · „Kompletní provoz ordinace"
  - ⛔ „Ušetříte 5 hodin týdně" (claim) · „Zaevidujte přístroj" (akce)
- bez tečky na konci, bez vykřičníku

---

## SCREENSHOT — co dodat

Jedna z dvou cest:

**A) Hotové PNG** — dej cestu k souboru. Požadavky: poměr ~3:2
(např. 1400 × 900), světlé pozadí, vidět horní lišta s logem, čitelná data.

**B) Vyrenderovat z prototypu** — napiš, kterou obrazovku, a Claude
odkomentuje v šabloně blok `hs-shot-live` a vloží UI z
`prototypes/partials/` podle `CLAUDE.md`.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Varianta:** [A na hraně / B s okraji / C dva screeny]
**Nadpis:** [2–4 slova, oblast nebo schopnost]
**Screenshot:** [cesta k PNG, nebo „vyrenderuj z prototypu: <která obrazovka>"]
**Screenshot 2 (jen u varianty C, zadní):** [cesta k PNG, nebo popis obrazovky]
**Název výstupního souboru:** [např. `personalistika-a-smernice.html`]

**Součást sady?** [ano — s jakými dalšími obrázky / ne]
Pokud ano, vyjmenuj celou sadu, ať mají všechny stejnou variantu i rozměry
snímku: [...]

---

### Příklad vyplnění — sada tří obrázků pro ordinace

**Varianta:** A na hraně (pro všechny tři)
**Sada:**

| Nadpis | Screenshot |
|---|---|
| Personalistika a směrnice | `screenshots/ordinace-zamestnanec-prilohy.png` |
| Přístroje a BTK | `screenshots/ordinace-pristroj-detail.png` |
| Kompletní provoz ordinace | varianta C, dva snímky: oba výše |

**Názvy souborů:** `personalistika-a-smernice.html` ·
`pristroje-a-btk.html` · `kompletni-provoz-ordinace.html`

Poznámka k sadě: „Kompletní provoz ordinace" je souhrn obou předchozích,
proto je u něj výjimečně varianta C — přední snímek je karta zaměstnance,
zadní karta přístroje.

---

### Referenční výstupy ve složce

| Soubor | Varianta |
|---|---|
| `priklad-nadpis-screen-na-hrane.png` | A |
| `priklad-nadpis-screen-s-okraji.png` | B |
| `priklad-nadpis-dva-screeny.png` | C |

Ve všech třech je `ukazka-screen.png` jako zástupný snímek — v produkčním
obrázku ho vyměň za skutečný.
