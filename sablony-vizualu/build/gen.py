#!/usr/bin/env python3
"""Generuje rodinu šablon „datové grafiky" (data-*.html) pro web Aptien.
Každý výstupní soubor je samostatný: vzhled je zmrazený v CSS/JS,
obsah se mění jen v bloku `const DATA = {...}` na začátku <script>."""
import json, os
LOGO = open('logo_path.txt').read().strip()

HEAD = '''<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<!--
  ŠABLONA VIZUÁLU · RODINA „DATOVÁ GRAFIKA" · {title}
  ==========================================================================
  Tvary a skladba: „Aptien pictures template - 2026.pptx"
  ({zdroj}). Barvy, fonty a logo = Claude-Aptien-Brand-Manual (aptien_brand_brief.md).

  TOHLE NENÍ PROTOTYP UI. Šablona říká, jak vypadá OBRÁZEK. Vzhled je
  hotový a zmrazený — měníš JEN objekt `DATA` v <script> dole.

  JAK POUŽÍT
  1. Zkopíruj soubor pod novým názvem (např. `nis2-{slug}.html`).
  2. Přepiš jen hodnoty v `const DATA = {{…}}`  (✏️ MĚŇ).
  3. node render.js nis2-{slug}.html   → PNG přesně 1820 × 980.

  ✏️ CO SE MĚNÍ (vše v DATA)
{mene}
  ⛔ CO SE NEMĚNÍ
  ⛔ Rám `.dg-frame` 1820×980 = rovnou bílá karta: rovné rohy, bez šedé plochy
     a bez stínu (rozhodnuto 3. 11. 2026). `.dg-stage` 1456×784 se `scale(1.25)`.
  ⛔ Karta je vždy bílá — nikdy se nebarví.
  ⛔ Nadpis Nunito 900 / 60 px, Midnight `#1A0050`, za ním Amber tečka (brand detail), max 2 řádky. Nezmenšuj — zkrať text.
  ⛔ Popisky grafiky Poppins (jako v pptx), čísla Nunito 900.
  ⛔ Barvy jen z brand palety `--c1…--c6` v pevném pořadí; nové barvy nezaváděj.
  ⛔ Žádné konfety, tahy štětcem, jiskry ani gradientové pozadí plochy
     (zamítnuto 12. 8. 2026 v sablony-vizualu/README.md).
  ⛔ Fakta (lhůty, čísla) vždy s řádkem `zdroj` — bez zdroje číslo nepublikuj.
{extra}-->
<style>
  :root{{
    /* Paleta 2025 (pptx, slide 2) — pořadí je pevné */
    --c1:#6200EA;  /* Sky — hlavní */
    --c2:#00B4B4;  /* Teal */
    --c3:#1DB87A;  /* Emerald */
    --c4:#FFA200;  /* Amber */
    --c5:#E602FF;  /* Magenta */
    --c6:#3660FF;  /* Blue */
    --ink:#1A0050; /* Midnight — text */
    --muted:#7D90A6;
    --title:#1A0050;
    --step:#3660FF;/* Blue — čísla kroků */
    --bg:#f4f4f7;
  }}
  body{{margin:0;background:#dedde4}}
  .dg-frame{{width:1820px;height:980px;overflow:hidden;position:relative;background:#fff}}
  .dg-stage{{width:1456px;height:784px;transform:scale(1.25);transform-origin:top left;position:relative;
            background:#fff;font-family:'Poppins',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}}
  .dg-card{{position:absolute;left:0;top:0;width:1456px;height:784px;box-sizing:border-box;background:#fff;
           border-radius:0;box-shadow:none;padding:52px 64px;overflow:hidden}}
  .dg-title{{font-family:'Nunito',sans-serif;font-weight:900;font-size:60px;line-height:1.08;letter-spacing:-.015em;
            color:var(--title);margin:0;max-width:1100px}}
  .dg-title:after{{content:"";display:inline-block;width:.2em;height:.2em;border-radius:50%;background:#FFA200;margin-left:.08em;vertical-align:baseline}}
  .dg-sub{{font-size:20px;font-weight:500;color:#5b5675;margin-top:12px;max-width:1000px;line-height:1.5}}
  .dg-src{{position:absolute;right:170px;bottom:30px;text-align:right;font-size:12px;font-weight:500;color:var(--muted)}}
  .dg-logo{{position:absolute;right:56px;bottom:24px;height:24px}}
{css}
</style>
</head>
<body>
<section class="dg-frame" id="vizual"><div class="dg-stage"><div class="dg-card">
  <h1 class="dg-title" id="t"></h1>
  <div class="dg-sub" id="s"></div>
{body}
  <div class="dg-src" id="src"></div>
  <img class="dg-logo" src="../assets/aptien-logo.png" alt="aptien">
</div></div></section>
<script>
/* ✏️ MĚŇ — jen tento objekt */
const DATA = {data};
/* ⛔ odsud dál neměnit */
const $=id=>document.getElementById(id);
const PAL=['var(--c1)','var(--c2)','var(--c3)','var(--c4)','var(--c5)','var(--c6)'];
const HEX=['#6200EA','#00B4B4','#1DB87A','#FFA200','#E602FF','#3660FF'];
const TINT=['#F5F3FF','#e0f6f6','#e4f7ef','#fff4e0','#fde6ff','#e8edff'];
$('t').textContent=DATA.nadpis; $('s').textContent=DATA.podnadpis||''; if(!DATA.podnadpis) $('s').remove();
$('src').textContent=DATA.zdroj?('Zdroj: '+DATA.zdroj):'';
{js}
</script>
</body>
</html>
'''

def make(fname, title, slug, zdroj, mene, extra, css, body, js, data):
    html = HEAD.format(title=title, slug=slug, zdroj=zdroj, mene=mene, extra=extra, css=css,
                       body=body, js=js, logo=LOGO,
                       data=json.dumps(data, ensure_ascii=False, indent=2))
    open(fname, 'w', encoding='utf-8').write(html)

# ───────────────────────── A · CYKLUS ─────────────────────────
make('data-cyklus.html', 'Cyklus (kolo)', 'cyklus-rizik',
 'slidy 95, 101, 104 „Správa majetku", „GRC"',
 '''  ✏️ nadpis, podnadpis, zdroj
  ✏️ stred        – text uprostřed kola (max 2 řádky, \\n = zalomení)
  ✏️ obvod        – text na vnějším prstenci (max ~40 znaků)
  ✏️ segmenty     – 4–6 položek {text, popis}; text max 2 řádky po ~11 znacích
''', '''  ⛔ 4–6 segmentů. Míň = není to cyklus, víc = nečitelné.
  ⛔ Barvy segmentů jdou po paletě c1→c6 ve směru hodinových ručiček.
''',
 '''  .cy{position:absolute;left:44px;top:168px;width:560px;height:560px}
  .cy-leg{position:absolute;left:680px;top:200px;right:64px;display:flex;flex-direction:column;gap:20px}
  .cy-it{display:flex;gap:18px;align-items:flex-start}
  .cy-n{width:40px;height:40px;border-radius:50%;color:#fff;font-weight:800;font-size:17px;display:flex;
        align-items:center;justify-content:center;flex-shrink:0}
  .cy-it b{display:block;font-size:23px;font-weight:700;color:var(--ink);line-height:1.3}
  .cy-it span{display:block;font-size:16px;font-weight:500;color:#5b5675;margin-top:3px;line-height:1.45}''',
 '''  <svg class="cy" id="cy" viewBox="0 0 600 600"></svg>
  <div class="cy-leg" id="leg"></div>''',
 '''const S=DATA.segmenty, n=S.length, cx=300, cy=300, R=232, r=128, gap=2.2, ns='http://www.w3.org/2000/svg';
const svg=$('cy'); const P=(a,rad)=>[cx+rad*Math.cos((a-90)*Math.PI/180), cy+rad*Math.sin((a-90)*Math.PI/180)];
const el=(t,a)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
el('circle',{cx,cy,r:285,fill:'none',stroke:'#DDD0FF',"stroke-width":34});
el('path',{id:'ob',d:`M ${cx-285} ${cy} A 285 285 0 0 1 ${cx+285} ${cy}`,fill:'none'});
const tp=el('text',{"font-family":'Poppins',"font-weight":700,"font-size":17,fill:'#1A0050',"text-anchor":'middle',dy:6});
const tpp=document.createElementNS(ns,'textPath');tpp.setAttribute('href','#ob');tpp.setAttribute('startOffset','50%');tpp.textContent=DATA.obvod;tp.appendChild(tpp);
S.forEach((s,i)=>{const a0=i*360/n+gap, a1=(i+1)*360/n-gap, big=(a1-a0)>180?1:0, tip=7;
  const [x0,y0]=P(a0,R),[x1,y1]=P(a1,R),[x2,y2]=P(a1+tip,(R+r)/2),[x3,y3]=P(a1,r),[x4,y4]=P(a0,r),[x5,y5]=P(a0+tip,(R+r)/2);
  el('path',{d:`M${x0} ${y0} A${R} ${R} 0 ${big} 1 ${x1} ${y1} L${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 ${big} 0 ${x4} ${y4} L${x5} ${y5} Z`,fill:HEX[i]});
  const am=(a0+a1)/2+2,[tx,ty]=P(am,(R+r)/2), lines=s.text.split('\\n');
  const t=el('text',{x:tx,y:ty-(lines.length-1)*11.5,"text-anchor":'middle',"dominant-baseline":'middle',fill:'#fff',"font-family":'Poppins',"font-weight":700,"font-size":20});
  lines.forEach((l,k)=>{const sp=document.createElementNS(ns,'tspan');sp.setAttribute('x',tx);sp.setAttribute('dy',k?23:0);sp.textContent=l;t.appendChild(sp)});
  $('leg').insertAdjacentHTML('beforeend',`<div class="cy-it"><div class="cy-n" style="background:${HEX[i]}">${i+1}</div><div><b>${s.text.replace('\\n',' ')}</b><span>${s.popis}</span></div></div>`);});
const lines=DATA.stred.split('\\n'); const t=el('text',{x:cx,y:cy-(lines.length-1)*23,"text-anchor":'middle',"dominant-baseline":'middle',fill:'#1A0050',"font-family":'Nunito',"font-weight":900,"font-size":46});
lines.forEach((l,k)=>{const sp=document.createElementNS(ns,'tspan');sp.setAttribute('x',cx);sp.setAttribute('dy',k?46:0);sp.textContent=l;t.appendChild(sp)});''',
 {"nadpis":"Řízení rizik podle NIS2","podnadpis":"","stred":"Řízení\nrizik","obvod":"Průběžně, nejméně jednou ročně",
  "segmenty":[
   {"text":"Aktiva","popis":"Primární a podpůrná aktiva s vazbami"},
   {"text":"Hrozby","popis":"Katalogy hrozeb a zranitelností podle vyhlášky NÚKIB"},
   {"text":"Hodnocení","popis":"Dopad × pravděpodobnost v registru rizik"},
   {"text":"Opatření","popis":"Prohlášení o aplikovatelnosti a Plán zvládání rizik"},
   {"text":"Kontrola","popis":"Interní audity a hlídání termínů"}],
  "zdroj":"zákon č. 264/2025 Sb."})

# ───────────────────────── B · POSTUP ─────────────────────────
make('data-postup.html', 'Postup v krocích', 'postup',
 'slide 64 „Postup", slide 68 „Základní nastavení → Přizpůsobení → Vývoj na míru"',
 '''  ✏️ nadpis, podnadpis, zdroj
  ✏️ kroky        – 3–5 položek {ikona (Font Awesome bez „fa-"), titul, text, lhuta}
                    lhuta je nepovinná (chip s číslem / termínem)
''', '''  ⛔ 3–5 kroků. Čísla kroků vždy `--step #3D5AFE` (jako v pptx), ikony v paletě.
''',
 '''  .ps{position:absolute;left:64px;right:64px;top:262px;display:flex;align-items:stretch;gap:0}
  .ps-col{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 10px;position:relative}
  .ps-n{width:46px;height:46px;border-radius:50%;background:var(--step);color:#fff;font-weight:800;font-size:19px;
        display:flex;align-items:center;justify-content:center;position:relative;z-index:2}
  .ps-line{position:absolute;top:22px;left:calc(50% + 34px);right:calc(-50% + 34px);height:3px;background:var(--step);opacity:.9}
  .ps-line:after{content:"";position:absolute;right:-2px;top:-6px;border-left:12px solid var(--step);border-top:7.5px solid transparent;border-bottom:7.5px solid transparent}
  .ps-ic{width:132px;height:132px;border-radius:32px;display:flex;align-items:center;justify-content:center;margin-top:34px;font-size:58px}
  .ps-col b{font-size:24px;font-weight:700;margin-top:24px;line-height:1.3;color:var(--ink)}
  .ps-col span{font-size:16px;font-weight:500;color:#5b5675;margin-top:8px;line-height:1.5;max-width:250px}
  .ps-chip{margin-top:18px;font-family:'Nunito',sans-serif;font-weight:900;font-size:46px;border-radius:16px;padding:8px 22px}''',
 '''  <div class="ps" id="ps"></div>''',
 '''DATA.kroky.forEach((k,i,a)=>{$('ps').insertAdjacentHTML('beforeend',`<div class="ps-col">
  <div class="ps-n">${i+1}</div>${i<a.length-1?'<div class="ps-line"></div>':''}
  <div class="ps-ic" style="background:${TINT[i]};color:${HEX[i]}"><i class="fa-solid fa-${k.ikona}"></i></div>
  <b>${k.titul}</b><span>${k.text}</span>
  ${k.lhuta?`<div class="ps-chip" style="background:${TINT[i]};color:${HEX[i]}">${k.lhuta}</div>`:''}</div>`)});''',
 {"nadpis":"Cesta k souladu s NIS2","podnadpis":"Od oznámení služby po pravidelnou kontrolu.",
  "kroky":[
   {"ikona":"file-signature","titul":"Oznámení služby","text":"Oznámení regulované služby NÚKIB","lhuta":"60 dní"},
   {"ikona":"address-card","titul":"Kontaktní údaje","text":"Kontaktní a technické údaje po registraci","lhuta":"30 dní"},
   {"ikona":"shield-halved","titul":"Bezpečnostní opatření","text":"Zavedení opatření od doručení rozhodnutí o registraci","lhuta":"1 rok"},
   {"ikona":"triangle-exclamation","titul":"Hlášení incidentů","text":"Povinnost hlásit kybernetické incidenty","lhuta":"1 rok"}],
  "zdroj":"zákon č. 264/2025 Sb., § 6, § 11, § 13, § 15"})

# ───────────────────────── C · ČASOVÁ OSA ─────────────────────────
make('data-casova-osa.html', 'Časová osa lhůt', 'casova-osa',
 'slidy 106–107 „Continuous Risk Management", slide 70 audit timeline',
 '''  ✏️ nadpis, podnadpis, zdroj
  ✏️ start        – {titul, text} — výchozí událost (šedý bod vlevo)
  ✏️ milniky      – 2–4 položky {hodnota (krátce: „24 h"), titul, text}
''', '''  ⛔ Hodnota v kruhu max ~6 znaků. První milník je nejnaléhavější → nejsytější.
''',
 '''  .tl{position:absolute;left:64px;right:64px;top:270px;height:420px}
  .tl-track{position:absolute;left:30px;right:30px;top:86px;height:10px;border-radius:999px;background:#ece9f4;overflow:hidden;display:flex}
  .tl-row{position:absolute;left:0;right:0;top:0;display:flex;justify-content:space-between}
  .tl-pt{width:240px;display:flex;flex-direction:column;align-items:center;text-align:center}
  .tl-dot{width:178px;height:178px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;
          font-family:'Nunito',sans-serif;font-weight:900;font-size:54px;box-shadow:0 10px 26px rgba(26,0,80,.18);border:8px solid #fff}
  .tl-start{width:178px;height:178px;display:flex;align-items:center;justify-content:center}
  .tl-start i{width:64px;height:64px;border-radius:50%;background:#fff;border:8px solid var(--muted);display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--muted);font-style:normal}
  .tl-pt b{font-size:24px;font-weight:700;margin-top:22px;line-height:1.3}
  .tl-pt span{font-size:16px;font-weight:500;color:#5b5675;margin-top:6px;line-height:1.5}''',
 '''  <div class="tl"><div class="tl-track" id="tr"></div><div class="tl-row" id="tl"></div></div>''',
 '''const M=DATA.milniky, C=['#E53935','var(--c1)','var(--c6)','var(--c2)'];
$('tl').insertAdjacentHTML('beforeend',`<div class="tl-pt"><div class="tl-start"><i class="fa-solid fa-bolt"></i></div><b>${DATA.start.titul}</b><span>${DATA.start.text}</span></div>`);
M.forEach((m,i)=>{$('tl').insertAdjacentHTML('beforeend',`<div class="tl-pt"><div class="tl-dot" style="background:${C[i]}">${m.hodnota}</div><b>${m.titul}</b><span>${m.text}</span></div>`);
  $('tr').insertAdjacentHTML('beforeend',`<div style="flex:1;background:${C[i]};opacity:${1-i*.12}"></div>`)});''',
 {"nadpis":"Lhůty pro hlášení incidentu","podnadpis":"Aptien hlídá každou lhůtu a upozorní řešitele předem.",
  "start":{"titul":"Zjištění incidentu","text":"začíná běžet lhůta"},
  "milniky":[
   {"hodnota":"24 h","titul":"Úvodní hlášení","text":"od zjištění incidentu"},
   {"hodnota":"72 h","titul":"Aktualizace","text":"a předběžné posouzení"},
   {"hodnota":"30 dní","titul":"Závěrečná zpráva","text":"od hlášení do 72 h"}],
  "zdroj":"zákon č. 264/2025 Sb., § 16"})

# ───────────────────────── D · ČÍSLOVANÝ SEZNAM ─────────────────────────
make('data-cislovany-seznam.html', 'Číslovaný seznam', 'seznam',
 'slide 112 „Co naši zákazníci nejvíce oceňují?"',
 '''  ✏️ nadpis, podnadpis, zdroj
  ✏️ polozky      – 4–7 položek {titul, text}; text je nepovinný
''', '''  ⛔ Max 7 položek. Tmavá karta má pevný gradient z pptx — nebarvi podle modulu.
''',
 '''  
  .ls-card{position:absolute;right:64px;top:52px;bottom:70px;width:760px;box-sizing:border-box;border-radius:22px;
           background:linear-gradient(135deg,#1A0050 0%,#3a0ca3 100%);padding:34px 44px;display:flex;flex-direction:column;justify-content:space-evenly}
  .ls-it{display:flex;align-items:center;gap:26px}
  .ls-n{font-family:'Poppins',sans-serif;font-weight:800;font-size:44px;width:48px;color:#FFCD00;line-height:1;text-align:center;flex-shrink:0}
  .ls-it b{display:block;color:#fff;font-size:23px;font-weight:600;line-height:1.3}
  .ls-it span{display:block;color:#b9b4e8;font-size:14px;font-weight:500;margin-top:2px}''',
 '''  <div class="ls-card" id="ls"></div>''',
 '''$('t').style.maxWidth='520px'; $('s').style && ($('s').style.maxWidth='520px');
DATA.polozky.forEach((p,i)=>$('ls').insertAdjacentHTML('beforeend',`<div class="ls-it"><div class="ls-n">${i+1}</div><div><b>${p.titul}</b>${p.text?`<span>${p.text}</span>`:''}</div></div>`));''',
 {"nadpis":"Co NIS2 vyžaduje doložit","podnadpis":"Všechno vedete v Aptienu na jednom místě a auditor to najde hned.",
  "polozky":[
   {"titul":"Registr aktiv","text":"primární a podpůrná aktiva s vazbami"},
   {"titul":"Analýza a registr rizik","text":"hrozby, zranitelnosti, hodnocení"},
   {"titul":"Prohlášení o aplikovatelnosti","text":""},
   {"titul":"Plán zvládání rizik","text":"opatření, odpovědnosti, termíny"},
   {"titul":"Bezpečnostní politika a směrnice","text":"včetně potvrzení seznámení"},
   {"titul":"Záznamy o incidentech","text":"a jejich hlášení NÚKIB"},
   {"titul":"Kontroly a interní audity","text":"s nápravnými opatřeními"}],
  "zdroj":""})

# ───────────────────────── E · SCREEN + ČÍSLA ─────────────────────────
make('data-screen-a-cisla.html', 'Screenshot + datové karty', 'screen-a-cisla',
 'slidy 23–27 (screen + bílá karta s daty), slide 36 „Facility Manager"',
 '''  ✏️ nadpis, podnadpis, zdroj
  ✏️ screen       – cesta k PNG ze skutečné instance (1:1, poměr ~3:2)
  ✏️ karty        – 2–3 položky {cislo, text}
''', '''  ⛔ Screenshot je skutečné UI (PNG ze skutečné instance nebo render z
     prototypes/partials). Nikdy kresba z hlavy. Orýzne ho karta dole — záměr.
  ⛔ Čísla jen fakta se zdrojem nebo skutečná data ze screenshotu.
''',
 '''  .sc-shot{position:absolute;left:64px;top:200px;width:860px;border-radius:14px;border:1px solid #e6e4ee;
           box-shadow:0 22px 60px rgba(30,27,46,.18);overflow:hidden;background:#fff}
  .sc-shot img{display:block;width:100%}
  .sc-k{position:absolute;right:64px;top:200px;width:400px;display:flex;flex-direction:column;gap:22px}
  .sc-card{background:#fff;border-radius:18px;padding:22px 26px;box-shadow:0 10px 30px rgba(26,0,80,.10);border:1px solid #efedf6;
           display:flex;align-items:center;gap:20px}
  .sc-bar{width:8px;align-self:stretch;border-radius:8px;flex-shrink:0}
  .sc-card b{display:block;font-family:'Nunito',sans-serif;font-weight:900;font-size:56px;line-height:1}
  .sc-card span{display:block;font-size:18px;font-weight:600;color:var(--ink);margin-top:8px;line-height:1.4}''',
 '''  <div class="sc-shot"><img id="img" alt=""></div>
  <div class="sc-k" id="k"></div>''',
 '''$('img').src=DATA.screen; $('img').alt=DATA.nadpis;
DATA.karty.forEach((k,i)=>$('k').insertAdjacentHTML('beforeend',`<div class="sc-card"><div class="sc-bar" style="background:${HEX[i]}"></div><div><b style="color:${HEX[i]}">${k.cislo}</b><span>${k.text}</span></div></div>`));''',
 {"nadpis":"Hlídání povinností NIS2","podnadpis":"",
  "screen":"../assets/ukazka-screen.png",
  "karty":[
   {"cislo":"až 60 %","text":"papírování kolem NIS2 zautomatizováno"},
   {"cislo":"15","text":"regulovaných odvětví"},
   {"cislo":"1. 11. 2025","text":"účinnost nového zákona o kybernetické bezpečnosti"}],
  "zdroj":"zákon č. 264/2025 Sb.; aptien.com"})
make('data-pred-a-po.html', 'Před a po', 'pred-a-po',
 'slide 113 (Excel/šanony), slide 116 „Manažer dostane přehled jednom místě"',
 """  ✏️ nadpis, podnadpis, zdroj
  ✏️ pred / po    – {stitek, polozky[3–5]}; položka = krátká věta (max ~40 znaků)
""", """  ⛔ Vlevo vždy „bez Aptienu" (šedá, křížky), vpravo „s Aptienem" (c1, fajfky).
  ⛔ Stejný počet položek v obou sloupcích, položky si odpovídají po řádcích.
""",
 """  .pp{position:absolute;left:64px;right:64px;top:230px;bottom:84px;display:flex;gap:0;align-items:stretch}
  .pp-col{flex:1;border-radius:22px;padding:30px 36px;display:flex;flex-direction:column}
  .pp-a{background:#f3f2f7}
  .pp-b{background:linear-gradient(135deg,#6200EA,#9D46FF);color:#fff;box-shadow:0 16px 40px rgba(98,0,234,.28)}
  .pp-tag{font-size:15px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px}
  .pp-a .pp-tag{color:var(--muted)} .pp-b .pp-tag{color:#e3d4ff}
  .pp-it{display:flex;align-items:center;gap:16px;font-size:21px;font-weight:600;line-height:1.3;flex:1;border-top:1px solid rgba(125,144,166,.18)}
  .pp-b .pp-it{border-top-color:rgba(255,255,255,.18)}
  .pp-it i{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
  .pp-a .pp-it{color:#6e6885} .pp-a .pp-it i{background:#e4e1ec;color:#9a94ae}
  .pp-b .pp-it i{background:#1DB87A;color:#fff}
  .pp-arr{width:64px;display:flex;align-items:center;justify-content:center;color:var(--c1);font-size:34px}""",
 """  <div class="pp"><div class="pp-col pp-a" id="a"></div><div class="pp-arr"><i class="fa-solid fa-arrow-right"></i></div><div class="pp-col pp-b" id="b"></div></div>""",
 """const fill=(id,o,ic)=>{$(id).insertAdjacentHTML('beforeend',`<div class="pp-tag">${o.stitek}</div>`+o.polozky.map(p=>`<div class="pp-it"><i class="fa-solid fa-${ic}"></i>${p}</div>`).join(''))};
fill('a',DATA.pred,'xmark'); fill('b',DATA.po,'check');""",
 {"nadpis":"NIS2 bez šanonů a Excelu","podnadpis":"",
  "pred":{"stitek":"Bez Aptienu","polozky":["Registr rizik v Excelu","Směrnice v šanonech","Lhůty hlídá člověk v kalendáři","Důkazy pro audit dohledáváte týden"]},
  "po":{"stitek":"S Aptienem","polozky":["Předpřipravený registr rizik","Směrnice s potvrzením seznámení","Hlídače lhůt upozorní předem","Důkazy pro auditora na jednom místě"]},
  "zdroj":""})
print('ok')
