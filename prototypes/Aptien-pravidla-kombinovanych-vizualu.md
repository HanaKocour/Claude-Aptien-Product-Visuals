# Aptien – pravidla pro kombinované vizuály („scéna")

Závazný formát pro vizuály, které **ukazují tok mezi dvěma místy** –
e-mail → aplikace, aplikace → notifikace, aplikace → aplikace,
mobil ↔ desktop. Typicky doprovázejí text na produktové stránce nebo
v knowledge base tam, kde jeden screenshot nestačí, protože pointa je
v tom, **odkud kam** data putují.

Předloha k doslovnému vložení: **`partials/combo-scena.html`**
(4 hotové scény, varianta A je vyplněná jako SÚKL).
Rozměr, hustota a render: **`Aptien-pravidla-screenshotu.md`**.

---

## 0. Proč tato pravidla vznikla

Dosavadní kombinované obrázky byly kreslené ilustrace: fialové gradientové
pozadí, konfety, sparkly, `@` symboly, pilulky s marketingovými hláškami,
překreslené „appky ve stylu Aptienu". Na produktové stránce stály vedle
skutečných screenshotů aplikace a působily jako **pěst na oko** – jiná
paleta, jiná typografie, jiná hustota, jiná míra realismu.

Řešení není přebarvit ilustraci. Řešení je **ukázat skutečné UI a jen ho
zasadit do neutrální scény.** Vizuál pak vedle screenshotu nevyčnívá,
protože je to *taky* screenshot – jen skládaný.

---

## 1. Anatomie scény

Každý kombinovaný vizuál má **přesně tři části** a nic víc:

| Část | Co to je | Kolik |
|---|---|---|
| **Panel** | výřez obrazovky (bílá karta se zaoblením a stínem) | 2, výjimečně 3 (viz §6) |
| **Konektor** | pilulka s 1–2 slovy + přerušovaná šipka | 1 |
| **Popiska** | 1 řádek nad panelem, VERZÁLKY, šedá | 1 na panel |

Nic další do scény nepatří: **žádné konfety, sparkly, hvězdičky, dekorativní
tečky, `@` symboly, prolínající se kruhy, gradientové pozadí, marketingové
nadpisy.** Nadpis a text jsou na webu vedle obrázku, ne v obrázku.

---

## 2. Plocha scény (rám)

| Parametr | Hodnota |
|---|---|
| Výstup | **1920 × 1080 px** (stejně jako screenshoty) |
| Návrhová vrstva | **1536 × 864 CSS px**, `transform: scale(1.25)` |
| Padding scény | **56 px** → využitelná plocha **1424 × 752** |
| Pozadí plochy | **`#f4f4f7`** – neutrální světle šedá, jednolitá |

⛔ **Pozadí je jednobarevné.** Žádný gradient, žádný fialový nádech, žádná
barva modulu. Barvu ve scéně nese jen konektor a samotné UI v panelech.

⛔ **Nikdy `fullPage: true`**, nikdy neupscalovat menší obrázek.

---

## 3. Mřížka sloupců

Scéna je vodorovný flex: `sloupec – konektor – sloupec`. Součet šířek je
vždy **1424 px**. Osvědčené kombinace:

| Varianta | Levý | Konektor | Pravý |
|---|---|---|---|
| A · e-mail → aplikace | 520 | 168 | **736** |
| B · aplikace → notifikace | **736** | 168 | 520 |
| C · aplikace → aplikace | 640 | 144 | 640 |
| D · mobil ↔ desktop | 296 (telefon) | 144 | **984** |

**Hlavní panel je ten širší** – ten, o kterém obrázek vypráví. U „e-mail →
aplikace" je hlavní Aptien (736), u „aplikace → notifikace" je hlavní
Aptien (736) a notifikace je důsledek (520).

Každý sloupec je **svisle vycentrovaný samostatně**, takže konektor v polovině
výšky míří doprostřed obou panelů. Popisky proto nemusí být ve stejné výšce –
to je v pořádku, nesnaž se je zarovnat.

⛔ **Panely se nikdy nepřekrývají.** Překryv byl zkoušen (mobil přes desktop)
a zamítnut: telefon zakryl první sloupec tabulky. Stejná tříčlenná mřížka
platí i pro mobil ↔ desktop.

---

## 4. Panel

```
background:#fff · border:1px solid #e4e2ed · border-radius:12px
box-shadow:0 10px 30px rgba(30,27,46,.12) · overflow:hidden
```

Radius a okraj jsou **stejné jako karty v aplikaci** – proto panel vedle
screenshotu neruší. Stín je jediné, co je „scénické" (v aplikaci karty
takový stín nemají) a slouží k oddělení od plochy.

### 4.1 Panel typu „aplikace" (Aptien)

⛔ **NIKDY nekresli UI Aptienu z hlavy.** Panel je **výřez skutečné
obrazovky**: otevři (Read) odpovídající partial z `prototypes/partials/`,
vlož ho doslovně a **měň jen data**. Platí všechna pravidla z `CLAUDE.md`
a `Aptien-pravidla-pouziti-UI.md` – barevné role, ikony, struktura polí.

Panel začíná **horní lištou `#424242`** s logem „aptien" (40 px ve výřezu),
aby bylo poznat, že jde o Aptien. Pod ní následuje obsah výřezu:

| Co má obrázek říct | Co vložit do panelu |
|---|---|
| vznikl / změnil se záznam | `item-drawer-shell` + `drawer-tab-detaily` (hlavička + pole) |
| přehled a termíny | `evidence-toolbar` + `evidence-list` / `evidence-table` |
| práce se rozdělila | výřez „Moje úkoly" / „Ke schválení" |
| zaměstnanec na telefonu | rám telefonu + obrazovka z `partials/mobil-home.html` / `mobil-konverzace.html` / `mobil-chat.html` / `mobil-o-mne.html` (zavedeno 1. 9. 2026 — dřív se ručně kopírovalo z `Aptien-mobil-intranet.html`, viz `mobil-v-ruce.html`) |

**Výřez, ne zmenšenina.** Panel je 520–984 px široký, takže se do něj celá
obrazovka nevejde – **uřízni ji** (vynech sidebar, vynech tab strip, ukaž jen
tu část, o které obrázek je). Nikdy nescaluj celé UI dolů: velikosti písma a
prvků zůstávají shodné s aplikací (text 12–15 px v návrhové vrstvě).

### 4.2 Panel typu „cizí aplikace" (e-mail, prohlížeč)

Panel začíná **okenní lištou** `.cv-chrome`: `#f0eff4`, tři šedé tečky
`#d6d3e0`, popisek („Doručená pošta"). Šedá je záměr – **cizí prostředí
nikdy nedostane barvu.** Nekresli logo Gmailu, Outlooku ani jiné cizí
značky; obrázek říká „vaše pošta", ne „konkrétní klient".

Řádky pošty:

- **běžná pošta = ztlumená** – text `#6e6885`, ikona `#c0bbcf`. Je to
  kulisa, ne obsah.
- **zpracovávaný e-mail = zvýrazněný** – pozadí `#eef4fe`,
  `box-shadow: inset 3px 0 0 #1572e8`, text `#1e1b2e/800`, ikona `#1572e8`.
  Je to **stejné zvýraznění jako aktivní položka v sidebaru** – žádná nová
  barva. Zvýrazni 1–2 řádky, ne půl schránky.
- příloha se zobrazuje jako chip s `fa-file-pdf` v `#E53935`.

### 4.3 Výška panelu – rozpočet

Panel má zaplnit **70–90 % využitelné výšky, tj. cca 530–680 px**. Když je
nižší, obrázek na webu působí jako malá miniatura ve velkém prázdnu.

> **Když je panel příliš nízký, PŘIDEJ ŘÁDKY DAT** (další e-maily, další
> řádky seznamu, další pole záznamu). **Nikdy** nezvětšuj fonty, nezvětšuj
> radiusy a nescaluj panel nahoru.
>
> **Když panel přeteče nad 90 %, UBER ŘÁDKY.** Nezmenšuj padding ani text.

Ověřuj **měřením**, ne pohledem – viz checklist §8.

---

## 5. Konektor

```
pilulka: background:#1572e8 · color:#fff · 11px/800 · letter-spacing:.05em
         padding:6px 14px · border-radius:999px
         box-shadow:0 2px 8px rgba(21,114,232,.30) · margin-bottom:12px
šipka:   stroke #a8c4ea · width 2.5 · stroke-dasharray "7 7" · plná hlavička
```

- **Konektor je VŽDY modrý `#1572e8`.** Je to akce – stejná role jako
  „Uložit změny" a přepínání pohledů. **Nikdy nepřebírá barvu modulu.**
- Pilulka nese **1–2 slova, max ~14 znaků** (delší text přeteče sloupec):
  `AUTO-IMPORT` · `UPOZORNÍ SÁM` · `VYTVOŘÍ ÚKOL` · `STEJNÁ DATA` ·
  `PŘEDÁ KE SCHVÁLENÍ` je už moc dlouhé → `KE SCHVÁLENÍ`.
- Ikona v pilulce je nepovinná, vždy jen jedna: `bolt` (automaticky),
  `paper-plane` (odesílá), `arrow-right-arrow-left` (obousměrně).
- **Šipka je jednosměrná u toku (A, B, C), obousměrná u „stejných dat" (D).**
- **Jeden konektor na scénu.** Když potřebuješ dva kroky, viz §6.

### 5.1 Zelený odznak „stalo se to samo" (nepovinný)

Kolečko `34 px`, `#43A047`, bílá fajfka, lem `3px` v barvě plochy,
umístěné na `bottom:-13px; right:-13px` cílového panelu. Používej **jen
tam, kde je pointa „bez jediného kliku"** (A, C) – ne na každé scéně, a
**nikdy víc než jedno na scénu**. Nesmí zakrývat obsah panelu (proto dolní
pravý roh, ne horní – tam je avatar a zvonek).

---

## 6. Tři panely (dvoukrokový tok)

Když má obrázek říct „přijde → zpracuje se → odejde", jde to, ale za cenu
šířky. Mřížka: **420 + 120 + 420 + 120 + 344 = 1424**, dva konektory.
Používej **jen když dvoukrokovost je ta pointa**; jinak rozděl na dva
obrázky. U tří panelů **zmizí zelený odznak** (scéna už je dost hustá).

---

## 7. Barvy scény – souhrn

| Prvek | Barva | Pravidlo |
|---|---|---|
| Plocha scény | `#f4f4f7` | jednolitá, nikdy gradient |
| Panel | `#fff`, okraj `#e4e2ed`, radius `12px` | jako karty v aplikaci |
| Okenní lišta cizí aplikace | `#f0eff4`, tečky `#d6d3e0` | vždy šedá |
| Popiska nad panelem | `#8a84a0`, `11px/800`, VERZÁLKY, `letter-spacing:.09em` | max 1 řádek |
| Konektor (pilulka) | `#1572e8`, bílý text | VŽDY modrý |
| Konektor (šipka) | `#a8c4ea`, přerušovaná | |
| Zvýrazněný řádek pošty | tint `#eef4fe` + pruh `#1572e8` | jako aktivní položka sidebaru |
| Odznak „automaticky" | `#43A047` | max 1 na scénu, nepovinný |
| Horní lišta Aptienu | `#424242` | vždy, i ve výřezu |
| Barva modulu (`c800`) | dle tabulky záložek | jen uvnitř UI panelu (ikona názvu, „PŘIDAT …") |
| Sémantické (zelená/oranžová/červená) | dle stavu | jen stavy a termíny, ne dekorace |

⛔ **Fialová `#6200EA` je stará barva** a do kombinovaného vizuálu nepatří
ani jako pozadí, ani jako akcent. (Výjimka: fialový pruh *události*
v kalendáři, když je v panelu výřez kalendáře.)

⛔ **Do obrázku nepatří text nadpisu ani claim.** Zbývá jen: popiska nad
panelem (1× na panel), pilulka konektoru (1×) a data uvnitř UI. Vše ostatní
napíše web vedle obrázku.

---

## 8. Checklist před odevzdáním

1. Skutečné rozměry souboru = **1920 × 1080 px** (`identify` / `file`).
2. Vnitřní vrstva je **1536 × 864** se `transform: scale(1.25)`.
3. Součet šířek sloupců = **1424 px**; `scrollWidth == clientWidth`
   a `scrollHeight == clientHeight` na `.cv-scene` (změř, neodhaduj).
4. Panel s aplikací je **vložený partial**, ne kresba z hlavy – barvy,
   ikony, struktura polí a horní lišta `#424242` sedí s prototypem.
5. Výška vyššího panelu je **70–90 %** využitelné výšky (530–680 px).
   Když ne, přidej / uber řádky dat.
6. Ve scéně je **právě jeden konektor** (u tří panelů dva), modrý,
   s textem do ~14 znaků.
7. Zelený odznak je **max jeden** a nezakrývá obsah.
8. Ve scéně **není** gradient, konfety, sparkly, `@`, cizí loga ani
   marketingový nadpis.
9. Pozadí je `#f4f4f7`; žádná barva modulu se nepropsala do plochy,
   popisky ani konektoru.
10. Nic není odříznuté – zejména pravý okraj širšího panelu a spodní řádek
    seznamu / tabulky.

---

## 9. Historie rozhodnutí

- **12. 8. 2026** – zavedeno. Dosavadní ilustrace (fialové gradientové
  pozadí, konfety, sparkly, překreslené UI) **zamítnuty**: vedle skutečných
  screenshotů na produktové stránce působily jako pěst na oko.
- **12. 8. 2026** – zkoušen **překryv** telefonu přes desktop u varianty
  mobil ↔ desktop. **Zamítnuto**: telefon zakryl první sloupec tabulky
  („Pomůcka"). Nahrazeno stejnou tříčlennou mřížkou s obousměrným konektorem.
- **12. 8. 2026** – zkoušen zelený odznak v **pravém horním** rohu panelu.
  **Zamítnuto**: zakrýval zvonek s notifikací a avatar v horní liště.
  Přesunut do pravého dolního rohu.
- **12. 8. 2026** – potvrzeno, že se panely **svisle centrují samostatně**
  (ne zarovnání popisek na jednu linku), aby konektor mířil doprostřed obou.
