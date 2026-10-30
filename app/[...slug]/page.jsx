import { notFound, permanentRedirect } from 'next/navigation';
import Category from '../../src/site-pages/Category';
import { CATEGORY_PAGES, LEGACY_CATEGORY_PATHS, getCategoryIdByPath } from '../../src/data/categories';

const resolve = (slug) => {
  const key = slug.join('/');
  return { key, id: getCategoryIdByPath(`/${key}`), legacy: LEGACY_CATEGORY_PATHS[key] };
};

export function generateStaticParams() {
  return [
    ...Object.values(CATEGORY_PAGES).map((c) => ({ slug: c.path.slice(1).split('/') })),
    ...Object.keys(LEGACY_CATEGORY_PATHS).map((path) => ({ slug: path.split('/') })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { id } = resolve(slug);
  if (!id) return {};
  const config = CATEGORY_PAGES[id];
  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: config.path },
    openGraph: { title: `${config.title} | CEZLIAR`, description: config.description, url: config.path },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { id, legacy } = resolve(slug);
  if (legacy) permanentRedirect(legacy);
  if (!id) notFound();
  return <Category categoryId={id} />;
}
