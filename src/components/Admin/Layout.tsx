import { Link } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { FaUsersGear } from 'react-icons/fa6';
import { RiAiGenerate2 } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';
import { useAuth } from '../../contexts/authContext.tsx';

function AdminLayout() {
    const { isSuperAdmin } = useAuth();

    return (
        <section className="min-h-[90vh] flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
            {isSuperAdmin() && (
                <Link
                    to={URLS.ADMIN_USERS}
                    className="card-primary-hover text-center w-4/5 sm:w-1/5"
                >
                    <FaUsersGear className="mx-auto mb-2" size={30} />
                    <p className="font-righteous whitespace-nowrap">Joueurs</p>
                </Link>
            )}
            <Link
                to={URLS.ADMIN_GAMES}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <MdDashboard className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Parties</p>
            </Link>
            <Link
                to={URLS.ADMIN_GENERATOR}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <RiAiGenerate2 className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Création</p>
            </Link>
            {isSuperAdmin() && (
                <Link
                    to={URLS.ADMIN_CONTRIBUTIONS}
                    className="card-primary-hover text-center w-4/5 sm:w-1/5"
                >
                    <FaHandsHelping className="mx-auto mb-2" size={30} />
                    <p className="font-righteous whitespace-nowrap">Contribution</p>
                </Link>
            )}
        </section>
    );
}

export default AdminLayout;
