import {useAuth} from '../contexts/authContext'

export interface ApiError extends Error {
    status: number;
    statusText: string;
    detail?: string;
}

export function useApi() {
    const {token} = useAuth()
    const apiUrl = import.meta.env.VITE_API_URL

    const apiCall = async (endpoint: string, options: RequestInit = {}, hasContentType: boolean = true) => {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            ...options,
            headers: {
                ...(hasContentType && {'Content-Type': 'application/json'}),
                ...(token && {Authorization: `Bearer ${token}`}),
                ...options.headers
            }
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))

            const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as ApiError

            error.status = response.status
            error.message = response.statusText
            error.detail = errorData.detail

            throw error
        }

        return response.json()
    }

    return {apiCall}
}