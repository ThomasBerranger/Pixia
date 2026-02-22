interface ProgressBarProps {
    label: string;
    value: number;
    max: number;
    isActive?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const SIZE_CONFIG = {
    sm: { height: 'h-5', text: 'text-xxs' },
    md: { height: 'h-6', text: 'text-xs' },
    lg: { height: 'h-8', text: 'text-sm' },
} as const;

export function ProgressBar({
    label,
    value,
    max,
    isActive = true,
    size = 'lg',
}: ProgressBarProps) {
    const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    const { height, text } = SIZE_CONFIG[size];

    return (
        <div
            className={`relative w-full flex transition-opacity duration-300 ${height} ${
                isActive ? 'opacity-100' : 'opacity-40'
            }`}
        >
            <div className="h-full flex items-center px-3 shrink-0 bg-retro-primary">
                <span
                    className={`font-righteous uppercase tracking-wider text-white whitespace-nowrap ${text}`}
                >
                    {isActive && `${value} / ${max}`} {label}
                </span>
            </div>

            <div className="relative flex-1 h-full bg-retro-surface bg-opacity-60">
                <div
                    className="absolute inset-0 bg-retro-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
