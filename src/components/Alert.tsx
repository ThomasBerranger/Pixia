import { MdDone, MdError, MdWarning, MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAlert } from '../contexts/useAlert.ts';

function Alert() {
    const { isVisible, title, message, duration, type, link, hideAlert } =
        useAlert();

    if (!isVisible) return null;

    const icons = {
        success: <MdDone size={40} />,
        error: <MdError size={40} />,
        warning: <MdWarning size={40} />,
        info: <MdInfo size={40} />,
    };

    const alert = (
        <div className="alert-retro" onClick={hideAlert}>
            <div className="alert-retro-accent-content">
                {icons[type]}
                <div className="font-righteous">
                    <p className="uppercase text-lg tracking-wide">{title}</p>
                    <p className="font-light text-sm">{message}</p>
                </div>
            </div>
            <div
                className="alert-retro-accent-loader"
                style={{ animation: `loader ${duration}ms linear forwards` }}
            />
        </div>
    );

    return link ? <Link to={link}>{alert}</Link> : alert;
}

export default Alert;
