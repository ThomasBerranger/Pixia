import type { BadgeType } from '../types/Badge/badgeType.ts';
import type { BADGES } from '../constants/badges.ts';
import type { Role } from '../constants/roles.ts';

export const hasBadge = (
    badges: BadgeType[],
    ...keys: Array<keyof typeof BADGES>
) => {
    const badgeNames = badges.map((b) => b.name);
    return keys.some((key) => badgeNames.includes(key));
};

export const hasRole = (roles: Role[], ...keys: Role[]) => {
    return keys.some((key) => roles.includes(key));
};
