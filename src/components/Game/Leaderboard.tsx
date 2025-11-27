import type { LeaderboardUserType } from '../../types/User/leaderboardUserType.ts';
import type { UserType } from '../../types/User/userType.ts';
import { BADGES } from '../../constants/badges.ts';

function Leaderboard({
    leaderboard,
    currentUser,
    currentUserRank,
}: {
    leaderboard: LeaderboardUserType[];
    currentUser: UserType | undefined;
    currentUserRank: number | undefined;
}) {
    return (
        <section className="max-w-3xl mx-auto pt-0.5 sm:pt-5 pb-10">
            <div className="hidden sm:grid grid-cols-3 gap-8 items-end">
                <div className="card-primary-hover px-0 pt-2 pb-2">
                    <div className="flex justify-between items-center pl-3 pb-2">
                        <div className="pl-1 flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[1]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0">🥈</p>
                    </div>
                    <div className="flex items-center">
                        <img
                            src={
                                leaderboard[1]?.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${leaderboard[1]?.username}`
                            }
                            alt="Avatar"
                            className="h-24"
                        />
                        <div>
                            <p className="font-title text-2xl text-retro-accent">
                                {leaderboard[1] && leaderboard[1].score}
                            </p>
                            <p className="text-lg">
                                {leaderboard[1] &&
                                    leaderboard[1].badges?.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {
                                                    BADGES[
                                                        badge.name as keyof typeof BADGES
                                                    ]?.icon
                                                }
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card-primary-hover px-0 py-2 border-retro-accent">
                    <div className="flex justify-between items-center pl-3 pb-4">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[0]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0">🏆</p>
                    </div>
                    <div className="flex items-center">
                        <img
                            src={
                                leaderboard[0]?.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${leaderboard[0]?.username}`
                            }
                            alt="Avatar"
                            className="h-24"
                        />
                        <div>
                            <p className="font-title text-2xl text-retro-accent">
                                {leaderboard[0] && leaderboard[0].score}
                            </p>
                            <p className="text-lg">
                                {leaderboard[0] &&
                                    leaderboard[0].badges?.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {
                                                    BADGES[
                                                        badge.name as keyof typeof BADGES
                                                    ]?.icon
                                                }
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-primary-hover px-0 py-2">
                    <div className="flex justify-between items-center pl-3">
                        <div className="flex-1 overflow-hidden">
                            <p className="font-righteous font-light text-2xl whitespace-nowrap text-fade-end">
                                {leaderboard[2]?.username}
                            </p>
                        </div>
                        <p className="text-4xl flex-shrink-0">🥉</p>
                    </div>
                    <div className="flex items-center">
                        <img
                            src={
                                leaderboard[2]?.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${leaderboard[2]?.username}`
                            }
                            alt="Avatar"
                            className="h-24"
                        />
                        <div>
                            <p className="font-title text-2xl text-retro-accent">
                                {leaderboard[2] && leaderboard[2].score}
                            </p>
                            <p className="text-lg">
                                {leaderboard[2] &&
                                    leaderboard[2].badges?.map(
                                        (badge, index) => (
                                            <span key={index}>
                                                {
                                                    BADGES[
                                                        badge.name as keyof typeof BADGES
                                                    ]?.icon
                                                }
                                            </span>
                                        )
                                    )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden card-primary border-retro-accent p-0 my-5 mx-5 sm:mx-0">
                <div className="w-full flex gap-2 items-center px-3 sm:px-5 py-2.5">
                    <p className="text-2xl -mr-3.5">🏆</p>
                    <img
                        src={
                            leaderboard[0]?.avatarUrl ??
                            `${import.meta.env.VITE_DICE_URL}${leaderboard[0]?.username}`
                        }
                        alt="Avatar"
                        className="h-16"
                    />
                    <p className="font-righteous font-light flex-1 text-left text-lg text-fade-end">
                        {leaderboard[0]?.username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[0]?.score}
                    </p>
                </div>
            </div>

            <div className="sm:hidden card-primary p-0 my-5 mx-5 sm:mx-0">
                <div className="w-full flex gap-2 items-center px-3 sm:px-5 py-2.5">
                    <p className="text-2xl -mr-3.5">🥈</p>
                    <img
                        src={
                            leaderboard[1]?.avatarUrl ??
                            `${import.meta.env.VITE_DICE_URL}${leaderboard[1]?.username}`
                        }
                        alt="Avatar"
                        className="h-16"
                    />
                    <p className="font-righteous font-light flex-1 text-left text-lg text-fade-end">
                        {leaderboard[1]?.username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[1]?.score}
                    </p>
                </div>

                <div className="w-full flex gap-2 items-center px-3 sm:px-5 py-2.5">
                    <p className="text-2xl -mr-3.5">🥉</p>
                    <img
                        src={
                            leaderboard[2]?.avatarUrl ??
                            `${import.meta.env.VITE_DICE_URL}${leaderboard[2]?.username}`
                        }
                        alt="Avatar"
                        className="h-16"
                    />
                    <p className="font-righteous font-light flex-1 text-left text-lg text-fade-end">
                        {leaderboard[2]?.username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[2]?.score}
                    </p>
                </div>
            </div>

            <div className="card-retro p-0 mt-5 mb-3 mx-5 sm:mx-0">
                {leaderboard.slice(3).map((user, key) => (
                    <div
                        key={key}
                        className={`w-full flex gap-2 items-center px-3 sm:px-5 py-2.5 
                     ${key + 4 === currentUserRank ? 'bg-retro-accent bg-opacity-10' : 'hover:bg-retro-accent hover:bg-opacity-10'}`}
                    >
                        <p className="font-title font-bold text-retro-primary text-2xl sm:text-4xl">
                            {key + 4}
                        </p>
                        <img
                            src={
                                user?.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${user.username}`
                            }
                            alt="Avatar"
                            className="h-16 mb-2"
                        />
                        <p className="flex-1 text-left font-righteous font-light sm:text-lg text-fade-end">
                            {user.username}
                        </p>
                        <p className="hidden sm:block">
                            {user.badges?.map((badge, index) => (
                                <span key={index}>
                                    {
                                        BADGES[
                                            badge.name as keyof typeof BADGES
                                        ]?.icon
                                    }
                                </span>
                            ))}
                        </p>
                        <p className="font-title text-2xl text-retro-accent">
                            {user.score}
                        </p>
                    </div>
                ))}
            </div>

            {currentUser && (
                <div className="card-retro-hover-retro-accent border-retro-primary p-0 mb-5 mx-5 sm:mx-0">
                    <div className="w-full flex gap-2 items-center px-3 sm:px-5 py-2.5">
                        <p className="font-title font-bold text-retro-primary text-2xl sm:text-4xl">
                            {currentUserRank}
                        </p>
                        <img
                            src={
                                currentUser.avatarUrl ??
                                `${import.meta.env.VITE_DICE_URL}${currentUser.username}`
                            }
                            alt="Avatar"
                            className="h-16"
                        />
                        <p className="font-righteous font-light flex-1 text-left text-lg text-fade-end">
                            {currentUser.username}
                        </p>
                        <p className="hidden sm:block">
                            {currentUser.badges?.map((badge, index) => (
                                <span key={index}>
                                    {
                                        BADGES[
                                            badge.name as keyof typeof BADGES
                                        ]?.icon
                                    }
                                </span>
                            ))}
                        </p>
                        <p className="font-title text-xl text-retro-accent">
                            {currentUser.score}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Leaderboard;
