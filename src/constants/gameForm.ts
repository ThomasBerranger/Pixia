import type { StepConfig } from '../types/gameFormType.tsx';

export const CREATE_STEPS: StepConfig[] = [
    { id: 1, icon: '💡', label: 'Idée' },
    { id: 2, icon: '🎨', label: 'Image' },
    { id: 3, icon: '🚀', label: 'Envoi' },
];

export const TOKEN_COSTS = {
    analysis: 300,
    imageGenerate: 500,
    imageUpload: 200,
    submit: 200,
} as const;

export const LOADING_TIPS: string[] = [
    'Seuls les films sont acceptés — pas de séries, jeux vidéo ou autres.',
    'Les films doivent être suffisamment connus, sinon la proposition sera refusée.',
    "Un souci ? Rendez-vous dans l'espace Contribution de ton compte.",
    'Tu gagnes autant de jetons que de points marqués en jouant.',
    "Les images colorées et lumineuses ont plus de chances d'être validées.",
    "Les films doivent être facilement reconnaissables sur l'image générée.",
    "Pour les franchises, inutile de préciser l'épisode.",
];

export const IDEA_MIN_LENGTH = 10;

export const POPULARITY_MIN = 50;
export const TOKEN_REFUND_LOW_POPULARITY = 150;
