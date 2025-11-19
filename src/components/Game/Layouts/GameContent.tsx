import type { GameType } from '../../../types/Game/gameType.ts';
import ChangeGameButton from '../Components/ChangeGameButton.tsx';
import { HiPlusSm } from 'react-icons/hi';
import { DIFFICULTIES } from '../../../constants/difficultyPoints.ts';
import MobilChangeGameButton from '../Components/MobilChangeGameButton.tsx';
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
}: {
    game: GameType | undefined;
    onGameChange: (date: string, isPrevious: boolean) => void;
    previousGameDate: string | null;
    nextGameDate: string | null;
    loadingDirection: 'prev' | 'next' | null;
}) {
    return (
        <div className="max-w-3xl mx-auto sm:mb-8">
            <div className="relative shadow-[0_0px_60px_rgba(0,0,0,0.6)] shadow-retro-accent group rounded">
                <p
                    className="absolute flex items-center text-[0.6rem] sm:text-xs top-3 right-3 sm:top-5 sm:right-5
                badge badge-pink sm:py-2.5 sm:px-5 transition-all duration-300 ease-in-out
                group-hover:translate-x-1.5 group-hover:-translate-y-2 sm:group-hover:translate-x-2.5 sm:group-hover:-translate-y-3 group-hover:opacity-40"
                >
                    {game && game.difficulty ? (
                        game.solution ? (
                            <>
                                <FaCheck className="text-xs mr-1" />
                                {format(parseISO(game.date), 'd MMMM', {
                                    locale: fr,
                                })}
                                <HiPlusSm className="text-xs sm:text-lg -mr-0.5" />
                                {DIFFICULTIES[game.difficulty]} points
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

                <img
                    src={
                        game && game.image
                            ? `${import.meta.env.VITE_API_URL}${game.image}`
                            : 'https://placehold.co/800x400?text=Chargement'
                    }
                    alt="AI created image"
                    className="h-auto max-h-full w-full mx-auto object-contain"
                    style={{ alignSelf: 'flex-start' }}
                />

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

            <div className="sm:hidden flex justify-between pr-2 mt-3 mb-6">
                {previousGameDate && (
                    <MobilChangeGameButton
                        date={previousGameDate}
                        isNext={false}
                        isLoading={loadingDirection === 'prev'}
                        onClick={() => onGameChange(previousGameDate, true)}
                    />
                )}

                {nextGameDate &&
                    nextGameDate <= new Date().toISOString().split('T')[0] && (
                        <MobilChangeGameButton
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
