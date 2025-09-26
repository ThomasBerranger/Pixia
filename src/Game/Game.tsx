import React, {useEffect, useState} from "react"
import {useApi} from "../hooks/useApi.tsx"
import type {GameShowType} from "../types/gameShowType.ts"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import Win from "./Win.tsx";
import type {GameSolutionType} from "../types/gameSolutionType.ts"

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

    const [hint, setHint] = useState<string>('')
    const [hintLoading, setHintLoading] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>('')
    const [answerLoading, setAnswerLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState(false)

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

    async function handleAnswerRequest(e: React.FormEvent): Promise<void> {
        e.preventDefault()

        if (answer.length <= 5) {
            showErrorBriefly()
        } else {
            setAnswerLoading(true)

            try {
                const response = await apiCall(`games/${game.id}/verification`, {
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

    const showErrorBriefly = () => {
        setDisplayError(true)

        setTimeout(() => {
            setDisplayError(false)
        }, 2000)
    }

    return (
        <div className="z-10 relative w-10/12 md:w-2/3 border border-black bg-white rounded p-5">

            <button disabled
                    className={'absolute top-0 right-0 bg-green-200 border-l border-b border-black rounded-bl px-5 py-2'}>
                {game.difficulty}
            </button>

            <h1 className={'title text-4xl text-center'}>MultiVeRsE</h1>
            <p className={'text-center font-extralight text-xl'}>Retrouvez les deux univers mélangés dans cette
                image</p>

            {game.image ? (
                <img src={`${import.meta.env.VITE_API_URL}${game.image}`} alt={game.difficulty}
                     className={'h-80 mx-auto mt-4'}/>
            ) : (
                <img className={'mx-auto mt-4'}
                     src="https://placehold.co/400x200/EEE/31343C?font=oswald&text=Chargement"
                     alt="placegolder"/>
            )
            }

            <form onSubmit={handleAnswerRequest} className={'w-full text-center mt-5'}>
                {hint && (<p className={'w-3/4 mx-auto mb-5'}>{hint}</p>)}

                <input value={answer} onChange={(e) => setAnswer(e.target.value)}
                       className={`w-2/3 text-center border rounded text-xl font-light p-1 duration-300 ${displayError ? 'bg-red-200' : ''}`}
                       placeholder="Titanic et Inception"/>

                <div className="flex justify-center gap-5 mt-5">
                    <button className={'button-shadow bg-red-600 text-white px-10 py-1'}>
                        {!answerLoading ? "Valider" :
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                    </button>
                    <button type="button" onClick={handleHintRequest} className={'button-shadow bg-white px-4 py-1'}>
                        {!hintLoading ? "Indice ?" :
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                    </button>
                </div>
            </form>

            <Win game={game} gameSolution={gameSolution} />
        </div>
    )
}

export default Game
