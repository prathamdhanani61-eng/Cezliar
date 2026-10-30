import productsData from './products.json';
import { getProductSlug } from '../utils/product';

export const products = productsData;

export const getProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductBySlugOrId = (value) => products.find((product) => product.id === value || getProductSlug(product) === value);
export const getProductsByCategory = (mainCategory) => products.filter(p => p.mainCategory === mainCategory);
export const getProductsBySubCategory = (subCategory, mainCategory) => products.filter(
  (p) => p.subCategory === subCategory && (!mainCategory || p.mainCategory === mainCategory),
);

export const toProductCard = (product) => ({
  id: product.id,
  slug: getProductSlug(product),
  name: product.name,
  mainCategory: product.mainCategory,
  subCategory: product.subCategory,
  price: product.price,
  image: product.image,
  description: product.description,
  amazon: product.amazon,
  flipkart: product.flipkart,
  isBestSeller: product.isBestSeller,
  isNewArrival: product.isNewArrival,
  isOnSale: product.isOnSale,
  isLimited: product.isLimited,
  isTrending: product.isTrending,
});
