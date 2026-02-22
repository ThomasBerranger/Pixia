import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import type { GameAdminType } from '../../types/Game/gameAdminType.ts';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isToday,
    addMonths,
    subMonths,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { PiArrowFatLineLeft, PiArrowFatLineRight } from 'react-icons/pi';
import { CiImageOff, CiImageOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';

function Games() {
    const { apiCall } = useApi();
    const [games, setGames] = useState<GameAdminType[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(
                    `${ENDPOINTS.SUPER_ADMIN_GAMES_INDEX}?fields=type,image,date`
                );

                setGames(response);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const getGameForDate = (date: Date) => {
        return games.find((game) => {
            const gameDate = new Date(game.date);
            return (
                format(gameDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            );
        });
    };

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex py-10 px-[10px]">
            <div className="card-primary w-full">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handlePrevMonth}
                        className="calendar-nav-btn"
                    >
                        <PiArrowFatLineLeft />
                    </button>
                    <h2 className="calendar-title">
                        {format(currentDate, 'MMMM yyyy', { locale: fr })}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="calendar-nav-btn"
                    >
                        <PiArrowFatLineRight />
                    </button>
                </div>

                <div className="calendar-weekdays">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(
                        (day) => (
                            <div key={day} className="calendar-weekday">
                                {day}
                            </div>
                        )
                    )}
                </div>

                <div className="calendar-grid">
                    {days.map((day) => {
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isTodayDate = isToday(day);
                        const game = getGameForDate(day);
                        const dayClasses = `
                            calendar-day
                            ${!isCurrentMonth && 'text-retro-muted/50'}
                        `;

                        const content = (
                            <>
                                <p
                                    className={`mb-2 ${isTodayDate && 'font-bold text-retro-accent'}`}
                                >
                                    {format(day, 'd')}
                                </p>
                                <div className="text-center">
                                    {game?.image ? (
                                        <>
                                            <CiImageOn className="md:hidden calendar-icon calendar-icon-on" />
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                                alt="AI created image"
                                                className="hidden md:block w-full mt-2"
                                            />
                                        </>
                                    ) : (
                                        game && (
                                            <CiImageOff className="calendar-icon" />
                                        )
                                    )}
                                </div>
                            </>
                        );

                        return game ? (
                            <Link
                                key={day.toString()}
                                to={URLS.ADMIN_GAME_EDIT(game.id)}
                                className={dayClasses}
                            >
                                {content}
                            </Link>
                        ) : (
                            <div key={day.toString()} className={dayClasses}>
                                {content}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Games;
