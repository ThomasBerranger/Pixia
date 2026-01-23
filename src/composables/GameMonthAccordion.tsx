import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BiSolidDownArrow } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { useApi } from '../hooks/useApi.tsx';
import { ENDPOINTS } from '../constants/endpoints.ts';
import type { UserGameType } from '../types/Game/userGameType.ts';
import { ROUTES } from '../constants/routes.ts';
import { Link } from 'react-router-dom';
import { TbPhotoSearch } from 'react-icons/tb';

export function GameMonthAccordion({
    month,
    value,
}: {
    month: string;
    value: string;
}) {
    const { apiCall } = useApi();
    const [isOpen, setIsOpen] = useState(false);
    const [userGames, setUserGames] = useState<UserGameType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const formattedMonth = format(new Date(`${month}-01`), 'MMMM yyyy', {
        locale: fr,
    });

    const fetchGames = async () => {
        setIsLoading(true);

        try {
            const games: UserGameType[] = await apiCall(
                ENDPOINTS.USER_GAMES(`${month}-01`)
            );

            setUserGames(games);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen && userGames.length === 0) fetchGames();
    };

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
                    <div className="grid grid-cols-2 sm:grid-cols-5 items-center gap-3 p-4">
                        {isLoading ? (
                            <CgSpinner className="animate-spin text-4xl text-retro-accent mx-auto col-span-2 sm:col-span-5" />
                        ) : (
                            userGames?.map((userGame) => (
                                <Link
                                    to={ROUTES.GAME_BY_DATE(
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
                                    <p className="absolute inset-0 flex items-center justify-center font-title z-10 text-white text-4xl">
                                        {!userGame.won && <TbPhotoSearch />}
                                    </p>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${userGame.game.image}`}
                                        alt="AI created image"
                                        className={`rounded-sm ${!userGame.won && 'blur-sm'}`}
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
