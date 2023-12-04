import React, { useState, useContext } from 'react';
import Editor from '../ui-elements/Editor.tsx';
import AuthContext from '../../contexts/AuthContext.tsx';

const PostCreatePage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('news');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (html: string) => {
        setContent(html);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (category === 'review' && user) {
            try {
                const response = await fetch('http://localhost:3000/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        author_id: user.id
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok');
                }

                const data = await response.json();
                console.log('Review created:', data);

            } catch (error) {
                console.error("Error creating review:", error);

            }
        }
        //TODO: Handle 'giveaway' and 'news' categories
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col p-4">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="mb-4 p-2 border border-gray-300 rounded"
                >
                    <option value="news">News</option>
                    <option value="review">Review</option>
                    <option value="giveaway">Giveaway</option>
                </select>
                <Editor
                    placeholder="Write your post here..."
                    onChange={handleContentChange}
                />
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default PostCreatePage;