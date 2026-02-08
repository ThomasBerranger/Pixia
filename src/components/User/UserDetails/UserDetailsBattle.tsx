import type { UserType } from '../../../types/User/userType.ts';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import UserAvatar from '../../../atoms/UserAvatar.tsx';

interface BattleHistory {
    date: string;
    image?: string;
    userWon: boolean;
}

export default function UserDetailsBattle({
    user,
    currentUser,
}: {
    user: UserType;
    currentUser: UserType;
}) {
    const [isUserAvatarLoading, setIsUserAvatarLoading] =
        useState<boolean>(true);
    const [isCurrentUserAvatarLoading, setIsCurrentUserAvatarLoading] =
        useState<boolean>(true);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => new Set(prev).add(index));
    };

    const battleHistory = useMemo(() => {
        const history: BattleHistory[] = [];

        user.achievements?.forEach((achievement) => {
            history.push({
                date: achievement.game.date,
                image: achievement.game.image,
                userWon: true,
            });
        });

        currentUser.achievements?.forEach((achievement) => {
            const existingIndex = history.findIndex(
                (h) => h.date === achievement.game.date
            );

            if (existingIndex !== -1) {
                history.splice(existingIndex, 1);
            } else {
                history.push({
                    date: achievement.game.date,
                    image: achievement.game.image,
                    userWon: false,
                });
            }
        });

        return history.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [user.achievements, currentUser.achievements]);

    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Bataille
            </h2>

            <div className="sm:hidden grid grid-cols-12 mb-4">
                <div className="text-center col-span-5">
                    <UserAvatar
                        onLoad={() => setIsCurrentUserAvatarLoading(false)}
                        avatarUrl={currentUser?.avatarUrl}
                        username={currentUser?.username}
                        className={`h-24 w-24 mx-auto transition-all duration-300${isCurrentUserAvatarLoading ? ' blur-md' : ''}`}
                    />
                    <p className="font-righteous text-white mt-2">
                        {currentUser.username}
                    </p>
                </div>
                <div className="col-span-2 flex items-center justify-center font-title text-retro-accent animated-neon-title">
                    vs
                </div>
                <div className="text-center col-span-5">
                    <UserAvatar
                        onLoad={() => setIsUserAvatarLoading(false)}
                        avatarUrl={user?.avatarUrl}
                        username={user?.username}
                        className={`h-24 w-24 mx-auto transition-all duration-300${isUserAvatarLoading ? ' blur-md' : ''}`}
                    />
                    <p className="font-righteous text-white mt-2">
                        {user.username}
                    </p>
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {battleHistory.length === 0 ? (
                    <p className="mx-auto font-righteous col-span-full text-lg">
                        Égalité parfaite : qui brisera l'équilibre ?
                    </p>
                ) : (
                    battleHistory.map((history, index) => (
                        <div
                            key={history.date}
                            className="grid grid-cols-12 items-center gap-2"
                        >
                            <div className="flex flex-wrap justify-center col-span-3">
                                <UserAvatar
                                    onLoad={() =>
                                        setIsCurrentUserAvatarLoading(false)
                                    }
                                    avatarUrl={currentUser?.avatarUrl}
                                    username={currentUser?.username}
                                    className={`hidden sm:block h-1/2 pb-2 mx-auto transition-all duration-300${isCurrentUserAvatarLoading ? ' blur-md' : ''}`}
                                />
                                {!history.userWon ? (
                                    <FaCheck className="text-green-500 text-2xl ml-auto mr-3 sm:mx-auto" />
                                ) : (
                                    <FaTimes className="text-red-500 text-2xl ml-auto mr-3 sm:mx-auto" />
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col justify-center">
                                <Link
                                    to={URLS.GAME_BY_DATE(
                                        format(history.date, 'yyyy-MM-dd', {
                                            locale: fr,
                                        })
                                    )}
                                >
                                    <img
                                        src={
                                            history.image
                                                ? `${import.meta.env.VITE_API_URL}${history.image}`
                                                : 'https://placehold.co/800x400?text=Chargement'
                                        }
                                        onLoad={() => handleImageLoad(index)}
                                        alt="AI created image"
                                        className={`w-full mx-auto object-contain hover:shadow-[0_0px_20px_rgba(0,0,0,0.6)] hover:shadow-retro-accent transition-all duration-300 ${!loadedImages.has(index) ? 'blur-sm' : ''}`}
                                    />
                                </Link>
                                <p className="text-xs text-retro-muted text-center font-righteous capitalize mt-0.5">
                                    {format(history.date, 'd MMMM', {
                                        locale: fr,
                                    })}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center col-span-3">
                                <UserAvatar
                                    onLoad={() => setIsUserAvatarLoading(false)}
                                    avatarUrl={user?.avatarUrl}
                                    username={user?.username}
                                    className={`hidden sm:block h-1/2 pb-2 transition-all duration-300${isUserAvatarLoading ? ' blur-md' : ''}`}
                                />
                                {history.userWon ? (
                                    <FaCheck className="text-green-500 text-2xl mr-auto ml-3 sm:mx-auto" />
                                ) : (
                                    <FaTimes className="text-red-500 text-2xl mr-auto ml-3 sm:mx-auto" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
