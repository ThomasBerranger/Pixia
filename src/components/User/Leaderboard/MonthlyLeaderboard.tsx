import type { LeaderboardUserType } from '../../../types/User/leaderboardUserType.ts';
import type { UserType } from '../../../types/User/userType.ts';
import { BADGES } from '../../../constants/badges.ts';
import { Link } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import type { JWTPayloadType } from '../../../types/JWTPayloadType.ts';
import { decodeJWT } from '../../../utils/jwt.ts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getCurrentMonthlyLeaderboard } from '../../../utils/monthlyLeaderboard.ts';
import UserAvatar from '../../../atoms/UserAvatar.tsx';
import StreakBadge from '../../../atoms/StreakBadge.tsx';

function MonthlyLeaderboard({
    date,
    leaderboard,
    player,
}: {
    date: string | undefined;
    leaderboard: LeaderboardUserType[];
    player: UserType | undefined;
}) {
    const decodedJwt: JWTPayloadType | undefined = decodeJWT(
        localStorage.getItem('token')
    );

    return (
        <section className="max-w-3xl mx-auto pt-0.5 sm:pt-5 pb-10">
            <div className="sm:mb-5">
                <h2 className="font-title text-retro-accent text-center text-xl sm:text-4xl">
                    Classement{' '}
                    {format(date || new Date(), 'MMMM', { locale: fr })}
                </h2>

                {date &&
                    date?.substring(0, 7) !==
                        new Date().toISOString().substring(0, 7) && (
                        <p className="text-retro-accent text-center font-righteous text-xs sm:text-base mt-0.5">
                            Terminé
                        </p>
                    )}
            </div>

            <div className="hidden sm:grid grid-cols-3 gap-8 items-end">
                <Link
                    to={URLS.USER_SHOW(leaderboard[1]?.slug ?? '')}
                    className="card-primary-hover px-0 pt-2 pb-2"
                >
                    <div className="flex justify-between items-center pl-3 pb-2">
                        <div className="pl-1 flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[1]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🥈</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={leaderboard[1]?.avatarUrl}
                            username={leaderboard[1]?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {
                                        leaderboard[1]?.monthlyLeaderboards[0]
                                            .score
                                    }
                                </span>
                                <StreakBadge count={leaderboard[1]?.streaks.current} className="ml-1.5 mt-1" />
                            </p>
                            <p className="text-lg">
                                {leaderboard[1] &&
                                    leaderboard[1].badges.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {BADGES[badge.name].icon}
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to={URLS.USER_SHOW(leaderboard[0]?.slug ?? '')}
                    className="card-primary-hover px-0 py-2 border-retro-accent"
                >
                    <div className="flex justify-between items-center pl-3 pb-4">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[0]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🏆</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={leaderboard[0]?.avatarUrl}
                            username={leaderboard[0]?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {
                                        leaderboard[0]?.monthlyLeaderboards[0]
                                            .score
                                    }
                                </span>
                                <StreakBadge count={leaderboard[0]?.streaks.current} className="ml-1.5 mt-1" />
                            </p>
                            <p className="text-lg">
                                {leaderboard[0] &&
                                    leaderboard[0].badges.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {BADGES[badge.name].icon}
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to={URLS.USER_SHOW(leaderboard[2]?.slug ?? '')}
                    className="card-primary-hover px-0 py-2"
                >
                    <div className="flex justify-between items-center pl-3">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[2]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0 pr-1">🥉</p>
                    </div>
                    <div className="flex items-center">
                        <UserAvatar
                            avatarUrl={leaderboard[2]?.avatarUrl}
                            username={leaderboard[2]?.username}
                            className="h-24"
                        />
                        <div>
                            <p className="flex items-center">
                                <span className="font-title text-2xl text-retro-accent">
                                    {
                                        leaderboard[2]?.monthlyLeaderboards[0]
                                            .score
                                    }
                                </span>
                                <StreakBadge count={leaderboard[2]?.streaks.current} className="ml-1.5 mt-1" />
                            </p>
                            <p className="text-lg">
                                {leaderboard[2] &&
                                    leaderboard[2].badges.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {BADGES[badge.name].icon}
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="sm:hidden card-primary border-retro-accent p-0 m-5">
                <Link
                    to={URLS.USER_SHOW(leaderboard[0]?.slug ?? '')}
                    className="w-full flex gap-0.5 items-center px-3 py-2.5"
                >
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        1
                    </p>
                    <UserAvatar
                        avatarUrl={leaderboard[0]?.avatarUrl}
                        username={leaderboard[0]?.username}
                        className="h-16"
                    />
                    <p className="flex-1 text-left font-righteous font-light text-fade-end">
                        {leaderboard[0]?.username}
                        <br />
                        {leaderboard[0]?.badges.map((badge, index) => (
                            <span key={index} className="text-sm">
                                {BADGES[badge.name].icon}
                            </span>
                        ))}
                    </p>
                    <p className="flex items-center">
                        <StreakBadge count={leaderboard[0]?.streaks.current} className="mr-1 mt-1" />
                        <span className="font-title text-xl text-retro-accent">
                            {leaderboard[0]?.monthlyLeaderboards[0].score}
                        </span>
                    </p>
                </Link>
            </div>

            <div className="sm:hidden card-primary p-0 m-5">
                <Link
                    to={URLS.USER_SHOW(leaderboard[1]?.slug ?? '')}
                    className="w-full flex gap-2 items-center px-3 py-2.5"
                >
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        2
                    </p>
                    <UserAvatar
                        avatarUrl={leaderboard[1]?.avatarUrl}
                        username={leaderboard[1]?.username}
                        className="h-16"
                    />
                    <p className="flex-1 text-left font-righteous font-light text-fade-end">
                        {leaderboard[1]?.username}
                        <br />
                        {leaderboard[1]?.badges.map((badge, index) => (
                            <span key={index} className="text-sm">
                                {BADGES[badge.name].icon}
                            </span>
                        ))}
                    </p>
                    <p className="flex items-center">
                        <StreakBadge count={leaderboard[1]?.streaks.current} className="mr-1 mt-1" />
                        <span className="font-title text-xl text-retro-accent">
                            {leaderboard[1]?.monthlyLeaderboards[0].score}
                        </span>
                    </p>
                </Link>

                <Link
                    to={URLS.USER_SHOW(leaderboard[2]?.slug ?? '')}
                    className="w-full flex gap-2 items-center px-3 py-2.5"
                >
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        3
                    </p>
                    <UserAvatar
                        avatarUrl={leaderboard[2]?.avatarUrl}
                        username={leaderboard[2]?.username}
                        className="h-16"
                    />
                    <p className="flex-1 text-left font-righteous font-light text-fade-end">
                        {leaderboard[2]?.username}
                        <br />
                        {leaderboard[2]?.badges.map((badge, index) => (
                            <span key={index} className="text-sm">
                                {BADGES[badge.name].icon}
                            </span>
                        ))}
                    </p>
                    <p className="flex items-center">
                        <StreakBadge count={leaderboard[2]?.streaks.current} className="mr-1 mt-1" />
                        <span className="font-title text-xl text-retro-accent">
                            {leaderboard[2]?.monthlyLeaderboards[0].score}
                        </span>
                    </p>
                </Link>
            </div>

            <div className="card-retro p-0 mt-5 mb-3 mx-5 sm:mx-0">
                {leaderboard.slice(3).map((user, key) => (
                    <Link
                        to={URLS.USER_SHOW(user.slug)}
                        key={key}
                        className={`w-full flex gap-2 items-center px-3 sm:px-5 py-2.5 
                     ${user.username === decodedJwt?.username ? 'bg-retro-accent bg-opacity-10' : 'hover:bg-retro-accent hover:bg-opacity-10'}`}
                    >
                        <p className="font-title font-bold text-retro-primary text-3xl">
                            {key + 4}
                        </p>
                        <UserAvatar
                            avatarUrl={user?.avatarUrl}
                            username={user.username}
                            className="h-16 mb-2"
                        />
                        <p className="flex-1 text-left font-righteous font-light sm:text-lg text-fade-end">
                            {user.username}
                            <br />
                            {user.badges.map((badge, index) => (
                                <span key={index}>
                                    {BADGES[badge.name].icon}
                                </span>
                            ))}
                        </p>
                        <p className="flex items-center">
                            <StreakBadge count={user.streaks.current} className="mr-1 mt-1" />
                            <span className="text-2xl text-retro-accent font-title">
                                {user.monthlyLeaderboards[0].score}
                            </span>
                        </p>
                    </Link>
                ))}
            </div>

            {player && (
                <div className="card-retro-hover-retro-accent border-retro-primary p-0 mb-5 mx-5 sm:mx-0">
                    <Link
                        to={URLS.USER_SHOW(player.slug)}
                        className="w-full flex gap-2 items-center px-3 sm:px-5 py-2.5"
                    >
                        <p className="font-title font-bold text-retro-primary text-3xl">
                            {player.rank}
                        </p>
                        <UserAvatar
                            avatarUrl={player.avatarUrl}
                            username={player.username}
                            className="h-16"
                        />
                        <p className="flex-1 text-left font-righteous font-light sm:text-lg text-fade-end">
                            {player.username}
                            <br />
                            {player.badges.map((badge, index) => (
                                <span key={index}>
                                    {BADGES[badge.name].icon}
                                </span>
                            ))}
                        </p>
                        <p className="flex items-center">
                            <StreakBadge count={player.streaks.current ?? 0} className="mr-1 mt-1" />
                            <span className="text-2xl text-retro-accent font-title">
                                {getCurrentMonthlyLeaderboard(player)?.score}
                            </span>
                        </p>
                    </Link>
                </div>
            )}

            <div className="w-full flex justify-center mt-6">
                <Link
                    to={URLS.LEADERBOARD}
                    className="btn-primary text-xs px-6 py-2.5"
                >
                    Classement Général
                </Link>
            </div>
        </section>
    );
}

export default MonthlyLeaderboard;
