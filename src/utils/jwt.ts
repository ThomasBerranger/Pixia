interface JWTPayload {
    email: string;
    roles: string[];
    exp?: number;
    iat?: number;
    username?: string;
}

export function decodeJWT(token: string | null): JWTPayload | undefined {
    if (!token) {
        return;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}
