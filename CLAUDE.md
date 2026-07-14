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

> **`.md` popis je jen doplněk, ne zadání.** `Aptien-pravidla-pouziti-UI.md`
> popisuje pravidla a chování. Zdrojem struktury je vždy konkrétní **HTML
> prototyp**, ne prozaický popis. Nikdy nestav screen jen podle `.md`.

> **Pozor na formát prototypů (bundled HTML).** Prototypy v `prototypes/`
> jsou „bundled" stránky – reálná struktura je zabalená uvnitř
> `<script type="__bundler/template">` a rozbaluje ji až JS v prohlížeči.
> Když soubor čteš jen jako HTML, uvidíš loader a SVG náhled, ne skutečný
> DOM. Pro převzetí struktury vyextrahuj obsah z `__bundler/template`
> (nebo použij čistou `*.clean.html` verzi, pokud existuje) – nespoléhej na
> to, co je vidět v hlavičce souboru.

### Mapa: obrazovka → prototyp

| Zadaná obrazovka / modul | Použij prototyp |
|---|---|
| Menu, top bar, app bar, shell aplikace | `prototypes/Aptien-menu-and-app-bar-prototype.html` |
| Menu + app bar se směrnicemi (policies) | `prototypes/Aptien-menu-and-app-bar-prototype-with-policies.html` |
| Obecná evidence (list / detail) | `prototypes/Aptien-evidence-prototyp-obecny.html` |
| Evidence – pohled kanban / tabulka | `prototypes/Aptien-evidence-prototyp-obecny-kanban-tabulka.html` |
| Evidence rizik (riziková matice, přehled) | `prototypes/Aptien-evidence-prototy-rizika.html` |
| Pravidla a chování UI (referenční spec) | `prototypes/Aptien-pravidla-pouziti-UI.md` |

---

## Postup při generování vizuálu

1. **Najdi odpovídající prototyp** v mapě výše. Pokud existuje → řiď se
   pravidlem „prototyp je předloha" (kopíruj 1:1, měň jen obsah). Pokud
   žádný neodpovídá → zeptej se, nebo teprve pak stav nový podle pravidel.
2. Načti brandová pravidla z foundation (`Claude-Aptien-Brand-Manual`).
3. Načti UI aplikace z foundation (`Claude-HK-Aptien-App`) – komponenty,
   patterny a vzhled obrazovek, které se ve vizuálu objeví.
4. Vyber typ výstupu a podle něj zdroj v tomto kitu:
   - `screenshots/` – syrové záběry aplikace
   - `mockups/` – desktop / mobil rámečky s UI
   - `prototypes/` – **předlohy** částí UI (kopíruj, needituj naslepo)
5. Drž jednotný styl podle existujících ukázek a podkladů ve `files/`.
6. Vygeneruj vizuál, který vychází z prototypu (když existuje), je on-brand,
   odpovídá reálnému UI aplikace a je konzistentní se zbytkem knihovny.

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
- `prototypes/` – **závazné předlohy** částí UI (kopíruj 1:1, viz pravidlo výše)
- `files/` – zdrojové podklady, šablony rámečků
