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

    useEffect(() => {
        const fetchGiveaways = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/giveaways');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGiveaways(data.giveaways);
            } catch (error) {
                console.error("Error fetching giveaways:", error);
            }
        };

        fetchGiveaways();
    }, []);

    return (
        <div>
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
        </div>
    );
};

export default GiveawaysList;