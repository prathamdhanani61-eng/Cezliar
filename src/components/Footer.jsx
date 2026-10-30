'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Camera, Play,
  Mail, MapPin, Phone, MessageCircle,
  ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer bg-footer text-gray-300 font-body">

      {/* ── Main Footer Content ── */}
      <div className="container mx-auto px-5 md:px-10 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Info — spans 2 columns on lg */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo/logo.png"
                alt="CEZLIAR — Premium Luxury Fragrance"
                className="h-9 object-contain brightness-0 invert opacity-90"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              The pinnacle of premium fragrance and home care. Crafted with rare ingredients from India's royal perfume heartlands, designed for the modern connoisseur.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 flex-wrap">
              {[
                { Icon: Camera, label: 'Instagram', mark: 'IG', href: 'https://instagram.com/cezliar' },
                { label: 'Facebook', mark: 'f', href: '#' },
                { Icon: Play, label: 'YouTube', mark: '▶', href: '#' },
                { label: 'Twitter / X', mark: 'X', href: '#' },
              ].map(({ Icon, label, mark, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all duration-300 text-gray-400"
                >
                  {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-bold">{mark}</span>}
                </a>
              ))}
              {whatsappNumber && <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 text-gray-400"
              >
                <MessageCircle className="w-4 h-4" />
              </a>}
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3 font-semibold">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {['VISA', 'MC', 'UPI', 'RuPay', 'COD', 'Net'].map((method, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-gray-800 text-[9px] font-bold text-gray-300 tracking-wider rounded border border-gray-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-heading font-bold text-gold tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Shop All', to: '/shop' },
                { label: 'Our Story', to: '/about' },
                { label: 'Blogs & Tips', to: '/blogs' },
                { label: 'Contact Us', to: '/contact' },
              ].map(({ label, to }, i) => (
                <li key={i}>
                  <Link
                    href={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-gold" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-5">
            <h4 className="text-sm font-heading font-bold text-gold tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Premium Attars', to: '/collections/fragrance-collection/attars' },
                { label: 'Solid Perfumes', to: '/collections/fragrance-collection/solid-perfumes' },
                { label: 'Luxury Dhoop', to: '/collections/fragrance-collection/dhoop' },
                { label: 'Pro Drain Opener', to: '/collections/home-care-collection/drain-cleaner' },
                { label: 'Water Filtration', to: '/collections/water-care-collection' },
              ].map(({ label, to }, i) => (
                <li key={i}>
                  <Link
                    href={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-gold" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-sm font-heading font-bold text-gold tracking-wider uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed text-xs">
                  123 Palace Road, Heritage District,<br />
                  Jaipur, Rajasthan 302001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+911411234567" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +91 141 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:concierge@cezliar.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  concierge@cezliar.com
                </a>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="pt-2">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3 font-semibold">Newsletter</p>
              {subscribed ? (
                <p className="text-gold text-xs font-semibold">Thank you for subscribing! ✓</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-grow bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 px-3 py-2.5 text-xs focus:outline-none focus:border-gold/50 transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-3 py-2.5 text-[10px] font-bold transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    ›
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-5 md:px-10 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-gray-500">CEZLIAR</span>. All rights reserved. Premium Fragrance &amp; Home Care — Made in India 🇮🇳
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-700">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="text-gray-700">·</span>
            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
            <span className="text-gray-700">·</span>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
