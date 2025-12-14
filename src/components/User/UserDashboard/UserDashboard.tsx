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
        <section className="md:min-h-[89vh] py-10 px-[7vw]">
            <UserDashboardHeader user={userDashboard?.user} />

            <UserDashboardBadge badges={userDashboard?.user.badges} />

            <UserDashboardStatistic
                success={userDashboard?.success}
                games={userDashboard?.games}
                rank={userDashboard?.rank}
            />

            <section className="grid sm:grid-cols-2 mb-10 sm:mb-8">
                <div
                    className={`${displayHistorique ? 'sm:bg-retro-muted sm:bg-opacity-30' : 'cursor-pointer'} 
                    mb-5 text-center duration-500 transition-all order-1`}
                    onClick={() => setDisplayHistorique(true)}
                >
                    <h2 className="text-left sm:text-center sm:p-2 font-title text-retro-accent text-3xl">
                        Historique
                    </h2>
                </div>

                <div
                    className={`order-2 sm:order-3 col-span-2 overflow-hidden mb-8 sm:mb-0 ${!displayHistorique && 'sm:hidden'}`}
                >
                    {userDashboard && userDashboard.history.length > 0 && (
                        <UserDashboardHistory history={userDashboard.history} />
                    )}
                </div>

                <div
                    className={`${!displayHistorique ? 'sm:bg-retro-muted sm:bg-opacity-30' : 'cursor-pointer'} 
                    mb-5 duration-500 transition-all order-3 sm:order-2`}
                    onClick={() => setDisplayHistorique(false)}
                >
                    <h2 className="w-full sm:w-auto text-left sm:p-2 m-0 font-title text-retro-accent text-3xl">
                        SUGGESTIONS
                        {userDashboard?.user &&
                            !hasBadge(
                                userDashboard.user.badges,
                                BADGES.BUG_DETECTED.key,
                                BADGES.GAME_SUGGESTION.key
                            ) && (
                                <span className="badge badge-primary text-xxs ml-1 px-2 py-1.5 align-middle">
                                    10 points
                                </span>
                            )}
                    </h2>
                </div>

                <div
                    className={`col-span-2 order-4 ${displayHistorique && 'sm:hidden'}`}
                >
                    {userDashboard && (
                        <UserDashboardContribution
                            contributions={userDashboard.user.contributions}
                            onSubmitContribution={handleSubmitContribution}
                        />
                    )}
                </div>
            </section>

            <UserDashboardDangerZone user={userDashboard?.user} />
        </section>
    );
}

export default UserDashboard;
