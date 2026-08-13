# Prompt — vizuál „e-mail → aplikace"

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Šablona: `sablony-vizualu/email-do-aplikace.html`

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `sablony-vizualu/email-do-aplikace.html`.** Negeneruj
   z paměti. Komentář na začátku souboru je závazný.
2. Přečti taky `sablony-vizualu/README.md` (pevná geometrie) a partial
   `prototypes/partials/drawer-tab-detaily.html` (typy polí záznamu).
3. **Vypiš jako text, než začneš:** popisky nad oběma panely, předmět
   zvýrazněného e-mailu (= budoucí název položky), text pilulky konektoru
   a jeho délku ve znacích, seznam polí záznamu s hodnotami, název přílohy.
4. **Zkopíruj šablonu pod novým názvem a přepiš JEN místa označená `✏️ MĚŇ`.**
   Vzhled, barvy, rozměry, taby ani strukturu řádků polí neměň.
5. Vyrenderuj: `node render.js <soubor>.html`
6. **Přečti výstup renderu.** Když hlásí přetečení nebo výšku panelu mimo
   70–90 %, uber / přidej řádky dat a renderuj znovu. Nikdy neřeš výšku
   změnou fontů ani scalováním.
7. Ukaž mi až finální ověřený obrázek.

---

## ⛔ CO SE NESMÍ (jinak přestane platit vzhled, o který jde)

- ⛔ **Nepřekresluj UI Aptienu z hlavy.** Panel je výřez skutečné obrazovky;
  struktura polí je z `drawer-tab-detaily.html`, taby z `item-drawer-shell.html`.
- ⛔ **Logo Aptienu je inline SVG** z `prototypes/assets/img/681a831d.svg`
  v `height:28px` v liště `#424242` o výšce 56 px, wordmark 19px/800.
  Nenahrazuj ho ikonou (`fa-bolt`) a nezmenšuj.
- ⛔ **Item tabs jsou složkové taby** (aktivní bílý vyvýšený se stínem +
  modrý text 700). NEDĚLEJ z nich pilulky — to je styl view switcheru.
- ⛔ **Konektor je vždy modrý `#1572e8`**, nikdy barva modulu. Text pilulky
  max ~14 znaků, jinak přeteče sloupec.
- ⛔ **Plocha scény `#f4f4f7`** — jednolitá, nikdy gradient, nikdy barva modulu.
- ⛔ **Zvýraznění e-mailu** = tint `#eef4fe` + `inset 3px 0 0 #1572e8`
  (stejné jako aktivní položka sidebaru). Žádná nová barva. Zvýrazni 1–2 řádky.
- ⛔ **Do obrázku nepatří nadpis ani claim.** Smí tam být jen: 2 popisky,
  1 pilulka konektoru a data v UI. Text je na webu vedle obrázku.
- ⛔ **Sloupce 520 + 168 + 736 = 1424**, rám 1920 × 1080, vrstva 1536 × 864
  se `scale(1.25)`. Na geometrii nesahej.

---

## PRAVIDLO, KTERÉ JE POINTOU TOHOTO VIZUÁLU

**Název položky v Aptienu = předmět zvýrazněného e-mailu.** Ne obecný název
evidence. Divák musí na dvou místech vidět tentýž text a pochopit, že to
někdo nepřepisoval ručně.

Ze stejného důvodu má příloha v záznamu **stejný název souboru** jako příloha
v e-mailu a popis, který říká, odkud se vzala („staženo z e-mailu").

---

## KONTROLA PŘED DOKONČENÍM (měř, neodhaduj)

- [ ] Soubor je přesně **1920 × 1080 px** (`render.js` to ověří a spadne, když ne).
- [ ] `render.js` nehlásí přetečení ani výšku panelu mimo **70–90 %**.
- [ ] Název položky = předmět zvýrazněného e-mailu, znak za znak.
- [ ] Příloha má v e-mailu i v záznamu stejný název souboru.
- [ ] Logo Aptienu je 28 px v liště 56 px, není z něj ikona.
- [ ] Taby jsou složkové, ne pilulky; aktivní je právě jeden.
- [ ] Zvýrazněné jsou 1–2 řádky pošty, zbytek je ztlumená kulisa.
- [ ] Žádný gradient, konfety, sparkly, cizí loga navíc, nadpis ani claim.
- [ ] Nic není odříznuté — hlavně pravý okraj panelu a poslední pole.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Účel:** Obrázek doprovodí text na produktové stránce. Nadpis ani claim do
obrázku nedávej.
**Co má obrázek říct (jednou větou):** [...]

**Popiska nad schránkou:** [VERZÁLKY, max ~30 znaků, např. VAŠE E-MAILOVÁ SCHRÁNKA]
**Popiska nad Aptienem:** [VERZÁLKY, např. APTIEN — ZÁZNAM VZNIKL SÁM]
**Text pilulky konektoru:** [1–2 slova, max ~14 znaků, např. AUTO-IMPORT]

**Zvýrazněné e-maily (1–2):** pro každý uveď
- předmět: [tenhle text bude i názvem položky v Aptienu]
- odesílatel a datum: [...]
- příloha: [název souboru + velikost, nebo „bez přílohy"]

**Ztlumená kulisa (3–4 e-maily):** [předměty + odesílatelé; obyčejná firemní
pošta, která s tímhle tokem nesouvisí]

**Záznam v Aptienu:**
- název položky: [= předmět zvýrazněného e-mailu]
- stav: [text stavové pilulky + barva puntíku — `#FF8F00` čeká,
  `#43A047` hotovo, `#E53935` po termínu]
- pole (4–6, typy podle `drawer-tab-detaily.html`): [název pole → hodnota]
- příloha: [název souboru + popis pod ním, např. „2 strany · 218 kB · staženo z e-mailu"]
- přihlášený uživatel: [iniciály do avataru, např. JS]

**Strip značek pošty (Gmail · Outlook · obálka) pod schránkou:** [ano / ne]

---

### Příklad vyplnění — SÚKL (to, co je v šabloně předvyplněné)

**Co má obrázek říct:** E-maily a věstníky od SÚKL se do Aptienu dostanou samy
a rovnou z nich vznikne záznam s přílohou — nikdo nic nepřepisuje.

**Popiska nad schránkou:** VAŠE E-MAILOVÁ SCHRÁNKA
**Popiska nad Aptienem:** APTIEN — ZÁZNAM VZNIKL SÁM
**Text pilulky konektoru:** AUTO-IMPORT

**Zvýrazněné e-maily:**
- „SÚKL — Změna v registraci LP", `noreply@sukl.cz`, 13. 6. 2024,
  příloha `rozhodnuti_24117.pdf` (218 kB)
- „Věstník SÚKL 06/2024", `vestnik@sukl.cz`, 14. 6. 2024,
  příloha `vestnik_2024_06.pdf` (1,4 MB)

**Ztlumená kulisa:** Objednávka č. 2024-114 — potvrzení (`obchod@dodavatel.cz`) ·
Smlouva o dílo — k podpisu (`kratka@firma.cz`) · Faktura č. 2024-0192
(`dodavatel@firma.cz`) · Pozvánka na školení BOZP (`skoleni@bozp-servis.cz`)

**Záznam v Aptienu:**
- název položky: **SÚKL — Změna v registraci LP**
- stav: „Ke zpracování", puntík `#FF8F00`
- pole: Typ oznámení → `Změna v registraci LP` · Číslo jednací →
  `sukl/2024/24117` · Přípravek → `Paralen 500 mg tbl. nob.` · Šarže →
  `B240617` · Datum přijetí → `13. 6. 2024` · Odpovědná osoba →
  odkaz `Jana Svobodová`
- příloha: `rozhodnuti_24117.pdf`, popis „2 strany · 218 kB · staženo z e-mailu"
- přihlášený uživatel: JS

**Strip značek pošty:** ano

---

### Další situace, na které se šablona hodí

| Co ukázat | Pilulka | Název položky = předmět |
|---|---|---|
| Faktury z pošty do evidence | `AUTO-IMPORT` | „Faktura č. 2024-0192" |
| Objednávky od zákazníků | `AUTO-IMPORT` | „Objednávka č. 2024-114" |
| Protokoly o revizi od servisu | `AUTO-IMPORT` | „Revizní zpráva — Hala B" |
| Certifikáty od dodavatelů | `AUTO-IMPORT` | „Certifikát ISO 9001 — 2026" |
| Úřední oznámení a věstníky | `AUTO-IMPORT` | předmět úředního e-mailu |

Když má obrázek říct opačný tok (Aptien sám odesílá) nebo tok uvnitř aplikace,
tato šablona se nehodí — je potřeba nová. Řekni mi to a udělám ji.
