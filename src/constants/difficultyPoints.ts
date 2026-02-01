export const DIFFICULTIES = {
    SIMPLE: 10,
    VICIEUX: 10,
    TORDU: 25,
    DIABOLIQUE: 50,
    IMPOSSIBLE: 50,
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;
