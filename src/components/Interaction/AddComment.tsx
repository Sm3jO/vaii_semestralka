import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext.tsx';

interface AddCommentProps {
    contentId: number;
    contentType: string;
    onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({ contentId, contentType, onCommentAdded }) => {
    const [commentText, setCommentText] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            alert("You must be logged in to post a comment.");
            return;
        }

        if (commentText.trim() === '') {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content_id: contentId,
                    content_type: contentType,
                    comment_text: commentText,
                    user_id: user.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            setCommentText('');
            onCommentAdded();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default AddComment;