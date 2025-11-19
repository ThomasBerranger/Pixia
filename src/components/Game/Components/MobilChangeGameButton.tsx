import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useLayoutEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function ChangeGameButton({
    date,
    isNext,
    isLoading,
    onClick,
}: {
    date: string;
    isNext: boolean;
    isLoading: boolean;
    onClick: () => void;
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
            className="btn-pixel-no-hover-effect px-2.5 py-1.5 text-xs flex justify-center items-center"
        >
            {isLoading ? (
                <CgSpinner className="animate-spin" size={16} />
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
