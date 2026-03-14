import { URLS } from '../../../constants/routes.ts';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import { ProgressBar } from '../../../atoms/ProgressBar.tsx';
import { PiCoinsFill } from 'react-icons/pi';

interface UserDashboardGamesProps {
    success: number | undefined;
    games: number | undefined;
    authoredGameCount: number | undefined;
    tokens: number | undefined;
}

export default function UserDashboardGames({
    success,
    games,
    authoredGameCount,
    tokens,
}: UserDashboardGamesProps) {
    return (
        <section className="mb-28">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-10">
                <div>
                    <h2 className="font-title text-retro-accent text-2xl sm:text-3xl mb-2">
                        Historique
                    </h2>
                    <Link
                        to={URLS.ME_GAMES}
                        className="flex flex-col items-center card-primary-hover p-6 sm:h-full"
                    >
                        <div
                            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
                            style={{
                                background: `conic-gradient(#ff006e 0deg ${((success ?? 0) / (games ?? 1)) * 360}deg, #0a0e27 ${((success ?? 0) / (games ?? 1)) * 360}deg 360deg)`,
                            }}
                        >
                            <div className="w-[94px] h-[94px] bg-retro-surface rounded-full flex flex-col items-center justify-center">
                                <span className="text-4xl font-title text-retro-primary">
                                    {success}
                                </span>
                                <span className="text-xs text-retro-muted font-righteous">
                                    / {games}
                                </span>
                            </div>
                        </div>
                        <p className="self-end mt-2 flex items-center font-righteous text-retro-accent text-xs">
                            Voir <BiSolidRightArrow className="ml-1" />
                        </p>
                    </Link>
                </div>

                <div>
                    <h2 className="font-title text-retro-accent text-2xl sm:text-3xl mb-2">
                        Mes parties
                    </h2>
                    <Link
                        to={URLS.ME_GAMES_GENERATED}
                        className="flex flex-col items-center card-primary-hover p-6 sm:h-full"
                    >
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <span className="text-4xl sm:text-5xl font-title text-retro-primary">
                                {authoredGameCount}
                            </span>
                            <div className="flex items-center mt-2 w-full">
                                <ProgressBar
                                    label={''}
                                    value={tokens ?? 0}
                                    max={1000}
                                    size={'sm'}
                                />
                                <PiCoinsFill className="text-retro-muted text-2xl ml-1" />
                            </div>
                        </div>
                        <p className="self-end mt-2 flex items-center font-righteous text-retro-accent text-xs">
                            Voir <BiSolidRightArrow className="ml-1" />
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
