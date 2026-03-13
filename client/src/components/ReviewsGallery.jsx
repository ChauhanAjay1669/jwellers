import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const reviewsData = [
    {
        id: 1,
        image: '/reviews/review_customer_1_1764692942558.png',
        customerName: 'Sarah Mitchell',
        rating: 5,
        comment: 'Absolutely stunning necklace! The craftsmanship is exceptional and it arrived beautifully packaged.',
        product: 'Gold Diamond Necklace'
    },
    {
        id: 2,
        image: '/reviews/review_customer_2_1764693028214.png',
        customerName: 'Emily Chen',
        rating: 5,
        comment: 'These earrings exceeded my expectations. Perfect for special occasions and daily wear!',
        product: 'Diamond Earring Set'
    },
    {
        id: 3,
        image: '/reviews/review_customer_3_1764693140699.png',
        customerName: 'David & Rachel',
        rating: 5,
        comment: 'Our wedding rings are perfect! Thank you for making our special day even more memorable.',
        product: 'Wedding Ring Set'
    },
    {
        id: 4,
        image: '/reviews/review_customer_4_1764693174465.png',
        customerName: 'Jessica Turner',
        rating: 5,
        comment: 'Best gift ever! The packaging was luxurious and the jewelry is breathtaking.',
        product: 'Gold Bracelet'
    },
    {
        id: 5,
        image: '/reviews/review_customer_5_1764693259403.png',
        customerName: 'Margaret Thompson',
        rating: 5,
        comment: 'Classic elegance at its finest. This pearl necklace has become my signature piece.',
        product: 'Pearl Necklace'
    },
    {
        id: 6,
        image: '/reviews/review_customer_6_1764693341650.png',
        customerName: 'Sophia Anderson',
        rating: 5,
        comment: 'Amazing quality and beautiful designs. I keep coming back for more!',
        product: 'Ring Collection'
    }
];

const ReviewsGallery = () => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        Customer <span className="text-gold-600">Reviews</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our happy customers have to say about their jewelry experience
                    </p>
                </div>

                {/* Scroll Controls */}
                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6 text-gold-600 group-hover:text-gold-700" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6 text-gold-600 group-hover:text-gold-700" />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {reviewsData.map((review) => (
                            <div
                                key={review.id}
                                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                {/* Review Image */}
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    <img
                                        src={review.image}
                                        alt={`Review by ${review.customerName}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Review Content */}
                                <div className="p-6">
                                    {/* Rating */}
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-gold-500 text-gold-500"
                                            />
                                        ))}
                                    </div>

                                    {/* Comment */}
                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 italic">
                                        "{review.comment}"
                                    </p>

                                    {/* Customer Info */}
                                    <div className="border-t pt-4 mt-4">
                                        <p className="font-semibold text-gray-900">
                                            {review.customerName}
                                        </p>
                                        <p className="text-sm text-gold-600 font-medium">
                                            {review.product}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Custom CSS to hide scrollbar */}
                <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ReviewsGallery;
