import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { useAuth } from '../../contexts/authContext.tsx';
import { RxDotFilled } from 'react-icons/rx';
import { decodeJWT } from '../../utils/jwt.ts';
import type { JWTPayloadType } from '../../types/JWTPayloadType.ts';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { isAuthenticated } = useAuth();
    const { isAdmin } = useAuth();

    const decodedJwt: JWTPayloadType | undefined = decodeJWT(
        localStorage.getItem('token')
    );

    return (
        <aside
            className={`
                fixed top-[11vh] right-0 h-[93vh] w-full bg-retro-surface/95
                flex items-center justify-center border-t-2 border-retro-accent
                transform transition-transform duration-300 ease-in-out z-50
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            <nav className="text-white font-righteous flex flex-col items-center gap-6">
                {(decodedJwt?.avatarUrl || decodedJwt?.username) && (
                    <Link to={ROUTES.USER} onClick={onClose}>
                        <img
                            src={
                                decodedJwt.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${decodedJwt.username}`
                            }
                            alt="Avatar"
                            className={`h-28 w-28`}
                        />
                    </Link>
                )}

                <Link to={ROUTES.USER} onClick={onClose}>
                    <button className="btn-primary text-xs sm:text-md px-5 py-2">
                        {isAuthenticated ? 'MON COMPTE' : 'CONNEXION'}
                    </button>
                </Link>

                {isAuthenticated && (
                    <Link
                        to={ROUTES.NEWS}
                        onClick={onClose}
                        className="text-white flex items-center"
                    >
                        <RxDotFilled
                            size={20}
                            className="text-retro-primary animate-pulse"
                        />{' '}
                        Notifications
                    </Link>
                )}

                {isAdmin() && (
                    <Link
                        to={ROUTES.ADMIN}
                        onClick={onClose}
                        className="btn-ghost px-5 py-2 text-center"
                    >
                        <p>⚙️ Admin</p>
                    </Link>
                )}
            </nav>
        </aside>
    );
}

export default Sidebar;
