# Aptien – Mobilní intranet (pravidla a viditelnost pro zaměstnance)

*Referenční spec odvozená z master prototypu
`prototypes/Aptien-mobil-intranet.html`. Popisuje mobilní zobrazení
(intranet) a **podmínky, co je přes intranet viditelné pro zaměstnance**.*

> Mobilní intranet je **zaměstnanecké zobrazení** – samoobslužný rozhraní
> pro běžného zaměstnance na telefonu. Není to plná desktopová evidence
> (viz `Aptien-pravidla-pouziti-UI.md`); je to její **užší, publikovaná
> část** určená lidem ve firmě. Odvozeno z verze prototypu z 15. 07. 2026.

---

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

Mobilní intranet má tři hlavní obrazovky (`state.screen`):

| Obrazovka | Obsah |
|---|---|
| `home` | Rozcestník dlaždic zaměstnance + odkazy na externí stránky/aplikace (viz níže). |
| `conversations` | Seznam konverzací (náhledy, poslední zpráva, avatar). |
| `chat` | Detail konverzace – zprávy, avatary (KH / HK / AS), **AI souhrn**. |

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
O mě · Moje směrnice.

**Firemní (publikované):**
Nástěnka · Směrnice a dokumenty · Kolegové · Katalog školení.

**Externí odkazy:**
odkazy na externí stránky / aplikace (např. *Facebook*) – jen prokliky
ven, ne přihlášení.

### 2.3 Konverzace a chat

Seznam konverzací → detail. Zprávy jsou rozlišené (vlastní / kolega),
s avatary a časem, nad vláknem **AI souhrn** konverzace. Prázdný stav
*„Zatím žádné zprávy."*

---

## 3. Podmínky viditelnosti pro zaměstnance (intranet)

Toto je závazné vymezení, **co zaměstnanec přes mobilní intranet vidí**
a co ne. Intranet je publikační a samoobslužná vrstva, ne administrace.

### 3.1 Zaměstnanec VIDÍ

1. **Své vlastní věci (self-service):** svá upozornění, úkoly, žádanky,
   konverzace, položky ke schválení, svůj profil („O mě").
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
