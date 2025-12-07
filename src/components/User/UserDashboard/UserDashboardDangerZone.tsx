import { useAuth } from '../../../contexts/authContext.tsx';
import type { UserType } from '../../../types/User/userType.ts';
import React, { useState } from 'react';
import { type ApiError, useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { CgSpinner } from 'react-icons/cg';
import { useAlert } from '../../../hooks/useAlert.ts';

export default function UserDashboardDangerZone({
    user,
}: {
    user: UserType | undefined;
}) {
    const { apiCall } = useApi();
    const { login, logout } = useAuth();
    const { showAlert } = useAlert();

    const [username, setUsername] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);

    async function handleUpdate(e?: React.FormEvent): Promise<void> {
        e?.preventDefault();

        setUpdateLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.USER_UPDATE, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...(username !== undefined &&
                        username !== '' && { username }),
                    ...(email !== undefined && email !== '' && { email }),
                }),
            });

            login(response.token);

            showAlert(
                'Données mis à jour',
                'Tes informations ont été modifiées avec succès.',
                'success'
            );

            setUsername('');
            setEmail('');
        } catch (error) {
            const apiError = error as ApiError;

            showAlert(
                'Problème rencontré',
                apiError.violations
                    ? Object.values(apiError.violations).join(' ')
                    : 'Une erreur est survenue',
                'error'
            );
        } finally {
            setUpdateLoading(false);
        }
    }

    return (
        <section>
            <div className="p-8 bg-retro-surface/80 border-[3px] border-retro-primary">
                <h2 className="font-title text-center sm:text-left text-2xl text-retro-primary mb-6 uppercase">
                    DANGER ZONE
                </h2>

                <form
                    className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-6"
                    onSubmit={handleUpdate}
                >
                    <div className="sm:col-span-2">
                        <h3 className="font-righteous text-retro-accent text-sm uppercase mb-2">
                            Changer de pseudo
                        </h3>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={user?.username}
                            className="input-retro"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <h3 className="font-righteous text-retro-accent text-sm uppercase mb-2">
                            Changer d'email
                        </h3>
                        <div className="flex-wrap sm:flex gap-4">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder={user?.email}
                                className="input-retro"
                            />
                        </div>
                    </div>

                    <button
                        disabled={
                            !(
                                (username && username.length > 1) ||
                                (email && email.length > 1)
                            )
                        }
                        className={`px-0 py-2.5 mt-1 sm:mt-7 w-full ${!((username && username.length > 1) || (email && email.length > 1)) ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        {updateLoading ? (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={20}
                            />
                        ) : (
                            'Modifier'
                        )}
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div>
                        <h3 className="font-righteous text-retro-primary text-sm uppercase mb-2">
                            Se déconnecter
                        </h3>
                        <button
                            className="w-full px-6 py-3 btn-neon"
                            onClick={logout}
                        >
                            👋 A bientôt
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
