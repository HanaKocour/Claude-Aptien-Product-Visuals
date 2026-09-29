# Aptien – pravidla pro návodové obrázky do znalostní báze (KB)

Čtvrtý typ produktového vizuálu, vedle čistého screenshotu
(`Aptien-pravidla-screenshotu.md`), kombinovaného vizuálu
(`Aptien-pravidla-kombinovanych-vizualu.md`) a anotovaného vizuálu
(`Aptien-pravidla-anotovanych-vizualu.md`).

**Návodový obrázek** = screenshot části aplikace (dialog, pole, tlačítko)
s **červeným zvýrazněním**, které uživateli ukazuje, kam kliknout.
Patří do článků znalostní báze na `aptien.com/cs/kb`.

| Co | Kde |
|---|---|
| Zdrojová šablona prvků | `Aptien pictures template - 2026.pptx`, slidy 1–13 |
| Prvky pro KB | slide 5 „Elements KB“, slidy 10–11 „KB Screen“ |
| Prvky pro produktové stránky | slide 9 „Elements Product Pages“ |
| Paleta | slide 2 „Paleta 2025“ |

---

## 1. Barva podle místa použití (nejčastější chyba)

| Kam obrázek jde | Barva zvýraznění | Hex |
|---|---|---|
| **Znalostní báze** (KB články, návody) | **červená** | **`#FF0000`** |
| Produktové stránky (web, landing pages) | modrá Indigo A400 | `#3D5AFE` |

⛔ **V KB obrázku nikdy modrý rámeček ani modrá šipka.** Barvy se v jednom
obrázku nemíchají.

⛔ Zvýraznění nesmí mít barvu UI aplikace (akční modrá `#1572e8`,
`#319DE3`, barvy modulů). Splynulo by s aplikací a čtenář by ho četl jako
součást UI.

---

## 2. Rámeček

Rámeček označuje tlačítko, pole nebo přepínač, se kterým má uživatel pracovat.

| Vlastnost | Hodnota |
|---|---|
| Barva obrysu | `#FF0000` |
| Tloušťka | 4 pt (≈ 5 px při 1920 px šířce) |
| Tvar | zaoblený obdélník, jemné zaoblení (~9 % kratší strany) |
| Výplň | žádná, prvek pod rámečkem musí být vidět |
| Stín | měkký černý stín kolem, krytí 40–50 %, rozostření ~20 px, bez posunu |
| Odsazení | pár px kolem prvku, rámeček nesmí překrýt text |

- Jeden rámeček = jeden prvek. Nerámuj celé formuláře, jen to, na co se kliká.
- Zvýraznění je vždy rámeček, ne barevná výplň ani podtržení.

---

## 3. Šipky, čísla kroků, kurzory

| Prvek | Vzhled | Kdy |
|---|---|---|
| Šipka | rovná čára `#FF0000`, 4,5 pt, zakulacené konce, hrot na konci | ukazuje na místo, které není hned vidět |
| Číslo kroku | červené kolečko `#FF0000`, bílé tučné číslo | postup o více krocích v jednom obrázku |
| Kliknutí | ruka-kurzor v červeném kolečku | zdůrazní, že se na místo kliká |
| Kurzor | bílá ruka nebo šipka-kurzor s černým obrysem | přímo na prvku, např. na položce v seznamu |

- Šipky jsou **rovné**, ne zakřivené, a nevedou přes tlačítka ani text.
- Číslo stojí hned vedle rámečku, ke kterému patří. Pořadí = pořadí kroků v textu článku.
- Fialové, šedé a ručně kreslené šipky ze šablony (slidy 5 a 8) jsou
  dekorativní, do návodů nepatří.

---

## 4. Zvětšený detail přes screenshot (vzor: slide 10)

1. Podklad = celý screenshot obrazovky se stínem, aby bylo vidět, kde se uživatel nachází.
2. Důležitou část (např. rozbalený seznam) vyřízni a zvětši zhruba 1,3×.
3. Výřez polož přes původní místo, s červeným rámečkem 4 pt, zaoblenými rohy a stínem.
4. Do výřezu přidej kurzor na položku, kterou má uživatel vybrat.

Screenshot se neřeže natvrdo na hraně okna – vždy je vidět celý dialog
nebo panel i s nadpisem.

---

## 5. Kombinace víc obrazovek do jednoho obrázku

Když postup vede přes dva dialogy (např. výběr formátu → Další nastavení):

- dialogy vedle sebe na světlém pozadí, každý se stínem a zaoblenými rohy,
- rámečky a čísla kroků `1`, `2`, `3` červeně,
- mezi dialogy jedna rovná červená šipka od posledního kroku vlevo k prvnímu vpravo.

---

## 6. Značka

Obrázky pro cizí weby podepisuj šedým logem „by aptien“ nebo „© aptien“
(slidy 3–4). Kde to jde, vektor; PNG jen v připravených velikostech ze šablony.

---

## 7. Checklist před vložením do KB

1. Všechna zvýraznění jsou `#FF0000`, nikde není modrá.
2. Rámečky 4 pt, zaoblené rohy, stín, nepřekrývají text.
3. Šipky jsou rovné a nevedou přes tlačítka.
4. Čísla kroků sedí s pořadím v textu článku.
5. Je vidět celý dialog i s nadpisem, bez osobních údajů.
6. V KB je vyplněný titulek obrázku v češtině i angličtině.

---

## 8. Historie rozhodnutí

- **25. 9. 2026** – obrázek „Nastavení detailu Datum“ vznikl s modrým
  zvýrazněním (barva produktových stránek). **Zamítnuto**: v KB se zvýrazňuje
  výhradně červeně `#FF0000` podle šablony „Elements KB“. Z toho vznikla tato pravidla.
