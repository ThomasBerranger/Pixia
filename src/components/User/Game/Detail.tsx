import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { URLS } from '../../../constants/routes.ts';
import type { GameType } from '../../../types/Game/gameType.ts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CgSpinner } from 'react-icons/cg';
import { IoArrowBack } from 'react-icons/io5';
import { CiImageOff } from 'react-icons/ci';
import { GiCrossedSwords } from 'react-icons/gi';
import { toDateKey } from '../../../utils/date.ts';

function Detail() {
    const { id } = useParams<{ id: string }>();
    const { apiCall } = useApi();
    const navigate = useNavigate();

    const [game, setGame] = useState<GameType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const data: GameType = await apiCall(
                    ENDPOINTS.ME_GAME_SHOW(id)
                );
                setGame(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, apiCall]);

    if (isLoading) {
        return (
            <section className="min-h-[90vh] flex items-center justify-center">
                <CgSpinner className="animate-spin text-retro-primary text-4xl" />
            </section>
        );
    }

    if (!game) return null;

    const handleChallenge = async () => {
        const challengeUrl = `${import.meta.env.VITE_URL}${URLS.GAME_BY_DATE(toDateKey(game.date))}`;

        try {
            await navigator.share({
                title: 'Essaye de trouver mon Pixia !',
                text: 'Es-tu capable de deviner mon Pixia ?',
                url: challengeUrl,
            });
        } catch (error) {
            console.error(error);
            await navigator.clipboard.writeText(challengeUrl);
        }
    };

    const winnerCount = game.winnerCount ?? 0;
    const attempts = game.attempts ?? 0;

    return (
        <article className="min-h-[89vh] py-10 px-[7vw]">
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => navigate(URLS.ME_GAMES_GENERATED)}
                    className="btn-ghost px-3 py-1.5 text-sm inline-flex items-center gap-1"
                >
                    <IoArrowBack />
                    Mes parties
                </button>
                <button
                    type="button"
                    onClick={handleChallenge}
                    className="btn-primary text-sm flex justify-center items-center gap-2 p-2.5"
                >
                    <GiCrossedSwords className="text-xl" />
                    <span className="font-righteous">Défier un ami</span>
                </button>
            </div>

            <section className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                <div className="flex justify-center items-start">
                    {game.image ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL}${game.image}`}
                            alt={game.solution ?? 'Pixia'}
                            className="w-full object-contain border-[3px] border-retro-primary shadow-[6px_6px_0] shadow-retro-secondary"
                        />
                    ) : (
                        <div className="w-full aspect-square flex items-center justify-center border-[3px] border-dashed border-retro-muted">
                            <CiImageOff className="text-retro-muted text-6xl" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="font-title text-retro-accent text-2xl sm:text-3xl leading-tight">
                        {format(parseISO(game.date), 'd MMMM yyyy', {
                            locale: fr,
                        })}
                    </h2>

                    <div>
                        <p className="label-retro">Solution</p>
                        <p className="text-base sm:text-xl text-white font-righteous uppercase tracking-[2px] break-words">
                            {game.solution ?? '—'}
                        </p>
                    </div>

                    <div className="font-righteous">
                        <p className="label-retro">Statistiques</p>
                        <p className="text-sm md:text-base text-white">
                            {attempts === 0 ? (
                                "Aucune tentative pour l'instant"
                            ) : winnerCount === 0 ? (
                                <>
                                    Personne n'a encore trouvé la solution en{' '}
                                    <span className="text-retro-primary text-lg">
                                        {attempts}
                                    </span>{' '}
                                    tentative{attempts > 1 ? 's' : ''}
                                </>
                            ) : (
                                <>
                                    <span className="text-retro-primary text-lg">
                                        {winnerCount}
                                    </span>{' '}
                                    joueur{winnerCount > 1 ? 's' : ''}{' '}
                                    {winnerCount > 1 ? 'ont' : 'a'} trouvé la
                                    solution en{' '}
                                    <span className="text-retro-primary text-lg">
                                        {attempts}
                                    </span>{' '}
                                    tentative{attempts > 1 ? 's' : ''}
                                </>
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="label-retro">Difficulté</p>
                        <p className="text-sm text-white font-righteous first-letter:uppercase lowercase">
                            Niveau {game.difficulty}
                        </p>
                    </div>

                    {game.hint && (
                        <div>
                            <p className="label-retro">Indice</p>
                            <p className="text-sm md:text-base pl-2 border-l-4 border-retro-primary italic text-retro-text">
                                « {game.hint} »
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </article>
    );
}

export default Detail;
