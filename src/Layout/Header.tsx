import {Link} from "react-router-dom";

function Header() {
    return (
        <>
            <header className={'w-full flex justify-between items-center bg-red-50 px-10'}>
                <div>calendrier</div>
                <Link to='/' className={'font-semibold'}>Pixel Brain</Link>
                <div>
                    <p>user icon</p>
                    <Link to='/admin'>admin link</Link>
                </div>
            </header>
        </>
    )
}

export default Header
