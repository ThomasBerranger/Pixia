import React, {useState} from "react"
import {CgSpinner} from "react-icons/cg"
import type {GameType} from "../../../types/gameType.ts"
import {Link} from "react-router-dom"

function GameFooter({game, onAnswerSubmit}: {
    game: GameType
    onAnswerSubmit: (answer: string) => Promise<boolean>
}) {
    const [answer, setAnswer] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState(false)

    async function handleSolutionRequest(e: React.FormEvent): Promise<void> {
        e.preventDefault()

        if (answer.length <= 5) {
            showErrorBriefly()
            return
        }

        setLoading(true)

        try {
            const success = await onAnswerSubmit(answer)

            if (success) {
                setAnswer('')
            } else {
                showErrorBriefly()
            }
        } catch (error) {
            console.error('Erreur: ', error)
            showErrorBriefly()
        } finally {
            setLoading(false)
        }
    }

    const showErrorBriefly = () => {
        setDisplayError(true)
        setTimeout(() => setDisplayError(false), 500)
    }

    return <>
        {game.solution ?
            <div className="max-w-3xl mx-auto w-full p-8 bg-retro-surface border-[6px] border-retro-secondary
            rounded-lg text-center relative animate-[border-flicker_4s_infinite]
            before:absolute before:inset-[10px] before:border-2 before:border-retro-accent before:opacity-50">
                <div className="text-xs text-retro-muted uppercase tracking-[2px] mb-2">
                    Bravo !
                </div>
                <div className=" text-md sm:text-2xl text-retro-accent font-righteous uppercase tracking-[3px]">
                    {game.solution}
                </div>
                <Link to="/user">
                    <button className="mt-3 btn-pulse">Connecte toi pour enregistrer tes parties</button>
                </Link>
            </div>
            :
            <form
                onSubmit={handleSolutionRequest}
                className="max-w-3xl mx-auto w-full grid grid-cols-1 sm:grid-cols-12 gap-4"
            >
                <input
                    type="text"
                    placeholder="Titanic et Inception"
                    autoComplete="off"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className={`flex-1 min-w-full sm:min-w-0 pl-2 py-2 bg-retro-surface/80 border-[3px] 
                    border-retro-primary text-retro-text outline-none transition-all duration-300 
                    shadow-[0_0_20px_rgba(255,0,110,0.3)] focus:border-retro-accent
                    focus:shadow-[0_0_40px_rgba(255,190,11,0.5)] placeholder:text-retro-muted 
                    col-span-full sm:col-span-8 ${displayError && "shake !border-retro-primary"}`}
                />

                <button
                    disabled={isLoading}
                    className="btn-primary py-2 w-full flex justify-center col-span-full sm:col-span-4"
                >
                    {isLoading ? (
                        <CgSpinner className="animate-spin" size={20}/>
                    ) : (
                        <>Vérifier</>
                    )}
                </button>
            </form>
        }
    </>
}

export default GameFooter