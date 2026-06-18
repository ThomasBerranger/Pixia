export const GAME_TYPES = {
    MULTIVERS: 'MULTIVERS',
    KAWAII: 'KAWAII',
    POLYCHROME: 'POLYCHROME',
    CONVERGENCE: 'CONVERGENCE',
} as const;

export type GameTypeKey = keyof typeof GAME_TYPES;

export interface InstructionSegment {
    text: string;
    bold?: boolean;
}

export interface GameTypeContent {
    title: string;
    instruction: InstructionSegment[];
    placeholder: string;
}

export const GAME_TYPE_CONTENT: Record<GameTypeKey, GameTypeContent> = {
    MULTIVERS: {
        title: 'Multivers',
        instruction: [
            { text: 'Devine ' },
            { text: 'les deux films', bold: true },
            { text: ' mélangés dans cette image' },
        ],
        placeholder: 'Exemple : Titanic et Spider-Man',
    },
    KAWAII: {
        title: 'Kawaii',
        instruction: [
            { text: 'Devine ' },
            { text: 'le personnage', bold: true },
            { text: ' version kawaii dans cette image' },
        ],
        placeholder: 'Exemple : Luke Skywalker',
    },
    POLYCHROME: {
        title: 'Polychrome',
        instruction: [
            { text: 'Devine ' },
            { text: 'le film', bold: true },
            { text: ' caché derrière cette illustration minimaliste' },
        ],
        placeholder: 'Exemple : Inception',
    },
    CONVERGENCE: {
        title: 'Convergence',
        instruction: [
            { text: 'Devine ' },
            { text: 'le film', bold: true },
            { text: ' à partir des éléments réunis dans cette image' },
        ],
        placeholder: 'Exemple : Inception',
    },
};
