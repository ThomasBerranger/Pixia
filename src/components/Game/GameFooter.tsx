import type {GameShowType} from "../../types/gameShowType.ts";
import type {GameSolutionType} from "../../types/gameSolutionType.ts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {useApi} from "../../hooks/useApi.tsx";

function GameFooter({game, gameSolution, setGameSolution}: {
    game: GameShowType,
    gameSolution: GameSolutionType,
    setGameSolution: React.Dispatch<React.SetStateAction<GameSolutionType>>
}) {
    const {apiCall} = useApi()

    const [hint, setHint] = useState<string>('')
    const [hintLoading, setHintLoading] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>('')
    const [answerLoading, setAnswerLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState(false)
    const [difficulty, setDifficulty] = useState<string>('')

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
                    setGameSolution(response)
                }
            } catch (error) {
                console.error('Erreur: ', error)
            } finally {
                setAnswerLoading(false)
            }
        }
    }

    useEffect(() => {
        if (difficulty) {
            console.log(difficulty)
        }
    }, [difficulty])

    const showErrorBriefly = () => {
        setDisplayError(true)

        setTimeout(() => {
            setDisplayError(false)
        }, 2000)
    }

    return <div className={'relative h-[20%]'}>
        <div
            className={`h-full flex items-center duration-500 ${!gameSolution.title ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>

            <form onSubmit={handleSolutionRequest} className={'w-full text-center'}>
                {hint && (<p className={'w-3/5 mx-auto mb-5'}>{hint}</p>)}

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
            className={`absolute top-0 w-full h-full flex items-center duration-500 ${gameSolution.title ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>
            <div className="w-full flex justify-center gap-5">
                <button className={'button-shadow px-5 py-2'}>Image précédente</button>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                        name="difficulty" id="difficulty" className={'border border-black rounded px-4'}>
                    <option value="EASY">SIMPLE</option>
                    <option value="MEDIUM">TORDU</option>
                    <option value="HARD">DIABOLIQUE</option>
                </select>
                <button className={'button-shadow px-5 py-2'}>Image suivante</button>
            </div>
        </div>
    </div>
}

export default GameFooter
