import { RiAiGenerate2 } from 'react-icons/ri';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useModal } from '../../contexts/useModal';

function Footer() {
    const { openModal } = useModal();

    return (
        <footer className="text-center font-righteous px-[5%] py-4 bg-retro-surface/80 backdrop-blur-md shadow-[0_-4px_40px_rgba(255,190,11,0.3)] text-retro-muted text-xs">
            <div className="flex flex-wrap justify-center items-center gap-8 my-2 text-sm">
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

                <p className="order-last sm:order-first font-title text-retro-accent text-lg">
                    PIXIA
                </p>

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
                                <p className="underline mb-1">Hébergement</p>
                                React : Vercel Inc. <br /> Symfony : Railway
                                Corp.
                                <br />
                                <br />
                                <p className="underline mb-1">
                                    Propriété intellectuelle
                                </p>
                                Images générées par IAs. Noms de films © ayants
                                droit respectifs. Pixia est un projet à but non
                                lucratif.
                                <br />
                                <br />
                                <p className="underline mb-1">
                                    Données personnelles
                                </p>
                                On collecte ton email pour ton compte. Promis
                                pas de spam ni de revente de données. Pour tes
                                droits (accès, suppression), contacte-nous.
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
