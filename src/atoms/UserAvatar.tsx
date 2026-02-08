interface UserAvatarProps {
    avatarUrl?: string;
    username?: string;
    className?: string;
    onLoad?: () => void;
}

export default function UserAvatar({
    avatarUrl,
    username,
    className,
    onLoad,
}: UserAvatarProps) {
    return (
        <img
            src={
                avatarUrl ?? `${import.meta.env.VITE_DICE_URL}${username}`
            }
            alt="Avatar"
            className={className}
            onLoad={onLoad}
        />
    );
}
