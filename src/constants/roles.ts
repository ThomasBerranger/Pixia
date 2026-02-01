export const ROLES = {
    BOT: 'ROLE_BOT',
    BANNED: 'ROLE_BANNED',
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
