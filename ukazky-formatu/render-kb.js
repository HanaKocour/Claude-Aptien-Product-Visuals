/**
 * Render KB obrázku (formát „KB – článek“, viz ../FORMATY.md).
 *   node render-kb.js kb-3x2-karta.html            → kb-3x2-karta.png
 * Rám #vizual má šířku 850 CSS px, render v hustotě 2× → PNG šířky 1700 px.
 * Výška = výška rámu (16:9 → 478, 3:2 → 567, 4:3 → 638 CSS px).
 * Šablona bere Nunito a Font Awesome z CDN → render potřebuje internet.
 */
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const input = process.argv[2];
  const output = process.argv[3] || input.replace(/\.html$/i, '.png');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(input));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  const frame = page.locator('#vizual');
  const box = await frame.boundingBox();
  if (Math.round(box.width) !== 850) { console.error(`Rám má šířku ${box.width}, čekám 850 CSS px.`); process.exit(1); }
  const okH = [478, 567, 638, 850];
  if (!okH.includes(Math.round(box.height))) console.warn(`⚠️  Výška ${Math.round(box.height)} není 478 / 567 / 638 (16:9 / 3:2 / 4:3) ani 850 (1:1 mobil).`);
  await frame.screenshot({ path: output });
  console.log(`OK → ${output} (${Math.round(box.width) * 2} × ${Math.round(box.height) * 2} px)`);
  await browser.close();
})();
