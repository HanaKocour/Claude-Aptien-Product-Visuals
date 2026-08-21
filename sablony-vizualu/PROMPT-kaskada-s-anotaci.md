# Prompt — vizuál „kaskáda s anotací"

> ⚠️ Doplňuj JEN spodní sekci **MOJE KONKRÉTNÍ ZADÁNÍ**. Všechno nad ní nech
> beze změny.
>
> Šablona: `kaskada-s-anotaci.html`
> Pravidla: `PRAVIDLA-kaskada-s-anotaci.md`
> Referenční výstup: `priklad-kaskada-s-anotaci.png`
>
> Tenhle prompt je pro obrázky, které ukazují **řetězec provázaných záznamů** —
> uživatel se proklikal po souvislostech a nad screenshotem to vysvětlují
> číslované pilulky. Na scény toku (e-mail → aplikace) i na „nadpis +
> screenshot" jsou jiné prompty; nemíchat.

---

## POSTUP (dodrž přesně v tomto pořadí, ukaž až finál)

1. **Přečti (Read) `PRAVIDLA-kaskada-s-anotaci.md` a šablonu
   `kaskada-s-anotaci.html`.** Negeneruj z paměti.
2. **Vypiš jako text, než začneš:** aktivní záložku topbaru a její hex barvu;
   stav sidebaru; název evidence na pozadí; celý řetězec (spine 1…N — název,
   modul, ikona); texty pilulek; text štítku a jeho délku ve znacích.
3. **Zkopíruj šablonu pod novým názvem a přepiš JEN místa označená `✏️ MĚŇ`.**
   Geometrii anotace, paletu, radiusy ani stíny neměň.
4. Dopočítej čtyři čísla na `.an` (`--an-band-x`, `--an-band-w`, `--an-x`,
   `--an-y`) podle skutečného rozvržení, ne odhadem.
5. Vyrenderuj: `node render.js <soubor>.html`
6. **Podívej se na výsledek** a projeď checklist z pravidel (§9). Když se něco
   nevejde, oprav **data** (kratší názvy, míň řádků seznamu) — ne rozvržení,
   ne velikost písma.
7. Ukaž mi až finální ověřený obrázek.

---

## ⛔ CO SE NESMÍ

- ⛔ **Nepřekresluj UI.** Bloky ber doslova z `prototypes/partials/`
  (`evidence-list.html`, `item-drawer-stacked.html`, `drawer-tab-detaily.html`).
  Jediná povolená úprava: `position:fixed` → `absolute`.
- ⛔ **Kaskáda nejsou posunutá okna na diagonále.** Z každého překrytého
  záznamu je vidět **jen spine 38 px** — ikona modulu + název otočený o −90°.
- ⛔ **Nepoužívej v anotaci barvy modulů ani `#1572e8`.** Paleta anotace je
  fialová → modrá → zelená → červená a je záměrně mimo barvy UI.
- ⛔ **Nejvýš 4 pilulky**, nejvýš 1 štítek, nejvýš 1 stavová pilulka.
- ⛔ **Štítek je jedna věta do ~45 znaků.** Žádný marketingový odstavec,
  claim, cena ani cizí logo.
- ⛔ **Název v pilulce = doslova název záznamu ve spine.** Ne parafráze.
- ⛔ **Závoj je bílý 35 %.** Žádné blur, ztmavení, gradient ani spotlight.
- ⛔ **Nezmenšuj písmo**, aby se dlouhá pilulka vešla — zkrať název záznamu.
- ⛔ **Neměň rozměr.** Vždy 1920 × 1080; návrhová vrstva 1536 × 864 se
  `scale(1.25)`. Nikdy vložený a doškálovaný PNG.

---

## ČTYŘI ČÍSLA, KTERÁ ŘÍDÍ ANOTACI

| Token | Co to je | Jak ho spočítat |
|---|---|---|
| `--an-band-x` | levá hrana sytého pruhu | levá hrana prvního spine — u drawer panelu `width:80%` v 1536 px je to **307 px** |
| `--an-band-w` | šířka sytého pruhu | počet spine × **38 px** |
| `--an-x` | start svodů | `--an-band-x + 19px` (střed prvního spine) |
| `--an-y` | svislý střed pilulky č. 1 | osvědčeno **400 px** |

Zbytek se dopočítá sám. Krok pilulek `--an-step-x` (38 px) musí odpovídat
šířce spine, jinak přestanou být svody stejně dlouhé.

---

## STAVY, KTERÉ SE MUSÍ ZADAT (jinak si je model vymyslí)

- **Záložka mimo základních 8** → uveď její **hex barvu a ikonu**.
  (Použité doteď: Služby `#00BFA5`, ikona `diagram-project`.)
- **Sidebar** → výchozí je **sbalený 56 px**. Otevřený 236 px piš výslovně.
- **Přihlášený uživatel** → jméno, role a jestli má být avatar fotka.
- **Stav vrchního záznamu** → co je ve stavové pilulce vpravo („Aktivní")
  a co v pilulce anotace („Otevřeno").

---

## MOJE KONKRÉTNÍ ZADÁNÍ

> Doplň hranaté závorky. Zbytek promptu nech, jak je.

**Aktivní v topbaru:** [název záložky] · barva `[#hex]` · ikona `[FA]`
**Sidebar (stav):** [sbalený 56 px (výchozí) / otevřený 236 px]
**Přihlášený uživatel:** [jméno, role, avatar ano/ne]
**Evidence na pozadí:** [název] — první řádek = [název záznamu, vybraný],
další řádky: [výčet]

**Řetězec kaskády** (od pozadí k popředí):

| # | Název záznamu (spine) | Modul | Ikona | Barva ikony |
|---|---|---|---|---|
| 1 | [ ] | [ ] | [ ] | [#hex] |
| 2 | [ ] | [ ] | [ ] | [#hex] |
| 3 | [ ] | [ ] | [ ] | [#hex] |
| 4 | [ ] | [ ] | [ ] | [#hex] |

**Vrchní záznam — detail:** titulek [ ] · štítek typu [ ] ·
záložka Souvislosti s číslem [N] · pole: [název pole → hodnota, …] ·
ID [ ] · Vytvořeno [ ] · Vytvořil [ ] · Poslední úprava [ ]

**Pilulky anotace:**

| # | Název (verzálky, doslova podle spine) | Podtitul `MODUL · kde záznam žije` |
|---|---|---|
| 1 | [ ] | [ ] |
| 2 | [ ] | [ ] |
| 3 | [ ] | [ ] |
| 4 | [ ] | [ ] + stavová pilulka „[stav]" |

**Štítek:** „[jedna věta, max ~45 znaků]"
**Kontext (jen pro pochopení tématu, NEZOBRAZUJ v obrázku):** [text]
**Název výstupního souboru:** [např. `nis2-retezec-souvislosti.html`]

---

### Příklad vyplnění — NIS2 (odpovídá `priklad-kaskada-s-anotaci.png`)

**Aktivní v topbaru:** Služby · barva `#00BFA5` · ikona `diagram-project`
**Sidebar (stav):** sbalený 56 px
**Přihlášený uživatel:** Pavel Obezřetný, Auditor, avatar ano
**Evidence na pozadí:** Služby — první řádek „Provoz ERP systému HELIOS"
(vybraný), další: Docházkový systém · Datové úložiště · Emailový provoz ·
Telefonní ústředna · VPN vzdálený přístup · Webový portál · Zálohování dat

| # | Název záznamu (spine) | Modul | Ikona | Barva ikony |
|---|---|---|---|---|
| 1 | Provoz ERP systému HELIOS | Služby | `diagram-project` | `#00BFA5` |
| 2 | Ekonomická a účetní data | Data | `database` | `#1565C0` |
| 3 | ERP aplikace HELIOS | Aplikace | `desktop` | `#37474F` |
| 4 | Riziko nedostupnosti ERP aplikace HELIOS | Rizika | `triangle-exclamation` | `#E91E63` |

**Vrchní záznam — detail:** titulek „Riziko nedostupnosti ERP aplikace HELIOS" ·
štítek typu „Riziko kybernetické bezpečnosti" · Souvislosti `3` · pole:
Popis rizika → „Výpadek ERP aplikace HELIOS znemožní zpracování ekonomických
a účetních dat a naruší kontinuitu služby Provoz ERP systému HELIOS." ·
Zdroj rizika → odkaz „ERP aplikace HELIOS" · Úroveň rizika → „Vysoké"
(červené kolečko) · Dopad rizika → „Přerušení účetních a ekonomických procesů,
riziko finančních a provozních dopadů." · ID 51942 · Vytvořeno 02. 06. 2026 ·
Vytvořil Pavel Obezřetný · Poslední úprava 21. 07. 2026

**Pilulky anotace:**

| # | Název | Podtitul |
|---|---|---|
| 1 | PROVOZ ERP SYSTÉMU HELIOS | `SLUŽBA · katalog IT služeb` |
| 2 | EKONOMICKÁ A ÚČETNÍ DATA | `DATA · evidence datových aktiv` |
| 3 | ERP APLIKACE HELIOS | `APLIKACE · katalog aplikací` |
| 4 | RIZIKO NEDOSTUPNOSTI ERP APLIKACE HELIOS | `RIZIKO · registr rizik` + „Otevřeno" |

**Štítek:** „Vše je propojené, souvislosti se vám neztratí"
**Kontext:** „Řízení shody s NIS2. Díky Aptien a provázaným chytrým evidencím
vše udržíte online a snadněji než v excelu."
**Název výstupního souboru:** `kaskada-s-anotaci.html`
