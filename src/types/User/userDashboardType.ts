import type { UserType } from './userType.ts';
import type { AchievementType } from '../Achievement/achievementType.ts';

export interface UserDashboardType {
    user: UserType;
    rank: number;
    games: number;
    success: number;
    history: Array<AchievementType>;
}
