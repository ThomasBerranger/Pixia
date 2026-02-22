import { BADGES } from '../../../constants/badges.ts';
import { Link } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import type { LeaderboardUserType } from '../../../types/User/leaderboardUserType.ts';
import { CgSpinner } from 'react-icons/cg';
import UserAvatar from '../../../atoms/UserAvatar.tsx';
import StreakBadge from '../../../atoms/StreakBadge.tsx';

function Podium({
    firstPlayer,
    secondPlayer,
    thirdPlayer,
    isLoading,
}: {
    firstPlayer: LeaderboardUserType | undefined;
    secondPlayer: LeaderboardUserType | undefined;
    thirdPlayer: LeaderboardUserType | undefined;
    isLoading: boolean;
}) {
    return (
        <section className="max-w-3xl mx-auto">
            <div className="hidden sm:grid grid-cols-3 gap-8 items-end">
                <Link
                    to={URLS.USER_SHOW(secondPlayer?.slug ?? '')}
                    className="card-primary-hover px-0 pt-2 pb-2"
                >
                    <div className="flex justify-between items-center pl-3 pb-2">
                        <div className="pl-1 flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {secondPlayer?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🥈</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={secondPlayer?.avatarUrl}
                            username={secondPlayer?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {secondPlayer?.score}
                                </span>
                                {secondPlayer?.streaks && (
                                    <StreakBadge
                                        count={secondPlayer.streaks.current}
                                        className="ml-1.5 mt-1"
                                    />
                                )}
                            </p>
                            <p className="text-lg">
                                {secondPlayer &&
                                    secondPlayer.badges.map((badge, index) => (
                                        <span key={index}>
                                            {BADGES[badge.name].icon}
                                        </span>
                                    ))}
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to={URLS.USER_SHOW(firstPlayer?.slug ?? '')}
                    className="card-primary-hover px-0 py-2 border-retro-accent"
                >
                    <div className="flex justify-between items-center pl-3 pb-4">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {firstPlayer?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🏆</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={firstPlayer?.avatarUrl}
                            username={firstPlayer?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {firstPlayer?.score}
                                </span>
                                {firstPlayer?.streaks && (
                                    <StreakBadge
                                        count={firstPlayer.streaks.current}
                                        className="ml-1.5 mt-1"
                                    />
                                )}
                            </p>
                            <p className="text-lg">
                                {firstPlayer &&
                                    firstPlayer.badges.map((badge, index) => (
                                        <span key={index}>
                                            {BADGES[badge.name].icon}
                                        </span>
                                    ))}
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to={URLS.USER_SHOW(thirdPlayer?.slug ?? '')}
                    className="card-primary-hover px-0 py-2"
                >
                    <div className="flex justify-between items-center pl-3">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {thirdPlayer?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🥉</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={thirdPlayer?.avatarUrl}
                            username={thirdPlayer?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {thirdPlayer?.score}
                                </span>
                                {thirdPlayer?.streaks && (
                                    <StreakBadge
                                        count={thirdPlayer.streaks.current}
                                        className="ml-1.5 mt-1"
                                    />
                                )}
                            </p>
                            <p className="text-lg">
                                {thirdPlayer &&
                                    thirdPlayer.badges.map((badge, index) => (
                                        <span key={index}>
                                            {BADGES[badge.name].icon}
                                        </span>
                                    ))}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="sm:hidden card-primary border-retro-accent p-0 m-5">
                {isLoading ? (
                    <div className="h-16 flex justify-center items-center">
                        <CgSpinner className="animate-spin text-retro-accent text-4xl" />
                    </div>
                ) : (
                    <Link
                        to={URLS.USER_SHOW(firstPlayer?.slug ?? '')}
                        className="w-full flex gap-0.5 items-center px-3 py-2.5"
                    >
                        <p className="font-title font-bold text-retro-primary text-3xl">
                            1
                        </p>
                        <UserAvatar
                            avatarUrl={firstPlayer?.avatarUrl}
                            username={firstPlayer?.username}
                            className="h-16"
                        />
                        <p className="flex-1 text-left font-righteous font-light text-fade-end">
                            {firstPlayer?.username}
                            <br />
                            {firstPlayer?.badges.map((badge, index) => (
                                <span key={index} className="text-sm">
                                    {BADGES[badge.name].icon}
                                </span>
                            ))}
                        </p>
                        <p className="flex items-center">
                            {firstPlayer?.streaks && (
                                <StreakBadge
                                    count={firstPlayer.streaks.current}
                                    className="mr-1 mt-1"
                                />
                            )}
                            <span className="font-title text-xl text-retro-accent">
                                {firstPlayer?.score}
                            </span>
                        </p>
                    </Link>
                )}
            </div>

            <div className="sm:hidden card-primary p-0 m-5">
                {isLoading ? (
                    <div className="h-36 flex justify-center items-center">
                        <CgSpinner className="animate-spin text-retro-primary text-4xl" />
                    </div>
                ) : (
                    <>
                        <Link
                            to={URLS.USER_SHOW(secondPlayer?.slug ?? '')}
                            className="w-full flex gap-2 items-center px-3 py-2.5"
                        >
                            <p className="font-title font-bold text-retro-primary text-3xl">
                                2
                            </p>
                            <UserAvatar
                                avatarUrl={secondPlayer?.avatarUrl}
                                username={secondPlayer?.username}
                                className="h-16"
                            />
                            <p className="flex-1 text-left font-righteous font-light text-fade-end">
                                {secondPlayer?.username}
                                <br />
                                {secondPlayer?.badges.map((badge, index) => (
                                    <span key={index} className="text-sm">
                                        {BADGES[badge.name].icon}
                                    </span>
                                ))}
                            </p>
                            <p className="flex items-center">
                                {secondPlayer?.streaks && (
                                    <StreakBadge
                                        count={secondPlayer.streaks.current}
                                        className="mr-1 mt-1"
                                    />
                                )}
                                <span className="font-title text-xl text-retro-accent">
                                    {secondPlayer?.score}
                                </span>
                            </p>
                        </Link>

                        <Link
                            to={URLS.USER_SHOW(thirdPlayer?.slug ?? '')}
                            className="w-full flex gap-2 items-center px-3 py-2.5"
                        >
                            <p className="font-title font-bold text-retro-primary text-3xl">
                                3
                            </p>
                            <UserAvatar
                                avatarUrl={thirdPlayer?.avatarUrl}
                                username={thirdPlayer?.username}
                                className="h-16"
                            />
                            <p className="flex-1 text-left font-righteous font-light text-fade-end">
                                {thirdPlayer?.username}
                                <br />
                                {thirdPlayer?.badges.map((badge, index) => (
                                    <span key={index} className="text-sm">
                                        {BADGES[badge.name].icon}
                                    </span>
                                ))}
                            </p>
                            <p className="flex items-center">
                                {thirdPlayer?.streaks && (
                                    <StreakBadge
                                        count={thirdPlayer.streaks.current}
                                        className="mr-1 mt-1"
                                    />
                                )}
                                <span className="font-title text-xl text-retro-accent">
                                    {thirdPlayer?.score}
                                </span>
                            </p>
                        </Link>
                    </>
                )}
            </div>
        </section>
    );
}

export default Podium;
