import { createContext, useState, type ReactNode } from 'react';

export interface ModalAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger' | 'ghost';
}

interface ModalContextType {
    isOpen: boolean;
    header: ReactNode;
    content: ReactNode;
    actions: ModalAction[];
    openModal: (
        header: ReactNode,
        content: ReactNode,
        actions?: ModalAction[]
    ) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [header, setHeader] = useState<ReactNode>(null);
    const [content, setContent] = useState<ReactNode>(null);
    const [actions, setActions] = useState<ModalAction[]>([]);

    const openModal = (
        newHeader: ReactNode,
        newContent: ReactNode,
        newActions?: ModalAction[]
    ) => {
        setHeader(newHeader);
        setContent(newContent);
        setActions(newActions ?? []);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setContent(null);
            setActions([]);
        }, 300);
    };

    return (
        <ModalContext.Provider
            value={{ isOpen, header, content, actions, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext };
