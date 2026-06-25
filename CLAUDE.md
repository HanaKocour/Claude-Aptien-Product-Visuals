# CLAUDE.md

Tento repozitář je **kit pro produktové vizuály** (screenshoty, mockupy,
prototypy pro web a knowledge base). Čerpá z brandové foundation.

---

## Zdroj pravdy vs. tento kit

- **Brandová pravidla** (barvy, fonty, logo, maskot, persony) → ve foundation
  repozitáři **`Claude-Aptien-Brand-Manual`**, připojeném vedle tohoto kitu.
- **Pravidla pro produktové vizuály** → tady (vzhled rámečků, kompozice,
  jak držet konzistenci napříč ukázkami).

Nikdy nehardcoduj brandové hodnoty – ber je z foundation.

---

## Postup při generování vizuálu

1. Načti brandová pravidla z foundation (`Claude-Aptien-Brand-Manual`).
2. Vyber typ výstupu a podle něj zdroj v tomto kitu:
   - `screenshots/` – syrové záběry aplikace
   - `mockups/` – desktop / mobil rámečky s UI
   - `prototypes/` – ukázky částí UI pro konzistenci
3. Drž jednotný styl podle existujících ukázek a podkladů ve `files/`.
4. Vygeneruj vizuál, který je on-brand a konzistentní se zbytkem knihovny.

> **Při konfliktu vyhrává přísnější pravidlo.**

---

## Obsah kitu

- `screenshots/` – syrové záběry aplikace
- `mockups/` – desktop / mobil rámečky s vloženým UI
- `prototypes/` – živé ukázky částí UI (konzistence)
- `files/` – zdrojové podklady, šablony rámečků
