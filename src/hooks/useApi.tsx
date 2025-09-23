import {useAuth} from '../contexts/authContext'

export function useApi() {
    const {token} = useAuth()
    const apiUrl = import.meta.env.VITE_API_URL

    const apiCall = async (endpoint: string, options: RequestInit = {}) => {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && {Authorization: `Bearer ${token}`}),
                ...options.headers
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        return response.json()
    }

    return {apiCall}
}