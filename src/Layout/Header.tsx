import {Link} from "react-router-dom"
import {useAuth} from "../contexts/authContext.tsx"

function Header() {
    const {isAuthenticated} = useAuth()

    return (
        <>
            <header className={'w-full flex justify-center py-5'}>
                <div
                    className="w-11/12 sm:w-3/4 md:w-3/5 flex justify-between bg-white px-5 button-shadow">

                    <Link to='/' className={'title text-6xl tracking-tighter my-auto'}>PixiA</Link>

                    <div className={'flex items-center justify-between gap-3 text-2xl'}>
                        <Link to='/user'>
                            <button
                                className={'bg-red-600 text-white button-shadow text-lg py-2 px-4'}>
                                {isAuthenticated ? "Mon compte" : "Connexion"}
                            </button>
                        </Link>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header
