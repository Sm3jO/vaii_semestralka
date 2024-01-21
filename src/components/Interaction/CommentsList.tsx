import React, { useState, useEffect, useContext } from 'react';
import Comment from "../ui-elements/Comment.tsx";
import AuthContext from "../../contexts/AuthContext.tsx";
import AddComment from "./AddComment.tsx";

interface CommentType {
    id: number;
    user_id: number;
    content_id: number;
    content_type: string;
    content: string;
    created_at: string;
    username: string;
    profile_picture: string | null;
    replies?: CommentType[];
    refreshComments?: () => void;
}

interface SingleComment extends CommentType {
    refreshComments: () => void;
}

interface CommentsListProps {
    contentId: number;
    contentType: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ contentId, contentType }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { user } = useContext(AuthContext);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${contentType}/${contentId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            const enrichedComments = data.map((comment: CommentType) => ({
                ...comment,
                refreshComments: fetchComments,
                replies: comment.replies?.map(reply => ({
                    ...reply,
                    refreshComments: fetchComments
                }))
            }));
            setComments(enrichedComments as SingleComment[]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [contentId, contentType]);

    const handleDelete = async (commentId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            await fetchComments();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = async (commentId: number, editedText: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ comment_text: editedText }),
            });
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
            await fetchComments();
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleReply = async (parentCommentId: number, replyText: string) => {
        if (!user) {
            console.error('User is not authenticated');
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
                    comment_text: replyText,
                    user_id: user.id,
                    parent_comment_id: parentCommentId
                })
            });
            if (!response.ok) {
                throw new Error('Failed to post reply');
            }
            await fetchComments();
        } catch (error) {
            console.error('Error posting reply:', error);
        }
    };

    const canEditOrDelete = (comment: CommentType) => {
        const isAuthor = user && user.id.toString() === comment.user_id.toString();
        const isAdmin = user && user.role === 'admin';
        return isAuthor ?? isAdmin ?? false;
    };

    return (
        <div>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={{ ...comment, refreshComments: fetchComments } as SingleComment}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    canEditOrDelete={canEditOrDelete(comment)}
                    onReply={handleReply}
                    canReply={user !== null}
                    refreshComments={fetchComments}
                />
            ))}
            <AddComment contentId={contentId} contentType={contentType} onCommentAdded={fetchComments} />
        </div>
    );
};

export default CommentsList;
