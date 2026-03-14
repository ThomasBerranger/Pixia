import { URLS } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import AvatarCustomizer from './AvatarCustomizer.tsx';

import { FaCrown, FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../../contexts/authContext.tsx';
import { Link } from 'react-router-dom';
import { format, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getCurrentMonthlyLeaderboard } from '../../../utils/monthlyLeaderboard.ts';
import UserAvatar from '../../../atoms/UserAvatar.tsx';

export default function UserDashboardHeader({
    user,
}: {
    user: UserType | undefined;
}) {
    const { isAdmin, isSuperAdmin } = useAuth();

    const [displayAvatarEdit, setDisplayAvatarEdit] = useState(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

    const currentMonthlyLeaderboard =
        user && getCurrentMonthlyLeaderboard(user);

    return (
        <>
            <section className="lg:flex justify-between card-primary px-3 py-4 sm:p-5 sm:pt-4">
                {user ? (
                    <>
                        <div className="flex items-center">
                            <div
                                className="cursor-pointer hover:opacity-80 relative h-28 w-28 flex-shrink-0"
                                onClick={() =>
                                    setDisplayAvatarEdit(!displayAvatarEdit)
                                }
                            >
                                <UserAvatar
                                    onLoad={() => {
                                        setIsAvatarLoading(false);
                                    }}
                                    avatarUrl={user.avatarUrl}
                                    username={user.username}
                                    className={`transition-all duration-300${isAvatarLoading ? ' blur-md' : ''}`}
                                />
                                <button
                                    className="absolute right-4 bottom-0 rounded-tl-3xl bg-retro-surface pl-2.5 pt-1.5"
                                    onClick={() =>
                                        setDisplayAvatarEdit(!displayAvatarEdit)
                                    }
                                >
                                    <FaUserEdit
                                        size="27px"
                                        className={`text-retro-accent${!user.avatarUrl ? ' animate-pulse' : ''}`}
                                    />
                                </button>
                            </div>
                            <div className="min-w-0 w-full">
                                <h1
                                    className={`font-righteous bg-gradient-to-br from-retro-primary via-retro-secondary
                                                to-retro-accent bg-clip-text text-transparent truncate text-center sm:text-left mb-0.5
                                                ${user.username.length > 20 ? 'text-xl' : user.username.length > 10 ? 'text-2xl' : 'text-3xl'}`}
                                >
                                    {user.username}
                                </h1>
                                <div className="flex justify-evenly sm:justify-start gap-1.5">
                                    <div className="text-center">
                                        <p className="font-title text-retro-accent text-xl">
                                            {user?.score}
                                        </p>
                                        <p className="text-xxs font-righteous text-retro-accent">
                                            Général
                                        </p>
                                    </div>
                                    {currentMonthlyLeaderboard && (
                                        <div className="text-center">
                                            <p className="font-title text-retro-accent text-xl">
                                                {
                                                    currentMonthlyLeaderboard.score
                                                }
                                            </p>
                                            <p className="text-xxs font-righteous text-retro-accent capitalize">
                                                {format(
                                                    startOfMonth(
                                                        currentMonthlyLeaderboard.month
                                                    ),
                                                    'MMMM',
                                                    { locale: fr }
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <p className="font-title text-green-400 text-xl">
                                            {user?.tokens ?? 0}
                                        </p>
                                        <p className="text-xxs font-righteous text-green-400">
                                            Jetons
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(isAdmin() || isSuperAdmin()) && (
                            <Link
                                to={
                                    isSuperAdmin()
                                        ? URLS.SUPER_ADMIN
                                        : URLS.ADMIN
                                }
                                className="hidden sm:flex sm:justify-center sm:items-center btn-ghost py-2.5 sm:px-4"
                            >
                                <FaCrown className="text-3xl mx-auto" />
                            </Link>
                        )}
                    </>
                ) : (
                    <CgSpinner
                        className="animate-spin text-retro-primary mx-auto"
                        size={40}
                    />
                )}
            </section>

            <section
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    displayAvatarEdit
                        ? 'max-h-[2000px] opacity-100 mb-8'
                        : 'max-h-0 opacity-0'
                }`}
            >
                {user && (
                    <AvatarCustomizer
                        username={user.username}
                        avatarUrl={user.avatarUrl}
                    />
                )}
            </section>
        </>
    );
}
