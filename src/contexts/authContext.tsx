import {createContext, useContext, useState, type ReactNode} from 'react'
import {jwtDecode} from 'jwt-decode'
import type {AuthContextType} from "../types/authContextType.ts"
import type {JWTPayloadType} from "../types/JWTPayloadType.ts"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token')
    })

    const [userRoles, setUserRoles] = useState<string[]>(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            try {
                const decoded: JWTPayloadType = jwtDecode(savedToken)
                return decoded.roles || []
            } catch (error) {
                console.error('Erreur décodage JWT:', error)
                return []
            }
        }
        return []
    })

    const login = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)

        try {
            const decoded: JWTPayloadType = jwtDecode(newToken)
            setUserRoles(decoded.roles || [])
        } catch (error) {
            console.error('Erreur décodage JWT:', error)
            setUserRoles([])
        }
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
        setUserRoles([])
    }

    const hasRole = (role: string) => userRoles.includes(role)
    const isUser = () => hasRole('ROLE_USER')
    const isAdmin = () => hasRole('ROLE_ADMIN')

    return (
        <AuthContext.Provider value={{
            token,
            userRoles,
            login,
            logout,
            hasRole,
            isUser,
            isAdmin,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    )
}

/* eslint-disable react-refresh/only-export-components */
export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}