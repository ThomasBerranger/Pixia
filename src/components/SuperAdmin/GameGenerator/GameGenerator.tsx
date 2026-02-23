import type { GameAdminCreateType } from '../../../types/Game/gameAdminCreateType.ts';
import PromptGenerator from './PromptGenerator.tsx';
import ImageGenerator from './ImageGenerator.tsx';
import { useApi } from '../../../hooks/useApi.tsx';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { URLS } from '../../../constants/routes.ts';
import { useAlert } from '../../../hooks/useAlert.ts';
import { ENDPOINTS } from '../../../constants/endpoints.ts';

function AdminUserDashboard() {
    const { apiCall } = useApi();
    const { showAlert } = useAlert();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [game, setGame] = useState<GameAdminCreateType>({
        prompt: undefined,
        solution: undefined,
        hint: undefined,
        image: undefined,
        imageUrl: undefined,
        date: undefined,
    });

    async function handleGameSubmit(): Promise<void> {
        setLoading(true);

        try {
            const createdGame = await apiCall(ENDPOINTS.ADMIN_GAME_CREATE, {
                method: 'POST',
                body: JSON.stringify(game),
            });

            showAlert(
                'Nouveau jeu créé',
                'Félicitation, votre jeu a été ajouté à Pixia. Clique ici pour le modifier',
                'success',
                5000,
                URLS.ADMIN_GAME_EDIT(createdGame.id)
            );
        } catch (error) {
            showAlert(
                'Aïe, on a un problème',
                "Malheureusement ton jeu n'a pas été créé.",
                'error'
            );

            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex py-10 px-[10px] sm:p-6">
            <div className="card-retro w-full">
                <PromptGenerator game={game} setGame={setGame} />
                <ImageGenerator
                    game={game}
                    setGame={setGame}
                    onGameSubmit={handleGameSubmit}
                />

                {game.imageUrl && (
                    <div className="flex justify-center mt-5">
                        <button
                            disabled={loading || !game.date}
                            className="w-3/5 btn-3d text-white bg-red-600 py-2.5"
                            onClick={handleGameSubmit}
                        >
                            {loading ? (
                                <CgSpinner
                                    className="animate-spin mx-auto"
                                    size={20}
                                />
                            ) : (
                                'Enregistrer ce jeu'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminUserDashboard;
