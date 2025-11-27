import type { BadgeType } from '../Badge/badgeType.ts';

export interface LeaderboardUserType {
    username: string;
    avatarUrl?: string;
    score: string;
    badges: BadgeType[];
}
