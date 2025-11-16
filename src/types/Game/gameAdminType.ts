import type { UserType } from '../User/userType.ts';
import type { DIFFICULTIES } from '../../constants/difficultyPoints.ts';

export interface GameAdminType {
    id: string;
    type: string;
    solution: string;
    hint: string;
    date: string;
    difficulty: keyof typeof DIFFICULTIES;
    image?: string;
    author: UserType;
}
