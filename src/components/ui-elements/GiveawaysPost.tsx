import React from 'react';

interface GiveawaysPostProps {
    title: string;
    summary: string;
    image_url: string;
    authorImage: string;
    authorName: string;
    created_at: string;
    readMoreLink: string;
    participant_count: number;
    expiration_date: string;
}

const GiveawaysPost: React.FC<GiveawaysPostProps> = ({title, summary, image_url, authorImage, authorName, created_at,readMoreLink , participant_count, expiration_date
}) => {
    const defaultAuthorImage = 'http://localhost:3000/uploads/default-profile-picture.jpg';
    const defaultImageUrl = 'http://localhost:3000/uploads/default-image.jpg';

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex lg:items-center">
                    <img className="object-cover w-full lg:w-1/2 rounded-xl h-72 lg:h-96" src={image_url || defaultImageUrl} alt="Giveaway" />
                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                        <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                            {summary}
                        </div>
                        <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                            Giveaway Ending: {new Date(expiration_date).toLocaleDateString()}
                        </div>
                        <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                            Number of Participants: {participant_count}
                        </div>
                        <a href={readMoreLink} className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">Read more</a>
                        <div className="flex items-center mt-6">
                            <img
                                className="object-cover object-center w-10 h-10 rounded-full"
                                src={authorImage || defaultAuthorImage}
                                alt={authorName}
                            />
                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700 dark:text-gray-200">{authorName}</h1>
                                <p className="text-xs text-gray-500">Date Added: {new Date(created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiveawaysPost;