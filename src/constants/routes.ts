export const ROUTES = {
    // GAME
    HOME: '/',
    GAME_BY_DATE: (date?: string) => (date ? `/${date}` : '/:date'),
    // USER
    USER: '/me',
    USER_SHOW: (slug?: string) => (slug ? `/users/${slug}` : '/users/:slug'),
    USER_SPONSOR: (slug?: string) =>
        slug ? `/users/${slug}/sponsor` : '/users/:slug/sponsor',
    // ADMIN
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id?: string) =>
        id ? `/admin/games/${id}` : '/admin/games/:id',
    ADMIN_CONTRIBUTIONS: '/admin/contributions',

    NOT_FOUND: '/404',
} as const;
