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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const limit = 10;
                const response = await fetch(`http://localhost:3000/api/news?page=${currentPage}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data.news);
                setTotalPages(Math.ceil(data.totalCount / limit));
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
        window.scrollTo(0, 0);
    }, [currentPage]);

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

export default NewsList;