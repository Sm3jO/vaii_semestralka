import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer.tsx';
//import Sidebar from './components/layout/Sidebar.tsx';
import Navigation from './components/layout/Navigation.tsx';
import NewsPage from "./components/Pages/NewsPage.tsx";
import PostCreatePage from "./components/Pages/PostCreatePage.tsx";
import ContactUsPage from "./components/Pages/ContactUsPage.tsx";
import AboutUsPage from "./components/Pages/AboutUsPage.tsx";
import ProfilePage from "./components/Pages/ProfilePage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ReviewsList from "./components/Pages/ReviewsList.tsx";
import ReviewPage from "./components/Pages/ReviewPage.tsx";
import GiveawaysList from "./components/Pages/GiveawaysList.tsx";
import GiveawayPage from "./components/Pages/GiveawayPage.tsx";
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/giveaways" element={<GiveawaysList />} />
                    <Route path="/giveaways/:id" element={<GiveawayPage />} />
                    <Route path="/reviews" element={<ReviewsList />} />
                    <Route path="/create-post" element={<PostCreatePage />} />
                    <Route path="/contactus" element={<ContactUsPage />} />
                    <Route path="/reviews/:id" element={<ReviewPage />} />
                    <Route path="/aboutus" element={<AboutUsPage />} />
                    <Route path="/nav" element={<Navigation />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;