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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const userGeneratedGames: GameType[] = await apiCall(
                    ENDPOINTS.ME_GAMES_GENERATED
                );

                setUserGeneratedGames(userGeneratedGames);
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
                    Parties générées
                </h2>
                <div className="text-retro-primary whitespace-nowrap text-right">
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-4xl" />
                    ) : (
                        <>
                            <p className="-mb-1.5">
                                <span className="font-title text-4xl">
                                    {userGeneratedGames?.length}
                                </span>
                            </p>
                            <span className="font-righteous text-sm text-retro-muted">
                                générées
                            </span>
                        </>
                    )}
                </div>
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-6 sm:mt-10">
                <Link
                    to={URLS.ME_GAMES_GENERATED}
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
                                value={465}
                                max={1000}
                                size={'md'}
                            />
                            <PiCoinsFill className="text-retro-muted text-2xl ml-1" />
                        </div>
                        <p className="text-retro-muted font-righteous text-xs sm:text-sm mt-1">
                            Utilise tes jetons pour générer un prompt, une image
                            et la publier !
                        </p>
                    </div>

                    <p className="mt-auto pt-2 flex justify-end items-center font-righteous text-retro-accent text-xs">
                        Générer <BiSolidRightArrow className="ml-1" />
                    </p>
                </Link>

                {userGeneratedGames?.map((game: GameType) => {
                    const { icon: StatusIcon } =
                        GAME_STATUS_CONFIG[game.status];

                    return (
                        <Link
                            key={`${game.type}-${game.date}`}
                            to={URLS.ADMIN_GAME_EDIT(game.id)}
                            className={`flex flex-col p-6 ${game.status === GAME_STATUSES.DRAFT ? 'card-primary-hover' : 'card-retro-hover-retro-accent'}`}
                        >
                            <div className="flex justify-between items-center gap-2 font-righteous">
                                <p className="text-retro-muted text-sm">
                                    {format(parseISO(game.date), 'd MMMM', {
                                        locale: fr,
                                    })}
                                </p>
                                <StatusIcon className="text-retro-primary text-lg" />
                            </div>

                            <div className="flex h-full justify-center items-center">
                                {game && game.image ? (
                                    <img
                                        src={
                                            game && game.image
                                                ? `${import.meta.env.VITE_API_URL}${game.image}`
                                                : 'https://placehold.co/800x400?text=Chargement'
                                        }
                                        alt="AI created image"
                                        className="h-full object-contain rounded-md mt-1.5"
                                    />
                                ) : (
                                    <CiImageOff className="text-retro-muted text-4xl my-3" />
                                )}
                            </div>

                            <p className="mt-auto pt-2 flex justify-end items-center font-righteous text-retro-accent text-xs">
                                Voir <BiSolidRightArrow className="ml-1" />
                            </p>
                        </Link>
                    );
                })}
            </section>
        </article>
    );
}

export default List;
