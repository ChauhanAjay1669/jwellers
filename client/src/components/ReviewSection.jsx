import { Star, User } from 'lucide-react';

const ReviewSection = ({ reviews, loading }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="py-8">
                <p className="text-center text-gray-600">Loading reviews...</p>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
                Customer Reviews ({reviews.length})
            </h3>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        {/* User Info and Rating */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                                    {review.user?.avatar ? (
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5 text-gold-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {review.user?.name || 'Anonymous'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(review.createdAt)}
                                    </p>
                                </div>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating
                                                ? 'fill-gold-500 text-gold-500'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Review Title */}
                        {review.title && (
                            <h4 className="font-semibold text-lg text-gray-900 mb-2">
                                {review.title}
                            </h4>
                        )}

                        {/* Review Comment */}
                        <p className="text-gray-700 leading-relaxed">
                            {review.comment}
                        </p>

                        {/* Verified Badge */}
                        {review.isVerified && (
                            <div className="mt-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                    ✓ Verified Purchase
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
