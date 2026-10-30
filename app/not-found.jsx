import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-heading font-bold text-primary mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-7">The page you requested could not be found.</p>
      <Link className="bg-primary text-white px-7 py-3 text-xs font-bold uppercase tracking-wider" href="/shop">Browse the shop</Link>
    </section>
  );
}
