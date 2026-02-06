import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BiSolidDownArrow } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { useApi } from '../hooks/useApi.tsx';
import { ENDPOINTS } from '../constants/endpoints.ts';
import type { UserGameType } from '../types/Game/userGameType.ts';
import { URLS } from '../constants/routes.ts';
import { Link } from 'react-router-dom';
import {
    DIFFICULTIES,
    type Difficulty,
} from '../constants/difficultyPoints.ts';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface GameMonthAccordionProps {
    month: string;
    value: string;
    hiddenDifficulties: Set<Difficulty>;
}

export function GameMonthAccordion({
    month,
    value,
    hiddenDifficulties,
}: GameMonthAccordionProps) {
    const { apiCall } = useApi();
    const [isOpen, setIsOpen] = useState(false);
    const [userGames, setUserGames] = useState<UserGameType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const formattedMonth = format(new Date(`${month}-01`), 'MMMM yyyy', {
        locale: fr,
    });

    const fetchGames = useCallback(async () => {
        setIsLoading(true);

        try {
            const allDifficulties = Object.keys(DIFFICULTIES) as Difficulty[];
            const visibleDifficulties = allDifficulties.filter(
                (d) => !hiddenDifficulties.has(d)
            );
            const difficulties = visibleDifficulties.join(',');

            const games: UserGameType[] = await apiCall(
                `${ENDPOINTS.USER_GAMES(`${month}-01`)}&difficulties=${difficulties}`
            );
            setUserGames(games);
            setHasFetched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [apiCall, month, hiddenDifficulties]);

    const handleToggle = () => {
        const willOpen = !isOpen;
        setIsOpen(willOpen);

        if (willOpen && !hasFetched) {
            fetchGames();
        }
    };

    useEffect(() => {
        if (isOpen && hasFetched) {
            fetchGames();
        }
    }, [fetchGames, hasFetched, hiddenDifficulties, isOpen]);

    return (
        <div>
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between px-3 py-2 bg-retro-accent border-2 border-retro-bg shadow-[3px_3px_0_theme(colors.retro.secondary)] font-righteous text-retro-bg"
            >
                <span className="text-sm uppercase tracking-wider">
                    {formattedMonth}
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-sm tracking-wider">{value}</span>
                    <BiSolidDownArrow
                        className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}
                    />
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 bg-retro-surface border-x-2 border-retro-bg ${isOpen ? 'border-b-2' : ''}`}
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-5 items-center gap-1.5 p-1">
                        {isLoading ? (
                            <CgSpinner className="animate-spin text-4xl text-retro-accent mx-auto col-span-2 sm:col-span-5" />
                        ) : userGames.length === 0 ? (
                            <p className="col-span-2 sm:col-span-5 text-center text-retro-muted font-righteous">
                                Aucune partie
                            </p>
                        ) : (
                            userGames.map((userGame) => (
                                <Link
                                    to={URLS.GAME_BY_DATE(
                                        format(
                                            userGame.game.date,
                                            'yyyy-MM-dd',
                                            {
                                                locale: fr,
                                            }
                                        )
                                    )}
                                    key={`${userGame.game.type}-${userGame.game.date}`}
                                    className="relative"
                                >
                                    <div className="absolute flex flex-col items-center top-0.5 right-0.5 gap-1">
                                        <p
                                            className={`text-xxs rounded-sm ${userGame.won ? 'badge-primary-no-border' : 'badge-muted-no-border'}`}
                                        >
                                            {userGame.won ? (
                                                <FaCheck />
                                            ) : (
                                                <FaTimes />
                                            )}
                                        </p>
                                    </div>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${userGame.game.image}`}
                                        alt="AI created image"
                                        className="rounded-sm"
                                        loading="lazy"
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
