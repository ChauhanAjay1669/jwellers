import { FileText, Shield, Lock } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900">Terms & Conditions</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 space-y-8 text-gray-600">
                    <p className="text-sm text-gray-500">Last Updated: December 2024</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Ajay's Jwellers. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below. Please read these terms carefully before making any purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Website</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>You must be at least 18 years old to make a purchase</li>
                            <li>You agree to provide accurate and current information</li>
                            <li>You are responsible for maintaining the confidentiality of your account</li>
                            <li>You agree not to use the website for any unlawful purpose</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Product Information</h2>
                        <p>We make every effort to display products accurately, including:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Accurate product descriptions and specifications</li>
                            <li>Actual product images (colors may vary slightly due to screen settings)</li>
                            <li>Current pricing and availability</li>
                            <li>Authentic certifications and hallmark details</li>
                        </ul>
                        <p className="mt-3">
                            However, we do not guarantee that product descriptions or other content is error-free.
                            If a product is not as described, your sole remedy is to return it as per our return policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Pricing & Payment</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>All prices are listed in Indian Rupees (₹)</li>
                            <li>Prices are subject to change without prior notice</li>
                            <li>We reserve the right to cancel orders if pricing errors occur</li>
                            <li>Payment must be made in full before shipment</li>
                            <li>We accept credit/debit cards, UPI, net banking, and COD (for eligible orders)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Orders & Cancellation</h2>
                        <p><strong>Order Confirmation:</strong></p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                            <li>You will receive an order confirmation email after placing an order</li>
                            <li>Acceptance of your order is confirmed when we ship the product</li>
                        </ul>
                        <p><strong>Cancellation:</strong></p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Orders can be cancelled within 24 hours of placement</li>
                            <li>Contact customer service immediately for cancellation requests</li>
                            <li>Once shipped, orders cannot be cancelled (but can be returned)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Shipping & Delivery</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>We ship across India through trusted courier partners</li>
                            <li>Delivery timelines are estimates and not guaranteed</li>
                            <li>We are not liable for delays caused by courier services</li>
                            <li>Risk of loss passes to you upon delivery to the carrier</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Returns & Refunds</h2>
                        <p>
                            Please refer to our <a href="/returns" className="text-gold-600 hover:underline">Returns Policy</a> for detailed information.
                            Key points include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>7-day return window from delivery date</li>
                            <li>Products must be in original condition with tags</li>
                            <li>Customized items are not eligible for return</li>
                            <li>Refunds processed within 5-7 business days</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Authenticity & Certification</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>All gold jewelry is BIS Hallmark certified</li>
                            <li>Diamond jewelry comes with IGI/GIA certification</li>
                            <li>We guarantee the authenticity of all products sold</li>
                            <li>Certificates are provided with every purchase</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Ajay's Jwellers shall not be liable for any indirect,
                            incidental, special, or consequential damages arising from the use of our website or products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Intellectual Property</h2>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>All content on this website is owned by Ajay's Jwellers</li>
                            <li>You may not reproduce, distribute, or use any content without permission</li>
                            <li>Product images and descriptions are copyrighted</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Privacy</h2>
                        <p>
                            Your privacy is important to us. Please read our{' '}
                            <a href="/privacy" className="text-gold-600 hover:underline">Privacy Policy</a> to understand
                            how we collect, use, and protect your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by the laws of India. Any disputes shall be subject
                            to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Changes will be effective immediately
                            upon posting to the website. Your continued use of the website constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section className="bg-gold-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gold-600" />
                            Contact Us
                        </h3>
                        <p>
                            For questions about these terms, please contact us at:
                        </p>
                        <ul className="mt-2 space-y-1">
                            <li>Email: <a href="mailto:ajaysjwellers@gmail.com" className="text-gold-600 hover:underline">ajaysjwellers@gmail.com</a></li>
                            <li>Phone: <a href="tel:+919876543210" className="text-gold-600 hover:underline">+91 00000 00000</a></li>
                            <li>Address: Ajay's Jwellers, Ahmedabad, Gujarat</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
