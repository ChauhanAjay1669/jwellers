import { useState } from 'react';
import { Star } from 'lucide-react';
import { reviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const { isAuthenticated, user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setError('Please login to submit a review');
            return;
        }

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!comment.trim()) {
            setError('Please write a comment');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await reviewAPI.create({
                product: productId,
                rating,
                title: title.trim(),
                comment: comment.trim()
            });

            // Reset form
            setRating(0);
            setTitle('');
            setComment('');

            // Notify parent component
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-600 mb-4">Please login to write a review</p>
                <a href="/login" className="btn-primary inline-block">Login</a>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                                            ? 'fill-gold-500 text-gold-500'
                                            : 'text-gray-300'
                                        }`}
                                />
                            </button>
                        ))}
                        <span className="ml-2 text-gray-600">
                            {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Title (Optional)
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Summarize your review"
                        className="input-field w-full"
                        maxLength={100}
                    />
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review *
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this product"
                        rows={5}
                        className="input-field w-full resize-none"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto"
                >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
