import React from 'react';

interface PostProps {
    category: string;
    title: string;
    summary: string;
    image_url: string;
    authorImage: string;
    authorName: string;
    readMoreLink: string;
    created_at: string;
}

const removeImageTags = (htmlString : String) => {
    return htmlString.replace(/<img[^>]*>/g, "");
};

const ReviewsPost: React.FC<PostProps> = ({ category, title, summary, image_url, authorImage, authorName, readMoreLink ,created_at}) => {
    const defaultAuthorImage = 'http://localhost:3000/uploads/default-profile-picture.jpg';
    const NoImageSummary = removeImageTags(summary);
    return (
        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={image_url} alt="" />
                    <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                        <p className="text-sm text-blue-500 uppercase">{category}</p>

                        <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline">
                            {title}
                        </a>

                        <div className="mt-3 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: NoImageSummary }}>
                        </div>
                        <a href={readMoreLink} className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">Read more</a>
                        <div className="flex items-center mt-6">
                            <img
                                className="object-cover object-center w-10 h-10 rounded-full"
                                src={authorImage || defaultAuthorImage}
                                alt="Author"
                            />
                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700">{authorName}</h1>
                                <p className="text-xs text-gray-500">
                                    Date Added: {new Date(created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsPost;