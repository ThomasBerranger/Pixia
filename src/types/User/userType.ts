import type { BadgeType } from '../Badge/badgeType.ts';
import type { ContributionType } from '../Contribution/contributionType.ts';
import type { AchievementType } from '../Achievement/achievementType.ts';

export interface UserType {
    id: string;
    email: string;
    score: number;
    username: string;
    createdAt: string;
    badges: BadgeType[];
    contributions: ContributionType[];
    avatarUrl?: string;
    slug: string;
    achievements?: AchievementType[];
    streaks: { current: number; best: number };
    monthlyLeaderboards: { month: string; score: number }[];
    rank?: number;
    roles?: [];
    tokens?: number;
    emailConsent?: boolean;
}
