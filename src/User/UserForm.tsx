import {useAuth} from '../contexts/authContext.tsx'
import {useState} from "react"

function UserForm() {
    const apiUrl = import.meta.env.VITE_API_URL
    const {login} = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
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
        <div className={'p-5 bg-white'}>
            < input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 rounded mb-4 border border-black"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 rounded mb-4 border border-black"
            />
            <div className="flex justify-evenly">
                <button onClick={handleLogin} type="button" className="bg-blue-400 text-white rounded px-4 py-2">
                    Se connecter
                </button>
                <button onClick={handleRegister} type="button" className="bg-purple-500 text-white rounded px-4 py-2">
                    Créer un compte
                </button>
            </div>
        </div>
    )
}

export default UserForm
