import * as React from 'react';
import type { GameAdminCreateType } from '../../../types/Game/gameAdminCreateType.ts';
import { useState } from 'react';
import { useApi } from '../../../hooks/useApi.tsx';
import { useAlert } from '../../../hooks/useAlert.ts';
import { CgSpinner } from 'react-icons/cg';
import { DatePicker } from '../../Game/Components/DatePicker.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';

function PromptGenerator({
    game,
    setGame,
}: {
    game: GameAdminCreateType;
    setGame: React.Dispatch<React.SetStateAction<GameAdminCreateType>>;
}) {
    const { apiCall } = useApi();
    const { showAlert } = useAlert();

    const [loading, setLoading] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');
    const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault();

        if (prompt.length < 5) return;

        setLoading(true);

        try {
            const response = await apiCall(ENDPOINTS.OPEN_AI_GENERATE_CONTENT, {
                method: 'POST',
                body: JSON.stringify({ prompt }),
            });

            const gameSolutionExist: boolean = await apiCall(
                ENDPOINTS.ADMIN_GAME_SOLUTION_EXIST(response.solution)
            );

            if (gameSolutionExist) {
                showAlert(
                    'Cette image a déjà été générée',
                    "Quelqu'un a eu cette idée avant toi, mais essaie autre chose !",
                    'info'
                );

                return;
            }

            const games = await apiCall(
                `${ENDPOINTS.ADMIN_GAME_INDEX}?fields=date`
            );

            const unavailableDates = games.map(
                (game: { date: string }) => game.date.split('T')[0]
            );

            setUnavailableDates(unavailableDates);

            const nextAvailableDate = new Date();
            let dateStr = nextAvailableDate.toISOString().split('T')[0];

            while (unavailableDates.includes(dateStr)) {
                nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
                dateStr = nextAvailableDate.toISOString().split('T')[0];
            }

            setGame(
                (prevGame: GameAdminCreateType): GameAdminCreateType => ({
                    ...prevGame,
                    prompt: response.prompt,
                    solution: response.solution,
                    hint: response.hint,
                    date: dateStr,
                })
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label-retro">
                            Quelle image souhaites-tu générer ?
                        </label>
                        <textarea
                            id="user-prompt"
                            value={prompt}
                            rows={2}
                            placeholder="Une fusion entre les univers de Jurassic Park et Avatar"
                            onChange={(e) => setPrompt(e.target.value)}
                            className="input-retro resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 ${prompt.length < 5 ? 'btn-disabled' : 'btn-3d'}`}
                    >
                        {!loading ? (
                            'Générer le jeu'
                        ) : (
                            <CgSpinner
                                className="animate-spin mx-auto"
                                size={20}
                            />
                        )}
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {game.solution ? (
                    <div>
                        <label className="label-retro">Solution</label>
                        <input
                            disabled
                            type="text"
                            id="solution"
                            value={game.solution}
                            onChange={(e) =>
                                setGame((prev) => ({
                                    ...prev,
                                    solution: e.target.value,
                                }))
                            }
                            className="input-retro cursor-not-allowed"
                        />
                    </div>
                ) : (
                    <div>
                        <label className="label-retro">Solution</label>
                        <div className="h-10 animate-pulse bg-retro-muted/20 border-[3px] border-retro-muted/30"></div>
                    </div>
                )}

                {game.date ? (
                    <div>
                        <label className="label-retro">Date du jeu</label>
                        <DatePicker
                            value={game?.date?.split('T')[0] || ''}
                            onChange={(date) =>
                                setGame((prev) =>
                                    prev ? { ...prev, date } : prev
                                )
                            }
                            unavailableDates={unavailableDates}
                        />
                    </div>
                ) : (
                    <div>
                        <label className="label-retro">Date du jeu</label>
                        <div className="h-10 animate-pulse bg-retro-muted/20 border-[3px] border-retro-muted/30"></div>
                    </div>
                )}
            </div>

            {game.prompt ? (
                <div className="md:col-span-2">
                    <label className="label-retro">Prompt</label>
                    <textarea
                        id="prompt"
                        rows={3}
                        value={game.prompt}
                        onChange={(e) =>
                            setGame((prev) => ({
                                ...prev,
                                prompt: e.target.value,
                            }))
                        }
                        className="input-retro resize-none"
                    />
                </div>
            ) : (
                <div className="md:col-span-2">
                    <label className="label-retro">Prompt</label>
                    <div className="flex flex-wrap gap-2 animate-pulse">
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-2/12"></div>
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-6/12"></div>
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-3/12"></div>
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-4/12"></div>
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-5/12"></div>
                        <div className="h-8 bg-retro-muted/20 border-[3px] border-retro-muted/30 w-3/12"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromptGenerator;
