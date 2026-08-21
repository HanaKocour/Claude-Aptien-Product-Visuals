# Pravidla — rodina „nadpis + screenshot"

Závazná pravidla pro obrázky, kde **význam nese nadpis** a screenshot je
důkaz. Používají se na produktové stránce jako přehled schopností
(„Personalistika a směrnice", „Přístroje a BTK", „Kompletní provoz ordinace").

Šablony: `nadpis-screen-na-hrane.html` · `nadpis-screen-s-okraji.html` ·
`nadpis-dva-screeny.html`
Prompt: `PROMPT-nadpis-a-screen.md`

> Tohle je jiná rodina než scény toku (`email-do-aplikace.html`,
> `aplikace-do-emailu.html`). Tam je nadpis **zakázaný**, protože text je na
> webu vedle obrázku. **Tady je nadpis hlavní obsah** a v obrázku být musí.
> Nemíchat.

---

## 1. Anatomie

Obrázek má **přesně dvě vrstvy** a nic víc:

| Vrstva | Co to je | Kolik |
|---|---|---|
| **Bílá karta** | nese nadpis, radius 28 px | 1 |
| **Screenshot** | důkaz, orýznutý rámem nebo kartou | 1, u varianty C dva |

⛔ **Nic dalšího do obrázku nepatří** — žádná pilulka, popiska, šipka,
jiskra, gradient, druhý text, ikona ani rámeček zařízení (žádný laptop
mockup). Jen nadpis a screenshot.

---

## 2. Rám a plocha

| Parametr | Hodnota |
|---|---|
| Výstup | **1920 × 1080 px** (stejně jako celá složka) |
| Návrhová vrstva | **1536 × 864** se `transform: scale(1.25)` |
| Plocha za kartou | `#f4f4f7` |
| Karta | `#fff`, radius **28 px**, stín `0 10px 34px rgba(30,27,46,.06)` |

⛔ **Karta se nikdy nebarví** a nedostává gradient. Barvu do obrázku vnáší
jen nadpis a samotný screenshot.

---

## 3. Nadpis

```
font-family: Nunito · font-weight: 900 · font-size: 60px · line-height: 1.1
letter-spacing: -.015em · color: #311B92 · text-align: center
```

- **2–4 slova**, max ~28 znaků na řádek, **max 2 řádky**.
- ⛔ **Nezmenšuj font, aby se vešel delší text — zkrať text.** Velikost
  nadpisu je to, co drží celou sadu obrázků konzistentní.
- Nadpis pojmenovává **schopnost nebo oblast**, ne akci a ne claim:
  ano „Přístroje a BTK", „Personalistika a směrnice";
  ne „Ušetříte 5 hodin týdně", ne „Zaevidujte přístroj".
- Bez tečky na konci, bez vykřičníku.

---

## 4. Screenshot

```
border-radius: 14px · border: 1px solid #e6e4ee
box-shadow: 0 22px 60px rgba(30,27,46,.18)      (přední / jediný)
box-shadow: 0 14px 40px rgba(30,27,46,.12)      (zadní u varianty C)
```

- **Poměr přibližně 3:2** (např. 1400 × 900). Jiný poměr rozseká rozvržení.
- Snímek musí být na **světlém pozadí** — na tmavém se ztratí bílá karta.
- ⛔ **Nenaklánět, nedávat perspektivu, nezaoblovat víc, nedávat do rámečku
  notebooku nebo telefonu.** Plochý snímek s jemným stínem.
- ⛔ **Screenshot se ORÝZNE rámem nebo kartou, a to je záměr.** Nikdy ho
  nezmenšuj tak, aby se vešel celý — pak z obrázku zmizí hloubka a snímek
  je nečitelně malý. Vidět má být **horní část obrazovky** (lišta, název
  evidence, začátek obsahu).
- ⛔ **Neposouvej snímek do minusu vlevo** — uřízlo by to logo Aptienu
  v horní liště.

### Dvě cesty, odkud snímek vzít

**A) Hotové PNG** (výchozí) — `<img src="...">`. Sem patří snímky ze
skutečné instance, když chceš ukázat reálná data a reálné jméno firmy.

**B) Vyrenderovaný z prototypu** — v každé šabloně je pod `<img>`
zakomentovaný blok `<div class="hs-shot hs-shot-live">`. Odkomentuj ho,
`<img>` smaž a vlož dovnitř UI z `prototypes/partials/`. Použij, když chceš
vždy aktuální design a ostré písmo místo přeškálovaného snímku.

`ukazka-screen.png` ve složce je **jen zástupný snímek** pro referenční
výstupy — do produkčního obrázku ho nedávej.

---

## 5. Tři varianty a kdy kterou

| Varianta | Soubor | Kdy |
|---|---|---|
| **A · na hraně** | `nadpis-screen-na-hrane.html` | Standardní volba. Snímek leží přes spodní hranu karty a přetéká dolů z rámu — dává obrázku hloubku a pohyb. |
| **B · s okraji** | `nadpis-screen-s-okraji.html` | Když má být snímek vidět celý na šířku a klidněji. Hodí se pro obrázek do úzkého sloupce. |
| **C · dva screeny** | `nadpis-dva-screeny.html` | Když schopnost stojí na **dvou různých obrazovkách** (např. karta zaměstnance + karta přístroje). |

### Geometrie (v návrhové vrstvě 1536 × 864)

**A · na hraně**
- karta: `left:80 top:40 width:1376 height:250`, nadpis vodorovně i svisle na střed
- snímek: `left:48 top:262 width:1250` — překrývá spodní hranu karty (ta končí na 290) a přetéká dolů

**B · s okraji**
- karta: `left:64 top:40 width:1408 height:784`, `padding:56px 90px 0`
- snímek: `margin-top:44 width:1120`, vodorovně na střed, zdola ho orýzne karta

**C · dva screeny**
- karta: stejná jako u B
- zadní snímek: `left:378 top:196 width:940`, slabší stín
- přední snímek: `left:74 top:274 width:940`, `z-index:2`, silnější stín

⛔ **U varianty C je přední snímek VŽDY vlevo a níž.** Nepřeklápěj to —
sada obrázků pak přestane vypadat jako sada.
⛔ **U varianty C použij dva RŮZNÉ snímky.** Dva stejné vypadají jako chyba
renderu.

---

## 6. Konzistence sady

Tyhle obrázky se na stránce objevují **vedle sebe jako sada**. Proto:

- ✅ **Stejná varianta v jedné sadě.** Když děláš tři obrázky do jedné
  sekce, ať jsou všechny „na hraně" nebo všechny „s okraji". Nemíchej.
- ✅ **Stejná velikost nadpisu** ve všech (60 px, nikdy nepřepisovat).
- ✅ **Stejná šířka snímku** ve všech obrázcích sady.
- ✅ **Snímky ze stejné instance** — ať se nemíchá „Ukázková ordinace"
  s „Naše skvělá firma" v jedné sekci.

---

## 7. Checklist před odevzdáním

1. Soubor je přesně **1920 × 1080 px** (`render.js` spadne, když ne).
2. Nadpis je Nunito **900**, **60 px**, `#311B92`, na střed, max 2 řádky.
3. Nadpis pojmenovává oblast, ne akci ani claim; bez tečky.
4. Snímek má poměr ~3:2, světlé pozadí, radius 14 px, jemný okraj a stín.
5. Snímek je **orýznutý** (dole rámem nebo kartou), ne zmenšený „aby se vešel".
6. Vlevo není nic uříznuté — logo Aptienu v liště je celé vidět.
7. Snímek není naklonění, bez perspektivy, bez mockupu zařízení.
8. V obrázku není žádná pilulka, popiska, šipka, jiskra ani druhý text.
9. U varianty C jsou dva **různé** snímky, přední vlevo a níž.
10. Celá sada používá stejnou variantu, stejnou velikost nadpisu i snímku.

---

## 8. Historie rozhodnutí

- **13. 8. 2026** — rodina zavedena podle tří existujících obrázků z webu
  (Personalistika a směrnice · Přístroje a BTK · Kompletní provoz ordinace).
  Rozvržení zmrazeno do tří šablon, aby šlo vyrábět další obrázky do stejné
  sady bez odhadování.
- **13. 8. 2026** — rozměr **1920 × 1080**, tedy shodný se scénami toku,
  i když původní obrázky na webu měly poměr ~3:2. **Důvod:** jeden rozměr
  pro celou složku, `render.js` ho už kontroluje a nemusí se udržovat druhý
  rám.
- **13. 8. 2026** — u varianty „na hraně" byl snímek nejprve posunutý do
  minusu vlevo (`left:-60`) podle původního obrázku. **Zamítnuto**: uřízlo
  to logo Aptienu v horní liště. Teď přetéká jen dolů (`left:48`).
- **13. 8. 2026** — nadpis je **v obrázku**, na rozdíl od scén toku, kde je
  zakázaný. Jsou to dvě různé rodiny s opačným pravidlem — proto mají
  vlastní pravidla i vlastní prompt.
