import {AiOutlineLoading3Quarters} from "react-icons/ai"
import React, {useState} from "react"
import {useApi} from "../../../hooks/useApi.tsx"
import {useAuth} from "../../../contexts/authContext.tsx"
import type {GameType} from "../../../types/gameType.ts"
import type {HistoryType} from "../../../types/historyType.ts"

function GameFooter({game, setGame, history, setHistory}: {
    game: GameType,
    setGame: React.Dispatch<React.SetStateAction<GameType>>,
    history: HistoryType,
    setHistory: React.Dispatch<React.SetStateAction<HistoryType>>,
}) {
    const {isAuthenticated} = useAuth()
    const {apiCall} = useApi()

    const [hint, setHint] = useState<string>('')
    const [hintLoading, setHintLoading] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>('')
    const [answerLoading, setAnswerLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState(false)

    async function handleHintRequest(): Promise<void> {
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

            setHistory(prev => ({...prev, ...response}));
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

    return <div className={'relative h-[20%]'}>
        {hint && (<div
            className={'position w-full flex justify-center absolute top-0 origin-bottom -translate-y-full bg-white bg-opacity-70'}>
            <p className={'w-full sm:w-3/4 xl:w-1/2 text-center'}>{hint}</p>
        </div>)}

        <div
            className={`h-full flex items-center ${!history && 'duration-500'} ${!game.solution ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>

            <form onSubmit={handleSolutionRequest} className={'w-full text-center'}>

                <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                       className={`w-2/3 text-center border rounded p-1 duration-300 ${displayError ? 'bg-red-200' : ''}`}
                       placeholder="Titanic et Inception"/>

                <div className="flex justify-center gap-5 mt-5">
                    <button className={'button-shadow bg-red-600 text-white px-10 py-1'}>
                        {!answerLoading ? "Valider" :
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                    </button>
                    <button type="button" onClick={handleHintRequest}
                            className={'button-shadow bg-white px-4 py-1'}>
                        {!hintLoading ? "Indice ?" :
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                    </button>
                </div>
            </form>
        </div>

        <div
            className={`absolute top-0 w-full h-full flex items-center ${!history && 'duration-500'} ${game.solution ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>
            <div className="w-full flex justify-center gap-5">
                <button className={'button-shadow px-5 py-2'}>Image précédente</button>
                <select disabled={!isAuthenticated} value={history?.difficulty} onChange={(e) => submitDifficultyVote(e.target.value)}
                        name="difficulty" id="difficulty" className={`border border-black rounded px-4 ${!isAuthenticated && 'cursor-not-allowed'}`}>
                    <option value="SIMPLE">SIMPLE</option>
                    <option value="TORDU">TORDU</option>
                    <option value="DIABOLIQUE">DIABOLIQUE</option>
                </select>
                <button className={'button-shadow px-5 py-2'}>Image suivante</button>
            </div>
        </div>
    </div>
}

export default GameFooter
