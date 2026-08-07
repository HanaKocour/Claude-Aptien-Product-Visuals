POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. Nejdřív si znovu načti aktuální prototyp — negeneruj z paměti.
2. Vypiš jako text (před generováním): všechny záložky topbaru v pořadí; položky levého sidebar menu; popis loga; co má být aktivní podle mého zadání (nebo „nic"); a přesné barvy (hex) vytažené z prototypu — pozadí topbaru, text topbaru, pozadí sidebaru, text sidebaru, aktivní i neaktivní stav. Tyto hex hodnoty pak použij 1:1.
3. Vygeneruj podle toho, co jsi vypsal.
4. Porovnej výstup s prototypem položku po položce (topbar, sidebar, logo, barvy, data) a najdi rozdíly.
5. Když je jakýkoli rozdíl, přegeneruj opravenou verzi a znovu porovnej. Opakuj, dokud nesedí 1:1.
6. Ukaž mi až finální ověřenou verzi (mezikroky zobrazovat nemusíš).

 
ROZLIŠENÍ A HUSTOTA UI (závazné — jinak vyjde UI drobné a vzdálené)
* Postav/generuj obrazovku na plátně o rozměru 1536 × 864 px — NE 1920 × 1080.
* Použij STEJNÉ absolutní velikosti jako v prototypu (výšky lišt 56px, velikosti písma, padding, ikony) — kvůli užšímu plátnu NIC nezmenšuj ani nepřepočítávej. Prototyp je navržený na 1920 px šířky; na plátně 1536 px tedy bude logicky "naskládaný hustěji" a to je záměr.
* Teprve celý hotový snímek na závěr zvětši (scale) 1,25× do finálního exportu 1920 × 1080 px. Tím vyjde čitelné, "přiblížené" UI (běžný text ve výsledném obrázku ~19 px) — ne drobné vzdálené UI (~15 px), které vychází, když se generuje přímo na plátně 1920×1080 v nativní velikosti prototypu.
* Kontrola: po zvětšení musí být výsledný soubor přesně 1920 × 1080 px a nic nesmí být odříznuté ani přetékat (změř scrollHeight/scrollWidth, neodhaduj pohledem).

 
PRAVIDLA
Vycházej z přiloženého prototypu jako závazného zdroje pravdy pro rozložení, strukturu a vzhled. Nevytvářej vlastní varianty, needituj layout ani styl. Rozliš fixní části (topbar, sidebar, layout, logo) a editovatelnou část (data v obsahu).
Firemní barvy (hex) — z prototypu Aptien, použij přesně tyto, nevymýšlej vlastní

Topbar (horní pruh s logem) + tab-strip (pruh se záložkami):

* Pozadí: #424242 (tmavě šedá)
* Logo text „aptien": #FFFFFF, tučné
* Výška horního pruhu: 56px

Záložky topbaru (styl „složkové taby", horní rohy zaoblené 6px):

* Neaktivní záložka: pozadí #FFFFFF (bílý tab), text = vlastní barva dané záložky (viz níže), řez 600
* Aktivní záložka: pozadí = vlastní barva dané záložky, text #FFFFFF, řez 800
* Barvy jednotlivých záložek: Zaměstnanci #f1c40f · Ochranné pomůcky #D84315 · Rizika #E91E63 · Zakázky #1565C0 · Směrnice #1572e8 · Certifikáty #FF8F00 · Smlouvy #37474F · Audity a kontroly #FF8F00

Levý sidebar:

* Pozadí panelu: #FFFFFF (bílá), pravý okraj 1px solid #ededf2, šířka 236px (sbalený 56px)
* Neaktivní položka: pozadí transparent, text #4a4660, ikona #9a93b5, řez 600
* Aktivní/vybraná položka: pozadí #eef4fe (světle modrá), text #1572e8, ikona #1572e8, řez 700, radius 9px
* Sekční nadpisy (MŮJ PRACOVNÍ PROSTOR / NAŠE FIRMA): 11px, bold, VERZÁLKY
* Badge upozornění: pozadí #FF3D00, text bílá; šedý badge: pozadí #e6e3ef, text #8a84a0

Obsah / plocha:

* Pozadí plochy za kartami: #f5f6f7 (app canvas #f9f9fb)
* Karty: bílé, radius 10px
* Hlavní akční / odkazová barva (accent): #1572e8
* Text: #1a1a1a (základní), titulky stránky tmavě fialová #2b2540
* Písmo: Nunito

Topbar (horní menu) — fixní, generuj 1:1
Menu obsahuje přesně těchto 8 záložek v tomto pořadí a s tímto přesným textem:
Zaměstnanci · Ochranné pomůcky · Rizika · Zakázky · Směrnice · Certifikáty · Smlouvy · Audity a kontroly

* Žádnou nevynechávej, nepřidávej, nepřejmenovávej ani nepřekládej (pokud to není výslovně v zadání).
* Zachovej rozestupy, zarovnání a typografii přesně podle prototypu.
* Barvy použij přesně podle bloku „Firemní barvy (hex)" výše — nevymýšlej vlastní odstíny.
* Neaktivní záložka = bílý tab s barevným textem (barva dle záložky), horní rohy zaoblené. Aktivní záložka = barevný tab (barva záložky) s bílým textem.
* Výchozí stav = žádná horní záložka není aktivní. Aktivuj záložku jen tehdy, když ji výslovně uvedu v zadání (název musí přesně odpovídat jedné z 8 výše).
* Logo firmy vlož vlevo 1:1 podle prototypu (stejný obrázek, umístění, velikost, proporce) — nepřekresluj ani nenahrazuj.

Levý sidebar (menu aplikací) — fixní, generuj 1:1

* Položky sidebaru reprodukuj přesně podle prototypu (pořadí, texty, ikony).
* Barvy sidebaru ber přesně z prototypu (stejné hex hodnoty) — pozadí panelu, barva textu i ikon, vzhled aktivní/vybrané položky a hover. Nevymýšlej vlastní barvu pozadí ani zvýraznění.
* Výchozí stav = žádná položka není aktivní. Aktivuj/vyber položku jen tu, kterou uvedu v zadání.

Obsah stránky — editovatelné

* Uvnitř zobrazeného pohledu uprav data podle zadání.
* Měň pouze hodnoty (texty, čísla, položky) — ne vzhled, rozložení ani strukturu polí/tabulek.
* Zachovej stejný formát, počet sloupců/řádků a styl jako prototyp.

Když název v zadání není v topbaru ani sidebaru — NEHÁDEJ
Pokud uvedu název, který neodpovídá žádné položce (např. nová evidence), řiď se výslovně tím, co napíšu v zadání (kam ji zařadit a zda aktivovat). Nikdy si stav nedomýšlej.
 
KONTROLA PŘED DOKONČENÍM (povinné)

* [ ] Topbar má přesně 8 záložek ve správném pořadí a textech; aktivní je jen to, co jsem zadala (jinak nic).
* [ ] V sidebaru je aktivní jen ta položka, kterou jsem zadala (jinak nic).
* [ ] Barvy topbaru i sidebaru (pozadí, text, aktivní stav) sedí přesně s prototypem — stejné hex hodnoty, žádné vymyšlené odstíny.
* [ ] Logo firmy je 1:1 podle prototypu.
* [ ] Fixní části zůstaly beze změny, upravila se jen data v obsahu.
* [ ] Plátno bylo postaveno na 1536 × 864 px ve stejné absolutní velikosti jako prototyp a teprve poté zvětšeno 1,25× na finální 1920 × 1080 px — UI ve výsledném obrázku není drobné.

MOJE KONKRÉTNÍ ZADÁNÍ (Šablona A)
Účel: Obrázek bude doprovázet text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
Aktivní v topbaru: Přístroje a nářadí
Pozn.: „Přístroje a nářadí" není v základních 8 záložkách ani v prototypu — přidej ji jako novou záložku do topbaru a nastav jako aktivní. Barvu evidence nastav na #0288D1: neaktivní stav = bílý tab s textem #0288D1, aktivní stav = pozadí #0288D1 s bílým textem. Ostatní záložky neaktivní, styl převezmi z prototypu.
Aktivní v sidebaru: žádná
Sidebar (stav): sbalený (56px, jen ikony, bez textů)
Typ obrazovky: pohled na evidenci (data), NE nastavení / konfigurace
Zobrazení (view): seznam (jako příklad layoutu použij soubor partials/evidence-list.html) + otevřená karta (detail) konkrétního nářadí dle partials/evidence-drawer.html. Topbar, sidebar a logo ber z Aptien-aplikace-offline.html.
Otevřený detail (karta nářadí): nad seznamem otevři kartu konkrétního nářadí se všemi informacemi k pořízení a stavu — sekce/záložky dle prototypu (Detaily, Přílohy/dokumentace, Údržba/aktivity). Ať je vidět, že ke kartě lze přiložit dokumentaci a evidovat aktivity údržby.
Přihlášený uživatel: Jiří Rychlý (správce majetku) — Včetně profilové fotografie
Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku): „Karta nářadí. Na kartě nářadí máte k dispozici všechny potřebné informace k pořízení nebo stavu. Můžete sem přiložit také dokumentaci nebo aktivity údržby."
Data k zobrazení: vymysli realistické nářadí/přístroj (např. „Aku vrtačka Makita DHP484", „Úhlová bruska Bosch GWS", „Nivelační přístroj Leica", „Svářečka Kühtreiber") a k němu kartu s logickými atributy podle praxe správy majetku — inventární/výrobní číslo, výrobce a model, datum pořízení, pořizovací cena, stav, umístění/středisko, odpovědná osoba (Jiří Rychlý), přiložená dokumentace (návod, záruční list) a plán/historie údržby. V seznamu na pozadí zobraz několik dalších položek nářadí. Sloupce, kartu, pole a přílohy převezmi z prototypu.
