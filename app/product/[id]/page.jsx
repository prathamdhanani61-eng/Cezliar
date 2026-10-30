import { notFound, permanentRedirect } from 'next/navigation';
import ProductDetail from '../../../src/site-pages/ProductDetail';
import { getProductBySlugOrId, getProductImages, products, toProductCard } from '../../../src/data/products';
import { getProductSlug, getProductUrl } from '../../../src/utils/product';
import { SITE_URL } from '../../../src/utils/site';

export function generateStaticParams() {
  return products.map((product) => ({ id: getProductSlug(product) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  const description = `${product.description}`.slice(0, 157).trimEnd();
  const image = getProductImages(product)[0];
  return {
    title: product.name,
    description,
    alternates: { canonical: getProductUrl(product) },
    openGraph: { type: 'website', title: product.name, description, url: getProductUrl(product), images: image ? [{ url: image, alt: product.name }] : [] },
    twitter: { card: 'summary_large_image', title: product.name, description, images: image ? [image] : [] },
  };
}

// Same sub-category first, then the rest of the main category.
const relatedFor = (product) => {
  const others = products.filter((p) => p.id !== product.id);
  const same = others.filter((p) => p.subCategory === product.subCategory);
  const family = others.filter((p) => p.subCategory !== product.subCategory && p.mainCategory === product.mainCategory);
  return [...same, ...family].slice(0, 4).map(toProductCard);
};

export default async function Page({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);
  if (!product) notFound();
  if (id !== getProductSlug(product)) permanentRedirect(getProductUrl(product));

  const images = getProductImages(product);
  const structuredProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images.map((image) => new URL(image, SITE_URL).toString()),
    sku: product.id,
    category: `${product.mainCategory} / ${product.subCategory}`,
    brand: { '@type': 'Brand', name: 'CEZLIAR' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}${getProductUrl(product)}`,
      priceCurrency: 'INR',
      price: product.price,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredProduct) }} />
      <ProductDetail product={product} relatedProducts={relatedFor(product)} />
    </>
  );
}
