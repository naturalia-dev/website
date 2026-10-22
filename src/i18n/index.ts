// src/i18n/index.ts
// Italian at the root, English under /en (astro.config.mjs → i18n).
// Each page is one view in src/views; src/pages/x.astro and src/pages/en/x.astro only pick the language.
import { it } from './it';
import { en } from './en';

export type Lang = 'it' | 'en';

const dictionaries = { it, en };

export const t = (lang: Lang) => dictionaries[lang];

export const getLang = (url: URL): Lang => /^\/en(\/|$)/.test(url.pathname) ? 'en' : 'it';

/** Internal link in the given language: "/products/" → "/en/products/", "/" → "/en/" */
export const localizePath = (path: string, lang: Lang) =>
  lang === 'en' ? (path === '/' ? '/en/' : `/en${path}`) : path;
