import { useState, useRef, useEffect } from 'react';
import { PiArrowFatLineLeft, PiArrowFatLineRight } from 'react-icons/pi';

interface DatePickerProps {
    value?: string;
    onChange?: (date: string) => void;
    unavailableDates?: string[];
    initialDate?: string;
}

export function DatePicker({
    value,
    onChange,
    unavailableDates = [],
    initialDate,
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialDate) {
            const [year, month] = initialDate.split('-');
            setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
        }
    }, [initialDate]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Générer les jours du mois avec mois précédent et suivant
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const days: { day: number; month: number; year: number }[] = [];

        // Jours du mois précédent
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                month: prevMonth,
                year: prevYear,
            });
        }

        // Jours du mois actuel
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ day, month, year });
        }

        // Jours du mois suivant pour compléter
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({
                day,
                month: nextMonth,
                year: nextYear,
            });
        }

        return days;
    };

    // Vérifier si une date est indisponible
    const isDateUnavailable = (year: number, month: number, day: number) => {
        const dateStr = formatDate(year, month, day);
        return unavailableDates.includes(dateStr);
    };

    const formatDate = (year: number, month: number, day: number) => {
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        return `${year}-${monthStr}-${dayStr}`;
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Gérer la sélection d'un jour
    const handleDayClick = (year: number, month: number, day: number) => {
        if (isDateUnavailable(year, month, day)) return;

        // Changer de mois si jour d'un autre mois
        if (
            month !== currentMonth.getMonth() ||
            year !== currentMonth.getFullYear()
        ) {
            setCurrentMonth(new Date(year, month, 1));
        }

        const selectedDate = formatDate(year, month, day);
        onChange?.(selectedDate);
        setIsOpen(false);
    };

    // Vérifier si c'est aujourd'hui
    const isToday = (year: number, month: number, day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    // Navigation entre les mois
    const goToPreviousMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
        );
    };

    const goToNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
        );
    };

    const days = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('fr-FR', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="relative w-full" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="input-retro w-full p-2"
            >
                {value ? formatDisplayDate(value) : 'Sélectionner une date'}
            </button>

            {/* Calendrier popup */}
            {isOpen && (
                <div className="absolute z-30 mt-2 input-retro">
                    {/* Header avec navigation */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className="px-3 py-1 hover:bg-retro-primary hover:bg-opacity-60"
                        >
                            <PiArrowFatLineLeft size={18} />
                        </button>
                        <span className="font-title font-light text-lg capitalize">
                            {monthName}
                        </span>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="px-3 py-1 hover:bg-retro-primary hover:bg-opacity-60"
                        >
                            <PiArrowFatLineRight size={18} />
                        </button>
                    </div>

                    {/* Jours de la semaine */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(
                            (day) => (
                                <div
                                    key={day}
                                    className="text-center text-sm font-righteous font-light py-1 tracking-wider"
                                >
                                    {day}
                                </div>
                            )
                        )}
                    </div>

                    {/* Grille des jours */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((dayObj) => {
                            const { day, month, year } = dayObj;
                            const isCurrentMonth =
                                month === currentMonth.getMonth() &&
                                year === currentMonth.getFullYear();
                            const unavailable = isDateUnavailable(
                                year,
                                month,
                                day
                            );
                            const today = isToday(year, month, day);
                            const isSelected =
                                value === formatDate(year, month, day);

                            return (
                                <button
                                    key={`${year}-${month}-${day}`}
                                    type="button"
                                    onClick={() =>
                                        handleDayClick(year, month, day)
                                    }
                                    disabled={unavailable}
                                    className={`
                                        p-2 text-center border
                                        ${!isCurrentMonth ? 'border-0 text-gray-400 opacity-40' : 'border-gray-300'}
                                        ${today ? 'text-retro-accent' : ''}
                                        ${
                                            unavailable
                                                ? 'border-0 text-gray-400 cursor-not-allowed line-through'
                                                : 'hover:bg-retro-primary hover:bg-opacity-30 cursor-pointer'
                                        }
                                        ${isSelected ? 'border-0 bg-retro-primary bg-opacity-50 font-semibold' : ''}
                                    `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
