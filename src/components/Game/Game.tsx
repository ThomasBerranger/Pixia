import {useCallback, useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {GameType} from "../../types/gameType.ts"
import GameHeader from "./Layout/GameHeader.tsx"
import GameContent from "./Layout/GameContent.tsx"
import GameFooter from "./Layout/GameFooter.tsx"

type LoadingDirection = 'prev' | 'next' | null

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
    const [nextGameDate, setNextGameDate] = useState<string | null>(null)
    const [previousGameDate, setPreviousGameDate] = useState<string | null>(null)
    const [loadingDirection, setLoadingDirection] = useState<LoadingDirection>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games/daily')

                setGame(response.game)
                setPreviousGameDate(response.previousGameDate)
                setNextGameDate(response.nextGameDate)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleGameChange = useCallback(async (date: string, isPrevious: boolean) => {
        setLoadingDirection(isPrevious ? 'prev' : 'next')

        try {
            const response = await apiCall(`games/daily?date=${date}&type=${game.type}`)

            setGame(response.game)
            setPreviousGameDate(response.previousGameDate)
            setNextGameDate(response.nextGameDate)
        } catch (error) {
            console.error('Erreur: ', error)
        } finally {
            setLoadingDirection(null)
        }
    }, [game.type]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAnswerSubmit = useCallback(async (answer: string): Promise<boolean> => {
        try {
            const response = await apiCall(`games/${game.id}/solution`, {
                method: 'POST',
                body: JSON.stringify({"answer": answer})
            })

            if (response?.solution) {
                setGame((prevGame: GameType): GameType => ({
                    ...prevGame,
                    solution: response.solution
                }))

                console.log(response.solution);

                return true
            }

            return false
        } catch (error) {
            console.error('Erreur: ', error)

            return false
        }
    }, [game.id]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="min-h-screen flex flex-col justify-center px-[5%] py-10">
            <GameHeader/>

            <GameContent
                game={game}
                onGameChange={handleGameChange}
                previousGameDate={previousGameDate}
                nextGameDate={nextGameDate}
                loadingDirection={loadingDirection}
            />

            <GameFooter game={game} onAnswerSubmit={handleAnswerSubmit}/>
        </section>
    )
}

export default Game