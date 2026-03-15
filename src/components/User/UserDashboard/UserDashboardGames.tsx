import { URLS } from '../../../constants/routes.ts';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import { ProgressBar } from '../../../atoms/ProgressBar.tsx';
import { PiCoinsFill } from 'react-icons/pi';
import { CgSpinner } from 'react-icons/cg';
import HistoryChart from '../../../atoms/HistoryChart.tsx';
import type { HistoryEntry } from '../../../types/User/userDashboardType.ts';

interface UserDashboardGamesProps {
    success: number | undefined;
    games: number | undefined;
    authoredGameCount: number | undefined;
    tokens: number | undefined;
    history: HistoryEntry[] | undefined;
}

export default function UserDashboardGames({
    success,
    games,
    authoredGameCount,
    tokens,
    history,
}: UserDashboardGamesProps) {
    return (
        <section className="mb-8">
            <h2 className="font-title text-retro-accent text-2xl sm:text-3xl mb-4">
                Parties
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <Link
                        to={URLS.ME_GAMES}
                        className="flex flex-col card-primary-hover p-4 sm:h-full"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="sm:text-2xl">📊</div>
                                <span className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                                    Historique
                                </span>
                            </div>
                            <span className="font-title text-retro-primary sm:text-2xl">
                                {success !== undefined ? (
                                    <>
                                        {success}
                                        <span className="text-xs sm:text-sm text-retro-muted font-righteous">
                                            /{games}
                                        </span>
                                    </>
                                ) : (
                                    <CgSpinner className="animate-spin text-retro-primary" />
                                )}
                            </span>
                        </div>
                        <div className="flex-1 flex items-end">
                            {history && history.length > 0 && (
                                <HistoryChart history={history} />
                            )}
                        </div>
                        <p className="self-end mt-2 flex items-center font-righteous text-retro-accent text-xs">
                            Voir <BiSolidRightArrow className="ml-1" />
                        </p>
                    </Link>
                </div>

                <div>
                    <Link
                        to={URLS.ME_GAMES_GENERATED}
                        className="flex flex-col card-primary-hover p-4 sm:h-full"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="sm:text-2xl">🎨</div>
                                <span className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                                    Mes créations
                                </span>
                            </div>
                            <span className="font-title text-retro-primary sm:text-2xl">
                                {authoredGameCount !== undefined ? (
                                    authoredGameCount
                                ) : (
                                    <CgSpinner className="animate-spin text-retro-primary" />
                                )}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="flex items-center mt-2 w-full">
                                <ProgressBar
                                    label={'Jetons'}
                                    value={tokens ?? 0}
                                    max={1000}
                                    size={'md'}
                                    color={
                                        (tokens ?? 0) >= 1000
                                            ? 'success'
                                            : 'primary'
                                    }
                                />
                                <PiCoinsFill className="text-retro-success text-3xl ml-3" />
                            </div>
                        </div>
                        <p className="self-end mt-2 flex items-center font-righteous text-retro-accent text-xs">
                            Générer <BiSolidRightArrow className="ml-1" />
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
