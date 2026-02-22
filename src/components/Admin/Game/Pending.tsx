import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useApi } from '../../../hooks/useApi.tsx';
import { useModal } from '../../../hooks/useModal.tsx';
import { useAuth } from '../../../contexts/authContext.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { URLS } from '../../../constants/routes.ts';
import { CgSpinner } from 'react-icons/cg';
import { CiImageOff } from 'react-icons/ci';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { GameType } from '../../../types/Game/gameType.ts';
import type { JWTPayloadType } from '../../../types/JWTPayloadType.ts';
import type { ModalAction } from '../../../contexts/modalContext.tsx';
import { PiCalendarDots } from 'react-icons/pi';
import { IoArrowBack } from 'react-icons/io5';

function Pending() {
    const { apiCall } = useApi();
    const { openModal, closeModal } = useModal();
    const { token } = useAuth();
    const navigate = useNavigate();

    const currentUsername = token
        ? jwtDecode<JWTPayloadType>(token).username
        : null;

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
            <section>
                <div className="flex justify-between items-center">
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
                </div>

                <Link
                    to={URLS.ADMIN}
                    className="btn-ghost px-3 py-1.5 text-sm inline-flex items-center gap-1 mt-2"
                >
                    <IoArrowBack />
                    Retour au studio
                </Link>
            </section>

            {[...gamesByMonth.entries()].map(([monthKey, monthGames]) => (
                <section key={monthKey} className="mt-6">
                    <h3 className="font-title text-retro-primary text-2xl capitalize mb-4">
                        {format(parseISO(`${monthKey}-01`), 'MMMM yyyy', {
                            locale: fr,
                        })}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                        {monthGames.map((game) => {
                            const hasSupervisor = !!game.supervisor;
                            const isMySupervision =
                                game.supervisor?.username === currentUsername;

                            const cardContent = (
                                <>
                                    <div className="flex justify-between items-center gap-2 font-righteous">
                                        <p className="text-retro-muted text-sm flex truncate">
                                            <PiCalendarDots className="text-lg mr-1" />
                                            {format(
                                                parseISO(game.date),
                                                'd MMMM',
                                                { locale: fr }
                                            )}
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

                                    <div className="mt-auto pt-2 flex flex-col sm:flex-row justify-between gap-1.5">
                                        <div className="flex items-center gap-0.5 sm:gap-2">
                                            <img
                                                src={
                                                    game.author.avatarUrl ??
                                                    `${import.meta.env.VITE_DICE_URL}${game.author.username}`
                                                }
                                                alt="Avatar"
                                                className="h-8 rounded-full"
                                            />
                                            <p className="font-righteous text-xs sm:text-sm text-retro-muted truncate">
                                                {game.author.username}
                                            </p>
                                        </div>

                                        {game.supervisor && (
                                            <div className="flex items-center gap-0.5 sm:gap-2">
                                                <img
                                                    src={
                                                        game.supervisor
                                                            .avatarUrl ??
                                                        `${import.meta.env.VITE_DICE_URL}${game.supervisor.username}`
                                                    }
                                                    alt="Avatar"
                                                    className="h-8 rounded-full"
                                                />
                                                <p className="font-righteous text-xs sm:text-sm text-retro-accent truncate">
                                                    {game.supervisor.username}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            );

                            if (!hasSupervisor) {
                                return (
                                    <button
                                        key={game.id}
                                        type="button"
                                        onClick={() => handleCardClick(game)}
                                        className="flex flex-col p-6 card-primary-hover text-left"
                                    >
                                        {cardContent}
                                    </button>
                                );
                            }

                            if (isMySupervision) {
                                return (
                                    <Link
                                        key={game.id}
                                        to={URLS.ADMIN_GAME_EDIT(game.id)}
                                        className="flex flex-col p-6 card-primary-hover text-left"
                                    >
                                        {cardContent}
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={game.id}
                                    className="flex flex-col p-6 card-retro cursor-default text-left"
                                >
                                    {cardContent}
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </article>
    );
}

export default Pending;
