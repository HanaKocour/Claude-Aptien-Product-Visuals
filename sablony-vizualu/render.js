/**
 * Render šablony vizuálu do PNG 1920 × 1080.
 *
 *   node render.js                              → email-do-aplikace.png
 *   node render.js muj-vizual.html              → muj-vizual.png
 *   node render.js muj-vizual.html vystup.png   → vystup.png
 *
 * Jednorázová příprava (ve složce `sablony-vizualu/`):
 *   npm init -y
 *   npm i -D playwright
 *   npx playwright install chromium
 *
 * Šablona načítá Nunito a Font Awesome z CDN, takže render potřebuje
 * internet. Bez něj se nevykreslí ikony ani písmo.
 *
 * Rám v šabloně je 1920 × 1080 CSS px a uvnitř má vrstvu 1536 × 864
 * se `scale(1.25)`. Screenshot se dělá PŘES ELEMENT `#vizual`, takže
 * výstup je přesně 1920 × 1080 bez ohledu na velikost okna.
 * ⛔ Nikdy nepoužívej `fullPage: true` a neupscaluj menší obrázek.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const input = process.argv[2] || 'email-do-aplikace.html';
  const output = process.argv[3] || input.replace(/\.html$/i, '.png');

  if (!fs.existsSync(input)) {
    console.error(`Soubor ${input} neexistuje.`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  await page.goto('file://' + path.resolve(input));
  await page.waitForLoadState('networkidle');   // fonty + ikony z CDN
  await page.waitForTimeout(600);

  const frame = page.locator('#vizual');
  if (await frame.count() === 0) {
    console.error('V souboru chybí element s id="vizual" (rám 1920×1080).');
    await browser.close();
    process.exit(1);
  }

  // kontrola rámu — měř, neodhaduj
  const box = await frame.boundingBox();
  if (Math.round(box.width) !== 1920 || Math.round(box.height) !== 1080) {
    console.error(`Rám má ${Math.round(box.width)} × ${Math.round(box.height)} px, `
                + 'čekám 1920 × 1080. Zkontroluj .cv-frame a .cv-stage.');
    await browser.close();
    process.exit(1);
  }

  // kontrola přetečení scény (dekorace smí přesahovat, obsah ne)
  const overflow = await page.evaluate(() => {
    const sc = document.querySelector('#vizual .cv-scene');
    if (!sc) return null;
    return { sw: sc.scrollWidth, cw: sc.clientWidth, sh: sc.scrollHeight, ch: sc.clientHeight };
  });
  if (overflow && (overflow.sw > overflow.cw || overflow.sh > overflow.ch)) {
    console.warn(`⚠️  Obsah scény přetéká: ${overflow.sw}×${overflow.sh} `
               + `vs. rám ${overflow.cw}×${overflow.ch}. Uber řádky dat.`);
  }

  // výška vyššího panelu = 70–90 % využitelné výšky (752 px)
  const fill = await page.evaluate(() => {
    const panels = [...document.querySelectorAll('#vizual .cv-panel')];
    if (!panels.length) return null;
    return Math.max(...panels.map(p => p.getBoundingClientRect().height)) / 1.25;
  });
  if (fill !== null) {
    const pct = Math.round((fill / 752) * 100);
    if (pct < 70) console.warn(`⚠️  Nejvyšší panel zaplňuje jen ${pct} % výšky — PŘIDEJ ŘÁDKY DAT.`);
    else if (pct > 90) console.warn(`⚠️  Nejvyšší panel zaplňuje ${pct} % výšky — UBER ŘÁDKY.`);
    else console.log(`Výška panelu: ${pct} % (v pořádku, cíl 70–90 %)`);
  }

  await frame.screenshot({ path: output });
  console.log(`OK → ${output} (1920 × 1080)`);
  await browser.close();
})();
