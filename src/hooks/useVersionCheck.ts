import { useEffect } from 'react';
import { useVersionStore } from '../stores/versionStore';

const STORAGE_KEY = 'pixia_version';

export function useVersionCheck() {
    const setNeedsUpdate = useVersionStore((state) => state.setNeedsUpdate);

    useEffect(() => {
        const storedVersion = localStorage.getItem(STORAGE_KEY);

        if (!storedVersion) {
            localStorage.setItem(STORAGE_KEY, __APP_VERSION__);
            return;
        }

        if (storedVersion !== __APP_VERSION__) {
            setNeedsUpdate(true);
        }
    }, [setNeedsUpdate]);
}

export async function clearAppCache(): Promise<boolean> {
    // Check connexion
    if (!navigator.onLine) {
        return false;
    }

    try {
        // Unregister service worker
        if ('serviceWorker' in navigator) {
            const registrations =
                await navigator.serviceWorker.getRegistrations();
            await Promise.all(registrations.map((r) => r.unregister()));
        }

        // Clear caches
        if ('caches' in window) {
            const names = await caches.keys();
            await Promise.all(names.map((name) => caches.delete(name)));
        }

        // Marquer version à jour
        localStorage.setItem(STORAGE_KEY, __APP_VERSION__);

        return true;
    } catch {
        return false;
    }
}
