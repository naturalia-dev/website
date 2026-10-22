# Naturalia — Web

Sito di Naturalia srl, [naturalia.cc](https://naturalia.cc/): società di ingegneria elettronica e prodotti (famiglia Irry).
Stessa architettura del sito Meccaniche Sartoriali (playbook `astro-netlify-atelier`).

## Stack

- [Astro](https://astro.build) — sito statico
- [Tailwind CSS v4](https://tailwindcss.com) — tema in `src/styles/global.css` (`@theme`: palette chiara `base` + verde `accent` dalle cromie del manuale 2014, token semantici `text-main/body/muted`)
- [astro-icon](https://www.astroicon.dev) con il set Lucide
- Netlify — deploy automatico da `main`, deploy preview per ogni PR, Netlify Forms per i contatti

## Struttura

```text
src/
├── assets/images/ og-default.png (anteprima social)
├── content/products/<slug>/  index.yaml + foto e video del prodotto (gestiti da /admin)
├── components/   Services.astro, Recaptcha.astro
├── i18n/         it.ts, en.ts (testi), index.ts (t, getLang, localizePath)
├── layouts/      Layout.astro (header, nav, switch lingua, footer)
├── pages/        rotte italiane (/): una riga, scelgono solo la lingua
│   └── en/       rotte inglesi (/en)
├── views/        una pagina per file (markup unico, prop lang)
└── styles/       global.css
public/           favicon, brand/ (loghi SVG: mark, orizzontale, verticale), admin/ (Sveltia CMS)
```

## Lingue

Italiano alla radice, inglese sotto `/en` (`astro.config.mjs` → `i18n`).

- Il markup di ogni pagina sta una volta sola in `src/views/` (es. `Products.astro`, prop `lang`).
- `src/pages/x.astro` e `src/pages/en/x.astro` contengono solo `<Products lang="it" />` / `lang="en"`.
- I testi stanno in `src/i18n/it.ts` (riferimento) e `src/i18n/en.ts` (`satisfies Dictionary`):
  una chiave mancante o in più in inglese fa fallire `npm run build` (che esegue `astro check`).
- Link interni con `localizePath('/pagina/', lang)`; i testi con markup (`<br>`, `<strong>`) si rendono con `set:html`.

Nuova pagina: vista in `src/views/`, testi in entrambi i dizionari, due righe in `pages/` e `pages/en/`.

## SEO

`Layout.astro` genera per ogni pagina title, description (prop `description`), canonical, hreflang it/en/x-default,
Open Graph/Twitter (immagine: `og-default.png`, o la foto del prodotto) e JSON-LD dell'organizzazione;
ogni prodotto aggiunge un JSON-LD `Product` (con `Offer` solo se ha un prezzo).
Pagine da non indicizzare: prop `noindex` (es. `/success`, esclusa anche dalla sitemap).
Sitemap generata da `@astrojs/sitemap`, `public/robots.txt` punta a `sitemap-index.xml`.
I link interni terminano con `/` (Netlify reindirizza `/pagina` → `/pagina/`).

## Form contatti

Netlify Forms (`contact-it`, `contact-en`) con reCAPTCHA e honeypot; redirect a `/success/` e `/en/success/`.
Le submission si leggono nel pannello Netlify → Forms.

reCAPTCHA v2 con chiavi proprie (`src/components/Recaptcha.astro`): lo script di Google si carica solo quando
il visitatore arriva al form o ci clicca. Variabili d'ambiente su Netlify:

| Variabile               | Valore                      | Scope            |
| :---------------------- | :-------------------------- | :--------------- |
| `SITE_RECAPTCHA_KEY`    | site key reCAPTCHA v2       | Builds + Runtime |
| `SITE_RECAPTCHA_SECRET` | secret key reCAPTCHA v2     | Runtime          |

Senza `SITE_RECAPTCHA_KEY` la build usa il reCAPTCHA fornito da Netlify (script sincrono iniettato da Netlify).

## Font

Hanken Grotesk variabile ospitato sul sito (`@fontsource-variable/hanken-grotesk`), con preload del sottoinsieme latin.

## Prodotti e CMS

`/admin` (Sveltia CMS) modifica `src/content/products/`: ogni salvataggio è un commit su `main` e Netlify ricostruisce il sito.
Accesso con un token GitHub fine-grained (solo questo repo, Contents: read and write).
Lo schema in `src/content.config.ts` e i campi in `public/admin/config.yml` devono restare allineati.

## Comandi

| Comando           | Azione                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Installa le dipendenze                  |
| `npm run dev`     | Dev server su `localhost:4321`          |
| `npm run check`   | Controllo tipi (anche dizionari IT/EN)  |
| `npm run build`   | Controllo tipi + build in `./dist/`     |
| `npm run preview` | Anteprima locale della build            |
