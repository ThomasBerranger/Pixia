import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi"
import {useLayoutEffect, useRef, useState} from "react"
import {CgSpinner} from "react-icons/cg"

function ChangeGameButton({isNext, onClick, isLoading}: {
    isNext: boolean,
    onClick: () => void,
    isLoading: boolean,
}) {
    const [width, setWidth] = useState<number>()
    const ref = useRef<HTMLButtonElement>(null)

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth)
        }
    }, [])

    return (
        <button
            ref={ref}
            onClick={onClick}
            disabled={isLoading}
            style={{minWidth: width}}
            className={`hidden sm:flex absolute bottom-5 ${isNext ? 'right-5' : 'left-5'} btn-pixel-no-hover-effect px-7 py-2.5 text-xs 
                transition-all duration-300 ease-in-out group-hover:opacity-40 hover:!opacity-100 justify-center items-center`}>
            {isLoading ? (
                <CgSpinner className="animate-spin" size={16}/>
            ) : isNext ? (
                <>
                    suivant <BiSolidRightArrow size={12} className="ml-1"/>
                </>
            ) : (
                <>
                    <BiSolidLeftArrow size={12} className="mr-1"/> précédent
                </>
            )}
        </button>
    )
}

export default ChangeGameButton