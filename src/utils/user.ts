import type {BadgeType} from "../types/Badge/badgeType.ts";
import type {BADGES} from "../constants/badges.ts";

export const hasBadge = (badges: BadgeType[], ...keys: Array<keyof typeof BADGES>) => {
    const badgeNames = badges.map(b => b.name);
    return keys.some(key => badgeNames.includes(key));
};
