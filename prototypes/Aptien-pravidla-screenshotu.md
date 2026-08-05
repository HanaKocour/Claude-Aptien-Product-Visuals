# Aptien – pravidla pro screenshoty a náhledy

Závazný formát výstupu pro všechny generované produktové vizuály (náhledy
`.dc.html`, screenshoty do `screenshots/`, podklady pro web a knowledge base).

Zkrácená verze je v `CLAUDE.md`, sekce *„🖼 Formát výstupu screenshotů"*.
Tady je detail, odůvodnění a checklist.

---

## 1. Formát výstupu

| Parametr | Hodnota |
|---|---|
| Rozměr výstupního obrázku | **přesně 1920 × 1080 px** |
| Šířka, na kterou se navrhuje layout | **1536 × 864 CSS px** |
| Zvětšení do výstupního rámu | **1,25×** |
| Orientace | landscape |
| Formát souboru | PNG (bezztrátový), pokud není řečeno jinak |

Uvnitř té 1536px vrstvy se používají **běžné velikosti aplikace** – text 13–16 px,
ikony 14–21 px, horní lišta 66 px, sidebar 260 px. Zvětšení 1,25× obstará rám,
v markupu se nic nepřepočítává.

Ve výsledném obrázku pak běžný text vychází na **~19 px** – UI působí, jako by se
uživatel na obrazovku díval z normální pracovní vzdálenosti, ne z odstupu.

## 2. Rám v `.dc.html` náhledech

```html
<div style="width:1920px;height:1080px;overflow:hidden;position:relative">
  <div style="width:1536px;height:864px;transform:scale(1.25);transform-origin:top left">
    <!-- celé UI aplikace, navržené na 1536 × 864 -->
  </div>
</div>
```

A v `data-props` náhledu:

```html
<script type="text/x-dc" data-dc-script
        data-props='{"$preview":{"width":1920,"height":1080}}'></script>
```

## 3. Render přes Playwright / headless Chromium

```js
const context = await browser.newContext({
  viewport: { width: 1536, height: 864 },
  deviceScaleFactor: 1.25,
});
const page = await context.newPage();
await page.goto(url);
await page.screenshot({ path: 'out.png' });   // soubor = 1920 × 1080 px
```

Chromium CLI: `--window-size=1536,864 --force-device-scale-factor=1.25`

⛔ **Nikdy `fullPage: true`** – rozbije výšku 1080.
⛔ **Neupscalovat** menší obrázek na 1920 × 1080 – vždy renderovat nativně.

## 4. Rozpočet obsahu – co se do rámu vejde

1536 × 864 logických px je **pevný rozpočet**. Do dashboardu evidence se vejde:

- horní lišta + tab strip (všechny záložky modulu),
- evidence toolbar včetně **všech 5 pill-tlačítek** (Dashboard / Seznam / Kanban /
  Tabulka / Kalendář),
- hero banner s 3 metrikami,
- řada **3 statistických karet**,
- řada **3 donut karet**.

**Tabulka kapitol se do dashboardu už nevejde** – patří na samostatný vizuál
pohledu „Tabulka" nebo „Seznam". Nedávat ji na dashboard a nedoufat, že to projde.

Sidebar má 22 položek a v 864 px končí u *„Směrnice a dokumenty"*. **To je
v pořádku** – v reálné aplikaci sidebar taky scrolluje. Odříznutý sidebar dole
není chyba, odříznutý **obsah vpravo nebo hlavní pohled dole je chyba.**

Když se skladba nevejde, **ubírej obsah** (méně karet, nižší banner, méně řádků),
**nikdy neodsekávej okraj** a **nikdy nesnižuj hustotu pod 1,25×.**

## 5. Historie rozhodnutí

- **4. 8. 2026, ráno** – zvažována hustota 13" displeje (návrh na 1280 × 720,
  zvětšení 1,5×, text ~22 px). **Zamítnuto**: při 1,5× se vejde jen banner +
  3 statistické karty a jen 2 pill-tlačítka z 5; screen působí prázdně.
- **4. 8. 2026, odpoledne** – zvažováno ponechat hustotu 1,0× (návrh na
  1920 × 1080, text ~15 px). **Zamítnuto**: UI působí příliš „z dálky".
  Při této hustotě se navíc do rámu nevešla celá tabulka – původní soubor
  `ShodaISO9001Nahled1920x1080.dc.html` měl přetékající obsah a spodní řádky
  tabulky byly odříznuté, i když to na první pohled nebylo vidět.
- **4. 8. 2026, platné** – **hustota 1,25×** (návrh na 1536 × 864, text ~19 px)
  jako kompromis mezi velikostí prvků a množstvím obsahu.

Zkoušena byla i hustota 1,875× (návrh na 1024 × 576): do rámu se nevejde ani
banner se statistickými kartami. **Nepoužitelné.**

## 6. Známý důsledek pro web

Celoobrazovkový screenshot 1920 × 1080 zmenšený pod ~800 px šířky (malá miniatura)
není plně čitelný. Řešení **není** měnit render, ale u malých náhledů použít
**výřez** z toho samého obrázku 1920 × 1080 (např. oblast 960 × 540 s bannerem
nebo hlavičkou tabulky).

## 7. Checklist před odevzdáním

1. Skutečné rozměry souboru = **1920 × 1080 px** (`identify` / `file`).
2. Vnitřní vrstva je 1536 × 864 se `transform: scale(1.25)`.
3. Hlavní pohled **nepřetéká** – `scrollHeight` scrollovacího kontejneru
   = jeho `clientHeight`. Ověřit, ne odhadovat pohledem.
4. Evidence toolbar nepřetéká vodorovně – vidět všech 5 pill-tlačítek.
5. Tab strip: vidět všechny záložky modulu včetně poslední.
6. Běžný text ve výsledném obrázku má **~19 px**, ne ~15 px.
