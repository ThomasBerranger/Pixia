import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    ACTIVITY_TYPES,
    ACTIVITY_TYPE_LABELS,
} from '../../../constants/activityTypes.ts';
import type { ActivityType } from '../../../types/Activity/activityType.ts';

const COLUMNS = ['Joueur', 'Action', 'Détails', 'Date'] as const;

interface ActivityTableProps {
    activities: ActivityType[];
    loading: boolean;
    error: string | null;
}

interface ActivityDetailsProps {
    activity: ActivityType;
}

function ActivityDetails({ activity }: ActivityDetailsProps) {
    switch (activity.type) {
        case ACTIVITY_TYPES.PLAYER_TOKENS_CLAIM:
        case ACTIVITY_TYPES.ADMIN_TOKENS_CLAIM:
            return (
                <div className="badge-accent text-sm text-center px-3 py-0.5 w-fit">
                    +{activity.data.amount} jetons
                </div>
            );
        case ACTIVITY_TYPES.GAME_GENERATION_REQUEST:
        case ACTIVITY_TYPES.GAME_GENERATION:
            return (
                <pre className="text-xs text-retro-muted whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                    {JSON.stringify(activity.data, null, 2)}
                </pre>
            );
        case ACTIVITY_TYPES.IMAGE_GENERATION_REQUEST:
        case ACTIVITY_TYPES.IMAGE_GENERATION:
            return (
                <p className="text-sm text-retro-muted line-clamp-2">
                    {activity.data.solution ?? activity.data.imagePrompt}
                </p>
            );
        case ACTIVITY_TYPES.GAME_GENERATION_ERROR:
        case ACTIVITY_TYPES.IMAGE_GENERATION_ERROR:
            return (
                <p className="text-sm text-retro-primary line-clamp-2">
                    {activity.data.error}
                </p>
            );
        default:
            return null;
    }
}

function SkeletonRows() {
    return (
        <>
            {Array.from({ length: 5 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {COLUMNS.map((column) => (
                        <td key={column}>
                            <div className="h-4 bg-retro-muted/20 animate-pulse" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

interface ActivityRowProps {
    activity: ActivityType;
}

function ActivityRow({ activity }: ActivityRowProps) {
    return (
        <tr className="text-sm">
            <td>{activity.player.username}</td>
            <td>{ACTIVITY_TYPE_LABELS[activity.type] ?? activity.type}</td>
            <td>
                <ActivityDetails activity={activity} />
            </td>
            <td className="text-xs whitespace-nowrap">
                {format(parseISO(activity.createdAt), 'd MMM à HH:mm', {
                    locale: fr,
                })}
            </td>
        </tr>
    );
}

interface MessageRowProps {
    message: string;
    isError?: boolean;
}

function MessageRow({ message, isError }: MessageRowProps) {
    return (
        <tr>
            <td
                colSpan={COLUMNS.length}
                className={`text-center ${isError ? '!text-retro-primary' : '!text-retro-muted'}`}
            >
                {message}
            </td>
        </tr>
    );
}

function ActivityTable({ activities, loading, error }: ActivityTableProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table-retro">
                <thead>
                    <tr>
                        {COLUMNS.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <SkeletonRows />
                    ) : error ? (
                        <MessageRow message={error} isError />
                    ) : activities.length === 0 ? (
                        <MessageRow message="Aucune activité pour le moment" />
                    ) : (
                        activities.map((activity, index) => (
                            <ActivityRow key={index} activity={activity} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ActivityTable;
