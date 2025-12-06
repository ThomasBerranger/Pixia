export interface JWTPayloadType {
    email: string;
    roles: string[];
    score: number;
    username: string;
    createdAt: string;
    avatarUrl?: string;
    exp: number;
}
