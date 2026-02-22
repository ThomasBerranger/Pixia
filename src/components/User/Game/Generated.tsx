import { useApi } from '../../../hooks/useApi.tsx';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { CgSpinner } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import { ProgressBar } from '../../../atoms/ProgressBar.tsx';
import { PiCoinsFill } from 'react-icons/pi';
import { BiSolidRightArrow } from 'react-icons/bi';
import type { GameType } from '../../../types/Game/gameType.ts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    GAME_STATUS_CONFIG,
    GAME_STATUSES,
} from '../../../types/Game/gameStatuses.ts';
import { CiImageOff } from 'react-icons/ci';

function List() {
    const { apiCall } = useApi();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userGeneratedGames, setUserGeneratedGames] = useState<
        GameType[] | null
    >(null);
    const [tokens, setTokens] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const { games, tokens } = (await apiCall(
                    ENDPOINTS.ME_GAMES_GENERATED
                )) as { games: GameType[]; tokens: number };

                setUserGeneratedGames(games);
                setTokens(tokens);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall]);

    return (
        <article className="min-h-[89vh] py-10 px-[7vw]">
            <section className="flex justify-between items-center">
                <h2 className="font-title text-retro-accent text-4xl">
                    Mes parties
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-4xl" />
                    ) : (
                        <>
                            <p className="font-title text-4xl -mb-1.5">
                                {userGeneratedGames?.length}
                            </p>
                            <p className="font-righteous text-sm text-retro-muted">
                                générées
                            </p>
                        </>
                    )}
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-4 gap-5 mt-6 sm:mt-10">
                {tokens >= 1000 ? (
                    <Link
                        to={URLS.ME_GAME_NEW}
                        className="flex flex-col card-primary-hover p-6"
                    >
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                                Nouvelle image
                            </h3>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center mt-2.5 mb-0.5">
                            <div className="flex items-center w-full">
                                <ProgressBar
                                    label={''}
                                    value={tokens}
                                    max={1000}
                                    size={'md'}
                                />
                                <PiCoinsFill className="text-retro-muted text-2xl ml-1" />
                            </div>
                            <p className="text-retro-muted font-righteous text-xs sm:text-sm mt-1.5">
                                Utilise tes jetons pour générer une partie et la
                                publier !
                            </p>
                        </div>

                        <p className="mt-auto pt-2 flex justify-end items-center font-righteous text-retro-accent text-xs">
                            Générer <BiSolidRightArrow className="ml-1" />
                        </p>
                    </Link>
                ) : (
                    <div className="flex flex-col card-retro p-6 ursor-default">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-righteous text-retro-accent uppercase">
                                Nouvelle image
                            </h3>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center mt-2.5 mb-0.5">
                            <div className="flex items-center w-full">
                                <ProgressBar
                                    label={''}
                                    value={tokens}
                                    max={1000}
                                    size={'md'}
                                />
                                <PiCoinsFill className="text-retro-muted text-2xl ml-1" />
                            </div>
                            <p className="text-retro-muted font-righteous text-xs sm:text-sm mt-1.5">
                                Pas assez de jetons pour générer une partie.
                            </p>
                        </div>
                    </div>
                )}

                {userGeneratedGames?.slice(0, 10).map((game: GameType) => {
                    const statusLabel =
                        GAME_STATUS_CONFIG[game.status]?.label ?? game.status;
                    const isDraft = game.status === GAME_STATUSES.DRAFT;
                    const isPending = game.status === GAME_STATUSES.PENDING;

                    const cardContent = (
                        <>
                            <div className="flex justify-between items-center gap-2 font-righteous">
                                <p className="text-retro-muted text-sm">
                                    {format(parseISO(game.date), 'd MMMM', {
                                        locale: fr,
                                    })}
                                </p>
                                <span
                                    className={`inline-flex items-center gap-1 text-xs ${game.status === GAME_STATUSES.APPROVED ? 'text-retro-success' : 'text-retro-primary'}`}
                                >
                                    {statusLabel}
                                </span>
                            </div>

                            <div className="flex h-full justify-center items-center py-1.5">
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

                            {!isPending && (
                                <p className="mt-auto pt-2 flex justify-end items-center font-righteous text-retro-accent text-xs">
                                    {isDraft ? 'Modifier' : 'Voir'}{' '}
                                    <BiSolidRightArrow className="ml-1" />
                                </p>
                            )}
                        </>
                    );

                    if (isDraft) {
                        return (
                            <Link
                                key={game.id}
                                to={URLS.ME_GAME_FORM(game.id)}
                                className="flex flex-col p-6 card-primary-hover"
                            >
                                {cardContent}
                            </Link>
                        );
                    }

                    if (isPending) {
                        return (
                            <div
                                key={game.id}
                                className="flex flex-col p-6 card-retro cursor-default"
                            >
                                {cardContent}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={game.id}
                            to={URLS.ME_GAME_DETAIL(game.id)}
                            className="flex flex-col p-6 card-primary-hover"
                        >
                            {cardContent}
                        </Link>
                    );
                })}
            </section>
        </article>
    );
}

export default List;
