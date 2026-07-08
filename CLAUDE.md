# CLAUDE.md

Tento repozitář je **kit pro produktové vizuály** (screenshoty, mockupy,
prototypy pro web a knowledge base). Čerpá ze dvou foundation vrstev –
z **brandové** a z **aplikační (UI kit)**.

---

## Zdroj pravdy vs. tento kit

- **Brandová pravidla** (barvy, fonty, logo, maskot, persony) → ve foundation
  repozitáři **`Claude-Aptien-Brand-Manual`**, připojeném vedle tohoto kitu.
- **UI aplikace** (komponenty, patterny, layout obrazovek, vzhled reálného
  produktu) → ve foundation repozitáři **`Claude-HK-Aptien-App`**, rovněž
  připojeném vedle tohoto kitu.
- **Pravidla pro produktové vizuály** → tady (vzhled rámečků, kompozice,
  jak držet konzistenci napříč ukázkami).

Nikdy nehardcoduj brandové hodnoty ani UI aplikace – ber je z příslušné
foundation.

> **Vrstvení:** brandový manuál je základní vrstva (jak Aptien vypadá jako
> značka), aplikační UI kit určuje, jak vypadá samotný produkt na
> obrazovkách. U prototypů a screenshotů vede při stylových hodnotách
> (barvy, tokeny, fonty) UI kit aplikace; brand doplňuje marketingový rámec.

---

## Postup při generování vizuálu

1. Načti brandová pravidla z foundation (`Claude-Aptien-Brand-Manual`).
2. Načti UI aplikace z foundation (`Claude-HK-Aptien-App`) – komponenty,
   patterny a vzhled obrazovek, které se ve vizuálu objeví.
3. Vyber typ výstupu a podle něj zdroj v tomto kitu:
   - `screenshots/` – syrové záběry aplikace
   - `mockups/` – desktop / mobil rámečky s UI
   - `prototypes/` – ukázky částí UI pro konzistenci
4. Drž jednotný styl podle existujících ukázek a podkladů ve `files/`.
5. Vygeneruj vizuál, který je on-brand, odpovídá reálnému UI aplikace
   a je konzistentní se zbytkem knihovny.

> **Prototypy = primárně brandkit aplikace.** Při tvorbě prototypů ber
> barvy, tokeny, fonty a další stylové hodnoty **primárně z UI kitu aplikace
> (`Claude-HK-Aptien-App`)**, ne z obecného brandového manuálu. Prototyp má
> vypadat jako reálný produkt, ne jako marketingový vizuál. Brandový manuál
> slouží jen jako doplněk tam, kde UI kit hodnotu nedefinuje.

> **Při konfliktu vyhrává přísnější pravidlo.** Když se u prototypů a
> screenshotů rozchází brandový manuál a UI kit aplikace, vyhrává UI kit
> aplikace (`Claude-HK-Aptien-App`) – tj. to, co reálně ukazuje produkt.
> Obecný vzhled značky (marketingové rámečky, kompozice) drží brand.

---

## Obsah kitu

- `screenshots/` – syrové záběry aplikace
- `mockups/` – desktop / mobil rámečky s vloženým UI
- `prototypes/` – živé ukázky částí UI (konzistence)
- `files/` – zdrojové podklady, šablony rámečků
