import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';

function Changelog() {
    return (
        <section className="min-h-[91vh] p-10 sm:px-[10vw]">
            <h1 className="font-title text-center text-retro-accent text-4xl mb-8">
                Mises à jour
            </h1>

            <h2 className="font-righteous text-retro-accent text-2xl tracking-wide text-left mb-7">
                ● Version 1.4.1
            </h2>

            <div className="font-righteous mb-10">
                <p className="text-lg mb-1">Mot de passe oublié ? 🔑</p>
                <p className="text-sm mb-7">
                    Pas de panique ! Utilise la nouvelle fonction de
                    récupération de mot de passe directement depuis la page de
                    connexion.
                </p>
                <p className="text-lg mb-1">
                    Pixia parle maintenant français ET anglais
                </p>
                <p className="text-sm mb-7">
                    Une version entièrement traduite de Pixia arrivera un jour,
                    en attendant les réponses fonctionnent désormais avec{' '}
                    <span className="underline">
                        les titres français et anglais
                    </span>
                    .
                </p>
                <p className="text-lg mb-1">Refacto front Mobile First 📱</p>
                <p className="text-sm mb-7">
                    Vous êtes nombreux a profiter de Pixia sur mobile, des
                    améliorations UI/UX ont été apporté au site.
                </p>
                <p className="text-lg mb-1">Un compte en un clic !</p>
                <p className="text-sm mb-7">
                    L'authentification est désormais disponible avec un compte
                    Google !
                </p>
            </div>

            <h2 className="font-righteous text-retro-accent text-2xl tracking-wide text-left mb-7">
                ● Version 1.2.1
            </h2>

            <div className="font-righteous">
                <p className="text-lg mb-1">Une idée ? 💡 Un bug ? 🪲</p>
                <p className="text-sm">
                    Contribue à l'amélioration de Pixia et gagne des points et
                    des badges depuis l'espace{' '}
                    <span className="font-title text-retro-accent">
                        Suggestions
                    </span>{' '}
                    dans ton tableau de bord.
                </p>
                <div className="flex mt-7 items-center">
                    <img
                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Mirage&accessories=prescription02&accessoriesColor=262e33&clothesColor=e6e6e6&clothing=overall&clothingGraphic=bear&eyebrows=defaultNatural&eyes=side&facialHair=beardLight&facialHairColor=ecdcbf&hairColor=c93305&hatColor=3c4f5c&mouth=serious&skinColor=d08b5b&top=frizzle&accessoriesProbability=100&facialHairProbability=100"
                        alt="avatar"
                        className="h-24"
                    />
                    <div>
                        <p className="text-sm">
                            Les avatars sont arrivés dans Pixia !
                            <br />
                            Va vite customiser le tien !
                        </p>
                    </div>
                </div>
                <p className="text-lg mt-7 mb-2">
                    🤝Le parrainage est arrivé !
                </p>
                <p className="text-sm">
                    Utilise ton lien de parrainage accessible depuis ton espace
                    pour inviter tes amis !
                    <br />
                    Tu peux aussi partager ton profil et aller voir celui des
                    autres pour surveiller leur avancé.
                </p>
            </div>

            <div className="text-center mt-16 mb-8">
                <Link to={ROUTES.HOME} className="btn-primary px-8 py-3">
                    Retour au jeu du jour
                </Link>
            </div>
        </section>
    );
}

export default Changelog;
