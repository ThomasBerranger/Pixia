export const PATHS = {
    // Game
    HOME: '/',
    GAME_BY_DATE: '/:date',
    // Me
    ME: '/me',
    ME_NOTIFICATIONS: 'notifications',
    ME_GAMES: 'games',
    // Users
    USER_SHOW: '/users/:slug',
    USER_SPONSOR: '/users/:slug/sponsor',
    LEADERBOARD: '/leaderboard',
    // Auth
    FORGOT_PASSWORD: '/reset-password',
    PASSWORD_RESET: '/reset-password/:resetToken',
    // Admin
    ADMIN: '/admin',
    ADMIN_USERS: 'user-dashboard',
    ADMIN_GAMES: 'game-dashboard',
    ADMIN_GENERATOR: 'game-generator',
    ADMIN_GAME_EDIT: 'games/:id',
    ADMIN_CONTRIBUTIONS: 'contributions',
    // Static
    CHANGELOG: '/changelog',
    CGU: '/cgu',
    NOT_FOUND: '/404',
} as const;

export const URLS = {
    // Game
    HOME: '/',
    GAME_BY_DATE: (date: string) => `/${date}`,
    // Me
    ME: '/me',
    ME_NOTIFICATIONS: '/me/notifications',
    ME_GAMES: '/me/games',
    // Users
    USER_SHOW: (slug: string) => `/users/${slug}`,
    USER_SPONSOR: (slug: string) => `/users/${slug}/sponsor`,
    LEADERBOARD: '/leaderboard',
    LEADERBOARD_PAGE: (page: number) => `/leaderboard?page=${page}`,
    // Auth
    FORGOT_PASSWORD: '/reset-password',
    // Admin
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id: string) => `/admin/games/${id}`,
    ADMIN_CONTRIBUTIONS: '/admin/contributions',
    // Static
    CHANGELOG: '/changelog',
    CGU: '/cgu',
    NOT_FOUND: '/404',
} as const;
