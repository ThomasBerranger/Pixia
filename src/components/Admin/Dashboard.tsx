import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import { PiTreasureChest } from 'react-icons/pi';
import { addMonths, eachDayOfInterval, endOfMonth, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { URLS } from '../../constants/routes.ts';
import { BiSolidRightArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
    DIFFICULTIES,
    type Difficulty,
} from '../../constants/difficultyPoints.ts';

function Dashboard() {
    const difficulties = Object.keys(DIFFICULTIES) as Difficulty[];

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const days = eachDayOfInterval({
        start: new Date(),
        end: endOfMonth(new Date()),
    });

    return (
        <section className="min-h-[89vh] py-10 px-[7vw]">
            <article className="flex justify-between items-center">
                <h2 className="font-title text-retro-accent text-4xl">
                    Studio
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-4xl" />
                    ) : (
                        <>
                            <button className="btn-pixel text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 px-4 py-2">
                                <PiTreasureChest className="text-xl" />{' '}
                                <span className="hidden sm:block">
                                    Jetons de
                                </span>{' '}
                                {format(new Date(), 'MMMM', { locale: fr })}
                            </button>
                        </>
                    )}
                </div>
            </article>

            <article className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 mt-10">
                <div className="card-primary-hover w-full text-center">
                    <p className="font-title text-retro-accent text-4xl">23</p>
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Planifiées
                    </p>
                </div>
                <Link
                    to={URLS.HOME}
                    className="card-primary-hover w-full text-center relative"
                >
                    <p className="font-title text-retro-accent text-4xl">7</p>
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Au montage
                    </p>
                    <p className="absolute bottom-4 right-4 flex items-center font-righteous text-retro-accent text-xs">
                        Voir <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>
                <div className="card-primary-hover w-full text-center">
                    <p className="font-title text-retro-accent text-4xl">2</p>
                    <p className="font-righteous text-retro-muted text-xs mt-1 sm:mt-2">
                        Disponibles
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {difficulties.map((difficulty) => (
                        <div
                            key={difficulty}
                            className="badge-primary text-xxs flex flex-col text-center justify-center"
                        >
                            ? {difficulty}
                        </div>
                    ))}
                </div>
            </article>

            <article className="timeline-retro w-full mt-10">
                {days.map((day, index) => (
                    <div
                        key={day.toString()}
                        className={`timeline-retro-item-${index === 0 ? 'unread' : 'read'}`}
                    >
                        <div
                            className={`timeline-retro-dot-${index === 0 ? 'unread' : 'read'}`}
                        ></div>
                        <div
                            className={`${index === 0 ? 'card-primary-hover' : 'card-retro'} text-left p-3 flex justify-between items-center`}
                        >
                            <p className="text-retro-accent text-xl">
                                <span className="font-title">
                                    {day.getDate()}
                                </span>
                                <span className="text-retro-muted text-xxs font-righteous">
                                    {format(new Date(), 'MMMM', {
                                        locale: fr,
                                    })}
                                </span>
                            </p>
                            <p>titre - autheur si pas moi - validateur</p>
                            <span className="badge-primary text-xxs">
                                Difficulté
                            </span>
                        </div>
                    </div>
                ))}
                <div className="timeline-retro-item-unread">
                    <div className="timeline-retro-dot-unread"></div>
                    <Link to={URLS.ADMIN_GAMES}>
                        <div className="w-full btn-neon text-base text-center p-3">
                            {format(addMonths(new Date(), 1), 'MMMM', {
                                locale: fr,
                            })}
                        </div>
                    </Link>
                </div>
            </article>
        </section>
    );
}

export default Dashboard;
