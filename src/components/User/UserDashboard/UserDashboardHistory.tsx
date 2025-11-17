import type { AchievementType } from '../../../types/Achievement/achievementType.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function UserDashboardHistory({
    history,
}: {
    history: AchievementType[];
}) {
    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Historique récent
            </h2>

            <section className="mb-12">
                {history.map((achievement: AchievementType) => (
                    <div
                        key={achievement.id}
                        className="card-retro-hover-primary text-left flex gap-2 justify-between items-center mb-3"
                    >
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
                        <span className="bg-retro-accent text-retro-bg px-3 py-1 text-xs font-righteous uppercase border-2 border-retro-bg">
                            ✓ Réussi
                        </span>
                    </div>
                ))}
            </section>
        </>
    );
}
