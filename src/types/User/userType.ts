import type { BadgeType } from '../Badge/badgeType.ts';
import type { ContributionType } from '../Contribution/contributionType.ts';

export interface UserType {
    id: string;
    email: string;
    score: number;
    username: string;
    createdAt: string;
    badges: BadgeType[];
    contributions: ContributionType[];
}
