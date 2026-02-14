interface StreakBadgeProps {
    count: number;
    className?: string;
}

export default function StreakBadge({
    count,
    className = '',
}: StreakBadgeProps) {
    if (count <= 0) return null;

    return (
        <span
            className={`badge-accent-no-border py-0.5 pl-0.5 pr-1 rounded text-sm ${className}`}
        >
            🔥{count}
        </span>
    );
}
