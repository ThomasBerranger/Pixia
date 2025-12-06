import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';

function News() {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center gap-6 px-10">
            <h1 className="font-title text-retro-primary text-4xl">
                Nouveautés
            </h1>
            <div className="font-righteous">
                <p className="text-lg my-3">💡Une idée ? 🪲 Un bug ?</p>
                <p className="text-sm">
                    Contribue à l'amélioration de Pixia et gagne des points et
                    des badges depuis l'espace{' '}
                    <p className="font-title text-retro-accent">Suggestions</p>{' '}
                    ton tableau de bord
                </p>
                <div className="flex mt-5 items-center">
                    <img
                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Mirage&accessories=prescription02&accessoriesColor=262e33&clothesColor=e6e6e6&clothing=overall&clothingGraphic=bear&eyebrows=defaultNatural&eyes=side&facialHair=beardLight&facialHairColor=ecdcbf&hairColor=c93305&hatColor=3c4f5c&mouth=serious&skinColor=d08b5b&top=frizzle&accessoriesProbability=100&facialHairProbability=100"
                        alt="avatar"
                        className="h-24"
                    />
                    <div>
                        <p className="text-sm">
                            Les avatars sont arrivés dans Pixia !
                        </p>
                        <p className="text-sm mt-1.5">
                            Va vite customiser le tien !
                        </p>
                    </div>
                </div>
                <p className="text-lg mt-5 mb-2">
                    🤝Le parrainage est arrivé !
                </p>
                <p className="text-sm">
                    Utilise ton lien de parrainage accessible depuis ton espace
                    pour inviter tes amis !
                </p>
                <p className="text-sm">
                    Tu peux aussi partager ton profil et aller voir celui des
                    autres pour surveiller leur avancé
                </p>
            </div>
            <Link to={ROUTES.HOME} className="btn-primary mt-5 px-8 py-3">
                Retour au jeu du jour
            </Link>
        </section>
    );
}

export default News;
