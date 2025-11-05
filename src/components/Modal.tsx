import {useModal} from '../contexts/modalContext'

function Modal() {
    const {isOpen, content, closeModal} = useModal()

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
        >
            <div
                className="bg-retro-surface/95 backdrop-blur-md border-[3px] border-retro-primary shadow-[0_0_40px_rgba(255,0,110,0.5)] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-retro-accent hover:text-retro-primary text-2xl font-bold"
                >
                    ×
                </button>
                <p className="text-white font-righteous">{content}</p>
            </div>
        </div>
    )
}

export default Modal