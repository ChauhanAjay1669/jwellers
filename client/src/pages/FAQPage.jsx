import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-start justify-between text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
            >
                <span className="font-semibold text-gray-800 pr-4">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gold-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-gray-600 animate-fadeIn">
                    {answer}
                </div>
            )}
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            category: 'Orders & Payment',
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery for orders below ₹1,00,000. For international orders, we accept PayPal and wire transfers.',
                },
                {
                    question: 'How do I track my order?',
                    answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the "My Orders" section.',
                },
                {
                    question: 'Can I cancel or modify my order?',
                    answer: 'Orders can be cancelled or modified within 24 hours of placement. Please contact our customer service immediately. Once the order is processed or shipped, cancellations are not possible.',
                },
            ],
        },
        {
            category: 'Product Information',
            questions: [
                {
                    question: 'Are your products certified?',
                    answer: 'Yes, all our gold jewelry comes with BIS Hallmark certification. Diamond jewelry is certified by IGI or GIA. We provide authenticity certificates with every purchase.',
                },
                {
                    question: 'Do you offer custom designs?',
                    answer: 'Yes, we offer custom jewelry design services. You can share your design ideas, and our expert craftsmen will create a unique piece for you. Custom orders typically take 2-3 weeks.',
                },
                {
                    question: 'What is the purity of gold used?',
                    answer: 'We work with 18K, 22K, and 24K gold. Each product listing specifies the gold purity. All our gold jewelry is BIS Hallmark certified for guaranteed purity.',
                },
            ],
        },
        {
            category: 'Sizing & Fit',
            questions: [
                {
                    question: 'How do I find my ring size?',
                    answer: 'You can visit our store for professional sizing, or use our online ring size guide available on each ring product page. We also offer free ring sizing services for adjustments.',
                },
                {
                    question: 'Can I get my jewelry resized?',
                    answer: 'Yes, we offer free resizing for rings and bangles within 30 days of purchase. After 30 days, resizing charges may apply depending on the design complexity.',
                },
            ],
        },
        {
            category: 'Care & Maintenance',
            questions: [
                {
                    question: 'How should I care for my jewelry?',
                    answer: 'Store jewelry in a dry place, away from moisture. Clean gold jewelry with mild soap and warm water. For diamond jewelry, use a soft brush. Avoid contact with chemicals, perfumes, and cosmetics.',
                },
                {
                    question: 'Do you provide cleaning services?',
                    answer: 'Yes, we offer free professional cleaning services for all jewelry purchased from us. Visit our store or contact us to schedule a cleaning appointment.',
                },
            ],
        },
        {
            category: 'Returns & Exchanges',
            questions: [
                {
                    question: 'What is your return policy?',
                    answer: 'We offer a 7-day return policy from the date of delivery. Products must be unused, in original condition with tags and certificates intact. Custom-made jewelry cannot be returned.',
                },
                {
                    question: 'How long does a refund take?',
                    answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned product. The amount will be credited to your original payment method.',
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our products, orders, and services.
                        Can't find what you're looking for? Contact our support team.
                    </p>
                </div>

                <div className="space-y-8">
                    {faqs.map((category, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white">{category.category}</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {category.questions.map((faq, idx) => (
                                    <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Still Have Questions?</h3>
                    <p className="text-gray-600 mb-6">
                        Our customer support team is here to help you with any queries.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:ajaysjwellers@gmail.com"
                            className="btn-primary inline-block"
                        >
                            Email Us
                        </a>
                        <a
                            href="tel:+919876543210"
                            className="btn-outline inline-block"
                        >
                            Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
