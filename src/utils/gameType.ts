import {
    GAME_TYPE_CONTENT,
    type GameTypeContent,
    type GameTypeKey,
} from '../constants/gameTypes.ts';

export function getGameTypeContent(type?: string): GameTypeContent {
    if (type && type in GAME_TYPE_CONTENT) {
        return GAME_TYPE_CONTENT[type as GameTypeKey];
    }

    return GAME_TYPE_CONTENT.MULTIVERS;
}
