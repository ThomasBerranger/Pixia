import { TbSeparator } from 'react-icons/tb';
import type { ContributionType } from '../../../types/Contribution/contributionType.ts';
import { CONTRIBUTION_TYPES } from '../../../constants/contributionTypes.ts';
import {
    CONTRIBUTION_STATUSES,
    CONTRIBUTION_STATUS_CONFIG,
} from '../../../constants/contributionStatuses.ts';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

type ContributionFormData = {
    title?: string;
    description?: string;
};

const ContributionForm = ({
    formData,
    setFormData,
    onSubmit,
    isLoading,
    type,
}: {
    formData: ContributionFormData | undefined;
    setFormData: React.Dispatch<
        React.SetStateAction<ContributionFormData | undefined>
    >;
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    type: 'suggestion' | 'bug';
}) => {
    const isFormValid =
        (formData?.title?.length ?? 0) > 2 &&
        (formData?.description?.length ?? 0) > 2;

    const config = {
        suggestion: {
            titlePlaceholder: 'Star Wars et Very Bad Trip',
            descriptionPlaceholder:
                'Le trio déjanté se réveille sur Tatooine avec une énorme gueule de bois et le sabre laser de Mace Windu dans la poche.',
            buttonText: 'Propose ton idée',
            helperText:
                'Les meilleures fusions sont intégrées au jeu. Si la tienne est validée : +10 points !',
        },
        bug: {
            titlePlaceholder: 'Nombre de parties restantes',
            descriptionPlaceholder:
                "J'ai remarqué que mon nombre de parties restantes n'était pas correcte. J'en vois 3 sur mon profil alors qu'il ne m'en reste que 2.",
            buttonText: 'Signale le problème',
            helperText:
                'Chaque bug signalé est vérifié. Si le tien est confirmé : +10 points !',
        },
    }[type];

    return (
        <>
            <form className="grid grid-cols-12 gap-2" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={formData?.title || ''}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    className="input-retro col-span-12 sm:col-span-4"
                    placeholder={config.titlePlaceholder}
                />
                <textarea
                    className="input-retro p-2 col-span-12 sm:col-span-6 text-sm"
                    name="description"
                    value={formData?.description || ''}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    placeholder={config.descriptionPlaceholder}
                />
                <button
                    disabled={isLoading || !isFormValid}
                    className={`col-span-12 sm:col-span-2 py-1.5 sm:p-1 text-xs flex justify-center items-center 
                    ${isFormValid ? 'btn-3d' : 'btn-disabled'}`}
                >
                    {isLoading ? (
                        <CgSpinner className="animate-spin text-sm sm:text-xl" />
                    ) : (
                        config.buttonText
                    )}
                </button>
            </form>
            <p className="text-retro-muted text-xxs sm:text-sm mt-3 sm:mt-1">
                {config.helperText}
            </p>
        </>
    );
};

const PendingMessage = ({ message }: { message: string }) => (
    <div className="h-10 bg-retro-muted/20 flex justify-center items-center">
        <p className="font-righteous">{message}</p>
    </div>
);

const ContributionList = ({
    contributions,
    type,
}: {
    contributions: ContributionType[];
    type: string;
}) => (
    <>
        {contributions
            .filter(
                (contribution: ContributionType) => contribution.type === type
            )
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .map((contribution: ContributionType) => {
                const statusConfig =
                    CONTRIBUTION_STATUS_CONFIG[contribution.status];
                const StatusIcon = statusConfig.icon;

                return (
                    <div
                        key={contribution.id}
                        className="flex items-center -ml-4 mt-3"
                    >
                        <TbSeparator
                            size={40}
                            className="rotate-90 text-retro-muted"
                        />
                        <p className="font-righteous text-xs sm:text-sm">
                            {contribution.title}
                        </p>
                        <span
                            className={`badge-yellow text-xs ml-2 py-0.5 px-2 font-righteous flex items-center uppercase`}
                        >
                            <StatusIcon className="mr-1.5" />
                            {statusConfig.label}
                        </span>
                    </div>
                );
            })}
    </>
);

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
    const [suggestion, setSuggestion] = useState<ContributionFormData>();
    const [isSuggestionLoading, setIsSuggestionLoading] =
        useState<boolean>(false);
    const [bugReport, setBugReport] = useState<ContributionFormData>();
    const [isBugReportLoading, setIsBugReportLoading] =
        useState<boolean>(false);

    const handleSubmit = async (
        e: React.FormEvent,
        formData: ContributionFormData | undefined,
        type: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        resetForm: React.Dispatch<
            React.SetStateAction<ContributionFormData | undefined>
        >
    ) => {
        e.preventDefault();

        if (
            !formData?.title ||
            !formData?.description ||
            formData.title.length < 2 ||
            formData.description.length < 2
        ) {
            return;
        }

        setLoading(true);

        try {
            await onSubmitContribution(
                { title: formData.title, description: formData.description },
                type
            );
            resetForm(undefined);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const submitSuggestion = (e: React.FormEvent) =>
        handleSubmit(
            e,
            suggestion,
            CONTRIBUTION_TYPES.GAME_SUGGESTION,
            setIsSuggestionLoading,
            setSuggestion
        );

    const submitBugReport = (e: React.FormEvent) =>
        handleSubmit(
            e,
            bugReport,
            CONTRIBUTION_TYPES.BUG_DETECTED,
            setIsBugReportLoading,
            setBugReport
        );

    const getLastContribution = (
        type: string
    ): ContributionType | undefined => {
        return contributions
            .filter((c: ContributionType) => c.type === type)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )[0];
    };

    const lastGameSuggestion = getLastContribution(
        CONTRIBUTION_TYPES.GAME_SUGGESTION
    );
    const lastBugReport = getLastContribution(CONTRIBUTION_TYPES.BUG_DETECTED);

    const canSubmitGameSuggestion =
        !lastGameSuggestion ||
        lastGameSuggestion.status !== CONTRIBUTION_STATUSES.PENDING;
    const canSubmitBugReport =
        !lastBugReport ||
        lastBugReport.status !== CONTRIBUTION_STATUSES.PENDING;

    return (
        <section className="mt-5">
            <h3 className="font-righteous text-retro-accent text-left text-sm uppercase mb-4">
                💡Tu as une idée de fusion ?
            </h3>

            {canSubmitGameSuggestion ? (
                <ContributionForm
                    formData={suggestion}
                    setFormData={setSuggestion}
                    onSubmit={submitSuggestion}
                    isLoading={isSuggestionLoading}
                    type="suggestion"
                />
            ) : (
                <PendingMessage message="Super idée ! On check si elle n'est pas déjà en ligne" />
            )}

            <ContributionList
                contributions={contributions}
                type={CONTRIBUTION_TYPES.GAME_SUGGESTION}
            />

            <h3 className="font-righteous text-retro-accent text-left text-sm uppercase my-4">
                🪲 Tu as remarqué un bug ?
            </h3>

            {canSubmitBugReport ? (
                <ContributionForm
                    formData={bugReport}
                    setFormData={setBugReport}
                    onSubmit={submitBugReport}
                    isLoading={isBugReportLoading}
                    type="bug"
                />
            ) : (
                <PendingMessage message="Aîe foutu bug ! On vérifie de notre côté" />
            )}

            <ContributionList
                contributions={contributions}
                type={CONTRIBUTION_TYPES.BUG_DETECTED}
            />
        </section>
    );
}
