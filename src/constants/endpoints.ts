export const ENDPOINTS = {
    // Authentification
    ME: 'me',
    // USER
    LEADERBOARD: 'users/leaderboard',
    DAILY: (date?: string) =>
        date ? `games/daily?date=${date}` : 'games/daily',
    GAME_SOLUTION: (id: string) => `games/${id}/solution`,
    // ADMIN
    ADMIN_USERS: 'admin/users',
    ADMIN_GAME_INDEX: 'admin/games',
    ADMIN_GAME_CREATE: 'admin/games',
    ADMIN_GAME_UPDATE: (id: string) => `admin/games/${id}`,
    ADMIN_GAME_EDIT: (id: string) => `admin/games/${id}`,
    ADMIN_GAME_IMAGE_EDIT: (id: string) => `admin/games/${id}/image`,
    ADMIN_GAME_SOLUTION_EXIST: (solution: string) =>
        `admin/games/solution-exist?solution=${solution}`,
    // OPEN_AI
    OPEN_AI_GENERATE_CONTENT: 'open-api/generate-content',
    OPEN_AI_GENERATE_IMAGE: 'open-api/generate-image',
} as const;
