import {Link} from "react-router-dom"
import {FaUserAstronaut} from "react-icons/fa6"
import {RiUserForbidFill} from "react-icons/ri"
import {useAuth} from "../contexts/authContext.tsx";

function Header() {
    const {isAuthenticated} = useAuth()

    return (
        <>
            <header className={'w-full flex justify-center py-5'}>
                <div
                    className="w-11/12 sm:w-3/4 md:w-3/5 flex justify-between items-center bg-white px-5 py-10 button-shadow">

                    <Link to='/' className={'title text-6xl tracking-tighter'}>PixiA</Link>

                    <div className={'flex items-center justify-between gap-3 text-2xl'}>
                        <Link to='/user'>
                            {isAuthenticated ? (
                                <FaUserAstronaut size='2em'/>
                            ) : (
                                <RiUserForbidFill size='2em'/>
                            )}
                        </Link>
                        <button className={'bg-red-600 text-white tracking-wide button-shadow text-lg p-2'}>Connexion</button>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header
