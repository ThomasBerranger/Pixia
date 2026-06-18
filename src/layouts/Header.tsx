import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext.tsx';
import { URLS } from '../constants/routes.ts';
import { useModal } from '../hooks/useModal.tsx';

interface HeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}

function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

    return (
        <div className="pb-[11vh]">
            <header
                className="h-[11vh] w-full fixed z-50 flex items-center justify-between px-5
                bg-retro-surface/95 backdrop-blur-md shadow-[0_4px_40px_rgba(255,0,110,0.3)]"
            >
                <Link
                    to={URLS.HOME}
                    onClick={() => setIsSidebarOpen(false)}
                    className="font-title text-5xl text-retro-primary skew-x-[-10deg] [text-shadow:0_0_10px_#ff006e,3px_2px_0_#ffbe0b]"
                >
                    <h1>Pixia</h1>
                </Link>

                <div className="flex sm:hidden items-baseline">
                    <button
                        className={`hamburger hamburger--collapse pt-4 pr-2 ${isSidebarOpen && 'is-active'}`}
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>

                <div className="hidden sm:flex items-center gap-5 font-righteous">
                    <button
                        type="button"
                        onClick={() =>
                            openModal(
                                'Le concept',
                                <div className="text-white font-righteous">
                                    <p className="mb-4">
                                        Chaque jour, une nouvelle image mystère
                                        cache une ou plusieurs œuvres à
                                        reconnaître.
                                    </p>
                                    <p className="underline mb-1">
                                        Ta mission, si tu l'acceptes :
                                    </p>
                                    <p className="mb-4">
                                        Selon le mode du jour, le défi change.
                                        Devine ce qui se cache derrière l'image,
                                        et crée un compte pour débloquer des
                                        récompenses et suivre tes stats.
                                    </p>
                                    <p className="underline mb-2">
                                        Les difficultés :
                                    </p>
                                    <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        <div className="flex items-center">
                                            <p className="badge badge-primary text-xxs mr-1.5">
                                                SIMPLE
                                            </p>{' '}
                                            10 points
                                        </div>
                                        <div className="flex items-center">
                                            <p className="badge badge-primary text-xxs mr-1.5">
                                                VICIEUX
                                            </p>{' '}
                                            15 points
                                        </div>
                                        <div className="flex items-center">
                                            <p className="badge badge-primary text-xxs mr-1.5">
                                                TORDU
                                            </p>{' '}
                                            25 points
                                        </div>
                                        <div className="flex items-center col-span-2 sm:col-span-1">
                                            <p className="badge badge-primary text-xxs mr-1.5">
                                                DIABOLIQUE
                                            </p>{' '}
                                            50 points
                                        </div>
                                        <div className="flex items-center col-span-2 sm:col-span-1">
                                            <p className="badge badge-primary text-xxs mr-1.5">
                                                IMPOSSIBLE
                                            </p>{' '}
                                            80 points
                                        </div>
                                    </div>
                                    <p className="underline mb-1">
                                        Les modes de jeu :
                                    </p>
                                    <ul className="mb-4 list-disc pl-5 space-y-1">
                                        <li>
                                            Multivers — 2 films fusionnés en une
                                            seule image : retrouve les deux.
                                        </li>
                                        <li>
                                            Kawaii — un personnage redessiné en
                                            version kawaii : reconnais-le.
                                        </li>
                                        <li>
                                            Polychrome — un film résumé en
                                            illustration minimaliste : devine
                                            lequel.
                                        </li>
                                        <li>
                                            Convergence — plusieurs indices d'un
                                            même film réunis : devine le film.
                                        </li>
                                    </ul>
                                    <p>Bon chance.</p>
                                </div>
                            )
                        }
                        className="hidden sm:block text-white"
                    >
                        Le concept
                    </button>

                    <Link
                        to={URLS.CHANGELOG}
                        className="flex items-center text-white"
                    >
                        Version {__APP_VERSION__}
                    </Link>

                    <Link to={URLS.ME}>
                        <button className="btn-primary text-xs sm:text-md px-4 py-2 sm:px-6 sm:py-2.5">
                            {isAuthenticated ? 'MON COMPTE' : 'CONNEXION'}
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default Header;
