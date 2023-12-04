import React from 'react';

interface PostProps {
    category: string;
    title: string;
    summary: string;
    imageUrl: string;
    authorImage: string;
    authorName: string;
    authorRole: string;
    readMoreLink: string;
}

const NewsPost: React.FC<PostProps> = ({ category, title, summary, imageUrl, authorImage, authorName, authorRole, readMoreLink }) => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={imageUrl} alt="" />
                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <p className="text-sm text-blue-500 uppercase">{category}</p>
                        <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
                            {title}
                        </a>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
                            {summary}
                        </p>
                        <a href={readMoreLink} className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">Read more</a>
                        <div className="flex items-center mt-6">
                            <img className="object-cover object-center w-10 h-10 rounded-full" src={authorImage} alt="" />
                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700 dark:text-gray-200">{authorName}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{authorRole}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsPost;