import {
    IDEA_MIN_LENGTH,
    POPULARITY_MIN,
    TOKEN_COSTS,
    TOKEN_REFUND_LOW_POPULARITY,
} from '../../../../constants/gameForm.ts';
import { PiCoinsFill } from 'react-icons/pi';
import TextareaRetro from '../../../../atoms/TextareaRetro.tsx';

interface StepIdeaProps {
    idea: string;
    setIdea: (value: string) => void;
    onSubmit: () => void;
    canSubmit: boolean;
    loading: boolean;
    lastPopularityScore: number | null;
}

function StepIdea({
    idea,
    setIdea,
    onSubmit,
    canSubmit,
    loading,
    lastPopularityScore,
}: StepIdeaProps) {
    const isRejected =
        lastPopularityScore !== null && lastPopularityScore < POPULARITY_MIN;
    return (
        <>
            {/* Explication */}
            <div className="p-3 mb-4 bg-retro-muted/[0.06] border border-retro-muted/15 tracking-wide space-y-0.5 font-righteous">
                <p className="text-sm text-retro-accent">Comment ça marche ?</p>
                <p className="text-xs text-white/60 leading-relaxed">
                    Décris ta fusion de 2 films. L'IA va analyser ton concept,
                    générer un prompt artistique, trouver la solution, un indice
                    et estimer la popularité.
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                    Tu pourras ensuite générer une image par IA, importer la
                    tienne ou laisser un admin s'en charger, puis soumettre ton
                    Pixia.
                </p>
                <p className="text-xs text-retro-primary/70 leading-relaxed">
                    Les admins se réservent le droit de modifier ou refuser une
                    proposition afin de garantir la qualité et la ligne
                    éditoriale de Pixia.
                </p>
            </div>

            {/* Message de rejet */}
            {isRejected && (
                <div className="p-3 mb-4 bg-retro-primary/10">
                    <p className="text-center text-sm font-righteous text-retro-primary leading-relaxed tracking-wide">
                        Les films proposés ne sont pas assez connus (popularité{' '}
                        {lastPopularityScore}%).{' '}
                        <span className="text-retro-success/90">
                            Tu as été remboursé de {TOKEN_REFUND_LOW_POPULARITY}{' '}
                            jetons.
                        </span>
                    </p>
                </div>
            )}

            {/* Textarea */}
            <TextareaRetro
                value={idea}
                onChange={setIdea}
                label="Décris ton idée"
                placeholder="Une fusion épique entre les univers de..."
                minLength={IDEA_MIN_LENGTH}
            />

            {/* CTA */}
            <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit || loading}
                className={`w-full text-xs sm:text-sm mt-3 py-2.5 inline-flex items-center justify-center gap-2 ${canSubmit ? 'btn-primary' : 'btn-disabled'}`}
            >
                {loading ? (
                    <span className="animate-spin inline-block">⏳</span>
                ) : (
                    <>
                        Analyser mon idée
                        <span className="inline-flex items-center gap-1 text-sm">
                            <PiCoinsFill className="text-lg" />{' '}
                            {TOKEN_COSTS.analysis}
                        </span>
                    </>
                )}
            </button>
        </>
    );
}

export default StepIdea;
