import { BADGES } from '../../constants/badges.ts';

export interface BadgeType {
    name: keyof typeof BADGES;
}

export const getBadgeIcon = (badgeKey: string): string | null => {
    const key = badgeKey as keyof typeof BADGES;

    return BADGES[key]?.icon ?? null;
};

export const getBadgeName = (badgeKey: string): string | null => {
    const key = badgeKey as keyof typeof BADGES;

    return BADGES[key]?.name ?? null;
};

export const getBadgeDescription = (badgeKey: string): string | null => {
    const key = badgeKey as keyof typeof BADGES;

    return BADGES[key]?.description ?? null;
};
