import type { GameType } from '../../../types/Game/gameType.ts';
import { useAuth } from '../../../contexts/authContext.tsx';
import { useAlert } from '../../../hooks/useAlert.ts';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../../constants/routes.ts';

interface WeekGamesProps {
    game: GameType | undefined;
}

export default function WeekGames({ game }: WeekGamesProps) {
    const { isAuthenticated } = useAuth();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    if (!game?.image) return null;

    const handleToutVoir = () => {
        if (isAuthenticated) {
            navigate(URLS.ME_GAMES);
        } else {
            showAlert(
                'Connexion requise',
                'Connecte-toi pour voir ton historique',
                'error'
            );
        }
    };

    return (
        <div className="hidden lg:block">
            <section className="h-[17%]"></section>

            <div className="h-[85%]">
                <div className="flex flex-col items-center gap-[0.5vh] overflow-y-auto max-h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {[...Array(7)].map((_, i) => (
                        <div key={i}>
                            <img
                                src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                alt={`Miniature ${i + 1}`}
                                className="w-[18vh] object-cover rounded-md border-2 border-retro-primary/30 cursor-pointer"
                            />
                            <p className="text-retro-muted font-righteous text-center text-xxs mt-0.5">
                                02/10/2026
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <button
                        className="btn-ghost w-full py-0.5 text-xxs"
                        onClick={handleToutVoir}
                    >
                        Tout voir
                    </button>
                </div>
            </div>
        </div>
    );
}
