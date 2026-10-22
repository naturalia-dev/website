// src/content.config.ts
// Products: one folder per product in src/content/products/<slug>/ (index.yaml + its photos and video).
// The folder name is the URL: /products/<slug>/ and /en/products/<slug>/.
// Layout written by Sveltia CMS (/admin, i18n structure single_file_default_root):
// shared fields and the Italian texts at the root, the English texts under `en`.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Texts that change with the language; description is Markdown (## headings, lists, **bold**)
const localized = {
  tagline: z.string(),
  highlights: z.array(z.string()).default([]),
  description: z.string(),
};

const products = defineCollection({
  loader: glob({
    base: './src/content/products',
    pattern: '*/index.yaml',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['available', 'coming_soon']),
    price: z.discriminatedUnion('mode', [
      z.object({ mode: z.literal('amount'), amount: z.number().positive() }),
      z.object({ mode: z.literal('on_request') }),
    ]),
    // Position in the product list (lowest first)
    order: z.number().int().default(100),
    // Photos next to index.yaml ("./cover.webp"), resolved in src/lib/products.ts: a missing file
    // hides the product (with a build warning) instead of failing the whole site build
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    // Short clip: a file next to index.yaml ("./video.mp4") or a YouTube / Vimeo link
    video: z.string().optional(),
    ...localized,
    // Missing until translated: the English pages fall back to the Italian texts
    en: z.object(localized).optional(),
  }),
});

export const collections = { products };
