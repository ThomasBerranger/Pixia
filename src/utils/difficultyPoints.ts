export const getDifficultyPoints = (difficulty?: string) => {
    const DIFFICULTY_COLORS = {
        'SIMPLE': 10,
        'TORDU': 25,
        'DIABOLIQUE': 50,
    }

    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || 0
}