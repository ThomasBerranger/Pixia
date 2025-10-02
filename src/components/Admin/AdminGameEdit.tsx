import AdminHeader from "./Layout/AdminHeader.tsx"
import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import {useParams} from "react-router-dom"
import type {GameAdminType} from "../../types/gameAdminType.ts"
import * as React from "react";

function AdminGameEdit() {
    const {id} = useParams()
    const {apiCall} = useApi()

    const [game, setGame] = useState<GameAdminType>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(`games/${id}`)

                setGame(response)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault()

        try {
            const response = await apiCall(`games/${game?.id}`, {
                method: 'PATCH',
                body: JSON.stringify(game)
            })

            console.log(response);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-4/5 my-5 bg-white border border-black">
            <AdminHeader/>

            <form onSubmit={handleSubmit} className={'w-full p-4'}>

                <div className={'grid grid-cols-2 gap-3'}>
                    <div>
                        {game?.image ?
                            <img src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                 alt="AI created image"
                                 className=""/> :
                            <img className={'h-full mx-auto'}
                                 src="https://placehold.co/600x300/EEE/31343C?font=oswald&text=Chargement"
                                 alt="placegolder"/>
                        }
                    </div>

                    <div>
                        <div className={'relative'}>
                            <input
                                type="text" id="solution" value={game?.solution || ''}
                                onChange={(e) => setGame(prev => prev ? ({...prev, solution: e.target.value}) : prev)}
                                className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                            />
                            <label
                                htmlFor="solution"
                                className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                            >
                                Solution
                            </label>
                        </div>

                        <div className="relative mt-4">
                        <textarea
                            id="indice" rows={2} value={game?.hint || ''}
                            onChange={(e) => setGame(prev => prev ? ({...prev, hint: e.target.value}) : prev)}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5 -mb-2"
                        />
                            <label
                                htmlFor="indice"
                                className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                            >
                                Indice
                            </label>
                        </div>

                        <div className={'flex gap-3 mt-4'}>
                            <div className={'relative w-full'}>
                                <input
                                    type="date" id="date" value={game?.date.split('T')[0] || ''}
                                    onChange={(e) => setGame(prev => prev ? ({...prev, date: e.target.value}) : prev)}
                                    className="w-full border border-gray-300 rounded px-2.5 py-2.5"
                                />
                                <label
                                    htmlFor="date"
                                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                                >
                                    Date
                                </label>
                            </div>

                            <div className={'relative w-full'}>
                                <select value={game?.difficulty || ''} name="difficulty" id="difficulty"
                                        onChange={(e) => setGame(prev => prev ? ({
                                            ...prev,
                                            difficulty: e.target.value
                                        }) : prev)}
                                        className="w-full border border-gray-300 rounded px-2.5 py-2.5">
                                    <option value="SIMPLE">SIMPLE</option>
                                    <option value="TORDU">TORDUE</option>
                                    <option value="DIABOLIQUE">DIABOLIQUE</option>
                                </select>
                                <label
                                    htmlFor="difficulty"
                                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                                >
                                    Difficulté
                                </label>
                            </div>
                        </div>

                        <div className={'flex gap-3 mt-4'}>
                            <div className={'relative w-full'}>
                                <input
                                    disabled type="text" id="type" value={game?.type || ''}
                                    className="w-full border border-gray-300 rounded px-2.5 py-2.5 cursor-not-allowed"
                                />
                                <label
                                    htmlFor="type"
                                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                                >
                                    Type
                                </label>
                            </div>

                            <div className={'relative w-full'}>
                                <input
                                    disabled type="text" id="type" value={game?.author.email || ''}
                                    className="w-full border border-gray-300 rounded px-2.5 py-2.5 cursor-not-allowed"
                                />
                                <label
                                    htmlFor="type"
                                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                                >
                                    Autheur
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full mt-4">
                        <textarea
                            id="explanation" rows={4} value={game?.explanation || ''}
                            onChange={(e) => setGame(prev => prev ? ({...prev, explanation: e.target.value}) : prev)}
                            className="w-full border border-gray-300 rounded px-2.5 py-2.5 -mb-2"
                        />
                    <label
                        htmlFor="explanation"
                        className="absolute left-2 -top-2.5 bg-white px-1 text-sm"
                    >
                        Explication
                    </label>
                </div>

                <div className={'w-full flex justify-center'}>
                    <button className={'button-shadow py-1 px-4 mt-5'}>Enregistrer</button>
                </div>

            </form>
        </div>
    )
}

export default AdminGameEdit
