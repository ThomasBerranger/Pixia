import { Link } from 'react-router-dom';
import { URLS } from '../../constants/routes.ts';
import { FaUsersGear } from 'react-icons/fa6';
import { RiAiGenerate2 } from 'react-icons/ri';
import { FaHandsHelping } from 'react-icons/fa';
import { PiCalendarDots } from 'react-icons/pi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { LuActivity } from 'react-icons/lu';

function Dashboard() {
    return (
        <section className="min-h-[90vh] grid sm:grid-cols-4 gap-4 p-[16vw]">
            <Link
                to={URLS.SUPER_ADMIN_USERS}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <FaUsersGear className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Joueurs</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_GAMES}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <PiCalendarDots className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Parties</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_GENERATOR}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <RiAiGenerate2 className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Création</p>
            </Link>
            <Link
                to={URLS.SUPER_ADMIN_CONTRIBUTIONS}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <FaHandsHelping className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Contribution</p>
            </Link>
            <Link
                to={URLS.ADMIN}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <MdAdminPanelSettings className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Espace admin</p>
            </Link>
            <Link
                to={URLS.ADMIN}
                className="card-primary-hover flex flex-col items-center justify-center"
            >
                <LuActivity className="mx-auto mb-2" size={30} />
                <p className="font-righteous whitespace-nowrap">Activité</p>
            </Link>
        </section>
    );
}

export default Dashboard;
