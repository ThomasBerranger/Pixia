import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import { useAuth } from '../../contexts/authContext.tsx';
import { useModal } from '../../hooks/useModal.tsx';
import type { UserType } from '../../types/User/userType.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { PiEyesFill, PiPencilSimpleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { hasRole } from '../../utils/user.ts';
import { ROLES, type Role } from '../../constants/roles.ts';
import UserAvatar from '../../atoms/UserAvatar.tsx';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const EDITABLE_ROLES: Role[] = [ROLES.USER, ROLES.BANNED, ROLES.ADMIN];

interface UserEditFormProps {
    user: UserType;
    onSave: (role: Role, tokens: number) => void;
}

function UserEditForm({ user, onSave }: UserEditFormProps) {
    const [role, setRole] = useState<Role>(
        (user.roles as Role[])?.find((r) => EDITABLE_ROLES.includes(r)) ??
            ROLES.USER
    );
    const [tokens, setTokens] = useState<number>(user.tokens ?? 0);

    return (
        <div className="font-righteous space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-evenly gap-2">
                <div className="flex items-center">
                    <UserAvatar
                        avatarUrl={user.avatarUrl}
                        username={user.username}
                        className="h-14 rounded-full"
                    />
                    <div>
                        <p className="text-lg text-retro-accent">
                            {user.username}
                        </p>
                        <p className="text-sm text-retro-muted">{user.email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-retro-muted">
                    <p>
                        Score : <span className="text-white">{user.score}</span>
                    </p>
                    <p>
                        Inscrit le{' '}
                        <span className="text-white">
                            {format(parseISO(user.createdAt), 'd MMM yyyy', {
                                locale: fr,
                            })}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="w-full">
                    <label className="block text-sm text-retro-muted mb-1">
                        Rôle
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                        className="w-full input-retro-primary"
                    >
                        {EDITABLE_ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <label className="block text-sm text-retro-muted mb-1">
                        Jetons
                    </label>
                    <input
                        type="number"
                        value={tokens}
                        onChange={(e) =>
                            setTokens(parseInt(e.target.value, 10) || 0)
                        }
                        className="w-full input-retro-primary"
                    />
                </div>
            </div>

            <button
                className="btn-primary w-full py-2"
                onClick={() => onSave(role, tokens)}
            >
                Sauvegarder
            </button>
        </div>
    );
}

function AdminUsersTable() {
    const { apiCall } = useApi();
    const { impersonate } = useAuth();
    const { openModal, closeModal } = useModal();
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

    const handleImpersonate = async (id: string) => {
        try {
            await impersonate(id);

            navigate(URLS.ME);
        } catch (error) {
            console.error('Erreur impersonation:', error);
        }
    };

    const handleEditUser = (user: UserType) => {
        const handleSave = async (role: Role, tokens: number) => {
            try {
                const updatedUser = await apiCall(
                    ENDPOINTS.SUPER_ADMIN_USER_UPDATE(user.id),
                    {
                        method: 'PATCH',
                        body: JSON.stringify({ role, tokens }),
                    }
                );

                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === updatedUser.id ? updatedUser : u
                    )
                );

                closeModal();
            } catch (error) {
                console.error('Erreur mise à jour utilisateur:', error);
            }
        };

        openModal('Gestion', <UserEditForm user={user} onSave={handleSave} />);
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
                                    <div className="flex gap-2">
                                        <button
                                            className="btn-ghost px-3 py-1"
                                            onClick={() =>
                                                handleImpersonate(user.id)
                                            }
                                        >
                                            <PiEyesFill className="text-xl mx-auto" />
                                        </button>
                                        <button
                                            className="btn-neon px-3 py-1"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            <PiPencilSimpleFill className="text-xl mx-auto" />
                                        </button>
                                    </div>
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
