export type StepId = 1 | 2 | 3 | 4;

export interface StepConfig {
    id: StepId;
    icon: string;
    label: string;
}

export interface AiGeneratedData {
    prompt: string;
    solution: string;
    englishSolution: string;
    hint: string;
    estimatedDate: string;
    popularityScore: number;
}
