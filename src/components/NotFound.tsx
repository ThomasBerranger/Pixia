import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center gap-6 px-10">
            <h1 className="font-title text-retro-primary !text-6xl">404</h1>
            <p className="font-righteous text-xl">
                Fuyez, pauvres fous ! Il n'y a rien à voir ici
            </p>
            <button
                onClick={() => navigate('/')}
                className="btn-primary px-8 py-3"
            >
                Retour au jeu du jour
            </button>
        </section>
    );
}

export default NotFound;
