import { useAuth } from '../../contexts/authContext.tsx';
import UserForm from './UserForm.tsx';
import UserDashboard from './UserDashboard/UserDashboard.tsx';
import { useParams } from 'react-router-dom';

function UserContainer() {
    const { slug } = useParams<{ slug?: string }>();

    const { isAuthenticated } = useAuth();

    return (
        <section className="min-h-screen py-10 px-[5%] sm:px-[10%]">
            {isAuthenticated ? <UserDashboard /> : <UserForm slug={slug} />}
        </section>
    );
}

export default UserContainer;
