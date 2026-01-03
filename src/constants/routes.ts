export const ROUTES = {
    // GAME
    HOME: '/',
    GAME_BY_DATE: (date?: string) => (date ? `/${date}` : '/:date'),
    // USER
    USER: '/me',
    USER_NOTIFICATIONS: '/notifications',
    USER_SHOW: (slug?: string) => (slug ? `/users/${slug}` : '/users/:slug'),
    USER_SPONSOR: (slug?: string) =>
        slug ? `/users/${slug}/sponsor` : '/users/:slug/sponsor',
    LEADERBOARD: '/leaderboard',
    LEADERBOARD_WITH_PAGE: (page: number) => `/leaderboard?page=${page}`,
    // ADMIN
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id?: string) =>
        id ? `/admin/games/${id}` : '/admin/games/:id',
    ADMIN_CONTRIBUTIONS: '/admin/contributions',
    // AUTHENTICATION
    FORGOT_PASSWORD: '/reset-password',
    PASSWORD_RESET: '/reset-password/:resetToken',
    // STATIC
    CHANGELOG: '/changelog',
    NOT_FOUND: '/404',
} as const;
