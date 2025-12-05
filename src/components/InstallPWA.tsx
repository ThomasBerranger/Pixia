import React, { useState, useEffect } from 'react';
import { TbShare2 } from 'react-icons/tb';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface NavigatorStandalone extends Navigator {
    standalone?: boolean;
}

const InstallPWA: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // MODE DEBUG : Forcer l'affichage pour tester le design
        const DEBUG_MODE = false; // Mettre à false pour la production

        // Détection mobile
        const checkMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        setIsMobile(DEBUG_MODE || checkMobile);

        if (!DEBUG_MODE && !checkMobile) return; // Ne rien faire si desktop

        // Détection iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);

        // Vérifier si déjà installé
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as NavigatorStandalone).standalone ||
            document.referrer.includes('android-app://');

        if (!DEBUG_MODE && isStandalone) return; // Déjà installé

        // Vérifier si l'utilisateur a déjà refusé
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!DEBUG_MODE && dismissed) {
            const dismissedDate = new Date(dismissed);
            const daysSince =
                (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

            // Réafficher après 7 jours
            if (daysSince < 7) return;
        }

        // Gérer l'événement beforeinstallprompt (Android/Chrome)
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Afficher pour iOS (ils n'ont pas beforeinstallprompt)
        if (iOS || DEBUG_MODE) {
            setShowPrompt(true);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('PWA installée avec succès');
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
        setShowPrompt(false);
    };

    // Ne rien afficher si pas mobile ou pas besoin
    if (!isMobile || !showPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-retro-bg border-t-[3px] border-retro-accent shadow-[0_-4px_20px_rgba(255,0,110,0.6)] px-3 py-6">
                <div className="max-w-lg mx-auto relative">
                    <button
                        onClick={handleDismiss}
                        className="absolute -top-3.5 -right-0.5 w-8 h-8 bg-retro-bg border-2 border-retro-accent rounded-full flex items-center justify-center text-retro-accent font-bold hover:bg-retro-accent hover:text-retro-bg transition-all hover:rotate-90"
                        aria-label="Fermer"
                    >
                        ✕
                    </button>

                    <div
                        className={`w-full flex gap-2 items-center ${!isIOS && 'justify-between'}`}
                    >
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/icon-72x72.png"
                                alt="Pixia"
                                className="w-16 h-16"
                            />
                        </div>

                        <div className="min-w-0">
                            {isIOS ? (
                                <h3 className="font-righteous text-white text-xl mb-1 uppercase tracking-wide">
                                    Installer Pixia
                                </h3>
                            ) : (
                                <button
                                    onClick={handleInstallClick}
                                    className="btn-pixel flex-shrink-0 px-8 py-3"
                                >
                                    Installer
                                    <br />
                                    l'application
                                </button>
                            )}
                            {isIOS && (
                                <p className="text-white/90 text-sm leading-tight font-medium">
                                    Tape sur <TbShare2 className="inline" /> en
                                    bas puis "Ajouter à l'écran"
                                </p>
                            )}
                        </div>

                        {!isIOS && (
                            <div className="flex-shrink-0 opacity-0">
                                <img
                                    src="/icons/icon-72x72.png"
                                    alt="Pixia"
                                    className="w-16 h-16"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstallPWA;
