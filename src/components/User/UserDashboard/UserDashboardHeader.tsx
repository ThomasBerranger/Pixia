import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { useAuth } from '../../../contexts/authContext.tsx';
import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import AvatarCustomizer from './AvatarCustomizer.tsx';

export default function UserDashboardHeader({
    user,
}: {
    user: UserType | undefined;
}) {
    const { isAdmin } = useAuth();

    const [displayAvatarEdit, setDisplayAvatarEdit] = useState(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

    return (
        <>
            <section className="flex flex-wrap items-center gap-4 mb-12 card-primary px-3 py-4 sm:p-5 sm:pt-4">
                {user ? (
                    <>
                        <div
                            className="cursor-pointer hover:opacity-80 flex items-center justify-center"
                            onClick={() =>
                                setDisplayAvatarEdit(!displayAvatarEdit)
                            }
                        >
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
                        <div className="flex-shrink-0">
                            <h1 className="font-righteous text-4xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent">
                                {user?.username}
                            </h1>
                            <div>
                                <div className="flex flex-shrink-0 items-center gap-0.5 text-xs sm:text-sm">
                                    <strong className="text-retro-accent">
                                        ⭐ {user?.score} points
                                    </strong>
                                </div>
                            </div>
                        </div>
                        {isAdmin() && (
                            <Link
                                to={ROUTES.ADMIN}
                                className="btn-ghost px-6 py-3 sm:ml-auto sm:mt-0 text-xs"
                            >
                                ⚙️ Admin
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
                        ? 'max-h-[2000px] opacity-100 mb-12'
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
