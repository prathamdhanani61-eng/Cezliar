import Home from '../src/site-pages/Home';

export const metadata = {
  title: { absolute: 'CEZLIAR | Alcohol-free Attars, Dhoop & Home Care — Made in India' },
  description: 'Alcohol-free attars, solid perfumes, charcoal-free dhoop and home & water care from CEZLIAR. Blended in Surat, India and sold on Amazon and Flipkart.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <Home />;
}
