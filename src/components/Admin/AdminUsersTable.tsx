import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import { useAuth } from '../../contexts/authContext.tsx';
import type { UserType } from '../../types/User/userType.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { PiEyesFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import Toggle from '../../atoms/Toggle.tsx';
import { hasRole } from '../../utils/user.ts';
import { ROLES } from '../../constants/roles.ts';

function AdminUsersTable() {
    const { apiCall } = useApi();
    const { impersonate } = useAuth();
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(
                    ENDPOINTS.SUPER_ADMIN_USER_INDEX
                );
                setUsers(response);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleImpersonate = async (email: string) => {
        try {
            await impersonate(email);
            navigate(URLS.USER);
        } catch (error) {
            console.error('Erreur impersonation:', error);
        }
    };

    const handleToggleBan = async (email: string) => {
        try {
            const player = await apiCall(
                ENDPOINTS.SUPER_ADMIN_TOGGLE_BAN(email),
                { method: 'POST' }
            );

            setUsers((prev) =>
                prev.map((user) =>
                    user.email === email
                        ? { ...user, roles: player.roles }
                        : user
                )
            );
        } catch (error) {
            console.error('Erreur toggle ban:', error);
        }
    };

    return (
        <section className="min-h-[90vh] max-w-4xl mx-auto w-full flex py-10 px-3">
            <div className="overflow-x-auto w-full">
                <table className="table-retro">
                    <thead>
                        <tr>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Points</th>
                            <th>Action</th>
                            <th>Accès</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: UserType) => (
                            <tr key={user.id}>
                                <td
                                    className={`${user.roles && (hasRole(user.roles, ROLES.ADMIN) || hasRole(user.roles, ROLES.SUPER_ADMIN)) && '!text-retro-primary'}`}
                                >
                                    {user.username}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="badge-accent text-center px-3 py-0.5 w-fit">
                                        {user.score}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn-neon w-full p-1"
                                        onClick={() =>
                                            handleImpersonate(user.email)
                                        }
                                    >
                                        <PiEyesFill className="text-xl mx-auto" />
                                    </button>
                                </td>
                                <td>
                                    {user.roles &&
                                        !hasRole(
                                            user.roles,
                                            ROLES.SUPER_ADMIN
                                        ) && (
                                            <Toggle
                                                checked={
                                                    !!user.roles &&
                                                    !hasRole(
                                                        user.roles,
                                                        ROLES.BANNED
                                                    )
                                                }
                                                onChange={() =>
                                                    handleToggleBan(user.email)
                                                }
                                            />
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default AdminUsersTable;
