export const getProductSlug = (product) => (product.slug || product.name || String(product.id))
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const getProductUrl = (product) => `/product/${getProductSlug(product)}`;
