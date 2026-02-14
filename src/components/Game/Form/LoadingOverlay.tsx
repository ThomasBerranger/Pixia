import { useEffect, useState } from 'react';
import { LOADING_TIPS } from '../../../constants/gameForm.ts';

function LoadingOverlay() {
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        setTipIndex(0);
        const interval = setInterval(() => setTipIndex((p) => p + 1), 3800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center py-6">
            <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-retro-muted/15 border-t-retro-primary animate-spin" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
                    🤖
                </span>
            </div>

            {/* Tip rotatif */}
            <p
                key={tipIndex}
                className="text-sm text-retro-accent max-w-[280px] mx-auto mt-3 leading-relaxed min-h-[44px] animate-slide-up"
            >
                {LOADING_TIPS[tipIndex % LOADING_TIPS.length]}
            </p>
        </div>
    );
}

export default LoadingOverlay;
