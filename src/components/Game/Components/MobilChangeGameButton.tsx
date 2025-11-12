import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useLayoutEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

function ChangeGameButton({
    isNext,
    isLoading,
    onClick,
}: {
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
                    suivant <BiSolidRightArrow size={12} className="ml-1" />
                </>
            ) : (
                <>
                    <BiSolidLeftArrow size={12} className="mr-1" /> précédent
                </>
            )}
        </button>
    );
}

export default ChangeGameButton;
