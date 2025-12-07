export type NotificationType = 'BADGE' | 'UPDATE';

export const NotificationTypeLabel: Record<NotificationType, string> = {
    BADGE: 'Nouveau badge',
    UPDATE: 'Mise à jour',
};

export interface NotificationInterface {
    createdAt: string;
    title: string;
    content: string;
    type: NotificationType;
    read: boolean;
}
