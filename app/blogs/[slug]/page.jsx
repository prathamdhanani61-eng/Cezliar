import { notFound } from 'next/navigation';
import blogs from '../../../src/data/blogs.json';
import { Calendar, Clock, User } from 'lucide-react';
import { SITE_URL } from '../../../src/utils/site';

const cleanSlug = (slug) => slug.trim();
const findBlog = (slug) => blogs.find((blog) => cleanSlug(blog.slug) === slug);

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: cleanSlug(blog.slug) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = findBlog(slug);
  if (!blog) return { title: 'Article Not Found', robots: { index: false } };
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: { type: 'article', title: blog.title, description: blog.excerpt, images: [blog.image] },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = findBlog(slug);
  if (!blog) notFound();
  const structuredArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    datePublished: new Date(blog.date).toISOString(),
    author: { '@type': 'Person', name: blog.author },
    publisher: { '@type': 'Organization', name: 'CEZLIAR', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blogs/${slug}`,
  };

  return (
    <article className="pt-32 pb-24 bg-background min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredArticle) }} />
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" />{blog.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" />{blog.readTime}</span>
          <span className="flex items-center gap-2"><User className="w-4 h-4 text-gold" />{blog.author}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-text leading-tight mb-8">{blog.title}</h1>
        <img src={blog.image} alt={blog.title} className="w-full aspect-[16/9] object-cover mb-10" />
        <div className="prose max-w-none text-gray-700 font-body leading-relaxed space-y-6">
          {blog.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </article>
  );
}
