import { useAuth } from '../../contexts/authContext.tsx';
import UserForm from './UserForm.tsx';
import UserDashboard from './UserDashboard/UserDashboard.tsx';

function UserContainer() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="min-h-screen py-10 px-[5%] sm:px-[10%]">
            {isAuthenticated ? <UserDashboard /> : <UserForm />}
        </section>
    );
}

export default UserContainer;
