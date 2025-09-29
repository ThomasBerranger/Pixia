export const getDifficultyBackgroundColor = (difficulty?: string) => {
    const DIFFICULTY_COLORS = {
        'SIMPLE': 'bg-green-200',
        'TORDU': 'bg-violet-200',
        'DIABOLIQUE': 'bg-red-200',
    }

    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || 'bg-gray-100'
}