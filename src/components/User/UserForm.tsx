import {useAuth} from '../../contexts/authContext.tsx'
import React, {useState} from "react"

function UserForm() {
    const apiUrl = import.meta.env.VITE_API_URL

    const {login} = useAuth()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            if (!response.ok) {
                showErrorBriefly()
                return
            }

            const data = await response.json()
            login(data.token)
        } catch (error) {
            console.error('Login error:', error)

            showErrorBriefly()
        }
    }

    const showErrorBriefly = () => {
        setError(true)

        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    const handleRegister = async () => {
        try {
            const response = await fetch(`${apiUrl}register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()
            login(data.token)
        } catch (error) {
            console.error('Register error:', error)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full p-2 rounded mb-4 border border-black duration-500 ${error && 'bg-red-200'}`}
            />
            <input
                type="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={`w-full p-2 rounded mb-4 border border-black duration-500 ${error && 'bg-red-200'}`}
            />

            <div className="flex justify-evenly">
                <button type="submit" className="bg-blue-400 text-white rounded px-4 py-2">
                    Se connecter
                </button>
                <button onClick={handleRegister} type="button" className="bg-purple-500 text-white rounded px-4 py-2">
                    Créer un compte
                </button>
            </div>
        </form>
    )
}

export default UserForm