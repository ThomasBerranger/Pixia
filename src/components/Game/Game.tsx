import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {GameType} from "../../types/gameType.ts"
import type {HistoryType} from "../../types/historyType.ts"
import GameHeader from "./Layout/GameHeader.tsx"
import GameContent from "./Layout/GameContent.tsx"
import GameFooter from "./Layout/GameFooter.tsx"

function Game() {
    const {apiCall} = useApi()

    const [game, setGame] = useState<GameType>({
        id: undefined,
        solution: undefined,
        explanation: undefined,
        hint: undefined,
        image: undefined,
        difficulty: undefined,
        userDifficulty: undefined,
    })
    const [history, setHistory] = useState<HistoryType>({difficulty: undefined})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games')

                setGame(response.game)
                setHistory(response.history)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={'w-10/12 md:w-2/3 border border-black bg-white rounded'}>
        <GameHeader game={game} history={history}/>
        <GameContent gameImage={game.image}/>
        <GameFooter game={game} setGame={setGame} history={history} setHistory={setHistory}/>
    </div>
}

export default Game
