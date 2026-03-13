import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-display font-bold text-white mb-4">
                            Ajay's Jwellers
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Your trusted destination for exquisite jewelry. Quality craftsmanship with timeless elegance.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gold-600 rounded-full flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-gold-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-sm hover:text-gold-400 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm hover:text-gold-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm hover:text-gold-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/shipping" className="text-sm hover:text-gold-400 transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-sm hover:text-gold-400 transition-colors">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-sm hover:text-gold-400 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-sm hover:text-gold-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">
                                    Ajay's Jwellers<br />Ahmedabad, Gujarat
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                <a href="tel:+919876543210" className="text-sm hover:text-gold-400 transition-colors">
                                    +91 00000 00000
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                                <a href="mailto:ajaysjwellers@gmail.com" className="text-sm hover:text-gold-400 transition-colors break-all">
                                    ajaysjwellers@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Ajay's Jwellers. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
