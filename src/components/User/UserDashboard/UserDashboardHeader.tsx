import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { useAuth } from '../../../contexts/authContext.tsx';
import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import AvatarCustomizer from './AvatarCustomizer.tsx';
import { PiHandHeartBold, PiShareNetworkBold } from 'react-icons/pi';
import { useModal } from '../../../contexts/useModal.tsx';

export default function UserDashboardHeader({
    user,
}: {
    user: UserType | undefined;
}) {
    const { isAdmin } = useAuth();
    const { openModal } = useModal();

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

    return (
        <>
            <section className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mb-12 card-primary px-3 py-4 sm:p-5 sm:pt-4">
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
                                    <p className="font-title text-retro-accent text-2xl">
                                        {user?.score}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:ml-auto">
                            <button
                                className="btn-ghost px-6 py-1 sm:py-2.5"
                                onClick={handleShare}
                            >
                                <PiShareNetworkBold className="mx-auto mb-0.5 text-2xl" />
                                <p className="text-xs sm:text-sm">Partager</p>
                            </button>

                            <div className="relative">
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
                                    className="btn-ghost h-full px-6 py-1 sm:py-1.5"
                                >
                                    <PiHandHeartBold className="mx-auto mb-0.5 text-2xl" />
                                    <p className="text-xs sm:text-sm">
                                        Parrainer
                                    </p>
                                </button>

                                <p className="absolute -bottom-5 -right-1 badge badge-primary text-xxs w-fit">
                                    10 points
                                </p>
                            </div>
                            {isAdmin() && (
                                <Link
                                    to={ROUTES.ADMIN}
                                    className="btn-ghost px-10 sm:px-6 py-1 sm:py-1.5 text-center"
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
