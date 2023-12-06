import React, { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext.tsx"
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        profile_picture: '',
        created_at: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.id) return;

            try {
                const response = await fetch(`http://localhost:3000/api/users/${user.id}`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUserData({ ...data, password: '' });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }

        };

        fetchUserData();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setUserData({ ...userData, [target.name]: target.value });
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !user.id) {
            console.error("User or user ID is undefined");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user || !user.id) return;

        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    logout();
                    navigate('/reviews');
                }
                else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error deleting user account:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1>Profile Page</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div><strong>ID:</strong> {userData.id}</div>
                <div><strong>Registered:</strong> {new Date(userData.created_at).toLocaleDateString()}</div>

                <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border border-gray-300 rounded-md"/>
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md"/>
                <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="New Password" className="w-full p-2 border border-gray-300 rounded-md"/>
                <input type="file" onChange={handleImageUpload} />
                <div className="flex justify-center space-x-4">
                    <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Save Changes
                    </button>
                    <button onClick={handleDeleteAccount} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;