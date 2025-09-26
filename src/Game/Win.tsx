import type {GameSolutionType} from "../types/gameSolutionType.ts";
import type {GameShowType} from "../types/gameShowType.ts";

function Win({game, gameSolution}: { game: GameShowType, gameSolution: GameSolutionType }) {

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full bg-white duration-500 ${gameSolution.title ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
            <p className={'text-2xl mt-10 text-center font-light'}>{gameSolution.title}</p>
            <p className={'w-fit bg-green-200 px-7 py-2 mt-3 mx-auto'}>+ 10 points</p>
            {game.image ? (
                <img src={`${import.meta.env.VITE_API_URL}${game.image}`} alt={game.difficulty}
                     className={'h-80 mx-auto mt-4'}/>
            ) : (
                <img className={'mx-auto mt-4'}
                     src="https://placehold.co/400x200/EEE/31343C?font=oswald&text=En%20cours%20de%20chargement"
                     alt="placegolder"/>
            )}
            <div className="w-full flex justify-center gap-5 mt-5">
                <button className={'button-shadow px-5 py-2'}>Image précédente</button>
                <select name="difficulty" id="difficulty" className={'border border-black rounded px-4'}>
                    <option value="easy">Easy</option>
                    <option value="easy">Medium</option>
                </select>
                <button className={'button-shadow px-5 py-2'}>Image suivante</button>
            </div>
        </div>
    )
}

export default Win
