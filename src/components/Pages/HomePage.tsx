import React, { useEffect, useState } from 'react';
import NewsPost from '../ui-elements/NewsPost.tsx';
import ReviewsPost from '../ui-elements/ReviewsPost.tsx';
import GiveawaysPost from '../ui-elements/GiveawaysPost.tsx';

interface News {
    id: number;
    title: string;
    content: string;
    authorname: string;
    authorimage: string;
    image_url: string;
    created_at: string;
}

interface Review {
    id: number;
    title: string;
    content: string;
    authorname: string;
    authorimage: string;
    image_url: string;
    created_at: string;
}

interface Giveaway {
    id: number;
    title: string;
    content: string;
    authorname: string;
    authorimage: string;
    image_url: string;
    created_at: string;
    participant_count: number;
    expiration_date: string;
}

const HomePage: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [giveaways, setGiveaways] = useState<Giveaway[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchOptions = { method: 'GET' };

            try {
                const [newsRes, reviewsRes, giveawaysRes] = await Promise.all([
                    fetch('http://localhost:3000/api/news?limit=3', fetchOptions),
                    fetch('http://localhost:3000/api/reviews?limit=3', fetchOptions),
                    fetch('http://localhost:3000/api/giveaways?limit=3', fetchOptions)
                ]);

                if (newsRes.ok) {
                    const newsData = await newsRes.json();
                    setNews(newsData.news);
                }

                if (reviewsRes.ok) {
                    const reviewsData = await reviewsRes.json();
                    setReviews(reviewsData.reviews);
                }

                if (giveawaysRes.ok) {
                    const giveawaysData = await giveawaysRes.json();
                    setGiveaways(giveawaysData.giveaways);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Recent News</h2>
                {news.length > 0 ? (
                    news.map(newsItem => (
                        <NewsPost
                            key={newsItem.id}
                            title={newsItem.title}
                            summary={newsItem.content}
                            image_url={newsItem.image_url}
                            authorImage={newsItem.authorimage}
                            authorName={newsItem.authorname}
                            created_at={newsItem.created_at}
                            readMoreLink={`/news/${newsItem.id}`}
                        />
                    ))
                ) : (
                    <p>No recent news available.</p>
                )}
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Recent Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewsPost
                            key={review.id}
                            category="Reviews"
                            created_at={review.created_at}
                            title={review.title}
                            summary={review.content}
                            image_url={review.image_url}
                            authorImage={review.authorimage}
                            authorName={review.authorname}
                            readMoreLink={`/reviews/${review.id}`}
                        />
                    ))
                ) : (
                    <p>No recent reviews available.</p>
                )}
            </section>

                <section className="mb-10">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Currently Going Giveaways</h2>
                {giveaways.length > 0 ? (
                    giveaways.map(giveaway => (
                        <GiveawaysPost
                            key={giveaway.id}
                            title={giveaway.title}
                            summary={giveaway.content}
                            image_url={giveaway.image_url}
                            authorImage={giveaway.authorimage}
                            authorName={giveaway.authorname}
                            created_at={giveaway.created_at}
                            participant_count={giveaway.participant_count}
                            expiration_date={giveaway.expiration_date}
                            readMoreLink={`/giveaways/${giveaway.id}`}
                        />
                    ))
                ) : (
                    <p>No giveaways available right now.</p>
                )}
            </section>
        </div>
    );
};

export default HomePage;