import type { GameType } from './gameType.ts';

export interface UserGameType {
    game: GameType;
    won: boolean;
    hintRequested: boolean;
}
