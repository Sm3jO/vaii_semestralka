import React from 'react';
import NewsPost from '../ui-elements/NewsPost.tsx';

const NewsPage: React.FC = () => {
    return (
        <div>
            <NewsPost
                category="News"
                title="Sample News Title"
                summary="Short summary of the news..."
                imageUrl="/path-to-news-image.jpg"
                authorImage="/path-to-author-image.jpg"
                authorName="John Doe"
                authorRole="Reporter"
                readMoreLink="/news/1"
            />
        </div>
    );
};

export default NewsPage;