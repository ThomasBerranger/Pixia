import { useCallback, useState } from 'react';
import { useApi } from './useApi.tsx';
import { useAlert } from './useAlert.ts';
import { ENDPOINTS } from '../constants/endpoints.ts';
import { IDEA_MIN_LENGTH, TOKEN_COSTS } from '../constants/gameForm.ts';
import type { AiGeneratedData, StepId } from '../types/gameFormType.tsx';

export function useGameForm() {
    const { apiCall } = useApi();
    const { showAlert } = useAlert();

    const [step, setStep] = useState<StepId>(1);
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [gameData, setGameData] = useState<AiGeneratedData | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [lastPopularityScore, setLastPopularityScore] = useState<
        number | null
    >(null);

    // TODO: remplacer par le vrai solde utilisateur depuis l'API
    const userTokens = 1500;

    const canAnalyze = idea.trim().length >= IDEA_MIN_LENGTH;

    const tokensSpent = (() => {
        let cost = 0;
        if (step >= 2) cost += TOKEN_COSTS.analysis;
        if (imageUrl) cost += TOKEN_COSTS.imageUpload;
        if (step >= 3) cost += TOKEN_COSTS.submit;
        return cost;
    })();

    const tokensRemaining = userTokens - tokensSpent;

    const analyzeIdea = useCallback(async () => {
        if (!canAnalyze) return;

        setLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.ME_GAME_CREATE, {
                method: 'POST',
                body: JSON.stringify({ idea }),
            });

            setLastPopularityScore(response.popularityScore);

            if (!response.game) {
                return;
            }

            const { id, date, ...game } = response.game;

            setGameId(id);
            setGameData({
                ...game,
                estimatedDate: date,
                prompt: response.prompt,
                popularityScore: response.popularityScore,
            });
            setStep(2);
        } catch (error) {
            showAlert('Erreur', "L'analyse a échoué, réessaie.", 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [canAnalyze, idea, apiCall, showAlert]);

    const updateGameData = useCallback((partial: Partial<AiGeneratedData>) => {
        setGameData((prev) => (prev ? { ...prev, ...partial } : prev));
    }, []);

    const generateImage = useCallback(async () => {
        if (!gameData?.prompt) return;

        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setImageUrl('https://picsum.photos/1024/1024');
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

    // ── Chargement d'une game existante ──

    const loadGame = useCallback(
        async (id: string) => {
            setLoading(true);

            try {
                const response = await apiCall(ENDPOINTS.ME_GAME_SHOW(id));

                const { date, prompt, popularityScore, image, idea: savedIdea, ...game } = response;

                setGameId(id);
                setIdea(savedIdea ?? '');
                setGameData({
                    ...game,
                    estimatedDate: date,
                    prompt,
                    popularityScore,
                });
                if (image) setImageUrl(image);
                setStep(2);
            } catch (error) {
                showAlert('Erreur', 'Impossible de charger la partie.', 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [apiCall, showAlert]
    );

    // ── Navigation ──

    const goToStep = useCallback(
        (target: StepId) => {
            if (target < step && target < 2) {
                setImageUrl(null);
            }
            setStep(target);
        },
        [step]
    );

    const reset = useCallback(() => {
        setStep(1);
        setIdea('');
        setLastPopularityScore(null);
        setGameId(null);
        setGameData(null);
        setImageUrl(null);
        setSubmitted(false);
    }, []);

    return {
        gameId,
        step,
        idea,
        setIdea,
        loading,
        gameData,
        imageUrl,
        submitted,
        lastPopularityScore,
        canAnalyze,
        tokensRemaining,
        analyzeIdea,
        loadGame,
        updateGameData,
        generateImage,
        uploadImage,
        skipImage,
        submitForReview,
        goToStep,
        reset,
    };
}
