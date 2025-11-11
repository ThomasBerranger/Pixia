import type {GameCreateType} from "../../../types/Game/gameCreateType.ts"
import PromptGenerator from "./PromptGenerator.tsx"
import ImageGenerator from "./ImageGenerator.tsx"
import {useApi} from "../../../hooks/useApi.tsx"
import React, {useState} from "react"
import {CgSpinner} from "react-icons/cg";

function AdminUserDashboard() {
    const {apiCall} = useApi()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [game, setGame] = useState<GameCreateType>({
        prompt: undefined,
        solution: undefined,
        hint: undefined,
        image: undefined,
        imageUrl: undefined,
        date: undefined,
    })

    async function handleGameSubmit(): Promise<void> {
        setLoading(true)

        try {
            await apiCall('games', {
                method: 'POST',
                body: JSON.stringify(game)
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex py-10 px-[10px] sm:p-6">

            <div className="card-retro w-full">
                <PromptGenerator game={game} setGame={setGame}/>
                <ImageGenerator game={game} setGame={setGame} onGameSubmit={handleGameSubmit}/>

                {game.imageUrl && (
                    <div className="flex justify-center mt-5">
                        <button disabled={loading || !game.date}
                                className="w-3/5 btn-pulse text-white bg-red-600 py-2.5"
                                onClick={handleGameSubmit}>
                            {loading ?
                                <CgSpinner className="animate-spin mx-auto" size={20}/>
                                : 'Enregistrer ce jeu'}
                        </button>
                    </div>)}
            </div>

        </section>
    )
}

export default AdminUserDashboard
