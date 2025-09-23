import {useAuth} from '../contexts/authContext.tsx'
import UserForm from "./UserForm.tsx";
import UserDashboard from "./UserDashboard.tsx";

function User() {
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated) {
        return <UserForm/>
    }

    return <UserDashboard/>
}

export default User
