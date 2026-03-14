import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import type { UserDashboardType } from '../../../types/User/userDashboardType.ts';
import type { ContributionType } from '../../../types/Contribution/contributionType.ts';
import UserDashboardBadge from './UserDashboardBadge.tsx';
import UserDashboardGames from './UserDashboardGames.tsx';
import UserDashboardStatistic from './UserDashboardStatistic.tsx';
import UserDashboardDangerZone from './UserDashboardDangerZone.tsx';
import UserDashboardHeader from './UserDashboardHeader.tsx';
import UserDashboardContribution from './UserDashboardSuggestion.tsx';
import { BADGES } from '../../../constants/badges.ts';
import { hasBadge } from '../../../utils/user.ts';
import { PiHandHeartBold, PiShareNetworkBold } from 'react-icons/pi';
import { useModal } from '../../../hooks/useModal.tsx';
import { URLS } from '../../../constants/routes.ts';

function UserDashboard() {
    const { apiCall } = useApi();
    const { openModal } = useModal();

    const [userDashboard, setUserDashboard] = useState<
        UserDashboardType | undefined
    >();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDashboard: UserDashboardType = await apiCall(
                    ENDPOINTS.ME
                );

                setUserDashboard(userDashboard);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, [apiCall]);

    const handleShare = async () => {
        const user = userDashboard?.user;
        if (!user) return;

        try {
            await navigator.share({
                title: `Profil de ${user.username}`,
                text: 'Regarde un peu ça',
                url: `${import.meta.env.VITE_URL}${URLS.USER_SHOW(user.slug)}`,
            });
        } catch (error) {
            console.log(error);
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_URL}${URLS.USER_SHOW(user.slug)}`
            );
            alert('Lien copié !');
        }
    };

    const handleSponsor = async () => {
        const user = userDashboard?.user;
        if (!user) return;

        try {
            await navigator.share({
                title: 'À toi de jouer !',
                text: 'Tu connais ton ciné ?',
                url: `${import.meta.env.VITE_URL}${URLS.USER_SPONSOR(user.slug)}`,
            });
        } catch (error) {
            console.log(error);
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_URL}${URLS.USER_SPONSOR(user.slug)}`
            );
            alert('Lien copié !');
        }
    };

    const handleSubmitContribution = async (
        formData: { title: string; description: string },
        type: string
    ): Promise<void> => {
        const newContribution: ContributionType = await apiCall(
            ENDPOINTS.CONTRIBUTION,
            {
                method: 'POST',
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    type,
                }),
            }
        );

        setUserDashboard((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                user: {
                    ...prev.user,
                    contributions: [
                        ...prev.user.contributions,
                        newContribution,
                    ],
                },
            };
        });
    };

    return (
        <section className="md:min-h-[89vh] py-10 px-[7vw]">
            <UserDashboardHeader user={userDashboard?.user} />

            <UserDashboardBadge badges={userDashboard?.user.badges} />

            <UserDashboardGames
                success={userDashboard?.successCount}
                games={userDashboard?.games}
                authoredGameCount={userDashboard?.authoredGameCount}
                tokens={userDashboard?.user.tokens}
                history={userDashboard?.history}
            />

            <UserDashboardStatistic
                rank={userDashboard?.user.rank}
                streak={userDashboard?.streak}
                playerCount={userDashboard?.playerCount}
            />

            <section className="mb-10 sm:mb-8">
                <h2 className="text-left sm:text-center sm:p-2 font-title text-retro-accent text-3xl mb-5">
                    <span className="inline-flex items-center flex-wrap gap-1">
                        SUGGESTIONS
                        {userDashboard?.user &&
                            !hasBadge(
                                userDashboard.user.badges,
                                BADGES.BUG_DETECTED.key,
                                BADGES.GAME_SUGGESTION.key
                            ) && (
                                <span className="badge-primary text-xxs px-2 py-0 whitespace-nowrap">
                                    10 points
                                </span>
                            )}
                    </span>
                </h2>
                {userDashboard && (
                    <UserDashboardContribution
                        contributions={userDashboard.user.contributions}
                        onSubmitContribution={handleSubmitContribution}
                    />
                )}
            </section>

            <section className="flex justify-center gap-3 mb-10">
                <button
                    className="btn-ghost flex justify-center items-center gap-2 w-1/2 py-2.5"
                    onClick={handleShare}
                >
                    <PiShareNetworkBold className="text-2xl" />
                    <p className="text-xs">Partager</p>
                </button>

                <div className="w-1/2 relative">
                    <button
                        type="button"
                        onClick={() =>
                            openModal(
                                'Parrainage',
                                <div className="w-full text-white font-righteous font-light text-center">
                                    <p className="text-lg mt-5">
                                        🤝 Comment ca fonctionne ?
                                    </p>

                                    <div className="flex flex-col mt-3 mx-auto w-fit">
                                        <div className="flex items-center gap-3 py-2">
                                            <p className="badge badge-primary text-xxs w-fit shrink-0">
                                                5 points
                                            </p>
                                            <p className="text-left text-xs">
                                                Pour chaque filleul inscris
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 py-2">
                                            <p className="badge badge-primary text-xxs w-fit shrink-0">
                                                5 points
                                            </p>
                                            <p className="text-left text-xs">
                                                Après ses 10 premières
                                                victoires
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs mx-auto mt-3">
                                        Merci de faire vivre Pixia ! Fais
                                        découvrir le jeu à des vrais joueurs,
                                        on compte sur ton fair-play 🫶
                                    </p>
                                    <button
                                        className="btn-ghost mt-6 mx-auto px-10 py-1.5"
                                        onClick={handleSponsor}
                                    >
                                        <PiHandHeartBold className="mx-auto my-1.5 text-3xl" />
                                        <p>Parrainer</p>
                                    </button>
                                </div>
                            )
                        }
                        className="btn-ghost flex justify-center items-center gap-2 w-full py-2.5"
                    >
                        <PiHandHeartBold className="text-2xl" />
                        <p className="text-xs">Parrainer</p>
                    </button>

                    <p className="absolute -bottom-3.5 right-4 badge badge-primary text-xxs w-fit">
                        10 points
                    </p>
                </div>
            </section>

            <UserDashboardDangerZone user={userDashboard?.user} />
        </section>
    );
}

export default UserDashboard;
