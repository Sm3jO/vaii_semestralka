import React, {useState, useContext, ChangeEvent, FormEvent, useEffect} from 'react';
import Editor from '../ui-elements/Editor';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from "dompurify";
interface ImageResponse {
    imageUrl: string;
}

const PostCreatePage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id, category: urlCategory } = useParams<{ id: string, category: string }>();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>(urlCategory || 'news');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');


    const sanitizeContent = (htmlContent: string) => {
        return DOMPurify.sanitize(htmlContent);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleContentChange = (data: string) => setContent(sanitizeContent(data));
    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
    const handleExpirationDateChange = (e: ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };





    useEffect(() => {
        const fetchPostData = async () => {
            if (id && urlCategory) {
                setIsEditMode(true);
                setCategory(urlCategory);

                try {
                    const response = await fetch(`http://localhost:3000/api/${urlCategory}/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const postData = await response.json();
                    setTitle(postData.title);
                    setContent(postData.content);
                    setImageUrl(postData.image_url);

                    if (urlCategory === 'giveaways' && postData.expiration_date) {
                        const formattedDate = new Date(postData.expiration_date).toISOString().split('T')[0];
                        setExpirationDate(formattedDate);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Fetch error:", error.message);
                    } else {
                        console.error("Fetch error:", error);
                    }
                }
            }
        };

        fetchPostData();
    }, [id, urlCategory]);

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let finalImageUrl = imageUrl;
        if (image) {
            const imageData = await uploadImage(image);
            finalImageUrl = imageData ? imageData.imageUrl : '';
        }

        if (title.trim() === '' || content.trim() === '') {
            alert("Title and content are required.");
            return;
        }

        const postData = {
            title,
            content,
            author_id: user?.id || '',
            image_url: finalImageUrl,
            ...(category === 'giveaways' && { participant_count: 0, expiration_date: expirationDate })
        };

        const url = `http://localhost:3000/api/${category}${isEditMode ? `/${id}` : ''}`;
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
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
            navigate(`/${category}/${data.id}`);
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
                    <option value="reviews">Reviews</option>
                    <option value="giveaways">Giveaways</option>
                </select>
                <Editor onChange={handleContentChange}
                        initialValue={content} />
                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Image (This image will be displayed in your post):
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                    />
                    {imageUrl && (
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Preview:
                            </label>
                            <img src={imageUrl} alt="Preview" className="max-w-xs mt-2" />
                        </div>
                    )}
                </div>
                {category === 'giveaways' && (
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
            <div className="content-preview ">
                <h3 className="preview-heading font-bold text-xl ">Content Preview</h3>
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>
        </div>
    );
};

export default PostCreatePage;
