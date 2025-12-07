export const ENDPOINTS = {
    // Authentification
    REGISTER: 'register',
    LOGIN: 'login',
    ME: 'me',
    // USER
    LEADERBOARD: 'users/leaderboard',
    USER_UPDATE: 'users',
    USER_CONTRIBUTION_INDEX: 'contributions',
    USER_SHOW: (slug: string) => `users/${slug}`,
    NOTIFICATION: 'notifications',
    HAS_UNREAD_NOTIFICATION: 'notifications/has-unread',
    // GAME
    DAILY: (date?: string) =>
        date ? `games/daily?date=${date}` : 'games/daily',
    GAME_HINT: (id: string) => `games/${id}/hint`,
    GAME_SOLUTION: (id: string) => `games/${id}/solution`,
    // ADMIN
    ADMIN_USER_INDEX: 'admin/users',
    ADMIN_GAME_INDEX: 'admin/games',
    ADMIN_GAME_CREATE: 'admin/games',
    ADMIN_GAME_UPDATE: (id: string) => `admin/games/${id}`,
    ADMIN_GAME_IMAGE_EDIT: (id: string) => `admin/games/${id}/image`,
    ADMIN_GAME_SOLUTION_EXIST: (solution: string) =>
        `admin/games/solution-exist?solution=${solution}`,
    ADMIN_CONTRIBUTION_INDEX: 'admin/contributions',
    ADMIN_CONTRIBUTION_UPDATE: (id: string) => `admin/contributions/${id}`,
    // OPEN_AI
    OPEN_AI_GENERATE_CONTENT: 'open-api/generate-content',
    OPEN_AI_GENERATE_IMAGE: 'open-api/generate-image',
} as const;
