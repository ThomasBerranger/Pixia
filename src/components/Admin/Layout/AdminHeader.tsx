import {Link} from "react-router-dom";

function AdminHeader() {
    return (
        <h1 className={'title text-4xl text-center py-5'}>
            <Link to="/admin">
                espAce AdmIn
            </Link>
        </h1>
    )
}

export default AdminHeader
