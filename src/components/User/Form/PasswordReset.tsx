import { useAuth } from '../../../contexts/authContext.tsx';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { useApi } from '../../../hooks/useApi.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.ts';

function UserForm() {
    const { apiCall } = useApi();
    const { login } = useAuth();
    const navigate = useNavigate();

    const { resetToken } = useParams<{ resetToken: string }>();

    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mailSent, setMailSent] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSendMail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.length < 5) {
            setError("L'email doit faire au moins 5 caractères");
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await apiCall(ENDPOINTS.FORGOT_PASSWORD, {
                method: 'POST',
                body: JSON.stringify({ email }),
            });

            setMailSent(true);
        } catch (error) {
            console.error('Forgot password error:', error);
            setError('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 5) {
            setError('Le mot de passe doit faire au moins 5 caractères');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await apiCall(ENDPOINTS.PASSWORD_RESET, {
                method: 'POST',
                body: JSON.stringify({ token: resetToken, password: password }),
            });

            login(response.token);
            navigate(ROUTES.USER);
        } catch (error) {
            console.error('Password reset error:', error);
            setError('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-[89vh] flex justify-center items-center p-10">
            <div className="card-primary sm:w-1/2 text-center">
                <h3 className="animated-neon-title mb-10">Mot de passe :</h3>

                {resetToken ? (
                    <form onSubmit={handleResetPassword}>
                        <label className="label-retro text-left">
                            Nouveau mot de passe
                        </label>
                        {error && (
                            <li className="flex items-start mb-1 p-3 bg-retro-primary/10 border-l-[4px] border-retro-primary">
                                <p className="text-retro-muted text-sm">
                                    {error}
                                </p>
                            </li>
                        )}
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className={`input-retro ${password.length >= 5 && 'border-retro-accent'} ${error && 'shake border-red-500'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn-primary mt-6 px-8 py-3">
                            {isLoading ? (
                                <CgSpinner className="animate-spin text-lg" />
                            ) : (
                                <>Cette fois je ne l'oublie pas</>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSendMail}>
                        <label className="label-retro text-left">Email</label>
                        {error && (
                            <li className="flex items-start mb-1 p-3 bg-retro-primary/10 border-l-[4px] border-retro-primary">
                                <p className="text-retro-muted text-sm">
                                    {error}
                                </p>
                            </li>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="thomas.anderson@gmail.com"
                            className={`input-retro ${email.length >= 5 && 'border-retro-accent'}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            disabled={mailSent}
                            className={`mt-6 px-8 py-3 ${mailSent ? 'btn-disabled' : 'btn-primary'}`}
                        >
                            {mailSent ? (
                                <>Regarde tes mails</>
                            ) : isLoading ? (
                                <CgSpinner className="animate-spin text-lg" />
                            ) : (
                                <>Envoyer le lien</>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

export default UserForm;
