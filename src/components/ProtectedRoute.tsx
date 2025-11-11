import React from "react"
import {useAuth} from '../contexts/authContext'
import {Navigate} from 'react-router-dom'
import {ROUTES} from "../constants/routes.ts"

function ProtectedRoute({children, requiredRole}: { children: React.ReactNode, requiredRole?: string }) {
    const {isAuthenticated, hasRole} = useAuth()

    if (!isAuthenticated || requiredRole && !hasRole(requiredRole)) {
        return <Navigate to={ROUTES.USER} replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute