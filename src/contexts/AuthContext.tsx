import React, { useState, useEffect, createContext, ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
    profile_picture?: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    isAuthor: () => boolean;
    isAdmin: () => boolean;
}

const defaultContextValue: AuthContextType = {
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    isAuthor: () => false,
    isAdmin: () => false
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (userData: User, userToken: string) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const isAuthor = () => user?.role === 'author';
    const isAdmin = () => user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthor, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
