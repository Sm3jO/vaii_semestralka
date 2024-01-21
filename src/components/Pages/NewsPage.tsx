import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentsList from '../Interaction/CommentsList.tsx';
import DOMPurify from 'dompurify';
import { useAuth } from '../../contexts/AuthContext.tsx';

const NewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAdmin, isAuthor } = useAuth();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/news/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (data.content) {
                    data.content = DOMPurify.sanitize(data.content);
                }

                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/news/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the news article');
                }

                navigate('/news');
            } catch (error) {
                console.error('Error deleting news:', error);
                alert('Error deleting news');
            }
        }
    };
    const handleEdit = () => {
        navigate(`/create-post/news/${id}`);
    };

    const contentId = id ? parseInt(id, 10) : null;

    if (loading) return <div className="text-center p-4">Loading...</div>;

    if (!news) return <div className="text-center p-4">News article not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-3">{news.title}</h1>
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
                    <div className="flex items-center mb-4">
                        <img
                            className="h-10 w-10 rounded-full mr-4"
                            src={news.authorimage || 'http://localhost:3000/uploads/default-profile-picture.jpg'}
                            alt="Author"
                        />
                        <div>
                            <p className="text-sm font-semibold">{news.authorname}</p>
                            <p className="text-xs text-gray-500">
                                Date Added: {new Date(news.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>
            </div>
            {contentId && (
                <>
                    <CommentsList contentId={contentId} contentType="news"  />
                </>
            )}
        </div>
    );
};

export default NewsPage;
