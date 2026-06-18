import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi.tsx';
import { useAlert } from '../../hooks/useAlert.ts';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { URLS } from '../../constants/routes.ts';
import {
    DIFFICULTIES,
    type Difficulty,
} from '../../constants/difficultyPoints.ts';
import { GAME_TYPES, type GameTypeKey } from '../../constants/gameTypes.ts';
import { CgSpinner } from 'react-icons/cg';

interface GameCreateForm {
    solution: string;
    englishSolution: string;
    hint: string;
    difficulty: Difficulty;
    type: GameTypeKey;
}

function GameGenerator() {
    const { apiCall } = useApi();
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<GameCreateForm>({
        solution: '',
        englishSolution: '',
        hint: '',
        difficulty: 'SIMPLE',
        type: GAME_TYPES.MULTIVERS,
    });

    function updateField(field: Partial<GameCreateForm>) {
        setGame((prev) => ({ ...prev, ...field }));
    }

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setLoading(true);

        try {
            const createdGame = await apiCall(
                ENDPOINTS.SUPER_ADMIN_GAME_CREATE,
                {
                    method: 'POST',
                    body: JSON.stringify(game),
                }
            );

            navigate(URLS.ADMIN_GAME_EDIT(createdGame.id));
        } catch (error) {
            showAlert('Erreur', "Le jeu n'a pas pu être créé.", 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="max-w-3xl mx-auto w-full flex items-center justify-center min-h-[90vh] py-10 px-[10px] sm:p-6">
            <div className="card-retro w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-1/2 space-y-4">
                            <div>
                                <label
                                    htmlFor="solution"
                                    className="label-retro"
                                >
                                    Solution
                                </label>
                                <input
                                    id="solution"
                                    type="text"
                                    required
                                    value={game.solution}
                                    onChange={(e) =>
                                        updateField({
                                            solution: e.target.value,
                                        })
                                    }
                                    className="input-retro p-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="englishSolution"
                                    className="label-retro"
                                >
                                    Solution anglaise
                                </label>
                                <input
                                    id="englishSolution"
                                    type="text"
                                    required
                                    value={game.englishSolution}
                                    onChange={(e) =>
                                        updateField({
                                            englishSolution: e.target.value,
                                        })
                                    }
                                    className="input-retro p-2"
                                />
                            </div>
                        </div>

                        <div className="sm:w-1/2 space-y-4">
                            <div>
                                <label
                                    htmlFor="difficulty"
                                    className="label-retro"
                                >
                                    Difficulté
                                </label>
                                <select
                                    id="difficulty"
                                    value={game.difficulty}
                                    onChange={(e) =>
                                        updateField({
                                            difficulty: e.target
                                                .value as Difficulty,
                                        })
                                    }
                                    className="input-retro p-2 text-center"
                                >
                                    {Object.keys(DIFFICULTIES).map((key) => (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="type" className="label-retro">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    value={game.type}
                                    onChange={(e) =>
                                        updateField({
                                            type: e.target
                                                .value as GameTypeKey,
                                        })
                                    }
                                    className="input-retro p-2 text-center"
                                >
                                    {Object.keys(GAME_TYPES).map((key) => (
                                        <option key={key} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="hint" className="label-retro">
                            Indice
                        </label>
                        <textarea
                            id="hint"
                            rows={2}
                            required
                            value={game.hint}
                            onChange={(e) =>
                                updateField({ hint: e.target.value })
                            }
                            className="input-retro p-2 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-2.5"
                    >
                        {loading ? (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={22}
                            />
                        ) : (
                            'Créer le jeu'
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default GameGenerator;
