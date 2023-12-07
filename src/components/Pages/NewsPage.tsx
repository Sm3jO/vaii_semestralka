import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/news/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!news) return <div className="text-center p-4">News article not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-3">{news.title}</h1>
                    <div className="flex items-center mb-4">
                        <img className="h-10 w-10 rounded-full mr-4" src={news.authorimage || 'http://localhost:3000/uploads/default-profile-picture.jpg'} alt="Author" />
                        <div>
                            <p className="text-sm font-semibold">{news.authorname}</p>
                            <p className="text-xs text-gray-500">Date Added: {new Date(news.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
