import { useCallback, useState } from 'react';
import { useApi } from './useApi.tsx';
import { useAlert } from './useAlert.ts';
import { ENDPOINTS } from '../constants/endpoints.ts';
import { IDEA_MIN_LENGTH, TOKEN_COSTS } from '../constants/gameForm.ts';
import type { AiGeneratedData, StepId } from '../types/gameFormType.tsx';
import { GAME_STATUSES } from '../types/Game/gameStatuses.ts';

const toImageUrl = (path: string): string =>
    `${import.meta.env.VITE_API_URL}${path}`;

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

    // ── PATCH helper (sauvegarde silencieuse) ──

    const patchGame = useCallback(
        async (data: Record<string, unknown> = {}) => {
            if (!gameId || !gameData) return;

            return await apiCall(ENDPOINTS.ME_GAME_UPDATE(gameId), {
                method: 'PATCH',
                body: JSON.stringify({
                    solution: gameData.solution,
                    hint: gameData.hint,
                    ...data,
                }),
            });
        },
        [gameId, gameData, apiCall]
    );

    // ── Step 2 : Import image perso ──

    const uploadImage = useCallback(
        async (file: File) => {
            if (!gameId || !gameData) return;

            setLoading(true);

            try {
                const formData = new FormData();
                formData.append('image', file);

                const { image } = await apiCall(
                    ENDPOINTS.ME_GAME_IMAGE_UPLOAD(gameId),
                    { method: 'POST', body: formData },
                    false
                );

                const updated = await patchGame({ image });
                setImageUrl(toImageUrl(updated.image));
                setStep(3);
            } catch (error) {
                showAlert('Erreur', "L'import a échoué, réessaie.", 'error');
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        [gameId, gameData, apiCall, patchGame, showAlert]
    );

    // ── Step 2 : Génération IA ──

    const generateImage = useCallback(async () => {
        if (!gameId || !gameData) return;

        setLoading(true);

        try {
            let prompt = gameData.prompt;

            if (!prompt) {
                // TODO: remplacer par l'appel IA réel
                // const content = await apiCall(
                //     ENDPOINTS.OPEN_AI_GENERATE_CONTENT,
                //     {
                //         method: 'POST',
                //         body: JSON.stringify({ solution: gameData.solution }),
                //     }
                // );
                // prompt = content.prompt;
                await new Promise((r) => setTimeout(r, 500));
                prompt = `A cinematic scene inspired by ${gameData.solution}`;
                setGameData((prev) =>
                    prev ? { ...prev, prompt } : prev
                );
            }

            // TODO: remplacer par l'appel IA réel
            // const imageUrl = await apiCall(ENDPOINTS.OPEN_AI_GENERATE_IMAGE, {
            //     method: 'POST',
            //     body: JSON.stringify({ prompt }),
            // });
            await new Promise((r) => setTimeout(r, 1500));
            const imageUrl = `https://picsum.photos/seed/${gameId}/1024/576`;

            const updated = await patchGame({ imageUrl });
            setImageUrl(toImageUrl(updated.image));
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
    }, [gameId, gameData, patchGame, showAlert]);

    // ── Step 2 → 3 : Passer l'image ──

    const skipImage = useCallback(async () => {
        if (gameId && imageUrl) {
            try {
                await apiCall(
                    ENDPOINTS.ME_GAME_IMAGE_UPLOAD(gameId),
                    { method: 'DELETE' }
                );
            } catch (error) {
                showAlert('Erreur', "La suppression de l'image a échoué.", 'error');
                console.error(error);
                return;
            }
        }
        setImageUrl(null);
        setStep(3);
    }, [gameId, imageUrl, apiCall, showAlert]);

    // ── Step 3 : Envoi en validation (irréversible) ──

    const submitForReview = useCallback(async () => {
        try {
            await patchGame({ status: GAME_STATUSES.PENDING });
            setSubmitted(true);
            setStep(4);
        } catch (error) {
            showAlert('Erreur', "L'envoi a échoué, réessaie.", 'error');
            console.error(error);
        }
    }, [patchGame, showAlert]);

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
                if (image) {
                    setImageUrl(toImageUrl(image));
                    setStep(3);
                } else {
                    setStep(2);
                }
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
        patchGame,
        generateImage,
        uploadImage,
        skipImage,
        submitForReview,
        goToStep,
        reset,
    };
}
