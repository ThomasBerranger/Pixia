import type { DIFFICULTIES } from '../../constants/difficultyPoints.ts';
import type { UserType } from '../User/userType.ts';
import type { GAME_STATUSES } from './gameStatuses.ts';

export interface GameType {
    id: string;
    type: string;
    solution?: string;
    hint?: string;
    date: string;
    difficulty: keyof typeof DIFFICULTIES;
    image?: string;
    author: UserType;
    createdAt: string;
    supervisor?: UserType | null;
    status: keyof typeof GAME_STATUSES;
}
