// Server-side product helpers. Client components receive the plain objects
// returned by toProductCard instead of importing this module.
import fs from 'node:fs';
import path from 'node:path';
import productsData from './products.json';
import { getProductSlug } from '../utils/product';
import { formatMarketplaceUrl } from '../utils/url';
import { collectionIdOf } from './categories';

export const products = productsData;

const fileCache = new Map();
export const publicFileExists = (src) => {
  if (!src) return false;
  if (!fileCache.has(src)) fileCache.set(src, fs.existsSync(path.join(process.cwd(), 'public', src)));
  return fileCache.get(src);
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

// Every gallery image that actually exists in /public, without duplicates.
export const getProductImages = (product) => [...new Set([product.image, ...(product.images || [])])].filter(publicFileExists);

export const toProductCard = (product) => ({
  id: product.id,
  slug: getProductSlug(product),
  name: product.name,
  shortName: product.shortName || product.name,
  tagline: product.tagline || product.subCategory,
  notes: product.notes || '',
  moodImage: publicFileExists(product.moodImage) ? product.moodImage : '',
  mainCategory: product.mainCategory,
  subCategory: product.subCategory,
  collection: collectionIdOf(product),
  price: product.price,
  image: publicFileExists(product.image) ? product.image : '',
  amazon: amazonLink(product),
  flipkart: flipkartLink(product),
  isBestSeller: Boolean(product.isBestSeller),
  isNewArrival: Boolean(product.isNewArrival),
});

export const cardsByIds = (ids) => ids.map(getProductById).filter(Boolean).map(toProductCard);
