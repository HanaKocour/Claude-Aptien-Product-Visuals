# Pravidla — rodina „mobil v ruce"

Závazná pravidla pro obrázky, kde je na pozadí **celý screenshot aplikace**
(topbar + sidebar + otevřený záznam s konverzací) a nad ním leží
**fotorealistická fotka ruky s telefonem**, ve které je vidět mobilní pohled
do stejné konverzace. Používá se, když chceme divákovi na první pohled
ukázat, že totéž se odehrává živě na počítači i v terénu na mobilu.

Šablona: `mobil-v-ruce.html`
Prompt: `PROMPT-mobil-v-ruce.md`

> Tohle je čtvrtá rodina vedle „scén toku" (`email-do-aplikace.html`,
> `aplikace-do-emailu.html`), „nadpis + screenshot" a „kaskáda s anotací".
> Na rozdíl od všech tří nepoužívá CSS kreslený rám telefonu ani čistý
> plochý screenshot — mobilní vrstva je **skutečná fotka ruky s telefonem**
> (`mockups/phone mockup.png`) s vloženým mobilním obsahem do okna displeje.
> Nemíchat s ostatními rodinami.

> Vznikla jako navazující krok po dvou dřívějších pokusech
> (`mobil-pres-desktop.html`, `mobil-vedle-desktop.html`, oba z 20.–21. 8.
> 2026, od 21. 8. 2026 úmyslně smazané z repozitáře), které foto-realistickému
> skládání záměrně předešly a místo fotky ruky použily ilustrovaný barevný
> avatar s iniciálami. Tahle šablona to skládání dělá doopravdy a zdědila
> po nich klíčové pravidlo „perspektiva se otočí" (viz §5).

---

## 1. Anatomie

Obrázek má **tři vrstvy**:

| Vrstva | Co to je | Kolik |
|---|---|---|
| **Pozadí** | celý screenshot aplikace (topbar, sidebar, seznam, otevřený item drawer s Konverzací) | 1, přes celý rám |
| **Telefon** | fotka ruky s telefonem (`mockups/phone mockup.png`), navrstvená nad pozadí | 1 |
| **Konektor** | plná modrá šipka mezi telefonem a aplikací | 1 |

Navíc plovoucí kolečkový avatar s iniciálami u rohu telefonu (viz §6).

⛔ **Žádný nadpis, claim ani popiska nad panely.** Na rozdíl od rodiny
„nadpis + screenshot" tahle šablona nic nepopisuje textem navíc — vypráví
to samotné UI a fotka.

---

## 2. Rám a plocha

| Parametr | Hodnota |
|---|---|
| Výstup | **1920 × 1080 px** (stejně jako celá složka) |
| Návrhová vrstva | **1536 × 864** se `transform: scale(1.25)` |
| Pozadí rámu (mimo stage) | `#e9e8ee` |

⛔ Na rozdíl od „scén toku" tahle šablona **NEMÁ** padding 56 px ani
neutrální plochu okolo panelů — `.cv-stage` JE celá obrazovka aplikace,
přesně jako běžný screenshot. Telefon a šipka jsou navrstvené NAD ní
pomocí `position:absolute`/`fixed`, ne vedle ní ve sloupci.

---

## 3. Pozadí (screenshot aplikace)

Vloženo **doslovně** z reálných partialů, žádná část se nekreslí z hlavy:

| Část | Zdroj |
|---|---|
| Topbar (56 px, `#424242`) | logo Aptienu inline SVG + zvonek s odznakem + avatar uživatele |
| Sidebar | `prototypes/partials/sidebar-menu-collapsed.html`, **celý**, 22 položek, sbalený |
| Toolbar evidence | `prototypes/partials/evidence-toolbar.html` |
| Seznam evidence | `prototypes/partials/evidence-list.html` |
| Item drawer (rám + akční sloupec) | `prototypes/partials/item-drawer-shell.html` |
| Obsah Konverzace (desktop) | `prototypes/partials/drawer-konverzace.html` |

⛔ Sidebar má aktivní **„Moje domovská stránka"** jako fallback (položka je
aktivní i v souboru partialu) — nepřepínej na jinou položku, i kdyby to dávalo
tematický smysl. To je zavedená konvence celého repozitáře.

⛔ Drawer je `position:fixed`, **80 % šířky / min 920 px**, zarovnaný doprava
— vlevo zůstává viditelný pruh pozadí (sidebar + kus seznamu evidence). To je
DŮLEŽITÉ i technicky: `transform` na `.cv-stage` mění chování `position:fixed`
potomků na chování vzhledem k `.cv-stage` (containing block), takže se drawer
i přes `fixed` vejde přesně do návrhové vrstvy 1536×864 — neměň tenhle princip
ani rozměry drawer bloku.

⛔ Pravý akční sloupec (210 px) je **kompletní a v závazném pořadí** — nic
z něj nevynechávej (Zabalit → stavová pilulka → Oblíbená → Nový report →
Moje reporty → Online formuláře → Výsledky formulářů → Sdílet → Náhled →
Oprávnění → Historie změn → Uložit změny → blok metadat). Mění se jen
barva/text stavové pilulky a hodnoty v bloku metadat.

⛔ Item tabs jsou složkové taby 1:1 ze shellu. Aktivní je **„Konverzace"**
(ne „Detaily" jako ve výchozím shellu) — to je jediná změna aktivního tabu.

---

## 4. Telefon (foto mockup)

Zdroj: `mockups/phone mockup.png` — 494 × 736 px, průhledné pozadí, okno
displeje uvnitř je **neprůhledé bílé** (ne průhledné).

### Aktuální geometrie (`.cv-phone-wrap` 380 × 566 px)

Naměřeno na mockupu 494×736 px jako frakce (left 29,35 % / top 15,76 % /
width 44,53 % / height 65,22 %) a přepočteno na 380×566:

```
.cv-phone-wrap    { width:380px; height:566px; right:90px; bottom:40px; }
.cv-phone-img     { inset:0; width:380px; height:566px; z-index:1; }
.cv-phone-screen  { left:112px; top:89px; width:169px; height:369px;
                     border-radius:22px; z-index:2; overflow:hidden; }
.cv-phone-screen-inner { width:390px; height:844px;
                     transform:scale(0.4339,0.4374); transform-origin:top left; }
```

Mobilní obsah se navrhuje na skutečnou velikost `390×844` (stejně jako
`Aptien-mobil-intranet.html`) a zmenšuje transformem do okna displeje.

⛔ **Když mockup vyměníš NEBO změníš rozměr `.cv-phone-wrap`, PŘEPOČÍTEJ
všechna tato čísla měřením** (např. skriptem přes PIL — sken řádků/sloupců
pixelů, kde končí průhlednost a začíná bílé okno), neodhaduj je od oka.

### ⚠️ Gotcha: pořadí vrstvení (z-index)

Okno displeje v mockupu je **neprůhledé bílé**, ne díra. To znamená:

- `.cv-phone-screen` (mobilní obsah) musí mít **vyšší** `z-index` než
  `.cv-phone-img` (fotka telefonu) — jinak fotka telefonu obsah převrství
  a displej zůstane prázdný bílý, i když je obsah v DOM správně.
- Aktuální, ověřené pořadí: `cv-phone-img{z-index:1}`,
  `cv-phone-screen{z-index:2}`, `cv-avatar-badge{z-index:31}` (nejvýš),
  `cv-phone-wrap` sám `z-index:30` (nad screenshotem aplikace, pod
  odznakem).
- Tuhle chybu nejde odhalit pouhým pohledem na `getBoundingClientRect()` —
  velikosti i pozice vyjdou správně, obsah je jen VIZUÁLNĚ překrytý. Ověřuj
  vždy i vyrenderovaným PNG, ne jen DOM inspekcí.

### ⚠️ Gotcha: rovnováha `<div>` v mobilním obsahu

Řádek zprávy v mobilním chatu má strukturu
`.row-CommentWrapper > .mv-commentItem > .comment-wrapper (…) + .item-Avatar`
— `.item-Avatar` je sourozenec `.comment-wrapper` **uvnitř** `.mv-commentItem`,
ne uvnitř něj vnořený jinak. Každý řádek zprávy potřebuje **3 zavírací
`</div>`** po `.item-Avatar` bloku (uzavřít `comment-wrapper`, pak
`mv-commentItem`, pak `row-CommentWrapper`). Vynechaný jeden `</div>` u
jediného řádku prohodí zanoření všeho, co je za ním v DOM — v praxi se to
projeví tak, že `<img class="cv-phone-img">` skončí jako potomek
`.cv-phone-screen-inner` a zdědí jeho `transform:scale`, takže vyjde
několikrát menší, než má. Před renderem vždy zkontroluj, že počet `<div`
a `</div>` v souboru sedí (jednoduchý Python skript s `re.findall`).

Velikost telefonu byla zmenšena z původních 416×620 na 380×566 (a okno
displeje přepočteno), protože větší telefon svou nepravidelnou siluetou
(prsty, mezery) zakrýval části textu v pravém akčním sloupci draweru
(„Moje reporty" apod.). Menší telefon nechává sloupec čitelný skoro celý —
jen „Oprávnění"/„Historie změn" a část bloku metadat zůstávají částečně
pod fotkou, což je přijatelné.

---

## 5. Konverzace — perspektiva se otáčí mezi zařízeními

Zděděné klíčové pravidlo z (smazané) `mobil-vedle-desktop.html`:

**Kdo píše zprávu, má ji na SVÉM zařízení vpravo/modře a na DRUHÉM zařízení
vlevo/šedě.** Text a fotka se musí shodovat **znak za znak / pixel za pixel**
mezi oběma zařízeními — mění se jen strana bubliny a nadpis konverzace
(jméno protistrany v hlavičce mobilu).

Příklad (viz i `PROMPT-mobil-v-ruce.md`): Aleš Stavitel (terén, telefon) a
Jaroslav Dvořák (kancelář, desktop) si píšou o dokončené základové desce.

| Zpráva | Na desktopu (Jaroslav = „Vy") | Na mobilu (Aleš = „Vy") |
|---|---|---|
| Aleš: „Betonáž dokončená…" | vlevo, šedě, avatar AS | vpravo, modře, avatar AS |
| Jaroslav: „Díky. Pošli prosím…" | vpravo, modře, avatar JD | vlevo, šedě, avatar JD |
| Aleš: „Fotku posílám…" + fotka | vlevo, šedě, avatar AS | vpravo, modře, avatar AS |

Hlavička konverzace na mobilu ukazuje jméno **protistrany** („Jaroslav
Dvořák"), ne vlastní jméno držitele telefonu.

⛔ Fotka je **identická** na obou zařízeních — stejná `data:` URI vložená na
obě místa, nikdy dvě různé fotky ani dvě různá zpracování stejné fotky.

⛔ Datum a časy zpráv jsou na obou zařízeních stejné (jedno datum, pokud se
konverzace odehrává v jednom dni — neroztahuj ji uměle na víc dní).

---

## 6. Plovoucí avatar odznak

Kolečko s iniciálami u rohu telefonu (`cv-avatar-badge`) — barva a iniciály
**musí odpovídat tomu, čí je to telefon** (osoba, která má na mobilu „Vy"
zprávy vpravo/modře, viz §5).

⛔ **Nepoužívej fotku vymyšlené osoby.** V repozitáři není žádná reálná
fotka pracovníka a vymyšlená tvář cizího člověka do produktového vizuálu
nepatří — proto ilustrovaný kolečkový avatar s iniciálami, ne fotka.

---

## 7. Konektor

Plná (**ne přerušovaná**) modrá `#1572e8` šipka, jde **zprava doleva**
(z telefonu do aplikace) — signalizuje živý lidský vstup z terénu do
aplikace, na rozdíl od přerušované šipky u automatické notifikace
(`aplikace-do-emailu.html`). Nekresli oba typy stejně a neotáčej směr.

---

## 8. Fotka

Stejná konvence jako zbytek repozitáře: `data:` URI, JPEG, středový výřez
na kvadrát 300×300, kvalita 82, zdroj v `files/Photos and pictures/`. Fotka
se vkládá **doslovně stejná** na desktop (bublina v draweru) i na mobil
(bublina v telefonu) — viz §5.

---

## 9. Konzistence sady

Když děláš víc obrázků v téhle rodině (různé role, různé evidence):

- ✅ Rozměry a pozice telefonu, drawer, akční sloupec zůstávají **beze
  změny** mezi obrázky — mění se jen data (jména, texty, fotka, evidence).
- ✅ Perspektiva (§5) se dodržuje důsledně u každého nového obsazení rolí.
- ✅ Avatar odznak (§6) vždy patří osobě u telefonu, nikdy osobě u desktopu.

---

## 10. Checklist před odevzdáním

1. Soubor je přesně **1920 × 1080 px** (`render.js` spadne, když ne).
2. Sidebar má aktivní „Moje domovská stránka", nic jiného.
3. Drawer je 80 % šířky / min 920 px, akční sloupec kompletní a v pořadí.
4. Aktivní item tab je „Konverzace".
5. `.cv-phone-screen` má vyšší z-index než `.cv-phone-img` — displej telefonu
   NENÍ prázdný bílý ve vyrenderovaném PNG.
6. Počet otevíracích a zavíracích `<div>` v souboru sedí (žádné DOM zanoření
   navíc kvůli chybějícímu `</div>`).
7. Perspektiva zpráv je otočená správně (§5) — stejný obsah, prohozená
   strana, hlavička mobilu ukazuje jméno protistrany.
8. Fotka je identická na desktopu i mobilu.
9. Avatar odznak barvou/iniciálami odpovídá osobě u telefonu.
10. Konektor je plná (ne přerušovaná) šipka směřující z telefonu do aplikace.
11. Žádný nadpis, popiska ani claim navíc v obrázku.
12. Vizuální kontrola PNG: telefon nezakrývá nic důležitého v akčním sloupci
    ani v hlavičce drawer.

---

## 11. Historie rozhodnutí

- **21. 8. 2026** — rodina zavedena. Uživatel chtěl obrázky, kde je na
  pozadí celý screenshot aplikace a nad ním fotka ruky s telefonem s vloženým
  mobilním pohledem — na rozdíl od dvou předchozích pokusů
  (`mobil-pres-desktop.html`, `mobil-vedle-desktop.html`), které se
  foto-realistickému skládání záměrně vyhnuly. Ty dva soubory byly mezitím
  (ještě před dokončením téhle šablony) z repozitáře úmyslně smazány — na
  žádost uživatele nebyly obnovovány, i když jejich obsah (a zejména
  pravidlo „perspektiva se otáčí", §5) posloužil jako přímý předobraz pro
  tuhle šablonu.
- **21. 8. 2026** — telefon zmenšen z 416×620 na 380×566 px (a okno displeje
  přepočteno), protože větší telefon svou siluetou zakrýval části textu
  v pravém akčním sloupci draweru. **Zamítnuto** ponechat velký telefon a
  posunout akční sloupec — sloupec má pevné, závazné pořadí a rozměr napříč
  celým repozitářem.
- **21. 8. 2026** — objevena a zdokumentována gotcha se z-indexem: okno
  displeje v `mockups/phone mockup.png` je neprůhledé bílé, ne díra, takže
  mobilní obsah musí mít vyšší z-index než fotka telefonu — jinak zůstane
  displej prázdný, i když je obsah v DOM technicky správně.
- **21. 8. 2026** — příklad naplnění šablony (Aleš Stavitel / Jaroslav
  Dvořák, „Výrobní hala Modřice — hrubá stavba") převzat z
  `PROMPT-mobil-vedle-desktop.md` (dřívější, smazaná sesterská šablona), aby
  obsah zůstal konzistentní s pointou, kterou uživatel pro tenhle typ
  vizuálu už jednou schválil, místo vymýšlení nového scénáře od nuly.
