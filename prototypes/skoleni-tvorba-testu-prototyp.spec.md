# Tvorba testu ke školení — spec prototypu

Soubor: `skoleni-tvorba-testu-prototyp.html` (vanilla JS, jeden soubor, v1 k připomínkování, 6. 10. 2026)
Vzor: `editace-evidence` (§13 pravidel UI), záložka **Online formuláře**.

## Proč
Aptien má koupený SurveyJS (Creator + PDF + Dashboard, v2.3.2). Obecný editor formulářů je na testy moc složitý: 20 typů prvků, správná odpověď schovaná v panelu vlastností (`showSidebar:false`), body jen přes vzorce (`calculatedValues`), HTML prvek odebraný z nabídky, JSON editor vypnutý. Prototyp ukazuje vrstvu Aptienu **nad** SurveyJS, která tvorbu testu zjednoduší.

## Tok obrazovek
1. **Editace evidence → Online formuláře.** Mezi kruhovými tlačítky přibylo **„Vytvořit test ke školení“** (štítek NOVÉ). Karta testu má chip `TEST`, souhrn „N otázek · X bodů · hranice Y %“ a stav KONCEPT / ZVEŘEJNĚNO.
2. **„Jak chcete test vytvořit?“**: 4 karty: Začít od nuly · Vložit otázky z textu · Použít šablonu (knihovna) · Navrhnout z dokumentu (Aptík, štítek AI).
3. **Editor testu**: celoobrazovkový modal jako dnešní Creator. Hlavička: ZPĚT, chip TEST, název upravitelný přímo, kroky **1 Obsah a otázky · 2 Nastavení · 3 Vyzkoušet**, stav, ULOŽIT, ZVEŘEJNIT. ZVEŘEJNIT je neaktivní, dokud Kontrola testu hlásí chybu.

### 1 · Obsah a otázky (3 sloupce)
- **Vlevo**: „Rychle přidat“ (Vložit z textu, Aptík navrhne) a **jen 5 prvků**: Jedna odpověď, Více odpovědí, Ano/Ne, Text/obsah, Obrázek.
- **Uprostřed**:
  - Karta **Školicí materiál**, přepínač *Připojit směrnici* / *Napsat text* / *Bez materiálu*.
    - U směrnice: výběr z evidence Směrnice a přepínač „musí potvrdit přečtení“.
    - U textu: běžný editor s formátováním (bez HTML), obsah se při uložení čistí.
  - Pod ní karty otázek.
- **Otázka**:
  - číslo a typ, znění (textarea s automatickou výškou), odpovědi jako řádky,
  - **správná odpověď = klik na kolečko/čtvereček vlevo** (zezelená). U Jedné odpovědi se jinou správnou zruší, u Více odpovědí jich může být víc,
  - „+ Přidat odpověď“, **Body** (stepper 1–10),
  - nástroje (nahoru, dolů, duplikovat, smazat) se zvýrazní na hover,
  - chybná otázka má červený okraj a hlášku v patičce.
- **Vpravo – Kontrola testu**:
  - počet otázek a bodů, hranice v bodech a %, čas a pokusy,
  - seznam chyb a upozornění; klik na položku posune na otázku.
  - Chyby: chybí znění, méně než 2 odpovědi, chybí správná, víc správných u Jedné odpovědi.
  - Upozornění: bez materiálu, prázdný materiál, méně než 3 otázky.

### Dialog „Vložit otázky z textu“
Vlevo textarea, vpravo živý náhled. Pravidla:
- otázka na prvním řádku, odpovědi pod ní, `*` = správná,
- prázdný řádek odděluje otázky, `(2 b)` za otázkou = body,
- odpovědi Ano + Ne → otázka Ano/Ne, víc `*` → Více odpovědí,
- chybějící správná odpověď = varování v náhledu (opraví se v editoru).

Tlačítko „PŘIDAT N OTÁZEK“.

### Dialog „Aptík navrhne otázky“ (AI)
1. Zdroj: směrnice z evidence nebo nahraný soubor. Počet otázek (posuvník 3–15). Cena v kreditech a zbývající kredity.
2. Načítání: „Aptík čte…“.
3. Návrhy se zaškrtávátky a odkazem na zdroj (kapitola, strana). Přidají se jen vybrané. Barva AI = `#6200EA` / `#AA00FF`.

### 2 · Nastavení (karty, žádné vzorce)
- Základní údaje: název a popis.
- **Vyhodnocení**: posuvník hranice 50–100 % s přepočtem „= alespoň X z Y bodů“.
- **Průběh**: časový limit (min; běží až od první otázky), míchat otázky, míchat odpovědi.
- **Opakované pokusy**: počet, odstup, co po vyčerpání (upozornit nadřízeného nebo personalistu).
- **Po dokončení zobrazit**: jen výsledek / správné odpovědi až po složení (doporučeno) / vždy.
- **Certifikát a platnost**: přepínač, šablona z PDF formulářů, platnost (12/24/36 měs.), připomenutí. Živý náhled certifikátu.
- **Pro vývojáře** (sbalené): živě generovaný JSON:
  - `formJson` pro SurveyJS: stránky úvod, materiál a test, `correctAnswer`, vlastní `points`, `calculatedValues` body / body_max / uspech, `completedHtmlOnCondition`,
  - `aptienTest`: pokusy, certifikát a materiál, které jsou mimo SurveyJS.

### 3 · Vyzkoušet
Průchod očima zaměstnance v SurveyJS vzhledu (zelená `#19b394`):
1. úvodní stránka se souhrnem pravidel,
2. materiál s povinným potvrzením,
3. test s odpočtem (pod 1 min červeně, po vypršení se test sám odešle),
4. výsledek: body, prošel/neprošel, číslo pokusu z N,
   - po složení **Stáhnout certifikát** (náhled; PDF se uloží do příloh),
   - po neúspěchu „Zkusit znovu“, nebo po vyčerpání pokusů hláška o upozornění nadřízeného,
   - správné odpovědi podle nastavení.

## Barvy a tokeny
- Akce `#1572e8`. Aktivní položka v levém menu modalu `#4b64f5` (§13).
- Správná odpověď / úspěch `#00C853` (tmavší `#00a344`). Chyba `#EF5350` / pozadí `#FEE8E8`. Upozornění `#FFA200`.
- Pozadí plochy `#f7f8fc`, karty bílé s radiusem 12–14. Písmo Nunito, ikony Font Awesome 6 Free.

## Co prototyp záměrně neřeší
- Přiřazení testu lidem a plány školení (navazuje „Školení a rozvoj“ v evidenci Zaměstnanci).
- Banku otázek s náhodným výběrem N z M.
- Ruční hodnocení textových odpovědí.
- Skutečné ukládání. Vše je jen ve stavu stránky.

---

## Prompt pro další iteraci (Claude Design / Claude)

> Vycházej z `skoleni-tvorba-testu-prototyp.html` a této spec. Zachovej tok (Online formuláře → volba způsobu → editor se 3 kroky), barvy a pravidla UI z `Aptien-pravidla-pouziti-UI.md` (§13 Editace evidence). Měň jen to, co uvedu níže, a na závěr porovnej výsledek s touto spec bod po bodu.
> **Zadání:** [např. „přidej do kroku Nastavení sekci Přiřazení: pracovní pozice, nový nástupce automaticky, termín splnění“]
