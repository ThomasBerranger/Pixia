import DifficultyButton from "../DifficultyButton.tsx"
import type {GameType} from "../../../types/gameType.ts"
import {getDifficultyBackgroundColor} from "../../../utils/difficultyBackgroundColor.ts";
import {getDifficultyBackgroundPoints} from "../../../utils/difficultyBackgroundPoints.ts";

function GameHeader({game}: {
    game: GameType,
}) {

    return <div className={'h-[15%] relative flex justify-center items-center'}>
        {!game.solution ?
            <>
                <button disabled
                        className={'absolute top-0 right-0 border-l border-b border-black rounded-bl'}>
                    <DifficultyButton difficulty={game.difficulty}/>
                </button>

                <div className={'text-center'}>
                    <h1 className={'title text-4xl'}>MultiVersE</h1>
                    <p className={'font-extralight mt-1'}>Retrouvez les deux films mélangés dans cette
                        image</p>
                </div>
            </>
            :
            <div>
                <h1 className={'text-2xl font-light'}>{game.solution}</h1>
                <p className={`w-fit px-5 py-1 mt-1 mx-auto ${getDifficultyBackgroundColor(game.difficulty)}`}>+ {getDifficultyBackgroundPoints(game.difficulty)} points</p>
            </div>
        }
    </div>
}

export default GameHeader
