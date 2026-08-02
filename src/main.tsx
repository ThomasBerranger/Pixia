import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.tsx';
import './index.css';
import App from './App.tsx';

// Un front périmé qui lazy-load un chunk supprimé par un nouveau déploiement
// échoue en `vite:preloadError` → on recharge sur la version courante. Garde
// one-shot par session pour éviter toute boucle si l'échec est persistant.
window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();

    if (sessionStorage.getItem('pixia-preload-reloaded')) {
        return;
    }

    sessionStorage.setItem('pixia-preload-reloaded', '1');
    window.location.reload();
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
