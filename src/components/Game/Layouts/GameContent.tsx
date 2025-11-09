import type {GameType} from "../../../types/gameType.ts"
import ChangeGameButton from "../Components/ChangeGameButton.tsx"
import {HiPlusSm} from "react-icons/hi";
import {getDifficultyPoints} from "../../../utils/difficultyPoints.ts";
import MobilChangeGameButton from "../Components/MobilChangeGameButton.tsx";

function GameContent({
                         game,
                         onGameChange,
                         previousGameDate,
                         nextGameDate,
                         loadingDirection
                     }: {
    game: GameType,
    onGameChange: (date: string, isPrevious: boolean) => void,
    previousGameDate: string | null,
    nextGameDate: string | null,
    loadingDirection: 'prev' | 'next' | null
}) {

    return <div className="max-w-3xl mx-auto sm:mb-8">
        <div
            className="relative shadow-[0_0px_60px_rgba(0,0,0,0.6)] shadow-retro-accent group rounded">

                <span className="absolute flex items-center text-[0.6rem] sm:text-xs top-3 right-3 sm:top-5 sm:right-5
                badge badge-pink sm:py-2.5 sm:px-5 transition-all duration-300 ease-in-out
                group-hover:translate-x-1.5 group-hover:-translate-y-2 sm:group-hover:translate-x-2.5 sm:group-hover:-translate-y-3 group-hover:opacity-40">
                    {
                        game.solution ?
                            <><HiPlusSm
                                className="text-xs sm:text-lg"/> {getDifficultyPoints(game.difficulty)} points</> :
                            game.difficulty
                    }
                </span>

            <img
                src={game.image ? `${import.meta.env.VITE_API_URL}${game.image}` : "https://placehold.co/800x400?text=Chargement"}
                alt="AI created image"
                className="h-full mx-auto object-contain"
            />

            {previousGameDate && (
                <ChangeGameButton
                    isNext={false}
                    isLoading={loadingDirection === 'prev'}
                    onClick={() => onGameChange(previousGameDate, true)}
                />
            )}

            {nextGameDate && (
                <ChangeGameButton
                    isNext={true}
                    isLoading={loadingDirection === 'next'}
                    onClick={() => onGameChange(nextGameDate, false)}
                />
            )}
        </div>

        <div className="sm:hidden flex justify-between pr-2 mt-3 mb-6">
            {previousGameDate && (
                <MobilChangeGameButton
                    isNext={false}
                    isLoading={loadingDirection === 'prev'}
                    onClick={() => onGameChange(previousGameDate, true)}
                />
            )}

            {nextGameDate && (
                <MobilChangeGameButton
                    isNext={true}
                    isLoading={loadingDirection === 'next'}
                    onClick={() => onGameChange(nextGameDate, false)}
                />
            )}
        </div>
    </div>
}

export default GameContent