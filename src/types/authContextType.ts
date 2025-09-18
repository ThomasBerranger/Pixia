export interface AuthContextType {
    token: string | null;
    userRoles: string[];
    login: (token: string) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    isUser: () => boolean;
    isAdmin: () => boolean;
    isAuthenticated: boolean;
}