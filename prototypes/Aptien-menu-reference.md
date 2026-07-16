# Aptien – Referenční menu (sidebar) k doslovnému zkopírování

*Kompletní levé menu z master prototypu `Aptien-aplikace-offline.html`.
Při generování **vlož vždy celé menu se všemi položkami**, ve stejném
pořadí, se stejnými ikonami a badge. Nic nevynechávej, nepřidávej ani
nepřejmenovávej.*

> **Nejčastější chyby, kterých se vyvaruj:**
> 1. Vynechání položek (menu musí mít **všech 15 + 6** položek).
> 2. Označení špatné nebo více položek jako aktivní.
> 3. Záměna **badge** (počet) za **aktivní stav** (zvýraznění).

---

## Struktura sidebaru (odshora dolů)

1. **Hlavička profilu** – avatar + jméno + role + název pracovního prostoru
   (např. *Karolína Fišerová · Zaměstnanec · Můj pracovní prostor*; persona
   se mění dle zadání, ale skladba zůstává).
2. **Skupina „MŮJ PRACOVNÍ PROSTOR"** – 15 osobních položek (viz níže).
3. **Skupina „NAŠE FIRMA"** – 6 firemních položek (viz níže).
4. Menu je **sbalitelné** (jen ikony) a **rolovatelné**.

---

## Skupina 1 — MŮJ PRACOVNÍ PROSTOR (15 položek)

| # | Ikona (FA) | Text položky | Badge |
|---|---|---|---|
| 1 | `house` | Moje domovská stránka | – |
| 2 | `bell` | Moje upozornění | **60** (alert) |
| 3 | `comments` | Moje konverzace | **5** (alert) |
| 4 | `calendar-days` | Můj kalendář | – |
| 5 | `clipboard-check` | Moje úkoly | **7** (alert) |
| 6 | `people-group` | Můj tým | – |
| 7 | `star` | Moje oblíbené | **1** (grey) |
| 8 | `file-lines` | Moje žádanky | – |
| 9 | `binoculars` | Moje hlídače | – |
| 10 | `circle-check` | Ke schválení | **2** (alert) |
| 11 | `chart-column` | Reporty | – |
| 12 | `user` | O mě | – |
| 13 | `note-sticky` | Poznámky | **2** (grey) |
| 14 | `book` | Moje směrnice | – |
| 15 | `clock-rotate-left` | Co jsem dělal | – |

## Skupina 2 — NAŠE FIRMA (6 položek)

| # | Ikona (FA) | Text položky | Badge |
|---|---|---|---|
| 1 | `table-cells-large` | Nástěnka | – |
| 2 | `book-open` | Směrnice a dokumenty | – |
| 3 | `graduation-cap` | Katalog školení | – |
| 4 | `boxes-stacked` | Inventura | – |
| 5 | `gear` | Nastavení směrnic | – |
| 6 | `sitemap` | Nastavení organizace | – |

---

## Pravidla aktivního stavu (zvýraznění)

- **Aktivní je vždy právě JEDNA položka menu** – ta, která odpovídá
  aktuálně otevřené obrazovce. Všechny ostatní jsou tlumené (neaktivní).
- **Nikdy nezvýrazňuj víc položek najednou** ani položku, která
  neodpovídá otevřené obrazovce.
- Pokud je otevřený **modul přes horní záložku** (tab strip) a nemá přímý
  protějšek v menu, nech jako aktivní výchozí **„Moje domovská stránka"**
  (`domu`) – nezvýrazňuj náhodnou položku.
- **Badge ≠ aktivní stav.** Čísla (60, 5, 7, 1, 2, 2) jsou počítadla a
  zobrazují se **pořád**, bez ohledu na to, která položka je aktivní.
  Neplet si oranžový/šedý badge se zvýrazněním aktivní položky.
- Ikony: Font Awesome `solid` + `fw` (zarovnané na šířku).

---

## Ikony pro horní záložky (tab strip) – pro úplnost

Aktivní **záložka** (nahoře) je **oranžová `#E65100`**, ne barva modulu.
Barvy a ikony jednotlivých záložek viz `Aptien-pravidla-pouziti-UI.md`,
sekce *Tab strip*.
