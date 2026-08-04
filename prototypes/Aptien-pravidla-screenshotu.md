# Aptien – pravidla pro screenshoty a náhledy

Závazný formát výstupu pro všechny generované produktové vizuály (náhledy
`.dc.html`, screenshoty do `screenshots/`, podklady pro web a knowledge base).

Zkrácená verze tohoto pravidla je v `CLAUDE.md`, sekce
*„Formát výstupu screenshotů"*. Tady je detail a odůvodnění.

---

## 1. Formát výstupu

| Parametr | Hodnota |
|---|---|
| Rozměr výstupního obrázku | **přesně 1920 × 1080 px** |
| Šířka, na kterou se navrhuje layout | **1920 CSS px** |
| `deviceScaleFactor` / DPR | **1** |
| Orientace | landscape |
| Formát souboru | PNG (bezztrátový), pokud není řečeno jinak |

Typografie a rozměry prvků tedy zůstávají v běžných hodnotách aplikace –
běžný text 13–16 px, ikony 14–21 px, horní lišta 66 px, sidebar 260 px.
Nic se nepřepočítává ani nezvětšuje.

## 2. Celá obrazovka musí být vidět

Na obrázku je vždy **kompletní obrazovka aplikace**:

- nic odříznutého na pravém ani spodním okraji,
- žádný scroll – `scrollWidth` = 1920, `scrollHeight` = 1080,
- celá horní lišta i tab strip, včetně poslední záložky,
- celý sidebar (všech 15 osobních + 7 firemních položek),
- celý obsah pohledu – u dashboardu tedy hero banner **i** karty **i** tabulka.

Když se obsah nevejde, **neškrtá se okraj** – zredukuje se obsah (méně řádků
tabulky, nižší banner), aby se celá skladba do 1920 × 1080 vešla.

## 3. Rám v `.dc.html` náhledech

```html
<div style="width:1920px;height:1080px;position:relative;overflow:hidden">
  <!-- celé UI aplikace -->
</div>
```

A v `data-props` náhledu:

```html
<script type="text/x-dc" data-dc-script
        data-props='{"$preview":{"width":1920,"height":1080}}'></script>
```

## 4. Render přes Playwright / headless Chromium

```js
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.goto(url);
await page.screenshot({ path: 'out.png' });   // soubor = 1920 × 1080 px
```

Chromium CLI: `--window-size=1920,1080 --force-device-scale-factor=1`

⛔ **Nikdy `fullPage: true`** – rozbije výšku 1080.
⛔ **Neupscalovat** menší obrázek na 1920 × 1080 – vždy renderovat nativně.

## 5. Zamítnutá varianta: hustota 13" displeje (rozhodnuto 4. 8. 2026)

V úvaze bylo renderovat vizuály v optické hustotě 13" notebooku – tedy layout
navržený na **1280 × 720 CSS px** a zvětšený **1,5×** (buď
`deviceScaleFactor: 1.5`, nebo `transform: scale(1.5)` uvnitř rámu
1920 × 1080). Prvky by byly o 50 % větší a text ~21 px místo ~15 px.

**Zamítnuto.** Při té hustotě je k dispozici jen 1280 × 720 logických px a
celá obrazovka se do rámu nevejde – odřízne se poslední pill-tlačítko view
switcheru (vejdou se ~3 z 5) a tabulka spadne pod fold. U produktových
vizuálů je přednější, že je vidět **celá funkce**, než že jsou prvky velké.

⛔ **Nezavádět znovu** `transform: scale()` ani `deviceScaleFactor: 1.5`,
ani „pro lepší čitelnost". Když někdo požaduje větší UI, znamená to změnu
tohoto pravidla – ne ad-hoc výjimku v jednom souboru.

### Známý důsledek

Celoobrazovkový screenshot 1920 × 1080 zmenšený pod ~800 px šířky (malá
miniatura na webu) není čitelný – běžný text má při šířce 600 px na obrazovce
jen ~4,7 px. Řešení **není** měnit render, ale u malých náhledů použít
**výřez** z toho samého obrázku 1920 × 1080 (např. oblast 960 × 540 s
bannerem nebo hlavičkou tabulky).

## 6. Kontrola před odevzdáním

1. Skutečné rozměry souboru = 1920 × 1080 px (`identify` / `file`).
2. `scrollWidth` / `scrollHeight` = 1920 / 1080 – nic nepřetéká.
3. Vizuální kontrola pravého a spodního okraje – žádný odseknutý prvek.
4. Sidebar má všech 22 položek, tab strip všechny záložky, view switcher
   všech 5 pohledů.
