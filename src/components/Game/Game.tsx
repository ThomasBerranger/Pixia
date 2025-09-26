import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {GameShowType} from "../../types/gameShowType.ts"
import type {GameSolutionType} from "../../types/gameSolutionType.ts"
import GameHeader from "./GameHeader.tsx"
import GameContent from "./GameContent.tsx"
import GameFooter from "./GameFooter.tsx"

function Game() {
    const {apiCall} = useApi()

    const [game, setGame] = useState<GameShowType>({
        id: undefined,
        image: undefined,
        difficulty: undefined,
    })
    const [gameSolution, setGameSolution] = useState<GameSolutionType>({
        title: undefined,
        explanation: undefined,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games')

                setGame(response)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={'w-10/12 md:w-2/3 border border-black bg-white rounded'}>
        <GameHeader game={game} gameSolution={gameSolution}/>
        <GameContent gameImage={game.image}/>
        <GameFooter game={game} gameSolution={gameSolution} setGameSolution={setGameSolution}/>
    </div>
}

export default Game
