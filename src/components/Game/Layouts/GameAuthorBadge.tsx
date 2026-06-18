import { Link } from 'react-router-dom';
import UserAvatar from '../../../atoms/UserAvatar.tsx';
import { URLS } from '../../../constants/routes.ts';
import type { UserType } from '../../../types/User/userType.ts';

interface GameAuthorBadgeProps {
    author: UserType;
    variant: 'mobile' | 'desktop';
}

const CLASSES = {
    mobile: {
        link: 'flex md:hidden items-center gap-1.5 float-left relative z-10 mb-4 max-w-[35vw] min-w-0',
        avatar: 'w-10 h-10 flex-shrink-0',
        info: 'flex flex-col font-righteous overflow-hidden',
        label: 'text-xxs text-retro-muted',
        username: 'text-xs truncate',
    },
    desktop: {
        link: 'absolute hidden md:flex items-center top-2 left-2 z-10 rounded-xl max-w-[25vw] bg-retro-bg/100 backdrop-blur-sm py-1 border-2 border-retro-accent/50 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out group-hover:opacity-40 hover:!opacity-100',
        avatar: 'w-12 h-12 flex-shrink-0',
        info: 'flex flex-col font-righteous min-w-0',
        label: 'text-xs text-retro-muted mr-2',
        username: 'mr-1.5 truncate',
    },
} as const;

function GameAuthorBadge({ author, variant }: GameAuthorBadgeProps) {
    const classes = CLASSES[variant];

    return (
        <Link to={URLS.USER_SHOW(author.slug)} className={classes.link}>
            <UserAvatar
                avatarUrl={author.avatarUrl}
                username={author.username}
                className={classes.avatar}
            />
            <div className={classes.info}>
                <span className={classes.label}>Générée par</span>
                <span className={classes.username}>{author.username}</span>
            </div>
        </Link>
    );
}

export default GameAuthorBadge;
