import { PiCoinsFill } from 'react-icons/pi';
import type { AiGeneratedData } from '../../../../types/gameFormType.tsx';
import { TOKEN_COSTS } from '../../../../constants/gameForm.ts';
import { formatDateFr } from '../../../../utils/date.ts';
import { URLS } from '../../../../constants/routes.ts';
import ImagePreview from '../ImagePreview.tsx';
import { BiSolidLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface StepSubmitProps {
    gameData: AiGeneratedData;
    imageUrl: string | null;
    onSubmit: () => void;
    onBack: () => void;
    onReset: () => void;
    submitted: boolean;
}

function StepSubmit({
    gameData,
    imageUrl,
    onSubmit,
    onBack,
    submitted,
}: StepSubmitProps) {
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

                <Link
                    to={URLS.ME_GAMES_GENERATED}
                    className="mt-5 py-3 px-5 btn-primary text-xs inline-block"
                >
                    Mes parties
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Récapitulatif */}
            <div className="mb-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    {/* Image */}
                    <div className="sm:w-1/2 flex justify-center items-center">
                        {imageUrl ? (
                            <ImagePreview imageUrl={imageUrl} />
                        ) : (
                            <p className="text-xs text-center font-righteous text-retro-muted italic">
                                Pas d'image <br /> Un admin s'en chargera.
                            </p>
                        )}
                    </div>

                    {/* Infos */}
                    <div className="mt-3 sm:mt-0 sm:w-1/2 space-y-3">
                        <div>
                            <p className="text-xxs sm:text-xs font-righteous uppercase tracking-widest text-retro-muted">
                                Solution
                            </p>
                            <p className="text-sm sm:text-base font-righteous text-white/80 mt-0.5 truncate sm:whitespace-normal">
                                {gameData.solution}
                            </p>
                        </div>
                        <div>
                            <p className="text-xxs sm:text-xs font-righteous uppercase tracking-widest text-retro-muted">
                                Indice
                            </p>
                            <p className="text-sm sm:text-base font-righteous text-white/80 mt-0.5 truncate sm:whitespace-normal">
                                {gameData.hint}
                            </p>
                        </div>
                        <div>
                            <p className="text-xxs sm:text-xs font-righteous uppercase tracking-widest text-retro-muted">
                                Date estimée
                            </p>
                            <p className="text-sm sm:text-base font-title font-semibold text-retro-accent mt-0.5">
                                {formatDateFr(gameData.estimatedDate)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Avertissement */}
            <div className="flex justify-center items-center px-2 py-2 mb-4 bg-retro-primary/[0.08]">
                <p className="text-xs font-righteous text-retro-primary leading-snug">
                    Tu ne pourras plus modifier ton Pixia après envoi.
                </p>
            </div>

            <button
                type="button"
                onClick={onSubmit}
                className="w-full py-2.5 text-xs sm:text-sm btn-primary inline-flex items-center justify-center gap-2"
            >
                Envoyer pour validation
                <span className="inline-flex items-center gap-1 text-sm">
                    <PiCoinsFill className="text-lg" /> {TOKEN_COSTS.submit}
                </span>
            </button>

            <button
                type="button"
                onClick={onBack}
                className="w-full mt-3 py-2.5 text-xs sm:text-sm btn-ghost inline-flex items-center justify-center gap-1"
            >
                <BiSolidLeftArrow className="text-xs" /> Revenir à l'édition
            </button>
        </>
    );
}

export default StepSubmit;
