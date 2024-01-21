import React, { useState, useEffect } from 'react';
import NewsPost from '../ui-elements/NewsPost.tsx';

interface News {
    id: number;
    title: string;
    content: string;
    authorname: string;
    authorimage: string;
    image_url: string;
    created_at: string;
}

const NewsList: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/news');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data.news);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            {news.map(newsItem => (
                <NewsPost
                    key={newsItem.id}
                    title={newsItem.title}
                    summary={newsItem.content.substring(0, 200) + "..."}
                    image_url={newsItem.image_url || "http://localhost:3000/uploads/image-not-found.png"}
                    authorImage={newsItem.authorimage || "http://localhost:3000/uploads/default-author-image.jpg"}
                    authorName={newsItem.authorname}
                    created_at={newsItem.created_at}
                    readMoreLink={`/news/${newsItem.id}`}
                />
            ))}
        </div>
    );
};

export default NewsList;