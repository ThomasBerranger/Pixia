import { useApi } from '../../hooks/useApi.tsx';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import {
    type NotificationInterface,
    NotificationTypeLabel,
} from '../../types/Notification/notificationInterface.ts';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CgSpinner } from 'react-icons/cg';
import { useNotificationStore } from '../../stores/notificationStore.ts';
import { ROUTES } from '../../constants/routes.ts';
import { Link } from 'react-router-dom';
import {
    getBadgeDescription,
    getBadgeIcon,
    getBadgeName,
} from '../../types/Badge/badgeType.ts';

function Notification() {
    const { apiCall } = useApi();

    const setHasUnread = useNotificationStore((state) => state.setHasUnread);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifications = await apiCall(ENDPOINTS.NOTIFICATION);

                setNotifications(notifications);
                setHasUnread(false);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall, setHasUnread]);

    return (
        <section className="min-h-[91vh] flex flex-col justify-center items-center gap-6 pl-2 pr-5 py-20 sm:px-20">
            <div className="timeline-retro w-full">
                {isLoading ? (
                    <>
                        <div className="timeline-retro-item-read">
                            <div className="timeline-retro-dot-read"></div>
                            <div className="p-8 card-retro text-left">
                                <CgSpinner className="animate-spin text-4xl mx-auto text-retro-primary" />
                            </div>
                        </div>
                        <div className="timeline-retro-item-read">
                            <div className="timeline-retro-dot-read"></div>
                            <div className="p-8 card-retro text-left">
                                <CgSpinner className="animate-spin text-4xl mx-auto text-retro-primary" />
                            </div>
                        </div>
                    </>
                ) : (
                    notifications.map((notification: NotificationInterface) => {
                        const badge = notification.type === 'BADGE' && {
                            icon: getBadgeIcon(notification.title),
                            name: getBadgeName(notification.title),
                            description: getBadgeDescription(
                                notification.title
                            ),
                        };

                        return (
                            <div
                                key={`${notification.createdAt} ${notification.title}`}
                                className={`timeline-retro-item${notification.read ? '-read' : '-unread'}`}
                            >
                                <div
                                    className={`timeline-retro-dot${notification.read ? '-read' : '-unread'}`}
                                ></div>
                                <Link
                                    to={badge ? ROUTES.USER : ROUTES.CHANGELOG}
                                >
                                    <div
                                        className={`p-4 ${notification.read ? 'card-retro-hover-retro-accent text-left' : 'card-primary-hover'}`}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="badge-secondary px-2 py-1 text-xs sm:text-base font-righteous uppercase">
                                                {
                                                    NotificationTypeLabel[
                                                        notification.type
                                                    ]
                                                }
                                            </div>
                                            <div className="text-xs text-retro-muted font-righteous pl-3 text-right">
                                                {formatDistanceToNow(
                                                    new Date(
                                                        notification.createdAt
                                                    ),
                                                    {
                                                        addSuffix: true,
                                                        locale: fr,
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div className="font-righteous text-sm text-retro-accent mb-2">
                                            {badge
                                                ? `${badge.description} ${badge.icon}`
                                                : notification.title}
                                        </div>
                                        <div className="text-sm">
                                            {badge ? (
                                                <p>
                                                    Tu as débloqué le badge{' '}
                                                    <span className="font-righteous">
                                                        {badge.name}
                                                    </span>
                                                </p>
                                            ) : (
                                                notification.content
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default Notification;
