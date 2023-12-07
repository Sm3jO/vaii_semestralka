import React, {useState, useContext, ChangeEvent, FormEvent} from 'react';
import Editor from '../ui-elements/Editor';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ImageResponse {
    imageUrl: string;
}

const PostCreatePage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('news');
    const [image, setImage] = useState<File | null>(null);
    const [expirationDate, setExpirationDate] = useState<string>('');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleContentChange = (data: string) => setContent(data);
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
    const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const uploadImage = async (imageFile: File): Promise<ImageResponse | null> => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:3000/api/images/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Image upload failed');
            return await response.json() as ImageResponse;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const getCategoryPath = (category: String) => {
        switch (category) {
            case 'giveaway':
                return 'giveaways';
            case 'review':
                return 'reviews';
            default:
                return category;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let imageUrl = '';
        if (image) {
            const imageData = await uploadImage(image);
            imageUrl = imageData ? imageData.imageUrl : '';
        }

        const postData = {
            title,
            content,
            author_id: user?.id || '',
            image_url: imageUrl,
            ...(category === 'giveaway' && { participant_count: 0, expiration_date: expirationDate })
        };

        const url = `http://localhost:3000/api/${getCategoryPath(category)}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorData = await response.json() as any;
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            navigate(`/${getCategoryPath(category)}/${data.id}`);
        } catch (error: any) {
            console.error(`Error creating ${category}:`, error.message);
        }
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
                <Editor onChange={handleContentChange} />
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="mb-4"
                />
                {category === 'giveaway' && (
                    <input
                        type="date"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        className="mb-4 p-2 border border-gray-300 rounded"
                    />
                )}
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700"
                >
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default PostCreatePage;
