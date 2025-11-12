export const ROUTES = {
    HOME: '/',
    USER: '/me',
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id: string) => `/admin/games/${id}`,
} as const;
