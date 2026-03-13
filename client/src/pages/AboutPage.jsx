import { Award, Heart, Shield, Sparkles, TrendingUp, Users } from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { value: '10+', label: 'Years of Excellence', icon: Award },
        { value: '50K+', label: 'Happy Customers', icon: Users },
        { value: '1000+', label: 'Jewelry Designs', icon: Sparkles },
        { value: '99%', label: 'Satisfaction Rate', icon: TrendingUp },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Crafted with Love',
            description: 'Every piece is handcrafted with passion and attention to detail by our skilled artisans.'
        },
        {
            icon: Shield,
            title: 'Certified Quality',
            description: 'All our jewelry comes with authenticity certificates and quality guarantees.'
        },
        {
            icon: Sparkles,
            title: 'Timeless Elegance',
            description: 'We create designs that transcend trends, offering timeless beauty for generations.'
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gold-50 to-gold-100 py-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920')] opacity-10 bg-cover bg-center"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
                            About Jwellers
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Crafting exquisite jewelry since 2013, we bring you the perfect blend of traditional
                            craftsmanship and contemporary design.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story */}
            <div className="container-custom py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Founded with a passion for creating beautiful jewelry that tells a story, Jwellers has
                                grown from a small family workshop to one of India's most trusted jewelry brands.
                            </p>
                            <p>
                                Our journey began with a simple belief: everyone deserves to wear jewelry that makes
                                them feel special. Today, we continue that tradition by offering an exquisite collection
                                of necklaces, earrings, rings, and bangles that celebrate life's precious moments.
                            </p>
                            <p>
                                Each piece in our collection is carefully crafted using premium materials including
                                gold, silver, diamonds, and precious gemstones. Our master craftsmen bring decades of
                                experience to ensure every detail is perfect.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800"
                                alt="Jewelry craftsmanship"
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold-500 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -top-6 -right-6 w-48 h-48 bg-gold-600 rounded-full opacity-20 blur-3xl"></div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-gold-500 to-gold-600 py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center text-white">
                                <div className="flex justify-center mb-4">
                                    <stat.icon className="w-12 h-12" />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gold-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="container-custom py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        Our Values
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We are committed to excellence, authenticity, and creating jewelry that brings joy
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gold-100 rounded-xl flex items-center justify-center mb-6">
                                <value.icon className="w-8 h-8 text-gold-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Craftsmanship Section */}
            <div className="bg-gray-50 py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800"
                                    alt="Master craftsman at work"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                                Master Craftsmanship
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Our artisans possess skills passed down through generations, combined with modern
                                    techniques to create jewelry that is both timeless and contemporary.
                                </p>
                                <p>
                                    From the initial design sketch to the final polish, every step is meticulously
                                    executed to ensure perfection. We use only the finest materials and gemstones,
                                    sourced ethically from trusted suppliers worldwide.
                                </p>
                                <p>
                                    Quality control is paramount at every stage. Each piece undergoes rigorous testing
                                    and inspection before it reaches you, ensuring it meets our high standards of
                                    excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Experience the Jwellers Difference
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Discover our exquisite collection and find the perfect piece that speaks to your style
                    </p>
                    <button
                        onClick={() => window.location.href = '/products'}
                        className="btn-primary bg-gold-600 hover:bg-gold-700 px-8 py-4 text-lg"
                    >
                        Explore Collections
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
