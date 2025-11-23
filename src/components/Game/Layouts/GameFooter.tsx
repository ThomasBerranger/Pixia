import React, {useEffect, useState} from 'react';
import {useAuth} from '../../../contexts/authContext.tsx';
import type {GameType} from '../../../types/Game/gameType.ts';
import type {AnswerResult} from '../../../types/answerResultType.ts';
import {CgSpinner} from 'react-icons/cg';
import {ROUTES} from '../../../constants/routes.ts';
import {useAlert} from '../../../contexts/useAlert.ts';
import {FaCheck, FaQuestion} from 'react-icons/fa';
import {useApi} from '../../../hooks/useApi.tsx';
import {ENDPOINTS} from '../../../constants/endpoints.ts';
import {useNavigate} from 'react-router-dom';

function GameFooter({
                        game,
                        onAnswerSubmit,
                        onHintRequest,
                    }: {
    game: GameType | undefined;
    onAnswerSubmit: (answer: string) => Promise<AnswerResult>;
    onHintRequest: (hint: string) => void;
}) {
    const {isAuthenticated} = useAuth();
    const {showAlert} = useAlert();
    const {apiCall} = useApi();
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
                        ROUTES.USER
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
            navigate(ROUTES.USER);
        }

        setIsHintAsked(true);
    };

    return (
        <>
            {game && game.solution ? (
                <div
                    className="max-w-3xl mx-auto p-8 bg-retro-surface border-[6px] border-retro-secondary
                    rounded-lg text-center relative animate-[border-flicker_4s_infinite]
                    before:absolute before:inset-[10px] before:border-2 before:border-retro-accent before:opacity-50"
                >
                    <div className="text-[0.7rem] sm:text-xs text-retro-muted uppercase tracking-[2px] mb-2">
                        Bravo !
                    </div>
                    <div
                        className="text-sm sm:text-md sm:text-2xl text-retro-accent font-righteous uppercase tracking-[3px]">
                        {game.solution}
                    </div>
                </div>
            ) : (
                <>
                    {(isHintLoading || game?.hint || isHintAsked) && (
                        <div className="max-w-3xl mx-auto w-full my-4 pl-2 border-l-4 border-retro-primary">
                            <p>
                                {isHintLoading ? (
                                    <CgSpinner className="animate-spin" size={20} />
                                ) : game?.hint ? (
                                    game.hint
                                ) : isHintAsked ? (
                                    isAuthenticated
                                        ? '⚠️ Demander un indice diminue le nombre de points gagnés.'
                                        : '⚠️ Connecte-toi pour obtenir un indice.'
                                ) : null}
                            </p>
                        </div>
                    )}
                    <form
                        onSubmit={handleSolutionRequest}
                        className="max-w-3xl mx-auto w-full grid grid-cols-3 sm:grid-cols-12 gap-4 items-stretch"
                    >
                        <button
                            type="button"
                            className="btn-neon py-2 sm:py-0 order-2 sm:order-1"
                            onClick={() => hintRequest()}
                        >
                            {isHintAsked && !game?.hint ? (
                                <FaCheck size={18} className="mx-auto"/>
                            ) : (
                                <FaQuestion size={18} className="mx-auto"/>
                            )}
                        </button>
                        <div className="col-span-full sm:col-span-8 order-1">
                            <input
                                type="text"
                                placeholder="Titanic et Inception"
                                autoComplete="off"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className={`flex-1 w-full text-lg pl-2.5 py-2 bg-retro-surface/80 border-[3px] 
                            border-retro-primary text-retro-text outline-none transition-all duration-300 
                            shadow-[0_0_20px_rgba(255,0,110,0.3)] focus:border-retro-accent
                            focus:shadow-[0_0_40px_rgba(255,190,11,0.5)] placeholder:text-retro-muted 
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
                                <CgSpinner className="animate-spin" size={20}/>
                            ) : (
                                <>Vérifier</>
                            )}
                        </button>
                    </form>
                </>
            )}
        </>
    );
}

export default GameFooter;
