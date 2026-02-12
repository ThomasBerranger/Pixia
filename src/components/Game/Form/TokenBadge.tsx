import { PiCoinsFill } from 'react-icons/pi';

interface TokenBadgeProps {
    n: number;
    total: number;
    spent?: boolean;
    sm?: boolean;
}

function TokenBadge({ n, total, spent = false, sm = false }: TokenBadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-1 font-righteous
                ${sm ? 'text-xxs px-1.5 py-0.5' : 'text-xs px-2.5 py-1'}
                ${spent ? 'border-retro-muted text-retro-muted bg-retro-muted/15 line-through' : 'text-retro-accent'}
            `}
        >
            <PiCoinsFill className="text-xs" /> {n} / {total}
        </span>
    );
}

export default TokenBadge;
