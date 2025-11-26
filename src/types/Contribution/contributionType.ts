import type { CONTRIBUTION_TYPES } from '../../constants/contributionTypes.ts';
import type { CONTRIBUTION_STATUSES } from '../../constants/contributionStatuses.ts';
import type { UserType } from '../User/userType.ts';

export interface ContributionType {
    id: string;
    title: string;
    description: string;
    type: keyof typeof CONTRIBUTION_TYPES;
    status: keyof typeof CONTRIBUTION_STATUSES;
    createdAt: string;
    author?: UserType;
}
