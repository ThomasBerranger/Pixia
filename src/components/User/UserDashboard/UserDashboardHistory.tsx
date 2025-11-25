import type { AchievementType } from '../../../types/Achievement/achievementType.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { TbSeparator } from 'react-icons/tb';

export default function UserDashboardHistory({
    history,
}: {
    history: AchievementType[];
}) {
    return (
        <section className="mt-3">
            {history.map((achievement: AchievementType) => (
                <div
                    key={achievement.id}
                    className="text-left flex gap-2 justify-between items-center py-2"
                >
                    <div className="flex items-center -ml-4">
                        <TbSeparator
                            size={40}
                            className="rotate-90 text-retro-muted"
                        />
                        <div>
                            <div className="text-retro-muted text-xs mb-1 capitalize">
                                {format(
                                    new Date(achievement.date),
                                    'EEEE dd yyyy',
                                    { locale: fr }
                                )}
                            </div>
                            <div className="font-righteous text-white text-lg">
                                {achievement.game.solution}
                            </div>
                        </div>
                    </div>
                    <span className="bg-retro-accent text-retro-bg px-3 py-1 text-xs font-righteous uppercase">
                        ✓ Réussi
                    </span>
                </div>
            ))}
        </section>
    );
}
