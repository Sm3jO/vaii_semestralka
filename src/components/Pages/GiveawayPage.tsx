import React, {useEffect, useState,} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentsList from '../Interaction/CommentsList.tsx';
import DOMPurify from 'dompurify';
import { useAuth } from '../../contexts/AuthContext.tsx';

const GiveawayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [giveaway, setGiveaway] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isAdmin, isAuthor } = useAuth();




    useEffect(() => {
        const fetchGiveaway = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/giveaways/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.content) {
                    data.content = DOMPurify.sanitize(data.content);
                }
                setGiveaway(data);
            } catch (error) {
                console.error('Error fetching giveaway:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGiveaway();
    }, [id]);

    const handleEdit = () => {
        navigate(`/create-post/giveaways/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this giveaway?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/giveaways/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the giveaway');
                }

                navigate('/giveaways');
            } catch (error) {
                console.error('Error deleting giveaway:', error);
                alert('Error deleting giveaway');
            }
        }
    };

    <button
        onClick={handleDelete}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${!isAdmin() && !isAuthor() && 'hidden'}`}
    >
        Delete Giveaway
    </button>

    const handleJoinGiveaway = async () => {
        setErrorMessage(null);
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
                setErrorMessage(resData.message || 'Failed to join the giveaway');
            } else {
                const updatedGiveaway = await response.json();
                setGiveaway(updatedGiveaway);
            }
        } catch (error) {
            console.error("Error joining giveaway:", error);
            setErrorMessage('An error occurred while trying to join the giveaway.');
        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    };

    const contentId = id ? parseInt(id, 10) : null;


    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!giveaway) return <div className="text-center p-4">No giveaway found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-3">{giveaway.title}</h1>
                    <button
                        onClick={handleEdit}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isAdmin() && !isAuthor() && 'hidden'}`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2 ${!isAdmin() && !isAuthor() && 'hidden'}`}
                    >
                        Delete
                    </button>
                    <p className="text-sm text-gray-500 mb-2">Ends on: {new Date(giveaway.expiration_date).toLocaleDateString()}</p>
                    <div className="flex items-center mb-4">
                        <img
                            className="h-10 w-10 rounded-full mr-4"
                            src={giveaway.authorimage || 'http://localhost:3000/uploads/default-profile-picture.jpg'}
                            alt="Author"
                        />
                        <div>
                            <p className="text-sm font-semibold">{giveaway.authorname}</p>
                            <p className="text-xs text-gray-500">Date Added: {new Date(giveaway.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: giveaway.content }} />
                </div>
            </div>
            <div className="text-center mt-4">
                <span className="text-lg font-semibold">Participants: {giveaway.participant_count}</span>
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={handleJoinGiveaway}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg"
                >
                    Join Giveaway
                </button>
            </div>
            {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                    {errorMessage}
                </div>
            )}
            {contentId && (
                <>
                    <CommentsList contentId={contentId} contentType="giveaway"  />
                </>
            )}
        </div>
    );
};

export default GiveawayPage;
