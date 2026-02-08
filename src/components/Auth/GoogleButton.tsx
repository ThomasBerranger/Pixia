import { GrGoogle } from 'react-icons/gr';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { useApi } from '../../hooks/useApi.tsx';
import { useAuth } from '../../contexts/authContext.tsx';

function GoogleButtonContent({ slug }: { slug?: string }) {
    const { apiCall } = useApi();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleAuth = useGoogleLogin({
        onSuccess: async (googleAccessToken) => {
            setIsLoading(true);

            try {
                const response = await apiCall(ENDPOINTS.GOOGLE_AUTH, {
                    method: 'POST',
                    body: JSON.stringify({
                        googleAccessToken: googleAccessToken,
                        sponsor: slug,
                    }),
                });

                login(response.token);
            } catch (error) {
                console.error('Login error:', error);
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => setIsLoading(false),
    });

    return (
        <button
            type="button"
            onClick={() => handleGoogleAuth()}
            className="h-fit w-full flex justify-center items-center btn-pixel p-2.5 text-xxs sm:text-sm"
        >
            {isLoading ? (
                <CgSpinner className="text-xl animate-spin" />
            ) : (
                <>
                    <GrGoogle className="mr-1.5 text-xs" />
                    <span>Connexion avec Google</span>
                </>
            )}
        </button>
    );
}

export function GoogleButton({ slug }: { slug?: string }) {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleButtonContent slug={slug} />
        </GoogleOAuthProvider>
    );
}
