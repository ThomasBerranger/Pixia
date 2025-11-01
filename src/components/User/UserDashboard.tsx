import {Link} from "react-router-dom"
import {useAuth} from '../../contexts/authContext.tsx'
import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {UserType} from "../../types/userType.ts"

function UserDashboard() {
    const {apiCall} = useApi()
    const {isAdmin, logout} = useAuth()

    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await apiCall('users/me')
                setUser(currentUser)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <>
        <section
            className="max-w-5xl mx-auto flex-wrap sm:flex items-center gap-8 mb-12 p-8 bg-retro-surface/80 border-[3px] border-retro-primary shadow-[4px_4px_0] shadow-retro-secondary">
            <div
                className="hidden w-24 h-24 bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent border-[3px] border-retro-accent sm:flex items-center justify-center text-4xl font-righteous shadow-[3px_3px_0] shadow-black/30">
                JD
            </div>
            <div>
                <h1 className="font-righteous text-3xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent mb-2">
                    JOHN_DOE
                </h1>
                <div className="flex-wrap sm:flex gap-3 text-retro-muted text-sm">
                    <div className="flex items-center gap-0.5">
                        🏆 <strong className="text-retro-accent">Niveau 8</strong>
                    </div>
                    <div className="flex items-center gap-0.5">
                        🎯 <strong className="text-retro-accent">Membre depuis 3 mois</strong>
                    </div>
                    <div className="flex items-center gap-0.5">
                        ⭐ <strong className="text-retro-accent">{user?.score} points</strong>
                    </div>
                </div>
            </div>
            {isAdmin() && (
                <Link to='/admin' className="btn-ghost px-6 py-3 ml-auto mt-2 sm:mt-0">
                    ⚙️ Admin
                </Link>
            )}
        </section>

        <h2 className="max-w-5xl mx-auto font-title text-retro-accent text-3xl mb-5">Badges</h2>

        <section
            className="max-w-5xl mx-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-12">
            <div className="flex gap-6">
                <div
                    className="bg-retro-surface/80 p-6 border-[3px] border-retro-muted text-center transition-all hover:border-retro-accent hover:shadow-[0_0_30px_rgba(255,190,11,0.4)] flex-shrink-0 w-40">
                    <div className="text-5xl mb-2">🏆</div>
                    <div className="font-righteous text-retro-accent text-sm uppercase">
                        First Win
                    </div>
                </div>

                <div
                    className="bg-retro-surface/80 p-6 border-[3px] border-retro-muted text-center transition-all hover:border-retro-accent hover:shadow-[0_0_30px_rgba(255,190,11,0.4)] flex-shrink-0 w-40">
                    <div className="text-5xl mb-2">🔥</div>
                    <div className="font-righteous text-retro-accent text-sm uppercase">
                        Hot streak
                    </div>
                </div>

                <div
                    className="bg-retro-surface/80 p-6 border-[3px] border-retro-muted text-center transition-all hover:border-retro-accent hover:shadow-[0_0_30px_rgba(255,190,11,0.4)] flex-shrink-0 w-40">
                    <div className="text-5xl mb-2">⭐</div>
                    <div className="font-righteous text-retro-accent text-sm uppercase">
                        100 parties
                    </div>
                </div>

                <div
                    className="bg-retro-surface/80 p-6 border-[3px] border-retro-muted text-center opacity-30 flex-shrink-0 w-40">
                    <div className="text-5xl mb-2">👑</div>
                    <div className="font-righteous text-retro-muted text-sm uppercase">
                        Maitre
                    </div>
                </div>

                <div
                    className="bg-retro-surface/80 p-6 border-[3px] border-retro-muted text-center opacity-30 flex-shrink-0 w-40">
                    <div className="text-5xl mb-2">💎</div>
                    <div className="font-righteous text-retro-muted text-sm uppercase">
                        Légendaire
                    </div>
                </div>
            </div>
        </section>

        <h2 className="max-w-5xl mx-auto font-title text-retro-accent text-3xl mb-5">Statistiques</h2>

        <section className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-6 mb-12">
            <div
                className="col-span-3 bg-retro-surface/80 p-8 border-[3px] border-retro-primary shadow-[4px_4px_0] shadow-retro-secondary transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0] hover:shadow-retro-accent hover:border-retro-accent">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                    Parties jouées
                </h3>
                <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                    142
                </div>
                <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                    Total games
                </div>
            </div>

            <div
                className="col-span-3 bg-retro-surface/80 p-8 border-[3px] border-retro-primary shadow-[4px_4px_0] shadow-retro-secondary transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0] hover:shadow-retro-accent hover:border-retro-accent">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                    Taux de réussite
                </h3>
                <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                    78%
                </div>
                <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                    Taux de réussite
                </div>
            </div>

            <div
                className="col-span-3 bg-retro-surface/80 p-8 border-[3px] border-retro-primary shadow-[4px_4px_0] shadow-retro-secondary transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0] hover:shadow-retro-accent hover:border-retro-accent">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                    Série actuelle
                </h3>
                <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                    7
                </div>
                <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                    Victoires
                </div>
            </div>

            <div
                className="col-span-3 bg-retro-surface/80 p-8 border-[3px] border-retro-primary shadow-[4px_4px_0] shadow-retro-secondary transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0] hover:shadow-retro-accent hover:border-retro-accent">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                    Meilleure série
                </h3>
                <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                    23
                </div>
                <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                    Victoires
                </div>
            </div>
        </section>

        <h2 className="max-w-5xl mx-auto font-title text-retro-accent text-3xl mb-5">Historique récent</h2>

        <section className="max-w-5xl mx-auto flex gap-6 mb-12">
            <div
                className="w-full bg-retro-surface/80 p-6 border-[3px] border-retro-muted flex justify-between items-center transition-all hover:border-retro-primary hover:shadow-[0_0_20px_rgba(255,0,110,0.3)]">
                <div>
                    <div className="text-retro-muted text-xs mb-1">02/11/2025</div>
                    <div className="font-righteous text-white text-lg">MULTIVERSE #142</div>
                </div>
                <span
                    className="bg-retro-accent text-retro-bg px-3 py-1 text-xs font-righteous uppercase border-2 border-retro-bg">✓ Réussi</span>
            </div>
        </section>

        <section className="max-w-5xl mx-auto">
            <div className="p-8 bg-retro-surface/80 border-[3px] border-retro-primary">
                <h2 className="font-title text-2xl text-retro-primary mb-6 uppercase">
                    DANGER ZONE
                </h2>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-8">
                    <div className="col-span-6 mb-6 pb-6">
                        <h3 className="font-righteous text-retro-accent text-sm uppercase mb-2">
                            Changer l'email
                        </h3>
                        <div className="flex-wrap sm:flex gap-4">
                            <input
                                type="email"
                                placeholder={user?.email}
                                className="flex-1 px-4 py-3 bg-retro-surface border-[3px] border-retro-muted text-retro-text outline-none transition-all focus:border-retro-primary placeholder:text-retro-muted"
                            />
                            <button
                                className="btn-primary px-8 py-3 mt-2 sm:mt-0">
                                Modifier
                            </button>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <h3 className="font-righteous text-retro-primary text-sm uppercase mb-2">
                            Supprimer le compte
                        </h3>
                        <button
                            className="px-6 py-3 btn-ghost mb-2">
                            ⚠️ Supprimer le compte
                        </button>
                        <p className="text-retro-muted text-sm mb-4">
                            Cette action est irréversible.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default UserDashboard
