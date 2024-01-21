import React, { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import {useNavigate, useParams} from 'react-router-dom';
import UserProfileCard from "../ui-elements/UserProfileCard.tsx";

interface UserData {
    id: string;
    username: string;
    email: string;
    role: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    profile_picture: string;
    created_at: string;
    password?: string;
    bio?: string;
}

interface EditFields {
    username: boolean;
    email: boolean;
    password: boolean;
    bio: boolean;
}

const ProfilePage: React.FC = () => {
    const { username: urlUsername } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState<UserData>({
        id: '',
        username: '',
        email: '',
        role: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profile_picture: '',
        created_at: '',
        bio: '',
    });
    const [originalUserData, setOriginalUserData] = useState<UserData>({
        id: '',
        username: '',
        email: '',
        role: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profile_picture: '',
        created_at: '',
        bio: '',
    });
    const [editFields, setEditFields] = useState<EditFields>({
        username: false,
        email: false,
        password: false,
        bio: false,
    });
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState('');
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(0);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const usernameToFetch = urlUsername || user?.username;
            if (!usernameToFetch) return;
            try {
                const response = await fetch(`http://localhost:3000/api/users/username/${usernameToFetch}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUserData({ ...data, currentPassword: '', newPassword: '', confirmPassword: '' });
                setOriginalUserData({ ...data, currentPassword: '', newPassword: '', confirmPassword: '' });
                setIsOwnProfile(user?.username === data.username);
                fetchCommentCount(data.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user, urlUsername]);

    const fetchCommentCount = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}/comment-count`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCommentCount(data.commentCount);
        } catch (error) {
            console.error("Error fetching comment count:", error);
        }
    };


    const toggleEditMode = () => {
        setEditMode(!editMode);
    };



    const validateCurrentPassword = async (currentPassword: string) => {
        if (!user?.id) {
            console.error("User ID is missing");
            return false;
        }

        try {
            const response = await fetch('http://localhost:3000/api/validate-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: user.id, password: currentPassword })
            });

            if (!response.ok) {
                throw new Error('Failed to validate password');
            }

            const data = await response.json();
            return data.isValid;
        } catch (error) {
            console.error("Error validating password:", error);
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleEdit = (field: keyof EditFields) => {
        setEditFields({ ...editFields, [field]: true });
    };

    const handleCancelEdit = (field: keyof EditFields) => {
        setEditFields({ ...editFields, [field]: false });
    };

    const handleSaveEdit = async (field: keyof UserData) => {
        if (!user || !user.id) {
            return;
        }

        try {
            if (field === 'password') {
                if (!userData.currentPassword || !userData.newPassword || !userData.confirmPassword) {
                    setShowErrorMessage('Please fill in all password fields.');
                    setTimeout(() => setShowErrorMessage(''), 3000);
                    return;
                }

                if (userData.newPassword !== userData.confirmPassword) {
                    setShowErrorMessage('New password and confirmation do not match.');
                    setTimeout(() => setShowErrorMessage(''), 3000);
                    return;
                }

                const isValidCurrentPassword = await validateCurrentPassword(userData.currentPassword);
                if (!isValidCurrentPassword) {
                    setShowErrorMessage('Current password is incorrect.');
                    setTimeout(() => setShowErrorMessage(''), 3000);
                    return;
                }
            }


            const bodyData: Partial<UserData> = {};
            if (field === 'username' && userData.username !== originalUserData.username) {
                bodyData.username = userData.username;
            }
            if (field === 'email' && userData.email !== originalUserData.email) {
                bodyData.email = userData.email;
            }
            if (field === 'password' ) {
                bodyData.password = userData.newPassword;
            }

            if (field === 'bio') {
                bodyData.bio = userData.bio;
            }

            console.log('Body Data:', bodyData);
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                const data = await response.json();
                if (response.status === 409 && field === 'username') {
                    setShowErrorMessage('This username is already used by someone else.');
                    setTimeout(() => setShowErrorMessage(''), 3000);
                } else {
                    setShowErrorMessage(data.message || 'An error occurred during the update');
                    setTimeout(() => setShowErrorMessage(''), 3000);
                }
                return;
            }

            setShowUpdateMessage(true);
            setTimeout(() => setShowUpdateMessage(false), 3000);

            if (field === 'username' || field === 'email' || field === 'password') {
                logout();
                navigate('/home');
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            setShowErrorMessage('An error occurred during the update');
            setTimeout(() => setShowErrorMessage(''), 3000);
        }

        setEditFields({ ...editFields, [field]: false });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('http://localhost:3000/api/images/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Image upload failed');
            const data = await response.json();
            setUserData({ ...userData, profile_picture: data.imageUrl });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSaveProfilePicture = async (imageUrl: string) => {
        if (!user || !user.id) return;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ profile_picture: imageUrl })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile picture');
            }

            setShowUpdateMessage(true);
            setTimeout(() => setShowUpdateMessage(false), 3000);
        } catch (error) {
            console.error("Error updating profile picture:", error);
            setShowErrorMessage('An error occurred during the update');
            setTimeout(() => setShowErrorMessage(''), 3000);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user || !user.id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    logout();
                    navigate('/reviews');
                    setShowDeleteMessage(true);
                    setTimeout(() => setShowDeleteMessage(false), 3000);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error deleting user account:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
            <div className="space-y-4">
                {!editMode && (
                    <>
                        <UserProfileCard
                            username={userData.username}
                            profile_picture={userData.profile_picture || 'http://localhost:3000/uploads/default-profile-picture.jpg'}
                            created_at={new Date(userData.created_at).toLocaleDateString()}
                            bio={userData.bio}
                            role={userData.role}
                            commentCount={commentCount}
                        />

                        {isOwnProfile && (
                            <button onClick={toggleEditMode} className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                                Edit Profile
                            </button>
                        )}
                    </>
                )}

                {editMode && isOwnProfile &&(
                    <>
                        <div className="flex items-center">
                            <img src={userData.profile_picture || 'default-profile.jpg'} alt="Profile" className="h-24 w-24 rounded-full mr-4" />
                            <label className="cursor-pointer text-blue-500 hover:text-blue-600">
                                Change your profile picture
                                <input type="file" className="hidden" onChange={handleImageUpload} />
                            </label>
                            <button onClick={() => handleSaveProfilePicture(userData.profile_picture)} className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                                Save Profile Picture
                            </button>
                        </div>
                        <div><strong>ID:</strong> {userData.id}</div>
                        <div><strong>Registered:</strong> {new Date(userData.created_at).toLocaleDateString()}</div>
                        <div className="flex items-center">
                            <strong>Username:</strong>
                            {editFields.username ? (
                                <>
                                    <input type="text" name="username" value={userData.username} onChange={handleChange} className="ml-2 p-2 border border-gray-300 rounded-md"/>
                                    <button type="button" onClick={() => handleCancelEdit('username')} className="ml-2 px-2 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-md">Cancel</button>
                                    <button type="button" onClick={() => handleSaveEdit('username')} className="ml-2 px-2 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md">Save</button>
                                </>
                            ) : (
                                <>
                                    {userData.username}
                                    <button type="button" onClick={() => handleEdit('username')} className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">Edit</button>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            <strong>Email:</strong>
                            {editFields.email ? (
                                <>
                                    <input type="email" name="email" value={userData.email} onChange={handleChange} className="ml-2 p-2 border border-gray-300 rounded-md"/>
                                    <button type="button" onClick={() => handleCancelEdit('email')} className="ml-2 px-2 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-md">Cancel</button>
                                    <button type="button" onClick={() => handleSaveEdit('email')} className="ml-2 px-2 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md">Save</button>
                                </>
                            ) : (
                                <>
                                    {userData.email}
                                    <button type="button" onClick={() => handleEdit('email')} className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">Edit</button>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            <strong>Password:</strong>
                            {editFields.password ? (
                                <div className="flex flex-col ml-2">
                                    <input type="password" name="currentPassword" value={userData.currentPassword} onChange={handleChange} placeholder="Current Password" className="p-2 border border-gray-300 rounded-md mb-2"/>
                                    <input type="password" name="newPassword" value={userData.newPassword} onChange={handleChange} placeholder="New Password" className="p-2 border border-gray-300 rounded-md mb-2"/>
                                    <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" className="p-2 border border-gray-300 rounded-md mb-2"/>
                                    <button type="button" onClick={() => handleCancelEdit('password')} className="px-2 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-md">Cancel</button>
                                    <button type="button" onClick={() => handleSaveEdit('password')} className="px-2 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md">Save</button>
                                </div>
                            ) : (
                                <>
                                    ••••••••
                                    <button type="button" onClick={() => handleEdit('password')} className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">Edit</button>
                                </>
                            )}
                        </div>
                        <div className="mt-4">
                            <strong>Bio:</strong>
                            {editFields.bio ? (
                                <div className="mt-2">
            <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
            />
                                    <div className="flex justify-end mt-2">
                                        <button onClick={() => handleCancelEdit('bio')} className="px-2 py-1 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded-md mr-2">Cancel</button>
                                        <button onClick={() => handleSaveEdit('bio')} className="px-2 py-1 text-sm text-white bg-green-500 hover:bg-green-600 rounded-md">Save</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="ml-2 whitespace-pre-wrap">
                                    {userData.bio || 'No bio available'}
                                    <button onClick={() => handleEdit('bio')} className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md">Edit</button>
                                </div>
                            )}
                        </div>
                        {showUpdateMessage && (
                            <div className="alert alert-success mt-4">
                                Your credentials were successfully updated.
                            </div>
                        )}
                        {showErrorMessage && (
                            <div className="text-red-500 alert alert-danger mt-4">
                                {showErrorMessage}
                            </div>
                        )}
                        {showDeleteMessage && (
                            <div className="alert alert-success mt-4">
                                Your account was successfully deleted.
                            </div>
                        )}

                        <button onClick={handleDeleteAccount} className="px-4 py-2 mt-4 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md">
                            Delete Account
                        </button>

                        <button onClick={toggleEditMode} className="px-4 py-2 mt-4 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md">
                            Cancel Edit
                        </button>
                    </>
                )}


            </div>
        </div>
    );
};

export default ProfilePage;