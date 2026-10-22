// src/lib/products.ts
// Helpers shared by the product list and the product page.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

type Entry = CollectionEntry<'products'>;
/** A product whose photos resolved to files in its folder */
export type Product = Omit<Entry, 'data'> & {
  data: Omit<Entry['data'], 'cover' | 'gallery'> & { cover: ImageMetadata; gallery: ImageMetadata[] };
};

// Photos stored next to index.yaml, processed by astro:assets
const imageFiles = import.meta.glob<ImageMetadata>('/src/content/products/*/*.{webp,jpg,jpeg,png,avif}', {
  import: 'default', eager: true,
});

const findImage = (id: string, src: string) => imageFiles[`/src/content/products/${id}/${src.replace(/^\.\//, '')}`];

const warned = new Set<string>();

/** Resolve the photos; a product without its cover is left out, missing gallery photos are skipped */
function withImages(entry: Entry): Product | null {
  const missing = [entry.data.cover, ...entry.data.gallery].filter(src => !findImage(entry.id, src));
  if (missing.length && !warned.has(entry.id)) warned.add(entry.id) && console.warn(`[products] ${entry.id}: missing ${missing.join(', ')}`);
  const cover = findImage(entry.id, entry.data.cover);
  if (!cover) return null;
  const gallery = entry.data.gallery.map(src => findImage(entry.id, src)).filter(Boolean) as ImageMetadata[];
  return { ...entry, data: { ...entry.data, cover, gallery } };
}

/** In the order set in the CMS, then by name */
export async function getProducts() {
  const products = (await getCollection('products')).map(withImages).filter(p => p !== null);
  return products.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function productPaths() {
  return (await getProducts()).map(product => ({ params: { slug: product.id }, props: { product } }));
}

/** Tagline, highlights and description in the page language (English falls back to Italian) */
export function productText(product: Product, lang: Lang) {
  const { tagline, highlights, description, en } = product.data;
  return lang === 'en' && en ? en : { tagline, highlights, description };
}

/** "1.200 €" / "€1,200", or null when the price is on request */
export function formatPrice(product: Product, lang: Lang) {
  const { price } = product.data;
  if (price.mode !== 'amount') return null;
  return new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-US', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(price.amount);
}

export type Video =
  | { kind: 'file'; src: string }
  | { kind: 'youtube' | 'vimeo'; embed: string };

// Clips stored next to index.yaml, bundled by Vite (hashed URL, removed with the product's folder)
const videoFiles = import.meta.glob<string>('/src/content/products/*/*.{mp4,webm,mov,m4v}', {
  query: '?url', import: 'default', eager: true,
});

/** "./video.mp4" or YouTube / Vimeo link → what the page renders. Embeds are cookie-free and autoplay after the click. */
export function parseVideo(product: Product): Video | null {
  const src = product.data.video;
  if (!src) return null;
  const youtube = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return { kind: 'youtube', embed: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0&playsinline=1` };
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: 'vimeo', embed: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1&title=0&byline=0&portrait=0` };
  const file = videoFiles[`/src/content/products/${product.id}/${src.replace(/^\.\//, '')}`];
  if (file) return { kind: 'file', src: file };
  // Absolute URL of a clip hosted elsewhere
  return /^https?:\/\//.test(src) ? { kind: 'file', src } : null;
}
