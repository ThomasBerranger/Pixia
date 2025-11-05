import {Link} from "react-router-dom"
import {useAuth} from "../../contexts/authContext.tsx"

function Header() {
    const {isAuthenticated} = useAuth()

    return <header
        className="bg-retro-surface/80 backdrop-blur-md shadow-[0_4px_40px_rgba(255,0,110,0.3)] px-2 sm:px-[7%] py-4 flex justify-between items-center">
        <Link to="/"
              className="font-title text-5xl text-retro-primary skew-x-[-10deg] [text-shadow:0_0_10px_#ff006e,3px_2px_0_#ffbe0b]">
            Pixia
        </Link>

        <div className="flex items-center gap-5">
            <Link to="/" className="hidden sm:block font-righteous text-white">Jeu du jour</Link>
            <Link to="/user">
                <button className="btn-primary px-6 py-2.5">
                    {isAuthenticated ? "MON COMPTE" : "CONNEXION"}
                </button>
            </Link>
        </div>
    </header>
}

export default Header
