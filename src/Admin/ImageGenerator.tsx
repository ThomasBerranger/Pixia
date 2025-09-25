import {useState} from "react"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {useApi} from "../hooks/useApi.tsx"
import type {GameType} from "../types/gameType.ts"
import * as React from "react"

function ImageGenerator({game, setGame}: { game: GameType, setGame: React.Dispatch<React.SetStateAction<GameType>> }) {
    const {apiCall} = useApi()

    const [loading, setLoading] = useState<boolean>(false)

    async function handleOpenAIImage(): Promise<void> {
        setLoading(true)

        try {
            const response = await apiCall('open-api/generate-image', {
                method: 'POST',
                body: JSON.stringify({"prompt": game.prompt})
            })

            setGame((prevGame: GameType): GameType => ({
                ...prevGame,
                image: response || undefined,
            }));
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full bg-white rounded-b text-center pb-5">

            {game.prompt &&
                <button disabled={loading} className={'w-3/5 button-shadow text-white bg-red-600 p-1'} onClick={handleOpenAIImage}>
                    {loading ?
                        <AiOutlineLoading3Quarters className="animate-spin text-2xl p-1 mx-auto"/>
                        : 'Utiliser ce prompt pour générer une image'}
                </button>
            }

            {game.image &&
                <div className="w-full flex justify-center mt-5">
                    <img src={game.image} alt="Test" className="max-h-72"/>
                </div>}
        </div>
    )
}

export default ImageGenerator