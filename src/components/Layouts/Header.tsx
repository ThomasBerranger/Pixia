import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { useModal } from '../../contexts/useModal.tsx';

function Header() {
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

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
                                <p className="mb-2 text-lg">
                                    🎉 Ton Espace Perso est là !
                                </p>
                                Découvre ton tout nouveau tableau de bord pour
                                suivre ta progression sur Pixia !
                                <ul className="space-y-2 mt-1">
                                    <li>
                                        🔝 Vois où tu te situes parmi les autres
                                        joueurs
                                    </li>
                                    <li>
                                        🎮 Découvre ton nombre de parties jouées
                                        et restantes
                                    </li>
                                    <li className="ml-1.5">
                                        ✓ &nbsp;Améliore ton taux de réussite
                                    </li>
                                    <li>
                                        📅 Retrouve ton historique avec tes
                                        dernières images devinées
                                    </li>
                                </ul>
                            </span>
                        )
                    }
                    className="hidden sm:block font-righteous text-white"
                >
                    Nouveautés
                </button>

                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            'Le concept',
                            <span className="text-white font-righteous">
                                Pixia, c'est un jeu où tu dois deviner les 2
                                films qui ont servi à créer l'image du jour.
                                <br />
                                <br />
                                <p className="underline mb-1">
                                    Ta mission, si tu l'acceptes :
                                </p>
                                Tous les jours, une nouvelle image apparaît.
                                Trouve quels films se cachent derrière. Crée un
                                compte pour débloquer des récompenses et suivre
                                tes stats. <br />
                                <br /> Bon chance
                            </span>
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
