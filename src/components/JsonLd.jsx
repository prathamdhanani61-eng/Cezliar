// Structured data for search engines. `<` is escaped so the JSON can never
// close the script tag early.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export const breadcrumbJsonLd = (siteUrl, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: `${siteUrl}${item.href === '/' ? '' : item.href}` } : {}),
  })),
});
