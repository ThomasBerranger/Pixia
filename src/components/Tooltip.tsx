import { useState, type ReactNode } from 'react';

interface TooltipProps {
    content: string | ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

export default function Tooltip({
    content,
    children,
    position = 'bottom',
    className = '',
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`absolute z-50 px-3 py-2 text-xs font-righteous bg-retro-surface border-2 border-retro-accent shadow-[2px_2px_0] shadow-retro-accent whitespace-nowrap ${positionClasses[position]} ${className}`}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
