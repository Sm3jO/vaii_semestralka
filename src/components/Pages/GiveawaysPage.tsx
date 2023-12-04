import React from 'react';
import GiveawaysPost from '../ui-elements/GiveawaysPost.tsx';

const GiveawaysPage: React.FC = () => {
    return (
        <div>
            <GiveawaysPost
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

export default GiveawaysPage;