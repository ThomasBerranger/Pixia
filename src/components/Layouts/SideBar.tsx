import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';
import { useAuth } from '../../contexts/authContext.tsx';
import { decodeJWT } from '../../utils/jwt.ts';
import type { JWTPayloadType } from '../../types/JWTPayloadType.ts';
import {
    MdOutlineNotifications,
    MdOutlineNotificationsActive,
} from 'react-icons/md';
import { LuFileCode2 } from 'react-icons/lu';
import { useNotificationStore } from '../../stores/notificationStore.ts';
import { TbPhotoSearch } from 'react-icons/tb';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { isAuthenticated } = useAuth();
    const { isAdmin } = useAuth();

    const hasUnread = useNotificationStore((state) => state.hasUnread);

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
            <nav className="text-white font-righteous flex flex-col gap-8">
                {(decodedJwt?.avatarUrl || decodedJwt?.username) && (
                    <Link to={ROUTES.USER} onClick={onClose}>
                        <img
                            src={
                                decodedJwt.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${decodedJwt.username}`
                            }
                            alt="Avatar"
                            className={`h-32 w-32 mx-auto`}
                        />
                    </Link>
                )}

                <Link to={ROUTES.USER} onClick={onClose}>
                    <button className="btn-primary text-sm px-8 py-2.5 mx-auto">
                        {isAuthenticated ? 'MON COMPTE' : 'CONNEXION'}
                    </button>
                </Link>

                <Link
                    to={ROUTES.HOME}
                    onClick={onClose}
                    className={`text-white flex items-center text-xl ${hasUnread ? 'animate-pulse' : ''}`}
                >
                    <TbPhotoSearch className=" mr-2 text-3xl" />
                    Jeu du jour
                </Link>

                {isAuthenticated && (
                    <Link
                        to={ROUTES.USER_NOTIFICATIONS}
                        onClick={onClose}
                        className={`text-white flex items-center text-xl ${hasUnread ? 'animate-pulse' : ''}`}
                    >
                        {hasUnread ? (
                            <MdOutlineNotificationsActive className="text-retro-primary mr-2 text-3xl" />
                        ) : (
                            <MdOutlineNotifications className=" mr-2 text-3xl" />
                        )}
                        Notifications
                    </Link>
                )}

                {isAuthenticated && (
                    <Link
                        to={ROUTES.CHANGELOG}
                        onClick={onClose}
                        className="text-white flex items-center text-xl"
                    >
                        <LuFileCode2 className="mr-2 text-3xl" />
                        Version 2.0.1
                    </Link>
                )}

                {isAdmin() && (
                    <Link
                        to={ROUTES.ADMIN}
                        onClick={onClose}
                        className="btn-ghost px-10 py-2 text-center"
                    >
                        <p>⚙️ Admin</p>
                    </Link>
                )}
            </nav>
        </aside>
    );
}

export default Sidebar;
