import { useCallback, useEffect, useState } from 'react';
import { type ApiError, useApi } from '../../hooks/useApi.tsx';
import type { GameType } from '../../types/Game/gameType.ts';
import type { LeaderboardUserType } from '../../types/User/leaderboardUserType.ts';
import type { UserType } from '../../types/User/userType.ts';
import type { AnswerResult } from '../../types/answerResultType.ts';
import GameHeader from './Layouts/GameHeader.tsx';
import GameContent from './Layouts/GameContent.tsx';
import GameFooter from './Layouts/GameFooter.tsx';
import MonthlyLeaderboard from '../User/Leaderboard/MonthlyLeaderboard.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { fireConfetti } from '../../utils/confetti.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { useNotificationStore } from '../../stores/notificationStore.ts';
import { useAuth } from '../../contexts/authContext.tsx';
import { toDateKey } from '../../utils/date.ts';

function GameContainer() {
    const navigate = useNavigate();
    const { date } = useParams<{ date?: string }>();
    const { apiCall } = useApi();
    const { isAuthenticated } = useAuth();

    const setHasUnreadNotification = useNotificationStore(
        (state) => state.setHasUnread
    );

    const [game, setGame] = useState<GameType | undefined>();
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
    const [nextGameDate, setNextGameDate] = useState<string | null>(null);
    const [previousGameDate, setPreviousGameDate] = useState<string | null>(
        null
    );
    const [loadingDirection, setLoadingDirection] = useState<
        'prev' | 'next' | null
    >(null);

    const [leaderboard, setLeaderboard] = useState<LeaderboardUserType[]>([]);
    const [player, setPlayer] = useState<UserType>();

    useEffect(() => {
        const fetchData = async () => {
            if (date) {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                const today = toDateKey(new Date());

                if (!dateRegex.test(date) || date > today) {
                    navigate(URLS.NOT_FOUND);
                    return;
                }
            }

            const [dailyResult, leaderboardResult] = await Promise.allSettled([
                apiCall(ENDPOINTS.DAILY(date)),
                apiCall(ENDPOINTS.MONTHLY_LEADERBOARD(date)),
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
                setPlayer(leaderboardResult.value.player);
            } else {
                console.error(leaderboardResult.reason);
            }

            setLoadingDirection(null);
        };

        fetchData();
    }, [apiCall, date, navigate]);

    const handleGameChange = useCallback(
        async (newDate: string, isPrevious: boolean) => {
            setLoadingDirection(isPrevious ? 'prev' : 'next');
            setIsImageLoading(true);
            navigate(URLS.GAME_BY_DATE(newDate));
        },
        [navigate]
    );

    const handleAnswerSubmit = useCallback(
        async (answer: string): Promise<AnswerResult> => {
            if (!game) {
                return { success: false };
            }

            try {
                const solution: string | false = await apiCall(
                    ENDPOINTS.GAME_SOLUTION(game.id),
                    {
                        method: 'POST',
                        body: JSON.stringify({ answer }),
                    }
                );

                if (!solution) {
                    return { success: false };
                }

                fireConfetti();

                setGame((prevGame) =>
                    prevGame ? { ...prevGame, solution: solution } : prevGame
                );

                if (isAuthenticated) {
                    const leaderboardResult = await apiCall(
                        ENDPOINTS.MONTHLY_LEADERBOARD(date)
                    );

                    setLeaderboard(leaderboardResult.leaderboard);
                    setPlayer(leaderboardResult.player);

                    const hasUnreadNotification = await apiCall(
                        ENDPOINTS.HAS_UNREAD_NOTIFICATION
                    );

                    setHasUnreadNotification(hasUnreadNotification);
                }

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
        [apiCall, date, game, isAuthenticated, setHasUnreadNotification]
    );

    function handleHintRequested(hint: string): void {
        setGame((prevGame) => (prevGame ? { ...prevGame, hint } : undefined));
    }

    return (
        <>
            <section className="md:h-[89vh] flex flex-col px-5">
                <GameHeader />

                <div className="md:h-[83%] inline-block mx-auto">
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
                </div>
            </section>

            <hr className="divider max-w-5xl mx-auto mb-5" />

            <MonthlyLeaderboard
                date={date}
                leaderboard={leaderboard}
                player={player}
            />
        </>
    );
}

export default GameContainer;
