# Prompty pro nové screenshoty — článek „Jak používat organizér pracovních pozic“

Zdroj: https://aptien.com/cs/kb/articles/how-to-use-job-positions-organizer

**Jak použít:** Pro každý obrázek níže vezmi pevnou hlavičku šablony z
`prototypes/prompt-sablona-aptien.md` (POSTUP + ROZLIŠENÍ A HUSTOTA UI +
PRAVIDLA + KONTROLA PŘED DOKONČENÍM — beze změny) a za ni vlož příslušnou
sekci „MOJE KONKRÉTNÍ ZADÁNÍ“ z tohoto souboru. Jeden prompt = jeden
vygenerovaný obrázek.

Modal „Upravit pracovní pozici“ má dnes **12 záložek** (víc než starých 7
screenshotů v článku), protože byl mezitím přepracován — viz poznámka v
projektu `kombinovane-vizualy.md`. Proto je tu 12 promptů pro záložky +
1 pro tabulku katalogu = **13 obrázků**. Použitá vzorová pozice je všude
stejná — **„Administrativní pracovník“** — protože přesně ta je už jako
konzistentní ukázková data připravená přímo v aktuálních partials
(`prototypes/partials/nastorg-pozice-*.html`), takže se nic nevymýšlí navíc,
jen se místy doplní realistická data tam, kde má partial jen placeholder
(`---` / prázdné pole).

## Mapování: starý obrázek → nová sekce → prompt

| # | Starý soubor v článku | Nová sekce (záložka v modalu) | Zdrojový partial | Poznámka |
|---|---|---|---|---|
| 1 | `katalog-pracovnich-pozic.jpg` | Katalog pracovních pozic (tabulka) | `nastorg-pracovni-pozice.html` | 1:1 náhrada |
| 2 | `detaily-popisu-pracovniho-mista.png` | Základní info | `nastorg-pozice-zakladni.html` | 1:1 náhrada |
| — | *(nemělo obrázek)* | Přiřazení zaměstnanci | `nastorg-pozice-prirazeni.html` | nový obrázek |
| 3 | `popis-pracovni-pozice-organizacni-zarazeni.png` | Organizační zařazení | `nastorg-pozice-organizacni.html` | 1:1 náhrada |
| 4 | `popis-pracovni-pozice-pracovni-napln.png` | Pracovní náplň | `nastorg-pozice-naplne.html` | 1:1 náhrada |
| 5 | `popis-pracovni-pozice-kvalifikace.png` | Požadavky na kvalifikaci | `nastorg-pozice-kvalifikace.html` | 1:1 náhrada (dřív jedna záložka „kvalifikace a způsobilost“, dnes rozdělená) |
| — | *(součást starého obr. 5)* | Požadavky na způsobilost | `nastorg-pozice-zpusobilost.html` | nový/oddělený obrázek |
| 6 | `popis-pracovni-pozice-dalsi-pozadavky.png` | Vybavení, nástroje, systémy | `nastorg-pozice-vybaveni.html` | 1:1 náhrada (starý partial `nastorg-pozice-pozadavky.html` je nahrazen tímto) |
| 7 | `popis-pracovni-pozice-bezpecnostni-a-zdravotni-rizika.png` | Pracoviště a rizika | `nastorg-pozice-rizika.html` | 1:1 náhrada |
| — | *(nemělo obrázek)* | Dokumenty | `nastorg-pozice-dokumenty.html` | nový obrázek |
| — | *(nemělo obrázek)* | Školení | `nastorg-pozice-skoleni.html` | nový obrázek |
| — | *(nemělo obrázek)* | Onboarding checklist | `nastorg-pozice-onboarding.html` | nový obrázek |
| — | *(nemělo obrázek)* | Rozvoj zaměstnance | `nastorg-pozice-rozvoj.html` | nový obrázek |

⚠️ V `prototypes/prompt-sablona-aptien.md` (Šablona B) je seznam sekcí u
„otevřená pozice“ zastaralý — pořád jmenuje `pozadavky` / `aktivity`
místo dnešních `prirazeni` / `zpusobilost` / `vybaveni` / `onboarding` /
`rozvoj` / `skoleni`. Navrhuji ten seznam v šabloně opravit zároveň s
tímto zadáním, ať příště nikdo negeneruje ze starého názvosloví (mohu to
rovnou udělat, dej vědět).

---

## Obrázek 1 — Katalog pracovních pozic (tabulka)

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (podzáložka „Pracovní pozice“, layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** pohled na nastavení/agendu (tabulka pozic), NE detail jedné pozice
**Layout / zdroj:** tabulku pracovních pozic ber z `partials/nastorg-pracovni-pozice.html`, topbar, sidebar a logo z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Katalog pracovních pozic — přehledná tabulka všech pracovních pozic ve firmě, ke které se váže organizační zařazení a přiřazení zaměstnanci.“
**Data k zobrazení:** použij přesně řádky, které už jsou v partialu — pracovní pozice: Administrativní pracovník (obsazeno: Hana Kocour), Personalista (Petra Malá), Vedoucí IT oddělení (Martin Blažek), Právník (Asistentka ředitele), a přidej ještě 2–3 další realistické pozice se stejnou strukturou sloupců (Název pracovní pozice / Organizační jednotka / Požadavek pracovních pozic / Proces), aby tabulka nepůsobila prázdně. Sloupce a formát přebírej z prototypu, nic v layoutu neměň.

---

## Obrázek 2 — Základní info

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“ otevřený nad tabulkou pozic, aktivní záložka „Základní info“
**Layout / zdroj:** `partials/nastorg-pozice-zakladni.html` (modal, ne drawer). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html` / `nastorg-pracovni-pozice.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Základní informace o pracovní pozici — název, krátký popis a doplňující poznámky, které se použijí i jako podklad pro inzerát.“
**Data k zobrazení:** Název pracovní pozice: „Administrativní pracovník“ (už je v partialu). Krátký popis doplň realisticky, např. „Administrativní podpora vedení kanceláře, evidence docházky a komunikace s dodavateli.“ Do pole „Další informace k pracovní pozici“ doplň krátkou poznámku, např. „Pozice je součástí sekretariátu, úvazek 1,0, nástup ihned.“ Strukturu polí a layout přebírej přesně z partialu.

---

## Obrázek 3 — Přiřazení zaměstnanci *(nový)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Přiřazení zaměstnanci“
**Layout / zdroj:** `partials/nastorg-pozice-prirazeni.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Přiřazení zaměstnanci — přehled toho, kdo aktuálně danou pracovní pozici zastává.“
**Data k zobrazení:** zaměstnanec už je v partialu — Hana Kocour. Nech beze změny, případně přidej k jejímu jménu profilovou fotku/avatar, pokud to layout partialu podporuje. Neměň strukturu ani rozložení.

---

## Obrázek 4 — Organizační zařazení

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Organizační zařazení“
**Layout / zdroj:** `partials/nastorg-pozice-organizacni.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Organizační zařazení — do které organizační jednotky pozice patří, kdo ji zastupuje a kdo je nadřízený.“
**Data k zobrazení:** partial má pole prázdná (`---`) — doplň realisticky: Přiřazená organizační jednotka: „Sekretariát ředitele“; Zastupující pracovní pozice: „Asistentka ředitele“; Nadřízená pracovní pozice: „Office manager“; Podřízené pracovní pozice: ponech „Žádná podřízená pozice“; Místo výkonu práce: „Praha, centrála“. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 5 — Pracovní náplň

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Pracovní náplň“
**Layout / zdroj:** `partials/nastorg-pozice-naplne.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Pracovní náplň, odpovědnosti a pravomoci spojené s pozicí, včetně navázaných firemních procesů.“
**Data k zobrazení:** partial má pole prázdná — doplň: Pracovní náplň: „Administrativní podpora vedení, evidence docházky, správa pošty a kalendáře, komunikace s dodavateli a objednávání kancelářských potřeb.“ Popis odpovědnosti: „Zodpovídá za včasné zpracování docházky a archivaci smluvní dokumentace.“ Přiřazené pracovní procesy: přidej 1–2 realistické procesy místo „Žádný přiřazený pracovní proces“, např. „Onboarding nového zaměstnance“, „Zpracování docházky“. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 6 — Požadavky na kvalifikaci

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Požadavky na kvalifikaci“
**Layout / zdroj:** `partials/nastorg-pozice-kvalifikace.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Požadavky na vzdělání, praxi a dovednosti potřebné pro danou pracovní pozici, vybírané z centrálního katalogu požadavků.“
**Data k zobrazení:** katalog nabídky v poli „Vyberte požadavek…“ nech beze změny (obsahuje mj. Anglický jazyk, Excel středně pokročilý, Německý jazyk, Znalost ERP systému). V sekci „Přiřazené požadavky ke kvalifikaci“ nahraď stávající řádky (Řidičský průkaz sk. B, Vstupní lékařská prohlídka, Školení BOZP pro vedoucí — ty logicky patří spíš pod způsobilost) položkami, které dávají smysl pro kvalifikaci administrativní pozice: „Střední vzdělání s maturitou“, „Znalost ERP systému“, „Excel středně pokročilý“, „Anglický jazyk“. Požadavky na vzdělání a kvalifikaci / praxi / dovednosti doplň odpovídajícím textem. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 7 — Požadavky na způsobilost *(nový, dřív součást „kvalifikace a způsobilost“)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Požadavky na způsobilost“
**Layout / zdroj:** `partials/nastorg-pozice-zpusobilost.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Požadavky na zdravotní způsobilost a další způsobilostní podmínky pro výkon pozice (dřív součást sekce „kvalifikace a způsobilost“, dnes samostatná záložka).“
**Data k zobrazení:** v sekci „Přiřazené požadavky ke způsobilosti“ ponech/doplň „Vstupní lékařská prohlídka“ a přidej „Řidičský průkaz sk. B“ (přesun sem z obrázku 6, kam logicky patří víc). Požadavky na zdravotní způsobilost doplň textem, např. „Bez omezení pro práci u počítače, standardní vstupní lékařská prohlídka.“ Katalogovou nabídku v poli „Vyberte požadavek…“ nech beze změny. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 8 — Vybavení, nástroje, systémy

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Vybavení, nástroje, systémy“
**Layout / zdroj:** `partials/nastorg-pozice-vybaveni.html` (modal, nahrazuje starší `nastorg-pozice-pozadavky.html`). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Požadavky na pracovní pomůcky, vybavení a přístup do firemních systémů potřebné pro výkon pozice.“
**Data k zobrazení:** v sekci „Přiřazené požadavky pracovních pozic“ ponech položky, které jsou skutečně vybavení/systémy: „PC s RAM 12gb+“, „Služební telefon“, „Klíč od budovy“, „Klíče od kanceláře“, „Aptien“, „JIRA“, „SAP“, „Firemní mikina“. Vynech položky, které tam logicky nepatří (Excel středně pokročilý, Anglický jazyk, Psaní na stroji, Škoda Octavia — dovednosti a firemní auto nejsou pro admin. pozici typické vybavení). Katalogovou nabídku v poli „Vyberte požadavek…“ nech beze změny. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 9 — Pracoviště a rizika

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Pracoviště a rizika“
**Layout / zdroj:** `partials/nastorg-pozice-rizika.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Bezpečnostní a zdravotní rizika spojená s pracovištěm dané pozice.“
**Data k zobrazení:** pro administrativní pozici jde o kancelářské riziko — v sekci „Přiřazené požadavky k pracovišti“ ponech „PC s RAM 12gb+“ (zátěž zraku/dlouhé sezení) a doplň realistický text do „Bezpečnostní rizika pracovní pozice“ (např. „Práce v sedě u obrazovky, minimální fyzická rizika.“) a „Zdravotní rizika pracovní pozice“ (např. „Zátěž zraku a pohybového aparátu při dlouhodobé práci u PC.“). Vynech „Firemní mikina“, která sem tematicky nepatří. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 10 — Dokumenty *(nový)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Dokumenty“
**Layout / zdroj:** `partials/nastorg-pozice-dokumenty.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Povinné směrnice a dokumenty ke seznámení — samostatně nastavené pro tuto pozici i ty, které platí pro všechny zaměstnance.“
**Data k zobrazení:** ponech strukturu se dvěma bloky („Pouze pro tuto pracovní pozici“ a „Převzato z nastavení zaměstnanců / Pro všechny zaměstnance“) a realistický obsah, který už partial má (IT směrnice, Nový řád 2026, distribuční listy se stavy „Vyžaduje potvrzení · Za X dní“ / „Pouze zveřejněno“). Pokud je blok „Pouze pro tuto pracovní pozici“ prázdný, doplň 1 realistickou položku vázanou přímo na administrativní pozici, např. „Směrnice pro archivaci dokumentů“. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 11 — Školení *(nový)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Školení“
**Layout / zdroj:** `partials/nastorg-pozice-skoleni.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Povinná školení — vlastní pro tuto pozici i ta, která platí pro všechny zaměstnance.“
**Data k zobrazení:** blok „Pro všechny zaměstnance“ ponech beze změny (Školení BOZP pro vedoucí, Vstupní školení nového zaměstnance, Školení první pomoci). Blok „Pouze pro tuto pracovní pozici“ je v partialu prázdný — doplň 1 realistické školení specifické pro administrativní pozici, např. „Školení GDPR a práce s osobními údaji“. Strukturu a layout přebírej přesně z partialu.

---

## Obrázek 12 — Onboarding checklist *(nový)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Onboarding checklist“
**Layout / zdroj:** `partials/nastorg-pozice-onboarding.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Checklist pro manažery — co je potřeba zajistit před nástupem a v první den nového zaměstnance na této pozici.“
**Data k zobrazení:** ponech přesně obsah, který už partial má — fáze „Před nástupem“ (Objednat notebook a klíče od kanceláře, Podepsat pracovní smlouvu, Zaslat vstupní dotazník, Zřídit pracovní e-mail a přístupy, Připravit pracovní místo a techniku, Vstupní lékařská prohlídka) a „První den“ (Zaškolení na administrativní agendu, Předat notebook/telefon/kartu, Představit tým a nadřízeného, Seznámit s pracovním řádem a BOZP, Nastavit přístup do intranetu), včetně sloupců POLOŽKA / AKTIVITA a počtu položek u každé fáze. Strukturu a layout přebírej přesně z partialu, nic nevymýšlej navíc.

---

## Obrázek 13 — Rozvoj zaměstnance *(nový)*

**Účel:** Obrázek doprovodí text na produktové stránce. Text NEvkládej do obrázku — screenshot je čistý, text bude vedle něj na webu.
**Aktivní v topbaru:** žádná
**Aktivní v sidebaru:** Nastavení organizace (layout sidebaru ber z `partials/sidebar-menu.html`)
**Typ obrazovky:** modal „Upravit pracovní pozici“, aktivní záložka „Rozvoj zaměstnance“
**Layout / zdroj:** `partials/nastorg-pozice-rozvoj.html` (modal). Topbar, sidebar, logo a tabulka pozic na pozadí z `Aptien-aplikace-offline.html`.
**Přihlášený uživatel:** Jana Veselá (HR specialistka) — přidej i profilovou fotku (avatar)
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** „Pravidelné a plánované aktivity spojené s rozvojem zaměstnance na této pozici — hodnocení, školení, revize.“
**Data k zobrazení:** ponech přesně obsah, který už partial má — blok „Pro všechny zaměstnance“ (Pohovor se zaměstnancem – ročně, Pravidelné školení BOZP – ročně, Revize mzdy – ročně, Hlídání certifikátu – nepravidelná, Vstupní lékařská prohlídka – jednorázová). Pokud je blok „Pouze pro tuto pracovní pozici“ prázdný, nech ho prázdný se stávajícím textem placeholderu (odpovídá reálnému stavu nové pozice). Strukturu a layout přebírej přesně z partialu.

---

## Kontrola po vygenerování všech 13

- [ ] Všech 13 obrázků použilo stejnou vzorovou pozici „Administrativní pracovník“ a stejného přihlášeného uživatele (Jana Veselá) — konzistence napříč článkem.
- [ ] Žádný obrázek nezobrazuje `---` / prázdný placeholder tam, kde má být reálná ukázková hodnota.
- [ ] Katalogové položky (vybavení, kvalifikace, rizika…) dávají logický smysl pro danou záložku, ne mechanicky zkopírovaný stav demo prototypu.
- [ ] Rozměr, hustota a rám odpovídají `Aptien-pravidla-screenshotu.md` (1920×1080, navrženo na 1536×864, zvětšeno 1,25×).
- [ ] Nové soubory pojmenuj podle existující konvence, např. `medium_popis-pracovni-pozice-<sekce>.png`, aby šly do KB nahradit 1:1 (u nových obrázků bez starého ekvivalentu zvol název podle vzoru, např. `medium_popis-pracovni-pozice-prirazeni-zamestnanci.png`).
