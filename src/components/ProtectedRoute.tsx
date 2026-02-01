import React from 'react';
import { useAuth } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import { type Role, ROLES } from '../constants/roles.ts';

function ProtectedRoute({
    children,
    requiredRole,
}: {
    children: React.ReactNode;
    requiredRole?: Role;
}) {
    const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();

    if (
        !isAuthenticated ||
        (requiredRole === ROLES.ADMIN && !isAdmin()) ||
        (requiredRole === ROLES.SUPER_ADMIN && !isSuperAdmin())
    ) {
        return <Navigate to={ROUTES.USER} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
