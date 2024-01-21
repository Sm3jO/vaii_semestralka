import React, { useState, useEffect } from 'react';
import ReviewsPost from '../ui-elements/ReviewsPost.tsx';

interface Review {
    id: number;
    title: string;
    content: string;
    authorname: string;
    authorimage: string;
    image_url: string;
    created_at: string;
}

const ReviewsList: React.FC = () => {
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
                    created_at={review.created_at}
                    title={review.title}
                    summary={review.content.substring(0, 200) + "..."}
                    image_url={review.image_url || "http://localhost:3000/uploads/image-not-found.png"}
                    authorImage={review.authorimage || "http://localhost:3000/uploads/default-profile-picture.jpg"}
                    authorName={review.authorname}
                    readMoreLink={`/reviews/${review.id}`}
                />
            ))}
        </div>
    );
};

export default ReviewsList;