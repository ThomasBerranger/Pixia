import { useApi } from '../../../hooks/useApi.tsx';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import type { UserGamesStats } from '../../../types/Game/userGamesStats.ts';
import { CgSpinner } from 'react-icons/cg';
import { ProgressBar } from '../../../composables/ProgressBar.tsx';
import { GameMonthAccordion } from '../../../composables/GameMonthAccordion.tsx';
import {
    DIFFICULTIES,
    type Difficulty,
} from '../../../constants/difficultyPoints.ts';

function UserGames() {
    const { apiCall } = useApi();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userGamesStats, setUserGamesStats] = useState<UserGamesStats | null>(
        null
    );
    const [hiddenDifficulties, setHiddenDifficulties] = useState(
        () => new Set<Difficulty>()
    );

    const toggleDifficulty = (difficulty: Difficulty) => {
        setHiddenDifficulties((prev) => {
            const next = new Set(prev);
            if (next.has(difficulty)) {
                next.delete(difficulty);
            } else {
                next.add(difficulty);
            }
            return next;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const allDifficulties = Object.keys(
                    DIFFICULTIES
                ) as Difficulty[];
                const visibleDifficulties = allDifficulties.filter(
                    (d) => !hiddenDifficulties.has(d)
                );
                const difficulties = visibleDifficulties.join(',');

                const userGameStats: UserGamesStats = await apiCall(
                    `${ENDPOINTS.USER_GAMES_STATS}?difficulties=${difficulties}`
                );
                setUserGamesStats(userGameStats);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall, hiddenDifficulties]);

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
                {!userGamesStats ? (
                    <CgSpinner className="animate-spin text-4xl text-retro-primary mx-auto" />
                ) : (
                    (Object.keys(DIFFICULTIES) as Difficulty[]).map(
                        (difficulty) => {
                            const data =
                                userGamesStats.byDifficulty[difficulty];

                            return (
                                <div
                                    className="w-full sm:w-1/2 mt-3 cursor-pointer"
                                    key={difficulty}
                                    onClick={() => toggleDifficulty(difficulty)}
                                >
                                    <ProgressBar
                                        label={difficulty}
                                        value={data?.won ?? 0}
                                        max={data?.total ?? 0}
                                        isActive={
                                            !hiddenDifficulties.has(difficulty)
                                        }
                                    />
                                </div>
                            );
                        }
                    )
                )}
            </section>

            <section className="mt-6 sm:mt-10">
                {isLoading || !userGamesStats ? (
                    <CgSpinner className="animate-spin text-4xl text-retro-accent mx-auto" />
                ) : (
                    Object.entries(userGamesStats.byMonth).map(
                        ([month, data]) => (
                            <div className="w-full mt-5" key={month}>
                                <GameMonthAccordion
                                    month={month}
                                    value={`${data.won}/${data.total}`}
                                    hiddenDifficulties={hiddenDifficulties}
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
