# Design prompt – „Moje směrnice" (ISO 9001)

Vygeneruj vizuál obrazovky **„Moje směrnice"** v aplikaci Aptien podle
platného design systému v tomto repozitáři (`Claude-Aptien-Product-Visuals`).

## Zdroj pravdy (kopíruj 1:1)

- Předloha je **desktop master prototyp** `prototypes/Aptien-aplikace-offline.html`,
  konkrétně obrazovka **modulu Směrnice → pohled „Moje směrnice"** (osobní).
- Vezmi z něj layout, strukturu (DOM/vrstvy), rozměry a komponenty
  **doslova** a měň **pouze data** (texty, názvy dokumentů, termíny, stavy).
- Chování a barevné role dodržuj dle `prototypes/Aptien-pravidla-pouziti-UI.md`,
  sekce **6.5** a **6.5.1**.

## Co MUSÍ zůstat beze změny

- **Levý sidebar menu** – kompletní, se všemi položkami (15 osobních + 7
  firemních) přesně dle `prototypes/Aptien-menu-reference.md`. Nic nevynechávej
  ani nepřidávej. Aktivní stav nastav **jen na položku „Moje směrnice"**,
  ostatní neaktivní. Badge (počty) nezaměňuj za zvýraznění.
- **Horní topbar** – fialový `#6200EA`, beze změny.
- **Tab strip** – fialový pás jako v prototypu; aktivní záložka přebírá
  `c800` barvu svého modulu, text bílý.
- Barvy, fonty, radiusy a rozměry – přesně jako v prototypu. Nezaváděj
  žádnou „tématickou" barvu modulu na banner, tlačítka ani view switcher.
  Tlačítko primární akce zůstává modré `#1572e8`.

## Co se mění – obsah (data)

Naplň pohled „Moje směrnice" seznamem dokumentů, které odpovídají tématu
**řízení dokumentace a shody s ISO 9001**. Scénář obsahu vychází z textu
u obrázku „Podklady pro audit na jedno kliknutí" na stránce produktu
(<https://aptien.com/cs/software-pro-rizeni-dokumentace-a-shody-s-iso-9001>):

> „Nahrajete směrnici, systém sám rozešle lidem notifikaci, oni potvrdí
> přečtení v aplikaci a Aptien automaticky vygeneruje auditní stopu pro
> ISO auditora."

Tento text ber **jen jako zadání obsahu (co dokumenty představují)** –
**nekomponuj ho do obrázku ani na obrazovku jako popisek.** Na obrazovce se
promítne tak, že uživatel má **seznam ISO 9001 směrnic k potvrzení přečtení**.

Použij realistické názvy dokumentů z oblasti ISO 9001, např.:

- Politika kvality (QMS)
- Směrnice řízení dokumentace
- Postup řízení neshod a nápravných opatření (CAPA)
- Roční plán interních auditů ISO 9001
- Registr rizik a příležitostí
- Matice kompetencí a plán školení
- Směrnice hodnocení dodavatelů
- Postup správy měřidel a kalibrací

Horní stav nastav dle prototypu (např. *„Zbývá vám potvrdit N dokumentů"*
nebo *„Máte splněno!"*), vyhledávací pole s placeholderem *„Vyhledejte
dokument nebo kategorii"*, akce u řádků *OTEVŘÍT* / *POTVRDIT* a odkaz
*Procházet Všechny dokumenty*.

## Barvy tlačítka „POTVRDIT" a štítku (PEVNÉ pravidlo 6.5.1)

Barva se řídí **výhradně termínem potvrzení**, ne kategorií a **není vždy
červená**:

- **Dnes / v minulosti** → 🔴 červená (tlačítko `#d9463e`, štítek pozadí
  `#fde8e8` / text `#d9463e`, text „X dní po termínu").
- **Zítra** → 🟠 oranžová (`#FF6D00`, štítek `#fff3e0`, text „za 1 den").
- **Pozítří a dál** → 🟢 zelená (`#00C853`, štítek `#e8f8ed` / text
  `#2E7D32`, text „za X dní").
- **Bez termínu** → 🟢 zelená, štítek „∞ Bez termínu".

Štítek má **všechny** stavy, tvar hranatý (`border-radius: 3px`, padding
`2px 6px`, font Nunito `10px`). Rozmísti dokumenty tak, aby byly vidět
různé stavy (aspoň jeden po termínu, jeden zítra, zbytek zelené) – ne vše
červené.

## Výstup

Vizuál desktopové obrazovky odvozený z prototypu, on-brand, konzistentní
se zbytkem knihovny. Při nejistotě, který prvek prototypu použít, se zeptej –
nic nedomýšlej ani nepředělávej layout.
