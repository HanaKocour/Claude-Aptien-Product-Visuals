# Prompt — vizuál „mobil v ruce" (foto mockup ruky s telefonem přes celou aplikaci)

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Šablona: `sablony-vizualu/mobil-v-ruce.html`
> Čtvrtá rodina vedle „scén toku", „nadpis + screenshot" a „kaskáda
> s anotací" — jediná, která používá skutečnou FOTKU ruky s telefonem
> (`mockups/phone mockup.png`), ne CSS kreslený rám ani čistý screenshot.
> Pozadí je celý screenshot aplikace (topbar + sidebar + otevřený záznam
> s konverzací), telefon je navrstvený nad ním.

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `sablony-vizualu/mobil-v-ruce.html`.** Negeneruj
   z paměti. Komentář na začátku souboru je závazný — hlavně geometrie okna
   displeje v mockupu, pravidlo o z-indexu (displej NAD fotkou telefonu) a
   pravidlo „perspektiva se otočí" (§5 v `PRAVIDLA-mobil-v-ruce.md`).
2. Přečti taky `PRAVIDLA-mobil-v-ruce.md` (plné zdůvodnění + gotchas) a
   `sablony-vizualu/README.md` (pevná geometrie celé složky) a REÁLNÉ
   partialy, ze kterých šablona 1:1 vychází: `prototypes/partials/
   sidebar-menu-collapsed.html`, `evidence-toolbar.html`, `evidence-list.html`,
   `item-drawer-shell.html`, `drawer-konverzace.html` a mobilní obrazovku
   `chat` z `prototypes/Aptien-mobil-intranet.html`. Negeneruj tyhle části
   z paměti ani přibližně — vlož je 1:1, jen s daty ze zadání. Sidebar
   nemá vlastní aktivní položku pro evidence-moduly — nech aktivní
   „Moje domovská stránka" (fallback), neaktivuj nic jiného.
3. **Vypiš jako text, než začneš:** název evidence (a zda jde o přejmenovaný
   modul jako „Stavby" = Zakázky), jméno a roli obou osob v konverzaci, kdo
   je přihlášený na počítači a kdo drží telefon, řádky do seznamu vlevo,
   text a pořadí zpráv (chronologicky, max ~3 zprávy je bezpečné množství),
   kde v pořadí je fotka, iniciály a barva plovoucího avatar odznaku
   u telefonu.
4. **Zkopíruj šablonu pod novým názvem a přepiš JEN místa označená
   `✏️ MĚŇ`** v hlavičce souboru (ZÁZNAM, KONVERZACE obě, SEZNAM VLEVO).
   Rozměry, CSS, geometrii telefonu, akční sloupec ani konektor neměň.
5. Vyrenderuj: `node render.js <soubor>.html`
6. **Přečti výstup renderu** (musí hlásit přesně 1920 × 1080 px).
7. **Ověř přes Playwright (nespoléhej na oči ani na `render.js`):**
   - z-index: `.cv-phone-screen` má vyšší z-index než `.cv-phone-img`
     (jinak zůstane displej prázdný bílý, i když je obsah v DOM správně).
   - rovnováha `<div>`: počet otevíracích `<div` a zavíracích `</div>`
     v souboru sedí (jednoduchý `re.findall` skript) — chybějící `</div>`
     u řádku zprávy v mobilním chatu prohodí zanoření všeho za ním.
8. **Otevři výsledné PNG a ověř OČIMA** jako druhou kontrolu (ne jedinou):
   displej telefonu NENÍ prázdný bílý, mobilní obsah je čitelný, akční
   sloupec draweru je z většiny čitelný (telefon smí lehce zasahovat jen do
   spodních položek/metadat, ne do horních akcí), konektor je celý viditelný
   a míří z telefonu do aplikace, avatar odznak nezasahuje mimo scénu.
9. Ukaž mi až finální ověřený obrázek.

---

## ⛔ CO SE NESMÍ

- ⛔ **Nepřekresluj UI Aptienu z hlavy.** Sidebar (celý, 22 položek), toolbar
  evidence (všech 5 pohledů, hvězda, filtr, hledání), seznam evidence, item
  tabs (reálné pořadí z `item-drawer-shell.html`), akční sloupec (kompletní,
  v pořadí) a obsah Konverzace na obou zařízeních jsou 1:1 podle partialů.
- ⛔ **Nemazej ani nepřerozděluj akční sloupec (210 px).** Mění se jen barva/
  text stavové pilulky a blok metadat.
- ⛔ **Neměň geometrii telefonu ani okna displeje** (`.cv-phone-wrap`,
  `.cv-phone-screen`, `.cv-phone-screen-inner`), pokud neměníš samotný
  soubor `mockups/phone mockup.png` — v tom případě čísla PŘEPOČÍTEJ
  měřením, neodhaduj (viz `PRAVIDLA-mobil-v-ruce.md` §4).
- ⛔ **Neotáčej z-index telefonu.** Okno displeje v mockupu je neprůhledé
  bílé — mobilní obsah (`.cv-phone-screen`) musí mít vyšší z-index než fotka
  telefonu (`.cv-phone-img`), jinak zůstane displej prázdný.
- ⛔ **Fotka musí být identická** na desktopu i v telefonu — stejná `data:`
  URI vložená na obě místa, nikdy dvě různé fotky ani dvě různá zpracování
  stejné fotky.
- ⛔ **Perspektiva se otočí správným směrem:** kdo je „Vy" (vpravo, modře)
  na SVÉM zařízení, je na DRUHÉM zařízení vlevo (šedě) — a naopak pro druhou
  osobu. Obě strany musí ukazovat TYTÉŽ zprávy, jen otočenou stranu bublin
  a nadpis hlavičky mobilu (jméno protistrany).
- ⛔ **Konektor je VŽDY jednosměrný, plný, zprava doleva** (z telefonu do
  aplikace) — nikdy obousměrný a nikdy přerušovaný (to je vyhrazené pro
  automatickou notifikaci v `aplikace-do-emailu.html`).
- ⛔ **Avatar odznak u telefonu** patří VŽDY osobě, která telefon drží (má
  na mobilu „Vy" zprávy) — nepoužívej fotku vymyšlené osoby, jen iniciály.
- ⛔ **Do obrázku nepatří nadpis, popiska ani claim** — jen samotné UI,
  telefon a konektor.
- ⛔ **Logo Aptienu** je inline SVG (height 28px) v liště `#424242` výšky
  56 px — nenahrazuj ho ikonou, nezmenšuj.

---

## PRAVIDLA, KTERÁ JSOU POINTOU TOHOTO VIZUÁLU

**1. Jedna konverzace, jedna fotka, dvě zařízení, ŽIVĚ.** Divák musí na
první pohled poznat, že fotka poslaná z telefonu se hned objevila
v aplikaci na počítači — nese to plná šipka od telefonu k aplikaci a
identický obsah na obou zařízeních.

**2. Fotorealismus tam, kde na tom záleží.** Telefon je skutečná fotka ruky,
ne kreslený mockup — dělá z obrázku produktovou fotku, ne diagram. UI
aplikace v pozadí i na displeji telefonu je ale pořád skutečné, živé UI
Aptienu, ne vymyšlené.

**3. Perspektiva je vždy zrcadlová** (viz `PRAVIDLA-mobil-v-ruce.md` §5).
Kdo píše zprávu, má ji „u sebe" vpravo a modře; ten samý člověk je u
DRUHÉHO zařízení (kde je viděn očima toho druhého) vlevo a šedě.

---

## KONTROLA PŘED DOKONČENÍM (měř i koukej, neodhaduj)

- [ ] Soubor je přesně **1920 × 1080 px** (`render.js` spadne, když ne).
- [ ] **Změřeno (Playwright), ne odhadnuto:** `.cv-phone-screen` má vyšší
      `z-index` než `.cv-phone-img`.
- [ ] **Změřeno:** počet `<div` a `</div>` v souboru sedí.
- [ ] **Vizuální kontrola (druhá, ne jediná):** displej telefonu není prázdný
      bílý, akční sloupec draweru je čitelný z většiny, konektor je celý
      viditelný a nepřekrývá ani telefon ani hlavní panel.
- [ ] Sidebar má aktivní jen „Moje domovská stránka".
- [ ] Aktivní item tab je „Konverzace".
- [ ] Fotka je **identická** na desktopu i v telefonu (stejný soubor).
- [ ] Zprávy na desktopu a v telefonu **odpovídají obsahem** (jen otočená
      strana bublin a jméno v hlavičce mobilu).
- [ ] Avatar odznak u telefonu barvou/iniciálami odpovídá osobě, která
      telefon drží.
- [ ] Logo Aptienu je 28 px v liště 56 px, není z něj ikona.
- [ ] Žádný gradient, konfety, sparkly, nadpis ani claim.
- [ ] Aktivní řádek seznamu vlevo odpovídá otevřenému záznamu.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Evidence:** [název evidence + barva; pokud jde o přejmenovaný modul (jako
„Stavby" = Zakázky, `#1565C0`), napiš to]
**Přihlášený uživatel (na počítači):** [jméno + iniciály do topbaru]

**Záznam, o kterém je konverzace:**
- název: [...]
- kategorie/modul (chip v hlavičce): [...]

**Seznam vlevo na desktopu (aktivní řádek = záznam, o kterém je
konverzace):** [názvy — max ~4 řádky, pokud jde o krátký seznam projektů/
zakázek/staveb]

**Konverzace (vlákno, chronologicky od nejstarší) — DVĚ OSOBY:**
- osoba A (na počítači, „Vy" na desktopu): [jméno, role]
- osoba B (v terénu, „Vy" na telefonu, dostane plovoucí avatar odznak):
  [jméno, role, iniciály, barva odznaku]
- zprávy: [čas → autor → text; poslední zpráva nese fotku a musí být od
  osoby B (ta je v terénu, ta fotí)]

**Fotografie:** [co je na fotce; zdrojový soubor / `data:` URI — vlož
STEJNOU fotku na desktop i telefon]

---

### Příklad vyplnění — stavba, fotka základové desky

**Evidence:** Stavby (`#1565C0`, přejmenovaná evidence Zakázky)
**Přihlášený uživatel:** Jaroslav Dvořák (JD)

**Záznam:**
- název: Výrobní hala Modřice — hrubá stavba
- kategorie/modul: Stavby

**Seznam vlevo (4 řádky, aktivní poslední/otevřený):**
Bytový dům Zelené terasy / Parkovací dům P+R Slatina / Rekonstrukce ZŠ
Komenského / Výrobní hala Modřice — hrubá stavba

**Konverzace, 19. 8. 2026** (3 zprávy):
- osoba A: Jaroslav Dvořák, manažer stavby (na počítači)
- osoba B: Aleš Stavitel, stavbyvedoucí (v terénu, na telefonu; avatar
  odznak „AS", barva `#00695C`)
- 9:05 Aleš Stavitel: „Betonáž dokončená včera odpoledne, deska je
  zahlazená. Dneska ji nafotím."
- 9:07 Jaroslav Dvořák: „Díky. Pošli prosím i celkový záběr, ať je vidět
  bednění po obvodu."
- 10:18 Aleš Stavitel: „Fotku posílám, deska je hotová." + fotka základové
  desky

**Fotografie:** hotová základová deska se svislými výztužemi, staveniště
v zástavbě rodinných domů — `files/Photos and pictures/fotka stavby
základová deska.png`.

---

### Další situace, na které se šablona hodí

| Co ukázat | Osoba A (počítač) | Osoba B (telefon, fotí/hlásí) |
|---|---|---|
| Kontrola BOZP na hale | bezpečnostní technik | mistr směny |
| Předání díla investorovi | manažer zakázky | technický dozor |
| Revize hasicích přístrojů | správce majetku | pracovník obsluhy |
| Zápis o úrazu | HR / BOZP | vedoucí provozu |
| Servisní zásah u zákazníka | dispečer / plánovač | servisní technik v terénu |

Když má obrázek naopak ukázat konverzaci BEZ fotorealistické fotky telefonu
(jen ilustrovaný avatar, panely vedle sebe nebo přes sebe), taková šablona
v repozitáři aktuálně není — `mobil-pres-desktop.html` a
`mobil-vedle-desktop.html` byly smazány. Když má obrázek ukázat TOK dat mezi
dvěma různými místy (e-mail → aplikace, aplikace → notifikace), použij
`email-do-aplikace.html` / `aplikace-do-emailu.html`.
