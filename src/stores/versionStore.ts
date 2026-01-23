import { create } from 'zustand';

interface VersionStore {
    needsUpdate: boolean;
    setNeedsUpdate: (value: boolean) => void;
}

export const useVersionStore = create<VersionStore>((set) => ({
    needsUpdate: false,
    setNeedsUpdate: (value) => set({ needsUpdate: value }),
}));
