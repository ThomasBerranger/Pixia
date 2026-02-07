import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContext.tsx';
import type { GameType } from '../../../types/Game/gameType.ts';
import type { AnswerResult } from '../../../types/answerResultType.ts';
import { CgSpinner } from 'react-icons/cg';
import { URLS } from '../../../constants/routes.ts';
import { useAlert } from '../../../hooks/useAlert.ts';
import { FaCheck } from 'react-icons/fa';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { useNavigate } from 'react-router-dom';
import { MdTipsAndUpdates } from 'react-icons/md';

function GameFooter({
    game,
    onAnswerSubmit,
    onHintRequest,
}: {
    game: GameType | undefined;
    onAnswerSubmit: (answer: string) => Promise<AnswerResult>;
    onHintRequest: (hint: string) => void;
}) {
    const { isAuthenticated } = useAuth();
    const { showAlert } = useAlert();
    const { apiCall } = useApi();
    const navigate = useNavigate();

    const [answer, setAnswer] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [displayError, setDisplayError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [isHintAsked, setIsHintAsked] = useState<boolean>(false);
    const [isHintLoading, setIsHintLoading] = useState<boolean>(false);

    useEffect(() => {
        setAnswer('');
        setIsHintAsked(false);
        setDisplayError(false);
        setErrorMessage(undefined);
    }, [game?.id]);

    async function handleSolutionRequest(e: React.FormEvent): Promise<void> {
        e.preventDefault();

        if (answer.length <= 5) {
            showErrorBriefly();
            return;
        }

        setLoading(true);

        try {
            const response: AnswerResult = await onAnswerSubmit(answer);

            if (response.success) {
                setAnswer('');

                if (!isAuthenticated) {
                    showAlert(
                        'Réponse non enregistrée',
                        'Clique ici pour te créer un compte et sauvegarder tes parties.',
                        'warning',
                        5000,
                        URLS.ME
                    );
                }
            } else {
                if (response.rateLimited) {
                    setErrorMessage(response.errorMessage);
                } else {
                    setErrorMessage('');
                }

                showErrorBriefly();
            }
        } catch (error) {
            console.error('Erreur: ', error);
            showErrorBriefly();
        } finally {
            setLoading(false);
        }
    }

    const showErrorBriefly = () => {
        setDisplayError(true);
        setTimeout(() => setDisplayError(false), 500);
    };

    const hintRequest = async () => {
        if (!game || game.hint) {
            return;
        }

        if (isAuthenticated && isHintAsked) {
            setIsHintLoading(true);
            setIsHintAsked(false);

            try {
                const hint = await apiCall(ENDPOINTS.GAME_HINT(game.id));

                onHintRequest(hint);
            } catch (error) {
                console.log(error);
            } finally {
                setIsHintLoading(false);
            }

            return;
        } else if (isHintAsked) {
            navigate(URLS.ME);
        }

        setIsHintAsked(true);
    };

    return (
        <div className="mb-10 md:mb-0 md:h-[20%] flex items-center">
            {game && game.solution ? (
                <div
                    className="w-full py-8 px-6 md:p-6 bg-retro-surface border-[6px] border-retro-secondary
                    rounded-lg text-center relative animate-[border-flicker_4s_infinite]
                    before:absolute before:inset-[10px] before:border-2 before:border-retro-accent before:rounded-sm before:opacity-50"
                >
                    <div className="text-sm md:text-2xl text-retro-accent font-righteous uppercase tracking-[2px]">
                        {game.solution}
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col gap-2">
                    {(isHintLoading || game?.hint || isHintAsked) && (
                        <p className="sm:max-w-[60vw] text-sm md:text-base pl-2 border-l-4 border-retro-primary">
                            {isHintLoading ? (
                                <CgSpinner className="animate-spin" size={20} />
                            ) : game?.hint ? (
                                game.hint
                            ) : isHintAsked ? (
                                isAuthenticated ? (
                                    '⚠️ Demander un indice diminue le nombre de points gagnés.'
                                ) : (
                                    '⚠️ Connecte-toi pour obtenir un indice.'
                                )
                            ) : null}
                        </p>
                    )}
                    <form
                        onSubmit={handleSolutionRequest}
                        className="w-full grid grid-cols-3 sm:grid-cols-12 gap-4 items-stretch"
                    >
                        <button
                            type="button"
                            className="btn-neon py-2 sm:py-0 order-2 sm:order-1 sm:col-span-2"
                            onClick={() => hintRequest()}
                        >
                            {isHintAsked && !game?.hint ? (
                                <FaCheck size={18} className="mx-auto" />
                            ) : (
                                <MdTipsAndUpdates
                                    size={18}
                                    className="mx-auto"
                                />
                            )}
                        </button>
                        <div className="col-span-full sm:col-span-7 order-1">
                            <input
                                type="text"
                                placeholder="Exemple : Titanic et Inception"
                                autoComplete="off"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className={`w-full input-retro-primary text-center text-lg 
                            ${displayError && 'shake !border-retro-primary'}`}
                            />

                            {errorMessage && (
                                <p className="text-sm">{errorMessage}</p>
                            )}
                        </div>

                        <button
                            disabled={isLoading}
                            className="btn-primary py-1.5 sm:py-2.5 w-full flex justify-center col-span-2 sm:col-span-3 order-3"
                        >
                            {isLoading ? (
                                <CgSpinner className="animate-spin" />
                            ) : (
                                'Trouvé !'
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default GameFooter;
