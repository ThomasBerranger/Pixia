import { useAuth } from '../contexts/authContext';
import { useCallback } from 'react';
import { useAppUpdateStore } from '../stores/appUpdateStore.ts';

export interface ApiError extends Error {
    status: number;
    statusText: string;
    detail?: string;
    violations?: Record<string, string>;
}

const API_URL = import.meta.env.VITE_API_URL;

export function buildAssetUrl(path?: string): string {
    return `${API_URL}${path ?? ''}`;
}

export function useApi() {
    const { token } = useAuth();

    const apiCall = useCallback(
        async (
            endpoint: string,
            options: RequestInit = {},
            hasContentType: boolean = true
        ) => {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                ...options,
                headers: {
                    ...(hasContentType && {
                        'Content-Type': 'application/json',
                    }),
                    'X-App-Version': __APP_VERSION__,
                    ...(token && { Authorization: `Bearer ${token}` }),
                    ...options.headers,
                },
            });

            // Le back signale que ce front est trop ancien pour son contrat API.
            // La modale bloquante prend le relais (reload imminent) : on ne
            // résout jamais, pour éviter une erreur parasite chez l'appelant.
            if (response.status === 426) {
                useAppUpdateStore.getState().setOutdated(true);
                return new Promise<never>(() => {});
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                const error = new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                ) as ApiError;

                error.status = response.status;
                error.message = response.statusText;
                error.detail = errorData.detail;
                error.violations = errorData.violations;

                throw error;
            }

            return response.json();
        },
        [token]
    );

    return { apiCall };
}
