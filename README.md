# Le Jardin — Sito (Cocktail Bar Nouveau + Bistrot)

Sito statico "2 in 1" per **Le Jardin**, Nola (NA). Una location, due anime:
- **index.html** — splash chooser split-screen (scegli dove entrare)
- **nouveau.html** — Cocktail Bar (spazio esterno / giardino)
- **bistrot.html** — Bistrot (sale interne / cucina)

## Come si modifica
Tutti i contenuti stanno in **`data.js`** (fonte unica di verità): contatti, orari,
social, menu, testi. Cambia lì → cambia tutto il sito. L'ultima riga
`window.DATA = DATA;` NON va rimossa.

### Aggiungere il menu del Bistrot (quando pronto)
In `data.js` → `BISTROT`:
- **Opzione A (PDF):** imposta `menuPdf: "assets/menu/bistrot-menu.pdf"` e carica il file.
- **Opzione B (voci):** popola `menuCategories` con categorie e piatti; metti `menuComingSoon: false`.

### Passare il menu Nouveau al PDF
In `data.js` → `NOUVEAU`: imposta `menuPdf: "assets/menu/nouveau-menu.pdf"` (ha priorità sul link esterno).

## Stack
HTML + CSS + JavaScript vanilla. Nessun framework, nessun build step.
Font: Google Fonts. Video di sfondo: autoplay muted loop playsinline + poster.

## Deploy — GitHub Pages (account scintillaanselmo0-cell)
```bash
gh repo create le-jardin-nola --public --source=. --remote=origin --push
gh api --method POST repos/scintillaanselmo0-cell/le-jardin-nola/pages -f "source[branch]=main" -f "source[path]=/"
```
Il file `.nojekyll` è già presente in root (evita che GitHub Pages scarti le cartelle di asset/video).

URL previsto: `https://scintillaanselmo0-cell.github.io/le-jardin-nola/`
