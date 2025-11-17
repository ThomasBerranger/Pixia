import type { BadgeType } from '../Badge/badgeType.ts';

export interface UserType {
    id: string;
    email: string;
    score: number;
    username: string;
    createdAt: string;
    badges: BadgeType[];
}
