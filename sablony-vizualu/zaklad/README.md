# Rodina C · Základ – pozadí a písmo

Šablona převzatá z vizuálu „Aptien — Vydávání klíčů v7“ (`aptien_klic_v7.html`).
Bere z něj **jen základ**: dělené pozadí, dekorativní pružinu, logo,
nadpis, podnadpis a pružina dole vlevo. Pravá část je prázdný slot `.zk-obsah`, do
kterého se skládají komponenty (screen, mockup notebooku a telefonu, fotky).

| Soubor | Co to je |
|---|---|
| `zaklad-pozadi-a-pismo.html` | šablona – měníš jen `DATA` (a případně obsah slotu) |
| `zaklad-pozadi-a-pismo.png` | náhled s prázdným slotem |
| `priklad-se-screenem.html/.png` | příklad: slot vyplněný screenshotem aplikace |
| `zaklad-sky.html/.png`, `zaklad-midnight.html/.png` | totéž v tmavých motivech (prázdný slot) |
| `priklad-se-screenem-sky/-midnight` | příklady tmavých motivů se screenem |

## Formát

Web – produktové stránky podle `Claude-Aptien-Product-Visuals/FORMATY.md`:
**1820 × 980**, na web @2x 3640 × 1960 (`SCALE=2 node ../render.js …`).
Původní vizuál měl 1440 × 680 se zaoblenými rohy – převedeno do jednotného formátu,
bez zaoblení a stínu plochy.

## Motivy

Jedna šablona, tři motivy – přepínají se v `DATA.motiv`. Rozvržení, velikosti a písmo jsou ve všech stejné.

| Motiv | Vlevo | Vpravo | Text | Zvýrazněný řádek (`"akcent"`) | Tečka | Podnadpis |
|---|---|---|---|---|---|---|
| `svetly` | `#FFFFFF` | `#F5F3FF` | `#1A0050` | `#6200EA` | `#E602FF` | `#5A4070` |
| `sky` | `#6200EA` (Sky) | `#5300C7` | `#FFFFFF` | `#DDD0FF` | `#FFA200` | `#EDE6FF` |
| `midnight` | `#1A0050` (Midnight) | `#240A63` | `#FFFFFF` | `#B388FF` | `#E602FF` | `#C9BDF2` |

V tmavých motivech je logo bílé (oranžová tečka zůstává), dekorativní pružina vpravo nahoře bílá se 7% krytím a články spodní pružiny
mají jemný světlý obrys, aby článek v barvě pozadí nezmizel.

## Pozadí

- vlevo bílá `#FFFFFF` (sloupec 540 návrhových px = 675 px výstupu),
- vpravo jednolitá `#F5F3FF`,
- pružina z brandových tvarů v pravém horním rohu, krytí 7 % (`dekorace: false` ji vypne),
- ⛔ žádné zaoblené rohy, stín ani gradient plochy.

## Písmo (jen Nunito)

| Prvek | Řez / velikost (návrh) | Barva |
|---|---|---|
| Logo „aptien“ | 900 / 21 px + barevná značka | `#1A0050` |
| Nadpis | 900 / 60 px, řádkování 1,1, prostrkání −1,5 px, 2–3 řádky | `#1A0050`, zvýrazněný řádek `#6200EA` |
| Tečka za nadpisem | stejný řez | `#E602FF` (Magenta) |
| Podnadpis | 600 / 20 px, řádkování 1,4 | `#5A4070` |

**Pružina dole vlevo** (výška 34 návrhových px) – brandový tvar pružiny se 6 články a kolečkem
v pevném pořadí barev: `#3CC47C` `#00B4B4` `#6200EA` `#1A0050` `#E602FF` `#FFA200`, kolečko `#FFCD00`.
Zadní spojky článků mají stejnou barvu s krytím 28 %.

## Historie

- **3. 11. 2026** – založeno podle `aptien_klic_v7.html` (jen pozadí a písmo).
- **3. 11. 2026** – odstraněn štítek modulu pod logem, nadpis posunutý nahoru (z 176 na 136 návrhových px).
- **3. 11. 2026** – přidány tmavé motivy `sky` a `midnight` (`DATA.motiv`); zvýrazněný řádek nadpisu se zadává jako `"akcent"`.
- **3. 11. 2026** – barevné kuličky dole nahrazeny pružinou ve stejných 7 barvách.
