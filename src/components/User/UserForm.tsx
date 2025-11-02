import {useAuth} from '../../contexts/authContext.tsx'
import React, {useState} from "react"
import {CgSpinner} from "react-icons/cg";

function UserForm() {
    const apiUrl = import.meta.env.VITE_API_URL

    const {login} = useAuth()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [authLoading, setAuthLoading] = useState<'login' | 'register' | null>(null)
    const [error, setError] = useState<boolean>(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        setAuthLoading('login')

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
        } finally {
            setAuthLoading(null)
        }
    }

    const showErrorBriefly = () => {
        setError(true)

        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    const handleRegister = async () => {
        setAuthLoading('register')

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
        } finally {
            setAuthLoading(null)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-retro-surface/80 border-[3px]
        border-retro-primary shadow-[6px_6px_0] shadow-retro-secondary">

            <h3 className="font-title text-center text-3xl text-retro-accent mb-6 uppercase animate-[neon-flicker_4s_infinite]
    [text-shadow:0_0_10px_rgba(255,190,11,0.8),0_0_20px_rgba(255,190,11,0.6),0_0_30px_rgba(255,190,11,0.4)]">
                Bienvenue
            </h3>

            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label className="label-retro">Pseudo</label>
                    <input type="username" placeholder="Neo"
                           className={`input-retro ${username.length >= 1 && 'border-retro-accent'}`}
                           value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div>
                    <label className="label-retro">Email</label>
                    <input type="email" placeholder="thomas.anderson@gmail.com"
                           className={`input-retro ${email.length >= 5 && 'border-retro-accent'}`}
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p className="text-retro-muted text-sm mt-1">
                        Promis aucun spam ni revente de données
                    </p>
                </div>

                <div>
                    <label className="label-retro">Mot de passe</label>
                    <input type="password" placeholder="••••••••"
                           className={`input-retro ${password.length >= 1 && 'border-retro-accent'} ${error && 'shake border-red-500'}`}
                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="flex gap-4">
                    <button disabled={email.length < 5 || password.length <= 0}
                            className="flex-1 px-6 py-3 btn-primary">{authLoading === 'login' ?
                        <CgSpinner className="animate-spin mx-auto" size={20}/> : 'Connexion'}</button>
                    <button onClick={handleRegister} type="button" className="flex-1 px-6 py-3 btn-pixel">
                        {authLoading === 'register' ?
                            <CgSpinner className="animate-spin mx-auto" size={20}/> : "S'inscrire"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserForm