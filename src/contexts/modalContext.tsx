import { createContext, useState, type ReactNode } from 'react';

interface ModalContextType {
    isOpen: boolean;
    header: ReactNode;
    content: ReactNode;
    openModal: (header: ReactNode, content: ReactNode) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [header, setHeader] = useState<ReactNode>(null);
    const [content, setContent] = useState<ReactNode>(null);

    const openModal = (newHeader: ReactNode, newContent: ReactNode) => {
        setHeader(newHeader);
        setContent(newContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setContent(null), 300);
    };

    return (
        <ModalContext.Provider
            value={{ isOpen, header, content, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext };
