import React, { useState, useEffect } from 'react';
import GiveawaysPost from '../ui-elements/GiveawaysPost.tsx';

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

const GiveawaysList: React.FC = () => {
    const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchGiveaways = async () => {
            try {
                const limit = 10;
                const response = await fetch(`http://localhost:3000/api/giveaways?page=${currentPage}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGiveaways(data.giveaways);
                setTotalPages(Math.ceil(data.totalCount / limit));
            } catch (error) {
                console.error("Error fetching giveaways:", error);
            }
        };

        fetchGiveaways();
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className="container mx-auto p-4">
            {giveaways.map(giveaway => (
                <GiveawaysPost
                    key={giveaway.id}
                    title={giveaway.title}
                    summary={giveaway.content.substring(0, 200) + "..."}
                    image_url={giveaway.image_url || "http://localhost:3000/uploads/image-not-found.png"}
                    authorImage={giveaway.authorimage || "http://localhost:3000/uploads/default-profile-picture.jpg"}
                    authorName={giveaway.authorname}
                    created_at={giveaway.created_at}
                    participant_count={giveaway.participant_count}
                    expiration_date={giveaway.expiration_date}
                    readMoreLink={`/giveaways/${giveaway.id}`}
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

export default GiveawaysList;