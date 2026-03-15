import type { UserType } from './userType.ts';

export interface HistoryEntry {
    date: string;
    points: number;
}

export interface UserDashboardType {
    user: UserType;
    rank: number;
    games: number;
    successCount: number;
    history: HistoryEntry[];
    streak: Record<string, number>;
    playerCount: number;
    authoredGameCount: number;
    canClaimTokens: string | true;
}
