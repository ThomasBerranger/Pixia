function GameContent({gameImage}: { gameImage: string | undefined }) {

    return <div className={'h-[65%] flex items-center'}>
        {gameImage ? (
            <img src={`${import.meta.env.VITE_API_URL}${gameImage}`} alt="AI created image"
                 className={'h-full mx-auto'}/>
        ) : (
            <img className={'h-full mx-auto'}
                 src="https://placehold.co/600x300/EEE/31343C?font=oswald&text=Chargement"
                 alt="placegolder"/>
        )}
    </div>
}

export default GameContent
