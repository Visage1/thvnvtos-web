# Thvnvtos — Website

One-page website for the post-blackmetal band **Thvnvtos** (Santiago, Chile).
Static site: no build step, no dependencies.

**Bandcamp:** https://thvnvtosproject.bandcamp.com/

## Sections

| Section    | Content                                                        |
| ---------- | -------------------------------------------------------------- |
| Música     | Bandcamp embeds (Despojo, Destrvdo, Noche y Niebla EP) + Spotify artist player |
| Archivos   | Full discography with artwork and links                        |
| Fechas     | Events list rendered from `EVENTS` + empty state               |
| Merch      | Store cards (Bandcamp store / direct orders via Instagram)     |
| Portafolio | Photo gallery (12 images from the official Instagram) with lightbox |
| Contacto   | Bandcamp contact form, social links, lineup                    |

**Official links**

- Bandcamp: https://thvnvtosproject.bandcamp.com/
- Spotify: https://open.spotify.com/intl-es/artist/4iJhPb2BerhWhtseMzJkfM
- Instagram: https://www.instagram.com/thvnvtosprojectofficial

## Run locally

```bash
python3 -m http.server 8931
# open http://localhost:8931
```

## Add event dates

Edit the `EVENTS` array at the top of `js/main.js`:

```js
const EVENTS = [
  {
    fecha: "2026-12-12",       // YYYY-MM-DD
    ciudad: "Santiago de Chile",
    recinto: "Sala Arena",
    tickets: "https://..."     // ticket URL; "" shows "Entradas próximamente"
  }
];
```

## Structure

```
index.html         # all markup (hero, sections, footer, lightbox)
css/styles.css     # theme, responsive layout, animations
js/main.js         # events data, nav, reveals, lightbox
assets/gallery/    # gallery photos sourced from the official Instagram
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel): publish the repository root as-is.
