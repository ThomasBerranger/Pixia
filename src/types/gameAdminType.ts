import type {UserType} from "./userType.ts";

export interface GameAdminType {
    id: string;
    type: string;
    solution: string;
    hint: string;
    date: string;
    difficulty: string;
    image: string | undefined;
    author: UserType;
}