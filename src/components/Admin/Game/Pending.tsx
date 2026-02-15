import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi.tsx';
import { useModal } from '../../../hooks/useModal.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { URLS } from '../../../constants/routes.ts';
import { CgSpinner } from 'react-icons/cg';
import { CiImageOff } from 'react-icons/ci';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { GameType } from '../../../types/Game/gameType.ts';
import type { ModalAction } from '../../../contexts/modalContext.tsx';

function Pending() {
    const { apiCall } = useApi();
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [games, setGames] = useState<GameType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const data: GameType[] = await apiCall(
                    `${ENDPOINTS.ADMIN_GAMES_INDEX}?status=PENDING`
                );

                setGames(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall]);

    const gamesByMonth = useMemo(() => {
        const grouped = new Map<string, GameType[]>();

        for (const game of games) {
            const monthKey = format(parseISO(game.date), 'yyyy-MM');

            if (!grouped.has(monthKey)) {
                grouped.set(monthKey, []);
            }

            grouped.get(monthKey)!.push(game);
        }

        return new Map(
            [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]))
        );
    }, [games]);

    const handleCardClick = (game: GameType) => {
        const actions: ModalAction[] = [
            {
                label: 'Annuler',
                onClick: closeModal,
                variant: 'ghost',
            },
            {
                label: "J'accepte",
                onClick: async () => {
                    await apiCall(ENDPOINTS.ADMIN_GAME_UPDATE(game.id), {
                        method: 'PATCH',
                        body: JSON.stringify({ assignToMe: true }),
                    });

                    closeModal();
                    navigate(URLS.ADMIN_GAME_EDIT(game.id));
                },
                variant: 'primary',
            },
        ];

        openModal(
            'Devenir superviseur',
            <div className="text-white font-righteous">
                <p className="mb-4">
                    En acceptant, tu deviens le{' '}
                    <span className="text-retro-accent">seul superviseur</span>{' '}
                    de ce Pixia.
                </p>
                <p className="mb-4">
                    Tu seras responsable de valider ou refuser cette
                    contribution. Prends le temps de bien vérifier l'image et
                    les films proposés avant de prendre ta décision.
                </p>
                <p className="text-retro-muted text-sm">
                    Pixia du{' '}
                    {format(parseISO(game.date), 'd MMMM yyyy', {
                        locale: fr,
                    })}{' '}
                    — par {game.author.username}
                </p>
            </div>,
            actions
        );
    };

    return (
        <article className="min-h-[89vh] py-10 px-[7vw]">
            <section className="flex justify-between items-center">
                <h2 className="font-title text-retro-accent text-4xl">
                    En attente
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-4xl" />
                    ) : (
                        <>
                            <p className="font-title text-4xl -mb-1.5">
                                {games.length}
                            </p>
                            <p className="font-righteous text-sm text-retro-muted">
                                en attente
                            </p>
                        </>
                    )}
                </div>
            </section>

            {[...gamesByMonth.entries()].map(([monthKey, monthGames]) => (
                <section key={monthKey} className="mt-6 sm:mt-10">
                    <h3 className="font-title text-retro-primary text-2xl capitalize mb-4">
                        {format(parseISO(`${monthKey}-01`), 'MMMM yyyy', {
                            locale: fr,
                        })}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        {monthGames.map((game) => (
                            <button
                                key={game.id}
                                type="button"
                                onClick={() => handleCardClick(game)}
                                className="flex flex-col p-6 card-primary-hover text-left"
                            >
                                <div className="flex justify-between items-center gap-2 font-righteous">
                                    <p className="text-retro-muted text-sm">
                                        {format(parseISO(game.date), 'd MMMM', {
                                            locale: fr,
                                        })}
                                    </p>
                                </div>

                                <div className="flex h-full justify-center items-center">
                                    {game.image ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                            alt="AI created image"
                                            className="h-full object-contain rounded-md mt-1.5"
                                        />
                                    ) : (
                                        <CiImageOff className="text-retro-muted text-4xl my-3" />
                                    )}
                                </div>

                                <div className="mt-auto pt-2 flex items-center gap-2">
                                    <img
                                        src={
                                            game.author.avatarUrl ??
                                            `${import.meta.env.VITE_DICE_URL}${game.author.username}`
                                        }
                                        alt="Avatar"
                                        className="h-8 rounded-full"
                                    />
                                    <p className="font-righteous text-sm text-retro-muted truncate">
                                        {game.author.username}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            ))}
        </article>
    );
}

export default Pending;
