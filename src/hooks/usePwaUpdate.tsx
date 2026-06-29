import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

// Intervalle de revérification active du service worker (30 min)
const UPDATE_CHECK_INTERVAL = 30 * 60 * 1000;

interface PwaUpdate {
    needRefresh: boolean;
    update: () => void;
}

/**
 * Détecte les mises à jour du service worker en mode "prompt".
 *
 * Une PWA installée reprend depuis l'arrière-plan sans rechargement et ne
 * revérifie jamais seule l'existence d'une nouvelle version : on force donc
 * la vérification au retour au premier plan (visibilitychange) et via un
 * polling régulier. La bascule sur la nouvelle version reste déclenchée par
 * l'utilisateur (update), jamais de rechargement intempestif.
 */
export function usePwaUpdate(): PwaUpdate {
    const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(_swUrl, registration) {
            registrationRef.current = registration ?? null;
        },
    });

    useEffect(() => {
        const checkForUpdate = () => {
            if (document.visibilityState === 'visible') {
                void registrationRef.current?.update();
            }
        };

        const interval = window.setInterval(
            checkForUpdate,
            UPDATE_CHECK_INTERVAL
        );
        document.addEventListener('visibilitychange', checkForUpdate);

        return () => {
            window.clearInterval(interval);
            document.removeEventListener('visibilitychange', checkForUpdate);
        };
    }, []);

    return {
        needRefresh,
        update: () => void updateServiceWorker(true),
    };
}
