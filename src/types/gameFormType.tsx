import type { DIFFICULTIES } from '../constants/gameForm.ts';

export type StepId = 1 | 2 | 3;

export type DifficultyKey = keyof typeof DIFFICULTIES;

export interface StepConfig {
    id: StepId;
    icon: string;
    label: string;
    tokens: number;
}

export interface AiGeneratedData {
    prompt: string;
    solution: string;
    englishSolution: string;
    hint: string;
    estimatedDate: string;
    popularityScore: number;
}

export interface CreateGameState {
    step: StepId;
    idea: string;
    difficulty: DifficultyKey;
    loading: boolean;
    gameData: AiGeneratedData | null;
    imageUrl: string | null;
    submitted: boolean;
}
