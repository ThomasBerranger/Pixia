import { getGameTypeContent } from '../../../utils/gameType.ts';

function GameHeader({ type }: { type: string | undefined }) {
    const content = getGameTypeContent(type);

    return (
        <section className="my-5 md:my-0 md:h-[17%] flex flex-col gap-0.5 items-center justify-center">
            <h2 className="font-title uppercase text-3xl md:text-4xl bg-gradient-to-br from-retro-primary via-retro-secondary to-retro-accent bg-clip-text text-transparent [filter:drop-shadow(0_4px_10px_rgba(255,190,11,0.3))] text-center">
                {content.title}
            </h2>

            <p className="text-retro-muted text-sm md:text-base text-center">
                {content.instruction.map((segment, index) => (
                    <span
                        key={index}
                        className={segment.bold ? 'font-bold' : undefined}
                    >
                        {segment.text}
                    </span>
                ))}
            </p>
        </section>
    );
}

export default GameHeader;
