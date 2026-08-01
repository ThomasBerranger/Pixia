import type { ApiError } from '../hooks/useApi.tsx';

export const getApiErrorMessage = (error: unknown): string => {
    const apiError = error as ApiError;

    return apiError.violations
        ? Object.values(apiError.violations).join(' ')
        : 'Une erreur est survenue';
};
