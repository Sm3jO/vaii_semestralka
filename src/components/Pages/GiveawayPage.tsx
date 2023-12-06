import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GiveawayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [giveaway, setGiveaway] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGiveaway = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/giveaways/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGiveaway(data);
            } catch (error) {
                console.error("Error fetching giveaway:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGiveaway();
    }, [id]);

    const handleJoinGiveaway = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/giveaways/join/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.message || 'Failed to join the giveaway');
            }

            const updatedGiveaway = await response.json();
            setGiveaway(updatedGiveaway);
        } catch (error) {
            console.error("Error joining giveaway:", error);
        }
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!giveaway) return <div className="text-center p-4">No giveaway found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-3">{giveaway.title}</h1>
                    <p className="text-sm text-gray-500 mb-2">Ends on: {new Date(giveaway.expiration_date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500 mb-4">Participants: {giveaway.participant_count}</p>
                    <div className="flex items-center mb-4">
                        <img className="h-10 w-10 rounded-full mr-4" src={giveaway.authorimage || 'http://localhost:3000/uploads/default-profile-picture.jpg'} alt="Author" />
                        <div>
                            <p className="text-sm font-semibold">{giveaway.authorname}</p>
                            <p className="text-xs text-gray-500">Date Added: {new Date(giveaway.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: giveaway.content }} />
                </div>
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={handleJoinGiveaway}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg"
                >
                    Join Giveaway
                </button>

            </div>
        </div>
    );
};

export default GiveawayPage;
