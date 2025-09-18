import {Link} from "react-router-dom"
import {useAuth} from '../contexts/authContext.tsx'
import React, {useState} from "react"

function User() {
    const apiUrl = import.meta.env.VITE_API_URL
    const {token, isAuthenticated, isAdmin, login, logout} = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()

            login(data.token)
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    // Si pas connecté, affiche le formulaire de login
    if (!isAuthenticated) {
        return (
            <form onSubmit={handleLogin} className="p-8">
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="block w-full p-2 border mb-4"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="block w-full p-2 border mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Login
                </button>
            </form>
        )
    }

    // Si connecté, affiche l'interface admin normale
    return (
        <div className="w-3/5 border border-purple-500 rounded p-5 my-10">
            <p className={'truncate'}>Connecté avec token: {token}</p>
            <button className={'btn bg-red-400 text-white rounded p-2'} onClick={logout}>Me déconnecter</button>
            {isAuthenticated && isAdmin() && (
                <button className={'btn p-2 bg-white rounded'}>
                    <Link to='/admin'>Admin</Link>
                </button>
            )}
        </div>
    )
}

export default User
