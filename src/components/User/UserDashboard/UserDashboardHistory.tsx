import type { AchievementType } from '../../../types/Achievement/achievementType.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaCheck } from 'react-icons/fa';

export default function UserDashboardHistory({
    history,
}: {
    history: AchievementType[];
}) {
    return (
        <>
            {history.map((achievement: AchievementType) => (
                <div
                    key={achievement.game.solution}
                    className="text-left flex gap-2 justify-between items-center py-2"
                >
                    <div className="flex items-center border-retro-line-muted">
                        <div className="line-muted"></div>
                        <div>
                            <div className="text-retro-muted text-xs mb-1 capitalize tracking-wide">
                                {format(
                                    new Date(achievement.date),
                                    'EEEE dd/MM/yyyy',
                                    { locale: fr }
                                )}
                            </div>
                            <div className="font-righteous text-sm sm:text-base text-white">
                                {achievement.game.solution}
                            </div>
                        </div>
                    </div>
                    <span className="badge-accent-no-border sm:text-xs">
                        <FaCheck /> Réussi
                    </span>
                </div>
            ))}
        </>
    );
}
