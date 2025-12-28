import { ROUTES } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import AvatarCustomizer from './AvatarCustomizer.tsx';
import { PiHandHeartBold, PiShareNetworkBold } from 'react-icons/pi';
import { useModal } from '../../../hooks/useModal.tsx';
import { FaUserEdit } from 'react-icons/fa';
import { useAuth } from '../../../contexts/authContext.tsx';
import { Link } from 'react-router-dom';
import { format, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getCurrentMonthlyLeaderboard } from '../../../utils/monthlyLeaderboard.ts';

export default function UserDashboardHeader({
    user,
}: {
    user: UserType | undefined;
}) {
    const { openModal } = useModal();
    const { isAdmin } = useAuth();

    const [displayAvatarEdit, setDisplayAvatarEdit] = useState(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);

    const handleShare = async () => {
        if (!user) {
            return;
        }

        try {
            await navigator.share({
                title: `Profil de ${user.username}`,
                text: 'Regarde un peu ça',
                url: `${import.meta.env.VITE_URL}${ROUTES.USER_SHOW(user.slug)}`,
            });
        } catch (error) {
            console.log(error);
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_URL}${ROUTES.USER_SHOW(user.slug)}`
            );
            alert('Lien copié !');
        }
    };

    const handleSponsor = async () => {
        if (!user) {
            return;
        }

        try {
            await navigator.share({
                title: 'À toi de jouer !',
                text: 'Tu connais ton ciné ?',
                url: `${import.meta.env.VITE_URL}${ROUTES.USER_SPONSOR(user.slug)}`,
            });
        } catch (error) {
            console.log(error);
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_URL}${ROUTES.USER_SPONSOR(user.slug)}`
            );
            alert('Lien copié !');
        }
    };

    const currentMonthlyLeaderboard =
        user && getCurrentMonthlyLeaderboard(user);

    return (
        <>
            <section className="sm:flex justify-between mb-8 card-primary px-3 py-4 sm:p-5 sm:pt-4">
                {user ? (
                    <>
                        <div className="flex justify-center items-center gap-2 mb-3 sm:mb-0">
                            <div
                                className="cursor-pointer hover:opacity-80 relative h-28 w-28 flex-shrink-0"
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
                                    className={`transition-all duration-300${isAvatarLoading ? ' blur-md' : ''}`}
                                />
                                <button
                                    className="absolute right-2 bottom-0 rounded-tl-3xl bg-retro-surface pl-3 pt-1.5"
                                    onClick={() =>
                                        setDisplayAvatarEdit(!displayAvatarEdit)
                                    }
                                >
                                    <FaUserEdit className=" text-2xl text-retro-accent" />
                                </button>
                            </div>
                            <div>
                                <h1 className="font-righteous text-4xl line-clamp-2 bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent">
                                    {user?.username}
                                </h1>
                                <div className="flex flex-col flex-shrink-0">
                                    {currentMonthlyLeaderboard && (
                                        <p className="font-title text-retro-accent text-xl">
                                            {currentMonthlyLeaderboard.score}
                                            <span className="text-xxs font-righteous">
                                                {' '}
                                                {format(
                                                    startOfMonth(
                                                        currentMonthlyLeaderboard.month
                                                    ),
                                                    'MMMM',
                                                    { locale: fr }
                                                )}
                                            </span>
                                        </p>
                                    )}
                                    <p className="font-title text-retro-accent text-xl">
                                        {user?.score}
                                        <span className="text-xxs font-righteous">
                                            {' '}
                                            Total
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-start sm:items-center gap-3">
                            <button
                                className="btn-ghost flex justify-center items-center gap-2 w-1/2 py-2.5 sm:px-4"
                                onClick={handleShare}
                            >
                                <PiShareNetworkBold className="text-2xl" />
                                <p className="text-xs sm:text-sm">Partager</p>
                            </button>

                            <div className="w-1/2 relative mb-3 sm:mb-0">
                                <button
                                    type="button"
                                    onClick={() =>
                                        openModal(
                                            'Parrainage',
                                            <div className="w-full text-white font-righteous font-light text-center">
                                                <p className="text-lg sm:text-xl mt-5">
                                                    🤝 Comment ca fonctionne ?
                                                </p>

                                                <div className="flex flex-col mt-3 mx-auto w-fit">
                                                    <div className="flex items-center gap-3 py-2">
                                                        <p className="badge badge-primary text-xxs w-fit shrink-0">
                                                            5 points
                                                        </p>
                                                        <p className="text-left text-xs sm:text-lg">
                                                            Pour chaque filleul
                                                            inscris
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3 py-2">
                                                        <p className="badge badge-primary text-xxs w-fit shrink-0">
                                                            5 points
                                                        </p>
                                                        <p className="text-left text-xs sm:text-lg">
                                                            Après ses 10
                                                            premières victoires
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-xs sm:text-sm sm:w-2/3 mx-auto mt-3">
                                                    Merci de faire vivre Pixia !
                                                    Fais découvrir le jeu à des
                                                    vrais joueurs, on compte sur
                                                    ton fair-play 🫶
                                                </p>
                                                <button
                                                    className="btn-ghost mt-6 mx-auto px-10 py-1.5 sm:py-1.5"
                                                    onClick={handleSponsor}
                                                >
                                                    <PiHandHeartBold className="mx-auto my-1.5 text-3xl" />
                                                    <p>Parrainer</p>
                                                </button>
                                            </div>
                                        )
                                    }
                                    className="btn-ghost flex justify-center items-center gap-2 w-full py-2.5 sm:px-4"
                                >
                                    <PiHandHeartBold className="text-2xl" />
                                    <p className="text-xs sm:text-sm">
                                        Parrainer
                                    </p>
                                </button>

                                <p className="absolute -bottom-3.5 right-4 md:-bottom-5 md:right-3 badge badge-primary text-xxs w-fit">
                                    10 points
                                </p>
                            </div>

                            {isAdmin() && (
                                <Link
                                    to={ROUTES.ADMIN}
                                    className="hidden sm:block btn-ghost py-1 sm:py-1 sm:px-4 text-center"
                                >
                                    <p className="mx-auto mb-0.5 text-xl">⚙️</p>
                                    <p className="text-xs sm:text-sm">Admin</p>
                                </Link>
                            )}
                        </div>
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
