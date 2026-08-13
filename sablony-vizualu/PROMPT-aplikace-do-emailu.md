# Prompt — vizuál „aplikace → e-mail / notifikace"

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Šablona: `sablony-vizualu/aplikace-do-emailu.html`
> Obrácený tok je v `PROMPT-email-do-aplikace.md` (něco přijde poštou
> a v Aptienu z toho vznikne záznam).

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `sablony-vizualu/aplikace-do-emailu.html`.** Negeneruj
   z paměti. Komentář na začátku souboru je závazný.
2. Přečti taky `sablony-vizualu/README.md` (pevná geometrie) a partial
   `prototypes/partials/drawer-tab-detaily.html` (typy polí záznamu).
3. **Vypiš jako text, než začneš:** popisky nad oběma panely, název položky
   (= budoucí předmět e-mailu), text pilulky konektoru a jeho délku ve
   znacích, seznam polí s hodnotami, co bude na fotce v kartě.
4. **Zkopíruj šablonu pod novým názvem a přepiš JEN místa označená `✏️ MĚŇ`.**
   Vzhled, barvy, rozměry, taby ani strukturu řádků polí neměň.
5. Vyrenderuj: `node render.js <soubor>.html`
6. **Přečti výstup renderu.** Když hlásí přetečení nebo výšku panelu mimo
   70–90 %, uber / přidej řádky dat a renderuj znovu. Nikdy neřeš výšku
   změnou fontů ani scalováním.
7. Ukaž mi až finální ověřený obrázek.

---

## ⛔ CO SE NESMÍ

- ⛔ **Nepřekresluj UI Aptienu z hlavy.** Struktura polí je z
  `drawer-tab-detaily.html`, taby z `item-drawer-shell.html`.
- ⛔ **Hlavní panel (Aptien) je VLEVO, širší (736 px).** Notifikace je
  důsledek a patří vpravo (520 px). Konektor míří zleva doprava.
- ⛔ **Karta položky má vždy obrázek 110×110** vpravo v hlavičce. Když fotka
  není zadaná, dej tam prázdný placeholder (2px dashed `#d8d6e2` +
  `fa-image` 28px `#cdd0d8`). Nikdy ten slot nemaž.
- ⛔ **Logo Aptienu** je inline SVG z `prototypes/assets/img/681a831d.svg`
  v `height:28px` v liště `#424242` o výšce 56 px, wordmark 19px/800.
  Nenahrazuj ho ikonou (`fa-bolt`) a nezmenšuj.
- ⛔ **Item tabs jsou složkové taby**, ne pilulky.
- ⛔ **Konektor je vždy modrý `#1572e8`**, text pilulky max ~14 znaků.
- ⛔ **Plocha scény `#f4f4f7`** — jednolitá, nikdy gradient, nikdy barva modulu.
- ⛔ **Barva modulu (`c800`)** se objeví jen na ikoně názvu v kartě.
  Odkazy, tlačítka a taby jsou vždy defaultní modré `#1572e8`.
- ⛔ **Do obrázku nepatří nadpis ani claim** — jen 2 popisky, 1 pilulka
  konektoru a data v UI.

---

## PRAVIDLA, KTERÁ JSOU POINTOU TOHOTO VIZUÁLU

**1. Předmět notifikačního e-mailu = název položky, znak za znak.**
Divák musí tentýž text vidět v kartě i v poště a pochopit, že to psal
systém, ne člověk.

**2. Odesílatel je vždy `no-reply@aptien.com`** a e-mail nese modré tlačítko
zpět do aplikace („OTEVŘÍT ZÁZNAM", „POTVRDIT SEZNÁMENÍ", „SCHVÁLIT"…).

**3. Fotka v kartě má odpovídat tomu, o čem záznam je.** Je to důkaz, že
v Aptienu je i fotodokumentace z terénu, ne jen políčka. Když je fotek víc,
ukaž počet na tabu Přílohy.

---

## KONTROLA PŘED DOKONČENÍM (měř, neodhaduj)

- [ ] Soubor je přesně **1920 × 1080 px** (`render.js` spadne, když ne).
- [ ] `render.js` nehlásí přetečení ani výšku panelu mimo **70–90 %**.
- [ ] Předmět e-mailu = název položky, znak za znak.
- [ ] Odesílatel je `no-reply@aptien.com`, e-mail má tlačítko do aplikace.
- [ ] Karta má obrázek 110×110 (fotku, nebo prázdný placeholder).
- [ ] Logo Aptienu je 28 px v liště 56 px, není z něj ikona.
- [ ] Taby jsou složkové, ne pilulky; aktivní je právě jeden.
- [ ] Zvýrazněný je právě jeden e-mail (ten od Aptienu), zbytek je kulisa.
- [ ] Žádný gradient, konfety, sparkly, nadpis ani claim.
- [ ] Nic není odříznuté — hlavně pravý okraj panelu a poslední pole.

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Účel:** Obrázek doprovodí text na produktové stránce. Nadpis ani claim do
obrázku nedávej.
**Co má obrázek říct (jednou větou):** [...]

**Popiska nad Aptienem:** [VERZÁLKY, max ~30 znaků, např. APTIEN HLÍDÁ TERMÍN KONTROLY]
**Popiska nad schránkou:** [VERZÁLKY, např. ODPOVĚDNÝ ČLOVĚK TO MÁ V POŠTĚ]
**Text pilulky konektoru:** [1–2 slova, max ~14 znaků, např. UPOZORNÍ SÁM]

**Karta položky v Aptienu:**
- název položky: [tenhle text bude i předmětem e-mailu]
- evidence (chip) + barva ikony: [např. Zakázky / `#1565C0`; Ochranné pomůcky
  `#D84315`; Rizika `#E91E63`; Směrnice `#1572e8`; Certifikáty `#FF8F00`;
  Smlouvy `#37474F`; Zaměstnanci `#f1c40f`]
- stav: [text pilulky + barva puntíku — `#FF8F00` čeká, `#43A047` hotovo,
  `#E53935` po termínu]
- obrázek položky: [co je na fotce, nebo „není zadaný" → prázdný placeholder]
- počet příloh na tabu: [číslo, nebo „bez badge"]
- pole (4–6, typy podle `drawer-tab-detaily.html`): [název pole → hodnota]
- přihlášený uživatel: [iniciály do avataru, např. JR]

**Notifikační e-mail:**
- předmět: [= název položky]
- tělo (1 věta, max ~90 znaků): [...]
- text tlačítka: [např. OTEVŘÍT ZÁZNAM]
- čas: [např. dnes 7:00]

**Ztlumená kulisa v poště (2 e-maily):** [předměty + odesílatelé; obyčejná
pošta, která s tímhle tokem nesouvisí]

**Push notifikace pod poštou:** [ano / ne] — pokud ano, text: [1 věta]

---

### Příklad vyplnění — kontrola stavby (to, co je v šabloně předvyplněné)

**Co má obrázek říct:** Aptien sám hlídá termín kontroly a den předem pošle
odpovědnému člověku upozornění — i s fotodokumentací, která u záznamu je.

**Popiska nad Aptienem:** APTIEN HLÍDÁ TERMÍN KONTROLY
**Popiska nad schránkou:** ODPOVĚDNÝ ČLOVĚK TO MÁ V POŠTĚ
**Text pilulky konektoru:** UPOZORNÍ SÁM

**Karta položky:**
- název: **Základová deska — hala D**
- evidence: Zakázky, ikona `fa-briefcase` `#1565C0`
- stav: „Ke kontrole", puntík `#FF8F00`
- obrázek: fotka hotové základové desky z pracoviště
- přílohy na tabu: 3
- pole: Číslo zakázky → `ZAK-2026-114` · Zákazník → odkaz `LMN Projekty s.r.o.` ·
  Místo → `Hala D — sever` · Termín kontroly → `14. 8. 2026` ·
  Odpovědná osoba → odkaz `Jiří Rychlý`
- přihlášený uživatel: JR

**Notifikační e-mail:**
- předmět: **Základová deska — hala D**
- tělo: „Termín kontroly je zítra. V záznamu jsou 3 fotky z pracoviště."
- tlačítko: OTEVŘÍT ZÁZNAM
- čas: dnes 7:00

**Ztlumená kulisa:** Dodávka betonu — potvrzení termínu (`beton@dodavatel.cz`) ·
Objednávka č. 2026-088 (`obchod@dodavatel.cz`)

**Push:** ano — „Zítra máte kontrolu: Základová deska — hala D."

---

### Další situace, na které se šablona hodí

| Co ukázat | Pilulka | Předmět e-mailu = název položky |
|---|---|---|
| Blíží se revize přístroje | `UPOZORNÍ SÁM` | „Řezací stroj XPR200" |
| Směrnice k seznámení | `UPOZORNÍ SÁM` | „Provozní řád skladu hořlavin" |
| Vyprší certifikát | `UPOZORNÍ SÁM` | „Certifikát ISO 9001 — 2026" |
| Žádost jde ke schválení | `KE SCHVÁLENÍ` | „Žádanka OOPP 09/2026" |
| Pomůcka je k výměně | `UPOZORNÍ SÁM` | „Rukavice Ansell 11-435" |
| Končí platnost školení | `UPOZORNÍ SÁM` | „Školení práce ve výškách" |

Když má obrázek říct tok uvnitř aplikace (ze záznamu vznikne úkol) nebo
mobil ↔ desktop, tyto dvě šablony se nehodí — je potřeba nová. Řekni mi to
a udělám ji.
