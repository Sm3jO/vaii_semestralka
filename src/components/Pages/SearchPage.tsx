import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GiveawaysPost from '../ui-elements/GiveawaysPost';
import NewsPost from '../ui-elements/NewsPost';
import ReviewsPost from '../ui-elements/ReviewsPost';

interface SearchResult {
    id: number;
    title: string;
    summary: string;
    image_url: string;
    authorImage: string;
    authorName: string;
    created_at: string;
    type: 'news' | 'review' | 'giveaway';
    participant_count?: number;
    expiration_date?: string;
}

type ApiResponse = {
    news?: SearchResult[];
    reviews?: SearchResult[];
    giveaways?: SearchResult[];
}

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('term') ?? '';
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                try {
                    const responses = await Promise.all([
                        fetch(`http://localhost:3000/api/news?search=${searchTerm}`),
                        fetch(`http://localhost:3000/api/reviews?search=${searchTerm}`),
                        fetch(`http://localhost:3000/api/giveaways?search=${searchTerm}`)
                    ]);

                    const data = await Promise.all(responses.map(response => response.json()));

                    const flattenedData: SearchResult[] = data.map((item: ApiResponse) => {
                        return Object.values(item)[0].map((subItem: SearchResult) => ({
                            ...subItem,
                            type: Object.keys(item)[0] as 'news' | 'review' | 'giveaway'
                        }));
                    }).flat();

                    setResults(flattenedData);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div>
            <h2>Search results for "{searchTerm}"</h2>
            <div>
                {results.map((item: SearchResult) => {
                    switch (item.type) {
                        case 'news':
                            return <NewsPost key={item.id} {...item} readMoreLink={`/news/${item.id}`} />;
                        case 'review':
                            return <ReviewsPost key={item.id} {...item} readMoreLink={`/reviews/${item.id}`} />;
                        case 'giveaway':
                            return (
                                <GiveawaysPost
                                    key={item.id}
                                    {...item}
                                    participant_count={item.participant_count ?? 0}
                                    expiration_date={item.expiration_date ?? 'No expiration date'}
                                    readMoreLink={`/giveaways/${item.id}`}
                                />
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default SearchPage;
