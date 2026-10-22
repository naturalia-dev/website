// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Absolute URLs for canonical, hreflang, Open Graph and sitemap
  site: 'https://naturalia.cc',

  vite: {
    plugins: [tailwindcss()]
  },
  // imageCDN off: images are optimized at build time (static files, measurable locally, no Netlify image-transform usage)
  adapter: netlify({ imageCDN: false }),
  integrations: [
    icon(),
    sitemap({
      // Form confirmation pages are noindex: keep them out of the sitemap
      filter: (page) => !/\/success\/?$/.test(page),
      i18n: { defaultLocale: 'it', locales: { it: 'it-IT', en: 'en-US' } },
    }),
  ],

  // Astro 7 default is "jsx" (strips inter-tag whitespace, glues inline words): keep HTML-aware compression
  compressHTML: true,
  
  // I18N CONFIGURATION
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    routing: {
      // false = The default locale (it) is at root "/", English at "/en"
      // true = Italian at "/it", English at "/en"
      // Advice: Keep false for cleaner main URL
      prefixDefaultLocale: false 
    }
  }
});