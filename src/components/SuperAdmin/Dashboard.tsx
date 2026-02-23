import { Link } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { FaUsersGear } from 'react-icons/fa6';
import { RiAiGenerate2 } from 'react-icons/ri';
import { FaHandsHelping } from 'react-icons/fa';
import { PiCalendarDots } from 'react-icons/pi';
import { MdAdminPanelSettings } from 'react-icons/md';

function Dashboard() {
    return (
        <section className="min-h-[90vh] flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
            <Link
                to={URLS.SUPER_ADMIN_USERS}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <FaUsersGear className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Joueurs</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_GAMES}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <PiCalendarDots className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Parties</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_GENERATOR}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <RiAiGenerate2 className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Création</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_CONTRIBUTIONS}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <FaHandsHelping className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Contribution</p>
            </Link>
            <Link
                to={URLS.ADMIN}
                className="card-primary-hover text-center w-4/5 sm:w-1/5"
            >
                <MdAdminPanelSettings className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Espace admin</p>
            </Link>
        </section>
    );
}

export default Dashboard;
