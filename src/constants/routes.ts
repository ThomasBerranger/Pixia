export const ROUTES = {
    HOME: '/',
    GAME_BY_DATE: (date?: string) => (date ? `/${date}` : '/:date'),
    USER: '/me',
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id?: string) =>
        id ? `/admin/games/${id}` : '/admin/games/:id',
    ADMIN_CONTRIBUTIONS: '/admin/contributions',
} as const;
