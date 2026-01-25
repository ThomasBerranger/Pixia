interface ProgressBarProps {
    label: string;
    value: number;
    max: number;
    isActive?: boolean;
}

export function ProgressBar({
    label,
    value,
    max,
    isActive = true,
}: ProgressBarProps) {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div
            className={`relative h-8 w-full flex border-2 border-retro-bg transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-40'
            }`}
        >
            <div className="h-full flex items-center px-3 shrink-0 bg-retro-primary">
                <span className="font-righteous text-sm uppercase tracking-wider text-white whitespace-nowrap">
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
