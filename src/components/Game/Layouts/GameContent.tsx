import type { GameType } from '../../../types/Game/gameType.ts';
import ChangeGameButton from '../Controls/ChangeGameButton.tsx';
import MobileChangeGameButton from '../Controls/MobileChangeGameButton.tsx';
import { CgSpinner } from 'react-icons/cg';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RxDotFilled } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';

function GameContent({
    game,
    onGameChange,
    previousGameDate,
    nextGameDate,
    loadingDirection,
    isImageLoading,
    onImageLoadEnd,
}: {
    game: GameType | undefined;
    onGameChange: (date: string, isPrevious: boolean) => void;
    previousGameDate: string | null;
    nextGameDate: string | null;
    loadingDirection: 'prev' | 'next' | null;
    isImageLoading: boolean;
    onImageLoadEnd: () => void;
}) {
    return (
        <div className="md:h-[80%]">
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
                    <img
                        src={
                            game && game.image
                                ? `${import.meta.env.VITE_API_URL}${game.image}`
                                : 'https://placehold.co/800x400?text=Chargement'
                        }
                        onLoad={onImageLoadEnd}
                        alt="AI created image"
                        className={`md:h-full object-contain shadow-[0_0px_60px_rgba(0,0,0,0.6)] shadow-retro-accent rounded-md transition-all duration-300 ${isImageLoading && 'blur-sm'}`}
                    />
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

                {nextGameDate &&
                    nextGameDate <= new Date().toISOString().split('T')[0] && (
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

                {nextGameDate &&
                    nextGameDate <= new Date().toISOString().split('T')[0] && (
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
