import {Link} from "react-router-dom"
import {useAuth} from "../../contexts/authContext.tsx"
import {useModal} from "../../contexts/modalContext.tsx";

function Header() {
    const {isAuthenticated} = useAuth()
    const {openModal} = useModal()

    return <header
        className="bg-retro-surface/80 backdrop-blur-md shadow-[0_4px_40px_rgba(255,0,110,0.3)] px-2 sm:px-[7%] py-4 flex justify-between items-center">
        <Link to="/"
              className="font-title text-5xl text-retro-primary skew-x-[-10deg] [text-shadow:0_0_10px_#ff006e,3px_2px_0_#ffbe0b]">
            Pixia
        </Link>

        <div className="flex items-center gap-5">
            <Link to="/" className="hidden sm:block font-righteous text-white">Jeu du jour</Link>
            <button type="button" onClick={() => openModal(
                'Le concept',
                <p className="text-white font-righteous">
                    Pixia, c'est un jeu où tu dois deviner les 2 films qui ont servi à créer l'image du jour.
                    <br/><br/>
                    <p className="underline mb-1">Ta mission, si tu l'acceptes :</p>
                    Tous les jours, une nouvelle image apparaît. Trouve quels films se cachent derrière. Crée un
                    compte pour débloquer des récompenses et suivre tes stats. <br/><br/> Bon chance
                </p>
            )}
                    className="hidden sm:block font-righteous text-white">Le concept
            </button>
            <Link to="/user">
                <button className="btn-primary px-6 py-2.5">
                    {isAuthenticated ? "MON COMPTE" : "CONNEXION"}
                </button>
            </Link>
        </div>
    </header>
}

export default Header
