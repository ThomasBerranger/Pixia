import {useEffect, useRef, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import {useParams} from "react-router-dom"
import type {GameAdminType} from "../../types/Game/gameAdminType.ts"
import * as React from "react"
import {CgSpinner} from "react-icons/cg"

function AdminGameEdit() {
    const {id} = useParams()
    const {apiCall} = useApi()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [game, setGame] = useState<GameAdminType>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(`games/${id}`)
                setGame(response)
            } catch (error) {
                console.error("Erreur: ", error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault()
        setLoading(true)

        try {
            const response = await apiCall(`games/${game?.id}`, {
                method: "PATCH",
                body: JSON.stringify(game),
            })
            console.log(response)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleImageClick = () => fileInputRef.current?.click()

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append("image", file)

            const response = await apiCall(`games/${id}/image`, {
                method: "POST",
                body: formData,
            }, false)

            if (response) {
                setGame(prev => prev ? {...prev, image: response} : prev)
            }
        } catch (err) {
            console.error("Erreur upload image:", err)
        }
    }

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex py-10 px-[10px] sm:p-6">

            <div className="card-retro w-full">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div
                        onClick={handleImageClick}
                        className="cursor-pointer w-full flex justify-center p-2 bg-retro-muted/10 hover:bg-retro-muted/20 transition"
                    >
                        {game?.image ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                alt="AI created image"
                                className="max-h-80 border-[3px] border-retro-accent shadow-[0_0_30px_rgba(255,190,11,0.4)]"
                            />
                        ) : (
                            <img
                                className="h-60 mx-auto opacity-70"
                                src="https://placehold.co/600x300/EEE/31343C?font=oswald&text=Chargement"
                                alt="placeholder"
                            />
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{display: "none"}}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="solution" className="label-retro">Solution</label>
                            <input
                                id="solution"
                                type="text"
                                value={game?.solution || ""}
                                onChange={(e) => setGame(prev => prev ? ({...prev, solution: e.target.value}) : prev)}
                                className="input-retro"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="label-retro">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={game?.date?.split("T")[0] || ""}
                                onChange={(e) => setGame(prev => prev ? ({...prev, date: e.target.value}) : prev)}
                                className="input-retro"
                            />
                        </div>

                        <div>
                            <label htmlFor="indice" className="label-retro">Indice</label>
                            <textarea
                                id="indice"
                                rows={2}
                                value={game?.hint || ""}
                                onChange={(e) => setGame(prev => prev ? ({...prev, hint: e.target.value}) : prev)}
                                className="input-retro resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="label-retro">Difficulté</label>
                            <select
                                id="difficulty"
                                value={game?.difficulty || ""}
                                onChange={(e) => setGame(prev => prev ? ({...prev, difficulty: e.target.value}) : prev)}
                                className="input-retro"
                            >
                                <option value="SIMPLE">SIMPLE</option>
                                <option value="TORDU">TORDU</option>
                                <option value="DIABOLIQUE">DIABOLIQUE</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="type" className="label-retro">Type</label>
                            <input
                                disabled
                                id="type"
                                value={game?.type || ""}
                                className="input-retro cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label htmlFor="author" className="label-retro">Auteur</label>
                            <input
                                disabled
                                id="author"
                                value={game && `${game.author.email} AKA ${game.author.username}`}
                                className="input-retro cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-3d py-2.5 px-6 min-w-[160px]"
                        >
                            {loading ? (
                                <CgSpinner className="animate-spin mx-auto" size={22}/>
                            ) : (
                                "Enregistrer"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AdminGameEdit
