import { useAuth } from '../../contexts/authContext.tsx';
import UserForm from '../Auth/UserForm.tsx';
import UserDashboard from './UserDashboard/UserDashboard.tsx';
import { useParams } from 'react-router-dom';

function UserContainer() {
    const { slug } = useParams<{ slug?: string }>();

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <UserDashboard /> : <UserForm slug={slug} />;
}

export default UserContainer;
