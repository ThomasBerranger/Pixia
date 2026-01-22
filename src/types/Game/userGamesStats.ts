export interface UserGamesStats {
    total: StatBlock;
    byDifficulty: Record<string, StatBlock>;
    byMonth: Record<string, StatBlock>;
}

interface StatBlock {
    total: number;
    won: number;
    hinted: number;
}
