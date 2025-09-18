import {BsThreeDots} from 'react-icons/bs'

function Game() {
    return (
        <>
            <div className="border border-purple-500 rounded p-5">
                <img src="http://localhost:8000/images/multivers/2025/09/18.png" alt="placeholder" className={'h-80'}/>

                <div className="flex items-center justify-center space-x-1 mt-5">
                    <button>Précédent</button>
                    <button>1</button>
                    <button>2</button>
                    <BsThreeDots/>
                    <button>5</button>
                </div>

                <input className={'w-full text-center rounded mt-5 p-0.5'} placeholder="solution"/>

                <div className="flex justify-between gap-2">
                    <button className={'btn bg-white w-full rounded my-3 px-1'}>Indice ?</button>
                    <button className={'btn bg-white w-full rounded my-3 px-1'}>Envoyer</button>
                </div>
            </div>
        </>
    )
}

export default Game
