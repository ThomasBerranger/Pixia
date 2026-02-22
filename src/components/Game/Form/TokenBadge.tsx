import { PiCoinsFill } from 'react-icons/pi';

interface TokenBadgeProps {
    value?: number;
    spent?: boolean;
}

function TokenBadge({ value, spent = false }: TokenBadgeProps) {
    if (spent) {
        return (
            <span className="inline-flex items-center text-retro-muted pr-1 py-0.5">
                <PiCoinsFill className="text-xs" />
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 font-righteous text-xxs pr-1 py-0.5 text-retro-accent">
            <PiCoinsFill className="text-xs" /> {value}
        </span>
    );
}

export default TokenBadge;
