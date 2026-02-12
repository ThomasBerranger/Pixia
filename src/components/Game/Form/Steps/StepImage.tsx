import { useRef } from 'react';
import { TOKEN_COSTS } from '../../../../constants/gameForm.ts';
import { PiCoinsFill } from 'react-icons/pi';
import { FaFolderOpen } from 'react-icons/fa';
import ImagePreview from '../ImagePreview.tsx';

interface StepImageProps {
    imageUrl: string | null;
    loading: boolean;
    onGenerateImage: () => void;
    onUploadImage: (file: File) => void;
    onContinue: () => void;
}

function StepImage({
    imageUrl,
    loading,
    onGenerateImage,
    onUploadImage,
    onContinue,
}: StepImageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onUploadImage(file);
    };

    return (
        <>
            {imageUrl ? (
                <>
                    <ImagePreview imageUrl={imageUrl} />

                    <div className="grid grid-cols-3 gap-2 mt-4 mb-3">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="btn-neon py-2.5 text-xxs sm:text-xs inline-flex items-center justify-center gap-1.5"
                        >
                            <FaFolderOpen /> Charger un fichier
                        </button>
                        <button
                            type="button"
                            onClick={onContinue}
                            className="btn-primary py-2.5 text-xxs sm:text-xs mr-1"
                        >
                            Sauvegarder
                        </button>
                        <button
                            type="button"
                            onClick={onContinue}
                            className="btn-ghost py-2.5 text-xxs sm:text-xs"
                        >
                            Continuer sans l'image
                        </button>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Importer */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-1.5 p-3 border-[3px] border-retro-accent/30 bg-retro-accent/[0.03] hover:bg-retro-accent/[0.08] transition-all"
                    >
                        <span className="text-xl">📁</span>
                        <span className="text-xxs font-righteous text-retro-accent uppercase">
                            Importer
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-xxs font-righteous text-retro-accent">
                            <PiCoinsFill /> {TOKEN_COSTS.imageUpload}
                        </span>
                    </button>

                    {/* Générer par IA */}
                    <button
                        type="button"
                        onClick={onGenerateImage}
                        disabled={loading}
                        className={`flex flex-col items-center gap-1.5 p-3 border-[3px] transition-all ${
                            loading
                                ? 'border-retro-muted/20 opacity-50'
                                : 'border-retro-primary bg-retro-primary/[0.05] hover:bg-retro-primary/[0.12]'
                        }`}
                    >
                        {loading ? (
                            <span className="animate-spin text-xl">⏳</span>
                        ) : (
                            <span className="text-xl">🤖</span>
                        )}
                        <span className="text-xxs font-righteous text-retro-primary uppercase">
                            Générer
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-xxs font-righteous text-retro-accent">
                            <PiCoinsFill /> {TOKEN_COSTS.imageGenerate}
                        </span>
                    </button>

                    {/* Pas d'image */}
                    <button
                        type="button"
                        onClick={onContinue}
                        className="flex flex-col items-center gap-1.5 p-3 border-[3px] border-retro-muted/20 bg-retro-surface/50 hover:bg-retro-muted/[0.08] transition-all"
                    >
                        <span className="text-xl">⏭️</span>
                        <span className="text-xxs font-righteous text-retro-muted uppercase">
                            Passer
                        </span>
                        <span className="text-xxs font-righteous text-retro-success">
                            Gratuit
                        </span>
                    </button>
                </div>
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
