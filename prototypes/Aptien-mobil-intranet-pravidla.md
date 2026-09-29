# Aptien – Mobilní intranet (pravidla a viditelnost pro zaměstnance)

*Referenční spec odvozená z master prototypu
`prototypes/Aptien-mobil-intranet.html`. Popisuje mobilní zobrazení
(intranet) a **podmínky, co je přes intranet viditelné pro zaměstnance**.*

> Mobilní intranet je **zaměstnanecké zobrazení** – samoobslužný rozhraní
> pro běžného zaměstnance na telefonu. Není to plná desktopová evidence
> (viz `Aptien-pravidla-pouziti-UI.md`); je to její **užší, publikovaná
> část** určená lidem ve firmě. Odvozeno z verze prototypu z 15. 07. 2026.

---

## 0. Partialy pro skládání vizuálů (zavedeno 1. 9. 2026)

Pro kombinované vizuály (combo scéna, kaskáda s anotací, „mobil v ruce" —
viz `Aptien-pravidla-kombinovanych-vizualu.md` §4.1) existují v
`prototypes/partials/` statické výřezy, jeden na obrazovku / stav:

| Partial | Obrazovka (`state.screen`) | Stav |
|---|---|---|
| `mobil-home.html` | `home` | — |
| `mobil-konverzace.html` | `conversations` | — |
| `mobil-chat.html` | `chat` | konverzace 0 |
| `mobil-o-mne.html` | `omne` | všechny 4 karty rozbalené |
| `mobil-smernice.html` | `smernice` | výchozí („Potvrzeno" sbalené) |
| `mobil-smernice-rozbaleno.html` | `smernice` | „Potvrzeno" rozbalené |
| `mobil-smernice-detail.html` | `smernice-detail` | seznam „K potvrzení" |
| `mobil-skoleni.html` | `skoleni` | výchozí („Dokončeno" sbalené) |
| `mobil-skoleni-rozbaleno.html` | `skoleni` | „Dokončeno" rozbalené |
| `mobil-dokumenty.html` | `dokumenty` | kategorie |
| `mobil-dokumenty-detail.html` | `dokumenty-detail` | kategorie *Návody a přístrojová dokumentace* |

První čtyři vznikly 1. 9. 2026, zbylých sedm 29. 9. 2026 (vyrenderováno
z master prototypu, pixelově ověřeno proti masteru). **EN protějšky se stejnými
názvy jsou v `prototypes-en/partials/`** (vyrenderované z
`prototypes-en/Aptien-mobil-intranet.html`). Jsou to zmrazené 1:1
snímky bez `<script>`/state, stejná konvence jako desktopové partialy
(`konverzace-list.html` / `konverzace-chat.html`). **Pro Claude Design /
design system vždy skládej z partialů, ne z master souboru** — master je
šablona se stavem (`<sc-if>`, `{{ … }}`), kterou generátor neumí
vyrenderovat. **Než se obrazovka mobilu bude znovu ručně
kopírovat ze `Aptien-mobil-intranet.html` do nové šablony, zkontroluj
nejdřív, jestli partial už neexistuje** — dřív se to dělalo ručně (viz
`sablony-vizualu/mobil-v-ruce.html`, komentář „verbatim z
Aptien-mobil-intranet.html").

⚠️ Partialy jsou snímek k datu vzniku. Když se master prototyp
(`Aptien-mobil-intranet.html`) změní (nová obrazovka, změna dat), partialy
se **neaktualizují automaticky** — je potřeba je ručně přegenerovat.

## 1. Rámec a formát

- **Zařízení:** telefon, rám **390 × 844 px**, zaoblení **52 px**
  (mockup s obrazovkou na střed, tmavé pozadí `#111`).
- **Sdílený design:** stejné tokeny, fonty (Nunito / Open Sans) a
  ikony (Font Awesome 6) jako desktop – mobil je jen jiný layout téhož
  produktu, ne jiná značka.
- **Assety sdílené s desktopem** (`prototypes/assets/`), mobilní HTML je
  proto malé (~149 KB).

---

## 2. Obrazovky

Mobilní intranet má tyto obrazovky (`state.screen`) — tabulka níže popisuje
původní čtyři; `smernice`, `smernice-detail`, `skoleni`, `dokumenty` a
`dokumenty-detail` viz partialy v §0:

| Obrazovka | Obsah |
|---|---|
| `home` | Rozcestník dlaždic zaměstnance + odkazy na externí stránky/aplikace (viz níže). |
| `conversations` | Seznam konverzací (náhledy, poslední zpráva, avatar). |
| `chat` | Detail konverzace – zprávy, avatary (KH / HK / AS), **AI souhrn**. |
| `omne` | „O mně" – osobní profil zaměstnance (viz 2.4). |

### 2.1 Odkazy na externí stránky a aplikace

Součástí rozcestníku jsou i **dlaždice s odkazy ven** – na externí
stránky nebo aplikace (např. *Facebook*). **Nejde o přihlašování ani
propojení účtů**, jen o rychlé prokliky mimo intranet. V patě je
identifikace prostoru (např. *„© 2022 Elizabeth Bathory s.r.o."*).

### 2.2 Home – rozcestník zaměstnance

Domovská obrazovka je mřížka dlaždic. To, co je zde, definuje **rozsah
viditelný zaměstnanci**:

**Osobní / samoobsluha:**
Moje upozornění · Úkoly · Moje žádanky · Konverzace · Schvalování ·
O mně · Moje směrnice · Moje školení.

**Firemní (publikované):**
Nástěnka · Směrnice a dokumenty · Kolegové · Katalog školení.

**Externí odkazy:**
odkazy na externí stránky / aplikace (např. *Facebook*) – jen prokliky
ven, ne přihlášení.

#### Dlaždice a ikony (závazné pořadí, zavedeno 29. 9. 2026)

Mřížka 3 sloupce, pořadí zleva doprava, shora dolů. Ikona `#555` v bílém
kruhu. Sloupec *Zdroj* říká, jak je ikona v prototypu vykreslená:
**FA Free** = třída `fa-solid fa-…` (funguje z Free CDN), **inline SVG** =
ikona je **FA Pro** a ve Free CDN neexistuje → v partialu/masteru je
vložená jako `<svg>` (soubor v `Awesome-font-icons/`). **Při generování
ji nikdy nenahrazuj FA třídou** — vykreslí se prázdný čtvereček (stejný
problém jako u desktopového menu, viz `Aptien-menu-reference.md`).

| # | Dlaždice (CS) | EN | Ikona | Zdroj | Pozn. |
|---|---|---|---|---|---|
| 1 | Moje upozornění | My notifications | `bell` | FA Free | badge **48** (červený) |
| 2 | Úkoly | Tasks | `clipboard-check` | FA Free | |
| 3 | Moje žádanky | My requests | `file-invoice` | FA Free | |
| 4 | Konverzace | Conversations | `comments` | FA Free | |
| 5 | Schvalování | For approval | `circle-check` | FA Free | |
| 6 | O mně | My Profile | `user` | FA Free | |
| 7 | Moje směrnice | My Policies | `books.svg` | inline SVG (Pro) | |
| 8 | Moje školení | My Training | `graduation-cap` | FA Free | |
| 9 | Směrnice a dokumenty | Policies & Resources | `book-open` | FA Free | |
| 10 | Nástěnka | Announcements | `grid-horizontal.svg` | inline SVG (Pro) | |
| 11 | Kolegové | Colleagues | `users.svg` | inline SVG | |
| 12 | Katalog školení | Training courses | `book-open-reader.svg` | inline SVG (Pro) | |
| 13 | Facebook | Facebook | písmeno „F" na zeleném kruhu | text | externí odkaz |
| 14 | Google | Google | písmeno „G" (červené) | text | externí odkaz |
| 15 | *(bez popisku)* | *(bez popisku)* | `camera` (fialový čtverec) | FA Free | externí aplikace |

Ikony uvnitř obrazovek (karty kategorií, stavové ikony, tlačítka) jsou
všechny FA Free — ověřeno proti balíčku `@fortawesome/fontawesome-free`
6.5.0 pro všech 11 mobilních partialů.

### 2.3 Konverzace a chat

Seznam konverzací → detail. Zprávy jsou rozlišené (vlastní / kolega),
s avatary a časem, nad vláknem **AI souhrn** konverzace. Prázdný stav
*„Zatím žádné zprávy."*

### 2.4 O mně (zavedeno 1. 9. 2026)

Otevírá se z dlaždice *„O mně"* na `home`. Odvozeno 1:1 z reálného
screenshotu produkční aplikace (mobilní web, sekce *„O mně"*), ne
vymyšleno. Čtyři sbalitelné karty (klik na hlavičku přepíná
otevřeno/zavřeno – vlastní stav pro každou, `omneProfileOpen` /
`omneDocsOpen` / `omneIssuedOpen` / `omneLinksOpen`); výchozí stav po
otevření obrazovky odpovídá produkci: *Dokumenty v osobní složce*
otevřené, ostatní tři zavřené.

| Karta | Obsah |
|---|---|
| **Moje osobní složka** | Avatar, jméno, tlačítko *„Upravit údaje"*, pole Telefonní číslo / E-mail. |
| **Dokumenty v osobní složce** | 4 základní složky (viz níže) – ikona, název, badge s počtem, „⋮" menu. Beze změny obsahu (žádný výpis souborů). |
| **Vydané a přiřazené položky** | Skupiny podle typu položky (viz níže), v každé seznam s ikonou stavu – zeleně *„(potvrzeno DD/MM/RR)"* nebo oranžově *„Čeká na vaše potvrzení"*. |
| **Moje souvislosti** | Skupiny odkazů na související záznamy (*Obchodní případy*, *Počítače*, *Firmy*, *Primární aktiva* ×2) – label → hodnota. |

Pod kartami tlačítko **„+ Přidat zápis"** a pod ním seznam zápisů
(schůzky – název, poznámka, začátek/konec, autor s avatarem, časové
razítko).

**Dokumenty v osobní složce – jen základní 4 složky** (zúženo ze 7
v reálném screenshotu, který obsahoval osobní zkušební data uživatele):
Pracovní smlouvy, Osobní certifikáty, Doklady o školení, Další
dokumentace. Žádná složka nezobrazuje konkrétní soubory.

**Vydané a přiřazené položky – jen reálná ukázková data, ne zkušební.**
Reálný screenshot obsahoval uživatelova testovací data (skupiny
„Obalovací linka 1/2" s položkami typu „jgkkjh") – ty byly nahrazeny
reálnými kategoriemi s důrazem na **PPE a telefony/počítače**:
- *Ochranné pomůcky* (přilba, reflexní vesta, bezpečnostní obuv,
  ochranné brýle) – ikony/barvy převzaté z `OP_ICON_MAP`
  v `Aptien-aplikace-offline.html`, aby seděly se zbytkem produktu.
- *Telefony* (iPhone 13)
- *Počítače* (notebook Dell Latitude, monitor Dell)

„Moje souvislosti" a seznam zápisů zůstávají věrné reálnému
screenshotu beze změny dat (nebyly označené jako zkušební).

---

## 3. Podmínky viditelnosti pro zaměstnance (intranet)

Toto je závazné vymezení, **co zaměstnanec přes mobilní intranet vidí**
a co ne. Intranet je publikační a samoobslužná vrstva, ne administrace.

### 3.1 Zaměstnanec VIDÍ

1. **Své vlastní věci (self-service):** svá upozornění, úkoly, žádanky,
   konverzace, položky ke schválení, svůj profil („O mně").
2. **Své směrnice k potvrzení:** dokumenty, které má osobně přečíst a
   potvrdit (stav *k potvrzení / po termínu / splněno*).
3. **Publikovaný firemní obsah:** oficiální *Směrnice a dokumenty*,
   *Nástěnka* (oznámení), *Katalog školení*, adresář *Kolegové*.
4. **Sdílené záznamy, ke kterým má oprávnění** (např. konkrétní
   zákazník / dokument sdílený v konverzaci).

### 3.2 Zaměstnanec NEVIDÍ (jen desktop / role s oprávněním)

1. **Plnou firemní evidenci a administraci:** kompletní moduly jako
   Rizika, Zakázky, Stroje a zařízení, Certifikáty, Faktury apod.
   v editačním/přehledovém režimu.
2. **Nastavení a správu:** *Nastavení organizace*, *Nastavení směrnic*,
   správu oprávnění, konfiguraci modulů.
3. **Data mimo svá oprávnění:** záznamy, které mu nejsou přiděleny ani
   sdíleny; agregované reporty a citlivé přehledy.

### 3.3 Pravidla

- **Intranet = podmnožina desktopu.** Na mobilu se nikdy nezobrazuje
  víc, než co je publikované nebo přidělené danému zaměstnanci.
- **Viditelnost řídí role a oprávnění, ne zařízení.** Mobil jen jinak
  zobrazuje to, na co má uživatel právo; nepřidává ani neodebírá
  oprávnění.
- **Publikované vs. přidělené:** *Nástěnka*, *Směrnice a dokumenty*,
  *Katalog školení* a *Kolegové* jsou dostupné všem zaměstnancům;
  *úkoly, žádanky, schvalování, konverzace* jsou vázané na konkrétní
  osobu.
- **Samoobsluha, ne editace evidence:** zaměstnanec přes intranet
  potvrzuje, žádá, komunikuje a čte – needituje firemní evidenci.

---

## 4. Vztah k desktopové verzi

| | Desktop (`Aptien-aplikace-offline.html`) | Mobil / intranet (`Aptien-mobil-intranet.html`) |
|---|---|---|
| Uživatel | správce evidence / power user | běžný zaměstnanec |
| Navigace | tab strip + sidebar (moduly) | obrazovky home / konverzace / chat |
| Rozsah | plná evidence + administrace | self-service + publikovaný obsah |
| Externí odkazy | – | dlaždice na externí stránky / aplikace |
| Design | sdílené tokeny, fonty, ikony | **stejné** (jen jiný layout) |

---

*Poznámka: Dokument je odvozen z master prototypu
`Aptien-mobil-intranet.html`. Konkrétní texty a jména jsou ukázková data;
závaznou předlohou struktury je HTML prototyp. Rozsah viditelnosti výše
odpovídá tomu, co intranet v prototypu zpřístupňuje – při implementaci ho
slaď s reálným modelem rolí a oprávnění.*
