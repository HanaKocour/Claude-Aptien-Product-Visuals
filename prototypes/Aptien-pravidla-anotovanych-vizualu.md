# Aptien – pravidla pro anotované vizuály („kaskáda s pilulkami")

Třetí typ produktového vizuálu, vedle čistého screenshotu
(`Aptien-pravidla-screenshotu.md`) a kombinovaného vizuálu
(`Aptien-pravidla-kombinovanych-vizualu.md`).

**Anotovaný vizuál** = běžný screenshot aplikace + vrstva, která z něj vytáhne
**jeden řetězec**: číslované pilulky s názvy záznamů, svody do UI, bílý závoj
přes zbytek plochy a jeden šikmý štítek s pointou.

| Co | Kde |
|---|---|
| Blok k doslovnému vložení | `prototypes/partials/anotace-vrstva.html` |
| Rozměr, hustota, render | `Aptien-pravidla-screenshotu.md` |
| Kaskáda drawerů pod anotací | `prototypes/partials/item-drawer-stacked.html` |
| Prompt k vyplnění | § 8 níže (ŠABLONA C) |

---

## 0. Proč tato pravidla vznikla

Vizuál „NIS2 — Služba → Data → Aplikace → Riziko" (srpen 2026) vznikl na
původní prompt pro čistý screenshot a **musel se doladit dalšími sedmi
příkazy**. Pokaždé šlo o něco, co v zadání nebylo, protože pro tenhle typ
obrázku dosud neexistovala pravidla:

- zadání říkalo „text NEvkládej do obrázku", ale obrázek anotaci má —
  věta si s výsledkem odporovala;
- „naskládej drawery diagonálně" popisovalo něco jiného, než jak vrstvení
  ve skutečnosti vypadá (spine 38 px, ne posunutá okna);
- barva nové záložky, stav sidebaru, závoj ani geometrie anotace nebyly zadané;
- výsledek nakonec vznikl jako **PNG vložený do HTML a doškálovaný** —
  což rozbíjí hustotu 1,25× a je zakázané (§ 7).

---

## 1. Kdy anotovaný vizuál použít

**Použij**, když obrázek vypráví *řetězec* a bez popisků by čtenář nevěděl,
kam se dívat:

- proklik po souvislostech (záznam → související záznam → …),
- postup workflow přes několik obrazovek jednoho pohledu,
- „jedna věc vede k druhé" (služba → data → aplikace → riziko).

**Nepoužívej**:

- na běžný produktový screenshot — ten zůstává **čistý**, text je vedle
  na webu (to je pořád výchozí typ vizuálu);
- na tok mezi dvěma místy (e-mail → aplikace) — tam patří **konektor**
  z `combo-scena.html`, ne pilulky;
- když by pilulek bylo víc než 4 (§ 3).

---

## 2. Anatomie

```
┌─ rám 1920 × 1080 ─────────────────────────────────────────┐
│ ┌─ vrstva 1536 × 864, scale(1.25) ──────────────────────┐ │
│ │  topbar                                               │ │
│ │ ┌──────┬──┬──┬──┬──┬────────────────────────────────┐ │ │
│ │ │závoj │▓▓│▓▓│▓▓│▓▓│ závoj                          │ │ │
│ │ │      │spine (sytý pruh)   ┌───────────────┐       │ │ │
│ │ │      │ •───────────────►  │ ① pilulka     │       │ │ │
│ │ │      │   •─────────────►  │ ② pilulka     │       │ │ │
│ │ │      │     •───────────►  │ ③ pilulka     │       │ │ │
│ │ │      │       •─────────►  │ ④ pilulka cíl │       │ │ │
│ │ └──────┴──┴──┴──┴──┴────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

Čtyři části, všechny v `partials/anotace-vrstva.html`:

| Část | Třída | Funkce |
|---|---|---|
| Závoj | `.an-wash-l` / `.an-wash-r` | ztlumí všechno kromě sytého pruhu |
| Svod | `.an-dot` + `.an-line` + `.an-head` | spojí místo v UI s pilulkou |
| Pilulka | `.an-pill` | číslo, název záznamu, kde záznam žije |
| Štítek | `.an-note` | jedna věta s pointou, max ~45 znaků |

---

## 3. Geometrie (návrhové px, před zvětšením 1,25×)

Anotace se nastaví **čtyřmi čísly** na obalu `.an`, zbytek se dopočítá:

| Token | Co to je | Osvědčeno |
|---|---|---|
| `--an-band-x` | levá hrana sytého pruhu | levá hrana prvního spine |
| `--an-band-w` | šířka sytého pruhu | počet spine × 38 px |
| `--an-x` | vodorovný start svodů | `--an-band-x + 19px` (střed prvního spine) |
| `--an-y` | svislý střed pilulky č. 1 | **400 px** |

Pevné rozestupy:

| Parametr | Hodnota | Proč |
|---|---|---|
| `--an-step-x` | **38 px** | = šířka spine v `item-drawer-stacked.html`. Musí sedět, jinak přestanou být svody stejně dlouhé. |
| `--an-step-y` | **80 px** | 4 pilulky = 240 px; se středem prvního na 400 px končí stack na ~665 px, tedy uvnitř 864. |
| `--an-len` | **150 px** | délka svodu; drž stejnou pro všechny |

Typografie a prvky pilulky:

| Prvek | Hodnota |
|---|---|
| název záznamu | 15 px, řez 800, VERZÁLKY, `#1a1a2e`, `nowrap` |
| podtitul `MODUL · kde záznam žije` | 12 px, řez 600, tmavší odstín barvy |
| ikonový kruh | 40 px, gradient `145deg`, bílá ikona FA 15 px |
| číslo | kolečko 18 px, `#1a1a2e`, bílý text 10 px/800, bílý rámeček 1,5 px |
| rámeček pilulky | 1,5 px v barvě, `border-radius:999px`, pozadí `linear-gradient(180deg,#fff,tint)` |
| cílová pilulka | `scale(1.07)` + jedna stavová pilulka (`Otevřeno`, `Splněno` …) |

**Maximálně 4 pilulky.** Pátá a šestá barva v partialu existuje pro výjimky,
ale nad 4 stupně obrázek přestane být čitelný — radši rozděl na dva vizuály.

---

## 4. Paleta anotace

Pořadí je pevné a znamená **od zdroje k důsledku**:

| # | Barva | Tmavší (podtitul) | Světlejší (gradient) | Tint |
|---|---|---|---|---|
| 1 | `#4F1FE0` | `#4F1FE0` | `#7c4ff5` | `#f5f2fe` |
| 2 | `#0EA5E9` | `#0b84b8` | `#5fc8fb` | `#eef8fe` |
| 3 | `#10B981` | `#0d8f63` | `#4fe0ab` | `#eafbf3` |
| 4 | `#EF4444` | `#c62828` | `#fb8a8a` | `#fdeeee` |
| 5 | `#F59E0B` | `#b45309` | `#fcc55a` | `#fef6e7` |
| 6 | `#64748B` | `#475569` | `#9aa6b8` | `#f2f4f7` |

⛔ **Nikdy nepoužívej barvy modulů (`c800`) ani akční modrou `#1572e8`.**
Anotace by splynula s aplikací a čtenář by ji četl jako součást UI.
Ikonu v pilulce naopak ber podle **modulu záznamu** — barvu určuje pořadí,
ikona význam.

Štítek `.an-note` je vždy fialový (`linear-gradient(135deg,#6c3cf0,#4F1FE0 55%,#2d0f9e)`),
bez ohledu na barvy pilulek — je to hlas Aptienu, ne další stupeň řetězce.

---

## 5. Závoj

Bílý překryv `rgba(255,255,255,.35)`, dva obdélníky: vlevo a vpravo od sytého
pruhu, odshora `--an-top` (výchozí 66 px = pod horní lištu) až dolů.

⛔ Žádné rozostření, žádné ztmavení, žádný gradient, žádné vyříznuté „spotlight"
kolečko. Jediná varianta je bílá 35 %.

Že svod č. 1 přejede přes spine 2–4, **je v pořádku** — všechny svody jsou pak
stejně dlouhé a nekříží se. Kdyby každý začínal až za pruhem, ztratí se
informace, které ucho pilulka popisuje.

---

## 6. Text v anotaci

- Název v pilulce je **doslova** název záznamu v UI. Ne parafráze, ne zkratka.
- Podtitul je `MODUL · kde záznam žije` — 2–4 slova, malými písmeny za tečkou
  oddělovače (`SLUŽBA · katalog IT služeb`).
- Štítek: **jedna věta, max ~45 znaků**, přínos pro uživatele, ne funkce
  produktu. („Vše je propojené, souvislosti se vám neztratí.")
- ⛔ Do obrázku nikdy nepatří marketingový odstavec, claim, `@`, cizí loga
  ani cena. Delší text jde vedle obrázku na web.

---

## 7. Render

Platí `Aptien-pravidla-screenshotu.md` beze změny: návrh 1536 × 864,
`scale(1.25)`, výstup přesně 1920 × 1080.

⛔ **Anotace se kreslí živě v tomtéž dokumentu jako screenshot.**
Nikdy jako druhá vrstva nad vloženým PNG. Doškálovaný obrázek rozbije hustotu
(text UI přestane mít ~19 px), anotace přestane sedět s UI a obrázek se
nedá znovu editovat. První verze NIS2 vizuálu tak vznikla — je to
zamítnutý postup, ne vzor.

---

## 8. ŠABLONA C — prompt k vyplnění

> Doplň hranaté závorky a pošli pod sekcemi POSTUP / ROZLIŠENÍ / PRAVIDLA
> ze `prompt-sablona-aptien.md`.

**Účel:** Obrázek doprovodí text na produktové stránce. Screenshot **není čistý** —
nese anotační vrstvu podle `partials/anotace-vrstva.html`. Marketingový odstavec
do obrázku nedávej.

**Typ vizuálu:** anotovaný — kaskáda [N] drawerů s anotační vrstvou.

**Aktivní v topbaru:** [název záložky] — pokud není mezi 8 základními, uveď
i její **hex barvu a ikonu**, jinak si je model vymyslí pokaždé jinak.
**Aktivní v sidebaru:** [název / žádná]
**Sidebar (stav):** [otevřený 236 px / sbalený 56 px — **výchozí je sbalený**,
otevřený piš výslovně]
**Přihlášený uživatel:** [jméno, role, + profilová fotka]

**Na pozadí:** seznam evidence „[název]" podle `partials/evidence-list.html`;
první řádek = záznam, ze kterého se kaskáda otevřela, a je vybraný (`#eef4fe`).
Další řádky realisticky podle praxe: [výčet].

**Kaskáda:** [N] drawerů podle `partials/item-drawer-stacked.html`.
Z každého překrytého záznamu je vidět **jen spine 38 px** (ikona modulu 15 px +
název otočený o −90°, 12 px, řez 700, `#5a5478`). Není to diagonální schodiště oken.

| # | Spine — název záznamu | Ikona | Barva ikony |
|---|---|---|---|
| 1 | [název] | [FA ikona] | [hex modulu] |
| … | | | |

**Nejvrchnější drawer (plně otevřený detail)** podle `partials/evidence-drawer.html`
+ `partials/drawer-tab-detaily.html`: titulek [ ], štítek typu [ ], záložky
[Detaily *(aktivní)* · Přílohy · Souvislosti `N` · …], pole [ ], pravý panel akcí,
patička s ID a daty.

**Anotační vrstva** — vlož blok z `partials/anotace-vrstva.html` a nastav
`--an-band-x`, `--an-band-w`, `--an-x`, `--an-y`. Pilulky:

| # | Název v pilulce (verzálky) | Podtitul | Ikona |
|---|---|---|---|
| 1 | [NÁZEV ZÁZNAMU] | `MODUL · kde záznam žije` | [FA ikona] |
| … | | | |

Poslední pilulka dostane `is-target` + stavovou pilulku „[stav]".
**Štítek:** „[jedna věta, max 45 znaků]", ikona `fa-link`.

**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** [text]

**Kontrola:** projeď checklist § 9 a teprve pak ukaž finál.

---

## 9. Checklist před odevzdáním

1. Soubor je přesně **1920 × 1080 px**, vnitřní vrstva 1536 × 864 se `scale(1.25)`.
2. Screenshot i anotace jsou **jeden živý HTML dokument** — žádné vložené a
   doškálované PNG.
3. Z každého překrytého draweru je vidět **jen spine 38 px** s ikonou a
   otočeným názvem.
4. Vlevo je vidět seznam evidence, ze kterého se kaskáda otevřela
   (hlavička + aspoň 8 řádků).
5. Detail vrchního draweru **nepřetéká** — změř `scrollHeight` vs `clientHeight`,
   neodhaduj pohledem.
6. Popisky v pravém panelu akcí se **nelámou do dvou řádků** („Nový report",
   „Online formuláře", „Výsledky formulářů", „Historie změn").
7. Svody jsou vodorovné, stejně dlouhé, nekříží se a míří do svislého středu
   pilulek; tečka leží ve **středu svého spine**.
8. Nejdelší pilulka nepřetéká pravou hranu 1536 px.
9. Závoj nechává pruh se spine plně sytý; žádné blur ani ztmavení.
10. Názvy v pilulkách jsou **doslova** stejné jako názvy záznamů ve spine.
11. Nejvýš 4 pilulky, nejvýš 1 štítek, nejvýš 1 stavová pilulka.
12. V anotaci nejsou barvy modulů ani `#1572e8`.

---

## 10. Historie rozhodnutí

- **18. 8. 2026** – vizuál NIS2 „Služba → Data → Aplikace → Riziko" postaven
  jako PNG + anotace nad ním. **Zamítnuto jako postup**: doškálovaný obrázek
  rozbíjí hustotu 1,25×, obrázek nejde znovu editovat. Anotace se od té doby
  kreslí živě v tomtéž dokumentu.
- **18. 8. 2026** – zvažováno kreslit svody v SVG s `marker-end`. **Zamítnuto**:
  souřadnice v SVG nejdou počítat z CSS proměnných, takže se každý posun
  pilulek musel přepočítat ručně. Nahrazeno flex řádkem
  `tečka + čára + hrot + pilulka`, kde je délka svodu automaticky konstantní.
- **18. 8. 2026** – zvažován spotlight (tmavý závoj s vyříznutým kolečkem).
  **Zamítnuto**: ztmavení mění barvy UI a screenshot přestane vypadat jako
  aplikace. Zůstal bílý závoj 35 %.
