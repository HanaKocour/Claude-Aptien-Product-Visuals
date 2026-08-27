# Šablona promptu — generování pohledu Aptien podle prototypu

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech beze změny.

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. Nejdřív si znovu načti aktuální prototyp (`Aptien-aplikace-offline.html`) — negeneruj z paměti.
2. Vypiš jako text (před generováním): všechny záložky topbaru v pořadí; položky levého sidebar menu; popis loga; co má být aktivní podle mého zadání (nebo „nic"); a přesné barvy (hex) vytažené z prototypu — pozadí topbaru, text topbaru, pozadí sidebaru, text sidebaru, aktivní i neaktivní stav. Tyto hex hodnoty pak použij 1:1.
3. Vygeneruj podle toho, co jsi vypsal.
4. Porovnej výstup s prototypem položku po položce (topbar, sidebar, logo, barvy, data) a najdi rozdíly.
5. Když je jakýkoli rozdíl, přegeneruj opravenou verzi a znovu porovnej. Opakuj, dokud nesedí 1:1.
6. Ukaž mi až finální ověřenou verzi (mezikroky zobrazovat nemusíš).

---

## ROZLIŠENÍ A HUSTOTA UI (závazné — jinak vyjde UI drobné a vzdálené)

- Postav/generuj obrazovku na plátně o rozměru **1536 × 864 px** — NE 1920 × 1080.
- Použij STEJNÉ absolutní velikosti jako v prototypu (výšky lišt 56px, velikosti písma, padding, ikony) — kvůli užšímu plátnu NIC nezmenšuj ani nepřepočítávej. Prototyp je navržený na 1920 px šířky; na plátně 1536 px bude logicky „naskládaný hustěji" a to je záměr.
- Teprve celý hotový snímek na závěr zvětši (scale) **1,25×** do finálního exportu **1920 × 1080 px**. Tím vyjde čitelné, „přiblížené" UI (běžný text ve výsledku ~19 px) — ne drobné vzdálené UI (~15 px), které vychází při generování přímo na 1920×1080 v nativní velikosti prototypu.
- Kontrola: po zvětšení musí být výsledný soubor přesně 1920 × 1080 px a nic nesmí být odříznuté ani přetékat (změř scrollHeight/scrollWidth, neodhaduj pohledem).

---

## PRAVIDLA

Vycházej z přiloženého prototypu (`Aptien-aplikace-offline.html`) jako závazného zdroje pravdy pro rozložení, strukturu a vzhled. Nevytvářej vlastní varianty, needituj layout ani styl. Rozliš **fixní** části (topbar, sidebar, layout, logo) a **editovatelnou** část (data v obsahu).

### Firemní barvy (hex) — z prototypu Aptien, použij přesně tyto, nevymýšlej vlastní

**Topbar (horní pruh s logem) + tab-strip (pruh se záložkami):**
- Pozadí: `#424242` (tmavě šedá) — pozn.: `#6200EA` je STARÁ barva, nepoužívej ji
- Logo text „aptien": `#FFFFFF`, tučné
- Výška horního pruhu: 56px

**Záložky topbaru** (styl „složkové taby", horní rohy zaoblené 6px):
- Neaktivní záložka: pozadí `#FFFFFF` (bílý tab), text = vlastní barva dané záložky (viz níže), řez 600
- Aktivní záložka: pozadí = vlastní barva dané záložky, text `#FFFFFF`, řez 800
- Barvy záložek: Zaměstnanci `#f1c40f` · Ochranné pomůcky `#D84315` · Rizika `#E91E63` · Zakázky `#1565C0` · Směrnice `#1572e8` · Certifikáty `#FF8F00` · Smlouvy `#37474F` · Audity a kontroly `#FF8F00`

**Levý sidebar:**
- Pozadí panelu: `#FFFFFF` (bílá), pravý okraj `1px solid #ededf2`, šířka 236px (sbalený 56px)
- Neaktivní položka: pozadí `transparent`, text `#4a4660`, ikona `#9a93b5`, řez 600
- Aktivní/vybraná položka: pozadí `#eef4fe` (světle modrá), text `#1572e8`, ikona `#1572e8`, řez 700, radius 9px
- Sekční nadpisy (MŮJ PRACOVNÍ PROSTOR / NAŠE FIRMA): 11px, bold, VERZÁLKY
- Badge upozornění: pozadí `#FF3D00`, text bílá; šedý badge: pozadí `#e6e3ef`, text `#8a84a0`

**Obsah / plocha:**
- Pozadí plochy za kartami: `#f5f6f7` (app canvas `#f9f9fb`)
- Karty: bílé, radius 10px
- Hlavní akční / odkazová barva (accent): `#1572e8`
- Text: `#1a1a1a` (základní), titulky stránky tmavě fialová `#2b2540`
- Písmo: Nunito

### Topbar (horní menu) — fixní, generuj 1:1

Menu obsahuje přesně těchto 8 záložek v tomto pořadí a s tímto přesným textem:

`Zaměstnanci` · `Ochranné pomůcky` · `Rizika` · `Zakázky` · `Směrnice` · `Certifikáty` · `Smlouvy` · `Audity a kontroly`

- Žádnou nevynechávej, nepřidávej, nepřejmenovávej ani nepřekládej (pokud to není výslovně v zadání).
- Zachovej rozestupy, zarovnání a typografii přesně podle prototypu.
- Barvy použij přesně podle bloku „Firemní barvy (hex)" výše — nevymýšlej vlastní odstíny.
- Neaktivní záložka = bílý tab s barevným textem (barva dle záložky), horní rohy zaoblené. Aktivní záložka = barevný tab (barva záložky) s bílým textem.
- Výchozí stav = žádná horní záložka není aktivní. Aktivuj záložku jen tehdy, když ji výslovně uvedu v zadání (název musí přesně odpovídat jedné z 8 výše).
- Logo firmy vlož vlevo 1:1 podle prototypu (stejný obrázek, umístění, velikost, proporce) — nepřekresluj ani nenahrazuj.

### Levý sidebar (menu aplikací) — fixní, generuj 1:1

- Položky sidebaru reprodukuj přesně podle prototypu (pořadí, texty, ikony, badge).
- Barvy sidebaru ber přesně z prototypu (stejné hex hodnoty) — pozadí panelu, barva textu i ikon, vzhled aktivní/vybrané položky a hover. Nevymýšlej vlastní barvu pozadí ani zvýraznění.
- **Ikony jsou pevně definované v design systému — DODRŽ je 1:1.** Každá položka má svou konkrétní ikonu (viz seznam níže). Nenahrazuj je vlastními ani podobnými ikonami, nevynechávej je a neměň jejich styl.
- Výchozí stav = žádná položka není aktivní. Aktivuj/vyber položku jen tu, kterou uvedu v zadání.
- **Výchozí je sidebar OTEVŘENÝ (236px, texty + ikony).** Sbalený/zavřený (56px, jen ikony, bez textů) generuj jen tehdy, když to výslovně uvedu v zadání.

**Přesné položky a ikony sidebaru (Font Awesome) — použij tyto:**

Skupina *MŮJ PRACOVNÍ PROSTOR:*
Moje domovská stránka `house-chimney` · Moje upozornění `bell` (badge) · Můj kalendář `calendar-days` · Moje úkoly `clipboard-check` (badge) · Moje konverzace `comments` (badge) · Můj tým `people-group` · Moje oblíbené `star` (badge) · Moje žádanky `file-invoice` · Moje hlídače `dog` · Ke schválení `circle-check` (badge) · Reporty `file-chart-column` · O mně `user` · Poznámky `clipboard` (badge) · Moje směrnice `books` · Co jsem dělal `chart-network`

Skupina *NAŠE FIRMA:*
Nástěnka `grid-horizontal` · Směrnice a dokumenty `book-open` · Kolegové `users` · Katalog školení `book-open-reader` · Nastavení směrnic `books` · Nastavení organizace `sitemap` · Inventura `boxes-stacked`

### Obsah stránky — editovatelné

- Uvnitř zobrazeného pohledu uprav data podle zadání.
- Měň pouze hodnoty (texty, čísla, položky) — ne vzhled, rozložení ani strukturu polí/tabulek.
- Zachovej stejný formát, počet sloupců/řádků a styl jako prototyp.

### Když název v zadání není v topbaru ani sidebaru — NEHÁDEJ

Pokud uvedu název, který neodpovídá žádné položce (např. nová evidence), řiď se výslovně tím, co napíšu v zadání (kam ji zařadit a zda aktivovat). Nikdy si stav nedomýšlej.

---

## KONTROLA PŘED DOKONČENÍM (povinné)

- [ ] Topbar má přesně 8 záložek ve správném pořadí a textech; aktivní je jen to, co jsem zadala (jinak nic).
- [ ] V sidebaru je aktivní jen ta položka, kterou jsem zadala (jinak nic); ikony odpovídají definovanému seznamu.
- [ ] Sidebar je ve správném stavu (výchozí otevřený; sbalený jen když jsem to zadala).
- [ ] Barvy topbaru i sidebaru (pozadí, text, aktivní stav) sedí přesně s prototypem — stejné hex hodnoty, žádné vymyšlené odstíny.
- [ ] Logo firmy je 1:1 podle prototypu.
- [ ] Fixní části zůstaly beze změny, upravila se jen data v obsahu.
- [ ] Plátno bylo postaveno na 1536 × 864 px ve stejné absolutní velikosti jako prototyp a teprve poté zvětšeno 1,25× na finální 1920 × 1080 px — UI ve výsledném obrázku není drobné a nic nepřetéká.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Vyber jednu ze dvou šablon podle toho, na co chceš pohled — na **evidenci z topbaru**, nebo na **položku z levého menu (sidebaru)**. Doplň hranaté závorky.

---

### ŠABLONA A — pohled na EVIDENCI (záložka z topbaru)

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** [přesný název z 8 záložek]
**Aktivní v sidebaru:** žádná
**Sidebar (stav):** otevřený (výchozí) — napiš „sbalený" jen když ho chceš zavřený (56px, jen ikony)
**Typ obrazovky:** pohled na evidenci (data), NE nastavení / konfigurace
**Zobrazení (view):** [dashboard / seznam / kanban / tabulka] (jako příklad layoutu použij soubor `partials/evidence-<view>.html` — dashboard → `evidence-dashboard.html`, seznam → `evidence-list.html`, kanban → `evidence-kanban.html`, tabulka → `evidence-table.html`; kalendář zatím není). Topbar, sidebar a logo ber z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** [jméno + přidej profilovou fotku, nebo „—"]
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** [text, nebo „—"]
**Data k zobrazení:** [popiš, co má v pohledu být; sloupce/formát převezmi z prototypu; realistická data doplň podle praxe]

---

### ŠABLONA B — pohled na POLOŽKU V MENU (sidebar)

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** [přesný název položky sidebaru, např. „Moje směrnice"] (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** pohled na aplikaci/agendu (data), NE nastavení / konfigurace
**Layout / zdroj:** daný pohled, topbar a logo ber z `Aptien-aplikace-offline.html`.
Pro „Nastavení organizace" použij hotové bloky podle podzáložky:
Organizace → `partials/nastorg-organizace.html` · Pracovní pozice →
`partials/nastorg-pracovni-pozice.html` · Katalog požadavků →
`partials/nastorg-katalog-pozadavku.html` · Nastavení nadřízených →
`partials/nastorg-nastaveni-nadrizenych.html` · otevřená pozice →
`partials/nastorg-pozice-<sekce>.html` (modal, ne drawer; sekce =
`zakladni` / `organizacni` / `naplne` / `kvalifikace` / `pozadavky` /
`rizika` / `aktivity` / `dokumenty`, prázdný rám je
`partials/nastorg-pozice-modal.html`). Pro čerstvě založenou pozici bez
nastavení použij `nastorg-pozice-aktivity-prazdne.html` /
`nastorg-pozice-dokumenty-prazdne.html`.
**Přihlášený uživatel:** [jméno + přidej profilovou fotku, nebo „—"]
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** [text, nebo „—"]
**Data k zobrazení:** [popiš, co má v pohledu být; strukturu/formát převezmi z prototypu; realistická data doplň podle praxe]

---

### Příklad vyplnění — ŠABLONA A (evidence, tabulka)

**Účel:** Obrázek bude doprovázet text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** Audity a kontroly
**Aktivní v sidebaru:** žádná
**Sidebar (stav):** otevřený
**Typ obrazovky:** pohled na evidenci (data), NE nastavení / konfigurace
**Zobrazení (view):** tabulka (jako příklad layoutu použij soubor `partials/evidence-table.html`). Topbar, sidebar a logo ber z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Pavel Obezřetný — přidej i jeho profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Audity kvality. Roční plán auditů — kalendářní přehled plánovaných auditů pro jednotlivé procesy nebo oddělení i digitální dotazníky pro auditory přímo v mobilu nebo tabletu během auditu na pracovišti."
**Data k zobrazení:** doplň do tabulky evidence „Audity a kontroly" realistická data podle praxe (názvy auditů, proces/oddělení, typ auditu, termín/datum, stav, auditor apod. — sloupce a formát převezmi z prototypu). Řádky odpovídají reálným firemním auditům kvality, BOZP, ISO.

---

### Příklad vyplnění — ŠABLONA B (položka v sidebaru)

**Účel:** Obrázek bude doprovázet text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Moje směrnice (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** pohled na aplikaci/agendu (data), NE nastavení / konfigurace
**Layout / zdroj:** daný pohled, topbar a logo ber z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Karolína Fišerová — přidej i její profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Podklady pro audit na jedno kliknutí. Nahrajete směrnici, systém sám rozešle lidem notifikaci, oni potvrdí přečtení v aplikaci a Aptien automaticky vygeneruje auditní stopu pro ISO auditora."
**Data k zobrazení:** soupis dokumentů k seznámení pro Karolínu Fišerovou ve dvou skupinách:
- Splněné (potvrzené přečtení): [názvy směrnic + datum potvrzení]
- Čekající (nepotvrzené): [názvy směrnic + termín]

Názvy směrnic a dokumentů vymysli sám podle běžné praxe (realistické názvy odpovídající reálným firemním směrnicím, BOZP, ISO apod.), včetně odpovídajících dat a termínů.
