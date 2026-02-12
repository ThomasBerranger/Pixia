import type { StepConfig } from '../types/gameFormType.tsx';

export const CREATE_STEPS: StepConfig[] = [
    { id: 1, icon: '💡', label: 'Idée', tokens: 300 },
    { id: 2, icon: '🎨', label: 'Résultat', tokens: 500 },
    { id: 3, icon: '🚀', label: 'Envoi', tokens: 200 },
];

export const TOKEN_COSTS = {
    analysis: 300,
    imageGenerate: 500,
    imageUpload: 200,
    submit: 200,
} as const;

export const DIFFICULTIES = {
    SIMPLE: { label: 'Simple', points: 10, color: '#22c55e' },
    VICIEUX: { label: 'Vicieux', points: 15, color: '#eab308' },
    TORDU: { label: 'Tordu', points: 25, color: '#f97316' },
    DIABOLIQUE: { label: 'Diabolique', points: 50, color: '#ef4444' },
    IMPOSSIBLE: { label: 'Impossible', points: 80, color: '#a855f7' },
} as const;

export const ANALYSIS_TIPS: string[] = [
    "L'IA analyse des milliers de films pour trouver la meilleure fusion...",
    'Astuce : les images les plus populaires combinent des genres opposés !',
];

export const IMAGE_TIPS: string[] = [
    'DALL·E dessine ta vision pixel par pixel...',
    "L'IA compose les couleurs, les ombres et les détails...",
    "Chaque image est unique, personne n'a vu celle-ci avant toi !",
    "Les meilleurs artistes prennent leur temps, l'IA aussi 🎨",
];

export const IDEA_MIN_LENGTH = 10;
