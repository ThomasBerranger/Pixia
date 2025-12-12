import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-center gap-6">
            <img className="h-48 pl-5" src="/gifs/404.gif" alt="travolta gif" />
            <h1 className="font-title text-retro-primary !text-7xl">404</h1>
            <button
                onClick={() => navigate('/')}
                className="btn-primary my-5 px-8 py-3"
            >
                Retour au jeu du jour
            </button>
        </section>
    );
}

export default NotFound;
