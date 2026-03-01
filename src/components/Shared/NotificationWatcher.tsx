import { useEffect, useState } from 'react';
import { useNotificationStore } from '../../stores/notificationStore.ts';
import { useAuth } from '../../contexts/authContext.tsx';
import { useApi } from '../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import NotificationModal from '../User/Notification/NotificationModal.tsx';
import type { NotificationInterface } from '../../types/Notification/notificationInterface.ts';

function NotificationWatcher() {
    const { isAuthenticated } = useAuth();
    const { apiCall } = useApi();
    const hasUnread = useNotificationStore((state) => state.hasUnread);
    const setHasUnread = useNotificationStore((state) => state.setHasUnread);

    const [notifications, setNotifications] = useState<NotificationInterface[]>(
        []
    );
    const [showModal, setShowModal] = useState(false);

    // Au mount : vérifier s'il y a des notifications non lues
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchHasUnread = async () => {
            try {
                const result = await apiCall(ENDPOINTS.HAS_UNREAD_NOTIFICATION);
                setHasUnread(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHasUnread();
    }, [apiCall, isAuthenticated, setHasUnread]);

    // Quand hasUnread passe à true : récupérer les notifications et afficher la modal
    useEffect(() => {
        if (!hasUnread || !isAuthenticated) return;

        const fetchNotifications = async () => {
            try {
                const data = await apiCall(ENDPOINTS.NOTIFICATION);
                setNotifications(data);
                setShowModal(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotifications();
    }, [hasUnread, isAuthenticated, apiCall]);

    const handleClose = () => {
        setShowModal(false);
        setHasUnread(false);
    };

    if (!showModal || notifications.length === 0) return null;

    return (
        <NotificationModal
            notifications={notifications}
            onClose={handleClose}
        />
    );
}

export default NotificationWatcher;
