import { BADGES } from '../../constants/badges.ts';

export interface BadgeType {
    name: keyof typeof BADGES;
}
