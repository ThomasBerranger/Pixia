import { FaCheck, FaTimes } from 'react-icons/fa';
import { PiEyesFill } from 'react-icons/pi';
import { RiEdit2Fill } from 'react-icons/ri';

export const GAME_STATUSES = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const;

export type GameStatus = (typeof GAME_STATUSES)[keyof typeof GAME_STATUSES];

export const GAME_STATUS_CONFIG = {
    DRAFT: {
        label: 'Brouillon',
        icon: RiEdit2Fill,
    },
    PENDING: {
        label: 'En attente',
        icon: PiEyesFill,
    },
    APPROVED: {
        label: 'Validé',
        icon: FaCheck,
    },
    REJECTED: {
        label: 'Refusé',
        icon: FaTimes,
    },
} as const;
