# Školení ke směrnici – celý proces · spec prototypu

Soubor: `skoleni-proces-smernice-prototyp.html` (v1 k připomínkování, 7. 10. 2026)
Navazuje na `skoleni-tvorba-testu-prototyp.html`. Editor testu je převzatý beze změny logiky, viz jeho spec.

## Hlavní rozhodnutí
1. **Test patří ke směrnici, ne k evidenci Zaměstnanci.** V detailu směrnice (drawer) je nová záložka **„Školení a test“**. Materiálem testu je vždy tato směrnice v aktuální verzi.
2. **Rozesílání řeší distribuční list, ne test.** Ve „Způsobu doručení“ (§12.3) přibývá třetí karta **„Potvrzení + test“** (štítek NOVÉ):
   - aktivní jen u dokumentu, který má test,
   - u dokumentu bez testu je karta zašedlá a v Informacích o zdroji je odkaz „vytvořit u směrnice“.
3. **Splněno = přečteno, potvrzeno a test složen.**
   - Platí pro % v „Moje směrnice“ (§6.6.2) i pro sloupec Splnění v distribučním listu.
   - Barvy tlačítek a štítků podle termínu (§6.6.1) se nemění.
4. **Pravidla testu** (pokusy, čas, hranice, certifikát) se nastavují jednou u testu. List je jen přebírá a zobrazí shrnutí s odkazem „Upravit test“.

## Kroky (horní lišta PROCES, stav se přenáší mezi kroky)

| # | Role | Obrazovka | Co je nové |
|---|---|---|---|
| 1 | Správce | Evidence Směrnice → drawer „Bezpečnost práce (BOZP) 2026“ | Záložka **Školení a test**. Prázdný stav se 4 způsoby vytvoření: Aptík z této směrnice / ručně / z textu / ze šablony. Po vytvoření karta souhrnu (otázky, body, hranice, čas, pokusy, certifikát), vazba na verzi v3 a upozornění „Test zatím nikdo nedostane“ s tlačítkem **NASTAVIT ROZESLÁNÍ**. Ve sloupci tabulky je chip TEST. |
| 2 | Správce | Editor testu | Materiál je zamčený na směrnici („navázáno na směrnici“). ZPĚT i ZVEŘEJNIT vrací do drawer směrnice. |
| 3 | Správce | Nastavení směrnic → Distribuční listy | Nový štítek **„Potvrzení + test“** (fialová wash `#efe9ff` / `#5b21b6`, ikona `graduation-cap`). Sloupec „Potvrzeno / složeno“, pruh Splnění zelený. Modal „Upravit seznam příjemců“ (pořadí sekcí dle §12.3) má:<br>• řádek **Test** v Informacích o zdroji,<br>• 3 karty doručení, termín „splnění (potvrzení + test)“,<br>• modrý box s převzatými pravidly testu,<br>• přepínač „po vypršení certifikátu rozeslat znovu automaticky“,<br>• info, že kdo už dokument potvrdil, dostane výzvu jen k testu. |
| 4 | Zaměstnanec | Moje směrnice (PC) | Řádek se štítkem **TEST · N otázek · ~X min** a tlačítkem **PŘEČÍST A TEST** (barva podle termínu). Postup:<br>• **Čtečka dokumentu**: 3 kroky Přečíst → Potvrdit → Složit test; ukazatel „Přečteno %“ podle posunu; potvrzení až po dočtení.<br>• Test.<br>• Výsledek a certifikát.<br>• **ZPĚT NA MOJE SMĚRNICE**: dokument se přesune do Potvrzeno se štítkem „Test složen X/Y b.“ a tlačítkem CERTIFIKÁT.<br>Při neúspěchu zůstane v K potvrzení se štítkem „Test nesložen · pokus N z M“ a tlačítkem ZKUSIT ZNOVU. Stav „Přečteno – zbývá test“ má tlačítko POKRAČOVAT V TESTU. |
| 5 | Zaměstnanec | Mobilní intranet (3 telefony) | 1) Push upozornění a Moje směrnice. 2) Test s jednou otázkou na obrazovku, s ukazatelem průběhu a časem. 3) „O mně → Školení“ – Moje certifikáty s platností a připomínkou 30 dní předem. |
| 6 | Správce | Detail distribučního listu (Vyhodnocení) | KPI: složilo, nesložilo (vyčerpané pokusy), rozpracováno, nezahájeno, po termínu. Tabulka lidí s filtry, pokusy, body, datem, platností certifikátu a akcí **POVOLIT POKUS**. Panel **Úspěšnost otázek** (SurveyJS Dashboard) s tipem na nejhorší otázku. Tlačítka PŘIPOMENOUT ČEKAJÍCÍM a EXPORT. Řádek Karolíny odpovídá tomu, jak test dopadl v kroku 4. |

Žlutá anotace vlevo dole vysvětluje každý krok a dá se sbalit. Persona zaměstnance je **Karolína Fišerová** (Personalistka) a certifikát se vystaví na její jméno.

## Otevřené otázky k rozhodnutí
- Má mít jedna směrnice víc testů (např. pro různé pozice)? Prototyp počítá s jedním.
- Nová verze směrnice: má Aptien ponechat test, nebo ho zneplatnit, než ho autor zkontroluje? A rozeslat znovu jen lidem, kterých se změna týká?
- Mobil: čtečka PDF na telefonu, nebo jen potvrzení s odkazem na dokument?
- Kdo smí udělit další pokus: nadřízený, nebo jen správce směrnic?
- Kde všude se ukazuje certifikát: O mně, drawer Zaměstnance → Školení a rozvoj, evidence Certifikáty?

## Prompt pro další iteraci
> Vycházej z `skoleni-proces-smernice-prototyp.html` a této spec. Drž pravidla UI (`Aptien-pravidla-pouziti-UI.md` §6.6, §12, §13) a stav sdílený mezi kroky. Měň jen to, co uvedu, a nakonec projdi všech 6 kroků a porovnej je se spec.
> **Zadání:** […]
