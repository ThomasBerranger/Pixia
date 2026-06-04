import type { ACTIVITY_TYPES } from '../../constants/activityTypes.ts';

export interface ActivityFilmType {
    titre: string;
    notorietyScore: number;
}

export interface ActivityDataType {
    amount?: number;
    idea?: string;
    hint?: string;
    films?: ActivityFilmType[];
    status?: string;
    solution?: string;
    imagePrompt?: string;
    notorietyScore?: number;
    englishSolution?: string;
    error?: string;
}

export interface ActivityPlayerType {
    username: string;
}

export interface ActivityType {
    player: ActivityPlayerType;
    type: keyof typeof ACTIVITY_TYPES;
    data: ActivityDataType;
    createdAt: string;
}

export interface ActivityIndexType {
    items: ActivityType[];
    total: number;
    page: number;
    perPage: number;
}
