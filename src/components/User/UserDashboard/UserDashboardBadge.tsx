import type { BadgeType } from '../../../types/Badge/badgeType.ts';
import { BADGES } from '../../../constants/badges.ts';

export default function UserDashboardBadge({
    badges,
}: {
    badges: BadgeType[] | undefined;
}) {
    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Badges
            </h2>

            <section
                className="overflow-x-auto mb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                md:[&::-webkit-scrollbar]:block md:[-ms-overflow-style:auto] [&::-webkit-scrollbar-thumb]:bg-retro-primary md:[scrollbar-width:auto] [&::-webkit-scrollbar]:h-1.5"
            >
                <div className="flex gap-6 pb-0 sm:pb-5">
                    {badges?.map((badge) => {
                        return (
                            <div
                                key={badge.name}
                                className={
                                    'min-w-36 flex-shrink-0 relative card-retro'
                                }
                            >
                                <div
                                    className="absolute top-0 right-0 w-full h-full bg-retro-bg z-10 font-righteous
                                opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 flex justify-center items-center p-1"
                                >
                                    {BADGES[badge.name].description}
                                </div>
                                <div className="text-5xl mb-3.5">
                                    {BADGES[badge.name].icon}
                                </div>
                                <div
                                    className={
                                        'font-righteous text-sm uppercase text-retro-accent'
                                    }
                                >
                                    {BADGES[badge.name].name}
                                </div>
                            </div>
                        );
                    })}
                    {Object.values(BADGES).map((badge) => {
                        return (
                            !badges?.find(
                                (ownedBadge) => ownedBadge.name === badge.key
                            ) && (
                                <div
                                    key={badge.name}
                                    className={
                                        'min-w-36 flex-shrink-0 relative card-retro opacity-50'
                                    }
                                >
                                    <div
                                        className="absolute top-0 right-0 w-full h-full bg-retro-bg z-10 font-righteous
                                opacity-0 bg-opacity-0 hover:bg-opacity-80 hover:opacity-100 flex justify-center items-center p-1"
                                    >
                                        {badge.description}
                                    </div>
                                    <div className="text-5xl mb-3.5">
                                        {badge.icon}
                                    </div>
                                    <div
                                        className={
                                            'font-righteous text-sm uppercase text-retro-muted'
                                        }
                                    >
                                        {badge.name}
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </section>
        </>
    );
}
