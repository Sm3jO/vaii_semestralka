import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import UserDetailModal from '../ui-elements/UserModal.tsx'

interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    role: string;
    created_at: string;
}

const AdminPage: React.FC  = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState<'name' | 'id'>('name');
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token]);



    const filteredUsers = searchBy === 'name'
        ? users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
        : users.filter(user => user.id.toString().includes(searchTerm));

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const openUserDetails = (userId: number) => {
        setSelectedUserId(userId);
    };

    const closeUserDetails = () => {
        setSelectedUserId(null);
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded mr-2"
                    placeholder={`Search by ${searchBy}...`}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    onChange={(e) => setSearchBy(e.target.value as 'name' | 'id')}
                    value={searchBy}
                >
                    <option value="name">Name</option>
                    <option value="id">ID</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        className="bg-white p-4 shadow rounded-lg cursor-pointer"
                        onClick={() => openUserDetails(user.id)}
                    >
                    <div key={user.id} className="bg-white p-4 shadow rounded-lg">
                        <img src={user.profile_picture || 'http://localhost:3000/uploads/default-profile-picture.jpg'} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-3"/>
                        <h2 className="text-xl font-semibold text-center">ID: {user.id}</h2>
                        <h2 className="text-xl font-semibold text-center">{user.username}</h2>
                        <p className="text-center text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
                {selectedUserId && (
                    <UserDetailModal
                        userId={selectedUserId}
                        onClose={closeUserDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;