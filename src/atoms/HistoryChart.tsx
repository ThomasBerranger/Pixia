import type { HistoryEntry } from '../types/User/userDashboardType.ts';

interface HistoryChartProps {
    history: HistoryEntry[];
    maxHeight?: number;
}

export default function HistoryChart({ history, maxHeight = 100 }: HistoryChartProps) {
    const maxPts = Math.max(...history.map((d) => d.points), 1);
    const barZone = 20;
    const h = barZone;
    const w = 100;
    const barW = w / history.length;

    return (
        <svg
            viewBox={`0 0 ${w} ${h + 6}`}
            className="w-full"
            style={{ maxHeight }}
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
