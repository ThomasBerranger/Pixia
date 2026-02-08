import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import type { ContributionType } from '../../types/Contribution/contributionType.ts';
import { CONTRIBUTION_TYPES } from '../../constants/contributionTypes.ts';
import { RxDotFilled } from 'react-icons/rx';
import {
    CONTRIBUTION_STATUS_CONFIG,
    CONTRIBUTION_STATUSES,
} from '../../constants/contributionStatuses.ts';
import { CgSpinner } from 'react-icons/cg';

export default function Contribution() {
    const { apiCall } = useApi();

    const [contributions, setContributions] = useState<ContributionType[]>();
    const [contributionLoadingId, setContributionLoadingId] = useState<
        string | undefined
    >();

    useEffect(() => {
        const fetchData = async () => {
            const contributions = await apiCall(
                ENDPOINTS.ADMIN_CONTRIBUTION_INDEX
            );

            setContributions(contributions);
        };

        fetchData();
    }, [apiCall]);

    async function updateStatus(contributionId: string, status: string) {
        setContributionLoadingId(contributionId);

        try {
            const contributionUpdated = await apiCall(
                ENDPOINTS.ADMIN_CONTRIBUTION_UPDATE(contributionId),
                {
                    method: 'PATCH',
                    body: JSON.stringify({ status }),
                }
            );

            setContributions((prev) =>
                prev?.map((contrib) =>
                    contrib.id === contributionId
                        ? { ...contrib, status: contributionUpdated.status }
                        : contrib
                )
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        } finally {
            setContributionLoadingId(undefined);
        }
    }

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto flex py-10 px-[10px]">
            <div className="card-primary w-full h-fit grid sm:grid-cols-3 gap-8 font-righteous">
                {contributions &&
                    contributions.map((contribution: ContributionType) => (
                        <div
                            key={contribution.createdAt}
                            className="border-l-4 border-retro-primary h-fit pl-3 pb-2"
                        >
                            <p>
                                {contribution.type ===
                                CONTRIBUTION_TYPES.GAME_SUGGESTION
                                    ? '💡 Idées de fusion'
                                    : '🪲 Bug détecté'}
                            </p>
                            <p className="flex items-center">
                                <RxDotFilled size={20} className="mr-1.5" />{' '}
                                {contribution.author?.username}
                            </p>

                            <p className="flex items-center mt-3 text-lg">
                                {contribution.title}
                            </p>
                            <p className="flex items-center mt-3 text-sm">
                                {contribution.description}
                            </p>

                            {contribution.id === contributionLoadingId ? (
                                <CgSpinner
                                    size={24}
                                    className="mt-3 animate-spin"
                                />
                            ) : contribution.status ===
                              CONTRIBUTION_STATUSES.PENDING ? (
                                <select
                                    id="status"
                                    value={contribution.status}
                                    onChange={(e) =>
                                        updateStatus(
                                            contribution.id,
                                            e.target.value
                                        )
                                    }
                                    className="input-retro p-1 mt-3 text-sm"
                                >
                                    {Object.entries(
                                        CONTRIBUTION_STATUS_CONFIG
                                    ).map(([key, value]) => (
                                        <option key={key} value={key}>
                                            {value.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="mt-3 pl-3 pr-4 py-0.5 badge-accent text-sm w-fit flex items-center gap-2">
                                    {(() => {
                                        const Icon =
                                            CONTRIBUTION_STATUS_CONFIG[
                                                contribution.status
                                            ].icon;
                                        return <Icon className="-mr-0.5" />;
                                    })()}
                                    {
                                        CONTRIBUTION_STATUS_CONFIG[
                                            contribution.status
                                        ].label
                                    }
                                </p>
                            )}
                        </div>
                    ))}
            </div>
        </section>
    );
}
