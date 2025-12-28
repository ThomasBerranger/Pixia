import { format, startOfMonth } from 'date-fns';
import type { UserType } from '../types/User/userType.ts';

export const getCurrentMonthlyLeaderboard = (player: UserType) => {
    return player?.monthlyLeaderboards.find(
        (ml) =>
            format(startOfMonth(ml.month), 'yyyy-MM') ===
            format(startOfMonth(new Date()), 'yyyy-MM')
    );
};
