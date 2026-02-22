export const DIFFICULTIES = {
    SIMPLE: 10,
    VICIEUX: 15,
    TORDU: 25,
    DIABOLIQUE: 50,
    IMPOSSIBLE: 80,
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;
