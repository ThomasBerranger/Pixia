import {useCallback, useEffect, useState} from "react"
import {type ApiError, useApi} from "../../hooks/useApi.tsx"
import type {GameType} from "../../types/Game/gameType.ts"
import GameHeader from "./Layouts/GameHeader.tsx"
import GameContent from "./Layouts/GameContent.tsx"
import GameFooter from "./Layouts/GameFooter.tsx"
import Leaderboard from "./Leaderboard.tsx"
import type {LeaderboardUserType} from "../../types/User/leaderboardUserType.ts"
import type {UserType} from "../../types/User/userType.ts"
import type {AnswerResult} from "../../types/answerResultType.ts"

function GameContainer() {
    const {apiCall} = useApi()

    const [game, setGame] = useState<GameType>({
        id: undefined,
        type: undefined,
        solution: undefined,
        hint: undefined,
        date: undefined,
        difficulty: undefined,
        image: undefined,
        userDifficulty: undefined,
    })
    const [nextGameDate, setNextGameDate] = useState<string | null>(null)
    const [previousGameDate, setPreviousGameDate] = useState<string | null>(null)
    const [loadingDirection, setLoadingDirection] = useState<'prev' | 'next' | null>(null)

    const [leaderboard, setLeaderboard] = useState<LeaderboardUserType[]>([])
    const [currentUser, setCurrentUser] = useState<UserType>()
    const [currentUserRank, setCurrentUserRank] = useState<number>()

    useEffect(() => {
        apiCall('games/daily')
            .then(response => {
                setGame(response.game)
                setPreviousGameDate(response.previousGameDate)
                setNextGameDate(response.nextGameDate)
            })
            .catch(console.error)

        apiCall('users/leaderboard')
            .then(response => {
                setLeaderboard(response.leaderboard)
                setCurrentUser(response.currentUser)
                setCurrentUserRank(response.currentUserRank)
            })
            .catch(console.error)
    }, [])

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

    const handleAnswerSubmit = useCallback(async (answer: string): Promise<AnswerResult> => {
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

                apiCall('users/leaderboard')
                    .then(response => {
                        setLeaderboard(response.leaderboard)
                        setCurrentUser(response.currentUser)
                        setCurrentUserRank(response.currentUserRank)
                    })
                    .catch(console.error)

                return {success: true}
            }

            return {success: false}
        } catch (error) {
            const apiError = error as ApiError

            if (apiError.status === 429) {
                return {success: false, rateLimited: true, errorMessage: apiError.detail}
            }

            return {
                success: false,
                errorMessage: 'Une erreur est survenue.'
            }
        }
    }, [game.id])

    return <>
        <section className="sm:min-h-[80vh] flex flex-col justify-center px-5 py-[3vh]">
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

        <hr className="divider max-w-5xl mx-auto my-5 sm:my-10"/>

        <Leaderboard leaderboard={leaderboard} currentUser={currentUser} currentUserRank={currentUserRank}/>
    </>
}

export default GameContainer