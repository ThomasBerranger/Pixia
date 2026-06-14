import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAlert } from '../../hooks/useAlert.ts';

const UNSUBSCRIBED_PARAM = 'unsubscribed';

function UrlAlertWatcher() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { showAlert } = useAlert();

    useEffect(() => {
        if (!searchParams.has(UNSUBSCRIBED_PARAM)) return;

        showAlert(
            'Désinscription confirmée',
            'Tu ne recevras plus de mails automatiques !',
            'success',
            5000
        );

        // Nettoie l'URL : pas de re-déclenchement au refresh ni via l'historique
        const params = new URLSearchParams(searchParams);
        params.delete(UNSUBSCRIBED_PARAM);
        setSearchParams(params, { replace: true });
    }, [searchParams, setSearchParams, showAlert]);

    return null;
}

export default UrlAlertWatcher;
