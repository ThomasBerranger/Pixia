export const GAME_STATUSES = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const;

export type GameStatus = (typeof GAME_STATUSES)[keyof typeof GAME_STATUSES];

export const GAME_STATUS_CONFIG = {
    DRAFT: { label: 'Brouillon' },
    PENDING: { label: 'En attente' },
    APPROVED: { label: 'Validée' },
    REJECTED: { label: 'Refusée' },
} as const;
