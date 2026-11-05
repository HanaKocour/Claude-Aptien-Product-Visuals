# Formáty obrázků — zdroj pravdy

Jediné místo, kde jsou definované **rozměry obrázků podle použití**. Všechny
šablony (`sablony-vizualu/` a `sablony-kb/` v tomto repozitáři – jediný zdroj pravdy;
`Claude-Aptien-Templates` je jen katalog s náhledy)
se skládají do těchto rozměrů. ⛔ Šablona si vlastní rozměr nevymýšlí.

Platí od 3. 11. 2026.

## Přehled

| Použití | Rozměr návrhu | Nahrává se na web | Poměr | Výška |
|---|---|---|---|---|
| **Web – produktové / marketingové stránky** | **1820 × 980 px** | **@2x 3640 × 1960 px** (PNG) | 13 : 7 (≈ 1,857) | pevná |
| **KB – články znalostní báze** | **šířka 1700 px** | 1700 px (je už ve 2× hustotě) | 16 : 9, 3 : 2 nebo 4 : 3 | podle obsahu |
| Sociální sítě, bannery, newsletter | podle `Claude-Aptien-Banners` | — | — | — |

## 1 · Web – produktové a marketingové stránky

Jeden rozměr pro **všechny** obrázky na produktových stránkách (feature bloky,
galerie, datová grafika, scény toku, nadpis + screen, kaskáda, mobil v ruce).
Obrázky se liší jen obsahem a vrstvami čitelnosti, nikdy rozměrem.

**Proč 1820 × 980:** CMS aptien.com zachovává poměr stran a ze zdroje dělá
dvě verze (naměřeno 3. 11. 2026 na stránce kybernetické bezpečnosti):

| Verze v CMS | Šířka souboru | Zobrazení na webu | K čemu |
|---|---|---|---|
| `medium_` – miniatura | 1800 px | cca **600 × 322** CSS px | obrázek v textu stránky |
| `detail_` – po rozkliknutí | 2880 px | přes celé okno | zvětšení |

**Vzhled:** obrázek je rovnou bílá karta – rovné rohy, žádná šedá plocha kolem,
žádný stín karty. Stín pod screenshotem / panelem aplikace uvnitř zůstává.

### Miniatura vs. rozkliknutí (čitelnost)

Obrázek musí fungovat ve dvou vrstvách. Miniatura je zhruba **⅓** návrhu
(1820 → ~600 px).

| Vrstva | Co nese | Velikost v návrhu (CSS px výstupu) | V miniatuře (~⅓) | Po rozkliknutí |
|---|---|---|---|---|
| **1 · pointa** | nadpis, velká čísla, názvy kroků | nadpis **75** (60 × 1,25), čísla 38–70, titulky 28–30 | 25 / 13–23 / 9–10 px → **čitelné** | čitelné |
| **2 · detail** | UI, popisky, zdroj | 14–20 | 5–7 px → nečitelné, **láká ke zvětšení** | čitelné |

- ⛔ Pointa nesmí být jen ve vrstvě 2. Když se nevejde do nadpisu a čísel, zkrať ji.
- ⛔ Nadpis se nezmenšuje. Zkrátí se text (2–6 slov, max 2 řádky).

### Ostrost

- Na web se **vždy nahrává verze @2x (3640 × 1960)**. CMS z ní udělá ostrou
  miniaturu i ostrý detail (2880 px).
- Verze 1× (1820 × 980) je jen náhled / do dokumentů.
- ⛔ Nikdy neupscaluj menší obrázek. @2x se renderuje: `SCALE=2 node render.js …`.
- PNG (UI a text zůstanou ostré). JPG jen na výslovné přání.

### Jak se do rozměru skládají šablony

Návrhová vrstva všech šablon je **1536 × 864** v hustotě `scale(1.25)`.

| Typ šablony | Jak se dostane na 1820 × 980 |
|---|---|
| s kartou / plochou (datová grafika, UI + data, nadpis + screen, scény toku) | vrstva se posune o −40 návrhových px a vnější okraj 40 px se ořízne |
| celá obrazovka aplikace (kaskáda s anotací, mobil v ruce) | vrstva se zmenší na šířku 1820 (`scale(1.18490)`), dole se ořízne ~37 návrhových px |

Ukázka miniatury a rozkliknutí na stránce: `ukazky-formatu/ukazka-web.png`.

Komponenty uvnitř (výřez UI, datový panel, screenshot, konektor, pilulky)
se přizpůsobují rámu – rám se nikdy nepřizpůsobuje komponentě.

## 2 · KB – články znalostní báze

Sloupec s obsahem článku je **850 CSS px**, CMS dělá náhled široký 1200 px.

| Parametr | Hodnota |
|---|---|
| Šířka | **1700 px vždy** (2 × 850 → ostré i na retině) |
| Výška | podle obsahu, zaokrouhlit na poměr **16 : 9 (956 px)**, **3 : 2 (1134 px)** nebo **4 : 3 (1276 px)** – v návrhu rám 850 × 478 / 567 / 638 CSS px |
| Mobilní screenshot | výjimečně až **1 : 1 (1700 px)** |
| Formát | PNG |
| Šablony | `sablony-kb/` (typ A a B, `render-kb.js`); ukázka v článku `ukazky-formatu/ukazka-kb.png` |

**Dva typy KB obrázků** (šablony v `sablony-kb/`):

| Typ | Co to je | Pozadí / rámování |
|---|---|---|
| **A · Screen** (`kb-screen.html`) | screenshot aplikace přes celý obrázek + červené zvýraznění | ⛔ žádné okno se zaoblenými rohy na pozadí, žádný stín ani okraj – aplikace začíná u hrany |
| **B · Kombinovaný** (`kb-kombinovany.html`) | text s kroky + mockup notebooku (+ telefonu), 16 : 9 | jednolité určené pozadí `#F5F3FF` přes celý obrázek, bez zaoblení a stínu; zaoblení/stín mají jen zařízení |

**Čitelnost bez rozkliknutí** (většina textu musí jít přečíst přímo v článku):

- Screenshot aplikace se snímá v hustotě **2×** (devicePixelRatio 2).
- Ideálně **850 CSS px** aplikace = 1700 px obrázku → v článku 1 : 1, písmo UI v plné velikosti.
- Když je potřeba víc aplikace, nejvýš **1100 CSS px** šířky okna (zmenšení na 0,77, písmo UI ~10 px). Víc ne – pak výřez zúžit nebo použít zvětšený detail přes screenshot.
- Zvýraznění v KB je **červené `#FF0000`** (rámeček 4 pt, šipky, čísla kroků) – pravidla v manuálu „Obrázky do znalostní báze Aptien“.
- Screenshot se neřeže natvrdo na hraně okna; vidět je celý dialog nebo panel i s nadpisem.

## Kde se co používá

| Repozitář / složka | Formát |
|---|---|
| `Claude-Aptien-Product-Visuals/sablony-vizualu/` | web – produktové stránky |
| `Claude-Aptien-Product-Visuals/sablony-kb/` | KB (typ A screen, typ B kombinovaný) |
| `Claude-Aptien-Banners` | sociální sítě, bannery (vlastní formáty) |

## Historie

- **3. 11. 2026** – zavedeno. Dva formáty: web 1820 × 980 (@2x 3640 × 1960)
  a KB šířka 1700 s volnou výškou. Rozměr webu převzat z obrázků už
  nasazených na stránce kybernetické bezpečnosti (CMS zachovává poměr).
  Šablony v `sablony-vizualu/` převedeny z 1920 × 1080.
- **3. 11. 2026** – KB rozdělené na dva typy: A „screen“ (bez okna na pozadí) a B „kombinovaný“
  (text + mockupy na určeném pozadí `#F5F3FF`, bez zaoblení a stínu plochy).
- **3. 11. 2026** – jeden zdroj pravdy: všechny šablony obrázků jsou v tomto repozitáři,
  Templates je katalog, hotové výstupy jsou v `Claude outputs/<projekt>/`.
