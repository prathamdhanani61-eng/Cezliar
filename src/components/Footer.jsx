import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-footer text-gray-300 font-body">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo/logo.png"
                alt="CEZLIAR Logo"
                className="h-8 object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              The pinnacle of premium fragrance and home care. Experience luxury in every drop, designed for the modern connoisseur.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-gold tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors duration-200">Shop All</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition-colors duration-200">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-gold tracking-wider">Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/collections/fragrance-collection/attars" className="hover:text-white transition-colors duration-200">Premium Attar</Link></li>
              <li><Link to="/collections/fragrance-collection/dhoop" className="hover:text-white transition-colors duration-200">Luxury Dhoop</Link></li>
              <li><Link to="/collections/home-care-collection/drain-cleaner" className="hover:text-white transition-colors duration-200">Pro Drain Opener</Link></li>
              <li><Link to="/collections/water-care-collection" className="hover:text-white transition-colors duration-200">Water Filtration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-gold tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>123 Palace Road, Heritage District, Jaipur, Rajasthan 302001, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+91 141 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>concierge@cezliar.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter & Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CEZLIAR. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
