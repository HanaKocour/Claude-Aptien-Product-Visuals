# Šablona promptu — kombinovaný vizuál (tok mezi dvěma místy)

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Tahle šablona je pro obrázky, které ukazují **tok**: e-mail → aplikace,
> aplikace → notifikace, aplikace → aplikace, mobil ↔ desktop.
> Na jednu obrazovku aplikace použij `prototypes/prompt-sablona-aptien.md`.

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `prototypes/partials/combo-scena.html`** a
   `prototypes/Aptien-pravidla-kombinovanych-vizualu.md`. Negeneruj z paměti.
2. **Přečti (Read) partial(y)**, ze kterých bude panel s aplikací (podle mapy
   v `CLAUDE.md`). App kit `Claude-HK-Aptien-App` pro strukturu **ignoruj**.
3. **Vypiš jako text, než začneš generovat:** kterou variantu scény bereš
   (A/B/C/D), šířky sloupců a jejich součet (musí být 1424), který partial jde
   do panelu s aplikací, text pilulky konektoru (a jeho délku ve znacích),
   popisky nad panely, a hex hodnoty vytažené z pravidel — plocha scény, okraj
   panelu, konektor, zvýrazněný řádek. Tyto hodnoty pak použij 1:1.
4. **Vlož scénu doslovně** z `combo-scena.html` a **měň jen data.**
   Strukturu, barvy, ikony ani rozměry neměň.
5. **Změř výstup** (viz KONTROLA) a porovnej s pravidly bod po bodu.
6. Když je jakýkoli rozdíl nebo panel nesedí do 70–90 % výšky, **oprav a znovu
   změř.** Opakuj, dokud to nesedí.
7. Ukaž mi až finální ověřenou verzi (mezikroky zobrazovat nemusíš).

---

## ROZLIŠENÍ A HUSTOTA (závazné)

- Scénu postav na plátně **1536 × 864 CSS px**, padding 56 px
  → využitelná plocha **1424 × 752**.
- Uvnitř panelů použij **stejné absolutní velikosti jako v aplikaci**
  (text 12–15 px, horní lišta výřezu 40 px, ikony 10–16 px). Nic
  nepřepočítávej ani nescaluj.
- Hotový snímek nakonec zvětši **1,25×** do finálního exportu
  **1920 × 1080 px**.
- Playwright: `viewport: {width:1536, height:864}`, `deviceScaleFactor: 1.25`.
  ⛔ Nikdy `fullPage: true`, nikdy neupscalovat menší obrázek.

---

## PRAVIDLA

Závazný zdroj: `prototypes/Aptien-pravidla-kombinovanych-vizualu.md` a
`prototypes/partials/combo-scena.html`. Zkráceně to nejdůležitější:

**Scéna má přesně tři části** — 2 panely + 1 konektor + popiska nad každým
panelem. Nic víc.

⛔ **Do obrázku NEPATŘÍ:** gradientové pozadí, konfety, sparkly, hvězdičky,
dekorativní tečky, `@` symboly, cizí loga (Gmail, Outlook), marketingový
nadpis ani claim. Text je na webu vedle obrázku, ne v obrázku.

⛔ **Panel s aplikací NIKDY nekresli z hlavy.** Je to výřez skutečného UI:
vlož partial a vyměň data. Musí mít horní lištu `#424242` s logem „aptien".

⛔ **Výřez, ne zmenšenina.** Panel je 520–984 px široký, celá obrazovka se do
něj nevejde — uřízni ji (vynech sidebar, vynech tab strip). Velikosti písma
zůstávají shodné s aplikací.

**Barvy (použij přesně tyto):**

- plocha scény `#f4f4f7` — jednolitá, nikdy gradient, nikdy barva modulu
- panel `#fff`, okraj `1px solid #e4e2ed`, radius `12px`,
  stín `0 10px 30px rgba(30,27,46,.12)`
- okenní lišta cizí aplikace `#f0eff4`, tečky `#d6d3e0` — vždy šedá
- popiska nad panelem `#8a84a0`, `11px/800`, VERZÁLKY, `letter-spacing:.09em`
- konektor: pilulka `#1572e8` + bílý text, šipka `#a8c4ea` přerušovaná
  `7 7` — **VŽDY modrá, nikdy barva modulu**
- zvýrazněný řádek pošty: tint `#eef4fe` + `inset 3px 0 0 #1572e8`
  (stejné jako aktivní položka sidebaru — žádná nová barva)
- zelený odznak „stalo se to samo" `#43A047`, jen dole vpravo, max 1 na scénu
- barva modulu (`c800`) se používá **jen uvnitř UI panelu** (ikona názvu
  evidence, tlačítko „PŘIDAT …") — nikdy v ploše, popisce ani konektoru
- fialová `#6200EA` je **stará barva**, nepoužívej ji

**Mřížka (součet vždy 1424):**

| Varianta | Levý | Konektor | Pravý |
|---|---|---|---|
| A · e-mail → aplikace | 520 | 168 | 736 |
| B · aplikace → e-mail/notifikace | 736 | 168 | 520 |
| C · aplikace → aplikace | 640 | 144 | 640 |
| D · mobil ↔ desktop | 296 | 144 | 984 |

Hlavní panel je ten širší — ten, o kterém obrázek vypráví. Sloupce se centrují
svisle samostatně. **Panely se nikdy nepřekrývají.**

**Pilulka konektoru:** 1–2 slova, **max ~14 znaků** (delší přeteče).
Jednosměrná šipka u toku (A, B, C), obousměrná u „stejných dat" (D).

**Výška panelu:** vyšší panel musí zaplnit **70–90 % výšky (530–680 px)**.
Když je nižší, **přidej řádky dat**. Když přeteče, **uber řádky**.
Nikdy nezvětšuj fonty ani nescaluj panel.

---

## KONTROLA PŘED DOKONČENÍM (povinné, měř — neodhaduj)

- [ ] Soubor je přesně **1920 × 1080 px**; vnitřní vrstva 1536 × 864 se `scale(1.25)`.
- [ ] Součet šířek sloupců = **1424**; na `.cv-scene` platí
      `scrollWidth == clientWidth` a `scrollHeight == clientHeight`.
- [ ] Panel s aplikací je **vložený partial** — horní lišta `#424242`,
      barevné role, ikony a struktura polí sedí s prototypem.
- [ ] Vyšší panel je na **70–90 %** využitelné výšky.
- [ ] Ve scéně je **právě jeden** konektor, modrý, text ≤ ~14 znaků.
- [ ] Zelený odznak je max jeden, dole vpravo, nezakrývá obsah.
- [ ] Žádný gradient, konfety, sparkly, `@`, cizí loga, marketingový nadpis.
- [ ] Nic není odříznuté — hlavně pravý okraj širšího panelu a poslední řádek.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Účel:** Obrázek doprovodí text na produktové stránce. Text a nadpis
NEvkládej do obrázku.
**Varianta scény:** [A e-mail → aplikace / B aplikace → e-mail nebo notifikace /
C aplikace → aplikace / D mobil ↔ desktop]
**Co má obrázek říct (jednou větou):** [...]
**LEVÝ panel:** [co to je — „e-mailová schránka" / konkrétní výřez Aptienu +
který partial]
**Popiska nad levým panelem:** [max ~30 znaků, VERZÁLKY]
**PRAVÝ panel:** [co to je + který partial]
**Popiska nad pravým panelem:** [max ~30 znaků, VERZÁLKY]
**Text pilulky konektoru:** [1–2 slova, max ~14 znaků]
**Zelený odznak „stalo se to samo":** [ano / ne]
**Přihlášený uživatel (pokud je v panelu vidět):** [jméno / iniciály / „—"]
**Data k zobrazení:** [co konkrétně má být v obou panelech — realistické názvy,
čísla, jména, datumy, stavy; strukturu a sloupce převezmi z partialu]

---

### Příklad vyplnění — SÚKL: stahování e-mailů a věstníků

*(Toto je vyplněné zadání, které stojí za scénou `#scene-a`
v `combo-scena.html`. Můžeš ho použít jako vzor formulace.)*

**Účel:** Obrázek doprovodí text „Automatické stahování e-mailů a věstníků ze
SÚKL" na produktové stránce. Text a nadpis NEvkládej do obrázku.
**Varianta scény:** A · e-mail → aplikace (520 + 168 + 736)
**Co má obrázek říct:** E-maily a věstníky od SÚKL se do Aptienu dostanou samy
a rovnou z nich vznikne záznam s přílohou — nikdo nic nepřepisuje.
**LEVÝ panel:** e-mailová schránka (okenní lišta „Doručená pošta" + řádek
hledání + seznam pošty). Cizí prostředí — žádné logo poštovního klienta.
**Popiska nad levým panelem:** VAŠE E-MAILOVÁ SCHRÁNKA
**PRAVÝ panel:** výřez Aptienu s otevřeným záznamem — horní lišta `#424242`,
hlavička záznamu se stavovou pilulkou, item tabs (aktivní Detaily) a pole
záznamu podle `prototypes/partials/drawer-tab-detaily.html` (přečti a vlož
doslovně, měň jen data).
**Popiska nad pravým panelem:** APTIEN — ZÁZNAM VZNIKL SÁM
**Text pilulky konektoru:** AUTO-IMPORT (ikona `bolt`)
**Zelený odznak „stalo se to samo":** ano
**Přihlášený uživatel:** iniciály JS + zvonek s červeným badge `3`
**Data k zobrazení:**

- V poště 6 řádků. Zvýrazni **dva** (tint `#eef4fe` + modrý pruh) — ať je
  vidět, že to funguje pro **e-maily i věstníky**:
  - „SÚKL — Změna v registraci LP", `noreply@sukl.cz`, 13. 6. 2024,
    příloha `rozhodnuti_24117.pdf` (218 kB)
  - „Věstník SÚKL 06/2024", `vestnik@sukl.cz`, 14. 6. 2024,
    příloha `vestnik_2024_06.pdf` (1,4 MB)
  - zbytek je ztlumená kulisa: potvrzení objednávky, smlouva o dílo, faktura,
    pozvánka na školení BOZP
- Záznam v Aptienu: název **Úřední oznámení SÚKL**, stav **Ke zpracování**
  (oranžový puntík), pole:
  Typ oznámení `Změna v registraci LP` · Číslo jednací `sukl/2024/24117` ·
  Přípravek `Paralen 500 mg tbl. nob.` · Šarže `B240617` ·
  Datum přijetí `13. 6. 2024` · Odpovědná osoba → `Jana Svobodová` ·
  Příloha `rozhodnuti_24117.pdf` s popisem
  `2 strany · 218 kB · staženo z e-mailu`
- Přílohu v záznamu ukaž jako kartu s ikonou PDF `#E53935` a modrou ikonou
  stažení — ať je vidět, že dokument je fyzicky v systému, ne jen odkaz.

---

### Rychlé vzory pro další toky

| Co ukázat | Varianta | Levý panel | Pilulka | Pravý panel |
|---|---|---|---|---|
| Přijatá pošta se zaeviduje | A | schránka | `AUTO-IMPORT` | drawer se záznamem |
| Faktury z e-mailu do evidence | A | schránka | `AUTO-IMPORT` | evidence, pohled Tabulka |
| Systém sám upozorní na termín | B | evidence se termínovými štítky | `UPOZORNÍ SÁM` | e-mail + push v telefonu |
| Žádost jde ke schválení | B | drawer se záznamem | `KE SCHVÁLENÍ` | „Ke schválení" + notifikace |
| Ze záznamu vznikne úkol | C | drawer s termínem | `VYTVOŘÍ ÚKOL` | „Moje úkoly" |
| Změna se propíše do souvislostí | C | drawer, Detaily | `PROPÍŠE SE` | drawer, Souvislosti |
| Zaměstnanec vidí totéž v mobilu | D | telefon (mobilní intranet) | `STEJNÁ DATA` | evidence, pohled Tabulka |
