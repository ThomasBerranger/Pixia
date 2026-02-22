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

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex flex-col py-10 px-[10px] sm:p-6">
            <div className="card-retro w-full">
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(URLS.ME_GAMES_GENERATED)}
                        className="btn-ghost px-3 py-1.5 text-sm flex items-center gap-1"
                    >
                        <IoArrowBack />
                        Mes parties
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/2 flex justify-center">
                        {game.image ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                alt="AI created image"
                                className="w-full object-contain"
                            />
                        ) : (
                            <CiImageOff className="text-retro-muted text-6xl my-6" />
                        )}
                    </div>

                    <div className="sm:w-1/2 space-y-4 flex flex-col justify-evenly">
                        <div>
                            <p className="label-retro">Solution</p>
                            <p className="font-righteous text-white">
                                {game.solution}
                            </p>
                        </div>

                        <div>
                            <p className="label-retro">Date</p>
                            <p className="font-righteous text-white">
                                {format(parseISO(game.date), 'd MMMM yyyy', {
                                    locale: fr,
                                })}
                            </p>
                        </div>

                        <div>
                            <p className="label-retro">Statistiques</p>
                            <p className="font-righteous text-white">
                                Prochainement
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Detail;
