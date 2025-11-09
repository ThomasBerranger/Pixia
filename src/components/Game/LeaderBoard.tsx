import {useEffect} from "react"
import {useApi} from "../../hooks/useApi.tsx"

function LeaderBoard() {
    const {apiCall} = useApi()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('games/leaderboard')

                console.log(response.data);
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <section className="max-w-3xl mx-auto pt-0.5 sm:pt-5 pb-10">

        <div className="hidden sm:grid grid-cols-3 gap-8 items-end">
            <div className="card-primary-hover text-center flex flex-col justify-center py-4 px-0">
                <p className="text-4xl mb-1.5">🥈</p>
                <p className="font-righteous font-light text-xl mb-1 truncate">Thomas berranger</p>
                <p className="font-title text-2xl text-retro-accent">1205</p>
            </div>
            <div className="card-primary-hover border-retro-accent text-center py-8 px-0 flex flex-col justify-center">
                <p className="text-4xl mb-1.5">🏆</p>
                <p className="font-righteous font-light text-xl mb-1 truncate">John Doe</p>
                <p className="font-title text-2xl text-retro-accent">1205</p>
            </div>
            <div className="card-primary-hover text-center flex flex-col justify-center py-2 px-0">
                <p className="text-4xl mb-1.5">🥉</p>
                <p className="font-righteous font-light text-xl mb-1 truncate">John Doe</p>
                <p className="font-title text-2xl text-retro-accent">1205</p>
            </div>
        </div>

        <div className="sm:hidden card-primary border-retro-accent p-0 my-5 mx-5 sm:mx-0">
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">🏆</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
        </div>

        <div className="sm:hidden card-primary p-0 my-5 mx-5 sm:mx-0">
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">🥈</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">🥉</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
        </div>

        <div className="card-retro p-0 my-5 mx-5 sm:mx-0">
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">4</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">5</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
            <div className="border-retro-primary w-full flex gap-2 items-center px-5 py-2.5 bg-retro-accent bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">6</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">7</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
            <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                <p className="font-title font-bold text-retro-primary text-3xl">8</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
        </div>

        <div className="card-retro-hover-retro-accent border-retro-primary p-0 my-5 mx-5 sm:mx-0">
            <div className="w-full flex gap-2 items-center px-5 py-2.5">
                <p className="font-title font-bold text-retro-primary text-3xl">12</p>
                <div className="flex-1 text-left px-4 font-righteous font-light">
                    <p className="font-righteous font-light text-lg truncate">John Doe</p>
                    <div className="hidden sm:flex gap-2 items-center text-xs text-retro-muted">
                        <p>5🔥</p>
                        <p>•</p>
                        <p><span className="tracking-wider">3/5</span> parties gagnées</p>
                    </div>
                </div>
                <p className="font-title text-xl text-retro-accent">1205</p>
            </div>
        </div>

    </section>
}

export default LeaderBoard