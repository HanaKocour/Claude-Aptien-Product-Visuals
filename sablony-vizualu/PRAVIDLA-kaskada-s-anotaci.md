# Pravidla rodiny „kaskáda s anotací"

Třetí rodina vizuálů v této složce. Ukazuje **řetězec provázaných záznamů**:
uživatel se proklikal po souvislostech z jednoho záznamu do druhého a nad
screenshotem to vysvětlují číslované pilulky.

| Rodina | Co ukazuje | Text v obrázku |
|---|---|---|
| Scény toku | tok mezi dvěma místy | ⛔ zakázaný |
| Nadpis + screenshot | oblast / schopnost | ✅ nadpis je hlavní obsah |
| **Kaskáda s anotací** | řetězec souvislostí uvnitř aplikace | ✅ jen popisky v pilulkách + 1 štítek |

⛔ **Nemíchat.** Každá rodina má vlastní pravidla i vlastní prompt.

| Co | Kde |
|---|---|
| Šablona | `kaskada-s-anotaci.html` |
| Prompt k vyplnění | `PROMPT-kaskada-s-anotaci.md` |
| Referenční výstup | `priklad-kaskada-s-anotaci.png` |
| Rozměr, hustota, render | `../prototypes/Aptien-pravidla-screenshotu.md` |
| Kaskáda drawerů (UI) | `../prototypes/partials/item-drawer-stacked.html` |

---

## 0. Proč tato pravidla vznikla

Vizuál „NIS2 — Služba → Data → Aplikace → Riziko" (srpen 2026) vznikl na
prompt pro **čistý** screenshot a musel se doladit dalšími příkazy. Pokaždé
šlo o něco, co v zadání nebylo, protože pro tenhle typ obrázku dosud
neexistovala šablona:

- zadání říkalo „text NEvkládej do obrázku", ale obrázek anotaci má —
  věta si s výsledkem odporovala;
- „naskládej drawery diagonálně" popisovalo něco jiného, než jak vrstvení
  ve skutečnosti vypadá (spine 38 px, ne posunutá okna);
- barva nové záložky, stav sidebaru, závoj ani geometrie anotace nebyly zadané;
- výsledek nakonec vznikl jako **PNG doškálovaný na 0,845×** a anotace nad ním —
  hustota 1,25× se tím rozbila a obrázek nešel znovu editovat.

---

## 1. Kdy tuhle rodinu použít

**Použij**, když obrázek vypráví *řetězec* a bez popisků by čtenář nevěděl,
kam se dívat:

- proklik po souvislostech (záznam → související záznam → …),
- „jedna věc vede k druhé" (služba → data → aplikace → riziko),
- postup workflow uvnitř jedné obrazovky.

**Nepoužívej**:

- na běžný produktový screenshot — ten zůstává **čistý**, text je vedle
  na webu; to je pořád výchozí typ vizuálu,
- na tok mezi dvěma místy (e-mail → aplikace) — tam patří **konektor**
  z `email-do-aplikace.html`,
- když by pilulek bylo víc než 4 (§ 3).

---

## 2. Anatomie

```
┌─ rám 1920 × 1080 ─────────────────────────────────────────┐
│ ┌─ vrstva 1536 × 864, scale(1.25) ──────────────────────┐ │
│ │  horní lišta + tab strip (nikdy pod závojem)          │ │
│ │ ┌──────┬──┬──┬──┬──┬────────────────────────────────┐ │ │
│ │ │závoj │▓▓│▓▓│▓▓│▓▓│ závoj                          │ │ │
│ │ │seznam│spine (sytý pruh)   ┌───────────────┐       │ │ │
│ │ │      │ •───────────────►  │ ① pilulka     │       │ │ │
│ │ │      │   •─────────────►  │ ② pilulka     │       │ │ │
│ │ │      │     •───────────►  │ ③ pilulka     │       │ │ │
│ │ │      │       •─────────►  │ ④ pilulka cíl │       │ │ │
│ │ └──────┴──┴──┴──┴──┴────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

| Část | Třída | Funkce |
|---|---|---|
| UI aplikace | `.an-app` | bloky z `../prototypes/partials/` |
| Závoj | `.an-wash-l` / `.an-wash-r` | ztlumí všechno kromě sytého pruhu |
| Svod | `.an-dot` + `.an-line` + `.an-head` | spojí spine s pilulkou |
| Pilulka | `.an-pill` | číslo, název záznamu, kde záznam žije |
| Štítek | `.an-note` | jedna věta s pointou, max ~45 znaků |

⛔ Třídy `an-*` patří **jen anotaci a rámu**. Uvnitř UI se používá výhradně
markup z partialů (inline styly, Nunito, Font Awesome) — nikdy `an-` třídy.
Stejné pravidlo jako `cv-*` u scén a `hs-*` u nadpisů.

---

## 3. Geometrie (návrhové px, před zvětšením 1,25×)

Anotace se nastaví **čtyřmi čísly** na obalu `.an`, zbytek se dopočítá:

| Token | Co to je | Osvědčeno |
|---|---|---|
| `--an-band-x` | levá hrana sytého pruhu | levá hrana prvního spine (**307 px** u panelu `width:80%`) |
| `--an-band-w` | šířka sytého pruhu | počet spine × 38 px |
| `--an-x` | vodorovný start svodů | `--an-band-x + 19px` |
| `--an-y` | svislý střed pilulky č. 1 | **400 px** |
| `--an-top` | odkud dolů jde závoj | **86 px** (56 lišta + 30 tab strip) |

Pevné rozestupy:

| Parametr | Hodnota | Proč |
|---|---|---|
| `--an-step-x` | **38 px** | = šířka spine v `item-drawer-stacked.html`. Musí sedět, jinak přestanou být svody stejně dlouhé. |
| `--an-step-y` | **80 px** | 4 pilulky = 240 px; se středem prvního na 400 px končí stack na ~665 px, tedy uvnitř 864. |
| `--an-len` | **150 px** | délka svodu; stejná pro všechny |

Prvky pilulky:

| Prvek | Hodnota |
|---|---|
| název záznamu | 15 px, řez 800, VERZÁLKY, `#1a1a2e`, `nowrap` |
| podtitul `MODUL · kde záznam žije` | 12 px, řez 600, tmavší odstín barvy |
| ikonový kruh | 40 px, gradient `145deg`, bílá ikona FA 15 px |
| číslo | kolečko 18 px, `#1a1a2e`, bílý text 10 px/800, bílý rámeček 1,5 px |
| rámeček pilulky | 1,5 px v barvě, `radius:999px`, pozadí `linear-gradient(180deg,#fff,tint)` |
| cílová pilulka | `.is-target` → `scale(1.07)` + jedna stavová pilulka |

**Maximálně 4 pilulky.** Pátá a šestá barva v šabloně existuje pro výjimky,
ale nad 4 stupně obrázek přestane být čitelný — radši ho rozděl na dva.

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

⛔ **Nikdy barvy modulů (`c800`) ani akční modrou `#1572e8`.** Anotace by
splynula s aplikací a čtenář by ji četl jako součást UI. Ikonu v pilulce
naopak ber podle **modulu záznamu** — barvu určuje pořadí, ikona význam.

Štítek `.an-note` je vždy fialový
(`linear-gradient(135deg,#6c3cf0,#4F1FE0 55%,#2d0f9e)`), bez ohledu na barvy
pilulek — je to hlas Aptienu, ne další stupeň řetězce.

---

## 5. Závoj

Bílý překryv `rgba(255,255,255,.35)`, dva obdélníky vlevo a vpravo od sytého
pruhu, odshora `--an-top` až dolů. Horní lišta a tab strip zůstávají syté —
aktivní záložka je součást sdělení.

⛔ Žádné rozostření, ztmavení, gradient ani vyříznuté „spotlight" kolečko.

Že svod č. 1 přejede přes spine 2–4, **je v pořádku** — všechny svody jsou pak
stejně dlouhé a nekříží se. Kdyby každý začínal až za pruhem, ztratí se
informace, které ucho pilulka popisuje.

---

## 6. Kaskáda pod anotací

- Drawery **nejsou** posunutá okna na diagonále. Každý další překryje ten
  předchozí a nechá z něj vidět **jen spine 38 px**.
- Ve spine je nahoře **ikona modulu** (15 px, barva modulu), pod ní **název
  záznamu otočený o −90°** (`writing-mode:vertical-rl; transform:rotate(180deg)`),
  12 px, řez 700, `#5a5478`, zkrácený třemi tečkami.
- Spine jdou zleva doprava v pořadí otevírání: nejstarší vlevo, aktivní vpravo.
- Vlevo od panelu zůstává **vidět seznam evidence**, ze kterého se první
  drawer otevřel (hlavička + aspoň 8 řádků).
- Panel draweru začíná **pod tab stripem** (`top:86px`), aby zůstala vidět
  aktivní záložka.

---

## 7. Text v anotaci

- Název v pilulce je **doslova** název záznamu ve spine. Ne parafráze, ne zkratka.
- Podtitul je `MODUL · kde záznam žije` — 2–4 slova (`SLUŽBA · katalog IT služeb`).
- Štítek: **jedna věta, max ~45 znaků**, přínos pro uživatele, ne funkce
  produktu. („Vše je propojené, souvislosti se vám neztratí.")
- ⛔ Do obrázku nikdy nepatří marketingový odstavec, claim, `@`, cizí loga
  ani cena. Delší text jde vedle obrázku na web.

---

## 8. Render

Platí `../prototypes/Aptien-pravidla-screenshotu.md`: návrh 1536 × 864,
`scale(1.25)`, výstup přesně 1920 × 1080. Rám má `id="vizual"`, takže
`node render.js kaskada-s-anotaci.html` udělá PNG přes element.

**UI pod anotací — dvě cesty:**

- **A) Živě z prototypu (výchozí).** Bloky z `../prototypes/partials/`
  vložené doslova. Jediná povolená úprava: `position:fixed` → `absolute`,
  protože stage je zvětšený kontejner a `fixed` by z něj utekl.
- **B) Hotové PNG ze skutečné instance.** Vložené **1:1** do vrstvy 1536 px.
  ⛔ Nikdy doškálované jiným poměrem — rozbije to hustotu 1,25× a texty
  anotace přestanou sedět s texty UI.

---

## 9. Checklist před odevzdáním

1. Soubor je přesně **1920 × 1080 px**, vnitřní vrstva 1536 × 864 se `scale(1.25)`.
2. UI je z partialů, ne překreslené; PNG (cesta B) je vložený 1:1.
3. Z každého překrytého draweru je vidět **jen spine 38 px** s ikonou a
   otočeným názvem.
4. Vidět je aktivní záložka topbaru a vlevo seznam evidence, ze kterého se
   kaskáda otevřela.
5. Detail vrchního draweru **nepřetéká** — `scrollHeight` = `clientHeight`,
   změř, neodhaduj.
6. Popisky v pravém panelu akcí se **nelámou do dvou řádků** („Nový report",
   „Online formuláře", „Výsledky formulářů", „Historie změn").
7. Svody jsou vodorovné, stejně dlouhé, nekříží se a míří do svislého středu
   pilulek; tečka leží ve **středu svého spine**.
8. Nejdelší pilulka nepřetéká pravou hranu 1536 px.
9. Závoj nechává pruh se spine i horní lištu s tab stripem syté.
10. Názvy v pilulkách jsou **doslova** stejné jako názvy záznamů ve spine.
11. Nejvýš 4 pilulky, nejvýš 1 štítek, nejvýš 1 stavová pilulka.
12. V anotaci nejsou barvy modulů ani `#1572e8`.

---

## 10. Historie rozhodnutí

- **18. 8. 2026** — rodina zavedena. Vznikla z vizuálu NIS2, který se dolaďoval
  dalšími sedmi příkazy, protože pro anotovaný screenshot nebyla šablona.
- **18. 8. 2026** — první verze NIS2 vizuálu byla **PNG 3360 × 2080 vložený
  a doškálovaný na 0,845×**, anotace nad ním. **Zamítnuto jako postup**:
  rozbíjí hustotu 1,25×, obrázek nejde znovu editovat, anotace nesedí s UI.
  Anotace se od té doby kreslí živě v tomtéž dokumentu.
- **18. 8. 2026** — zvažováno kreslit svody v SVG s `marker-end` (tak vznikla
  první verze). **Zamítnuto**: souřadnice v SVG nejdou počítat z CSS proměnných,
  takže se každý posun pilulek musel přepočítat ručně. Nahrazeno flex řádkem
  `tečka + čára + hrot + pilulka`, kde je délka svodu automaticky konstantní.
- **18. 8. 2026** — zvažován spotlight (tmavý závoj s vyříznutým kolečkem).
  **Zamítnuto**: ztmavení mění barvy UI a screenshot přestane vypadat jako
  aplikace. Zůstal bílý závoj 35 %.
- **18. 8. 2026** — závoj původně začínal hned pod horní lištou a překrýval
  tab strip. **Zamítnuto**: aktivní záložka je součást sdělení („tohle je
  evidence Služby"). Závoj proto začíná až na 86 px a panel draweru taky.
- **18. 8. 2026** — krok pilulek byl v první verzi 39–40 px odměřených z
  obrázku. **Opraveno na 38 px** = skutečná šířka spine v
  `item-drawer-stacked.html`; jinak se svody rozjedou.
