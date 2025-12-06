import { FaCheck, FaTimes } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiEyesFill } from 'react-icons/pi';

export const CONTRIBUTION_STATUSES = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    REJECTED: 'REJECTED',
} as const;

export const CONTRIBUTION_STATUS_CONFIG = {
    PENDING: {
        label: 'On regarde ça',
        icon: FaMagnifyingGlass,
    },
    APPROVED: {
        label: 'GG validé',
        icon: FaCheck,
    },
    ALREADY_EXISTS: {
        label: 'Déjà traité',
        icon: PiEyesFill,
    },
    REJECTED: {
        label: 'Nope',
        icon: FaTimes,
    },
} as const;
