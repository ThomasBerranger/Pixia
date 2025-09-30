import AdminHeader from "./Layout/AdminHeader.tsx"
import {useEffect, useState} from "react"
import {useApi} from "../../hooks/useApi.tsx"
import type {UserType} from "../../types/userType.ts"

function AdminUserDashboard() {
    const {apiCall} = useApi()

    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('users')

                setUsers(response)
            } catch (error) {
                console.error('Erreur: ', error)
            }
        }

        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-4/5 my-5 bg-white border border-black">
            <AdminHeader/>

            <div className={'flex justify-center'}>
                <table className="w-2/3 border-collapse">
                    <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Rôles</th>
                        <th className="text-left p-3">Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user =>
                        <tr key={user.email} className="even:bg-gray-100">
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.roles?.join(', ')}</td>
                            <td className="p-3">{user.score}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUserDashboard
