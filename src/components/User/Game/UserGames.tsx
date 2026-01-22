import { useApi } from '../../../hooks/useApi.tsx';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import type { UserGamesStats } from '../../../types/Game/userGamesStats.ts';
import { CgSpinner } from 'react-icons/cg';
import { ProgressBar } from '../../../composables/ProgressBar.tsx';
import { GameMonthAccordion } from '../../../composables/GameMonthAccordion.tsx';

function UserGames() {
    const { apiCall } = useApi();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userGamesStats, setUserGamesStats] = useState<UserGamesStats | null>(
        null
    );

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const userGameStats: UserGamesStats = await apiCall(
                    ENDPOINTS.USER_GAME_STATS
                );

                setUserGamesStats(userGameStats);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall]);

    return (
        <article className="min-h-[89vh] py-10 px-[7vw]">
            <section className="flex justify-between items-center">
                <h2 className="font-title text-retro-accent text-4xl">
                    Mes parties
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-4xl" />
                    ) : (
                        <>
                            <p className="-mb-1.5">
                                <span className="font-title text-4xl">
                                    {userGamesStats?.total.won}
                                </span>{' '}
                                <span className="font-righteous">
                                    / {userGamesStats?.total.total}
                                </span>
                            </p>
                            <span className="font-righteous text-sm text-retro-muted">
                                gagnées
                            </span>
                        </>
                    )}
                </div>
            </section>

            <section className="mt-6 sm:mt-10">
                {isLoading || !userGamesStats ? (
                    <CgSpinner className="animate-spin text-4xl text-retro-accent" />
                ) : (
                    Object.entries(userGamesStats.byDifficulty).map(
                        ([diff, data]) => (
                            <div className="w-full sm:w-1/2 mt-3" key={diff}>
                                <ProgressBar
                                    key={diff}
                                    label={diff}
                                    value={data.won}
                                    max={data.total}
                                />
                            </div>
                        )
                    )
                )}
            </section>

            <section className="mt-6 sm:mt-10">
                {isLoading || !userGamesStats ? (
                    <CgSpinner className="animate-spin text-4xl text-retro-accent" />
                ) : (
                    Object.entries(userGamesStats.byMonth).map(
                        ([month, data]) => (
                            <div className="w-full mt-5" key={month}>
                                <GameMonthAccordion
                                    month={month}
                                    value={`${data.won}/${data.total}`}
                                />
                            </div>
                        )
                    )
                )}
            </section>
        </article>
    );
}

export default UserGames;
