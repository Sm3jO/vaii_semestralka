import React, {useEffect, useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

interface UserData {
    username: string;
    email: string;
    password: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, isLogin, setIsLogin }) => {
    const { login } = useAuth();

    const handleRegistration = async (userData : UserData) => {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            if (isLogin) {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();

                if (response.ok && data.user && data.token) {
                    login(data.user, data.token);
                }
            } else {
                const data = await handleRegistration(userData);

                if (data.user && data.token) {
                    login(data.user, data.token);
                }
            }
        } catch (error) {
            console.error('Error when sending data', error);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
                {isLogin ? (
                    <div>
                        <h3 className="text-xl font-medium text-center">Welcome Back</h3>
                        {/* Login */}
                        <div className="px-6 py-4">
                            <form onSubmit={handleSubmit}>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" name="email" />
                                </div>

                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" name="password" />
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>

                                    <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                            <span className="text-sm text-gray-600">Don't have an account? </span>
                            <button onClick={() => setIsLogin(false)} className="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-medium text-center">Create an Account</h3>
                        {/* Register */}
                        <div className="px-6 py-4">
                            <form onSubmit={handleSubmit}>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Username" aria-label="Username" name="username" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" name="email" />
                                </div>
                                <div className="w-full mt-4">
                                    <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" name="password" />
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                            <span className="text-sm text-gray-600">Already have an account? </span>
                            <button onClick={() => setIsLogin(true)} className="mx-2 text-sm font-bold text-blue-500 hover:underline">Login</button>
                        </div>
                    </div>
                )}
                <button onClick={handleClose} className="absolute top-0 right-0 p-2">X</button>
            </div>
        </div>
    );
};

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [userImage, setUserImage] = useState<string>('');

    useEffect(() => {
        if (user && user.profile_picture) {
            setUserImage(user.profile_picture);
        }
    }, [user]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
                        </li>
                        <li>
                            <Link to="reviews" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Reviews</Link>
                        </li>
                        {user ? (
                            <div className="relative inline-block text-left">
                                <img
                                    src={userImage || 'http://localhost:3000/uploads/default-profile-picture.jpg'}
                                    alt="User Avatar"
                                    className="h-8 w-8 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {isDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logout}>Sign Out</a>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => setIsModalOpen(true)} className="text-sm">Sign In</button>
                        )}
                    </ul>
                </div>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} isLogin={isLogin} setIsLogin={setIsLogin} />
        </nav>
    );
};

export default Header;
