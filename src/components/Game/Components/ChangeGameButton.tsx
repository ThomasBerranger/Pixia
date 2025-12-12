import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useLayoutEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function ChangeGameButton({
    date,
    isNext,
    onClick,
    isLoading,
}: {
    date: string;
    isNext: boolean;
    onClick: () => void;
    isLoading: boolean;
}) {
    const [width, setWidth] = useState<number>();
    const ref = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
        }
    }, []);

    return (
        <button
            ref={ref}
            onClick={onClick}
            disabled={isLoading}
            style={{ minWidth: width }}
            className={`hidden md:flex absolute bottom-5 ${isNext ? 'right-5' : 'left-5'} 
                btn-pixel-no-hover-effect px-4 py-1.5 text-sm justify-center items-center 
                group-hover:opacity-40 hover:!opacity-100`}
        >
            {isLoading ? (
                <CgSpinner className="animate-spin text-lg" />
            ) : isNext ? (
                <>
                    {format(parseISO(date), 'd MMMM', { locale: fr })}{' '}
                    <BiSolidRightArrow size={14} className="ml-1.5" />
                </>
            ) : (
                <>
                    <BiSolidLeftArrow size={14} className="mr-1.5" />{' '}
                    {format(parseISO(date), 'd MMMM', { locale: fr })}
                </>
            )}
        </button>
    );
}

export default ChangeGameButton;
