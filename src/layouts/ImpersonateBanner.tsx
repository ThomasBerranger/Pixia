import { useAuth } from '../contexts/authContext.tsx';
import { PiEyesFill } from 'react-icons/pi';

function ImpersonateBanner() {
    const { isImpersonating, exitImpersonate } = useAuth();

    if (!isImpersonating) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] py-2 px-4 flex items-center justify-center">
            <button
                onClick={exitImpersonate}
                className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-yellow-500 text-black px-8 py-2 rounded text-xl font-righteous"
            >
                <PiEyesFill />
                Revenir
            </button>
        </div>
    );
}

export default ImpersonateBanner;
