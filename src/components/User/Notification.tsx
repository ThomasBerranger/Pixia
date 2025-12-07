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

function Notification() {
    const { apiCall } = useApi();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const notifications = await apiCall(ENDPOINTS.NOTIFICATION);

                setNotifications(notifications);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall]);

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
                    notifications.map((notification: NotificationInterface) => (
                        <div
                            key={notification.createdAt}
                            className={`timeline-retro-item${notification.read ? '-read' : '-unread'}`}
                        >
                            <div
                                className={`timeline-retro-dot${notification.read ? '-read' : '-unread'}`}
                            ></div>
                            <div
                                className={`p-4 ${notification.read ? 'card-retro text-left' : 'card-primary'}`}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div className="badge-secondary px-2 py-1 text-sm font-righteous uppercase">
                                        {
                                            NotificationTypeLabel[
                                                notification.type
                                            ]
                                        }
                                    </div>
                                    <div className="text-xs text-retro-muted font-righteous">
                                        {formatDistanceToNow(
                                            new Date(notification.createdAt),
                                            {
                                                addSuffix: true,
                                                locale: fr,
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="font-righteous text-sm text-retro-accent mb-2">
                                    {notification.title}
                                </div>
                                <div className="text-sm">
                                    {notification.content}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Notification;
