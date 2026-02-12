import { useState } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import type { AiGeneratedData } from '../../../../types/gameFormType.tsx';
import TextareaRetro from '../../../../atoms/TextareaRetro.tsx';

interface StepAiResultProps {
    gameData: AiGeneratedData;
    onUpdateGameData: (data: Partial<AiGeneratedData>) => void;
}

function StepAiResult({ gameData, onUpdateGameData }: StepAiResultProps) {
    const [copied, setCopied] = useState(false);

    const copyPrompt = () => {
        navigator.clipboard.writeText(gameData.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formattedDate = new Date(gameData.estimatedDate).toLocaleDateString(
        'fr-FR',
        { day: 'numeric', month: 'long' }
    );

    return (
        <>
            <div className="grid grid-cols-12 items-stretch gap-2">
                {/* Solution */}
                <div className="col-span-12 sm:col-span-10 order-1">
                    <label className="label-retro">Solution</label>
                    <input
                        type="text"
                        value={gameData.solution}
                        onChange={(e) =>
                            onUpdateGameData({ solution: e.target.value })
                        }
                        maxLength={250}
                        className="input-retro text-sm"
                    />
                </div>

                {/* Popularité */}
                <div className="col-span-6 sm:col-span-2 order-3 sm:order-2 h-full flex flex-col items-center justify-center bg-retro-surface">
                    <p className="text-xxs font-righteous uppercase tracking-widest text-retro-muted text-center">
                        Popularité
                    </p>
                    <p className="sm:text-2xl font-title font-semibold text-retro-accent text-center">
                        {gameData.popularityScore}%
                    </p>
                </div>

                {/* Indice */}
                <div className="col-span-12 sm:col-span-10 order-2 sm:order-3">
                    <TextareaRetro
                        label="Indice"
                        value={gameData.hint}
                        onChange={(v) => onUpdateGameData({ hint: v })}
                        rows={2}
                        maxLength={250}
                    />
                </div>

                {/* Date potentielle */}
                <div className="col-span-6 sm:col-span-2 order-4 h-full flex flex-col items-center justify-center bg-retro-surface">
                    <p className="text-xxs font-righteous uppercase tracking-widest text-retro-muted text-center">
                        Date estimée
                    </p>
                    <p className="text-base sm:text-xl font-title font-semibold text-retro-accent text-center mt-1">
                        {formattedDate}
                    </p>
                </div>
            </div>

            {/* Prompt (collapsible) */}
            <details className="mb-4">
                <summary className="flex items-center justify-between text-xxs font-righteous cursor-pointer uppercase tracking-wider list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-retro-muted hover:text-retro-accent transition-colors">
                        Voir le prompt
                    </span>
                    <span
                        role="button"
                        onClick={(e) => {
                            e.preventDefault();
                            copyPrompt();
                        }}
                        className="flex items-center gap-1 text-retro-muted hover:text-retro-accent transition-colors"
                    >
                        {copied ? (
                            <>
                                <FaCheck className="text-retro-success text-sm" />
                                Copié
                            </>
                        ) : (
                            <>
                                <FaRegCopy className="text-sm" />
                                Copier le prompt
                            </>
                        )}
                    </span>
                </summary>
                <p className="text-xs font-righteous text-white/60 mt-2 leading-relaxed bg-retro-surface/50">
                    {gameData.prompt}
                </p>
            </details>
        </>
    );
}

export default StepAiResult;
