import Contact from '../../src/site-pages/Contact';

export const metadata = {
  title: 'Contact',
  description: 'Questions about a CEZLIAR attar, dhoop, gift or order? Get in touch with us.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <Contact />;
}
