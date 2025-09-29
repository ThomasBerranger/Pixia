import {AiOutlineLoading3Quarters} from "react-icons/ai"
import React, {useState} from "react"
import {useApi} from "../../../hooks/useApi.tsx"
import {useAuth} from "../../../contexts/authContext.tsx"
import type {GameType} from "../../../types/gameType.ts"
import type {AchievementType} from "../../../types/achievementType.ts"
import {PiArrowFatLineLeft, PiArrowFatLineRight} from "react-icons/pi"

function GameFooter({
                        game,
                        setGame,
                        achievement,
                        setAchievement,
                        previousGameDate,
                        setPreviousGameDate,
                        nextGameDate,
                        setNextGameDate
                    }: {
    game: GameType,
    setGame: React.Dispatch<React.SetStateAction<GameType>>,
    achievement: AchievementType,
    setAchievement: React.Dispatch<React.SetStateAction<AchievementType>>,
    previousGameDate: string | null,
    setPreviousGameDate: React.Dispatch<React.SetStateAction<string | null>>,
    nextGameDate: string | null,
    setNextGameDate: React.Dispatch<React.SetStateAction<string | null>>,
}) {
    const {isAuthenticated} = useAuth()
    const {apiCall} = useApi()

    const [hint, setHint] = useState<string>('')
    const [hintLoading, setHintLoading] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>('')
    const [answerLoading, setAnswerLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState(false)

    async function handleHintRequest(): Promise<void> {
        if (hint) {
            setHint('')
            return
        }

        setHintLoading(true)

        try {
            const response = await apiCall(`games/${game.id}/hint`)

            setHint(response)
        } catch (error) {
            console.error('Erreur: ', error)
        } finally {
            setHintLoading(false)
        }
    }

    async function handleSolutionRequest(e: React.FormEvent): Promise<void> {
        e.preventDefault()

        if (answer.length <= 5) {
            showErrorBriefly()
        } else {
            setAnswerLoading(true)

            try {
                const response = await apiCall(`games/${game.id}/solution`, {
                    method: 'POST',
                    body: JSON.stringify({"answer": answer})
                })

                if (!response) {
                    showErrorBriefly()
                } else {
                    setGame((prevGame: GameType): GameType => ({
                        ...prevGame,
                        solution: response.solution || undefined,
                        explanation: response.explanation || undefined,
                    }));
                }
            } catch (error) {
                console.error('Erreur: ', error)
            } finally {
                setAnswerLoading(false)
            }
        }
    }

    const submitDifficultyVote = async (difficulty: string): Promise<void> => {
        try {
            const response = await apiCall(`games/${game.id}/difficulty`, {
                method: 'POST',
                body: JSON.stringify({difficulty: difficulty})
            })

            setAchievement(prev => ({...prev, ...response}));
        } catch (error) {
            console.error('Erreur: ', error)
        }
    };

    const showErrorBriefly = () => {
        setDisplayError(true)

        setTimeout(() => {
            setDisplayError(false)
        }, 2000)
    }

    const changeGame = async (date: string | null): Promise<void> => {
        if (date) {
            try {
                const response = await apiCall(`games?date=${date}&type=${game.type}`)

                setGame(response.game)
                setAchievement(response.achievement)
                setHint('')
                setPreviousGameDate(response.previousGameDate)
                setNextGameDate(response.nextGameDate)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }
    }

    return <div className={'relative h-[20%]'}>
        {hint && (<div
            className={'position w-full flex justify-center absolute top-0 origin-bottom -translate-y-full bg-white bg-opacity-70'}>
            <p className={'w-full sm:w-3/4 xl:w-1/2 text-center'}>{hint}</p>
        </div>)}

        <div
            className={`h-full flex items-center ${!achievement && 'duration-500'} ${!game.solution ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>

            <form onSubmit={handleSolutionRequest} className={'w-full text-center'}>

                <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                       className={`w-2/3 text-center border rounded p-1 duration-300 ${displayError ? 'bg-red-200' : ''}`}
                       placeholder="Titanic et Inception"/>

                <div className="relative flex justify-center gap-5 mt-5">
                    <button onClick={() => changeGame(previousGameDate)} type="button"
                            className={'absolute left-0 bottom-0 text-3xl px-5 py-1'}>
                        {/*animate-ping duration-1000*/}
                        {previousGameDate && (
                            <PiArrowFatLineLeft/>
                        )}
                    </button>
                    <div className={'flex gap-1 items-center'}>
                        <button className={'button-shadow bg-red-600 text-white px-14 py-1'}>
                            {!answerLoading ? "Valider" :
                                <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                        </button>
                        <button type="button" onClick={handleHintRequest}
                                className={'font-oswald bg-white px-4 py-1'}>
                            {!hintLoading ? "Indice ?" :
                                <AiOutlineLoading3Quarters className="animate-spin text-2xl mx-auto"/>}
                        </button>
                    </div>
                    <button onClick={() => changeGame(nextGameDate)} type="button"
                            className={'absolute right-0 bottom-0 text-3xl px-5 py-1'}>
                        {nextGameDate && (
                            <PiArrowFatLineRight/>
                        )}
                    </button>
                </div>
            </form>
        </div>

        <div
            className={`absolute top-0 w-full h-full flex items-center ${!achievement && 'duration-500'} ${game.solution ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>
            <div className="w-full flex justify-center gap-5">
                <button onClick={() => changeGame(previousGameDate)} className={'button-shadow px-5 py-2'}>Image
                    précédente
                </button>
                <select disabled={!isAuthenticated} value={achievement?.difficulty}
                        onChange={(e) => submitDifficultyVote(e.target.value)}
                        name="difficulty" id="difficulty"
                        className={`border border-black rounded px-4 ${!isAuthenticated && 'cursor-not-allowed'}`}>
                    <option value="SIMPLE">SIMPLE</option>
                    <option value="TORDU">TORDU</option>
                    <option value="DIABOLIQUE">DIABOLIQUE</option>
                </select>
                <button onClick={() => changeGame(nextGameDate)} className={'button-shadow px-5 py-2'}>Image suivante
                </button>
            </div>
        </div>
    </div>
}

export default GameFooter
