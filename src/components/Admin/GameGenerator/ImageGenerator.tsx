import { useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import type { GameAdminCreateType } from '../../../types/Game/gameAdminCreateType.ts';
import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { ENDPOINTS } from '../../../constants/endpoints.ts';

function ImageGenerator({
    game,
    setGame,
    onGameSubmit,
}: {
    game: GameAdminCreateType;
    setGame: React.Dispatch<React.SetStateAction<GameAdminCreateType>>;
    onGameSubmit: () => Promise<void>;
}) {
    const { apiCall } = useApi();

    const [loading, setLoading] = useState<boolean>(false);

    async function handleOpenAIImage(): Promise<void> {
        setLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.OPEN_AI_GENERATE_IMAGE, {
                method: 'POST',
                body: JSON.stringify({ prompt: game.prompt }),
            });

            setGame(
                (prevGame: GameAdminCreateType): GameAdminCreateType => ({
                    ...prevGame,
                    imageUrl: response || undefined,
                })
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-5">
            {game.prompt && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        disabled={loading}
                        className="flex-1 btn-primary py-2.5"
                        onClick={handleOpenAIImage}
                    >
                        {loading ? (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={20}
                            />
                        ) : (
                            <span className="flex justify-center gap-2">
                                Générer l'image{' '}
                                <CiMoneyCheck1 className="text-xl" />
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => onGameSubmit()}
                        className="btn-ghost py-2.5 px-10"
                    >
                        Enregistrer sans image
                    </button>
                </div>
            )}

            {game.imageUrl && (
                <div className="w-full flex justify-center mt-8">
                    <img
                        src={game.imageUrl}
                        alt="Generated"
                        className="max-h-80 border-[3px] border-retro-accent shadow-[0_0_30px_rgba(255,190,11,0.4)]"
                    />
                </div>
            )}
        </div>
    );
}

export default ImageGenerator;
