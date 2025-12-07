import { useContext } from 'react';
import { ModalContext } from '../contexts/modalContext.tsx';

export function useModal() {
    const context = useContext(ModalContext);

    if (!context) throw new Error('useModal must be used within ModalProvider');

    return context;
}
