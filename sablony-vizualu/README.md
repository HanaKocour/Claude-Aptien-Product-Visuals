# Šablony vizuálů

Hotové **šablony pro generování produktových obrázků** — takové, které
ukazují tok mezi dvěma místy (něco přijde e-mailem a v Aptienu z toho sám
vznikne záznam; systém sám upozorní; ze záznamu vznikne úkol…).

## Čím se to liší od `prototypes/`

| | `prototypes/` | `sablony-vizualu/` |
|---|---|---|
| Odpovídá na otázku | Jak vypadá **aplikace**? | Jak vypadá **obrázek**? |
| Co je zdroj pravdy | design systém Aptienu | tato šablona |
| Co se mění | data v pohledu | jen data ve scéně |
| Výstup | náhled obrazovky | PNG 1920 × 1080 na web |

Šablona **spotřebovává** prototyp: panel s aplikací je výřez skutečného UI
vloženého z `prototypes/partials/`. Vzhled scény (plocha, panely, konektor,
popisky) je hotový a zmrazený — ty měníš jen obsah.

⛔ **Nepřepisuj v šablonách design.** Když je potřeba změnit vzhled scény,
je to změna šablony pro všechny budoucí obrázky — udělej ji vědomě a zapiš
do sekce *Historie rozhodnutí* níže.

## Co je ve složce

| Soubor | K čemu |
|---|---|
| `email-do-aplikace.html` | šablona **e-mail → aplikace** (vyplněná jako SÚKL) |
| `PROMPT-email-do-aplikace.md` | prompt k ní |
| `aplikace-do-emailu.html` | šablona **aplikace → e-mail / notifikace** (kontrola stavby s fotkou) |
| `PROMPT-aplikace-do-emailu.md` | prompt k ní |
| `render.js` | render šablony do PNG 1920 × 1080 + kontroly |
| `priklad-email-do-aplikace.png` | referenční výstup šablony A |
| `priklad-aplikace-do-emailu.png` | referenční výstup šablony B |

### Kterou šablonu vzít

| Co má obrázek říct | Šablona |
|---|---|
| Něco přijde poštou a v Aptienu z toho SÁM vznikne záznam | `email-do-aplikace.html` |
| Záznam už v Aptienu je a aplikace SAMA rozešle upozornění | `aplikace-do-emailu.html` |

Poznávací znak: **hlavní panel je vždy ten, o kterém obrázek vypráví, a je
širší (736 px).** U šablony A je vpravo (Aptien jako cíl), u šablony B vlevo
(Aptien jako zdroj). Konektor vždycky míří od zdroje k cíli.

## Jak vyrobit nový obrázek

**Ručně:**

1. Zkopíruj `email-do-aplikace.html` pod novým názvem, např. `faktury-do-evidence.html`.
2. Přepiš jen místa označená `✏️ MĚŇ` (jsou vypsaná v komentáři na začátku souboru).
3. `node render.js faktury-do-evidence.html` → `faktury-do-evidence.png`.

**Přes Claude:** dej mu `PROMPT-email-do-aplikace.md` s vyplněnou spodní sekcí.
V promptu je výslovně řečeno, že má šablonu **přečíst a vložit doslovně**
a měnit jen data — jinak si vzhled začne vymýšlet.

### Příprava renderu (jednorázově, ve této složce)

```bash
npm init -y
npm i -D playwright
npx playwright install chromium
```

Šablona bere Nunito a Font Awesome z CDN, takže render potřebuje internet.
Bez něj se nevykreslí ikony ani písmo (logo Aptienu, Gmail a Outlook jsou
inline SVG, ty vyjdou vždy).

## Pevná geometrie (platí pro všechny šablony)

- výstup **1920 × 1080 px**, návrhová vrstva **1536 × 864** se `scale(1.25)`
- padding scény 56 px → využitelná plocha **1424 × 752**
- sloupce: **520 + 168 + 736** (e-mail → aplikace) nebo
  **736 + 168 + 520** (aplikace → e-mail) — součet vždy **1424**
- vyšší panel drž na **70–90 % výšky (530–680 px)** — `render.js` to hlásí
- plocha scény `#f4f4f7`, konektor vždy modrý `#1572e8`
- horní lišta aplikace `#424242`, logo Aptienu `height:28px`, wordmark 19px/800

Detailní pravidla a zdůvodnění jsou v komentáři na začátku každé šablony.

## Karta položky vždy obsahuje obrázek

Karta záznamu má **vpravo v hlavičce slot 110 × 110 px na obrázek položky** —
tak, jak je definovaný v `prototypes/partials/item-drawer-shell.html`.

- **Fotka zadaná** → `<img>` s `object-fit:cover`, radius 8 px
  (viz `aplikace-do-emailu.html`).
- **Fotka nezadaná** → zůstane **prázdný placeholder**: `2px dashed #d8d6e2`,
  radius 8 px, uvnitř `fa-image` 28 px `#cdd0d8`
  (viz `email-do-aplikace.html`).

⛔ **Slot se nikdy nemaže.** Prázdný placeholder je platný stav a v aplikaci
vypadá stejně — obrázek se u záznamu jen ještě nenahrál.

Fotky se do šablon vkládají jako `data:` URI (JPEG, středový výřez na kvadrát,
300 × 300, kvalita 82), aby soubor zůstal samostatný a šel vyrenderovat
i offline. Zdrojové fotky jsou v `files/Photos and pictures/`.

## Loga třetích stran

⚠️ Gmail a Outlook jsou v šabloně **zjednodušená inline SVG kreslená ručně**.
Před publikací na web je nahraď oficiálními SVG z brand assets Googlu
a Microsoftu a projdi jejich pravidla použití (ochranná zóna, minimální
velikost, povolené barevné varianty). Když značky nechceš vůbec, smaž
z šablony celý `<div class="cv-prov">`.

## Historie rozhodnutí

- **12. 8. 2026** — složka zavedena. Předchůdcem byly kreslené ilustrace
  (fialový gradient, konfety, sparkly, překreslené UI). **Zamítnuty**:
  vedle skutečných screenshotů na produktové stránce působily jako pěst
  na oko. Šablona proto ukazuje **skutečné UI** zasazené do neutrální scény.
- **12. 8. 2026** — logo Aptienu bylo nejprve `fa-bolt` a 19 px v liště 40 px;
  **zamítnuto**, ztrácelo se. Teď jsou to skutečné proporce z prototypu
  (lišta 56 px, logo 28 px, wordmark 19px/800) a logo je inline SVG
  z `prototypes/assets/img/681a831d.svg`.
- **12. 8. 2026** — item tabs byly nejprve modré pilulky; **zamítnuto**,
  to je styl view switcheru. Teď jsou to složkové taby 1:1 z
  `prototypes/partials/item-drawer-shell.html`.
- **12. 8. 2026** — pravý panel měl 8 řádků polí; **zamítnuto** jako
  „stěna formuláře" bez fokusu a nečitelná v malém náhledu. Výřez je těsný.
- **12. 8. 2026** — **název záznamu = předmět e-mailu.** To je pointa obou
  šablon a platí v obou směrech: u šablony A se z předmětu stane název
  položky, u šablony B se z názvu položky stane předmět notifikace.
  Nepoužívej obecný název evidence.
- **13. 8. 2026** — karta položky má **vždy slot na obrázek 110 × 110**,
  i když fotka není zadaná (pak prázdný placeholder). Dřív v šablonách
  chyběl úplně, což je proti draweru.
- **13. 8. 2026** — v šabloně A vypadlo pole „Typ oznámení": po tom, co se
  název položky stal předmětem e-mailu, říkalo totéž dvakrát. Spolu s polem
  „Šarže" ubráno taky proto, aby se panel s novou hlavičkou (s obrázkem)
  vešel do rozpočtu 70–90 % výšky.
