import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer.tsx';
import PostCreatePage from "./components/Pages/PostCreatePage.tsx";
import ContactUsPage from "./components/Pages/ContactUsPage.tsx";
import AboutUsPage from "./components/Pages/AboutUsPage.tsx";
import ProfilePage from "./components/Pages/ProfilePage.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import ReviewsList from "./components/Interaction/ReviewsList.tsx";
import ReviewPage from "./components/Pages/ReviewPage.tsx";
import GiveawaysList from "./components/Interaction/GiveawaysList.tsx";
import GiveawayPage from "./components/Pages/GiveawayPage.tsx";
import NewsList from "./components/Interaction/NewsList.tsx";
import NewsPage from "./components/Pages/NewsPage.tsx";
import HomePage from "./components/Pages/HomePage.tsx";
import AdminPage from "./components/Pages/AdminPage.tsx";
import SearchPage from "./components/Pages/SearchPage.tsx";
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/news" element={<NewsList />} />
                    <Route path="/news/:id" element={<NewsPage />} />
                    <Route path="/giveaways" element={<GiveawaysList />} />
                    <Route path="/giveaways/:id" element={<GiveawayPage />} />
                    <Route path="/reviews" element={<ReviewsList />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/users/:username" element={<ProfilePage />} />
                    <Route path="/create-post" element={<PostCreatePage />} />
                    <Route path="/create-post/:category/:id" element={<PostCreatePage />} />
                    <Route path="/contactus" element={<ContactUsPage />} />
                    <Route path="/reviews/:id" element={<ReviewPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/aboutus" element={<AboutUsPage />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;