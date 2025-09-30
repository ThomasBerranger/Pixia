import AdminHeader from "./Layout/AdminHeader.tsx"
import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {GameAdminType} from "../../types/gameAdminType.ts"
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
    subMonths
} from 'date-fns';
import {fr} from 'date-fns/locale';
import {PiArrowFatLineLeft, PiArrowFatLineRight} from "react-icons/pi";
import {CiImageOff, CiImageOn} from "react-icons/ci";

function AdminGameDashboard() {
    const {apiCall} = useApi()
    const [games, setGames] = useState<GameAdminType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games')

                setGames(response)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, {weekStartsOn: 1}); // 1 = Lundi
    const calendarEnd = endOfWeek(monthEnd, {weekStartsOn: 1});

    const days = eachDayOfInterval({start: calendarStart, end: calendarEnd});

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const getGameForDate = (date: Date) => {
        return games.find(game => {
            const gameDate = new Date(game.date);

            return format(gameDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
        });
    };

    return (
        <div className="w-4/5 my-5 bg-white border border-black">
            <AdminHeader/>

            <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={handlePrevMonth} className="text-2xl p-1 hover:bg-gray-100 rounded">
                        <PiArrowFatLineLeft/>
                    </button>
                    <h2 className="text-lg font-semibold capitalize">
                        {format(currentDate, 'MMMM yyyy', {locale: fr})}
                    </h2>
                    <button onClick={handleNextMonth} className="text-2xl p-1 hover:bg-gray-100 rounded">
                        <PiArrowFatLineRight/>
                    </button>
                </div>

                <div className="grid grid-cols-7 border-t border-x border-gray-200 font-oswald">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                        <div key={day}
                             className="bg-white p-2 text-center text-sm font-medium text-gray-700 border-r border-b border-gray-200 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 bg-gray-200 border-x border-b border-gray-200">
                    {days.map(day => {
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isTodayDate = isToday(day);
                        const game = getGameForDate(day);

                        return (
                            <button
                                key={day.toString()}
                                className={`p-2 text-center text-sm border-r border-b border-gray-200 last:border-r-0 ${
                                    isCurrentMonth
                                        ? 'bg-white hover:bg-gray-50'
                                        : 'bg-gray-50 text-gray-400'
                                }`}
                            >
                                <p
                                    className={`${isTodayDate && 'text-blue-400 font-bold'}`}>{format(day, 'd')}</p>
                                {game && (
                                    <>
                                        {game.image ? <>
                                                <CiImageOn className={'md:hidden mx-auto'}/>
                                                <img src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                                     alt="AI created image"
                                                     className={'hidden md:block'}/>
                                            </> :
                                            <CiImageOff className={'md:text-4xl mx-auto'}/>
                                        }
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}

export default AdminGameDashboard
