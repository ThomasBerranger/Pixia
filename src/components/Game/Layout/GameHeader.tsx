import DifficultyButton from "../DifficultyButton.tsx"
import type {GameType} from "../../../types/gameType.ts"
import type {AchievementType} from "../../../types/achievementType.ts"
import {getDifficultyBackgroundColor} from "../../../utils/difficultyBackgroundColor.ts";
import {getDifficultyBackgroundPoints} from "../../../utils/difficultyBackgroundPoints.ts";

function GameHeader({game, achievement}: {
    game: GameType,
    achievement: AchievementType
}) {

    return <div className={'relative h-[15%]'}>
        <div
            className={`h-full flex items-center ${!achievement && 'duration-500'} ${!game.solution ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <button disabled
                    className={'absolute top-0 right-0 border-l border-b border-black rounded-bl'}>
                <DifficultyButton difficulty={game.difficulty}/>
            </button>

            <div className={'w-full text-center'}>
                <h1 className={'title text-4xl'}>MultiVersE</h1>
                <p className={'font-extralight mt-1'}>Retrouvez les deux films mélangés dans cette
                    image</p>
            </div>
        </div>

        <div
            className={`absolute top-0 w-full h-full flex items-center ${!achievement && 'duration-500'} ${game.solution ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <div className={'w-full text-center '}>
                <h1 className={'text-2xl font-light'}>{game.solution}</h1>
                <p className={`w-fit px-5 py-1 mt-1 mx-auto ${getDifficultyBackgroundColor(game.difficulty)}`}>+ {getDifficultyBackgroundPoints(game.difficulty)} points</p>
            </div>
        </div>
    </div>
}

export default GameHeader
