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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const limit = 10;
                const response = await fetch(`http://localhost:3000/api/reviews?page=${currentPage}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReviews(data.reviews);
                setTotalPages(Math.ceil(data.totalCount / limit));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className="container mx-auto p-4">
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

            <div className="flex justify-center mt-8">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1} className="mx-2 px-4 py-2 text-sm text-black bg-white border border-gray-300 rounded hover:bg-gray-100">
                    Previous Page
                </button>
                <span className="text-black font-bold">
                    {currentPage} of {totalPages}
                </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages} className="mx-2 px-4 py-2 text-sm text-black bg-white border border-gray-300 rounded hover:bg-gray-100">
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default ReviewsList;
