import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer.tsx';
//import Sidebar from './components/layout/Sidebar.tsx';
import Navigation from './components/layout/Navigation.tsx';
import NewsPage from "./components/Pages/NewsPage.tsx";
import GiveawaysPage from "./components/Pages/GiveawaysPage.tsx";
import PostCreatePage from "./components/Pages/PostCreatePage.tsx";
import ContactUsPage from "./components/Pages/ContactUsPage.tsx";
import AboutUsPage from "./components/Pages/AboutUsPage.tsx";
import ProfilePage from "./components/Pages/ProfilePage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ReviewsPage from "./components/Pages/ReviewsPage.tsx";
import ReviewPage from "./components/Pages/ReviewPage.tsx";
const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/giveaways" element={<GiveawaysPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
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