import type { LeaderboardUserType } from '../../types/User/leaderboardUserType.ts';
import type { UserType } from '../../types/User/userType.ts';

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
                <div className="card-primary-hover text-center flex flex-col justify-center py-4 px-0">
                    <p className="text-4xl mb-1.5">🥈</p>
                    <p className="font-righteous font-light text-xl mb-1 truncate">
                        {leaderboard[1] && leaderboard[1].username}
                    </p>
                    <p className="font-title text-2xl text-retro-accent">
                        {leaderboard[1] && leaderboard[1].score}
                    </p>
                </div>
                <div className="card-primary-hover border-retro-accent text-center py-8 px-0 flex flex-col justify-center">
                    <p className="text-4xl mb-1.5">🏆</p>
                    <p className="font-righteous font-light text-xl mb-1 truncate">
                        {leaderboard[0] && leaderboard[0].username}
                    </p>
                    <p className="font-title text-2xl text-retro-accent">
                        {leaderboard[0] && leaderboard[0].score}
                    </p>
                </div>
                <div className="card-primary-hover text-center flex flex-col justify-center py-2 px-0">
                    <p className="text-4xl mb-1.5">🥉</p>
                    <p className="font-righteous font-light text-xl mb-1 truncate">
                        {leaderboard[2] && leaderboard[2].username}
                    </p>
                    <p className="font-title text-2xl text-retro-accent">
                        {leaderboard[2] && leaderboard[2].score}
                    </p>
                </div>
            </div>

            <div className="sm:hidden card-primary border-retro-accent p-0 my-5 mx-5 sm:mx-0">
                <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        🏆
                    </p>
                    <p className="flex-1 text-left px-4 font-righteous font-light text-lg truncate">
                        {leaderboard[0] && leaderboard[0].username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[0] && leaderboard[0].score}
                    </p>
                </div>
            </div>

            <div className="sm:hidden card-primary p-0 my-5 mx-5 sm:mx-0">
                <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        🥈
                    </p>
                    <p className="flex-1 text-left px-4 font-righteous font-light text-lg truncate">
                        {leaderboard[1] && leaderboard[1].username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[1] && leaderboard[1].score}
                    </p>
                </div>
                <div className="w-full flex gap-2 items-center px-5 py-2.5 hover:bg-retro-accent hover:bg-opacity-10">
                    <p className="font-title font-bold text-retro-primary text-3xl">
                        🥉
                    </p>
                    <p className="flex-1 text-left px-4 font-righteous font-light text-lg truncate">
                        {leaderboard[2] && leaderboard[2].username}
                    </p>
                    <p className="font-title text-xl text-retro-accent">
                        {leaderboard[2] && leaderboard[2].score}
                    </p>
                </div>
            </div>

            <div className="card-retro p-0 mt-5 mb-3 mx-5 sm:mx-0">
                {leaderboard.slice(3).map((user, key) => (
                    <div
                        key={key}
                        className={`w-full flex gap-2 items-center px-5 py-2.5 
                     ${key + 4 === currentUserRank ? 'bg-retro-accent bg-opacity-10' : 'hover:bg-retro-accent hover:bg-opacity-10'}`}
                    >
                        <p className="font-title font-bold text-retro-primary text-3xl">
                            {key + 4}
                        </p>
                        <p className="flex-1 text-left px-4 font-righteous font-light text-lg truncate">
                            {user.username}
                        </p>
                        <p className="font-title text-xl text-retro-accent">
                            {user.score}
                        </p>
                    </div>
                ))}
            </div>

            {currentUser && currentUserRank && currentUserRank > 10 && (
                <div className="card-retro-hover-retro-accent border-retro-primary p-0 mb-5 mx-5 sm:mx-0">
                    <div className="w-full flex gap-2 items-center px-5 py-2.5">
                        <p className="font-title font-bold text-retro-primary text-3xl">
                            {currentUserRank}
                        </p>
                        <p className="font-righteous font-light px-4 flex-1 text-left text-lg truncate">
                            {currentUser.username}
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
