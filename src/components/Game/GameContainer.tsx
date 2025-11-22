import { useCallback, useEffect, useState } from 'react';
import { type ApiError, useApi } from '../../hooks/useApi.tsx';
import type { GameType } from '../../types/Game/gameType.ts';
import type { LeaderboardUserType } from '../../types/User/leaderboardUserType.ts';
import type { UserType } from '../../types/User/userType.ts';
import type { AnswerResult } from '../../types/answerResultType.ts';
import GameHeader from './Layouts/GameHeader.tsx';
import GameContent from './Layouts/GameContent.tsx';
import GameFooter from './Layouts/GameFooter.tsx';
import Leaderboard from './Leaderboard.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import {fireConfetti} from "../../utils/confetti.ts";

function GameContainer() {
    const { apiCall } = useApi();

    const [game, setGame] = useState<GameType | undefined>();
    const [nextGameDate, setNextGameDate] = useState<string | null>(null);
    const [previousGameDate, setPreviousGameDate] = useState<string | null>(
        null
    );
    const [loadingDirection, setLoadingDirection] = useState<
        'prev' | 'next' | null
    >(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUserType[]>([]);
    const [currentUser, setCurrentUser] = useState<UserType>();
    const [currentUserRank, setCurrentUserRank] = useState<number>();
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const [dailyResult, leaderboardResult] = await Promise.allSettled([
                apiCall(ENDPOINTS.DAILY()),
                apiCall(ENDPOINTS.LEADERBOARD),
            ]);

            if (dailyResult.status === 'fulfilled') {
                setGame(dailyResult.value.game);
                setPreviousGameDate(dailyResult.value.previousGameDate);
                setNextGameDate(dailyResult.value.nextGameDate);
            } else {
                console.error(dailyResult.reason);
            }

            if (leaderboardResult.status === 'fulfilled') {
                setLeaderboard(leaderboardResult.value.leaderboard);
                setCurrentUser(leaderboardResult.value.currentUser);
                setCurrentUserRank(leaderboardResult.value.currentUserRank);
            } else {
                console.error(leaderboardResult.reason);
            }
        };

        fetchData();
    }, [apiCall]);

    const handleGameChange = useCallback(
        async (date: string, isPrevious: boolean) => {
            setLoadingDirection(isPrevious ? 'prev' : 'next');
            setIsImageLoading(true);

            try {
                const response = await apiCall(ENDPOINTS.DAILY(date));

                setGame(response.game);
                setPreviousGameDate(response.previousGameDate);
                setNextGameDate(response.nextGameDate);
            } catch (error) {
                console.error('Erreur: ', error);
            } finally {
                setLoadingDirection(null);
            }
        },
        [apiCall]
    );

    const handleAnswerSubmit = useCallback(
        async (answer: string): Promise<AnswerResult> => {
            if (!game) {
                return { success: false };
            }

            try {
                const response: { solution: string } | false = await apiCall(
                    ENDPOINTS.GAME_SOLUTION(game.id),
                    {
                        method: 'POST',
                        body: JSON.stringify({ answer }),
                    }
                );

                if (!response) {
                    return { success: false };
                }

                fireConfetti();

                setGame((prevGame) =>
                    prevGame
                        ? { ...prevGame, solution: response.solution }
                        : prevGame
                );

                const leaderboardResponse = await apiCall(
                    ENDPOINTS.LEADERBOARD
                );

                setLeaderboard(leaderboardResponse.leaderboard);
                setCurrentUser(leaderboardResponse.currentUser);
                setCurrentUserRank(leaderboardResponse.currentUserRank);

                return { success: true };
            } catch (error) {
                const apiError = error as ApiError;

                if (apiError.status === 429) {
                    return {
                        success: false,
                        rateLimited: true,
                        errorMessage: apiError.detail,
                    };
                }

                return {
                    success: false,
                    errorMessage: 'Une erreur est survenue.',
                };
            }
        },
        [apiCall, game]
    );

    function handleHintRequested(hint: string): void {
        setGame((prevGame) => (prevGame ? { ...prevGame, hint } : undefined));
    }

    return (
        <>
            <section className="sm:min-h-[80vh] flex flex-col justify-center px-5 py-[3vh]">
                <GameHeader />

                <GameContent
                    game={game}
                    onGameChange={handleGameChange}
                    previousGameDate={previousGameDate}
                    nextGameDate={nextGameDate}
                    loadingDirection={loadingDirection}
                    isImageLoading={isImageLoading}
                    onImageLoadEnd={() => setIsImageLoading(false)}
                />

                <GameFooter
                    game={game}
                    onAnswerSubmit={handleAnswerSubmit}
                    onHintRequest={handleHintRequested}
                />
            </section>

            <hr className="divider max-w-5xl mx-auto my-5 sm:my-10" />

            <Leaderboard
                leaderboard={leaderboard}
                currentUser={currentUser}
                currentUserRank={currentUserRank}
            />
        </>
    );
}

export default GameContainer;
