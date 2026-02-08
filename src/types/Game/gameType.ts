import type { DIFFICULTIES } from '../../constants/difficultyPoints.ts';
import type { UserType } from '../User/userType.ts';

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
    supervisor: UserType;
    approvedAt: string;
}
