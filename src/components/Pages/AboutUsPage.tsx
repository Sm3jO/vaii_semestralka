import React from 'react';

const AboutUsPage: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8">
                    <h1 className="text-5xl font-extrabold text-center mb-10">About Us</h1>

                    <div className="space-y-8">
                        <p className="text-xl">
                            Welcome to <span className="text-indigo-300 font-semibold">Gaming Paradise</span>, where gaming enthusiasts find a home. We are your gateway to a world of endless gaming experiences.
                        </p>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-semibold">Our Mission</h2>
                            <p>At Gaming Paradise, we're more than just a website; we're a thriving community of passionate gamers, reviewers, and content creators.</p>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-3xl font-semibold">What We Offer</h2>
                            <ul className="list-disc list-inside space-y-3 mt-4 pl-5">
                                <li>Up-to-the-minute gaming news and updates</li>
                                <li>Unbiased game reviews and recommendations</li>
                                <li>In-depth guides and tutorials</li>
                                <li>A platform for discussions, sharing, and networking</li>
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-3xl font-semibold">Join Our Community</h2>
                            <p>Join us on this adventure as we explore new games, share our thoughts, and make memories together. Welcome to Gaming Paradise, your home away from the keyboard, controller, or screen.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;