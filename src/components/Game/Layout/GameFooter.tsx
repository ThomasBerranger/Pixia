import {AiOutlineLoading3Quarters} from "react-icons/ai"
import React, {useState} from "react"
import {useApi} from "../../../hooks/useApi.tsx"
import {useAuth} from "../../../contexts/authContext.tsx"
import type {GameType} from "../../../types/gameType.ts"
import type {AchievementType} from "../../../types/achievementType.ts"
import {PiArrowFatLineLeft, PiArrowFatLineRight} from "react-icons/pi"
import {format} from "date-fns"

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

                    setAnswer('')
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
                const response = await apiCall(`games/daily?date=${date}&type=${game.type}`)

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

    return <div className={'relative h-[20%] flex items-center transition-opacity duration-100'}>

        {hint && (<div
            className={'position w-full flex justify-center absolute top-0 origin-bottom -translate-y-full bg-white bg-opacity-70'}>
            <p className={'w-full sm:w-3/4 xl:w-1/2 text-center'}>{hint}</p>
        </div>)}

        {!game.solution ?
            <form onSubmit={handleSolutionRequest}
                  className={'w-full text-center'}>

                <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                       className={`w-11/12 sm:w-2/3 text-center border rounded p-1 duration-300 ${displayError ? 'bg-red-200' : ''}`}
                       placeholder="Titanic et Inception"/>

                <div className={'flex justify-center gap-3 mt-3'}>
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
            </form>
            :
            <div className={'w-full text-center'}>
                <p>
                    J'ai trouvé cette énigme{' '}
                    <select disabled={!isAuthenticated} value={achievement?.difficulty}
                            onChange={(e) => submitDifficultyVote(e.target.value)}
                            name="difficulty" id="difficulty"
                            className="inline border-b-2 border-gray-800 bg-transparent cursor-pointer appearance-none">
                        <option value="SIMPLE">SIMPLE</option>
                        <option value="TORDU">TORDUE</option>
                        <option value="DIABOLIQUE">DIABOLIQUE</option>
                    </select>
                </p>
            </div>
        }

        <button onClick={() => changeGame(previousGameDate)} type="button"
                className={'absolute left-0 bottom-0 text-3xl p-2 z-20 hover:bg-gray-100'}>
            {previousGameDate && (
                <div className={'flex items-center'}><PiArrowFatLineLeft/><p
                    className={'text-sm font-oswald'}>{format(new Date(previousGameDate), 'dd/MM/yyyy')}</p>
                </div>
            )}
        </button>

        <button onClick={() => changeGame(nextGameDate)} type="button"
                className={'absolute right-0 bottom-0 text-3xl p-2 z-20 hover:bg-gray-100'}>
            {nextGameDate && (
                <div className={'flex items-center'}><p
                    className={'text-sm font-oswald'}>{format(new Date(nextGameDate), 'dd/MM/yyyy')}</p>
                    <PiArrowFatLineRight/></div>
            )}
        </button>
    </div>
}

export default GameFooter
