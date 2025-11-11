import {Link} from "react-router-dom"
import {ROUTES} from "../../constants/routes.ts"
import {FaUsersGear} from "react-icons/fa6"
import {RiAiGenerate2} from "react-icons/ri"
import {MdDashboard} from "react-icons/md"

function AdminContainer() {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center gap-4 px-10">
            <Link to={ROUTES.ADMIN_USERS} className="card-primary-hover text-center">
                <FaUsersGear className="mx-auto mb-2" size={30}/>
                <p className="font-righteous">User Dashboard</p>
            </Link>
            <Link to={ROUTES.ADMIN_GAMES} className="card-primary-hover text-center">
                <MdDashboard className="mx-auto mb-2" size={30}/>
                <p className="font-righteous">Game dashboard</p>
            </Link>
            <Link to={ROUTES.ADMIN_GENERATOR} className="card-primary-hover text-center">
                <RiAiGenerate2 className="mx-auto mb-2" size={30}/>
                <p className="font-righteous">Game generator</p>
            </Link>
        </section>
    )
}

export default AdminContainer
