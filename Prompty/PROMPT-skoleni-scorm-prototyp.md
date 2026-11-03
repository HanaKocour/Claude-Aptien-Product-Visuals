# PROMPT – Školení: tvorba v Aptienu + import SCORM (prototyp)

> Pro Claude Design / Claude v repozitáři `Claude-Aptien-Product-Visuals`.
> Výstup: `prototypes/skoleni-scorm-prototyp.html` + `prototypes/skoleni-scorm-prototyp.spec.md`

---

## 0. Nejdřív přečti (nástrojem Read, ne z paměti)

1. `CLAUDE.md`: základní direktiva, barevné role, tlačítka jako pilulky VELKÝMI PÍSMENY, mapa obrazovka → prototyp.
2. `prototypes/Aptien-aplikace-offline.html`, bloky školení:
   - `showSkolAdmin` (Správa školení, menu `skolsprava`)
   - `skolFormOpen` (Přidat školení)
   - `drawerSkolOpen` (detail školení, 5 záložek)
   - `skolDesignOpen` (Návrhář)
   - `showSkolMain` / `skolMineRun` / `skolMineDone` (Moje školení)
   - data `SKOL_TRAININGS`
3. `prototypes/skoleni-tvorba-testu-prototyp.html` + `.spec.md`: editor testu (1 Obsah a otázky · 2 Nastavení · 3 Vyzkoušet). V kroku Nastavení jsou karty Vyhodnocení, Opakované pokusy, Certifikát a platnost.
4. `prototypes/skoleni-proces-smernice-prototyp.html` + `.spec.md`:
   - horní lišta PROCES se žlutou anotací
   - Vyhodnocení (KPI, tabulka lidí, POVOLIT POKUS, Úspěšnost otázek)
   - stavy „Test složen / nesložen · pokus N z M“
5. `prototypes/Aptien-pravidla-pouziti-UI.md`: §5.1, §6.6, §7 (drawer, 7.1.4, 7.2), §9, §12.4 (selectable karta), §13.
6. `prototypes/Aptien-menu-reference.md`: routing `skolsprava` a `skol`.
7. Partials: `sidebar-menu-collapsed.html`, `item-drawer-shell.html`, `mobil-skoleni.html`, `mobil-skoleni-rozbaleno.html`.
8. `Skoleni_podklad_k_zadani.docx`: životní cyklus školení (Koncept / Aktivní / Archivováno) a stavy přiřazení (Nerozesláno → Odesláno → Rozpracováno → Hotovo).

**Při konfliktu platí tento repozitář.** App kit `Claude-HK-Aptien-App` a brand manuál ber jen jako doplněk pro to, co tady definované není.

---

## 1. Cíl

Rozšířit **existující** Správu školení a Moje školení o druhý zdroj obsahu: **SCORM balíček**. Výsledky z obou zdrojů mají být **v jednom formátu podle SCORM**.

**Nestav nový modul ani nový layout.** Vezmi stávající obrazovky školení z master prototypu a z obou standalone prototypů a přidej jen to, co je níže označené jako NOVÉ.

---

## 2. Hlavní rozhodnutí (dodrž)

1. **Zdroj obsahu školení** je jeden ze dvou:
   - **Formulář v Aptienu**: dnešní cesta, tedy materiál (směrnice nebo text) a test v editoru testu nad SurveyJS.
   - **SCORM balíček** (NOVÉ): ZIP ve formátu SCORM 1.2 nebo SCORM 2004 z iSpring, Articulate, Captivate nebo od externího dodavatele.
2. **Všechno ostatní je společné a beze změny:**
   - kategorie, zařazení, opakování
   - příjemci, termín
   - Sdílet zaměstnancům, archivace
   - Moje školení
3. **Pravidla vyhodnocení** se nastavují stejnými kartami jako v kroku *2 · Nastavení* editoru testu: Vyhodnocení, Opakované pokusy, Certifikát a platnost.
   - U SCORM navíc přepínač **„Převzít hranici z balíčku (75 %)“**.
   - Vlastní hranice se použije jen tehdy, když balíček sám nenahlásí passed/failed.
4. **Výsledky** se ukládají podle datového modelu **SCORM 2004 (cmi)**. UI je ukazuje česky ve stávajících stavech Aptienu (viz §4). Pod nimi jsou standardní pole, která se dají exportovat.
5. **Opakované pokusy a jejich záznamy řeší Aptien**, ne SCORM ani SurveyJS. Každý pokus začíná s prázdnými daty. Po přerušení se pokračuje ve stejném pokusu.

---

## 3. Obrazovky

Proveď je jako proces s horní lištou **PROCES** a sbalitelnou žlutou anotací, stejně jako `skoleni-proces-smernice-prototyp.html`. Stav se přenáší mezi kroky.

| # | Role | Obrazovka | Co je NOVÉ |
|---|---|---|---|
| 1 | Správce | **Správa školení – seznam** (`showSkolAdmin`) | U názvu chip zdroje **SCORM 1.2** / **SCORM 2004** podle vzoru chipu `TEST` z tabulky Směrnice. Školení z Aptienu chip nemají. Nepřidávej sloupec. |
| 2 | Správce | **Přidat školení** (`skolFormOpen`, in-page) | Hned za Základní údaje nový blok **„Obsah školení“** se 2 selectable kartami (§12.4): *Vytvořit v Aptienu* / *Nahrát SCORM balíček* (štítek NOVÉ). Po volbě SCORM se v bloku objeví:<br>• upload zóna,<br>• průběh 5 kroků: kontrola ZIP → načtení imsmanifest.xml → zjištění standardu a spouštěcího souboru → rozbalení na úložiště obsahu → testovací spuštění,<br>• shrnutí z manifestu: název, standard, spouštěcí soubor, počet SCO, hranice z balíčku, autorský nástroj,<br>• varování: chybí hranice, více SCO, sequencing.<br>Uložení zůstává „Uložit jako koncept“. |
| 3 | Správce | **Detail školení** (`drawerSkolOpen`) u SCORM | Záložka *Formulář* → **„Obsah“**:<br>• metadata balíčku a verze v Aptienu,<br>• pilulky NAHRÁT NOVOU VERZI a SPUSTIT NÁHLED,<br>• karta pravidel vyhodnocení s odkazem „Upravit“.<br>Záložka *Publikováno* ukazuje historii **verzí balíčku**. Akce v hlavičce: „Editovat formulář“ nahraď „Nastavení vyhodnocení“, ostatní (Publikovat / Sdílet / Archivovat) beze změny. |
| 4 | Správce | **Náhled SCORM** | Stejný rám jako Návrhář (`skolDesignOpen`): zatmavené pozadí a plovoucí karta.<br>• Vlevo simulovaný obsah balíčku v iframe: 3 snímky a 2 otázky.<br>• Vpravo sbalitelný panel **„Pro vývojáře – komunikace se SCORM“** s logem volání (`LMSSetValue` / `SetValue`).<br>• Po dokončení výsledek ve stejném formátu jako test z Aptienu. |
| 5 | Zaměstnanec | **Moje školení** (`showSkolMain`) | SCORM školení je v seznamu K vyplnění se stejnými štítky termínu. U rozpracovaného místo „X z Y“ text „Rozpracováno · naposledy 5. 10.“ a tlačítko POKRAČOVAT.<br>**Běh** je in-page varianta `skolMineRun`: lišta s názvem, ULOŽIT A ZAVŘÍT a pod ní obsah balíčku přes celou plochu.<br>**Konec** je `skolMineDone` s výsledkem:<br>• skóre,<br>• Složeno / Nesloženo,<br>• pokus N z M,<br>• CERTIFIKÁT nebo ZKUSIT ZNOVU. |
| 6 | Správce | **Vyhodnocení** (záložka *Zaměstnanci* v draweru) | KPI jako krok 6 v `skoleni-proces-smernice`. **Jedna tabulka pro oba zdroje**, sloupce podle §4. Klik na řádek otevře detail pokusů:<br>• historie pokusů,<br>• odpovědi (otázka, odpověď, správně/špatně),<br>• sbalené „Původní data ze SCORM“ pro vývojáře.<br>Panel *Úspěšnost otázek* funguje u obou zdrojů, u SCORM z `interactions`. Akce POVOLIT POKUS a EXPORT. |
| 7 | Zaměstnanec | **Mobil** (`mobil-skoleni`) | SCORM školení je v seznamu se stejnými stavy. Jestli půjde spustit na telefonu, zapiš jako otevřenou otázku. Prototyp ukáže štítek „Doporučeno na počítači“. |

---

## 4. Formát výsledků (povinné)

**Česky v UI, standardní pole pod tím:**

| Sloupec v UI | Hodnoty v UI | Pole (SCORM 2004) |
|---|---|---|
| Stav | Nerozesláno · Odesláno → `not attempted` · Rozpracováno → `incomplete` · Hotovo → `completed` | `completion_status` |
| Výsledek | Složeno / Nesloženo / — | `success_status` = passed / failed / unknown |
| Skóre | „85 % · 17/20 b.“ | `score.scaled` + `raw` / `max` |
| Pokus | „2 z 3“ | Aptien (číslo pokusu, max. pokusů) |
| Čas | „14 min 10 s“ | `total_time` (ISO 8601, `PT14M10S`) |
| Dokončeno / Platnost certifikátu | datum | Aptien |
| Odpovědi (detail) | otázka · odpověď · Správně/Špatně | `interactions[]`: id, type, learner_response, result |

**Převody:**

- **SCORM 1.2 → 2004:**
  - `lesson_status` passed/failed/completed → completed; incomplete/browsed → incomplete
  - passed/failed → `success_status`; jinak se úspěch rozhodne podle hranice skóre
  - `score.raw/min/max` → `scaled`
  - čas `HHHH:MM:SS.SS` → ISO
  - result `wrong` → `incorrect`
- **Test z Aptienu:**
  - Hotovo = prošlé všechny povinné kroky
  - Složeno = body ≥ hranice
  - typy otázek: Jedna odpověď → `choice`, Více odpovědí → `choice`, Ano/Ne → `true-false`
  - Text/obsah a Obrázek nejsou otázky, interakci nevytváří
- **Splněno** = Hotovo + Složeno. U školení bez testu, nebo při volbě „Stačí dokončení“, stačí Hotovo. Platnost a certifikát se počítají od posledního splněného pokusu.

---

## 5. Data a persony

- Zaměstnanec **Karolína Fišerová** (Personalistka), správce podle master prototypu.
- Ponech `SKOL_TRAININGS` a přidej:
  - **Požární ochrana – periodické**: SCORM 1.2, iSpring Suite, hranice 75 %, opakovaně každý rok.
  - **GDPR pro zaměstnance**: SCORM 2004, Articulate Rise, hranice 80 %, každé 2 roky.
- 8–10 pokusů napříč školeními: úspěšné, nesložené s druhým pokusem, rozpracované, nezahájené, po termínu. Řádek Karolíny odpovídá tomu, jak dopadl její průchod v kroku 5.

---

## 6. Technika

- Jeden soubor, vanilla JS, stav v paměti, bez localStorage.
- Písmo **Nunito**, subset latin + čeština.
- Ikony menu jako inline SVG z prototypu (`SVG_ICONS`), ne FA Free. Ikony obsahu z FA 6 Free jako v prototypu testu.
- Top bar `#424242`, sidebar sbalený (`sidebar-menu-collapsed.html`), akce `#1572e8`, tlačítka jako pilulky VELKÝMI PÍSMENY.
- Ověř v Playwright: celý proces 1–7 bez chyb v konzoli, mobil na šířce 390 px.

**Záměrně neřeš:** skutečný upload a rozbalení, SCORM 2004 sequencing, balíčky s více SCO, cmi5/xAPI.

---

## 7. Spec (`skoleni-scorm-prototyp.spec.md`)

Ve stejném formátu jako `skoleni-proces-smernice-prototyp.spec.md`: Hlavní rozhodnutí · Kroky (tabulka) · Formát výsledků · Otevřené otázky · Prompt pro další iteraci.

**Otevřené otázky, které tam musí být:**

- Lze zdroj obsahu změnit po vytvoření školení?
- Má jít za SCORM kurz přidat ještě test z Aptienu?
- Kde nabízet SCORM: jen v Přidat školení, nebo i jako 5. karta v „Jak chcete test vytvořit?“?
- Nová verze balíčku: návrh je, že rozpracované pokusy doběhnou ve staré verzi. Rozeslat novou verzi znovu?
- Spouštění SCORM na mobilu.

---

## 8. Kontrola před odevzdáním

- [ ] Obrazovky školení odpovídají master prototypu 1:1, nové jsou jen části označené v §3.
- [ ] Menu kompletní, aktivní jen Správa školení (správce) nebo Moje školení (zaměstnanec).
- [ ] Barevné role a tlačítka podle `CLAUDE.md`, žádné nové barvy. Chip SCORM má styl existujícího chipu.
- [ ] Výsledky z Aptienu i ze SCORM jsou v jedné tabulce ve formátu §4.
- [ ] Proces 1–7 se dá proklikat a stav se přenáší (Karolínin výsledek je vidět ve Vyhodnocení).
- [ ] Bez chyb v konzoli, velikost souboru v řádu ostatních prototypů.

---

## Prompt pro další iteraci

> Vycházej z `skoleni-scorm-prototyp.html` a jeho spec. Drž `CLAUDE.md` a pravidla UI (§6.6, §7, §12.4, §13). Měň jen to, co uvedu, a nakonec projdi všech 7 kroků a porovnej je se spec.
> **Zadání:** […]
