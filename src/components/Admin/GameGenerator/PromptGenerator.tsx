import * as React from "react"
import type {GameCreateType} from "../../../types/gameCreateType.ts";
import {useState} from "react";
import {useApi} from "../../../hooks/useApi.tsx";
import {CgSpinner} from "react-icons/cg";

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
                date: new Date().toISOString().split('T')[0]
            }));
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label-retro">
                        Quelle image souhaites-tu générer ?
                    </label>
                    <textarea
                        id="user-prompt"
                        value={prompt}
                        rows={3}
                        placeholder="Une fusion entre les univers de Jurassic Park et Avatar"
                        onChange={(e) => setPrompt(e.target.value)}
                        className="input-retro resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-3d py-2.5"
                >
                    {!loading ? "Générer le jeu" : <CgSpinner className="animate-spin mx-auto" size={20}/>}
                </button>
            </form>
        </div>

        <div className="space-y-4">
            {game.solution ? (
                <div>
                    <label className="label-retro">Solution</label>
                    <input
                        type="text"
                        id="solution"
                        value={game.solution}
                        onChange={(e) => setGame(prev => ({...prev, solution: e.target.value}))}
                        className="input-retro"
                    />
                </div>
            ) : (
                <div>
                    <label className="label-retro">Solution</label>
                    <div className="h-10 animate-pulse bg-retro-muted/20 border-[3px] border-retro-muted/30"></div>
                </div>
            )}

            {game.solution ? (
                <div>
                    <label className="label-retro">Date du jeu</label>
                    <input
                        type="date"
                        id="date"
                        value={game.date}
                        onChange={(e) => setGame(prev => ({...prev, date: e.target.value}))}
                        className="input-retro"
                    />
                </div>
            ) : (
                <div>
                    <label className="label-retro">Date du jeu</label>
                    <div className="h-10 animate-pulse bg-retro-muted/20 border-[3px] border-retro-muted/30"></div>
                </div>
            )}
        </div>

        {game.prompt ? (
            <div className="md:col-span-2">
                <label className="label-retro">Prompt</label>
                <textarea
                    id="prompt"
                    rows={3}
                    value={game.prompt}
                    onChange={(e) => setGame(prev => ({...prev, prompt: e.target.value}))}
                    className="input-retro resize-none"
                />
            </div>
        ) : (
            <div className="md:col-span-2">
                <label className="label-retro">Prompt</label>
                <div className="flex flex-wrap gap-2 animate-pulse">
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-2/12"></div>
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-6/12"></div>
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-3/12"></div>
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-4/12"></div>
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-5/12"></div>
                    <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-3/12"></div>
                </div>
            </div>
        )}
    </div>
}

export default PromptGenerator