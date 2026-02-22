import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameForm } from '../hooks/useGameForm.ts';
import { URLS } from '../constants/routes.ts';
import { CREATE_STEPS } from '../constants/gameForm.ts';
import Stepper from '../components/Game/Form/Stepper.tsx';
import AccordionItem from '../components/Game/Form/AccordionItem.tsx';
import LoadingOverlay from '../components/Game/Form/LoadingOverlay.tsx';
import StepIdea from '../components/Game/Form/Steps/StepIdea.tsx';
import StepImage from '../components/Game/Form/Steps/StepImage.tsx';
import StepSubmit from '../components/Game/Form/Steps/StepSubmit.tsx';

function GameForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        gameId,
        step,
        idea,
        setIdea,
        loading,
        gameData,
        imageUrl,
        submitted,
        rejectionData,
        canAnalyze,
        tokensRemaining,
        analyzeIdea,
        loadGame,
        patchGame,
        updateGameData,
        generateImage,
        uploadImage,
        skipImage,
        submitForReview,
        goToStep,
    } = useGameForm();

    useEffect(() => {
        if (id) {
            loadGame(id);
        }
    }, [id, loadGame]);

    useEffect(() => {
        if (gameId && !id) {
            navigate(URLS.ME_GAME_FORM(gameId), { replace: true });
        }
    }, [gameId, id, navigate]);

    const handleReset = () => {
        navigate(URLS.ME_GAME_NEW, { replace: true });
    };

    return (
        <article className="min-h-[89vh] sm:py-2 px-[7vw]">
            <section className="flex justify-between items-center">
                <h2 className="hidden sm:block font-title text-retro-accent text-4xl">
                    Génération
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right w-full sm:w-1/3">
                    <Stepper currentStep={step} />
                </div>
            </section>

            <div className="flex flex-col gap-2 mt-2 mb-6">
                {/* Étape 1 — Idée */}
                <AccordionItem
                    stepConfig={CREATE_STEPS[0]}
                    currentStep={step}
                    tokensRemaining={tokensRemaining}
                >
                    {loading && step === 1 ? (
                        <LoadingOverlay />
                    ) : (
                        <StepIdea
                            idea={idea}
                            setIdea={setIdea}
                            onSubmit={analyzeIdea}
                            canSubmit={canAnalyze}
                            loading={loading}
                            rejectionData={rejectionData}
                        />
                    )}
                </AccordionItem>

                {/* Étape 2 — Image */}
                <AccordionItem
                    stepConfig={CREATE_STEPS[1]}
                    currentStep={step}
                    tokensRemaining={tokensRemaining}
                >
                    {gameData &&
                        (loading && step === 2 ? (
                            <LoadingOverlay />
                        ) : (
                            <StepImage
                                gameData={gameData}
                                onUpdateGameData={updateGameData}
                                imageUrl={imageUrl}
                                loading={loading}
                                tokensRemaining={tokensRemaining}
                                onGenerateImage={generateImage}
                                onUploadImage={uploadImage}
                                onContinue={async () => {
                                    await patchGame();
                                    goToStep(3);
                                }}
                                onSkip={skipImage}
                            />
                        ))}
                </AccordionItem>

                {/* Étape 3 — Envoi */}
                <AccordionItem
                    stepConfig={CREATE_STEPS[2]}
                    currentStep={step}
                    tokensRemaining={tokensRemaining}
                    forceOpen={submitted}
                >
                    {gameData && (
                        <StepSubmit
                            gameData={gameData}
                            imageUrl={imageUrl}
                            onSubmit={submitForReview}
                            onBack={() => goToStep(2)}
                            onReset={handleReset}
                            submitted={submitted}
                        />
                    )}
                </AccordionItem>
            </div>
        </article>
    );
}

export default GameForm;
