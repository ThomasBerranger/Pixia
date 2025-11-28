import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import type { UserDashboardType } from '../../../types/User/userDashboardType.ts';
import type { ContributionType } from '../../../types/Contribution/contributionType.ts';
import UserDashboardBadge from './UserDashboardBadge.tsx';
import UserDashboardStatistic from './UserDashboardStatistic.tsx';
import UserDashboardHistory from './UserDashboardHistory.tsx';
import UserDashboardDangerZone from './UserDashboardDangerZone.tsx';
import UserDashboardHeader from './UserDashboardHeader.tsx';
import UserDashboardContribution from './UserDashboardSuggestion.tsx';
import { BADGES } from '../../../constants/badges.ts';
import { hasBadge } from '../../../utils/user.ts';

function UserDashboard() {
    const { apiCall } = useApi();

    const [userDashboard, setUserDashboard] = useState<
        UserDashboardType | undefined
    >();
    const [displayHistorique, setDisplayHistorique] = useState(true);

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

    const handleSubmitContribution = async (
        formData: { title: string; description: string },
        type: string
    ): Promise<void> => {
        const newContribution: ContributionType = await apiCall(
            ENDPOINTS.USER_CONTRIBUTION_INDEX,
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
        <>
            <UserDashboardHeader user={userDashboard?.user} />

            <UserDashboardBadge badges={userDashboard?.user.badges} />

            <UserDashboardStatistic
                success={userDashboard?.success}
                games={userDashboard?.games}
                rank={userDashboard?.rank}
            />

            <section className="grid grid-cols-1 sm:grid-cols-2">
                <div
                    className={`${displayHistorique ? 'bg-retro-muted bg-opacity-30' : 'cursor-pointer'} p-5 text-center duration-500 transition-all order-1`}
                    onClick={() => setDisplayHistorique(true)}
                >
                    <h2 className="font-title text-retro-accent text-3xl">
                        Historique récent
                    </h2>
                </div>

                <div
                    className={`${!displayHistorique ? 'bg-retro-muted bg-opacity-30' : 'cursor-pointer'} p-5 flex items-center justify-center duration-500 transition-all order-3 sm:order-2`}
                    onClick={() => setDisplayHistorique(false)}
                >
                    <h2 className="font-title text-retro-accent text-3xl">
                        SUGGESTIONS
                    </h2>
                    {userDashboard?.user &&
                        !hasBadge(
                            userDashboard.user.badges,
                            BADGES.BUG_DETECTED.key,
                            BADGES.GAME_SUGGESTION.key
                        ) && (
                            <p className="badge badge-primary text-xxs ml-2.5 px-2 py-1.5">
                                10 points
                            </p>
                        )}
                </div>

                <div className="order-2 sm:order-3 col-span-2 overflow-hidden">
                    <div
                        className={`transition-all duration-1000 ease-in-out ${
                            displayHistorique &&
                            userDashboard &&
                            userDashboard.history.length > 0
                                ? 'max-h-[2000px] opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-4'
                        }`}
                    >
                        {displayHistorique &&
                            userDashboard &&
                            userDashboard.history.length > 0 && (
                                <UserDashboardHistory
                                    history={userDashboard.history}
                                />
                            )}
                    </div>
                </div>

                <div className="col-span-2 order-last overflow-hidden">
                    <div
                        className={`transition-all duration-1000 ease-in-out ${
                            !displayHistorique
                                ? 'max-h-[2000px] opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-4'
                        }`}
                    >
                        {!displayHistorique && userDashboard && (
                            <UserDashboardContribution
                                contributions={userDashboard.user.contributions}
                                onSubmitContribution={handleSubmitContribution}
                            />
                        )}
                    </div>
                </div>
            </section>

            <UserDashboardDangerZone user={userDashboard?.user} />
        </>
    );
}

export default UserDashboard;
