import { URLS } from '../../../constants/routes.ts';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';

interface UserDashboardStatisticProps {
    rank: number | undefined;
    streak: Record<string, number> | undefined;
    playerCount: number | undefined;
}

export default function UserDashboardStatistic({
    rank,
    streak,
    playerCount,
}: UserDashboardStatisticProps) {
    return (
        <div>
            <h2 className="font-title text-retro-accent text-2xl sm:text-3xl mb-4">
                Statistiques
            </h2>

            <section className="grid grid-cols-2 gap-4 mb-8">
                <Link
                    to={URLS.LEADERBOARD}
                    className="flex flex-col card-primary-hover p-4"
                >
                    <div className="flex items-center gap-2">
                        <div className="sm:text-2xl">🔝</div>
                        <span className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                            Classement
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex items-baseline text-4xl sm:text-5xl font-title text-retro-primary pt-1">
                            {rank}
                            <span className="text-xs sm:text-sm text-retro-muted font-righteous -ml-0.5">
                                /{playerCount}
                            </span>
                        </div>
                        <div className="text-retro-muted text-xs uppercase tracking-wide mt-1 text-center">
                            {rank &&
                                (rank <= 3
                                    ? 'Légende Vivante'
                                    : rank <= 10
                                      ? 'Point faible, trop fort·e'
                                      : rank <= 20
                                        ? 'Aux portes du top'
                                        : 'Prometteur·euse')}
                        </div>
                    </div>

                    <p className="mt-auto pt-2 flex justify-end items-center font-righteous text-retro-accent text-xs">
                        Voir <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>

                <div className="card-primary-hover p-4 flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="sm:text-2xl">🔥</div>
                        <span className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                            Meilleure série
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center sm:justify-start sm:flex-none">
                        <div className="text-4xl sm:text-5xl font-title text-retro-primary">
                            {streak && streak['best']}
                        </div>
                        <div className="text-retro-muted text-xs text-center uppercase tracking-wide mt-2">
                            {streak && `Série de ${streak['current']} en cours`}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
