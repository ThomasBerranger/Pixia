import type {GameType} from "../../../types/gameType.ts"
import ChangeGameButton from "../ChangeGameButton.tsx"
import {HiPlusSm} from "react-icons/hi";

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

    return (
        <div className="max-w-3xl mx-auto w-full flex">
            <div
                className="relative mb-8 overflow-hidden shadow-[0_0px_60px_rgba(0,0,0,0.6)] shadow-retro-accent group rounded">

                <span className="absolute top-5 right-5 badge badge-pink transition-all duration-300 ease-in-out
                    group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:opacity-30 flex items-center">
                    {game.solution ? <><HiPlusSm className="mb-0.5" size={16}/> 10 points</> : game.difficulty}
                </span>

                <img
                    src={game.image ? `${import.meta.env.VITE_API_URL}${game.image}` : "http://127.0.0.1:8000/images/MULTIVERS/2025/09/29.jpg"}
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
        </div>
    )
}

export default GameContent