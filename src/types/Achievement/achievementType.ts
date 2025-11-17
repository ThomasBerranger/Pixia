import type { GameType } from '../Game/gameType.ts';

export interface AchievementType {
    id: string;
    date: string;
    game: GameType;
}
