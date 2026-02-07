import { URLS } from '../../../constants/routes.ts';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';

export default function UserDashboardStatistic({
    success,
    games,
    rank,
    streak,
    playerCount,
}: {
    success: number | undefined;
    games: number | undefined;
    rank: number | undefined;
    streak: Record<string, number> | undefined;
    playerCount: number | undefined;
}) {
    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Statistiques
            </h2>

            <section className="grid grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6 mb-8">
                <Link
                    to={URLS.ME_GAMES}
                    className="col-span-3 flex flex-col items-center card-primary-hover p-6"
                >
                    <div className="self-start flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">🎮</div>
                        <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase mb-3">
                            Parties gagnées
                        </h3>
                    </div>

                    <div
                        className="w-[80px] h-[80px] rounded-full flex items-center justify-center"
                        style={{
                            background: `conic-gradient(#ff006e 0deg ${((success ?? 0) / (games ?? 1)) * 360}deg, #0a0e27 ${((success ?? 0) / (games ?? 1)) * 360}deg 360deg)`,
                        }}
                    >
                        <div className="w-[76px] h-[76px] bg-retro-surface rounded-full flex flex-col items-center justify-center">
                            <span className="text-4xl font-title text-retro-primary">
                                {success}
                            </span>
                            <span className="text-xs text-retro-muted font-righteous">
                                / {games}
                            </span>
                        </div>
                    </div>

                    <p className="self-end mt-2 sm:mt-0 flex items-center font-righteous text-retro-accent text-xs">
                        Voir <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>

                <Link
                    to={URLS.LEADERBOARD}
                    className="col-span-3 flex flex-col card-primary-hover p-6"
                >
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl">🔝</div>
                        <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                            Classement général
                        </h3>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex items-baseline text-4xl sm:text-5xl font-title text-retro-primary pt-1">
                            {rank}
                            <span className="text-xs font-righteous text-retro-muted">
                                / {playerCount}
                            </span>{' '}
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

                <div className="col-span-3 card-primary-hover p-6">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">✓</div>
                        <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase mb-2">
                            Taux de réussite
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary text-center">
                        {success &&
                            games &&
                            ((success / games) * 100).toFixed(0)}
                        %
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2 text-center">
                        {success
                            ? games &&
                              (parseInt(((success / games) * 100).toFixed(0)) >=
                              90
                                  ? 'Machine de guerre'
                                  : parseInt(
                                          ((success / games) * 100).toFixed(0)
                                      ) >= 75
                                    ? 'Champion·ne'
                                    : parseInt(
                                            ((success / games) * 100).toFixed(0)
                                        ) >= 50
                                      ? "Y'a du potentiel"
                                      : 'Courage, ça va venir')
                            : 'Courage, ça va venir'}
                    </div>
                </div>

                <div className="col-span-3 card-primary-hover p-6">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">🔥</div>
                        <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase mb-2">
                            Meilleure série
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary text-center">
                        {streak && streak['best']}
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2 text-center">
                        {streak && `Série de ${streak['current']} en cours`}
                    </div>
                </div>
            </section>
        </>
    );
}
