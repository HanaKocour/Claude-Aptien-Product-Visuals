# Aptien Product Visuals Kit

Kit pro tvorbu **produktových vizuálů** – ukázek aplikace, mockupů a prototypů
pro produktové stránky a knowledge base. Čerpá z brandové a aplikační
foundation a drží konzistentní vzhled napříč produktovými obrázky.

> **Foundation (2 vrstvy):**
> - **Brandová pravidla** (barvy, fonty, logo, maskot) nejsou tady, ale ve
>   foundation repozitáři **`Claude-Aptien-Brand-Manual`**.
> - **UI aplikace** (komponenty, patterny, vzhled obrazovek) nejsou tady, ale
>   ve foundation repozitáři **`Claude-HK-Aptien-App`**.
>
> Oba jsou v tomto design systému připojené vedle tohoto kitu.

---

## Struktura

```
Claude-Aptien-Product-Visuals/
├── README.md           # tento soubor
├── CLAUDE.md           # pravidla pro Claude Design
├── screenshots/        # syrové záběry aplikace
├── mockups/            # desktop / mobil rámečky s UI
├── prototypes/         # živé ukázky částí UI (konzistence)
└── files/              # zdrojové podklady, šablony rámečků
```

---

## Co tento kit dělá

Produkuje vizuály produktu (screenshoty, mockupy, prototypy) v jednotném
stylu pro web a knowledge base. Brandové hodnoty bere z brandové foundation,
podobu samotného produktu z aplikační foundation (UI kit); sám přidává
pravidla pro vzhled rámečků, kompozici a konzistenci ukázek.

Sem patří jen produktové vizuály. Sdílené brandové prvky (logo, fonty,
maskot) zůstávají v `Claude-Aptien-Brand-Manual`, definice UI (komponenty,
patterny) v `Claude-HK-Aptien-App` – odsud se jen používají.

---

## Konvence

- Verzování řeší git, ne názvy souborů.
- Prázdné složky nezakládej dopředu – vznikají, až do nich dáš obsah.
- Jestli „prototypy" budou živé kódové prototypy (ne obrázky), zvaž, zda
  nepatří spíš do app design systému (`Claude-HK-Aptien-App`) než sem
  mezi vizuály.
