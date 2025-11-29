import { useAuth } from '../../contexts/authContext.tsx';
import React, { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { type ApiError, useApi } from '../../hooks/useApi.tsx';
import type { UserType } from '../../types/User/userType.ts';

function UserForm({ slug }: { slug?: string }) {
    const { apiCall } = useApi();
    const { login } = useAuth();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [authLoading, setAuthLoading] = useState<'login' | 'register' | null>(
        null
    );
    const [error, setError] = useState<boolean>(false);
    const [errorViolations, setErrorViolations] = useState<string[]>([]);
    const [sponsor, setSponsor] = useState<UserType>();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (slug) {
            const fetchData = async () => {
                try {
                    const sponsor = await apiCall(ENDPOINTS.USER_SHOW(slug));

                    setSponsor(sponsor.user);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [apiCall, slug]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setAuthLoading('login');

        try {
            const response = await apiCall(ENDPOINTS.LOGIN, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            login(response.token);
        } catch (error) {
            console.error('Login error:', error);

            showErrorBriefly();
        } finally {
            setAuthLoading(null);
        }
    };

    const handleRegister = async () => {
        setAuthLoading('register');

        try {
            const response = await apiCall(ENDPOINTS.REGISTER, {
                method: 'POST',
                body: JSON.stringify({ email, password, username, slug }),
            });

            login(response.token);
        } catch (error) {
            const apiError = error as ApiError;

            setErrorViolations(
                apiError.violations ? Object.values(apiError.violations) : []
            );

            console.error('Register error:', error);
        } finally {
            setAuthLoading(null);
        }
    };

    const showErrorBriefly = () => {
        setError(true);

        setTimeout(() => {
            setError(false);
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-5 sm:p-8 card-primary">
            <h3 className="text-center animated-neon-title mb-8">Bienvenue</h3>

            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label className="label-retro">Pseudo</label>
                    <input
                        type="username"
                        placeholder="Neo"
                        className={`input-retro ${username.length >= 1 && 'border-retro-accent'}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="text-retro-muted text-xxs sm:text-sm mt-1">
                        Pas nécessaire pour se connecter
                    </p>
                </div>

                <div>
                    <label className="label-retro">Email</label>
                    <input
                        type="email"
                        placeholder="thomas.anderson@gmail.com"
                        className={`input-retro ${email.length >= 5 && 'border-retro-accent'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-retro-muted text-xxs sm:text-sm mt-1">
                        Promis aucun spam ni revente de données
                    </p>
                </div>

                <div>
                    <label className="label-retro">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className={`input-retro ${password.length >= 1 && 'border-retro-accent'} ${error && 'shake border-red-500'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {slug && (
                    <>
                        <div className="flex justify-between">
                            <div className="w-full">
                                <label className="label-retro">
                                    Ton·ta pote adoré·e
                                </label>
                                <input
                                    type="sponsor"
                                    disabled
                                    className="input-retro cursor-not-allowed"
                                    value={sponsor?.username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <img
                                src={
                                    sponsor?.avatarUrl ??
                                    `${import.meta.env.VITE_DICE_URL}${sponsor?.username}`
                                }
                                alt="avatar"
                                className="h-20 pl-2"
                            />
                        </div>
                    </>
                )}

                <div className="flex gap-3 items-center pt-2">
                    <button
                        disabled={email.length < 5 || password.length <= 0}
                        className={`w-full text-xxs sm:text-sm py-2.5 
                            ${email.length >= 5 && password.length >= 5 ? 'btn-primary' : 'btn-disabled'}`}
                    >
                        {authLoading === 'login' ? (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={20}
                            />
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                    <button
                        onClick={handleRegister}
                        type="button"
                        disabled={
                            username.length < 2 ||
                            email.length < 5 ||
                            password.length < 5
                        }
                        className={`w-full text-xxs sm:text-sm py-2.5 
                            ${username.length >= 1 && email.length >= 5 && password.length >= 5 ? 'btn-pixel' : 'btn-disabled'}`}
                    >
                        {authLoading === 'register' ? (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={20}
                            />
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                </div>

                {Object.keys(errorViolations).length > 0 && (
                    <div>
                        <h3 className="font-righteous text-retro-primary text-lg uppercase mb-4 flex items-center gap-2">
                            <RiAlarmWarningLine size={20} />{' '}
                            {Object.keys(errorViolations).length > 1
                                ? 'Erreurs détectées'
                                : 'Erreur détectée'}
                        </h3>
                        <ul className="space-y-3">
                            {Object.entries(errorViolations).map(
                                ([field, message]) => (
                                    <li
                                        key={field}
                                        className="flex items-start gap-3 p-3 bg-retro-primary/10 border-l-[4px] border-retro-primary"
                                    >
                                        <p className="text-retro-muted text-sm">
                                            {message}
                                        </p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
}

export default UserForm;
