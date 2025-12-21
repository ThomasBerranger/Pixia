import type { BadgeType } from '../Badge/badgeType.ts';

export interface LeaderboardUserType {
    username: string;
    avatarUrl?: string;
    score: string;
    slug: string;
    badges: BadgeType[];
    streaks: { current: number; best: number };
}
