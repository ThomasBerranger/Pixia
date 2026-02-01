import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import type { JWTPayloadType } from '../types/JWTPayloadType.ts';
import { ENDPOINTS } from '../constants/endpoints.ts';

interface AuthContextType {
    token: string | null;
    userRoles: string[];
    login: (token: string) => void;
    logout: () => void;
    impersonate: (email: string) => Promise<void>;
    exitImpersonate: () => void;
    hasRole: (role: string) => boolean;
    isUser: () => boolean;
    isAdmin: () => boolean;
    isSuperAdmin: () => boolean;
    isAuthenticated: boolean;
    isImpersonating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        const savedToken = localStorage.getItem('token');

        if (savedToken) {
            try {
                const decoded: JWTPayloadType = jwtDecode(savedToken);

                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    return null;
                }

                return savedToken;
            } catch {
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    });

    const [userRoles, setUserRoles] = useState<string[]>(() => {
        if (token) {
            try {
                const decoded: JWTPayloadType = jwtDecode(token);
                return decoded.roles || [];
            } catch {
                return [];
            }
        }
        return [];
    });

    const [isImpersonating, setIsImpersonating] = useState<boolean>(
        () => !!localStorage.getItem('adminToken')
    );

    useEffect(() => {
        if (!token) return;

        const checkExpiration = () => {
            try {
                const decoded = jwtDecode<JWTPayloadType>(token);

                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    logout();
                }
            } catch {
                logout();
            }
        };

        checkExpiration();

        const interval = setInterval(checkExpiration, 60000);

        return () => clearInterval(interval);
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);

        try {
            const decoded: JWTPayloadType = jwtDecode(newToken);
            setUserRoles(decoded.roles || []);
        } catch (error) {
            console.error('Erreur décodage JWT:', error);
            setUserRoles([]);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        setUserRoles([]);
        setIsImpersonating(false);
    };

    const impersonate = async (email: string) => {
        const adminToken = localStorage.getItem('token');

        if (!adminToken) return;

        localStorage.setItem('adminToken', adminToken);

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}${ENDPOINTS.SUPER_ADMIN_IMPERSONATE(email)}`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${adminToken}` },
            }
        );

        if (!response.ok) {
            localStorage.removeItem('adminToken');
            throw new Error('Impersonation failed');
        }

        const data = await response.json();
        login(data.token);
        setIsImpersonating(true);
    };

    const exitImpersonate = () => {
        const adminToken = localStorage.getItem('adminToken');

        if (!adminToken) return;

        login(adminToken);
        localStorage.removeItem('adminToken');
        setIsImpersonating(false);
    };

    const hasRole = (role: string) => userRoles.includes(role);
    const isUser = () => hasRole('ROLE_USER');
    const isAdmin = () => hasRole('ROLE_ADMIN') || isSuperAdmin();
    const isSuperAdmin = () => hasRole('ROLE_SUPER_ADMIN');

    return (
        <AuthContext.Provider
            value={{
                token,
                userRoles,
                login,
                logout,
                impersonate,
                exitImpersonate,
                hasRole,
                isUser,
                isAdmin,
                isSuperAdmin,
                isAuthenticated: !!token,
                isImpersonating,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* eslint-disable react-refresh/only-export-components */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
