import { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import type { UserDashboardType } from '../../../types/User/userDashboardType.ts';
import UserDashboardBadge from './UserDashboardBadge.tsx';
import UserDashboardStatistic from './UserDashboardStatistic.tsx';
import UserDashboardHistory from './UserDashboardHistory.tsx';
import UserDashboardDangerZone from './UserDashboardDangerZone.tsx';
import UserDashboardHeader from './UserDashboardHeader.tsx';

function UserDashboard() {
    const { apiCall } = useApi();

    const [userDashboard, setUserDashboard] = useState<
        UserDashboardType | undefined
    >();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDashboard: UserDashboardType = await apiCall(
                    ENDPOINTS.ME
                );

                setUserDashboard(userDashboard);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, [apiCall]);

    return (
        <>
            <UserDashboardHeader user={userDashboard?.user} />

            <UserDashboardBadge badges={userDashboard?.user.badges} />

            <UserDashboardStatistic
                success={userDashboard?.success}
                games={userDashboard?.games}
                rank={userDashboard?.rank}
            />

            {userDashboard && userDashboard.history.length > 0 && (
                <UserDashboardHistory history={userDashboard.history} />
            )}

            <UserDashboardDangerZone user={userDashboard?.user} />
        </>
    );
}

export default UserDashboard;
