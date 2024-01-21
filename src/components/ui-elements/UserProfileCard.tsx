import React from 'react';

interface UserProfileCardProps {
    username: string;
    profile_picture: string;
    created_at: string;
    bio?: string;
    commentCount: number;
    role: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
                                                             username,
                                                             profile_picture,
                                                             created_at,
                                                             bio,
                                                             commentCount,
                                                             role
                                                         }) => {
    return (
        <section className="pt-16 bg-blueGray-50">
            <div className="w-full lg:w-4/12 px-4 mx-auto align-middle">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                        <div className="text-center mt-12">
                            <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700">
                                {username}
                            </h3>
                            <div className="relative mb-4">
                                <img
                                    alt="Profile"
                                    src={profile_picture ? profile_picture : "http://localhost:3000/uploads/default-profile-picture.jpg"}
                                    className="h-48 w-48 rounded-full mx-auto"
                                />
                            </div>
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-user-tag mr-2 text-lg text-blueGray-400"></i>
                                Role: {role}
                            </div>
                            {created_at && (
                                <div className="mb-2 text-blueGray-600 align-middle">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {`Joined us on ${created_at}`}
                                </div>
                            )}
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-comments mr-2 text-lg text-blueGray-400"></i>
                                Comments: {commentCount}
                            </div>
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-2 text-lg leading-relaxed text-blueGray-700 font-bold">Something about me</p>
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                        {bio || "User biography not available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileCard;
