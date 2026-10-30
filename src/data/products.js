// Server-side product helpers. Client components receive the plain objects
// returned by toProductCard instead of importing this module.
import fs from 'node:fs';
import path from 'node:path';
import productsData from './products.json';
import { getProductSlug } from '../utils/product';
import { formatMarketplaceUrl } from '../utils/url';
import { collectionIdOf } from './categories';
import { whatsappOrderLink } from './site';

export const products = productsData;

const fileCache = new Map();
export const publicFileExists = (src) => {
  if (!src) return false;
  if (!fileCache.has(src)) fileCache.set(src, fs.existsSync(path.join(process.cwd(), 'public', src)));
  return fileCache.get(src);
};

// Web-sized copy made by scripts/optimize-images.mjs, or the original photo.
export const optimizedImage = (src, width = 640) => {
  if (!src || !src.startsWith('/images/products/')) return src;
  const optimized = src.replace('/images/products/', '/images/optimized/products/').replace(/\.[^.]+$/, `-${width}.webp`);
  return publicFileExists(optimized) ? optimized : src;
};

export const getProducts = () => products;
export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductBySlugOrId = (value) => products.find((product) => product.id === value || getProductSlug(product) === value);
export const getProductsByCategory = (mainCategory) => products.filter((p) => p.mainCategory === mainCategory);
export const getProductsBySubCategory = (subCategory, mainCategory) => products.filter(
  (p) => p.subCategory === subCategory && (!mainCategory || p.mainCategory === mainCategory),
);

// Products without a real listing link fall back to a CEZLIAR search on that marketplace.
const searchQuery = (product) => encodeURIComponent(`CEZLIAR ${product.shortName || product.name}`);
const amazonLink = (product) => formatMarketplaceUrl(product.amazon) || `https://www.amazon.in/s?k=${searchQuery(product)}`;
const flipkartLink = (product) => formatMarketplaceUrl(product.flipkart) || `https://www.flipkart.com/search?q=${searchQuery(product)}`;

// Every gallery photo that exists in /public, without duplicates (original paths).
export const getProductImages = (product) => [...new Set([product.image, ...(product.images || [])])].filter(publicFileExists);

export const toProductCard = (product) => {
  const slug = getProductSlug(product);
  return {
    id: product.id,
    slug,
    name: product.name,
    shortName: product.shortName || product.name,
    tagline: product.tagline || product.subCategory,
    notes: product.notes || '',
    moodImage: publicFileExists(product.moodImage) ? product.moodImage : '',
    mainCategory: product.mainCategory,
    subCategory: product.subCategory,
    collection: collectionIdOf(product),
    price: product.price,
    image: publicFileExists(product.image) ? optimizedImage(product.image) : '',
    thumb: publicFileExists(product.image) ? optimizedImage(product.image, 240) : '',
    amazon: amazonLink(product),
    flipkart: flipkartLink(product),
    whatsapp: whatsappOrderLink({ name: product.name, price: product.price, slug }),
    isBestSeller: Boolean(product.isBestSeller),
    isNewArrival: Boolean(product.isNewArrival),
  };
};

export const cardsByIds = (ids) => ids.map(getProductById).filter(Boolean).map(toProductCard);
