import {createContext, useContext, useState, type ReactNode} from 'react'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface AlertContextType {
    isVisible: boolean,
    title: string,
    message: string,
    type: AlertType,
    duration: number,
    link: string|undefined,
    showAlert: (title: string, message: string, type?: AlertType, duration?: number, link?: string) => void,
    hideAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function AlertProvider({children}: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [type, setType] = useState<AlertType>('success')
    const [duration, setDuration] = useState<number>(3)
    const [link, setLink] = useState<string|undefined>()

    const showAlert = (title: string, message: string, alertType: AlertType = 'success', duration: number = 3000, link?: string) => {
        setTitle(title)
        setMessage(message)
        setType(alertType)
        setIsVisible(true)
        setDuration(duration)
        setLink(link)

        setTimeout(() => setIsVisible(false), duration)
    }

    const hideAlert = () => {
        setIsVisible(false)
    }

    return (
        <AlertContext.Provider value={{isVisible, title, message, type, duration, link, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export function useAlert() {
    const context = useContext(AlertContext)

    if (!context) throw new Error('useAlert must be used within AlertProvider')

    return context
}