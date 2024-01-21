import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext.tsx';

interface SelectOption {
    value: string;
    label: string;
}
interface UserModalProps {
    userId: number;
    onClose: () => void;
}

interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    role: string;
    created_at: string;
}

interface UserEditData {
    username: string;
    email: string;
    role: string;
}

interface EditableFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSave: () => void;
    onEdit: () => void;
    name: string;
    isSelect?: boolean;
    selectOptions?: SelectOption[];
}

const UserModal = ({ userId, onClose }: UserModalProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [editMode, setEditMode] = useState({ username: false, email: false, role: false });
    const [editData, setEditData] = useState<UserEditData>({ username: '', email: '', role: '' });
    const [userContent, setUserContent] = useState<any[]>([]);
    const [contentType, setContentType] = useState('Details');
    const { token } = useContext(AuthContext);
    const navigateToContent = (contentId :number, contentType: string) => {
        navigate(`/${contentType}/${contentId}`);
    };

    useEffect(() => {
        if (contentType === 'Details') {
            fetchUserDetails();
        } else {
            fetchUserContent(contentType);
        }
    }, [userId, token, contentType]);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch user details');
            const data = await response.json();
            setUser(data);
            setEditData({ username: data.username, email: data.email, role: data.role });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = e.target.name as keyof UserEditData;
        setEditData({ ...editData, [fieldName]: e.target.value });
    };

    const handleSave = async (field: string) => {
        const key = field as keyof UserEditData;
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [key]: editData[key] })
            });
            if (!response.ok) throw new Error('Failed to update user');
            fetchUserDetails();
            setEditMode({ ...editMode, [key]: false });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetProfilePicture = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/reset-profile-picture`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to reset profile picture');
            }

            fetchUserDetails();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUserContent = async (type: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}/${type.toLowerCase()}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`Failed to fetch user ${type}`);
            const data = await response.json();
            setUserContent(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleContentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setContentType(event.target.value);
    };

    const renderContent = () => {
        if (contentType === 'Details') {
            return (
                <div>
                    <div className="mb-4 flex justify-between items-center">
                        <label>ID: {user?.id}</label>
                    </div>
                    <EditableField
                        label="Username"
                        value={editData.username}
                        isEditing={editMode.username}
                        onChange={handleChange}
                        onSave={() => handleSave('username')}
                        onEdit={() => setEditMode({ ...editMode, username: true })}
                        name="username"
                    />
                    <EditableField
                        label="Email"
                        value={editData.email}
                        isEditing={editMode.email}
                        onChange={handleChange}
                        onSave={() => handleSave('email')}
                        onEdit={() => setEditMode({ ...editMode, email: true })}
                        name="email"
                    />
                    <EditableField
                        label="Role"
                        value={editData.role}
                        isEditing={editMode.role}
                        onChange={handleChange}
                        onSave={() => handleSave('role')}
                        onEdit={() => setEditMode({ ...editMode, role: true })}
                        name="role"
                        isSelect={true}
                        selectOptions={[
                            { value: 'user', label: 'User' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'author', label: 'Author' }
                        ]}
                    />
                    <div className="mb-4 flex justify-between items-center">
                        <img src={user?.profile_picture || 'http://localhost:3000/uploads/default-profile-picture.jpg'} alt="Profile" className="w-10 h-10 rounded-full"/>
                        <button onClick={resetProfilePicture} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Reset Picture</button>
                    </div>
                    <div className="mb-4">
                        <label>Created At: {user && new Date(user.created_at).toLocaleDateString()}</label>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {userContent.map((item, index) => {
                        switch (contentType) {
                            case 'Comments':
                                return (
                                    <div>
                                        {userContent.map((comment, index) => (
                                            <div key={index} className="mb-2 cursor-pointer hover:bg-gray-400 " onClick={() => navigateToContent(comment.content_id, comment.content_type)}>
                                                <p>Comment: {comment.content}</p>
                                                <p>On: {comment.content_type.charAt(0).toUpperCase() + comment.content_type.slice(1)}</p>
                                                <p>Posted on: {new Date(comment.created_at).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'Reviews':
                                return (
                                    <div>
                                        {userContent.map((item, index) => (
                                            <div key={index} className="mb-2 cursor-pointer hover:bg-gray-400" onClick={() => navigateToContent(item.id, 'reviews')}>
                                                <p>Title: {item.title}</p>
                                                <p>Posted on: {new Date(item.created_at).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'Giveaways':
                                return (
                                    <div key={index} className="mb-2 cursor-pointer hover:bg-gray-400" onClick={() => navigateToContent(item.id, 'giveaways')}>
                                        <p>Title: {item.title}</p>
                                        <p>Participants: {item.participant_count}</p>
                                        <p>Expires on: {new Date(item.expiration_date).toLocaleDateString()}</p>
                                    </div>
                                );
                            case 'News':
                                return (
                                    <div key={index} className="mb-2 cursor-pointer hover:bg-gray-400" onClick={() => navigateToContent(item.id, 'news')}>
                                        <p>Title: {item.title}</p>
                                        <p>Posted on: {new Date(item.created_at).toLocaleDateString()}</p>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-screen overflow-y-auto">
                <button onClick={onClose} className="text-xl font-semibold float-right">X</button>
                <h3 className="text-xl font-semibold text-center mb-4">{contentType}</h3>

                <div className="flex items-center mb-4">
                    <img src={user?.profile_picture || 'http://localhost:3000/uploads/default-profile-picture.jpg'} alt="Profile" className="w-10 h-10 rounded-full mr-2"/>
                    <div>
                        <p>ID: {user?.id}</p>
                        <p>Username: {user?.username}</p>
                    </div>
                    <select onChange={handleContentTypeChange} value={contentType} className="ml-auto p-2 border border-gray-300 rounded">
                        <option value="Details">User Details</option>
                        <option value="Comments">Comments</option>
                        <option value="Reviews">Reviews</option>
                        <option value="Giveaways">Giveaways</option>
                        <option value="News">News</option>
                    </select>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

const EditableField: React.FC<EditableFieldProps> = ({ label, value, isEditing, onChange, onSave, onEdit, name, isSelect = false, selectOptions = [] }) => {
    return (
        <div className="mb-4 flex justify-between items-center">
            <label>{label}:</label>
            {isEditing ? (
                <>
                    {isSelect ? (
                        <select value={value} onChange={onChange} name={name}>
                            {selectOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    ) : (
                        <input type="text" value={value} onChange={onChange} name={name} />
                    )}
                    <button onClick={onSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Save</button>
                </>
            ) : (
                <>
                    <span>{value}</span>
                    <button onClick={onEdit} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                </>
            )}
        </div>
    );
};

export default UserModal;
