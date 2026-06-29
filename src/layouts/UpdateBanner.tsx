import { MdSystemUpdateAlt } from 'react-icons/md';
import { usePwaUpdate } from '../hooks/usePwaUpdate.tsx';

function UpdateBanner() {
    const { needRefresh, update } = usePwaUpdate();

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] w-[90vw] sm:w-auto">
            <div className="flex items-center gap-3 bg-retro-accent text-retro-bg p-3 border-[3px] border-retro-bg shadow-[4px_4px_0] shadow-retro-bg">
                <MdSystemUpdateAlt size={32} className="shrink-0" />
                <div className="font-righteous flex-1 min-w-0">
                    <p className="uppercase text-lg tracking-wide">
                        Nouvelle version
                    </p>
                    <p className="font-light text-sm">
                        Une mise à jour de Pixia est disponible.
                    </p>
                </div>
                <button
                    onClick={update}
                    className="btn-primary whitespace-nowrap"
                >
                    Mettre à jour
                </button>
            </div>
        </div>
    );
}

export default UpdateBanner;
