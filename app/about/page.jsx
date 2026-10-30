import About from '../../src/site-pages/About';

export const metadata = {
  title: 'Our Story',
  description: 'CEZLIAR makes alcohol-free attars, charcoal-free dhoop and home care for the small rituals of an Indian home. Blended in Surat, Gujarat.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <About />;
}
