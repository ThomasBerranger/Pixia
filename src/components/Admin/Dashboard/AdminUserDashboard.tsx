import {useEffect, useState} from "react"
import {useApi} from "../../../hooks/useApi.tsx"
import type {UserType} from "../../../types/userType.ts"

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
        <section className="min-h-[90vh] max-w-3xl mx-auto w-full flex py-10">
            <table className="table-retro">
                <thead>
                <tr>
                    <th>Pseudo</th>
                    <th>Email</th>
                    <th>Points</th>
                    <th>Inscription</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: UserType) => (
                    <tr key={user.id}>
                        <td>John Doe</td>
                        <td>{user.email}</td>
                        <td>
                            <div className="badge-yellow text-center">{user.score}</div>
                        </td>
                        <td>02/11/2025</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default AdminUserDashboard
