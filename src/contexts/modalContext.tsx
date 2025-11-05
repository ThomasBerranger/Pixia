import {createContext, useContext, useState, type ReactNode} from 'react'

interface ModalContextType {
    isOpen: boolean
    content: ReactNode
    openModal: (content: ReactNode) => void
    closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({children}: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState<ReactNode>(null)

    const openModal = (newContent: ReactNode) => {
        setContent(newContent)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setTimeout(() => setContent(null), 300)
    }

    return (
        <ModalContext.Provider value={{isOpen, content, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext)
    if (!context) throw new Error('useModal must be used within ModalProvider')
    return context
}