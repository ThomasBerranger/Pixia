import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {GameType} from "../../types/gameType.ts"
import type {AchievementType} from "../../types/achievementType.ts"
import GameHeader from "./Layout/GameHeader.tsx"
import GameContent from "./Layout/GameContent.tsx"
import GameFooter from "./Layout/GameFooter.tsx"

function Game() {
    const {apiCall} = useApi()

    const [game, setGame] = useState<GameType>({
        id: undefined,
        type: undefined,
        solution: undefined,
        hint: undefined,
        explanation: undefined,
        date: undefined,
        difficulty: undefined,
        image: undefined,
        userDifficulty: undefined,
    })
    const [achievement, setAchievement] = useState<AchievementType>({difficulty: undefined})
    const [nextGameDate, setNextGameDate] = useState<string | null>(null)
    const [previousGameDate, setPreviousGameDate] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games')

                setGame(response.game)
                setAchievement(response.achievement)
                setPreviousGameDate(response.previousGameDate)
                setNextGameDate(response.nextGameDate)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={'w-10/12 md:w-2/3 border border-black bg-white rounded'}>
        <GameHeader game={game}/>
        <GameContent gameImage={game.image}/>
        <GameFooter game={game} setGame={setGame}
                    achievement={achievement} setAchievement={setAchievement}
                    previousGameDate={previousGameDate} setPreviousGameDate={setPreviousGameDate}
                    nextGameDate={nextGameDate} setNextGameDate={setNextGameDate}/>
    </div>
}

export default Game
