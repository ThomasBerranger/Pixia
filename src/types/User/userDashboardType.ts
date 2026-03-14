import type { UserType } from './userType.ts';
import type { AchievementType } from '../Achievement/achievementType.ts';

export interface UserDashboardType {
    user: UserType;
    rank: number;
    games: number;
    successCount: number;
    history: Array<AchievementType>;
    streak: Record<string, number>;
    playerCount: number;
    authoredGameCount: number;
}
