import type { LeaderboardUserType } from '../../../types/User/leaderboardUserType.ts';
import { BADGES } from '../../../constants/badges.ts';
import { Link, useSearchParams } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';
import type { JWTPayloadType } from '../../../types/JWTPayloadType.ts';
import { decodeJWT } from '../../../utils/jwt.ts';
import { useApi } from '../../../hooks/useApi.tsx';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import Podium from './Podium.tsx';
import { CgSpinner } from 'react-icons/cg';

function Leaderboard() {
    const { apiCall } = useApi();

    const decodedJwt: JWTPayloadType | undefined = decodeJWT(
        localStorage.getItem('token')
    );
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playersCount, setPlayersCount] = useState<number>(0);
    const totalPages = Math.ceil(playersCount / 20);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUserType[]>([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const leaderboardResult = await apiCall(
                    `${ENDPOINTS.LEADERBOARD}?page=${currentPage}`
                );

                setLeaderboard(leaderboardResult.leaderboard);
                setPlayersCount(leaderboardResult.playersCount);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [apiCall, currentPage]);

    return (
        <section className="min-h-[90vh] max-w-3xl mx-auto pt-0.5 sm:pt-5 pb-10">
            <h2 className="font-title text-retro-accent text-center text-2xl sm:text-4xl my-4">
                Classement Général
            </h2>

            {currentPage === 1 && (
                <Podium
                    firstPlayer={leaderboard[0]}
                    secondPlayer={leaderboard[1]}
                    thirdPlayer={leaderboard[2]}
                    isLoading={isLoading}
                />
            )}

            {isLoading ? (
                <div className="card-retro flex justify-center items-center mx-5">
                    <CgSpinner className="animate-spin text-retro-muted text-4xl" />
                </div>
            ) : (
                <div className="card-retro p-0 mt-5 mb-3 mx-5 sm:mx-0">
                    {leaderboard
                        .slice(currentPage === 1 ? 3 : 0)
                        .map((user, key) => (
                            <Link
                                to={URLS.USER_SHOW(user.slug)}
                                key={key}
                                className={`w-full flex gap-2 items-center px-3 sm:px-5 py-2.5 
                     ${user.username === decodedJwt?.username ? 'bg-retro-accent bg-opacity-10' : 'hover:bg-retro-accent hover:bg-opacity-10'}`}
                            >
                                <p className="font-title font-bold text-retro-primary text-3xl">
                                    {key +
                                        (currentPage === 1 ? 4 : 1) +
                                        (currentPage - 1) * 20}
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
                                    <br />
                                    {user.badges.map((badge, index) => (
                                        <span key={index}>
                                            {BADGES[badge.name].icon}
                                        </span>
                                    ))}
                                </p>
                                <p className="flex items-center">
                                    {user.streaks.current > 0 && (
                                        <span className="badge-accent-no-border py-0.5 pl-0.5 pr-1 mr-1 mt-1 rounded text-sm">
                                            🔥{user.streaks.current}
                                        </span>
                                    )}
                                    <span className="text-2xl text-retro-accent font-title">
                                        {user.score}
                                    </span>
                                </p>
                            </Link>
                        ))}
                </div>
            )}

            <div className="flex items-center justify-center gap-3 mt-8">
                <Link
                    to={URLS.LEADERBOARD_PAGE(
                        Math.max(1, currentPage - 1)
                    )}
                    className={`${currentPage === 1 ? 'opacity-50 pointer-events-none text-retro-muted' : 'text-retro-accent'}`}
                >
                    <BiSolidLeftArrow size={22} />
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                        <Link
                            key={pageNum}
                            to={URLS.LEADERBOARD_PAGE(pageNum)}
                            className={`${currentPage === pageNum ? 'btn-disabled' : 'btn-ghost'} font-title text-center px-2 py-1`}
                        >
                            {pageNum}
                        </Link>
                    )
                )}

                <Link
                    to={URLS.LEADERBOARD_PAGE(
                        Math.min(totalPages, currentPage + 1)
                    )}
                    className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none text-retro-muted' : 'text-retro-accent'}`}
                >
                    <BiSolidRightArrow size={22} />
                </Link>
            </div>
        </section>
    );
}

export default Leaderboard;
