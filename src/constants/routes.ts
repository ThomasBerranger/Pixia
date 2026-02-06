// Paths pour React Router (<Route path={}>)
// Les enfants admin sont RELATIFS (pas de / ni de préfixe admin/)
export const PATHS = {
    HOME: '/',
    GAME_BY_DATE: '/:date',
    USER: '/me',
    USER_NOTIFICATIONS: '/notifications',
    USER_SHOW: '/users/:slug',
    USER_SPONSOR: '/users/:slug/sponsor',
    USER_GAMES: '/me/games',
    LEADERBOARD: '/leaderboard',
    FORGOT_PASSWORD: '/reset-password',
    PASSWORD_RESET: '/reset-password/:resetToken',
    ADMIN: '/admin',
    ADMIN_USERS: 'user-dashboard',
    ADMIN_GAMES: 'game-dashboard',
    ADMIN_GENERATOR: 'game-generator',
    ADMIN_GAME_EDIT: 'games/:id',
    ADMIN_CONTRIBUTIONS: 'contributions',
    CHANGELOG: '/changelog',
    CGU: '/cgu',
    NOT_FOUND: '/404',
} as const;

// URLs complètes pour la navigation (<Link to={}>, navigate())
// Les params sont OBLIGATOIRES (pas d'optional)
export const URLS = {
    HOME: '/',
    GAME_BY_DATE: (date: string) => `/${date}`,
    USER: '/me',
    USER_NOTIFICATIONS: '/notifications',
    USER_SHOW: (slug: string) => `/users/${slug}`,
    USER_SPONSOR: (slug: string) => `/users/${slug}/sponsor`,
    USER_GAMES: '/me/games',
    LEADERBOARD: '/leaderboard',
    LEADERBOARD_PAGE: (page: number) => `/leaderboard?page=${page}`,
    FORGOT_PASSWORD: '/reset-password',
    ADMIN: '/admin',
    ADMIN_USERS: '/admin/user-dashboard',
    ADMIN_GAMES: '/admin/game-dashboard',
    ADMIN_GENERATOR: '/admin/game-generator',
    ADMIN_GAME_EDIT: (id: string) => `/admin/games/${id}`,
    ADMIN_CONTRIBUTIONS: '/admin/contributions',
    CHANGELOG: '/changelog',
    CGU: '/cgu',
    NOT_FOUND: '/404',
} as const;
