import {useAuth} from '../../contexts/authContext.tsx'
import UserForm from "./UserForm.tsx";
import UserDashboard from "./UserDashboard.tsx";

function User() {
    const {isAuthenticated} = useAuth()

    return <div className="w-10/12 md:w-2/3 bg-white border border-black rounded p-5 my-10">
        <h1 className={'title text-4xl text-center py-5'}>espAce jOueuR</h1>

        {isAuthenticated ? <UserDashboard/> : <UserForm/>}
    </div>
}

export default User
