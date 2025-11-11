import React, {useState} from "react"
import {CgSpinner} from "react-icons/cg"
import type {GameType} from "../../../types/gameType.ts"
import {Link} from "react-router-dom"
import {useAuth} from "../../../contexts/authContext.tsx"
import type {AnswerResult} from "../../../types/answerResultType.ts"

function GameFooter({game, onAnswerSubmit}: {
    game: GameType
    onAnswerSubmit: (answer: string) => Promise<AnswerResult>
}) {
    const {isAuthenticated} = useAuth()

    const [answer, setAnswer] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState<string | undefined>('')

    async function handleSolutionRequest(e: React.FormEvent): Promise<void> {
        e.preventDefault()

        if (answer.length <= 5) {
            showErrorBriefly()
            return
        }

        setLoading(true)

        try {
            const response: AnswerResult = await onAnswerSubmit(answer)

            if (response.success) {
                setAnswer('')
            } else {

                if (response.rateLimited) {
                    setDisplayErrorMessage(response.errorMessage)
                }

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
        {game.solution && !isAuthenticated &&
            <Link to="/me" className="text-center sm:mx-auto py-2 sm:py-5 sm:px-5 mb-5 btn-pulse text-[0.5rem] sm:text-lg">
                Connecte toi pour enregistrer tes réponses
            </Link>
        }

        {game.solution ?
            <div className="max-w-3xl mx-auto p-8 bg-retro-surface border-[6px] border-retro-secondary
            rounded-lg text-center relative animate-[border-flicker_4s_infinite]
            before:absolute before:inset-[10px] before:border-2 before:border-retro-accent before:opacity-50">
                <div className="text-[0.7rem] sm:text-xs text-retro-muted uppercase tracking-[2px] mb-2">
                    Bravo !
                </div>
                <div
                    className="text-sm sm:text-md sm:text-2xl text-retro-accent font-righteous uppercase tracking-[3px]">
                    {game.solution}
                </div>
            </div>
            :
            <form
                onSubmit={handleSolutionRequest}
                className="max-w-3xl mx-auto w-full grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
            >
                <div className="col-span-full sm:col-span-9">
                    <input
                        type="text"
                        placeholder="Titanic et Inception"
                        autoComplete="off"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className={`flex-1 w-full pl-2 py-2 bg-retro-surface/80 border-[3px] 
                    border-retro-primary text-retro-text outline-none transition-all duration-300 
                    shadow-[0_0_20px_rgba(255,0,110,0.3)] focus:border-retro-accent
                    focus:shadow-[0_0_40px_rgba(255,190,11,0.5)] placeholder:text-retro-muted 
                    ${displayError && "shake !border-retro-primary"}`}
                    />

                    {displayErrorMessage &&
                        <p className="text-sm">Trop de tentatives, fais une petite pause ou essaie une autre image.</p>
                    }
                </div>

                <button
                    disabled={isLoading}
                    className="btn-primary py-2 w-full flex justify-center col-span-full sm:col-span-3"
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