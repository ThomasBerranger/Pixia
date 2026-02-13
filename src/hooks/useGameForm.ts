import { useCallback, useState } from 'react';
import { useAlert } from './useAlert.ts';
import { IDEA_MIN_LENGTH, TOKEN_COSTS } from '../constants/gameForm.ts';
import type {
    AiGeneratedData,
    DifficultyKey,
    StepId,
} from '../types/gameFormType.tsx';

export function useGameForm() {
    const { showAlert } = useAlert();

    const [step, setStep] = useState<StepId>(1);
    const [idea, setIdea] = useState('');
    const [difficulty, setDifficulty] = useState<DifficultyKey>('VICIEUX');
    const [loading, setLoading] = useState(false);
    const [gameData, setGameData] = useState<AiGeneratedData | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageGenerated, setImageGenerated] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // TODO: remplacer par le vrai solde utilisateur depuis l'API
    const userTokens = 1500;

    const canAnalyze = idea.trim().length >= IDEA_MIN_LENGTH;

    const tokensSpent = (() => {
        let cost = 0;
        if (step >= 2) cost += TOKEN_COSTS.analysis;
        if (imageUrl) cost += imageGenerated ? TOKEN_COSTS.imageGenerate : TOKEN_COSTS.imageUpload;
        if (step >= 3) cost += TOKEN_COSTS.submit;
        return cost;
    })();

    const tokensRemaining = userTokens - tokensSpent;

    // ── Step 1 → 2 : Analyse IA (300 jetons) ──

    const analyzeIdea = useCallback(async () => {
        if (!canAnalyze) return;

        setLoading(true);

        try {
            // MOCK: données fictives en attendant l'intégration API
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const response: AiGeneratedData = {
                prompt: `A surreal cinematic fusion of "${idea}", vibrant colors, detailed digital art`,
                solution: idea,
                englishSolution: idea,
                hint: 'Deux univers improbables se rencontrent...',
                estimatedDate: '15 mars',
                popularityScore: 78,
            };

            setGameData(response);
            setStep(2);
        } catch (error) {
            showAlert('Erreur', "L'analyse a échoué, réessaie.", 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [canAnalyze, idea, showAlert]);

    // ── Step 2 : Modifier les données générées ──

    const updateGameData = useCallback(
        (partial: Partial<AiGeneratedData>) => {
            setGameData((prev) => (prev ? { ...prev, ...partial } : prev));
        },
        []
    );

    // ── Step 2 : Générer image par IA (500 jetons) ──

    const generateImage = useCallback(async () => {
        if (!gameData?.prompt) return;

        setLoading(true);

        try {
            // MOCK: image placeholder en attendant l'intégration DALL·E
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setImageUrl('https://picsum.photos/1024/1024');
            setImageGenerated(true);
            setStep(3);
        } catch (error) {
            showAlert(
                'Erreur',
                "La génération d'image a échoué, réessaie.",
                'error'
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [gameData?.prompt, showAlert]);

    // ── Step 2 : Import image perso (gratuit) ──

    const uploadImage = useCallback(
        async (file: File) => {
            setLoading(true);

            try {
                // TEMP: preview locale en attendant le back
                const localUrl = URL.createObjectURL(file);
                setImageUrl(localUrl);
                setImageGenerated(false);
                setStep(3);
            } catch (error) {
                showAlert('Erreur', "L'import a échoué, réessaie.", 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [showAlert]
    );

    // ── Step 2 → 3 : Passer l'image ──

    const skipImage = useCallback(() => {
        setImageUrl(null);
        setImageGenerated(false);
        setStep(3);
    }, []);

    // ── Step 2 → 3 : Continuer vers l'envoi ──

    const goToSubmit = useCallback(() => {
        setStep(3);
    }, []);

    // ── Step 3 : Envoi en validation (irréversible) ──

    const submitForReview = useCallback(async () => {
        try {
            // TODO: await apiCall(ENDPOINTS.USER_GAME_SUBMIT, { ... });
            setSubmitted(true);
            setStep(4);
        } catch (error) {
            showAlert('Erreur', "L'envoi a échoué, réessaie.", 'error');
            console.error(error);
        }
    }, [showAlert]);

    // ── Navigation ──

    const goToStep = useCallback(
        (target: StepId) => {
            if (target < step) {
                if (target < 2) {
                    setImageUrl(null);
                    setImageGenerated(false);
                }
                setStep(target);
            }
        },
        [step]
    );

    const reset = useCallback(() => {
        setStep(1);
        setIdea('');
        setDifficulty('VICIEUX');
        setGameData(null);
        setImageUrl(null);
        setImageGenerated(false);
        setSubmitted(false);
    }, []);

    return {
        step,
        idea,
        setIdea,
        difficulty,
        setDifficulty,
        loading,
        gameData,
        imageUrl,
        imageGenerated,
        submitted,
        canAnalyze,
        tokensRemaining,
        analyzeIdea,
        updateGameData,
        generateImage,
        uploadImage,
        goToSubmit,
        skipImage,
        submitForReview,
        goToStep,
        reset,
    };
}
