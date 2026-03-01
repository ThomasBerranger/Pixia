import { useState, useEffect } from 'react';
import type { NotificationInterface } from '../../../types/Notification/notificationInterface.ts';
import { NotificationTypeLabel } from '../../../types/Notification/notificationInterface.ts';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IoClose } from 'react-icons/io5';
import {
    getBadgeDescription,
    getBadgeIcon,
    getBadgeName,
} from '../../../types/Badge/badgeType.ts';

interface NotificationModalProps {
    notifications: NotificationInterface[];
    onClose: () => void;
}

function NotificationModal({ notifications, onClose }: NotificationModalProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const close = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            onClick={close}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${visible ? 'bg-black/85 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-0'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-retro-surface/95 border-[3px] border-retro-primary shadow-[0_0_40px_rgba(255,0,110,0.5)] rounded-xl w-full max-w-xl max-h-[80vh] flex flex-col p-4 sm:p-7 transition-all duration-1000 ease-out ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.85] translate-y-8'}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                    <h2 className="animated-neon-title">Notifications</h2>
                    <button
                        onClick={close}
                        className="text-retro-accent hover:text-retro-primary transition-colors"
                    >
                        <IoClose size={35} />
                    </button>
                </div>

                {/* Notifications */}
                <div className="overflow-y-auto flex-1 space-y-3 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {notifications.map((n, i) => {
                        const badge = n.type === 'BADGE' && {
                            icon: getBadgeIcon(n.title),
                            name: getBadgeName(n.title),
                            description: getBadgeDescription(n.title),
                        };

                        return (
                            <div
                                key={`${n.createdAt}-${n.title}`}
                                className={`rounded-lg p-4 transition-all duration-500 ${
                                    n.read
                                        ? 'border border-retro-muted/15'
                                        : 'border-[2px] border-retro-primary/20'
                                } ${visible ? `translate-y-0 ${n.read ? 'opacity-60' : 'opacity-100'}` : '-translate-y-10 opacity-0'}`}
                                style={{
                                    transitionDelay: `${300 + i * 150}ms`,
                                }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span
                                        className={`px-1.5 py-0.5 text-xs font-righteous uppercase ${n.read ? 'badge-muted-no-border' : 'badge-secondary'}`}
                                    >
                                        {NotificationTypeLabel[n.type]}
                                    </span>
                                    <span className="text-xxs text-retro-muted font-righteous">
                                        {formatDistanceToNow(
                                            new Date(n.createdAt),
                                            {
                                                addSuffix: true,
                                                locale: fr,
                                            }
                                        )}
                                    </span>
                                </div>
                                <p
                                    className={`font-righteous text-sm ${n.read ? 'text-retro-muted' : 'text-retro-accent'}`}
                                >
                                    {badge
                                        ? `${badge.description} ${badge.icon}`
                                        : n.title}
                                </p>
                                <p
                                    className={`text-xs mt-1 ${n.read ? 'text-retro-muted/70' : 'text-retro-text'}`}
                                >
                                    {badge ? (
                                        <>
                                            Tu as débloqué le badge{' '}
                                            <span className="font-righteous">
                                                {badge.name}
                                            </span>
                                        </>
                                    ) : (
                                        n.content
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="pt-3">
                    <button
                        onClick={close}
                        className="btn-primary w-full py-2.5 text-xs"
                    >
                        C'est noté !
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
