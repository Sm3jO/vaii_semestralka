import React from 'react';
import '../../css/AboutUsPage.css';

const AboutUsPage: React.FC = () => {
    return (
        <div className="container">
            <h1 className="page-title">About Gaming Paradise</h1>

            <p>Welcome to <span style={{ color: 'darkblue' }}>Gaming Paradise</span>, where gaming enthusiasts find a home. We are your gateway to a world of endless gaming experiences.</p>

            <div className="section">
                <h2 className="section-title">Our Mission</h2>
                <p className="section-content">At Gaming Paradise, we're more than just a website; we're a thriving community of passionate gamers, reviewers, and content creators.</p>
            </div>

            <div className="section">
                <h2 className="section-title">What We Offer</h2>
                <ul className="list-disc">
                    <li className="list-item">Up-to-the-minute gaming news and updates</li>
                    <li className="list-item">Unbiased game reviews and recommendations</li>
                    <li className="list-item">In-depth guides and tutorials</li>
                    <li className="lisat-item">A platform for discussions, sharing, and networking</li>
                </ul>
            </div>

            <div className="section">
                <h2 className="section-title">Join Our Community</h2>
                <p className="section-content">Join us on this adventure as we explore new games, share our thoughts, and make memories together. Welcome to Gaming Paradise, your home away from the keyboard, controller, or screen.</p>

                <button className="join-btn">Join Now</button>
            </div>
        </div>
    );
};

export default AboutUsPage;