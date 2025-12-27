import type { ContributionType } from '../../../types/Contribution/contributionType.ts';
import { CONTRIBUTION_TYPES } from '../../../constants/contributionTypes.ts';
import {
    CONTRIBUTION_STATUSES,
    CONTRIBUTION_STATUS_CONFIG,
} from '../../../constants/contributionStatuses.ts';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function UserDashboardSuggestion({
    contributions,
    onSubmitContribution,
}: {
    contributions: ContributionType[];
    onSubmitContribution: (
        formData: { title: string; description: string },
        type: string
    ) => Promise<void>;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loadingSuggestion, setLoadingSuggestion] = useState(false);
    const [loadingBug, setLoadingBug] = useState(false);

    const suggestionPending = contributions.some(
        (c) =>
            c.type === CONTRIBUTION_TYPES.GAME_SUGGESTION &&
            c.status === CONTRIBUTION_STATUSES.PENDING
    );
    const bugPending = contributions.some(
        (c) =>
            c.type === CONTRIBUTION_TYPES.BUG_DETECTED &&
            c.status === CONTRIBUTION_STATUSES.PENDING
    );

    const isFormValid = title.length > 2 && description.length > 2;

    const handleSubmit = async (type: 'suggestion' | 'bug') => {
        if (!isFormValid) return;

        const setLoading =
            type === 'suggestion' ? setLoadingSuggestion : setLoadingBug;

        setLoading(true);
        try {
            const apiType =
                type === 'suggestion'
                    ? CONTRIBUTION_TYPES.GAME_SUGGESTION
                    : CONTRIBUTION_TYPES.BUG_DETECTED;

            await onSubmitContribution({ title, description }, apiType);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const PendingMessage = ({
        contributionType,
    }: {
        contributionType: (typeof CONTRIBUTION_TYPES)[keyof typeof CONTRIBUTION_TYPES];
    }) => {
        return (
            <div className="h-full w-full bg-retro-muted/20 flex items-center text-center text-xxs font-righteous p-1">
                {contributionType === CONTRIBUTION_TYPES.GAME_SUGGESTION ? (
                    <p>Super idée ! On check si elle n'est pas déjà en ligne</p>
                ) : (
                    <p>Aîe foutu bug ! On vérifie de notre côté</p>
                )}
            </div>
        );
    };

    const ContributionList = ({
        contributions,
    }: {
        contributions: ContributionType[];
    }) => {
        return (
            <>
                {contributions
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((contribution) => {
                        const statusConfig =
                            CONTRIBUTION_STATUS_CONFIG[contribution.status];
                        const StatusIcon = statusConfig.icon;
                        const emoji =
                            contribution.type ===
                            CONTRIBUTION_TYPES.GAME_SUGGESTION
                                ? '💡'
                                : '🪲';

                        return (
                            <div
                                key={contribution.createdAt}
                                className="flex justify-between items-center mt-3"
                            >
                                <div className="flex items-center border-retro-line-muted">
                                    <div className="line-muted"></div>

                                    <div>
                                        <div className="text-retro-muted text-xs mb-1 capitalize tracking-wide">
                                            {format(
                                                new Date(
                                                    contribution.createdAt
                                                ),
                                                'EEEE dd/MM/yyyy',
                                                { locale: fr }
                                            )}
                                        </div>

                                        <p className="font-righteous text-sm">
                                            {emoji} {contribution.title}
                                        </p>
                                    </div>
                                </div>

                                <span className="badge-accent-no-border">
                                    <StatusIcon /> {statusConfig.label}
                                </span>
                            </div>
                        );
                    })}
            </>
        );
    };

    return (
        <>
            <h3 className="font-righteous text-retro-accent text-left text-xs uppercase mb-2">
                Propose une idée ou signale un bug
            </h3>

            <div className="grid grid-cols-12 gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-retro p-2 col-span-12 text-sm"
                    placeholder="Une fusion de films ou un bug"
                />
                <textarea
                    className="input-retro p-2 col-span-12 text-sm"
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décris la scène géniale que tu as en tête ou le bug que tu as rencontré"
                />
                <div className="col-span-full flex gap-2">
                    {suggestionPending ? (
                        <PendingMessage
                            contributionType={
                                CONTRIBUTION_TYPES.GAME_SUGGESTION
                            }
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => handleSubmit('suggestion')}
                            disabled={loadingSuggestion || !isFormValid}
                            className={`py-1.5 px-1 text-xs text-center w-full ${
                                isFormValid ? 'btn-3d' : 'btn-disabled'
                            }`}
                        >
                            {loadingSuggestion ? (
                                <CgSpinner className="animate-spin text-2xl mx-auto" />
                            ) : (
                                'Propose ton idée 💡'
                            )}
                        </button>
                    )}
                    {bugPending ? (
                        <PendingMessage
                            contributionType={CONTRIBUTION_TYPES.BUG_DETECTED}
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => handleSubmit('bug')}
                            disabled={loadingBug || !isFormValid}
                            className={`py-1.5 sm:p-1 text-xs text-center w-full ${
                                isFormValid ? 'btn-3d' : 'btn-disabled'
                            }`}
                        >
                            {loadingBug ? (
                                <CgSpinner className="animate-spin text-2xl mx-auto" />
                            ) : (
                                'Signale le problème 🪲'
                            )}
                        </button>
                    )}
                </div>
            </div>
            <ContributionList contributions={contributions} />
        </>
    );
}
