import { RiAiGenerate2 } from 'react-icons/ri';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useModal } from '../hooks/useModal.tsx';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { URLS } from '../constants/routes.ts';
import { Link } from 'react-router-dom';
import { FaTiktok } from 'react-icons/fa';

function Footer() {
    const { openModal, closeModal } = useModal();

    return (
        <footer className="text-center font-righteous px-[5%] py-4 bg-retro-surface/95 shadow-[0_-4px_40px_rgba(255,190,11,0.3)] text-retro-muted text-xs">
            <div className="flex flex-wrap justify-center items-center gap-8 my-2 text-sm">
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
                                <p>Bon chance.</p>
                            </div>
                        )
                    }
                    className="order-first hover:text-retro-accent transition-colors"
                >
                    Le concept
                </button>

                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            "L'équipe",
                            <span className="text-white font-righteous">
                                Salut, moi c'est{' '}
                                <span className="text-retro-accent">
                                    Mirage
                                </span>
                                , je dev solo les idées qui me passent par la
                                tête entre deux films.
                                <br />
                                <br />
                                Si jamais tu souhaites me contacter pour un bug
                                ou autre, envoie moi un mail à{' '}
                                <span className="text-retro-accent">
                                    mirage.pixia@gmail.com
                                </span>
                                , je te répondrai aussi vite que possible.
                            </span>
                        )
                    }
                    className="order-first hover:text-retro-accent transition-colors"
                >
                    L'équipe
                </button>

                <a
                    target="_blank"
                    href="https://www.instagram.com/pixia.mirage/"
                    className="order-first text-lg hover:text-retro-accent"
                >
                    <PiInstagramLogoFill />
                </a>

                <Link
                    to={URLS.HOME}
                    className="order-last skew-x-[-10deg] sm:order-first font-title text-retro-accent text-lg"
                >
                    PIXIA
                </Link>

                <a
                    target="_blank"
                    href="https://www.tiktok.com/@pixia.mirage"
                    className="text-lg hover:text-retro-accent"
                >
                    <FaTiktok />
                </a>

                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            <span className="flex items-center">
                                <RiAiGenerate2 size={40} className="mr-1.5" /> &{' '}
                                <IoColorPaletteOutline
                                    size={40}
                                    className="ml-1"
                                />
                            </span>,
                            <span className="text-white font-righteous">
                                L'intelligence artificielle est au cœur de Pixia
                                pour la génération des images. <br />
                                C'est un outil puissant qui permet de créer ce
                                jeu. <br />
                                <br />
                                Mais on n'oublie pas les artistes ! <br />
                                Pixia est pensé comme un tremplin, pas comme un
                                remplaçant. <br />
                                <br />
                                L'objectif à terme : collaborer avec des
                                illustrateurs, graphistes et artistes pour
                                élever le projet. <br />
                                <br />
                                Si t'es créatif et que ça te parle, la porte est
                                ouverte.
                            </span>
                        )
                    }
                    className="hover:text-retro-accent transition-colors"
                >
                    IA et Art
                </button>

                <button
                    type="button"
                    onClick={() =>
                        openModal(
                            'Mentions légales',
                            <span className="text-white font-righteous">
                                <p className="underline mb-1">Tes données</p>
                                On collecte ton email (pour ton compte), ton IP
                                (pour la sécurité) et c'est tout. Pas de spam,
                                pas de revente, jamais. 🤝
                                <br />
                                <br />
                                <p className="underline mb-1">Cookies</p>
                                🍪 Que des cookies essentiels
                                (authentification). Zéro tracking, zéro pub.
                                <br />
                                <br />
                                <p className="underline mb-1">
                                    Propriété intellectuelle
                                </p>
                                Images générées par IA. Noms de films © ayants
                                droit respectifs. Pixia est un projet à but non
                                lucratif.
                                <br />
                                <br />
                                <p className="w-full text-center">
                                    <Link
                                        to={URLS.CGU}
                                        onClick={closeModal}
                                        className="text-retro-accent underline hover:text-retro-primary transition-colors"
                                    >
                                        Lire les CGU complètes
                                    </Link>
                                </p>
                            </span>
                        )
                    }
                    className="hover:text-retro-accent transition-colors"
                >
                    Mentions légales
                </button>
            </div>
        </footer>
    );
}

export default Footer;
