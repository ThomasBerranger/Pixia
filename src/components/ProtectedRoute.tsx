import {useAuth} from '../contexts/authContext'
import {Navigate} from 'react-router-dom'
import React from "react"

function ProtectedRoute({children, requiredRole}: { children: React.ReactNode, requiredRole?: string }) {
    const {isAuthenticated, hasRole} = useAuth()

    if (!isAuthenticated || requiredRole && !hasRole(requiredRole)) {
        return <Navigate to="/user" replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute