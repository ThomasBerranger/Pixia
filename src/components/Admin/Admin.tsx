import {Link} from "react-router-dom"
import {FaUsersGear} from "react-icons/fa6";
import {RiAiGenerate2} from "react-icons/ri";
import {MdDashboard} from "react-icons/md";

function Admin() {
    return (
        <section className="min-h-screen flex flex-col justify-center py-10">
            <div className="w-full flex justify-center gap-5">
                <Link to='/admin/user-dashboard' className="card-primary-hover">
                    <FaUsersGear className="mx-auto mb-2" size={30}/>
                    <p className="font-righteous">User Dashboard</p>
                </Link>
                <Link to='/admin/game-dashboard' className="card-primary-hover">
                    <MdDashboard className="mx-auto mb-2" size={30}/>
                    <p className="font-righteous">Game dashboard</p>
                </Link>
                <Link to='/admin/game-generator' className="card-primary-hover">
                    <RiAiGenerate2 className="mx-auto mb-2" size={30}/>
                    <p className="font-righteous">Game generator</p>
                </Link>
            </div>
        </section>
    )
}

export default Admin
