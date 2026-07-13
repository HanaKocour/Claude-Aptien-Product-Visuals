# Aptien – Pravidla použití UI

*Specifikace odvozená z prototypů (menu & app bar, obecná evidence, kanban/tabulka, rizika, směrnice). Popisuje strukturu rozhraní, ikony a menu, chování aplikace, UI komponenty a vizuální styl. Slouží jako referenční „design guideline" pro návrháře a vývojáře.*

---

## 1. Základní layout aplikace

Aplikace používá jednotný rámec (shell), který je stejný na všech obrazovkách. Skládá se ze čtyř hlavních vrstev odshora dolů a zleva doprava:

1. **Top bar (app bar)** – horní fialový pruh přes celou šířku.
2. **Tab strip** – lišta otevřených záložek/modulů pod app barem.
3. **Color separator** – tenká barevná linka oddělující lištu záložek od obsahu.
4. **Levé menu (sidebar)** + **Content area** – navigace vlevo, hlavní obsah vpravo.

Nad obsahem se podle potřeby vysouvá **Item detail drawer** (panel detailu záznamu) z pravé strany.

```
┌─────────────────────────────────────────────┐
│  TOP BAR (fialová #6200EA)                    │
├─────────────────────────────────────────────┤
│  TAB STRIP (barevné záložky)                  │
├─────────────────────────────────────────────┤ ← color separator
│ SIDEBAR │  CONTENT AREA        │ ITEM DETAIL  │
│ (menu)  │  (list/kanban/tab.)  │ DRAWER →     │
│         │                      │              │
└─────────────────────────────────────────────┘
```

---

## 2. Ikony a menu

### 2.1 Ikonová sada

Používá se **Font Awesome** ve třech variantách stylu:

- `solid` (výchozí, plné ikony) – hlavní ikonografie v celé aplikaci.
- `regular` (obrysové) – doplňkově, pro méně důrazné / neaktivní stavy.
- `fw` (fixed width) – všude tam, kde mají ikony zarovnaně stejnou šířku (typicky v menu a seznamech).

**Pravidlo:** Ikony v menu, akční lišty a tlačítek jsou vždy `solid` + `fw`, aby byly opticky zarovnané. Obrysovou (`regular`) variantu používej jen jako záměrné odlišení (např. „nevyplněno / neaktivní").

### 2.2 Levé menu (sidebar)

Menu je rozdělené do dvou logických skupin:

- **Pracovní / osobní věci uživatele** (např. *Moje domovská, Moje upozornění, Moje konverzace, Můj kalendář, Moje oblíbené, Moje hlídané, Ke schválení, Moje smlouvy, Moje směrnice*).
- **Firemní evidence** (např. *organizace, pozice, certifikáty, stroje, smlouvy, reporty, Online formuláře, Historie změn*).

Pravidla pro položky menu:

- Každá položka = **ikona (`fw`) + text**. Ikona je vždy vlevo, zarovnaná do sloupce.
- Aktivní položka je vizuálně zvýrazněná (akcentová barva / světlejší pozadí), ostatní jsou tlumené.
- U položek se může zobrazovat **badge** (počet) – např. počet čekajících ke schválení. Badge je vpravo od textu.
- Menu je **rolovatelné** nezávisle na obsahu (skroluje jen seznam navigace, ne celá stránka).

### 2.3 Sbalitelné menu

Sidebar má dva stavy, přepínané ikonou **collapse** (šipka/chevron):

- **Rozbalené** – ikona + text u každé položky, plná šířka.
- **Sbalené** – jen ikony, úzký pruh. Texty se skryjí, badge zůstávají jako malý indikátor.

Zarovnání collapse ikony a chování se drží konzistentně na všech obrazovkách.

### 2.4 Profil uživatele

Ve spodní části menu je sekce profilu, také ve dvou stavech:

- **Rozbalený profil** – avatar + jméno (např. „Jan Novák") + název pracovního prostoru / firmy („Jedna Firma", „Můj pracovní prostor").
- **Sbalený profil** – pouze avatar.

Stav profilu se řídí stavem sidebaru (sbaleno / rozbaleno).

### 2.5 Ikony v app baru

V pravé části horního pruhu je sada akčních ikon (`solid`), oddělených tenkým svislým dělítkem. Ikony jsou na fialovém podkladu bílé / světlé. Vlevo je avatar (kolečko) a název pracovního prostoru.

---

## 3. Chování aplikace

### 3.1 Záložky (tabs)

- Otevřené záznamy / moduly se zobrazují jako **barevné záložky** v tab stripu pod app barem.
- **Aktivní záložka** je zvýrazněná (oranžová `#E65100`), neaktivní jsou tlumené (`#ECEFF1`) s jemným barevným podkladem podle typu (např. `#FBE9E7`).
- Záložky mají zaoblené horní rohy (`radius 5px 5px 0 0`) a napojují se na obsah.
- Kliknutím na záložku se přepne obsah; každá záložka si drží svůj kontext.

### 3.2 Detail záznamu (drawer)

- Otevření záznamu ze seznamu **vysune panel detailu z pravé strany** (animace `ease forwards`).
- Panel má vlevo **tenký barevný akcent** (thin left accent) indikující typ/stav záznamu.
- Uvnitř: hlavička se jménem/názvem záznamu, tělo (drawer body) s informacemi, **záložky detailu (item tabs)** a **akční tlačítka** (např. *Vytisknout smlouvu*).
- Panel překrývá obsah, nezavírá zbytek aplikace – uživatel se vrací zpět zavřením draweru.

### 3.3 Přepínání pohledů (view switcher)

Evidenční obrazovky umí zobrazit stejná data v několika pohledech, přepínaných **výsuvným „pill" přepínačem** (outlined pill):

- **Dashboard** – přehledová obrazovka s hero bannerem, kartami a metrikami.
- **Kanban** – sloupce podle stavu, karty záznamů.
- **Tabulka** – řádky a sloupce.
- **Seznam / list** – jednoduchý výpis.

Přepnutí pohledu nemění data, jen jejich prezentaci.

### 3.4 Přidávání a akce

- **Přidat** (např. *Přidat zakázku*, *Přidat riziko*) je primární akce, zobrazená jako výrazné tlačítko (obvykle s ikonou `+`) v obsahové části.
- Akce nad konkrétním záznamem se soustředí do detailu (draweru) nebo do řádku/karty.

### 3.5 Dashboardy a metriky

Přehledové obrazovky mají ustálenou skladbu:

- **Hero banner** s názvem oblasti a krátkým popisem (např. *„Evidence kybernetických rizik"*, *„Přehled obchodních zakázek"*).
- **Metrické karty** (např. *Celkem zakázek*, *Hodnota portfolia*).
- **Dvousloupcový grid** (LEFT COL / RIGHT COL) s kartami typu *Přehled stavů*, *Riziková matice*, *Základní informace*.

### 3.6 Specifické moduly

- **Směrnice (policies)** – práce s dokumenty a jejich potvrzováním: stavy *k potvrzení*, *po termínu*, *bez termínu*, *hotovo (All done)*, sekce *čekající dokumenty (Pending docs)*, *Všechny dokumenty*, členění *na kategorie* a vyhledávání (*Vyhledejte dokument…*).
- **Rizika** – riziková matice, přehled stavů, základní informace o riziku.
- **Zakázky** – sledování stavu obchodním cyklem, hodnoty a portfolio.

---

## 4. UI komponenty

| Komponenta | Popis a pravidla |
|---|---|
| **Top bar** | Fialový pruh (výška ~56 px), vlevo avatar + název prostoru, vpravo akční ikony oddělené dělítky. |
| **Tab strip** | Barevné záložky otevřených záznamů; aktivní oranžová, zaoblené horní rohy. |
| **Sidebar menu** | Dvě skupiny položek (osobní / firemní), ikona+text, badge, sbalitelné, rolovatelné, profil dole. |
| **Content area** | Hlavní plocha; hostí list / kanban / tabulku / dashboard. Světlé pozadí (`#f5f6f7`). |
| **View switcher** | Výsuvný „pill" přepínač pohledů (outlined). |
| **Karty (cards)** | Bílé pozadí, jemný okraj (`1px solid`), zaoblení, lehký stín; nesou metriky, matice, přehledy. |
| **Item detail drawer** | Vysouvací panel zprava, tenký barevný akcent vlevo, tělo + záložky + akce. |
| **Badge** | Malý počítadlový indikátor (počet položek) u menu / záložek. |
| **Tlačítka** | Primární (akcentová výplň, bílý text) pro hlavní akci; sekundární (obrys / světlé) pro doplňkové. |
| **Ikony** | Font Awesome `solid` (výchozí), `regular` (odlišení), `fw` (zarovnání). |
| **Hero banner** | Úvodní blok dashboardu s názvem oblasti a popisem. |

**Obecná pravidla komponent:**

- Konzistence napříč moduly – stejná komponenta vypadá a chová se všude stejně (menu, drawer, view switcher, karty jsou sdílené).
- Preferuj zvýraznění stavu barvou akcentu a pozadí, ne tučností nebo velikostí.
- Interaktivní prvky mají viditelný hover stav (ztmavení akcentu, jemné pozadí).

---

## 5. Vizuální styl

### 5.1 Barvy

**Produktová primární (brand):**

- Fialová `#6200EA` – app bar, hlavní brandová plocha, akcenty menu.

**Interaktivní akcent (odkazy, aktivní prvky, tlačítka):**

- Modrá `#1572e8`, hover `#1060cc`.

**Navigace (sidebar):**

- Tmavá plocha menu `#2b2540` / `#2b2d30`, sekundární text `#9a93b5`, `#c2bdd6`.

**Záložky:**

- Aktivní oranžová `#E65100`, neaktivní `#ECEFF1`, jemné podklady `#FBE9E7` / `#FFF3E0`.

**Sémantické (stavové) barvy:**

- Úspěch / OK: `#00C853`, tmavší `#2E7D32`.
- Chyba / nebezpečí: `#D50000`, `#EF5350`, světlé pozadí `#FDEAEC` / `#FEE8E8`.
- Varování: `#FFAB00`, `#FF8F00`, pozadí `#FFF8E1` / `#FFF3E0`.
- Informace: `#0277BD`, `#1565C0`, pozadí `#E1F5FE` / `#E3F2FD`.

**Systémová paleta (pro kategorie / štítky / barevné odlišení záznamů):**

`#D50000` · `#C51162` · `#AA00FF` · `#6200EA` · `#304FFE` · `#2962FF` · `#0091EA` · `#00B8D4` · `#00BFA5` · `#00C853` · `#64DD17` · `#AEEA00` · `#FFD600` · `#FFAB00` · `#FF6D00` · `#DD2C00`

**Neutrální (šedé):**

- `#FFFFFF`, `#f9f9fb`, `#f5f6f7` (pozadí obsahu), `#F6F6F6`, `#ECECEC`, `#CCCCCC`, `#B1B2B3`, `#878787`, `#565656`, `#1a1a1a` (text).

**Pravidla použití barev:**

- Fialovou používej jen pro brand/top bar, ne pro běžné akce – akce jsou modré.
- Sémantické barvy používej výhradně pro stavy (úspěch/chyba/varování/info), ne dekorativně.
- Systémovou paletu používej pro barevné rozlišení kategorií, štítků a typů záznamů.

### 5.2 Typografie

- Rodina písma: systémové sans-serif (`-apple-system, BlinkMacSystemFont, sans-serif`).
- Hierarchie: nadpisy karet/bloků výrazněji, popisné texty menší a tlumenější šedou.
- Text v menu je jednořádkový, delší popisky se ořezávají.

### 5.3 Tvary, plochy a rozestupy

- **Zaoblení:** karty a tlačítka mají jemně zaoblené rohy; záložky jen horní rohy (`5px`).
- **Ohraničení:** karty `1px solid` v jemné šedé; oddělovače tenké linky.
- **Stíny:** lehké, nízké (`rgba` s malou průhledností) – používat střídmě pro vyzdvižení karet a draweru.
- **Pozadí:** obsah světle šedé `#f5f6f7`, karty bílé – vzniká tak jemný kontrast plochy vs. obsah.

---

## 6. Shrnutí klíčových pravidel

1. Rámec aplikace (top bar → tab strip → separator → sidebar + content) je **vždy stejný**.
2. **Fialová = brand, modrá = akce, sémantické barvy = stavy.**
3. Menu má dvě skupiny (osobní / firemní), je sbalitelné a rolovatelné, s badge a profilem dole.
4. Ikony jsou Font Awesome `solid` + `fw` pro zarovnání; `regular` jen pro odlišení.
5. Otevřené záznamy = barevné záložky; detail = drawer vysouvaný zprava s barevným akcentem.
6. Evidence nabízí přepínatelné pohledy (Dashboard / Kanban / Tabulka / Seznam) přes „pill" přepínač.
7. Komponenty (drawer, karty, view switcher, badge, tlačítka) jsou sdílené a chovají se všude konzistentně.

---

*Poznámka: Dokument je odvozen z vizuálních a strukturních vzorců v dodaných HTML prototypech. Konkrétní texty menu a hodnoty jsou převzaty z prototypů; při implementaci je vhodné je sladit s finálním obsahem a případně doplnit chybějící stavy.*
