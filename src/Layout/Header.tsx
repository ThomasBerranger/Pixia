import {Link} from "react-router-dom"
import {FaUserAstronaut} from "react-icons/fa6"
import {RiUserForbidFill} from "react-icons/ri"
import {useAuth} from "../contexts/authContext.tsx";

function Header() {
    const {isAuthenticated} = useAuth()

    return (
        <>
            <header className={'w-full flex justify-between items-center bg-red-50 px-10'}>
                <div>calendrier</div>
                <Link to='/' className={'font-semibold'}>Pixel Brain</Link>
                <div>
                    <Link to='/user'>
                        {isAuthenticated ? (
                            <FaUserAstronaut size='2em'/>
                        ) : (
                            <RiUserForbidFill size='2em'/>
                        )}
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header
