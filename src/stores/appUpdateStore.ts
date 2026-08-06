import { create } from 'zustand';

type UpdateServiceWorker = (reloadPage?: boolean) => Promise<void>;

interface AppUpdateStore {
    // Une nouvelle version du front est prête dans le service worker (MAJ douce).
    updateAvailable: boolean;
    // Le back a signalé que cette version est incompatible (MAJ bloquante, 426).
    outdated: boolean;
    updateServiceWorker: UpdateServiceWorker | null;
    setUpdateAvailable: (value: boolean) => void;
    setOutdated: (value: boolean) => void;
    setUpdateServiceWorker: (fn: UpdateServiceWorker) => void;
}

export const useAppUpdateStore = create<AppUpdateStore>((set) => ({
    updateAvailable: false,
    outdated: false,
    updateServiceWorker: null,
    setUpdateAvailable: (value) => set({ updateAvailable: value }),
    setOutdated: (value) => set({ outdated: value }),
    setUpdateServiceWorker: (fn) => set({ updateServiceWorker: fn }),
}));
