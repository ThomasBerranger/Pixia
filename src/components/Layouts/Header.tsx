import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { useModal } from '../../contexts/useModal.tsx';

interface HeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}

function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

    return (
        <>
            <header
                className="h-[9vh] w-full fixed z-50 flex items-center justify-between px-3
                bg-retro-surface/95 backdrop-blur-md shadow-[0_4px_40px_rgba(255,0,110,0.3)]"
            >
                <Link
                    to={ROUTES.HOME}
                    onClick={() => setIsSidebarOpen(false)}
                    className="font-title text-5xl text-retro-primary skew-x-[-10deg] [text-shadow:0_0_10px_#ff006e,3px_2px_0_#ffbe0b]"
                >
                    <h1>Pixia</h1>
                </Link>

                <button
                    className={`sm:hidden hamburger hamburger--collapse pt-4 pr-2 ${isSidebarOpen && 'is-active'}`}
                    type="button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                <div className="hidden sm:flex items-center gap-5 px-2 sm:p-0">
                    <Link to={ROUTES.NEWS}>Nouveautés</Link>

                    <button
                        type="button"
                        onClick={() =>
                            openModal(
                                'Le concept',
                                <div className="text-white font-righteous">
                                    <p className="mb-4">
                                        Pixia, c'est un jeu où tu dois deviner
                                        les 2 films qui ont servi à créer
                                        l'image du jour.
                                    </p>
                                    <p className="underline mb-1">
                                        Ta mission, si tu l'acceptes :
                                    </p>
                                    <p className="mb-4">
                                        Tous les jours, une nouvelle image
                                        apparaît. Trouve quels films se cachent
                                        derrière. Crée un compte pour débloquer
                                        des récompenses et suivre tes stats.
                                    </p>
                                    <div className="mb-4">
                                        <div className="flex items-center">
                                            <p className="badge badge-primary text-xxs mr-2.5">
                                                SIMPLE
                                            </p>{' '}
                                            10 points
                                        </div>
                                        <div className="flex items-center my-2">
                                            <p className="badge badge-primary text-xxs mr-2.5">
                                                TORDU
                                            </p>{' '}
                                            25 points
                                        </div>
                                        <div className="flex items-center">
                                            <p className="badge badge-primary text-xxs mr-2.5">
                                                DIABOLIQUE
                                            </p>{' '}
                                            50 points
                                        </div>
                                    </div>
                                    <p>Bon chance</p>
                                </div>
                            )
                        }
                        className="hidden sm:block font-righteous text-white"
                    >
                        Le concept
                    </button>

                    <Link to={ROUTES.USER}>
                        <button className="btn-primary text-xs sm:text-md px-4 py-2 sm:px-6 sm:py-2.5">
                            {isAuthenticated ? 'MON COMPTE' : 'CONNEXION'}
                        </button>
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Header;
