import DifficultyButton from "./DifficultyButton.tsx"
import type {GameShowType} from "../../types/gameShowType.ts";
import type {GameSolutionType} from "../../types/gameSolutionType.ts";

function GameHeader({game, gameSolution}: { game: GameShowType, gameSolution: GameSolutionType }) {

    return <div className={'relative h-[15%]'}>
        <div
            className={`h-full flex items-center duration-500 ${!gameSolution.title ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <button disabled
                    className={'absolute top-0 right-0 border-l border-b border-black rounded-bl'}>
                <DifficultyButton difficulty={game.difficulty}/>
            </button>

            <div className={'w-full text-center'}>
                <h1 className={'title text-4xl'}>MultiVersE</h1>
                <p className={'font-extralight mt-1'}>Retrouvez les deux univers mélangés dans cette
                    image</p>
            </div>
        </div>

        <div
            className={`absolute top-0 w-full h-full flex items-center duration-500 ${gameSolution.title ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}>
            <div className={'w-full text-center '}>
                <h1 className={'text-2xl font-light'}>{gameSolution.title}</h1>
                <p className={'w-fit bg-green-200 px-5 py-1 mt-1 mx-auto'}>+ 10 points</p>
            </div>
        </div>
    </div>
}

export default GameHeader
