import { CgSpinner } from 'react-icons/cg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PiTreasureChest } from 'react-icons/pi';
import {
    addMonths,
    subMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    startOfMonth,
    isSameMonth,
    addDays,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { toDateKey } from '../../utils/date.ts';
import { URLS } from '../../constants/routes.ts';
import { BiSolidRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
    DIFFICULTIES,
    type Difficulty,
} from '../../constants/difficultyPoints.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import type { GameType } from '../../types/Game/gameType.ts';
import { useApi } from '../../hooks/useApi.tsx';
import { getHiddenText } from '../../constants/hiddenTexts.ts';
import { GAME_STATUSES } from '../../types/Game/gameStatuses.ts';
import JackpotModal from './JackpotModal.tsx';

function Dashboard() {
    const { apiCall } = useApi();

    const difficulties = Object.keys(DIFFICULTIES) as Difficulty[];
    const now = new Date();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [games, setGames] = useState<GameType[]>([]);
    const [currentMonth, setCurrentMonth] = useState<Date>(now);
    const [showJackpot, setShowJackpot] = useState(false);

    const isCurrentMonth = isSameMonth(currentMonth, now);

    const days = eachDayOfInterval({
        start: isCurrentMonth ? addDays(now, 1) : startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const gamesByDate = useMemo(
        () =>
            new Map(
                games
                    .filter((g) => g.status === GAME_STATUSES.APPROVED)
                    .map((g) => [toDateKey(g.date), g])
            ),
        [games]
    );

    const fetchGames = useCallback(
        async (month: Date) => {
            setIsLoading(true);

            try {
                const games = await apiCall(
                    `${ENDPOINTS.ADMIN_GAMES_INDEX}?month=${format(month, 'yyyy-MM-dd')}`
                );

                setGames(games);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        },
        [apiCall]
    );

    useEffect(() => {
        fetchGames(currentMonth);
    }, [fetchGames, currentMonth]);

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth((prev) =>
            direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="min-h-[89vh] py-10 px-[7vw]">
            <article className="flex justify-between items-center">
                <h2 className="font-title text-retro-accent text-4xl">
                    Studio
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="text-retro-accent animate-spin text-4xl" />
                    ) : (
                        <button
                            onClick={() => setShowJackpot(true)}
                            className="btn-pixel text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 px-4 py-2"
                        >
                            <PiTreasureChest className="text-xl" />{' '}
                            <span className="hidden sm:block">Jetons de</span>{' '}
                            {format(now, 'MMMM', { locale: fr })}
                        </button>
                    )}
                </div>
            </article>

            <article className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 mt-10">
                <div className="card-primary-hover w-full text-center">
                    {isLoading ? (
                        <CgSpinner className="text-retro-accent animate-spin text-4xl mx-auto" />
                    ) : (
                        <p className="font-title text-retro-accent text-4xl">
                            {
                                games.filter(
                                    (g) => g.status === GAME_STATUSES.APPROVED
                                ).length
                            }
                        </p>
                    )}
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Planifiées
                    </p>
                </div>
                <Link
                    to={URLS.ADMIN_PENDING_GAMES}
                    className="card-primary-hover w-full text-center relative"
                >
                    {isLoading ? (
                        <CgSpinner className="text-retro-accent animate-spin text-4xl mx-auto" />
                    ) : (
                        <p className="font-title text-retro-accent text-4xl">
                            {
                                games.filter(
                                    (g) =>
                                        g.status === GAME_STATUSES.DRAFT ||
                                        g.status === GAME_STATUSES.PENDING
                                ).length
                            }
                        </p>
                    )}
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Au montage
                    </p>
                    <p className="absolute bottom-4 right-4 flex items-center font-righteous text-retro-accent text-xs">
                        Voir <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>
                <Link
                    to={URLS.ADMIN_PENDING_GAMES}
                    className="card-primary-hover w-full text-center relative"
                >
                    {isLoading ? (
                        <CgSpinner className="text-retro-accent animate-spin text-4xl mx-auto" />
                    ) : (
                        <p className="font-title text-retro-accent text-4xl">
                            {games.filter((g) => !g.image).length}
                        </p>
                    )}
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Sans image
                    </p>
                    <p className="absolute bottom-4 right-4 flex items-center font-righteous text-retro-accent text-xs">
                        Voir <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                    {difficulties.map((difficulty) => (
                        <div
                            key={difficulty}
                            className="badge-primary text-xxs flex flex-col text-center justify-center"
                        >
                            {isLoading ? (
                                <CgSpinner className="text-retro-accent animate-spin text-lg mx-auto" />
                            ) : (
                                <>
                                    {
                                        games.filter(
                                            (g) => g.difficulty === difficulty
                                        ).length
                                    }{' '}
                                    {difficulty}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </article>

            <article className="timeline-retro w-full mt-10">
                {/* Mois précédent (si on n'est pas sur le mois courant) */}
                {!isCurrentMonth && (
                    <div className="timeline-retro-item-unread">
                        <div className="timeline-retro-dot-unread" />
                        <button
                            onClick={() => navigateMonth('prev')}
                            className="w-full btn-neon text-base text-center p-3"
                        >
                            {format(subMonths(currentMonth, 1), 'MMMM', {
                                locale: fr,
                            })}
                        </button>
                    </div>
                )}

                {/* Image du jour (uniquement sur le mois courant) */}
                {isCurrentMonth && (
                    <div className="timeline-retro-item-unread">
                        <div className="timeline-retro-dot-unread" />
                        <Link
                            to={URLS.HOME}
                            className="w-full btn-neon text-base text-center p-3 block"
                        >
                            Image du jour
                        </Link>
                    </div>
                )}

                {/* Jours du mois */}
                {days.map((day) => {
                    const game = gamesByDate.get(format(day, 'yyyy-MM-dd'));

                    return (
                        <div
                            key={day.toString()}
                            className="timeline-retro-item-read"
                        >
                            <div className="timeline-retro-dot-read" />
                            <div className="card-retro text-left p-3 flex justify-between items-center">
                                <div className="flex items-center min-w-0">
                                    <span className="font-title text-retro-accent text-2xl">
                                        {day.getDate()}
                                    </span>
                                    {game && (
                                        <p
                                            className={`font-righteous truncate ml-1 ${!game.solution && 'blur'} text-xs sm:text-base`}
                                        >
                                            {game.solution ?? getHiddenText()}
                                        </p>
                                    )}
                                </div>
                                {game ? (
                                    <div className="flex items-center gap-3">
                                        {game.author.username ===
                                        game.supervisor?.username ? (
                                            <div className="hidden sm:flex items-center gap-1">
                                                <img
                                                    src={
                                                        game.author.avatarUrl ??
                                                        `${import.meta.env.VITE_DICE_URL}${game.author.username}`
                                                    }
                                                    alt="Avatar"
                                                    className="h-10"
                                                />
                                                <p className="flex flex-col font-righteous text-sm">
                                                    {game.author.username}
                                                    <span className="text-sm">
                                                        🎨✍️
                                                    </span>
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="hidden sm:flex items-center gap-1">
                                                    <img
                                                        src={
                                                            game.author
                                                                .avatarUrl ??
                                                            `${import.meta.env.VITE_DICE_URL}${game.author.username}`
                                                        }
                                                        alt="Avatar"
                                                        className="h-10"
                                                    />
                                                    <p className="flex flex-col font-righteous text-sm">
                                                        {game.author.username}
                                                        <span className="text-sm">
                                                            🎨
                                                        </span>
                                                    </p>
                                                </div>
                                                {game.supervisor && (
                                                    <div className="hidden sm:flex items-center gap-1">
                                                        <img
                                                            src={
                                                                game.supervisor
                                                                    .avatarUrl ??
                                                                `${import.meta.env.VITE_DICE_URL}${game.supervisor.username}`
                                                            }
                                                            alt="Avatar"
                                                            className="h-10"
                                                        />
                                                        <p className="flex flex-col font-righteous text-sm">
                                                            {
                                                                game.supervisor
                                                                    .username
                                                            }
                                                            <span className="text-sm">
                                                                ✍️
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        <span className="badge-primary text-xxs flex-shrink-0">
                                            {game.difficulty}
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-retro-muted font-righteous text-xs">
                                        Aucune partie
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Mois suivant */}
                <div className="timeline-retro-item-unread">
                    <div className="timeline-retro-dot-unread" />
                    <button
                        onClick={() => navigateMonth('next')}
                        className="w-full btn-neon text-base text-center p-3"
                    >
                        {format(addMonths(currentMonth, 1), 'MMMM', {
                            locale: fr,
                        })}
                    </button>
                </div>
            </article>

            {showJackpot && (
                <JackpotModal
                    month={format(now, 'MMMM', { locale: fr })}
                    onClose={() => setShowJackpot(false)}
                />
            )}
        </section>
    );
}

export default Dashboard;
