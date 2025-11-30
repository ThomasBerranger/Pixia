import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { useModal } from '../../contexts/useModal.tsx';
import { RxDotFilled } from 'react-icons/rx';

function Header() {
    const { isAuthenticated } = useAuth();
    const { openModal, closeModal } = useModal();

    return (
        <header className="bg-retro-surface/80 backdrop-blur-md shadow-[0_4px_40px_rgba(255,0,110,0.3)] px-2 sm:px-[7%] py-4 flex justify-between items-center">
            <Link
                to={ROUTES.HOME}
                className="font-title text-5xl text-retro-primary skew-x-[-10deg] [text-shadow:0_0_10px_#ff006e,3px_2px_0_#ffbe0b]"
            >
                <h1>Pixia</h1>
            </Link>

            <div className="flex items-center gap-5 px-2 sm:p-0">
                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            'Nouveautés',
                            <span className="text-white font-righteous font-light">
                                <p className="text-lg my-3">
                                    💡Une idée ? 🪲 Un bug ?
                                </p>
                                <p className="text-sm">
                                    Contribue à l'amélioration de Pixia et gagne
                                    des points et des badges depuis l'espace{' '}
                                    <Link
                                        to={ROUTES.USER}
                                        onClick={() => closeModal()}
                                        className="font-title text-retro-accent"
                                    >
                                        Suggestions
                                    </Link>{' '}
                                    ton tableau de bord
                                </p>
                                <div className="flex mt-5 items-center">
                                    <img
                                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Mirage&accessories=prescription02&accessoriesColor=262e33&clothesColor=e6e6e6&clothing=overall&clothingGraphic=bear&eyebrows=defaultNatural&eyes=side&facialHair=beardLight&facialHairColor=ecdcbf&hairColor=c93305&hatColor=3c4f5c&mouth=serious&skinColor=d08b5b&top=frizzle&accessoriesProbability=100&facialHairProbability=100"
                                        alt="avatar"
                                        className="h-24"
                                    />
                                    <p className="text-sm">
                                        Les avatars sont arrivés dans Pixia !
                                        <br />
                                        <span className="text-sm">
                                            Va vite customiser le tien !
                                        </span>
                                    </p>
                                </div>
                                <p className="text-lg mt-5 mb-2">
                                    🤝Le parrainage est arrivé !
                                </p>
                                <p className="text-sm">
                                    Utilise ton lien de parrainage accessible
                                    depuis ton espace pour inviter tes amis !
                                </p>
                                <p className="text-sm">
                                    Tu peux aussi partager ton profil et aller
                                    voir celui des autres pour surveiller leur
                                    avancé
                                </p>
                            </span>
                        )
                    }
                    className="hidden sm:flex font-righteous text-white items-center"
                >
                    <RxDotFilled
                        size={20}
                        className="text-retro-primary animate-pulse"
                    />{' '}
                    Nouveautés
                </button>

                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            'Le concept',
                            <div className="text-white font-righteous">
                                <p className="mb-4">
                                    Pixia, c'est un jeu où tu dois deviner les 2
                                    films qui ont servi à créer l'image du jour.
                                </p>
                                <p className="underline mb-1">
                                    Ta mission, si tu l'acceptes :
                                </p>
                                <p className="mb-4">
                                    Tous les jours, une nouvelle image apparaît.
                                    Trouve quels films se cachent derrière. Crée
                                    un compte pour débloquer des récompenses et
                                    suivre tes stats.
                                </p>
                                <p className="mb-4">
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
                                </p>
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
    );
}

export default Header;
