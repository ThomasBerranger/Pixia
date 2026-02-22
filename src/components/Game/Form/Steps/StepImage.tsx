import { useRef } from 'react';
import type { AiGeneratedData } from '../../../../types/gameFormType.tsx';
import TextareaRetro from '../../../../atoms/TextareaRetro.tsx';
import { formatDateFr } from '../../../../utils/date.ts';
import { TOKEN_COSTS } from '../../../../constants/gameForm.ts';
import { PiCoinsFill } from 'react-icons/pi';
import { FaFolderOpen } from 'react-icons/fa';
import ImagePreview from '../ImagePreview.tsx';

interface StepImageProps {
    gameData: AiGeneratedData;
    onUpdateGameData: (data: Partial<AiGeneratedData>) => void;
    imageUrl: string | null;
    loading: boolean;
    tokensRemaining: number;
    onGenerateImage: () => void;
    onUploadImage: (file: File) => void;
    onContinue: () => void;
    onSkip: () => void;
}

function StepImage({
    gameData,
    onUpdateGameData,
    imageUrl,
    loading,
    tokensRemaining,
    onGenerateImage,
    onUploadImage,
    onContinue,
    onSkip,
}: StepImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUploadImage(file);
    };

    return (
        <>
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

                {/* Date estimée */}
                <div className="col-span-12 sm:col-span-2 order-2">
                    <label className="label-retro text-retro-muted text-center block">
                        Date estimée
                    </label>
                    <div className="h-[38px] flex items-center justify-center bg-retro-surface">
                        <p className="text-base sm:text-xl font-title font-semibold text-retro-accent">
                            {formatDateFr(gameData.estimatedDate)}
                        </p>
                    </div>
                </div>

                {/* Indice */}
                <div className="col-span-12 order-3">
                    <TextareaRetro
                        label="Indice"
                        value={gameData.hint}
                        onChange={(v) => onUpdateGameData({ hint: v })}
                        rows={2}
                        maxLength={250}
                    />
                </div>
            </div>

            {/* Image */}
            {imageUrl ? (
                <>
                    <ImagePreview imageUrl={imageUrl} />

                    <div className="grid sm:grid-cols-3 gap-2 mt-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="btn-neon py-2.5 text-xs sm:text-sm sm:order-1 inline-flex items-center justify-center gap-1.5"
                        >
                            <FaFolderOpen /> Charger un fichier
                        </button>
                        <button
                            type="button"
                            onClick={onContinue}
                            className="btn-primary py-2.5 text-xs sm:text-sm sm:order-2 inline-flex items-center justify-center"
                        >
                            Sauvegarder
                        </button>
                        <button
                            type="button"
                            onClick={onSkip}
                            className="btn-ghost py-2.5 text-xs sm:text-sm sm:order-3 inline-flex items-center justify-center"
                        >
                            Continuer sans l'image
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {/* Importer */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={tokensRemaining < TOKEN_COSTS.imageUpload}
                            className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-[3px] transition-all ${
                                tokensRemaining < TOKEN_COSTS.imageUpload
                                    ? 'border-retro-muted/20 opacity-50'
                                    : 'border-retro-accent/30 bg-retro-accent/5 hover:bg-retro-accent/10'
                            }`}
                        >
                            <span className="text-xl sm:text-2xl">📁</span>
                            <span className="text-xxs sm:text-xs font-righteous text-retro-accent uppercase">
                                Importer
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-xxs sm:text-xs font-righteous text-retro-accent">
                                <PiCoinsFill /> {TOKEN_COSTS.imageUpload}
                            </span>
                        </button>

                        {/* Générer par IA */}
                        <button
                            type="button"
                            onClick={onGenerateImage}
                            disabled={
                                loading ||
                                tokensRemaining < TOKEN_COSTS.imageGenerate
                            }
                            className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-[3px] transition-all ${
                                loading ||
                                tokensRemaining < TOKEN_COSTS.imageGenerate
                                    ? 'border-retro-muted/20 opacity-50'
                                    : 'border-retro-primary bg-retro-primary/[0.05] hover:bg-retro-primary/10'
                            }`}
                        >
                            {loading ? (
                                <span className="animate-spin text-xl sm:text-2xl">
                                    ⏳
                                </span>
                            ) : (
                                <span className="text-xl sm:text-2xl">🤖</span>
                            )}
                            <span className="text-xxs sm:text-xs font-righteous text-retro-primary uppercase">
                                Générer
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-xxs sm:text-xs font-righteous text-retro-accent">
                                <PiCoinsFill /> {TOKEN_COSTS.imageGenerate}
                            </span>
                        </button>

                        {/* Pas d'image */}
                        <button
                            type="button"
                            onClick={onSkip}
                            className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 border-[3px] border-retro-muted/50 bg-retro-surface/50 hover:bg-retro-muted/10 transition-all"
                        >
                            <span className="text-xl sm:text-2xl">⏭️</span>
                            <span className="text-xxs sm:text-xs font-righteous text-retro-muted uppercase">
                                Passer
                            </span>
                            <span className="text-xxs sm:text-xs font-righteous text-retro-success">
                                Gratuit
                            </span>
                        </button>
                    </div>
                </>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </>
    );
}

export default StepImage;
