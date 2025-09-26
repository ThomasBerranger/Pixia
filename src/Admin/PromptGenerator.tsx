import * as React from "react"
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import type {GameCreateType} from "../types/gameCreateType.ts";
import {useState} from "react";
import {useApi} from "../hooks/useApi.tsx";

function PromptGenerator({game, setGame}: { game: GameCreateType, setGame: React.Dispatch<React.SetStateAction<GameCreateType>> }) {
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
        <div className="bg-white rounded-t p-4">

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
                        <div className={'h-4 bg-gray-300 rounded w-3/4'}></div>
                    }

                    <p className={'mt-2'}>Indice :</p>
                    {game.hint ?
                        <p className={'text-sm w-full bg-white text-gray-500'}>{game.hint}</p> :
                        <div className={'w-full'}>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-full'}></div>
                            <div className={'h-4 mt-0.5 bg-gray-300 rounded w-1/4'}></div>
                        </div>
                    }
                </div>


                <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
                    <div className="flex animate-pulse space-x-4">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 rounded bg-gray-200"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                    <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                </div>
                                <div className="h-2 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className={'text-md mt-4'}>Prompt :</p>
            {game.prompt ?
                <p className={'w-full text-sm bg-white text-gray-500 p-0.5'}>{game.prompt}</p> :
                <div className={'w-full'}>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-full'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-full'}></div>
                    <div className={'h-4 mt-0.5 bg-gray-300 rounded w-1/4'}></div>
                </div>
            }
        </div>
    </>
}

export default PromptGenerator
