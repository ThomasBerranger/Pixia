import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RxDotFilled } from 'react-icons/rx';
import { FaCheck } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import type { GameType } from '../../../types/Game/gameType.ts';

interface GameBadgeProps {
    game: GameType | undefined;
    className: string;
}

function GameBadge({ game, className }: GameBadgeProps) {
    return (
        <p className={className}>
            {game && game.difficulty ? (
                game.solution ? (
                    <>
                        <FaCheck className="text-xs mr-1" />
                        {format(parseISO(game.date), 'd MMMM', {
                            locale: fr,
                        })}
                    </>
                ) : (
                    <>
                        {format(parseISO(game.date), 'd MMMM', {
                            locale: fr,
                        })}{' '}
                        <RxDotFilled size={20} /> Niveau {game.difficulty}
                    </>
                )
            ) : (
                <CgSpinner className="animate-spin" size={16} />
            )}
        </p>
    );
}

export default GameBadge;
