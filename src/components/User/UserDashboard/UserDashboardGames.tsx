import { URLS } from '../../../constants/routes.ts';
import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from 'react-icons/bi';
import { ProgressBar } from '../../../atoms/ProgressBar.tsx';
import { PiCoinsFill } from 'react-icons/pi';
import type { HistoryEntry } from '../../../types/User/userDashboardType.ts';

function HistoryChart({ history }: { history: HistoryEntry[] }) {
    const maxPts = Math.max(...history.map((d) => d.points), 1);
    const barZone = 20;
    const h = barZone;
    const w = 100;
    const barW = w / history.length;

    return (
        <svg
            viewBox={`0 0 ${w} ${h + 6}`}
            className="w-full"
            style={{ maxHeight: 100 }}
        >
            {history.map((d, i) => {
                const barH =
                    d.points > 0
                        ? Math.max((d.points / maxPts) * barZone, 4)
                        : 3;
                const x = i * barW + barW * 0.15;
                const bw = barW * 0.7;
                const color = d.points > 0 ? '#ff006e' : '#a76eff';
                const label = d.date.split('-')[2];

                return (
                    <g key={d.date}>
                        <rect
                            x={x}
                            y={h - barH}
                            width={bw}
                            height={barH}
                            rx={2}
                            fill={color}
                        />
                        {d.points > 0 && (
                            <text
                                x={x + bw / 2}
                                y={h - barH / 2 + 1}
                                textAnchor="middle"
                                fill="white"
                                fontSize="3"
                                fontFamily="Righteous"
                            >
                                {d.points}
                            </text>
                        )}
                        <text
                            x={x + bw / 2}
                            y={h + 4}
                            textAnchor="middle"
                            fill="#a76eff"
                            fontSize="3"
                            fontFamily="Righteous"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

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
                Historique
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
                                {success}
                                <span className="text-xs sm:text-sm text-retro-muted font-righteous">
                                    /{games}
                                </span>
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
                                    Mes parties
                                </span>
                            </div>
                            <span className="font-title text-retro-primary sm:text-2xl">
                                {authoredGameCount}
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
