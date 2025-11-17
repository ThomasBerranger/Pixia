import type { BadgeType } from '../../../types/Badge/badgeType.ts';
import { BADGES } from '../../../constants/badges.ts';

export default function UserDashboardBadge({
    badges,
}: {
    badges: BadgeType[] | undefined;
}) {
    const userBadgeNames = badges?.map((b) => b.name) || [];

    const ownedBadges = Object.entries(BADGES).filter(([key]) =>
        userBadgeNames.includes(key as keyof typeof BADGES)
    );

    const notOwnedBadges = Object.entries(BADGES).filter(
        ([key]) => !userBadgeNames.includes(key as keyof typeof BADGES)
    );

    const sortedBadges = [...ownedBadges, ...notOwnedBadges];

    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Badges
            </h2>

            <section className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-12">
                <div className="flex gap-6">
                    {sortedBadges.map(([key, badge]) => {
                        const hasBadge = userBadgeNames.includes(
                            key as keyof typeof BADGES
                        );

                        return (
                            <div
                                key={key}
                                className={`min-w-36 flex-shrink-0 ${
                                    hasBadge
                                        ? 'card-retro-hover-retro-accent'
                                        : 'card-retro opacity-40'
                                }`}
                            >
                                <div className="text-5xl mb-3.5">
                                    {badge.icon}
                                </div>
                                <div
                                    className={`font-righteous text-sm uppercase ${
                                        hasBadge
                                            ? 'text-retro-accent'
                                            : 'text-retro-muted'
                                    }`}
                                >
                                    {badge.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
