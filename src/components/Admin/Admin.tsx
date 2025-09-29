import {Link} from "react-router-dom"
import AdminHeader from "./Layout/AdminHeader.tsx"

function Admin() {
    return (
        <div className="w-4/5 my-5 bg-white border border-black">
            <AdminHeader />

            <div className={'w-full flex justify-evenly gap-5'}>
                <Link to='/admin/user-dashboard' className={'p-5 rounded border border-black'}>
                    User dashboard
                </Link>
                <Link to='/admin/game-dashboard' className={'p-5 rounded border border-black'}>
                    Game dashboard
                </Link>
                <Link to='/admin/game-generator' className={'p-5 rounded border border-black'}>
                    Game generator
                </Link>
            </div>
        </div>
    )
}

export default Admin
