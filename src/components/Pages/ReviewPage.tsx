import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [review, setReview] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/reviews/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReview(data);
            } catch (error) {
                console.error("Error fetching review:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id]);

    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!review) return <div className="text-center p-4">No review found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-3">{review.title}</h1>
                    <div className="flex items-center mb-4">
                        <img className="h-10 w-10 rounded-full mr-4" src={review.authorImage || '/default-author-image.jpg'} alt="Author" />
                        <div>
                            <p className="text-sm font-semibold">{review.authorName}</p>
                            <p className="text-xs text-gray-500">Date Added: {new Date(review.created_at).toLocaleDateString()}</p>
                            {review.updated_at && <p className="text-xs text-gray-500">Last Edit: {new Date(review.updated_at).toLocaleDateString()}</p>}
                        </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;