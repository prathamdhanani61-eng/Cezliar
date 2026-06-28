import productsData from './products.json';

export const products = productsData;

export const getProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (mainCategory) => products.filter(p => p.mainCategory === mainCategory);
export const getProductsBySubCategory = (subCategory) => products.filter(p => p.subCategory === subCategory);
