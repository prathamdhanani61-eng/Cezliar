import ProductDetail from '../../../src/site-pages/ProductDetail';
import { getProductBySlugOrId, getProductsBySubCategory, toProductCard } from '../../../src/data/products';
import { getProductSlug, getProductUrl } from '../../../src/utils/product';
import products from '../../../src/data/products.json';
import { notFound, permanentRedirect } from 'next/navigation';
import { SITE_URL } from '../../../src/utils/site';

export function generateStaticParams() {
  return products.map((product) => ({ id: getProductSlug(product) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);
  if (!product) return { title: 'Product Not Found', robots: { index: false } };
  const searchDescription = `${product.description} Shop ${product.name} from CEZLIAR, with product details and authorized marketplace listings.`.slice(0, 157).trimEnd();
  return {
    title: product.name,
    description: searchDescription,
    alternates: { canonical: getProductUrl(product) },
    openGraph: { type: 'website', title: product.name, description: product.description, url: getProductUrl(product), images: [{ url: product.image, alt: product.name }] },
    twitter: { card: 'summary_large_image', title: product.name, description: product.description, images: [product.image] },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);
  if (!product) notFound();
  if (id !== getProductSlug(product)) permanentRedirect(getProductUrl(product));
  const relatedProducts = getProductsBySubCategory(product.subCategory, product.mainCategory)
    .filter((item) => item.id !== product.id)
    .slice(0, 4)
    .map(toProductCard);
  const structuredProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: (product.images?.length ? product.images : [product.image]).map((image) => new URL(image, SITE_URL).toString()),
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
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}
