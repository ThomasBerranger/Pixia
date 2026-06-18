import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../contexts/authContext.tsx';
import { useAlert } from '../../../hooks/useAlert.ts';
import { buildAssetUrl, useApi } from '../../../hooks/useApi.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { GameType } from '../../../types/Game/gameType.ts';

interface RecentGame {
    game: GameType;
    won: boolean;
}

interface WeekGamesProps {
    wonGameId?: string;
}

function WeekGames({ wonGameId }: WeekGamesProps) {
    const { isAuthenticated } = useAuth();
    const { showAlert } = useAlert();
    const { apiCall } = useApi();
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLElement>(null);
    const [recentGames, setRecentGames] = useState<RecentGame[]>([]);

    useEffect(() => {
        apiCall(ENDPOINTS.GAMES_INDEX)
            .then(setRecentGames)
            .catch(console.error);
    }, [apiCall]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [recentGames]);

    useEffect(() => {
        if (!wonGameId) return;
        setRecentGames((prev) =>
            prev.map((entry) =>
                entry.game.id === wonGameId ? { ...entry, won: true } : entry
            )
        );
    }, [wonGameId]);

    if (recentGames.length === 0) return null;

    const handleToutVoir = () => {
        if (isAuthenticated) {
            navigate(URLS.ME_GAMES);
        } else {
            showAlert(
                'Connexion requise',
                'Connecte-toi pour voir ton historique',
                'error',
                5000,
                URLS.ME
            );
        }
    };

    return (
        <section>
            <div className="h-7 md:h-[17%]"></div>

            <div className="md:h-[80%]">
                <section
                    ref={scrollRef}
                    className="overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:max-h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    <div className="flex md:flex-col-reverse items-center gap-2 md:gap-[0.5vh]">
                        {recentGames
                            .slice(1)
                            .reverse()
                            .map((entry) => (
                                <div
                                    key={entry.game.id}
                                    className="flex-shrink-0 relative"
                                >
                                    <div className="absolute flex flex-col items-center top-1 right-1 gap-1">
                                        <p
                                            className={`text-xxs rounded-sm ${entry.won ? 'badge-primary-no-border' : 'badge-muted-no-border'}`}
                                        >
                                            {entry.won ? (
                                                <FaCheck />
                                            ) : (
                                                <FaTimes />
                                            )}
                                        </p>
                                    </div>
                                    <Link
                                        to={URLS.GAME_BY_DATE(
                                            format(
                                                parseISO(entry.game.date),
                                                'yyyy-MM-dd'
                                            )
                                        )}
                                    >
                                        <img
                                            src={buildAssetUrl(entry.game.image)}
                                            alt={`Partie du ${entry.game.date}`}
                                            className="w-32 md:w-[21vh] object-cover rounded-md border-2 border-retro-primary/30 cursor-pointer blur-sm transition-all duration-300"
                                            onLoad={(e) =>
                                                e.currentTarget.classList.remove(
                                                    'blur-sm'
                                                )
                                            }
                                        />
                                    </Link>
                                    <p className="text-retro-muted font-righteous text-center text-xxs mt-0.5">
                                        {format(
                                            parseISO(entry.game.date),
                                            'd MMM',
                                            { locale: fr }
                                        )}
                                    </p>
                                </div>
                            ))}
                    </div>
                </section>
                <div className="mt-3 md:my-0 md:h-[20%] flex items-center">
                    <button
                        className="btn-ghost w-full py-0.5 text-xxs"
                        onClick={handleToutVoir}
                    >
                        Tout voir
                    </button>
                </div>
            </div>
        </section>
    );
}

export default WeekGames;
