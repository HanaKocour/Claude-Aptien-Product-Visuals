# Aptien EN glosář (CS → EN)

Tenhle soubor je **kurátorovaný výběr** nejdůležitějších a nejčastěji používaných termínů z kompletního slovníku `prototypes/i18n-dictionary.json` (1378 párů CS → EN, vygenerovaných strojově při vytváření `prototypes-en/` (mastery i `partials/`)). Slouží jako rychlá referenční příručka pro ruční úpravy a rozšiřování EN prototypů — **ne** jako úplný seznam.

> Kompletní, strojově čitelný slovník je v `prototypes/i18n-dictionary.json`. Než v EN souborech ručně přidáš nový text, nejdřív zkontroluj, jestli tam už podobný termín není — ať se terminologie nerozjíždí.

Terminologie níže vychází primárně z **reálné produkční aplikace** (https://smaztest2022hanak.aptien.com/#/, EN rozhraní), ne z vlastního odhadu — je to ověřený zdroj pravdy pro standardní UI termíny Aptienu.

---

## 1. Hlavní menu a moduly (evidence)

| CS | EN |
|---|---|
| Nástěnka | Announcements |
| Zaměstnanec / Zaměstnanci | Employee / Employees |
| Aktivní zaměstnanci | Active employees |
| Neaktivní zaměstnanci | Inactive employees |
| Zákazník / Zákazníci | Customer / Customers |
| Zakázka / Zakázky | Order / Orders |
| Dodavatel / Dodavatelé | Supplier / Suppliers |
| Vybavení | Equipment |
| Pracovní pozice | Job profile (záložka v Nastavení organizace: **Job profiles**) — nikdy „Job position“ |
| Pracovní náplň | Job description |
| Organizační jednotka | Organizational unit |
| Fáze nástupu | Onboarding Phases |
| Školení | Training |
| Katalog školení | Training Catalog |
| Audity a kontroly | Audits & Inspections |
| Certifikáty | Certificates |
| Distribuční seznamy | Distribution Lists |
| Formuláře PFD | PFD Forms |
| Uživatelé | Users |
| Oprávnění | Permissions |

### Interní taxonomie typu záznamu (badge nad kartou v cyber-risk / asset modulu)

| CS | EN |
|---|---|
| APLIKACE · katalog aplikací | APPLICATION · application catalog |
| APLIKACE · kde záznam žije | APPLICATION · where the record lives |
| DATA · evidence datových aktiv | DATA · data asset register |
| DATA · kde záznam žije | DATA · where the record lives |
| RIZIKO · kde záznam žije | RISK · where the record lives |
| SLUŽBA · katalog IT služeb | SERVICE · IT service catalog |
| SLUŽBA · kde záznam žije | SERVICE · where the record lives |

### ⚠️ Názvy evidencí — jediná věc, kterou má smysl v konkrétním prostředí měnit

Kromě několika uzamčených základních evidencí (typicky Zaměstnanci, Zákazníci, Zakázky, Uživatelé) si Aptien zákazníci mohou název evidence libovolně přejmenovat. Pokud tvoříš vizuál pro konkrétní zákaznické prostředí (např. Halovo `smaztest2022hanak`), ověř si aktuální název evidence přímo v appce místo dogadování — v tom je jediný reálný rozdíl mezi instalacemi.

---

## 2. Přepínač zobrazení a společné akce

| CS | EN |
|---|---|
| Tabulka *(přepínač zobrazení)* | Grid |
| Zápisy *(přepínač zobrazení, typicky u jednání/porad)* | Minutes |
| Kalendář | Calendar |
| Přidat | Add |
| PŘIDAT / PŘIDAT ZAMĚSTNANCE / PŘIDAT ZAKÁZKU / PŘIDAT RIZIKO / PŘIDAT AUDIT / PŘIDAT ŠKOLENÍ / PŘIDAT EVIDENCI | ADD / ADD EMPLOYEE / ADD ORDER / ADD RISK / ADD AUDIT / ADD TRAINING / ADD RECORD |
| Uložit / ULOŽIT | Save / SAVE |
| ULOŽIT JAKO KONCEPT | SAVE AS DRAFT |
| Zrušit / ZRUŠIT | Cancel / CANCEL |
| Zavřít / ZAVŘÍT | Close / CLOSE |
| Otevřít / OTEVŘÍT | Open / OPEN |
| Pokračovat / POKRAČOVAT | Continue / CONTINUE |
| Duplikovat formulář / EDITOVAT FORMULÁŘ | Duplicate form / EDIT FORM |
| Naplánovat / NAPLÁNOVAT | Schedule / SCHEDULE |
| Sdílet / SDÍLET ZAMĚSTNANCŮM | Share / SHARE WITH EMPLOYEES |
| Nahrát soubor / obrázek / logo | Upload file / image / your logo |
| Zpět na přehled | Back to overview |
| Vytvořit nového uživatele | Create new user |
| Nastavení | Settings |

---

## 3. Stavy a status vocabulary

| CS | EN |
|---|---|
| Aktivní / AKTIVNÍ | Active / ACTIVE |
| Aktivní a koncepty | Active & Drafts |
| Archivováno | Archived |
| Rozpracováno | In progress |
| Dokončeno / dokončeno | Completed / completed |
| Splněno / SPLNĚNO | Completed / COMPLETED |
| Nesplněno | Not completed |
| Zrušeno | Cancelled |
| Publikováno | Published |
| Vybráno / vybráno / 2 vybráno | Selected / selected / 2 selected |
| Nevybráno | Not selected |
| K vyplnění / k vyplnění | To complete / to complete |
| Sdíleno | Shared |
| Kritické / Vysoké / Mírné / Nízké | Critical / High / Moderate / Low |

### Termíny a "po termínu" fráze

| CS | EN |
|---|---|
| Termín | Deadline |
| Termín potvrzení | Confirmation deadline |
| Bez termínu | No deadline |
| N dní po termínu (např. "12 dní po termínu") | N days overdue |
| 1 den po termínu | 1 day overdue |
| N po termínu (bez "dní", u malých čísel) | N overdue |
| Blížící se | Upcoming |
| V pořádku | OK |
| nenaplánované | not scheduled |
| zbývá | remaining |

---

## 4. Pole a popisky formulářů

| CS | EN |
|---|---|
| Jméno / Jméno a příjmení | Name / Full name |
| Příjmení | Last name |
| Datum narození | Date of birth |
| Datum nástupu | Start date |
| Datum přijetí | Date received |
| Oddělení | Department |
| Vlastník | Owner |
| Zodpovědná osoba | Responsible person |
| Kategorie a zařazení | Category & Classification |
| Základní údaje | Basic details |
| Příjemci | Recipients |
| Distribuční list | Distribution list |
| Přílohy | Attachments |
| Interní poznámka | Internal note |
| Historie změn | Revision history |

---

## 5. Poznámky k metodě a rizikům při ručním rozšiřování

- Slovník `i18n-dictionary.json` vznikl hromadnou strojovou substitucí přes všech 70 souborů (2 master prototypy + 68 partialů), ne ručním překladem každého souboru zvlášť — proto obsahuje i drobné duplicity (stejný CS text s velkým/malým počátečním písmenem jako dva záznamy).
- **Osobní jména a názvy fiktivních firem se záměrně nepřekládají** (např. "Karolína Fišerová", "Kovárna Kovy a Syn s.r.o.") — jsou to smyšlená demo data, překlad by nedával smysl.
- **Pozor na kolizní krátká slova**, pokud budeš slovník ručně rozšiřovat vlastním find&replace skriptem — tato slova jsou substringem jiných, delších slov a naivní `str.replace` je poškodí:
  `pro, Den, Řád, dní, říj, nástup, Vše, Bezpečnost, Dny, Základní info, Zakázky, nový, školení, Vydán, Distribuční list, Manažer, Ano, Nadřízený, Termín, kvě, IT bezpečnost, Návrhář, Certifikát, vybráno, Měsíc, AKTIVNÍ, Ostatní, Pro pracovní pozici: `
  Pro tahle slova použij náhradu jen s hranicí slova (word-boundary regex), nikdy prostý substring replace.
- Zvláštní případ: **"pro" jako zkratka měsíce "prosinec" (Dec) v hlavičce kalendáře** je textově identické se slovem "pro" (for/for the purpose of). Word-boundary regex to nerozliší — proto tahle zkratka NENÍ v obecném slovníku a EN varianta má "Dec" dosazené ručně, jen ve 3 konkrétních kalendářních partialech (`evidence-kalendar-audity.html`, `evidence-kalendar-zakazky.html`, `evidence-kalendar-zamestnanci.html`). Pokud přidáváš další kalendářní partial s hlavičkou měsíců, zkontroluj prosincový sloupec ručně.
- Známé (neškodné) zbytky v CS, které se záměrně nepřekládaly: osobní jména, názvy fiktivních firem, zkratka "SÚKL", konkrétní názvy dummy aktivit/dokumentů (např. "Rekonstrukce skladu C"), a interní komentáře/identifikátory v `<script>` blocích (nejsou vidět na screenshotu).

## 6. ⚠️ Dvě chyby nalezené a opravené po prvním publikování (pro příště)

1. **Přeložený apostrof rozbil celou appku.** Master prototyp má krom viditelného HTML i skrytý `<script type="text/x-dc" data-dc-script="">` blok — "logic class" appky (stavy, data, chování). Když se do JS řetězce uzavřeného v `'...'` dosadil anglický překlad obsahující apostrof (např. `'Asistentka ředitele'` → `'Director's Assistant'`), apostrof předčasně ukončil řetězec a celý skript přestal jít zkompilovat (`new Function()` selhalo). Appka pak běžela jen ve statickém fallback režimu — proto se objevil zaseknutý modal a syrové `{{ proměnná }}` v textu. **Poučení:** při jakékoli budoucí hromadné substituci v `<script type="text/x-dc">` bloku vždy zkontroluj `node --check` na extrahovaném obsahu, a hodnoty s apostrofem/uvozovkou escapuj (`\'` / `\"`) podle typu uvozujících znaků.
2. **Slova bez diakritiky unikla extrakci.** Původní extrakční skript sbíral jen řetězce s českou diakritikou nebo ze seznamu běžných ASCII spojek. Čistě ASCII české výrazy jako "Dokumenty", "Upravit", "Seznam", "Tabulka", "Hledej…", "Smlouvy", "Hotely", "Stavby" tak zůstaly nepřeložené (vypadaly jako by mohly být anglické, ale byly česky). **Poučení:** spolehlivější kontrola je diff stejné pozice textových uzlů mezi CS a EN souborem (stejná struktura tagů) — cokoli, co vyjde jako identické a NENÍ vlastní jméno/číslo/kód, je podezřelé z chybějícího překladu, bez ohledu na diakritiku.

---

## 7. Nastavení organizace (ověřeno v produkční appce, EN rozhraní)

Zdroj: https://smaztest2022hanak.aptien.com/#/organizations/settings a formulář pracovní pozice (`/v2/organization/job-position/job-position-form/`). Ostrá appka používá **sentence case** (velké jen první písmeno).

| CS | EN |
|---|---|
| Organizace / Pracovní pozice / Katalog požadavků na pracovní pozice / Nastavení nadřízených *(záložky)* | Organization / Job profiles / Job requirements catalog / Supervisor settings |
| Upravit pracovní pozici | Edit job profile |
| Název pracovní pozice | Job profile name |
| Krátký popis | Job summary |
| Další informace k pracovní pozici | More information about the job profile |
| Základní info / Přiřazení zaměstnanci | Basic info / Related employees |
| Organizační zařazení | Organizational classification |
| Zastupující / Nadřízená / Podřízené pracovní pozice | Backup / Superior / Subordinate job profile(s) |
| Žádná podřízená pozice | No subordinate job profiles |
| Další informace k organizačnímu zařazení | More information on organizational classification |
| Místo výkonu práce | Work place |
| Pracovní náplň / Popis odpovědnosti | Job description / Responsibility description |
| Další informace k pracovní náplni | More information about the job description |
| Vyberte proces, který chcete přiřadit | Select process you want to add to list |
| Přiřazené pracovní procesy / Žádný přiřazený pracovní proces | Job-related processes / No related job process |
| Požadavky *(skupina v navigaci)* | Requirements & Qualifications |
| Návazné *(skupina v navigaci)* | Responsibilities & Tasks |
| Požadavky na kvalifikaci | Job qualifications |
| Požadavky na vzdělání a kvalifikaci / na praxi / na dovednosti | Education / Experience / Skills |
| Požadavky na zdravotní způsobilost | Medical fitness requirements |
| Další požadavky na způsobilost | Other qualifications |
| Požadavky na pracovní pomůcky | Work equipment |
| Další požadavky pracovní pozice | Additional job requirements |
| Vyberte požadavek pracovních pozic, který chcete přiřadit | Select job requirement you want to add to list |
| Přiřazené požadavky pracovních pozic | Already related job requirements |
| Pracoviště a rizika | Safety & Health & Risks |
| Bezpečnostní / Zdravotní / Další rizika | Safety hazards / Health hazards / Other hazards |
| Dokumenty *(záložka v modalu pozice)* | Policies & documents |
| Pouze pro tuto pracovní pozici | Profile-specific |
| Převzato z nastavení zaměstnanců | Inherited from employee settings |
| Jednorázová / Ročně / Nepravidelná | One time / Annually / Irregular |
| Vyžaduje potvrzení · Za 5 dní | Acknowledgment required · In 5 days |
| Pouze zveřejněno | Published only |
| PŘEHLED PRACOVNÍ POZICE / PODKLAD PRO INZERÁT | JOB PROFILE OVERVIEW / JOB ADVERTISEMENT DRAFT |
| Nadřízený *(v kontextu hierarchie)* | Supervisor |
| Použito v pozicích / N pozic | Used in job profiles / N job profiles |

**Kategorie katalogu požadavků:** Adaptace → Adaptation · Aplikace a licence → Applications and licenses · Auta → Cars · Fyzické předpoklady → Physical prerequisites · Klíče a vstupní karty → Keys and access cards · Kvalifikační předpoklady → Qualification prerequisites · Lékařské prohlídky → Medical examinations · Nářadí → Tool · Ochranné prostředky → Protective equipment · Osobní vlastnosti → Personal characteristics · Počítače → Computers · Pracovní pomůcky → Working aids and tools · Školení a kurzy → Training and courses · Telefony → Phones · Zkoušky a certifikáty → Exams and certificates · Znalosti a dovednosti → Knowledge and skills.

> ⚠️ Nekonzistence v samotné ostré appce (ne v prototypu): na několika místech EN rozhraní stále zůstalo „job position“ — odkaz *Add new job position*, filtr *Job position* v katalogu požadavků, *More information about the job position* a *Remove from this job position*. V prototypech je všude sjednoceno na **job profile**.

---

## 8. Pevné UI texty — ověřeno proti ostré appce (kompletní průchod)

Zdroj: ostrá appka v EN (smaztest2022hanak). Kde se prototyp liší designem (nové funkce, které v appce ještě nejsou — My Training, Manage Trainings, Training Catalog, AI summary, Onboarding tab…), zůstává text prototypu.

**Levé menu:** My Conversations · Inventory (ne „Inventory count“).

**Karta záznamu (drawer):** záložky Details · Activity plans · Attachments · **Connections** (ne Relations) · Calendar · **Job** (ne Job Classification) · Minutes · Tasks · Notes · Conversations. Akce: Favorite · New report · My reports · Online forms · **Online form results** · Share · Preview · Permissions · Revision history. Metadata: ID: · Created: · Created by: · Last change:
- *Activity plans:* ADD ACTIVITY · Select all · **N Fine** · **N unplanned** · **Schedule not set yet** · SCHEDULE · CONFIRM · One time · Annually
- *Job:* **Superior** · Subordinates · **Works on position** · SHOW JOB REQUIREMENTS · **Organization unit** · User group · SAVE
- *Minutes:* **From · To · Attendees** · Created by · EXPORT
- *Conversations:* „Vy“ → **You**

**Administrace (My company):** Customization · **Manage Billing** · Users · **Roles** · Guests · Groups · **Organizers** · Tickets & Requests · **Contact form** · Links · API Keys
- *Customization:* Company customization · Basic settings · Units · Default unit values · Setting printer · Company PDF Form Template Library · Security settings · Contact our support team at · Use SVG or PNG format · UPLOAD YOUR LOGO · Hide text on login page · Default color · Czech is on · English is on
- *Users:* User List · ADD A NEW USER · ADD FROM EMPLOYEES · In total · Total number of users · **Unlicensed employee(s)** · Assigned licences · Available licences · Name · Username · User type · Employee
- *Roles:* CREATE NEW ROLE · Name of the role · Description · For employees (recommended for all) · What detailed information will be seen about colleagues? · Organization Management · Business process catalog · **read / update / grant** · Access to groups of details · Access to categories of items · Access to attachments · Allow export of data: · Enable activity plans: · Show requests: · Restrict access to all items: · **Human resources** · **Applicants**

**My Policies:** Review and confirm your documents. · **You still have N documents to confirm** · Start with the most urgent ones at the top. · COMPLETED · N of N confirmed (mobil: „22 of 35 confirmed“, ne „z … hotovo“) · "· confirmed DD.MM.RRRR" u potvrzených · To confirm · DEADLINE · N days overdue · CONFIRM · No deadline
**My Training (mobil):** You still need to complete N **trainings** · N of N completed · N overdue · N in progress · START TRAINING · CONTINUE · Completed · BROWSE · All trainings · kategorie *BOZP* → **Health & Safety** (ne „BOZP“)
**Policies & Resources:** All official policies, templates, and resources in one place. · BROWSE · All Documents
**Policy Settings:** **Recipient Lists** · For All Employees · For Job Profile(s) · For Specific Employees · sloupce Name · **Employee Action** · **Action Deadline** · Confirmed · Pending · Completion

**Mobilní intranet:** My notifications · Tasks · My requests · Conversations · **For approval** · Reports · My Profile · My Policies · Policies & Resources · Announcements · Colleagues · **Training courses** · Inventory · Calendar. Stránka profilu: **About me** · My personnel file · Show more · UPDATE INFORMATION · Phone number · E-mail · My personnel documents · Issued And Assigned Items

> ⚠️ Nekonzistence přímo v ostré appce (pro vývojáře): v seznamech příjemců je „Requires Confirmation / Publish only“, ale v profilu pozice „Acknowledgment required / Published only“; skupina „For Job Position“ vs. jinde „Job profile“; u tapety „Use image with dimension 1.1:1“ (pravděpodobně má být 1:1). V prototypech je sjednoceno na **Acknowledgment required / Published only**, **job profile** a **1:1**.
