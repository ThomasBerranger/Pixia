import { useCallback, useEffect, useState } from 'react';
import { useApi } from './useApi.tsx';
import { useAlert } from './useAlert.ts';
import { ENDPOINTS } from '../constants/endpoints.ts';
import { IDEA_MIN_LENGTH } from '../constants/gameForm.ts';
import type {
    AiGeneratedData,
    RejectionData,
    StepId,
} from '../types/gameFormType.tsx';
import { GAME_STATUSES } from '../types/Game/gameStatuses.ts';

export interface GameFormState {
    gameId?: string;
    idea?: string;
    gameData?: AiGeneratedData;
    imageUrl?: string | null;
    step?: StepId;
}

const toImageUrl = (path: string): string =>
    `${import.meta.env.VITE_API_URL}${path}`;

export function useGameForm(initialState?: GameFormState) {
    const { apiCall } = useApi();
    const { showAlert } = useAlert();

    const [step, setStep] = useState<StepId>(initialState?.step ?? 1);
    const [idea, setIdea] = useState(initialState?.idea ?? '');
    const [loading, setLoading] = useState(false);
    const [gameData, setGameData] = useState<AiGeneratedData | null>(
        initialState?.gameData ?? null
    );
    const [imageUrl, setImageUrl] = useState<string | null>(
        initialState?.imageUrl ?? null
    );
    const [gameId, setGameId] = useState<string | null>(
        initialState?.gameId ?? null
    );
    const [submitted, setSubmitted] = useState(false);
    const [rejectionData, setRejectionData] = useState<RejectionData | null>(
        null
    );

    const [userTokens, setUserTokens] = useState<number>(0);

    useEffect(() => {
        apiCall(ENDPOINTS.ME_TOKENS)
            .then(({ tokens }) => setUserTokens(tokens))
            .catch(console.error);
    }, [apiCall]);

    const canAnalyze = idea.trim().length >= IDEA_MIN_LENGTH;

    const analyzeIdea = useCallback(async () => {
        if (!canAnalyze) return;

        setLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.ME_GAME_CREATE, {
                method: 'POST',
                body: JSON.stringify({ idea }),
            });

            if (response.tokens !== undefined) setUserTokens(response.tokens);

            if (!response.game) {
                setRejectionData({
                    films: response.films,
                    message: response.message,
                    notorietyScore: response.notorietyScore,
                });
                return;
            }

            setRejectionData(null);

            const { id, date, ...game } = response.game;

            setGameId(id);
            setGameData({
                ...game,
                estimatedDate: date,
                prompt: response.image_prompt,
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

            const response = await apiCall(ENDPOINTS.ME_GAME_UPDATE(gameId), {
                method: 'PATCH',
                body: JSON.stringify({
                    solution: gameData.solution,
                    hint: gameData.hint,
                    ...data,
                }),
            });

            if (response.tokens !== undefined) setUserTokens(response.tokens);

            return response.game;
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
            const body: Record<string, string> = gameData.prompt
                ? { prompt: gameData.prompt }
                : { solution: gameData.solution };

            await apiCall(ENDPOINTS.ME_GAME_GENERATE_IMAGE(gameId), {
                method: 'POST',
                body: JSON.stringify(body),
            });

            const updated = await patchGame();
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
    }, [gameId, gameData, apiCall, patchGame, showAlert]);

    // ── Step 2 → 3 : Passer l'image ──

    const skipImage = useCallback(async () => {
        try {
            if (gameId && imageUrl) {
                await apiCall(ENDPOINTS.ME_GAME_IMAGE_UPLOAD(gameId), {
                    method: 'DELETE',
                });
            }
            setImageUrl(null);
            await patchGame();
            setStep(3);
        } catch (error) {
            showAlert('Erreur', 'La sauvegarde a échoué, réessaie.', 'error');
            console.error(error);
        }
    }, [gameId, imageUrl, apiCall, patchGame, showAlert]);

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

                const {
                    date,
                    prompt,
                    image,
                    idea: savedIdea,
                    ...game
                } = response;

                setGameId(id);
                setIdea(savedIdea ?? '');
                setGameData({
                    ...game,
                    estimatedDate: date,
                    prompt,
                });
                if (image) {
                    setImageUrl(toImageUrl(image));
                    setStep(3);
                } else {
                    setStep(2);
                }
            } catch (error) {
                showAlert(
                    'Erreur',
                    'Impossible de charger la partie.',
                    'error'
                );
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
        setRejectionData(null);
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
        rejectionData,
        canAnalyze,
        tokensRemaining: userTokens,
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
