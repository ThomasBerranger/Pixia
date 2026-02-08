export const PATHS = {
    // Game
    HOME: '/',
    GAME_BY_DATE: '/:date',
    // Me
    ME: '/me',
    ME_NOTIFICATIONS: 'notifications',
    ME_GAMES: 'games',
    ME_GAMES_GENERATED: 'games/generated',
    ME_GAME: 'games/:id',
    // Users
    USER_SHOW: '/users/:slug',
    USER_SPONSOR: '/users/:slug/sponsor',
    LEADERBOARD: '/leaderboard',
    // Auth
    FORGOT_PASSWORD: '/reset-password',
    PASSWORD_RESET: '/reset-password/:resetToken',
    // Admin
    ADMIN: '/admin',
    ADMIN_GAMES: 'games',
    ADMIN_GENERATOR: 'game-generator',
    ADMIN_GAME_EDIT: 'games/:id',
    // Admin
    SUPER_ADMIN: '/super-admin',
    SUPER_ADMIN_USERS: 'users',
    SUPER_ADMIN_GAMES: 'game-dashboard',
    SUPER_ADMIN_CONTRIBUTIONS: 'contributions',
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
    ME_GAMES_GENERATED: '/me/games/generated',
    ME_GAME: (id: string) => `/me/games/${id}`,
    // Users
    USER_SHOW: (slug: string) => `/users/${slug}`,
    USER_SPONSOR: (slug: string) => `/users/${slug}/sponsor`,
    LEADERBOARD: '/leaderboard',
    LEADERBOARD_PAGE: (page: number) => `/leaderboard?page=${page}`,
    // Auth
    FORGOT_PASSWORD: '/reset-password',
    // Admin
    ADMIN: '/admin',
    ADMIN_GAMES: '/admin/games',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id: string) => `/admin/games/${id}`,
    // Super Admin
    SUPER_ADMIN: '/super-admin',
    SUPER_ADMIN_USERS: '/super-admin/users',
    SUPER_ADMIN_GAMES: '/super-admin/game-dashboard',
    SUPER_ADMIN_CONTRIBUTIONS: '/super-admin/contributions',
    // Static
    CHANGELOG: '/changelog',
    CGU: '/cgu',
    NOT_FOUND: '/404',
} as const;
