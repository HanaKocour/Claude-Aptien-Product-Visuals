# Profile images (profilové obrázky osobností)

Profilové fotky person/osobností, které se objevují ve screenshotech a
prototypech (avatary v menu, v detailu záznamu, u komentářů apod.).

Cílem je mít **jedno místo** pro tyhle obrázky, aby byly konzistentní napříč
všemi vizuály a daly se snadno vyměnit.

## Persony v knihovně

| Soubor | Osoba | Role |
|---|---|---|
| `karolina-fiserova.png` | Karolína Fišerová | Zaměstnanec |
| `pavel-obezretny.png` | Pavel Obezřetný | Auditor |
| `ales-stavitel.png` | Aleš Stavitel | Stavební dělník |

## Konvence pojmenování

- **kebab-case podle jména osoby:** `jmeno-prijmeni.png`
  (např. `karolina-fiserova.png`, `jan-novak.png`).
- Bez diakritiky a mezer v názvu souboru.
- Soubory s podtržítkem na začátku (`_priklad-avatar.png`) jsou jen ukázky /
  pomocné, ne reálné persony.

## Formát

- **PNG** (ideálně) nebo JPG.
- **Čtverec 1:1**, minimálně **256 × 256 px** (radši 512 × 512).
- Obličej vycentrovaný; v aplikaci se avatar zobrazuje kruhově
  (`border-radius: 50%`), takže rohy se ořežou.
- Neutrální nebo průhledné pozadí.

## Jak se používá

Master prototyp `prototypes/Aptien-aplikace-offline.html` má avatar zatím
napojený na `prototypes/assets/img/karAvatar.png` (persona **Karolína
Fišerová**). Když chceš ve screenshotu jinou osobnost:

1. Přidej sem její obrázek podle konvence výše.
2. Ve screenshotu / kopii prototypu přesměruj `src` avataru na příslušný
   soubor (relativní cesta k `profile-images/`), nebo obrázek nahraď
   v `assets/img/`.

> Reálné persony (jména, role, popisy) definuje brandová foundation
> `Claude-Aptien-Brand-Manual`. Sem patří jen jejich obrázky.
