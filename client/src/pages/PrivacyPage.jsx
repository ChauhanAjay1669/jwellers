import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900">Privacy Policy</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 space-y-8 text-gray-600">
                    <p className="text-sm text-gray-500">Last Updated: December 2024</p>

                    <p className="text-gray-700">
                        At Ajay's Jwellers, we are committed to protecting your privacy and ensuring the security of your personal information.
                        This Privacy Policy explains how we collect, use, and safeguard your data.
                    </p>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Personal Information:</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Name, email address, and phone number</li>
                                    <li>Billing and shipping addresses</li>
                                    <li>Payment information (processed securely through payment gateways)</li>
                                    <li>Account credentials (username and password)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Automatically Collected Information:</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>IP address and browser type</li>
                                    <li>Device information and operating system</li>
                                    <li>Pages visited and time spent on site</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Transaction Information:</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Purchase history and order details</li>
                                    <li>Product preferences and wishlists</li>
                                    <li>Customer service interactions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
                        </div>
                        <p className="mb-3">We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Provide customer support and respond to inquiries</li>
                            <li>Personalize your shopping experience</li>
                            <li>Send promotional emails (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Detect and prevent fraud</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">3. Information Sharing</h2>
                        </div>
                        <p className="mb-3">We may share your information with:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Service Providers:</strong> Payment processors, shipping companies, and email services</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                        </ul>
                        <p className="mt-3 font-semibold text-gray-800">
                            We do NOT sell your personal information to third parties for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
                        </div>
                        <p className="mb-3">We implement industry-standard security measures to protect your data:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>SSL encryption for all data transmissions</li>
                            <li>Secure payment gateways (PCI-DSS compliant)</li>
                            <li>Regular security audits and updates</li>
                            <li>Restricted access to personal information</li>
                            <li>Password protection and encryption</li>
                        </ul>
                        <p className="mt-3 text-sm">
                            However, no method of transmission over the internet is 100% secure.
                            We cannot guarantee absolute security but continuously work to protect your information.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
                        </div>
                        <p className="mb-3">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
                            <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
                        </ul>
                        <p className="mt-3">
                            To exercise these rights, contact us at{' '}
                            <a href="mailto:ajaysjwellers@gmail.com" className="text-gold-600 hover:underline">
                                ajaysjwellers@gmail.com
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies</h2>
                        <p className="mb-3">We use cookies to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Remember your preferences and settings</li>
                            <li>Keep you logged in to your account</li>
                            <li>Analyze site traffic and usage patterns</li>
                            <li>Provide personalized content and recommendations</li>
                        </ul>
                        <p className="mt-3">
                            You can control cookies through your browser settings. However, disabling cookies may limit
                            some functionality of our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for the privacy
                            practices of these external sites. We encourage you to read their privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
                        <p>
                            Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                            personal information from children. If you become aware that a child has provided us with personal
                            information, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Data Retention</h2>
                        <p>
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in
                            this policy, unless a longer retention period is required by law. After this period, we will
                            securely delete or anonymize your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                            updated "Last Updated" date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
                        <p className="mb-3">
                            If you have questions or concerns about this Privacy Policy or your personal information, please contact us:
                        </p>
                        <ul className="space-y-1">
                            <li><strong>Email:</strong> <a href="mailto:ajaysjwellers@gmail.com" className="text-gold-600 hover:underline">ajaysjwellers@gmail.com</a></li>
                            <li><strong>Phone:</strong> <a href="tel:+919876543210" className="text-gold-600 hover:underline">+91 00000 00000</a></li>
                            <li><strong>Address:</strong> Ajay's Jwellers, Ahmedabad, Gujarat, India</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
