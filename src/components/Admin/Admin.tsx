import {useState} from 'react'
import PromptGenerator from "./PromptGenerator.tsx"
import type {GameCreateType} from "../../types/gameCreateType.ts"
import ImageGenerator from "./ImageGenerator.tsx"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import * as React from "react"
import {useApi} from "../../hooks/useApi.tsx"

function Admin() {
    const {apiCall} = useApi()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [game, setGame] = useState<GameCreateType>({
        prompt: undefined,
        solution: undefined,
        explanation: undefined,
        hint: undefined,
        image: undefined,
        date: undefined,
    })

    async function handleGameSubmit(): Promise<void> {
        setLoading(true)

        try {
            const response = await apiCall('games', {
                method: 'POST',
                body: JSON.stringify(game)
            })

            setGame((prevGame: GameCreateType): GameCreateType => ({
                ...prevGame,
                image: response.image,
            }));
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-4/5 my-5 bg-white border border-black">
            <PromptGenerator game={game} setGame={setGame}/>
            <ImageGenerator game={game} setGame={setGame}/>

            {game.image && (
                <div className={'flex justify-center align-middle gap-5 bg-white pb-5 text-xl'}>
                    <input type={"date"} value={game.date || ''} onChange={(e) => setGame(prev => ({
                        ...prev,
                        date: e.target.value
                    }))}/>

                    <button disabled={loading || !game.date} className={'w-1/5 button-shadow text-white bg-red-600 p-1'}
                            onClick={handleGameSubmit}>
                        {loading ?
                            <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>
                            : 'Sauvegarder ce jeu'}
                    </button>
                </div>)}
        </div>
    )
}

export default Admin
