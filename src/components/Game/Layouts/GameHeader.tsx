function GameHeader() {
    return (
        <section className="my-5 md:my-0 md:h-[17%] flex flex-col gap-0.5 items-center justify-center">
            <h2 className="font-title uppercase text-3xl md:text-4xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent [filter:drop-shadow(0_4px_10px_rgba(255,190,11,0.3))] text-center">
                Multiverse
            </h2>

            <p className="text-retro-muted text-xs md:text-base text-center">
                Retrouvez les deux films mélangés dans cette image
            </p>
        </section>
    );
}

export default GameHeader;
