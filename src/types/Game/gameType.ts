import type { DIFFICULTIES } from '../../constants/difficultyPoints.ts';

export interface GameType {
    id: string;
    type: string;
    solution?: string;
    hint?: string;
    date: string;
    difficulty: keyof typeof DIFFICULTIES;
    image?: string;
}
