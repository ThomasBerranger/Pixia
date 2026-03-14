import { useState, useEffect, useMemo, useRef } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';

const REEL_HEIGHT = 70;
const REEL_CONFIGS = [
    { count: 15, duration: 1500 },
    { count: 25, duration: 2200 },
    { count: 38, duration: 3200 },
];
const SPARKLE_BG = [
    'bg-retro-accent',
    'bg-retro-primary',
    'bg-retro-secondary',
    'bg-retro-muted',
];

function rndInt(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ── Rouleau ──

interface SlotReelProps {
    target: string;
    count: number;
    duration: number;
    onDone: () => void;
}

function SlotReel({ target, count, duration, onDone }: SlotReelProps) {
    const [scrolling, setScrolling] = useState(false);
    const [done, setDone] = useState(false);

    const strip = useMemo(() => {
        const s = [target];
        for (let i = 0; i < count; i++) s.push(String(rndInt(0, 9)));
        return s;
    }, [target, count]);

    useEffect(() => {
        const t1 = setTimeout(() => setScrolling(true), 30);
        const t2 = setTimeout(() => {
            setDone(true);
            onDone();
        }, duration + 100);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [duration, onDone]);

    const offset = (strip.length - 1) * REEL_HEIGHT;

    return (
        <div
            className={`relative overflow-hidden rounded-lg bg-retro-surface border-2 transition-all duration-300 ${done ? 'border-retro-accent shadow-[0_0_20px_rgba(255,190,11,0.15)]' : 'border-retro-primary/30 shadow-[inset_0_0_15px_rgba(3,4,94,1)]'}`}
            style={{ width: 52, height: REEL_HEIGHT }}
        >
            <div
                className="absolute w-full top-0"
                style={{
                    transform: `translateY(-${scrolling ? 0 : offset}px)`,
                    transition: scrolling
                        ? `transform ${duration / 1000}s cubic-bezier(0.12, 0, 0.1, 1)`
                        : 'none',
                }}
            >
                {strip.map((d, i) => (
                    <div
                        key={i}
                        className={`w-full flex items-center justify-center font-title text-4xl transition-colors duration-300 ${done && i === 0 ? 'text-retro-accent' : 'text-retro-primary'}`}
                        style={{ height: REEL_HEIGHT }}
                    >
                        {d}
                    </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-retro-surface to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-retro-surface to-transparent" />
        </div>
    );
}

// ── Modal Jackpot ──

interface JackpotModalProps {
    month: string;
    onClose: () => void;
    onClaimed?: () => void;
}

function JackpotModal({ month, onClose, onClaimed }: JackpotModalProps) {
    const { apiCall } = useApi();

    const [tokens, setTokens] = useState<number | null>(null);
    const [target, setTarget] = useState(() =>
        [rndInt(0, 9), rndInt(0, 9), rndInt(0, 9)].map(String)
    );
    const [reelKey, setReelKey] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [visible, setVisible] = useState(false);

    const doneCount = useRef(0);
    const apiReady = useRef(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    useEffect(() => {
        apiCall(ENDPOINTS.CLAIM_TOKENS, { method: 'POST' })
            .then((t: number) => {
                setTokens(t);
                setTarget(String(t).padStart(3, '0').split(''));
                doneCount.current = 0;
                apiReady.current = true;
                setReelKey((k) => k + 1);
                onClaimed?.();
            })
            .catch(console.error);
    }, [apiCall]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDone = () => {
        if (!apiReady.current) return;
        doneCount.current += 1;
        if (doneCount.current >= 3) setTimeout(() => setRevealed(true), 250);
    };

    const close = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            onClick={revealed ? close : undefined}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${visible ? 'bg-black/85 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0'}`}
            style={{ cursor: revealed ? 'pointer' : 'default' }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-retro-surface/95 border-[3px] border-retro-primary shadow-[0_0_40px_rgba(255,0,110,0.5)] rounded-xl relative overflow-hidden flex flex-col items-center gap-5 w-full max-w-xs py-8 px-9 transition-all duration-500 ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.85] translate-y-8'}`}
            >
                <div className="flex flex-col items-center gap-1">
                    <h2 className="animated-neon-title text-3xl">JACKPOT</h2>
                    <p className="font-righteous text-retro-muted uppercase text-[11px] tracking-[3px]">
                        Jetons de {month}
                    </p>
                </div>

                <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-retro-primary/40 to-transparent" />

                <div className="flex gap-2.5">
                    {REEL_CONFIGS.map((cfg, i) => (
                        <SlotReel
                            key={`${reelKey}-${i}`}
                            target={target[i]}
                            count={cfg.count}
                            duration={cfg.duration}
                            onDone={handleDone}
                        />
                    ))}
                </div>

                {/* Résultat */}
                <div className="flex flex-col items-center justify-center min-h-[60px]">
                    {!revealed && (
                        <p className="font-righteous text-retro-muted uppercase animate-pulse text-[11px] tracking-[2px]">
                            Calcul en cours...
                        </p>
                    )}
                    {revealed && (
                        <div className="flex flex-col items-center gap-1.5 animate-jackpot-reveal">
                            <p className="font-title text-retro-accent text-[32px]">
                                +{tokens}
                            </p>
                            <p className="font-righteous text-retro-accent uppercase text-[13px] tracking-[2px]">
                                Jetons gagnés !
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                {revealed && (
                    <button
                        onClick={close}
                        className="btn-primary px-6 py-2 text-[11px] animate-jackpot-reveal"
                    >
                        Récupérer
                    </button>
                )}

                {/* Particules */}
                {revealed &&
                    [...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full animate-jackpot-sparkle ${SPARKLE_BG[i % 4]}`}
                            style={{
                                top: `${5 + Math.random() * 90}%`,
                                left: `${5 + Math.random() * 90}%`,
                                animationDelay: `${i * 0.06}s`,
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}

export default JackpotModal;
