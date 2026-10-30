import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5 text-sm text-muted">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href
              ? <Link href={item.href} className="text-muted no-underline hover:text-forest">{item.label}</Link>
              : <span aria-current="page" className="text-ink">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
