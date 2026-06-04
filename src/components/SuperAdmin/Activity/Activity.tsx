import { useActivities } from '../../../hooks/useActivities.ts';
import Pagination from '../../../atoms/Pagination.tsx';
import ActivityTable from './ActivityTable.tsx';

function Activity() {
    const {
        activities,
        search,
        page,
        totalPages,
        handleSearchChange,
        goToPreviousPage,
        goToNextPage,
    } = useActivities();

    return (
        <section className="min-h-[90vh] max-w-6xl mx-auto w-full py-10 px-3">
            <div className="flex items-center justify-between gap-3 mb-4">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Rechercher un joueur..."
                    maxLength={255}
                    className="input-retro-primary w-full max-w-xs"
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPrevious={goToPreviousPage}
                    onNext={goToNextPage}
                />
            </div>

            <ActivityTable
                activities={activities.data?.items ?? []}
                loading={activities.loading}
                error={activities.error}
            />
        </section>
    );
}

export default Activity;
