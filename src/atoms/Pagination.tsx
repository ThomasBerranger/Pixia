import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

// A terme : mutualiser les paginations de Pixia
function Pagination({ page, totalPages, onPrevious, onNext }: PaginationProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                onClick={onPrevious}
                disabled={page <= 1}
                aria-label="Page précédente"
                className="text-retro-accent disabled:opacity-50 disabled:text-retro-muted"
            >
                <BiSolidLeftArrow size={22} />
            </button>

            <p className="font-righteous text-sm whitespace-nowrap">
                {page} / {totalPages}
            </p>

            <button
                onClick={onNext}
                disabled={page >= totalPages}
                aria-label="Page suivante"
                className="text-retro-accent disabled:opacity-50 disabled:text-retro-muted"
            >
                <BiSolidRightArrow size={22} />
            </button>
        </div>
    );
}

export default Pagination;
