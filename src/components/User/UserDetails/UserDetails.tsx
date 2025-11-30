import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import type { UserType } from '../../../types/User/userType.ts';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';
import { CgSpinner } from 'react-icons/cg';
import UserDetailsBattle from './UserDetailsBattle.tsx';
import { BADGES } from '../../../constants/badges.ts';

function UserDashboard() {
    const { apiCall } = useApi();
    const navigate = useNavigate();

    const { slug } = useParams<{ slug: string }>();

    const [user, setUser] = useState<UserType | undefined>();
    const [currentUser, setCurrentUser] = useState<UserType | undefined>();
    const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!slug) {
            return;
        }

        const fetchData = async () => {
            try {
                const users: { user: UserType; currentUser?: UserType } =
                    await apiCall(ENDPOINTS.USER_SHOW(slug));

                setUser(users.user);
                setCurrentUser(users.currentUser);
            } catch (error) {
                console.error('Erreur: ', error);

                navigate(ROUTES.NOT_FOUND, { replace: true });
            }
        };

        fetchData();
    }, [apiCall, navigate, slug]);

    return (
        <section className="min-h-[85vh] py-10 px-[5%] sm:px-[10%]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 sm:mb-12 card-primary px-3 py-4 sm:p-5 sm:pt-4">
                {user ? (
                    <>
                        <div className="flex items-center justify-center col-span-2">
                            <img
                                onLoad={() => {
                                    setIsAvatarLoading(false);
                                }}
                                src={
                                    user.avatarUrl ??
                                    `${import.meta.env.VITE_DICE_URL}${user.username}`
                                }
                                alt="Avatar"
                                className={`h-28 w-28 transition-all duration-300${isAvatarLoading ? ' blur-md' : ''}`}
                            />
                        </div>
                        <div className="flex-shrink-0 col-span-2">
                            <h1 className="font-righteous text-4xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent">
                                {user.username}
                            </h1>
                            <p className="font-title text-retro-accent text-2xl">
                                {user?.score}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center sm:grid sm:grid-flow-col sm:grid-rows-2 sm:gap-1">
                            {user?.badges.map((badge) => (
                                <p className="text-3xl">
                                    {BADGES[badge.name].icon}
                                </p>
                            ))}
                        </div>
                    </>
                ) : (
                    <CgSpinner
                        className="animate-spin text-retro-primary mx-auto"
                        size={40}
                    />
                )}
            </div>

            {user && currentUser && (
                <UserDetailsBattle user={user} currentUser={currentUser} />
            )}
        </section>
    );
}

export default UserDashboard;
