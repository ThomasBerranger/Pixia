import * as React from "react"
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import type {GameCreateType} from "../../types/gameCreateType.ts";
import {useState} from "react";
import {useApi} from "../../hooks/useApi.tsx";

function PromptGenerator({game, setGame}: {
    game: GameCreateType,
    setGame: React.Dispatch<React.SetStateAction<GameCreateType>>
}) {
    const {apiCall} = useApi()

    const [loading, setLoading] = useState<boolean>(false)
    const [prompt, setPrompt] = useState<string>('')

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault()

        if (prompt.length < 5) return

        setLoading(true)

        try {
            const response = await apiCall('open-api/generate-content', {
                method: 'POST',
                body: JSON.stringify({prompt})
            })

            setGame((prevGame: GameCreateType): GameCreateType => ({
                ...prevGame,
                prompt: response.match(/Prompt:\s*(.*?)\s*Solution/)?.[1] || undefined,
                solution: response.match(/Solution:\s*(.*?)\s*Hint/)?.[1] || undefined,
                hint: response.match(/Hint:\s*(.*?)\s*Explanation/)?.[1] || undefined,
                explanation: response.match(/Explanation:\s*(.*)/)?.[1] || undefined,
            }));
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return <div className="w-full p-3">
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

            <div className={'w-full'}>
                <form onSubmit={handleSubmit}>

                    <div className="relative">
                            <textarea
                                id="user-prompt" value={prompt} rows={2}
                                placeholder={'Une fusion entre les univers de Jurassic Park et Avatar'}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                            />
                        <label
                            htmlFor="name"
                            className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                        >
                            Quelle image souhaites tu générer ?
                        </label>
                    </div>

                    <div className={'text-center'}>
                        <button className={'w-4/5 button-shadow md:mt-1 p-1'}>
                            {!loading ? "Générer le jeu" :
                                <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                        </button>
                    </div>

                </form>
            </div>

            <div>
                {game.solution ?
                    <div className="relative">
                        <input
                            type="text" id="solution" value={game.solution}
                            onChange={(e) => setGame(prev => ({...prev, solution: e.target.value}))}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                        />
                        <label
                            htmlFor="solution"
                            className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                        >
                            Solution
                        </label>
                    </div> : <div>
                        <label htmlFor="solution">Solution</label>
                        <div className={'h-5 animate-pulse bg-gray-300 rounded w-3/4'}></div>
                    </div>
                }

                {game.solution ?
                    <div className="relative mt-4">
                        <input
                            type="date"
                            id="date"
                            value={game.date || new Date().toISOString().split('T')[0]}
                            onChange={(e) => setGame(prev => ({...prev, date: e.target.value}))}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5 focus:outline-none focus:border-gray-300"
                        />
                        <label
                            htmlFor="date"
                            className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600"
                        >
                            Date du jeu
                        </label>
                    </div> : <div className={'mt-4'}>
                        <label htmlFor="solution">Date du jeu</label>
                        <div className={'h-5 animate-pulse bg-gray-300 rounded w-3/5'}></div>
                    </div>
                }
            </div>
        </div>

        {game.hint ? <div className="relative mt-4">
                        <textarea
                            id="indice" rows={2} value={game.hint}
                            onChange={(e) => setGame(prev => ({...prev, hint: e.target.value}))}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                        />
            <label
                htmlFor="indice"
                className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
            >
                Indice
            </label>
        </div> : <div className="mt-2">
            <label htmlFor="solution">Indice</label>
            <div className={'w-full flex flex-wrap gap-1 animate-pulse'}>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-6/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
            </div>
        </div>
        }

        {game.prompt ? <div className="relative mt-3">
                        <textarea
                            id="prompt" rows={3} value={game.prompt}
                            onChange={(e) => setGame(prev => ({...prev, prompt: e.target.value}))}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                        />
            <label
                htmlFor="prompt"
                className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
            >
                Prompt
            </label>
        </div> : <div className={'mt-2'}>
            <label htmlFor="prompt">Prompt</label>
            <div className={'w-full flex flex-wrap gap-1 animate-pulse'}>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-6/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-3/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-4/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-1/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-4/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-3/12'}></div>
                <div className={'h-5 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
            </div>
        </div>
        }
    </div>
}

export default PromptGenerator
