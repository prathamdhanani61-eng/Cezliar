import Blogs from '../../src/site-pages/Blogs';

export const metadata = {
  title: 'Blogs & Guides',
  description: 'Read CEZLIAR stories and guides about fragrance, perfumery, and home care.',
  alternates: { canonical: '/blogs' },
};

export default function Page() { return <Blogs />; }
