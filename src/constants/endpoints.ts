export const ENDPOINTS = {
    // Authentification
    LOGIN: 'login',
    REGISTER: 'register',
    GOOGLE_AUTH: 'google-auth',
    FORGOT_PASSWORD: 'forgot-password',
    PASSWORD_RESET: 'reset-password',

    // ME
    ME: 'me',
    ME_TOKENS: 'me/tokens',
    CLAIM_TOKENS: 'me/tokens/claim',
    ME_GAMES_STATS: 'me/games-stats',
    ME_GAMES: (month: string) => `me/games?month=${month}`,
    ME_GAMES_GENERATED: 'me/games-generated',
    ME_GAME_CREATE: 'me/games',
    ME_GAME_SHOW: (id: string) => `me/games/${id}`,
    ME_GAME_UPDATE: (id: string) => `me/games/${id}`,
    ME_GAME_IMAGE_UPLOAD: (id: string) => `me/games/${id}/image`,
    ME_GAME_GENERATE_IMAGE: (id: string) => `me/games/${id}/generate-image`,

    // USER
    USER_UPDATE: 'users',
    USER_SHOW: (slug: string) => `users/${slug}`,
    LEADERBOARD: 'users/leaderboard',
    MONTHLY_LEADERBOARD: (date?: string) =>
        date
            ? `users/monthly-leaderboard?date=${date}`
            : 'users/monthly-leaderboard',

    // ADMIN
    ADMIN_GAME_CREATE: 'admin/games',
    ADMIN_GAMES_INDEX: 'admin/games',
    ADMIN_GAME_IMAGE_EDIT: (id: string) => `admin/games/${id}/image`,
    ADMIN_GAME_UPDATE: (id: string) => `admin/games/${id}`,
    ADMIN_GAME_TAKEN_DATES: 'admin/games/taken-dates',

    // SUPER ADMIN
    SUPER_ADMIN_IMPERSONATE: (email: string) =>
        `super-admin/impersonate/${email}`,
    SUPER_ADMIN_USER_INDEX: 'super-admin/users',
    SUPER_ADMIN_USER_UPDATE: (id: string) => `super-admin/users/${id}`,
    SUPER_ADMIN_GAME_CREATE: 'super-admin/games',
    SUPER_ADMIN_GAMES_INDEX: 'super-admin/games',
    SUPER_ADMIN_CONTRIBUTION_INDEX: 'super-admin/contributions',
    SUPER_ADMIN_CONTRIBUTION_UPDATE: (id: string) =>
        `super-admin/contributions/${id}`,

    // GAME
    DAILY: (date?: string) =>
        date ? `games/daily?date=${date}` : 'games/daily',
    GAME_HINT: (id: string) => `games/${id}/hint`,
    GAME_SOLUTION: (id: string) => `games/${id}/solution`,

    // CONTRIBUTION
    CONTRIBUTION: 'contributions',

    // NOTIFICATION
    NOTIFICATION: 'notifications',
    HAS_UNREAD_NOTIFICATION: 'notifications/has-unread',
} as const;
