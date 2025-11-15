import type { DIFFICULTIES } from '../../constants/difficultyPoints.ts';

export interface GameType {
    id: string | undefined;
    type: string | undefined;
    solution: string | undefined;
    hint: string | undefined;
    date: string | undefined;
    difficulty: keyof typeof DIFFICULTIES;
    image: string | undefined;
    userDifficulty: string | undefined;
}
