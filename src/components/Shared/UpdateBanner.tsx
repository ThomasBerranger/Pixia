import { useState } from 'react';
import { useAppUpdateStore } from '../../stores/appUpdateStore.ts';

// Bannière douce, non bloquante : une nouvelle version du front est disponible.
export default function UpdateBanner() {
    const [dismissed, setDismissed] = useState(false);
    const updateServiceWorker = useAppUpdateStore((s) => s.updateServiceWorker);

    if (dismissed) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-retro-bg border-t-[3px] border-retro-accent shadow-[0_-4px_20px_rgba(255,0,110,0.6)] px-3 py-4">
                <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
                    <p className="font-righteous text-white text-sm leading-tight">
                        Une nouvelle version de Pixia est disponible.
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => updateServiceWorker?.(true)}
                            className="btn-pixel px-5 py-2"
                        >
                            Recharger
                        </button>
                        <button
                            onClick={() => setDismissed(true)}
                            className="w-8 h-8 bg-retro-bg border-2 border-retro-accent rounded-full flex items-center justify-center text-retro-accent font-bold hover:bg-retro-accent hover:text-retro-bg transition-all"
                            aria-label="Fermer"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
