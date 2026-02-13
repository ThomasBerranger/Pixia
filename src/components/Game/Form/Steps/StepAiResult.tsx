import type { AiGeneratedData } from '../../../../types/gameFormType.tsx';
import TextareaRetro from '../../../../atoms/TextareaRetro.tsx';

interface StepAiResultProps {
    gameData: AiGeneratedData;
    onUpdateGameData: (data: Partial<AiGeneratedData>) => void;
}

function StepAiResult({ gameData, onUpdateGameData }: StepAiResultProps) {
    const formattedDate = new Date(gameData.estimatedDate).toLocaleDateString(
        'fr-FR',
        { day: 'numeric', month: 'long' }
    );

    return (
        <>
            <p className="text-sm font-righteous text-retro-accent mb-2">Édition</p>

            <div className="grid grid-cols-12 items-stretch gap-2 mb-2">
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
        </>
    );
}

export default StepAiResult;
