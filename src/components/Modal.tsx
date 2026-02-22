import { IoClose } from 'react-icons/io5';
import { useModal } from '../hooks/useModal.tsx';
import type { ModalAction } from '../contexts/modalContext.tsx';

const ACTION_STYLES: Record<NonNullable<ModalAction['variant']>, string> = {
    primary: 'btn-success',
    danger: 'btn-neon',
    ghost: 'btn-ghost',
};

function Modal() {
    const { isOpen, header, content, actions, closeModal } = useModal();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
        >
            <div
                className="bg-retro-surface/95 backdrop-blur-md border-[3px] border-retro-primary shadow-[0_0_40px_rgba(255,0,110,0.5)] p-4 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-title animated-neon-title">{header}</h2>
                    <button
                        onClick={closeModal}
                        className="text-retro-accent hover:text-retro-primary"
                    >
                        <IoClose size={35} />
                    </button>
                </div>
                {content}
                {actions.length > 0 && (
                    <div
                        className={`flex gap-3 mt-6 ${actions.length > 1 ? 'justify-between' : 'justify-end'}`}
                    >
                        {actions.map((action) => (
                            <button
                                key={action.label}
                                type="button"
                                onClick={action.onClick}
                                className={`px-4 py-2 text-sm font-righteous ${ACTION_STYLES[action.variant ?? 'primary']}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
