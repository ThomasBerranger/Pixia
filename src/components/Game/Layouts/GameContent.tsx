import { useRef } from 'react';
import type { GameType } from '../../../types/Game/gameType.ts';
import ChangeGameButton from '../Controls/ChangeGameButton.tsx';
import MobileChangeGameButton from '../Controls/MobileChangeGameButton.tsx';
import { toDateKey } from '../../../utils/date.ts';
import { buildAssetUrl } from '../../../hooks/useApi.tsx';
import GameBadge from './GameBadge.tsx';
import GameAuthorBadge from './GameAuthorBadge.tsx';

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
                <GameAuthorBadge author={game.author} variant="mobile" />
            )}

            <GameBadge
                game={game}
                className="flex md:hidden items-center text-xxs float-right z-10 badge badge-primary py-1 px-5 w-fit mb-4"
            />

            <div className="md:h-full w-fit relative group rounded mx-auto">
                {game?.author && game.author.username !== 'Mirage' && (
                    <GameAuthorBadge author={game.author} variant="desktop" />
                )}

                <GameBadge
                    game={game}
                    className="absolute hidden md:flex items-center text-xs top-3 right-4 z-10
                badge-primary md:py-2 md:px-4 transition-all duration-300 ease-in-out
                group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-40"
                />

                {game && game.image ? (
                    <div
                        ref={fsRef}
                        className="contents [&:fullscreen]:flex [&:fullscreen]:bg-black [&:fullscreen]:items-center [&:fullscreen]:overflow-x-auto [&:fullscreen>img]:h-[80vh] [&:fullscreen>img]:w-auto [&:fullscreen>img]:max-w-none [&:fullscreen>img]:mx-auto"
                    >
                        <img
                            src={buildAssetUrl(game.image)}
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
