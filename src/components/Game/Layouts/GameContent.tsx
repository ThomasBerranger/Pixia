import { useRef } from 'react';
import type { GameType } from '../../../types/Game/gameType.ts';
import ChangeGameButton from '../Controls/ChangeGameButton.tsx';
import MobileChangeGameButton from '../Controls/MobileChangeGameButton.tsx';
import { CgSpinner } from 'react-icons/cg';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RxDotFilled } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';
import { toDateKey } from '../../../utils/date.ts';
import UserAvatar from '../../../atoms/UserAvatar.tsx';
import { Link } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';

interface GameContentProps {
    game: GameType | undefined;
    onGameChange: (date: string, isPrevious: boolean) => void;
    previousGameDate: string | null;
    nextGameDate: string | null;
    loadingDirection: 'prev' | 'next' | null;
    isImageLoading: boolean;
    onImageLoadEnd: () => void;
}

function GameContent({
    game,
    onGameChange,
    previousGameDate,
    nextGameDate,
    loadingDirection,
    isImageLoading,
    onImageLoadEnd,
}: GameContentProps) {
    const fsRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            fsRef.current?.requestFullscreen();
        }
    };

    return (
        <div className="md:h-[80%]">
            {game?.author && game.author.username !== 'Mirage' && (
                <Link
                    to={URLS.USER_SHOW(game.author.slug)}
                    className="flex md:hidden items-center gap-1.5 float-left relative z-10 mb-4 max-w-[35vw] min-w-0"
                >
                    <UserAvatar
                        avatarUrl={game.author.avatarUrl}
                        username={game.author.username}
                        className="w-10 h-10 flex-shrink-0"
                    />
                    <div className="flex flex-col font-righteous overflow-hidden">
                        <span className="text-xxs text-retro-muted">
                            Générée par
                        </span>
                        <span className="text-xs truncate">
                            {game.author.username}
                        </span>
                    </div>
                </Link>
            )}

            <p className="flex md:hidden items-center text-xxs float-right z-10 badge badge-primary py-1 px-5 w-fit mb-4">
                {game && game.difficulty ? (
                    game.solution ? (
                        <>
                            <FaCheck className="text-xs mr-1" />
                            {format(parseISO(game.date), 'd MMMM', {
                                locale: fr,
                            })}
                        </>
                    ) : (
                        <>
                            {format(parseISO(game.date), 'd MMMM', {
                                locale: fr,
                            })}{' '}
                            <RxDotFilled size={20} /> Niveau {game.difficulty}
                        </>
                    )
                ) : (
                    <CgSpinner className="animate-spin" size={16} />
                )}
            </p>

            <div className="md:h-full w-fit relative group rounded mx-auto">
                {game?.author && game.author.username !== 'Mirage' && (
                    <Link
                        to={URLS.USER_SHOW(game.author.slug)}
                        className="absolute hidden md:flex items-center top-2 left-2 z-10 rounded-xl max-w-[25vw]
                        bg-retro-bg/100 backdrop-blur-sm py-1 border-2 border-retro-accent/50 shadow-[0_0_10px_rgba(0,0,0,0.5)]
                        transition-all duration-300 ease-in-out
                        group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:opacity-40 hover:!opacity-100"
                    >
                        <UserAvatar
                            avatarUrl={game.author.avatarUrl}
                            username={game.author.username}
                            className="w-12 h-12 flex-shrink-0"
                        />
                        <div className="flex flex-col font-righteous min-w-0">
                            <span className="text-xs text-retro-muted mr-2">
                                Générée par
                            </span>
                            <span className="mr-1.5 truncate">
                                {game.author.username}
                            </span>
                        </div>
                    </Link>
                )}

                <p
                    className="absolute hidden md:flex items-center text-xs top-3 right-4 z-10
                badge-primary md:py-2 md:px-4 transition-all duration-300 ease-in-out
                group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-40"
                >
                    {game && game.difficulty ? (
                        game.solution ? (
                            <>
                                <FaCheck className="text-xs mr-1" />
                                {format(parseISO(game.date), 'd MMMM', {
                                    locale: fr,
                                })}
                            </>
                        ) : (
                            <>
                                {format(parseISO(game.date), 'd MMMM', {
                                    locale: fr,
                                })}{' '}
                                <RxDotFilled size={20} /> Niveau{' '}
                                {game.difficulty}
                            </>
                        )
                    ) : (
                        <CgSpinner className="animate-spin" size={16} />
                    )}
                </p>

                {game && game.image ? (
                    <div
                        ref={fsRef}
                        className="contents [&:fullscreen]:flex [&:fullscreen]:bg-black [&:fullscreen]:items-center [&:fullscreen]:overflow-x-auto [&:fullscreen>img]:h-[80vh] [&:fullscreen>img]:w-auto [&:fullscreen>img]:max-w-none [&:fullscreen>img]:mx-auto"
                    >
                        <img
                            src={`${import.meta.env.VITE_API_URL}${game.image}`}
                            onLoad={onImageLoadEnd}
                            onClick={toggleFullscreen}
                            alt="AI created image"
                            className={`md:h-full object-contain shadow-[0_0px_60px_rgba(0,0,0,0.6)] shadow-retro-accent rounded-md transition-all duration-300 cursor-zoom-in ${isImageLoading && 'blur-sm'}`}
                        />
                    </div>
                ) : (
                    <img
                        src="/gifs/loading3.gif"
                        className="md:h-full w-full"
                        alt="loading gif"
                    />
                )}

                {previousGameDate && (
                    <ChangeGameButton
                        date={previousGameDate}
                        isNext={false}
                        isLoading={loadingDirection === 'prev'}
                        onClick={() => onGameChange(previousGameDate, true)}
                    />
                )}

                {nextGameDate && nextGameDate <= toDateKey(new Date()) && (
                    <ChangeGameButton
                        date={nextGameDate}
                        isNext={true}
                        isLoading={loadingDirection === 'next'}
                        onClick={() => onGameChange(nextGameDate, false)}
                    />
                )}
            </div>

            <div className="md:hidden flex justify-between pr-2 mt-3 mb-6">
                {previousGameDate && (
                    <MobileChangeGameButton
                        date={previousGameDate}
                        isNext={false}
                        isLoading={loadingDirection === 'prev'}
                        onClick={() => onGameChange(previousGameDate, true)}
                    />
                )}

                {nextGameDate && nextGameDate <= toDateKey(new Date()) && (
                    <MobileChangeGameButton
                        date={nextGameDate}
                        isNext={true}
                        isLoading={loadingDirection === 'next'}
                        onClick={() => onGameChange(nextGameDate, false)}
                    />
                )}
            </div>
        </div>
    );
}

export default GameContent;
