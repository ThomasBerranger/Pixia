function DifficultyButton({difficulty}: { difficulty: string | undefined }) {

    const getDifficultyBackground = (difficulty?: string) => {
        const DIFFICULTY_COLORS = {
            'SIMPLE': 'bg-green-200',
            'TORDU': 'bg-violet-200',
            'DIABOLIQUE': 'bg-red-200',
        }

        return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || 'bg-gray-100'
    }

    return (
        <p className={`px-4 py-2 font-oswald ${getDifficultyBackground(difficulty)}`}>
            {difficulty ?? '/'}
        </p>
    )
}

export default DifficultyButton
