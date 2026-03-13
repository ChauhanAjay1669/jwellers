import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ReturnsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">Returns & Exchange Policy</h1>

                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Return Policy */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <RotateCcw className="w-6 h-6 text-gold-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Return Policy</h2>
                        </div>
                        <div className="text-gray-600 space-y-3">
                            <p>
                                At Ajay's Jwellers, we want you to be completely satisfied with your purchase.
                                We offer a <strong className="text-gold-600">7-day return policy</strong> from the date of delivery.
                            </p>
                            <div className="bg-gold-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-800">Important: Products must be:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                                    <li>Unused and in original condition</li>
                                    <li>With original tags and certificates intact</li>
                                    <li>In original packaging with all accessories</li>
                                    <li>Accompanied by original invoice</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Eligible for Return */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Eligible for Return</h2>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Defective or damaged products</li>
                                <li>Wrong product delivered</li>
                                <li>Product not as described</li>
                                <li>Size issues (for rings and bangles)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Not Eligible */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Not Eligible for Return</h2>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Customized or personalized jewelry</li>
                                <li>Products with missing certificates or tags</li>
                                <li>Damaged due to mishandling after delivery</li>
                                <li>Products beyond 7-day return window</li>
                                <li>Items purchased during special sales (clearance)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Exchange Policy */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-semibold text-gray-800">Exchange Policy</h2>
                        </div>
                        <div className="text-gray-600 space-y-3">
                            <p>We offer exchanges for:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Different size (for rings and bangles)</li>
                                <li>Different design of equal or higher value</li>
                            </ul>
                            <p className="mt-3">
                                <strong>Note:</strong> If exchanging for a higher-value item, you'll need to pay the difference.
                                If exchanging for a lower-value item, the difference will be credited to your account.
                            </p>
                        </div>
                    </section>

                    {/* Return Process */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Return</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gold-600 text-white rounded-full flex items-center justify-center font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Contact Us</h3>
                                    <p className="text-gray-600">
                                        Email us at ajaysjwellers@gmail.com or call +91 00000 00000 with your order details
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gold-600 text-white rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Get Approval</h3>
                                    <p className="text-gray-600">
                                        Our team will review and approve your return request within 24 hours
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gold-600 text-white rounded-full flex items-center justify-center font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Ship the Product</h3>
                                    <p className="text-gray-600">
                                        We'll arrange a pickup or provide a return shipping label
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gold-600 text-white rounded-full flex items-center justify-center font-bold">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Get Refund</h3>
                                    <p className="text-gray-600">
                                        Refund will be processed within 5-7 business days after we receive the product
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Refund Method */}
                    <section className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Refund Method</h3>
                        <p className="text-gray-600">
                            Refunds will be credited to the original payment method. For cash on delivery orders,
                            we'll need your bank details for direct transfer.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
