import { useEffect, useState } from 'react';
import { useApi } from './useApi.tsx';
import { useDebounce } from './useDebounce.ts';
import { ENDPOINTS } from '../constants/endpoints.ts';
import type { AsyncState } from '../types/asyncStateType.ts';
import type { ActivityIndexType } from '../types/Activity/activityType.ts';

interface UseActivitiesReturn {
    activities: AsyncState<ActivityIndexType>;
    search: string;
    page: number;
    totalPages: number;
    handleSearchChange: (value: string) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

export function useActivities(): UseActivitiesReturn {
    const { apiCall } = useApi();

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search);
    const [page, setPage] = useState<number>(1);
    const [activities, setActivities] = useState<
        AsyncState<ActivityIndexType>
    >({
        data: null,
        loading: true,
        error: null,
    });

    const totalPages = activities.data
        ? Math.max(
              1,
              Math.ceil(activities.data.total / activities.data.perPage)
          )
        : 1;

    useEffect(() => {
        // Ignore les réponses obsolètes (debounce + pagination peuvent s'entrecroiser)
        let ignore = false;

        const fetchData = async () => {
            setActivities((prev) => ({ ...prev, loading: true, error: null }));

            try {
                const response = await apiCall(
                    ENDPOINTS.ACTIVITY_INDEX(page, debouncedSearch)
                );

                if (!ignore) {
                    setActivities({
                        data: response,
                        loading: false,
                        error: null,
                    });
                }
            } catch {
                if (!ignore) {
                    setActivities({
                        data: null,
                        loading: false,
                        error: 'Impossible de charger les activités.',
                    });
                }
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, [apiCall, page, debouncedSearch]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const goToPreviousPage = () => setPage((prev) => Math.max(1, prev - 1));
    const goToNextPage = () =>
        setPage((prev) => Math.min(totalPages, prev + 1));

    return {
        activities,
        search,
        page,
        totalPages,
        handleSearchChange,
        goToPreviousPage,
        goToNextPage,
    };
}
