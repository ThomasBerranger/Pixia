import {Link} from "react-router-dom"
import {useAuth} from '../contexts/authContext.tsx'
import {useEffect, useState} from "react"
import {useApi} from "../hooks/useApi.tsx"
import type {userType} from "../types/userType.ts"

function UserDashboard() {
    const {apiCall} = useApi()

    const {isAdmin, logout} = useAuth()
    const [user, setUser] = useState<userType | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await apiCall('users/me')
                setUser(currentUser)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <>
        <div className="w-3/5 border border-purple-500 rounded p-5 my-10">
            <p>Email connecté : {user ? user.email : 'Loading'}</p>
            <p>Score du joueur : {user ? user.score : 'Loading'}</p>
            <button className={'btn bg-red-400 text-white rounded p-2 float-end'} onClick={logout}>Me déconnecter
            </button>
            {isAdmin() && (
                <button className={'btn p-2 bg-white rounded float-end'}>
                    <Link to='/admin'>Admin</Link>
                </button>
            )}
        </div>
    </>
}

export default UserDashboard
