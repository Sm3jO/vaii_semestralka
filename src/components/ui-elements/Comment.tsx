import React, { useState } from 'react';
import { Link } from "react-router-dom";

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
}

interface SingleComment extends CommentType {
    refreshComments: () => void;
}

interface CommentProps {
    comment: SingleComment;
    onDelete: (commentId: number) => void;
    onEdit: (commentId: number, editedContent: string) => void;
    canEditOrDelete: boolean;
    onReply: (commentId: number, replyText: string) => void;
    canReply: boolean;
    refreshComments: () => void;
}

const Comment: React.FC<CommentProps> = ({comment, onDelete, onEdit, canEditOrDelete, onReply, canReply }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(comment.id, editedContent);
        setIsEditing(false);
        comment.refreshComments();
    };

    const handleReplySubmit = () => {
        onReply(comment.id, replyContent);
        setReplyContent('');
        setShowReplyForm(false);
        comment.refreshComments();
    };

    return (
        <div className="mb-4">
            <div className="flex items-center">
                <img src={comment.profile_picture || 'http://localhost:3000/uploads/default-profile-picture.jpg'}
                     alt={comment.username}
                     className="w-10 h-10 rounded-full object-cover mr-2" />
                <div>
                    <Link to={`/users/${comment.username}`}>
                        <strong>{comment.username}</strong>
                    </Link>
                    {isEditing ? (
                        <div>
                            <textarea value={editedContent}
                                      onChange={(e) => setEditedContent(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded" />
                            <button onClick={handleSave}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Save
                            </button>
                        </div>
                    ) : (
                        <p>{comment.content}</p>
                    )}
                    {canEditOrDelete && !isEditing && (
                        <>
                            <button onClick={handleEdit}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(comment.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Delete
                            </button>
                        </>
                    )}
                    {canReply && (
                        <button onClick={() => setShowReplyForm(!showReplyForm)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                            Reply
                        </button>
                    )}
                    {showReplyForm && (
                        <div>
                            <textarea value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded" />
                            <button onClick={handleReplySubmit}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Submit Reply
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={{ ...reply, refreshComments: comment.refreshComments }}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            canEditOrDelete={canEditOrDelete}
                            onReply={onReply}
                            canReply={canReply}
                            refreshComments={comment.refreshComments}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
