import React, { useState, useEffect } from 'react';
import ReviewsPost from '../ui-elements/ReviewsPost';

interface Review {
    id: number;
    title: string;
    content: string;
    authorName: string;
    authorImage: string;
    imageUrl: string;
    created_at: string;
}

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/reviews');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReviews(data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            {reviews.map(review => (
                <ReviewsPost
                    key={review.id}
                    category="Reviews"
                    created_at={review.created_at}
                    title={review.title}
                    summary={review.content.substring(0, 200) + "..."}
                    imageUrl={review.imageUrl || "/default-news-image.jpg"}
                    authorImage={review.authorImage || "/default-author-image.jpg"}
                    authorName={review.authorName}
                    readMoreLink={`/reviews/${review.id}`}
                />
            ))}
        </div>
    );
};

export default ReviewsPage;