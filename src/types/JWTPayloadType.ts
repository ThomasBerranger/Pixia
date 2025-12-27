export interface JWTPayloadType {
    email: string;
    roles: string[];
    username: string;
    createdAt: string;
    avatarUrl?: string;
    exp: number;
}
