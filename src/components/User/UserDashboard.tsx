import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.tsx';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MdConstruction } from 'react-icons/md';
import { ROUTES } from '../../constants/routes.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import type { UserDashboardType } from '../../types/User/userDashboardType.ts';
import type { AchievementType } from '../../types/Achievement/achievementType.ts';

function UserDashboard() {
    const { apiCall } = useApi();
    const { isAdmin, logout } = useAuth();

    const [userDashboard, setUserDashboard] = useState<
        UserDashboardType | undefined
    >();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDashboard: UserDashboardType = await apiCall(
                    ENDPOINTS.ME
                );

                setUserDashboard(userDashboard);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, [apiCall]);

    return (
        <>
            <section className="flex-wrap sm:flex items-center gap-8 mb-12 card-primary">
                <div className="hidden uppercase w-24 h-24 bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent border-[3px] border-retro-accent sm:flex items-center justify-center text-4xl font-righteous shadow-[3px_3px_0] shadow-black/30">
                    {userDashboard
                        ? userDashboard.user.username[0] +
                          userDashboard.user.username.slice(-1)
                        : 'XX'}
                </div>
                <div>
                    <h1 className="font-righteous text-3xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent mb-2">
                        {userDashboard ? userDashboard.user.username : 'Xxx'}
                    </h1>
                    <div className="flex-wrap sm:flex gap-3 text-retro-muted text-sm mb-6 sm:mb-0">
                        <div className="flex items-center gap-0.5">
                            ⭐{' '}
                            <strong className="text-retro-accent">
                                {userDashboard ? userDashboard.user.score : 0}{' '}
                                points
                            </strong>
                        </div>
                        <div className="flex items-center gap-0.5">
                            🎯{' '}
                            <strong className="text-retro-accent">
                                Membre depuis{' '}
                                {formatDistanceToNow(
                                    new Date(
                                        userDashboard
                                            ? userDashboard.user.createdAt
                                            : Date.now()
                                    ),
                                    { locale: fr }
                                )}
                            </strong>
                        </div>
                    </div>
                </div>
                {isAdmin() && (
                    <Link
                        to={ROUTES.ADMIN}
                        className="btn-ghost px-6 py-3 sm:ml-auto sm:mt-0"
                    >
                        ⚙️ Admin
                    </Link>
                )}
            </section>

            <h2 className="font-title text-retro-accent text-3xl mb-5 flex items-center">
                Badges
                <div className="text-xs font-righteous badge-yellow px-2 py-1 ml-2 flex items-center">
                    <MdConstruction className="mr-0.5" size={14} /> En cours de
                    dev
                </div>
            </h2>

            <section className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-12">
                <div className="flex gap-6">
                    <div className="w-36 card-retro-hover-retro-accent flex-shrink-0">
                        <div className="text-5xl mb-2">⏱️</div>
                        <div className="font-righteous text-retro-accent text-sm uppercase">
                            beta gamer
                        </div>
                    </div>

                    <div className="w-36 card-retro-hover-retro-accent flex-shrink-0">
                        <div className="text-5xl mb-2">🏆</div>
                        <div className="font-righteous text-retro-accent text-sm uppercase">
                            First Win
                        </div>
                    </div>

                    <div className="w-36 card-retro opacity-30 flex-shrink-0">
                        <div className="text-5xl mb-2">🎨️</div>
                        <div className="font-righteous text-retro-accent text-sm uppercase">
                            Créateur
                        </div>
                    </div>

                    <div className="w-36 card-retro opacity-30 flex-shrink-0">
                        <div className="text-5xl mb-2">🔥</div>
                        <div className="font-righteous text-retro-accent text-sm uppercase">
                            Hot streak
                        </div>
                    </div>

                    <div className="w-36 card-retro opacity-30 flex-shrink-0">
                        <div className="text-5xl mb-2">⭐</div>
                        <div className="font-righteous text-retro-accent text-sm uppercase">
                            100 parties
                        </div>
                    </div>

                    <div className="w-36 card-retro opacity-30 flex-shrink-0">
                        <div className="text-5xl mb-2">👑</div>
                        <div className="font-righteous text-retro-muted text-sm uppercase">
                            Maitre
                        </div>
                    </div>

                    <div className="w-36 card-retro opacity-30 flex-shrink-0">
                        <div className="text-5xl mb-2">💎</div>
                        <div className="font-righteous text-retro-muted text-sm uppercase">
                            Légendaire
                        </div>
                    </div>
                </div>
            </section>

            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Statistiques
            </h2>

            <section className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-6 mb-12">
                <div className="col-span-3 card-primary-hover">
                    <div className="text-4xl mb-4">🎮</div>
                    <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                        Parties jouées
                    </h3>
                    <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {userDashboard && userDashboard.success}
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        {userDashboard &&
                            `Il t'en reste ${userDashboard.games - userDashboard.success}`}
                    </div>
                </div>

                <div className="col-span-3 card-primary-hover">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                        Taux de réussite
                    </h3>
                    <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {userDashboard &&
                            (
                                (userDashboard.success / userDashboard.games) *
                                100
                            ).toFixed(0)}
                        %
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        Peut mieux faire
                    </div>
                </div>

                <div className="col-span-3 card-primary-hover">
                    <div className="text-4xl mb-4">🔝</div>
                    <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                        Classement
                    </h3>
                    <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {userDashboard && userDashboard.rank}
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        Point faible, trop fort.e
                    </div>
                </div>

                <div className="col-span-3 card-primary opacity-30 cursor-not-allowed">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-righteous text-retro-accent text-lg uppercase mb-2">
                        Meilleure série
                    </h3>
                    <div className="text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        15
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        Victoires
                    </div>
                </div>
            </section>

            {userDashboard && userDashboard.history.length > 0 && (
                <>
                    <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                        Historique récent
                    </h2>

                    <section className="mb-12">
                        {userDashboard.history.map(
                            (achievement: AchievementType) => (
                                <div
                                    key={achievement.id}
                                    className="card-retro-hover-primary text-left flex gap-2 justify-between items-center mb-3"
                                >
                                    <div>
                                        <div className="text-retro-muted text-xs mb-1 capitalize">
                                            {format(
                                                new Date(achievement.date),
                                                'EEEE dd yyyy',
                                                { locale: fr }
                                            )}
                                        </div>
                                        <div className="font-righteous text-white text-lg">
                                            {achievement.game.solution}
                                        </div>
                                    </div>
                                    <span className="bg-retro-accent text-retro-bg px-3 py-1 text-xs font-righteous uppercase border-2 border-retro-bg">
                                        ✓ Réussi
                                    </span>
                                </div>
                            )
                        )}
                    </section>
                </>
            )}

            <section>
                <div className="p-8 bg-retro-surface/80 border-[3px] border-retro-primary">
                    <h2 className="font-title text-2xl text-retro-primary mb-6 uppercase">
                        DANGER ZONE
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-6">
                        <div className="sm:col-span-2">
                            <h3 className="font-righteous text-retro-accent text-sm uppercase mb-2">
                                Changer de pseudo
                            </h3>
                            <input
                                type="email"
                                placeholder={
                                    userDashboard && userDashboard.user.username
                                }
                                className="w-full px-4 py-3 bg-retro-surface border-[3px] border-retro-muted text-retro-text outline-none transition-all focus:border-retro-primary placeholder:text-retro-muted"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <h3 className="font-righteous text-retro-accent text-sm uppercase mb-2">
                                Changer d'email
                            </h3>
                            <div className="flex-wrap sm:flex gap-4">
                                <input
                                    type="email"
                                    placeholder={
                                        userDashboard &&
                                        userDashboard.user.email
                                    }
                                    className="w-full px-4 py-3 bg-retro-surface border-[3px] border-retro-muted text-retro-text outline-none transition-all focus:border-retro-primary placeholder:text-retro-muted"
                                />
                            </div>
                        </div>

                        <button className="btn-disabled px-0 py-3.5 mt-1 sm:mt-7 w-full">
                            {/*btn-primary*/}
                            Modifier
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                        <div>
                            <h3 className="font-righteous text-retro-primary text-sm uppercase mb-2">
                                Se déconnecter
                            </h3>
                            <button
                                className="w-full px-6 py-3 btn-neon"
                                onClick={logout}
                            >
                                👋 A bientôt
                            </button>
                        </div>

                        <div>
                            <h3 className="font-righteous text-retro-primary text-sm uppercase mb-2">
                                Supprimer le compte
                            </h3>
                            <button className="px-6 py-3 btn-ghost mb-2">
                                ⚠️ Supprimer le compte
                            </button>
                            <p className="text-retro-muted text-sm">
                                Attention ! Cette action est irréversible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserDashboard;
