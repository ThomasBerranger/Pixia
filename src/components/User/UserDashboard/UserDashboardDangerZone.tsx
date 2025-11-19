import { useAuth } from '../../../contexts/authContext.tsx';
import type { UserType } from '../../../types/User/userType.ts';

export default function UserDashboardDangerZone({
    user,
}: {
    user: UserType | undefined;
}) {
    const { logout } = useAuth();

    return (
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
                            placeholder={user?.username}
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
                                placeholder={user?.email}
                                className="w-full px-4 py-3 bg-retro-surface border-[3px] border-retro-muted text-retro-text outline-none transition-all focus:border-retro-primary placeholder:text-retro-muted"
                            />
                        </div>
                    </div>

                    <button className="btn-disabled px-0 py-3.5 mt-1 sm:mt-7 w-full">
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
                </div>
            </div>
        </section>
    );
}
