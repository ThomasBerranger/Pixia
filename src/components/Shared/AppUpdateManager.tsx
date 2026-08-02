import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useAppUpdateStore } from '../../stores/appUpdateStore.ts';
import UpdateBanner from './UpdateBanner.tsx';
import AppOutdatedModal from './AppOutdatedModal.tsx';

const SW_UPDATE_INTERVAL_MS = 15 * 60 * 1000;

// Garde module-level : le SW n'est enregistré qu'une fois, donc on ne pose
// l'intervalle et le listener qu'une seule fois (évite le doublon en StrictMode).
let periodicChecksStarted = false;

// Enregistre le service worker, vérifie périodiquement les mises à jour et
// pilote l'affichage de la bannière douce / de la modale bloquante.
export default function AppUpdateManager() {
    const setUpdateAvailable = useAppUpdateStore((s) => s.setUpdateAvailable);
    const setUpdateServiceWorker = useAppUpdateStore(
        (s) => s.setUpdateServiceWorker
    );
    const updateAvailable = useAppUpdateStore((s) => s.updateAvailable);
    const outdated = useAppUpdateStore((s) => s.outdated);

    const { updateServiceWorker } = useRegisterSW({
        onRegisteredSW(_swUrl, registration) {
            if (!registration || periodicChecksStarted) return;
            periodicChecksStarted = true;

            setInterval(() => {
                registration.update().catch(() => {});
            }, SW_UPDATE_INTERVAL_MS);

            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    registration.update().catch(() => {});
                }
            });
        },
        onNeedRefresh() {
            setUpdateAvailable(true);
        },
    });

    useEffect(() => {
        setUpdateServiceWorker(updateServiceWorker);
    }, [updateServiceWorker, setUpdateServiceWorker]);

    if (outdated) {
        return <AppOutdatedModal />;
    }

    if (updateAvailable) {
        return <UpdateBanner />;
    }

    return null;
}
