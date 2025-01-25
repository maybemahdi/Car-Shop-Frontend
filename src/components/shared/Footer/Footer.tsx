import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="w-[90%] md:w-[88%] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CarZ</h3>
            <p className="mb-4">
              Your trusted partner in finding the perfect ride. Quality cars,
              exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://facebook.com"
                className="hover:text-primary transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="https://twitter.com"
                className="hover:text-primary transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="https://instagram.com"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Our Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <Link
                  to="mailto:info@carz.com"
                  className="hover:text-primary transition-colors"
                >
                  info@carz.com
                </Link>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>123 Car Street, Auto City, AC 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="mb-4">
              Subscribe to our newsletter for the latest offers and news.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-[14px] bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button text="Subscribe" />
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} CarZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
