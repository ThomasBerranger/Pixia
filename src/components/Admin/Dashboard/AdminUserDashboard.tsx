import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import type { UserType } from '../../../types/User/userType.ts';
import { ENDPOINTS } from '../../../constants/endpoints.ts';

function AdminUserDashboard() {
    const { apiCall } = useApi();

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(ENDPOINTS.ADMIN_USER_INDEX);

                setUsers(response);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="min-h-[90vh] max-w-3xl mx-auto w-full flex py-10 px-3">
            <table className="table-retro">
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Points</th>
                        {/*<th>Inscription</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: UserType) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className="badge-accent text-center px-3 py-0.5 w-fit">
                                    {user.score}
                                </div>
                            </td>
                            {/*<td className="tracking-wider">*/}
                            {/*    {new Date(user.createdAt).toLocaleDateString(*/}
                            {/*        'fr-FR'*/}
                            {/*    )}*/}
                            {/*</td>*/}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default AdminUserDashboard;
