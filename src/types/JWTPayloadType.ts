export interface JWTPayloadType {
    roles: string[]
    username: string
    exp: number
}