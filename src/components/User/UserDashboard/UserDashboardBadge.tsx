import { useState } from 'react';
import type { BadgeType } from '../../../types/Badge/badgeType.ts';
import { BADGES } from '../../../constants/badges.ts';
import { useModal } from '../../../hooks/useModal.tsx';
import { GiLockedChest, GiOpenChest } from 'react-icons/gi';
import { BiSolidRightArrow } from 'react-icons/bi';
import { formatDuration, intervalToDuration } from 'date-fns';
import { fr } from 'date-fns/locale';
import JackpotModal from '../../Admin/JackpotModal.tsx';

export default function UserDashboardBadge({
    badges,
}: {
    badges: BadgeType[] | undefined;
}) {
    const { openModal } = useModal();
    const [showJackpot, setShowJackpot] = useState(false);

    const jackpotCountdown = formatDuration(
        intervalToDuration({
            start: new Date(),
            end: new Date('2026-03-18T00:00:00'),
        }),
        { format: ['days', 'hours'], locale: fr }
    );

    const handleBadgesClick = () => {
        openModal(
            'Badges',
            <div className="text-white font-righteous font-light">
                {Object.values(BADGES).map((badge) => {
                    const owned = badges?.some((b) => b.name === badge.key);
                    return (
                        <div
                            key={badge.key}
                            className={`flex items-center gap-3 py-2 ${!owned ? 'opacity-30 grayscale' : ''}`}
                        >
                            <span className="text-3xl">{badge.icon}</span>
                            <div>
                                <p>{badge.name}</p>
                                <p className="text-xs text-retro-muted">
                                    {badge.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <section className="flex gap-5 my-8 w-full">
                <div className="flex-shrink-0 text-center sm:w-1/4 flex flex-col">
                    <h2 className="font-title text-center text-retro-accent text-2xl sm:text-3xl mb-3 sm:min-w-3/5">
                        Jackpot
                    </h2>
                    {jackpotCountdown ? (
                        <>
                            <GiOpenChest className="text-4xl text-retro-muted mx-auto" />
                            <p className="text-xxs font-righteous text-retro-muted mt-auto">
                                {jackpotCountdown}
                            </p>
                        </>
                    ) : (
                        <>
                            <GiLockedChest
                                className="text-4xl text-retro-accent mx-auto cursor-pointer"
                                onClick={() => setShowJackpot(true)}
                            />
                            <p
                                className="text-xxs font-righteous text-retro-accent mt-auto cursor-pointer"
                                onClick={() => setShowJackpot(true)}
                            >
                                Ouvrir
                            </p>
                        </>
                    )}
                </div>

                <div
                    className="min-w-0 flex-1 cursor-pointer flex flex-col"
                    onClick={handleBadgesClick}
                >
                    <h2 className="font-title text-center text-retro-accent text-2xl sm:text-3xl mb-3">
                        Badges
                    </h2>
                    <div
                        className="overflow-hidden mb-1.5"
                        style={{
                            maskImage:
                                'linear-gradient(to right, black 80%, transparent)',
                            WebkitMaskImage:
                                'linear-gradient(to right, black 80%, transparent)',
                        }}
                    >
                        <div className="flex items-center text-3xl">
                            {badges?.map((badge) => (
                                <span
                                    key={badge.name}
                                    className="flex-shrink-0"
                                >
                                    {BADGES[badge.name].icon}
                                </span>
                            ))}
                            {Object.values(BADGES).map(
                                (badge) =>
                                    !badges?.find(
                                        (ownedBadge) =>
                                            ownedBadge.name === badge.key
                                    ) && (
                                        <span
                                            key={badge.key}
                                            className="flex-shrink-0 opacity-30 grayscale"
                                        >
                                            {badge.icon}
                                        </span>
                                    )
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                        <p className="text-xxs font-righteous text-retro-muted">
                            {badges?.length ?? 0}/{Object.keys(BADGES).length}{' '}
                            débloqué{(badges?.length ?? 0) > 1 ? 's' : ''}
                        </p>
                        <span className="text-xs font-righteous text-retro-accent flex items-center">
                            Voir <BiSolidRightArrow className="ml-1" />
                        </span>
                    </div>
                </div>
            </section>

            {showJackpot && (
                <JackpotModal
                    month="mars"
                    onClose={() => setShowJackpot(false)}
                />
            )}
        </>
    );
}
