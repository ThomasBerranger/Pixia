import { useAppUpdateStore } from '../../stores/appUpdateStore.ts';

// Modale bloquante : le back a rejeté cette version (426). L'utilisateur ne
// peut plus interagir tant qu'il n'a pas rechargé sur une version compatible.
export default function AppOutdatedModal() {
    const updateServiceWorker = useAppUpdateStore((s) => s.updateServiceWorker);

    async function reload() {
        if (!('serviceWorker' in navigator)) {
            window.location.reload();
            return;
        }

        const registration = await navigator.serviceWorker.getRegistration();

        // Un nouveau service worker est déjà prêt → il prend la main et recharge.
        if (registration?.waiting && updateServiceWorker) {
            void updateServiceWorker(true);
            return;
        }

        // Sinon, désenregistrer garantit un index.html frais du réseau : le
        // précache ne resservira plus l'ancienne app (cause de la boucle 426).
        await registration?.unregister();
        window.location.reload();
    }

    return (
        <div className="fixed inset-0 z-[100] bg-retro-bg/80 flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 bg-retro-surface border-[3px] border-retro-primary text-center">
                <h2 className="font-title text-2xl text-retro-primary mb-4 uppercase">
                    Mise à jour requise
                </h2>
                <p className="font-righteous text-white/90 text-sm mb-6 leading-relaxed">
                    Une nouvelle version de Pixia est nécessaire pour continuer à
                    jouer. Recharge la page pour la récupérer.
                </p>
                <button
                    onClick={() => void reload()}
                    className="btn-pixel w-full py-3"
                >
                    Recharger
                </button>
            </div>
        </div>
    );
}
