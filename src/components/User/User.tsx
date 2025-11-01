import {useAuth} from '../../contexts/authContext.tsx'
import UserForm from "./UserForm.tsx";
import UserDashboard from "./UserDashboard.tsx";

function User() {
    const {isAuthenticated} = useAuth()

    return <section className="min-h-screen px-[5%] py-10">
        {/*<h1 className={'font-title text-4xl text-center py-5'}>espAce jOueuR</h1>*/}

        {isAuthenticated ? <UserDashboard/> : <UserForm/>}
    </section>
}

export default User
