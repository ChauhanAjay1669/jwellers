import { Package, Truck, Clock, MapPin } from 'lucide-react';

const ShippingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Shipping Information</h1>

                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Shipping Methods */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Truck className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Shipping Methods</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <div className="border-l-4 border-gold-500 pl-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Standard Delivery</h3>
                                <p>Delivery within 5-7 business days across India</p>
                                <p className="text-sm text-gold-600 mt-1">FREE for orders above ₹50,000</p>
                            </div>
                            <div className="border-l-4 border-gold-500 pl-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Express Delivery</h3>
                                <p>Delivery within 2-3 business days to major cities</p>
                                <p className="text-sm text-gold-600 mt-1">₹500 shipping charge</p>
                            </div>
                            <div className="border-l-4 border-gold-500 pl-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Premium Delivery</h3>
                                <p>Next day delivery available in select cities</p>
                                <p className="text-sm text-gold-600 mt-1">₹1,000 shipping charge</p>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Time */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Delivery Timeline</h2>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <p>• Orders are processed within 1-2 business days</p>
                            <p>• Custom or made-to-order jewelry may take 2-3 weeks</p>
                            <p>• You will receive a tracking number once your order is shipped</p>
                            <p>• Delivery times may vary during festive seasons</p>
                        </div>
                    </section>

                    {/* Coverage */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Delivery Coverage</h2>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <p>We currently deliver to all locations across India including:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>All metro cities and major towns</li>
                                <li>Tier 2 and Tier 3 cities</li>
                                <li>Remote areas (may take additional 2-3 days)</li>
                            </ul>
                            <p className="mt-4">International shipping is currently not available.</p>
                        </div>
                    </section>

                    {/* Packaging */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Package className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Secure Packaging</h2>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <p>Your jewelry is precious to us. We ensure:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Tamper-proof packaging</li>
                                <li>Insured shipping for all orders</li>
                                <li>Elegant gift packaging available on request</li>
                                <li>Signature required upon delivery for security</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gold-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                        <p className="text-gray-600">
                            For any shipping queries, contact us at{' '}
                            <a href="mailto:ajaysjwellers@gmail.com" className="text-gold-600 hover:underline">
                                ajaysjwellers@gmail.com
                            </a>
                            {' '}or call{' '}
                            <a href="tel:+919876543210" className="text-gold-600 hover:underline">
                                +91 00000 00000
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
