import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi.tsx';
import type { GameAdminType } from '../../types/Game/gameAdminType.ts';
import { CgSpinner } from 'react-icons/cg';
import { useAlert } from '../../hooks/useAlert.ts';
import { DatePicker } from '../Game/Components/DatePicker.tsx';
import { ENDPOINTS } from '../../constants/endpoints.ts';
import { DIFFICULTIES } from '../../constants/difficultyPoints.ts';

function AdminGameEdit() {
    const { id } = useParams<{ id: string }>();
    const { apiCall } = useApi();
    const { showAlert } = useAlert();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<GameAdminType>();
    const [unavailableDates, setUnavailableDates] = useState<string[]>([]);

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await apiCall(ENDPOINTS.ADMIN_GAME_UPDATE(id));

                setGame(response);

                const games = await apiCall(
                    `${ENDPOINTS.ADMIN_GAME_INDEX}?fields=date`
                );

                const unavailableDates = games.map(
                    (game: { date: string }) => game.date.split('T')[0]
                );

                setUnavailableDates(unavailableDates);
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmit(e?: React.FormEvent): Promise<void> {
        e?.preventDefault();

        if (!id) {
            return;
        }

        setLoading(true);

        try {
            await apiCall(ENDPOINTS.ADMIN_GAME_UPDATE(id), {
                method: 'PATCH',
                body: JSON.stringify(game),
            });

            showAlert(
                'Jeu mis à jour',
                'Les informations du jeu ont bien été modifiées.',
                'success'
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file || !id) return;

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await apiCall(
                ENDPOINTS.ADMIN_GAME_IMAGE_EDIT(id),
                {
                    method: 'POST',
                    body: formData,
                },
                false
            );

            if (response) {
                setGame((prev) => (prev ? { ...prev, image: response } : prev));

                showAlert(
                    'Image modifiée',
                    "L'image du jeu a bien été modifiée.",
                    'success'
                );
            }
        } catch (err) {
            console.error('Erreur upload image:', err);
        }
    };

    return (
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex py-10 px-[10px] sm:p-6">
            <div className="card-retro w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                        onClick={handleImageClick}
                        className="cursor-pointer w-full flex justify-center p-2 bg-retro-muted/10 hover:bg-retro-muted/20 transition"
                    >
                        {game?.image ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                alt="AI created image"
                                className="max-h-80 border-[3px] border-retro-accent shadow-[0_0_30px_rgba(255,190,11,0.4)]"
                            />
                        ) : (
                            <img
                                className="h-60 mx-auto opacity-70"
                                src="https://placehold.co/600x300/EEE/31343C?font=oswald&text=Chargement"
                                alt="placeholder"
                            />
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="solution" className="label-retro">
                                Solution
                            </label>
                            <input
                                id="solution"
                                type="text"
                                value={game?.solution || ''}
                                onChange={(e) =>
                                    setGame((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  solution: e.target.value,
                                              }
                                            : prev
                                    )
                                }
                                className="input-retro p-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="solution" className="label-retro">
                                Solution Anglaise
                            </label>
                            <input
                                id="solution"
                                type="text"
                                value={game?.englishSolution || ''}
                                onChange={(e) =>
                                    setGame((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  englishSolution:
                                                      e.target.value,
                                              }
                                            : prev
                                    )
                                }
                                className="input-retro p-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="label-retro">
                                Date
                            </label>
                            <DatePicker
                                value={game?.date?.split('T')[0] || ''}
                                initialDate={game?.date?.split('T')[0]}
                                onChange={(date) =>
                                    setGame((prev) =>
                                        prev ? { ...prev, date } : prev
                                    )
                                }
                                unavailableDates={unavailableDates}
                            />
                        </div>

                        <div className="row-span-2">
                            <label htmlFor="indice" className="label-retro">
                                Indice
                            </label>
                            <textarea
                                id="indice"
                                rows={5}
                                value={game?.hint || ''}
                                onChange={(e) =>
                                    setGame((prev) =>
                                        prev
                                            ? { ...prev, hint: e.target.value }
                                            : prev
                                    )
                                }
                                className="input-retro p-2 resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="label-retro">
                                Difficulté
                            </label>
                            <select
                                id="difficulty"
                                value={game?.difficulty || ''}
                                onChange={(e) =>
                                    setGame((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  difficulty: e.target
                                                      .value as keyof typeof DIFFICULTIES,
                                              }
                                            : prev
                                    )
                                }
                                className="input-retro p-2"
                            >
                                {Object.entries(DIFFICULTIES).map(([key]) => (
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
                            <input
                                disabled
                                id="type"
                                value={game?.type || ''}
                                className="input-retro p-2 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label htmlFor="author" className="label-retro">
                                Auteur
                            </label>
                            <input
                                disabled
                                id="author"
                                value={
                                    game?.author && game?.author
                                        ? game.author.username
                                        : ''
                                }
                                className="input-retro p-2 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-3d py-2.5 px-10 min-w-[160px]"
                        >
                            {loading ? (
                                <CgSpinner
                                    className="animate-spin mx-auto"
                                    size={22}
                                />
                            ) : (
                                'Enregistrer'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AdminGameEdit;
