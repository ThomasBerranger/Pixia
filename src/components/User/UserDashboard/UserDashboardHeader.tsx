import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { useAuth } from '../../../contexts/authContext.tsx';
import { CgSpinner } from 'react-icons/cg';

export default function UserDashboardHeader({
    user,
}: {
    user: UserType | undefined;
}) {
    const { isAdmin } = useAuth();

    return (
        <section className="flex-wrap sm:flex items-center gap-8 mb-12 card-primary">
            <div className="hidden uppercase w-24 h-24 bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent border-[3px] border-retro-accent sm:flex items-center justify-center text-4xl font-righteous shadow-[3px_3px_0] shadow-black/30">
                {user ? (
                    user.username[0] + user.username.slice(-1)
                ) : (
                    <CgSpinner className="animate-spin mx-auto" size={50} />
                )}
            </div>
            <div>
                <h1 className="font-righteous text-3xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent mb-2">
                    {user?.username}
                </h1>
                <div className="flex-wrap sm:flex gap-3 text-retro-muted text-sm mb-6 sm:mb-0">
                    <div className="flex items-center gap-0.5">
                        <strong className="text-retro-accent">
                            ⭐ {user?.score} points
                        </strong>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {user && (
                            <strong className="text-retro-accent">
                                🎯 Membre depuis{' '}
                                {formatDistanceToNow(new Date(user.createdAt), {
                                    locale: fr,
                                })}
                            </strong>
                        )}
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
    );
}
