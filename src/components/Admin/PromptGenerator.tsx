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
                prompt: response.match(/Prompt:\s*(.*?)\s*Title/)?.[1] || undefined,
                title: response.match(/Title:\s*(.*?)\s*Hint/)?.[1] || undefined,
                hint: response.match(/Hint:\s*(.*?)\s*Explanation/)?.[1] || undefined,
                explanation: response.match(/Explanation:\s*(.*)/)?.[1] || undefined,
            }));
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return <>
        <div className="w-full p-4">

            <h1 className={'text-2xl mb-3 text-center'}>Création de contenu</h1>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>

                <div className={'w-full'}>
                    <form onSubmit={handleSubmit}>

                    <textarea className={'font-light w-full border border-black rounded px-2 py-1'}
                              placeholder={"Mélange les univers de deux films connus"} rows={3}
                              value={prompt} onChange={(e) => setPrompt(e.target.value)}/>

                        <div className={'text-center'}>
                            <button className={'w-4/5 button-shadow my-0.5 p-0.5'}>
                                {!loading ? "Générer le jeu" :
                                    <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>}
                            </button>
                        </div>

                    </form>
                </div>

                <div>
                    <p className={'mt-2'}>Solution :</p>
                    {game.title ?
                        <p className={'text-sm w-full bg-white text-gray-500'}>{game.title}</p> :
                        <div className={'h-4 animate-pulse bg-gray-300 rounded w-3/4'}></div>
                    }

                    <p className={'mt-2'}>Indice :</p>
                    {game.hint ?
                        <p className={'text-sm w-full bg-white text-gray-500'}>{game.hint}</p> :
                        <div className={'w-full flex flex-wrap gap-1 animate-pulse'}>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-6/12'}></div>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
                        </div>
                    }
                </div>
            </div>

            <p className={'text-md mt-1'}>Prompt :</p>
            {game.prompt ?
                <p className={'w-full text-sm bg-white text-gray-500 p-0.5'}>{game.prompt}</p> :
                <div className={'w-full flex flex-wrap gap-1 animate-pulse'}>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-6/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-3/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-4/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-3/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-2/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-3/12'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-5/12'}></div>
                </div>
            }
        </div>
    </>
}

export default PromptGenerator
