# Aptien – Referenční menu (sidebar) k doslovnému zkopírování

*Kompletní levé menu — závazné pořadí a ikony. Při generování **vlož vždy
celé menu se všemi položkami**, ve stejném pořadí, se stejnými ikonami.
Nic nevynechávej, nepřidávej ani nepřejmenovávej.*

> **Ikony:** názvy ve sloupci „Ikona" jsou přesné soubory ze složky
> **`Awesome-font-icons/`** (Font Awesome, styl `solid` + `fw`).
> Použij právě tyto soubory.

> **Nejčastější chyby, kterých se vyvaruj:**
> 1. Vynechání položek (menu musí mít **všech 15 + 7** položek).
> 2. Označení špatné nebo více položek jako aktivní.
> 3. Záměna **badge** (počet) za **aktivní stav** (zvýraznění).

---

## Struktura sidebaru (odshora dolů)

1. **Hlavička profilu** – avatar + jméno + role + název pracovního prostoru
   (persona se mění dle zadání, ale skladba zůstává).
2. **Skupina „MŮJ PRACOVNÍ PROSTOR"** – 15 osobních položek (viz níže).
3. **Skupina „NAŠE FIRMA"** – 7 firemních položek (viz níže).
4. Menu je **sbalitelné** (jen ikony) a **rolovatelné**.

---

## Skupina 1 — MŮJ PRACOVNÍ PROSTOR (15 položek)

| # | Text položky | Ikona (soubor) | Badge |
|---|---|---|---|
| 1 | Moje domovská stránka | `house-chimney.svg` | – |
| 2 | Moje upozornění | `bell.svg` | **60** (alert) |
| 3 | Můj kalendář | `calendar-days.svg` | – |
| 4 | Moje úkoly | `clipboard-check.svg` | **7** (alert) |
| 5 | Moje konverzace | `comments.svg` | **5** (alert) |
| 6 | Můj tým | `people-group.svg` | – |
| 7 | Moje oblíbené | `star.svg` | **1** (grey) |
| 8 | Moje žádanky | `file-invoice.svg` | – |
| 9 | Moje hlídače | `dog.svg` | – |
| 10 | Ke schválení | `circle-check.svg` | **2** (alert) |
| 11 | Reporty | `file-chart-column.svg` | – |
| 12 | O mě | `user.svg` | – |
| 13 | Poznámky | `clipboard.svg` | **2** (grey) |
| 14 | Moje směrnice | `books.svg` | – |
| 15 | Co jsem dělal | `chart-network.svg` | – |

## Skupina 2 — NAŠE FIRMA (7 položek)

| # | Text položky | Ikona (soubor) | Badge |
|---|---|---|---|
| 1 | Nástěnka | `grid-horizontal.svg` | – |
| 2 | Směrnice a dokumenty | `book-open.svg` | – |
| 3 | Kolegové | `users.svg` | – |
| 4 | Katalog školení | `book-open-reader.svg` | – |
| 5 | Nastavení směrnic | `books.svg` | – |
| 6 | Nastavení organizace | `sitemap.svg` | – |
| 7 | Inventura | `boxes-stacked.svg` | – |

> Badge (počty) jsou ukázkové hodnoty; zobrazují se **pořád** u dané
> položky bez ohledu na to, která je aktivní.

---

## Pravidla aktivního stavu (zvýraznění)

- **Aktivní je vždy právě JEDNA položka menu** – ta, která odpovídá
  aktuálně otevřené obrazovce. Všechny ostatní jsou tlumené (neaktivní).
- **Nikdy nezvýrazňuj víc položek najednou** ani položku, která
  neodpovídá otevřené obrazovce.
- Pokud je otevřený **modul přes horní záložku** (tab strip) a nemá přímý
  protějšek v menu, nech jako aktivní výchozí **„Moje domovská stránka"** –
  nezvýrazňuj náhodnou položku.
- **Badge ≠ aktivní stav.** Čísla (60, 7, 5, 1, 2, 2) jsou počítadla, ne
  zvýraznění. Neplet si oranžový/šedý badge s označením aktivní položky.
- Ikony: Font Awesome `solid` + `fw` (zarovnané na šířku), soubory ze
  složky `Awesome-font-icons/`.

---

## Horní záložky (tab strip) – pro úplnost

Aktivní **záložka** (nahoře) je **oranžová `#E65100`**, ne barva modulu.
Barvy a ikony jednotlivých záložek viz `Aptien-pravidla-pouziti-UI.md`,
sekce *Tab strip*.
