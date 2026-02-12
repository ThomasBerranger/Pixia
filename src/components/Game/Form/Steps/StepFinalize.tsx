import type { DifficultyKey } from '../../../../types/gameFormType.tsx';
import DifficultyPicker from '../DifficultyPicker.tsx';

interface StepFinalizeProps {
    difficulty: DifficultyKey;
    setDifficulty: (key: DifficultyKey) => void;
    onSubmit: () => void;
    onBack: () => void;
    onReset: () => void;
    submitted: boolean;
    hasImage: boolean;
}

function StepFinalize({
    difficulty,
    setDifficulty,
    onSubmit,
    onBack,
    onReset,
    submitted,
    hasImage,
}: StepFinalizeProps) {
    if (submitted) {
        return (
            <div className="text-center py-4 animate-slide-up">
                <span className="text-5xl">🎉</span>
                <p className="text-lg font-righteous text-retro-success mt-3 mb-1">
                    Pixia envoyé !
                </p>
                <p className="text-sm font-righteous text-white/55 leading-relaxed">
                    Tu recevras une notification à la validation.
                    <br />
                    <span className="text-retro-accent">
                        Merci de contribuer à Pixia !
                    </span>
                </p>

                <button
                    type="button"
                    onClick={onReset}
                    className="mt-5 py-3 px-5 btn-primary text-xs"
                >
                    Créer un autre Pixia
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="text-center p-4 mb-4 bg-retro-secondary/[0.06] border-2 border-retro-accent/30">
                <span className="text-3xl">🎬</span>
                <p className="text-base font-righteous text-retro-accent mt-2 mb-1">
                    Ton Pixia est prêt !
                </p>
                {!hasImage && (
                    <p className="text-xs font-righteous text-retro-muted mt-1">
                        Pas d'image — un admin s'en chargera.
                    </p>
                )}
            </div>

            {/* Difficulté */}
            <DifficultyPicker value={difficulty} onChange={setDifficulty} />

            {/* Avertissement */}
            <div className="flex items-center gap-2 px-3 py-2 mb-4 bg-retro-secondary/[0.08] border border-retro-secondary/25">
                <span>⚠️</span>
                <p className="text-xxs font-righteous text-retro-secondary leading-snug">
                    Action irréversible. Tu ne pourras plus modifier ton Pixia
                    après envoi.
                </p>
            </div>

            <button
                type="button"
                onClick={onSubmit}
                className="w-full py-3 btn-primary"
            >
                🚀 Envoyer pour validation
            </button>

            <button
                type="button"
                onClick={onBack}
                className="w-full mt-3 py-2.5 btn-ghost text-xs"
            >
                ← Revenir en arrière
            </button>
        </>
    );
}

export default StepFinalize;
