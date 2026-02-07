export const ENDPOINTS = {
    // Authentification
    ME: 'me',
    LOGIN: 'login',
    REGISTER: 'register',
    GOOGLE_AUTH: 'google-auth',
    FORGOT_PASSWORD: 'forgot-password',
    PASSWORD_RESET: 'reset-password',
    // USER
    USER_UPDATE: 'users',
    USER_CONTRIBUTION_INDEX: 'contributions',
    USER_SHOW: (slug: string) => `users/${slug}`,
    NOTIFICATION: 'notifications',
    HAS_UNREAD_NOTIFICATION: 'notifications/has-unread',
    LEADERBOARD: 'users/leaderboard',
    MONTHLY_LEADERBOARD: (date?: string) =>
        date
            ? `users/monthly-leaderboard?date=${date}`
            : 'users/monthly-leaderboard',
    USER_GAMES_STATS: 'me/games-stats',
    USER_GAMES: (month: string) => `me/games?month=${month}`,
    // GAME
    DAILY: (date?: string) =>
        date ? `games/daily?date=${date}` : 'games/daily',
    GAME_HINT: (id: string) => `games/${id}/hint`,
    GAME_SOLUTION: (id: string) => `games/${id}/solution`,
    // ADMIN
    ADMIN_GAME_CREATE: 'admin/games',
    ADMIN_GAMES_INDEX: 'admin/games',
    ADMIN_GAME_UPDATE: (id: string) => `admin/games/${id}`,
    ADMIN_GAME_IMAGE_EDIT: (id: string) => `admin/games/${id}/image`,
    ADMIN_GAME_SOLUTION_EXIST: (solution: string) =>
        `admin/games/solution-exist?solution=${solution}`,
    ADMIN_CONTRIBUTION_INDEX: 'admin/contributions',
    ADMIN_CONTRIBUTION_UPDATE: (id: string) => `admin/contributions/${id}`,
    // SUPER ADMIN
    SUPER_ADMIN_IMPERSONATE: (email: string) =>
        `super-admin/impersonate/${email}`,
    SUPER_ADMIN_TOGGLE_BAN: (email: string) =>
        `super-admin/toggle-ban/${email}`,
    SUPER_ADMIN_USER_INDEX: 'super-admin/users',
    SUPER_ADMIN_GAMES_INDEX: 'super-admin/games',
    // OPEN_AI
    OPEN_AI_GENERATE_CONTENT: 'open-api/generate-content',
    OPEN_AI_GENERATE_IMAGE: 'open-api/generate-image',
} as const;
