import {getDifficultyBackgroundColor} from "../../utils/difficultyBackgroundColor.ts"

function DifficultyButton({difficulty}: { difficulty: string | undefined }) {

    return (
        <p className={`px-4 py-2 font-oswald ${getDifficultyBackgroundColor(difficulty)}`}>
            {difficulty ?? '/'}
        </p>
    )
}

export default DifficultyButton
