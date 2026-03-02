import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi.tsx';
import { useAuth } from '../../../contexts/authContext.tsx';
import { useAlert } from '../../../hooks/useAlert.ts';
import { useModal } from '../../../hooks/useModal.tsx';
import type { GameAdminType } from '../../../types/Game/gameAdminType.ts';
import { CgSpinner } from 'react-icons/cg';
import { DatePicker } from '../../Game/Controls/DatePicker.tsx';
import { ENDPOINTS } from '../../../constants/endpoints.ts';
import { DIFFICULTIES } from '../../../constants/difficultyPoints.ts';
import { GAME_STATUSES } from '../../../types/Game/gameStatuses.ts';
import { URLS } from '../../../constants/routes.ts';
import { findFirstAvailableDate, toDateKey } from '../../../utils/date.ts';
import { IoArrowBack } from 'react-icons/io5';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Supervision() {
    const { id } = useParams<{ id: string }>();
    const { apiCall } = useApi();
    const { showAlert } = useAlert();
    const { isSuperAdmin } = useAuth();
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [game, setGame] = useState<GameAdminType>();
    const [takenDates, setTakenDates] = useState<string[]>([]);

    const minDate = useMemo(() => {
        if (isSuperAdmin()) return undefined;

        const d = new Date();
        d.setDate(d.getDate() + 7);
        return toDateKey(d);
    }, [isSuperAdmin]);

    function updateField(field: Partial<GameAdminType>) {
        setGame((prev) => (prev ? { ...prev, ...field } : prev));
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await apiCall(ENDPOINTS.ADMIN_GAME_UPDATE(id));

                const takenDates: string[] = await apiCall(
                    ENDPOINTS.ADMIN_GAME_TAKEN_DATES
                );

                const gameDate = toDateKey(response.date);
                setTakenDates(takenDates);

                const isTaken = takenDates.includes(gameDate);
                const date =
                    isTaken || (minDate && gameDate < minDate)
                        ? findFirstAvailableDate(
                              minDate ?? toDateKey(new Date()),
                              takenDates
                          )
                        : gameDate;

                setGame({ ...response, date });
            } catch (error) {
                console.error('Erreur: ', error);
            }
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSubmit(
        e?: React.FormEvent,
        status?: typeof GAME_STATUSES.APPROVED | typeof GAME_STATUSES.REJECTED
    ): Promise<void> {
        e?.preventDefault();

        if (!id) return;

        setLoading(true);

        try {
            await apiCall(ENDPOINTS.ADMIN_GAME_UPDATE(id), {
                method: 'PATCH',
                body: JSON.stringify({
                    solution: game?.solution,
                    englishSolution: game?.englishSolution,
                    date: game?.date,
                    difficulty: game?.difficulty,
                    hint: game?.hint,
                    image: game?.image,
                    ...(status && { status }),
                }),
            });

            if (status) {
                closeModal();

                const isApproved = status === GAME_STATUSES.APPROVED;

                showAlert(
                    isApproved ? 'Pixia validé' : 'Pixia refusé',
                    isApproved
                        ? 'Le Pixia a été validé et publié.'
                        : 'Le Pixia a été refusé.',
                    'success'
                );

                navigate(URLS.ADMIN_PENDING_GAMES);
            } else {
                showAlert(
                    'Jeu mis à jour',
                    'Les informations du jeu ont bien été modifiées.',
                    'success'
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleReject() {
        openModal(
            'Refuser ce Pixia',
            <p className="text-white font-righteous">
                Es-tu sûr de vouloir refuser ce Pixia ?
            </p>,
            [
                {
                    label: 'Refuser',
                    onClick: () =>
                        handleSubmit(undefined, GAME_STATUSES.REJECTED),
                    variant: 'danger',
                },
            ]
        );
    }

    function handleApprove() {
        if (
            !game?.solution ||
            !game?.englishSolution ||
            !game?.date ||
            !game?.difficulty ||
            !game?.hint ||
            !game?.image
        ) {
            showAlert(
                'Champs manquants',
                'Tous les champs doivent être remplis pour valider.',
                'error'
            );
            return;
        }

        openModal(
            'Valider ce Pixia',
            <div className="font-righteous">
                <p className="text-white">
                    Ce Pixia sera publié et ne pourra plus être modifié.
                </p>
            </div>,
            [
                {
                    label: 'Valider',
                    onClick: () =>
                        handleSubmit(undefined, GAME_STATUSES.APPROVED),
                    variant: 'primary',
                },
            ]
        );
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
                updateField({ image: response });

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
        <section className="min-h-[90vh] max-w-5xl mx-auto w-full flex flex-col py-10 px-[10px] sm:p-6">
            <div className="card-retro w-full">
                {/* En-tête : retour + auteur + date */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(URLS.ADMIN_PENDING_GAMES)}
                        className="btn-ghost px-3 py-1.5 text-sm flex items-center gap-1"
                    >
                        <IoArrowBack />
                        Retour
                    </button>

                    {game && (
                        <div className="flex items-center truncate">
                            <img
                                src={
                                    game.author.avatarUrl ??
                                    `${import.meta.env.VITE_DICE_URL}${game.author.username}`
                                }
                                alt="Avatar"
                                className="h-12 rounded-full"
                            />
                            <p className="font-righteous text-lg sm:text-2xl text-white">
                                {game.author.username}
                            </p>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image + Champs */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Image */}
                        <div
                            onClick={handleImageClick}
                            className="cursor-pointer sm:w-1/2 flex justify-center"
                        >
                            {game?.image ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${game.image}`}
                                    alt="AI created image"
                                    className="w-full object-contain"
                                />
                            ) : (
                                <img
                                    className="h-60 mx-auto opacity-70"
                                    src="https://placehold.co/600x300/EEE/31343C?font=oswald&text=Aucune image"
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

                        {/* Champs éditables */}
                        <div className="sm:w-1/2 space-y-4 flex flex-col justify-evenly">
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
                                    value={game?.solution || ''}
                                    onChange={(e) =>
                                        updateField({
                                            solution: e.target.value,
                                        })
                                    }
                                    className="input-retro p-2 text-center sm:text-left"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="englishSolution"
                                    className="label-retro"
                                >
                                    Solution Anglaise
                                </label>
                                <input
                                    id="englishSolution"
                                    type="text"
                                    value={game?.englishSolution || ''}
                                    onChange={(e) =>
                                        updateField({
                                            englishSolution: e.target.value,
                                        })
                                    }
                                    className="input-retro p-2 text-center sm:text-left"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="label-retro"
                                    >
                                        Date
                                    </label>
                                    <DatePicker
                                        value={
                                            game?.date
                                                ? toDateKey(game.date)
                                                : ''
                                        }
                                        initialDate={
                                            game?.date
                                                ? toDateKey(game.date)
                                                : undefined
                                        }
                                        onChange={(date) =>
                                            updateField({ date })
                                        }
                                        unavailableDates={takenDates}
                                        minDate={minDate}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="difficulty"
                                        className="label-retro"
                                    >
                                        Difficulté
                                    </label>
                                    <select
                                        id="difficulty"
                                        value={game?.difficulty || ''}
                                        onChange={(e) =>
                                            updateField({
                                                difficulty: e.target
                                                    .value as keyof typeof DIFFICULTIES,
                                            })
                                        }
                                        className="input-retro p-2 text-center"
                                    >
                                        {Object.entries(DIFFICULTIES).map(
                                            ([key]) => (
                                                <option key={key} value={key}>
                                                    {key}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="indice" className="label-retro">
                            Indice
                        </label>
                        <textarea
                            id="indice"
                            rows={3}
                            value={game?.hint || ''}
                            onChange={(e) =>
                                updateField({ hint: e.target.value })
                            }
                            className="input-retro p-2 resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleReject}
                            className="btn-neon px-4 sm:px-6 py-2.5 text-sm"
                        >
                            <span className="hidden sm:block">Refuser</span>
                            <FaTimes className="sm:hidden" size={16} />
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary py-2.5 px-6 sm:px-10 text-xs sm:text-sm min-w-0 sm:min-w-[160px]"
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

                        <button
                            type="button"
                            onClick={handleApprove}
                            className="btn-success py-2.5 px-4 sm:px-8 text-sm"
                        >
                            <span className="hidden sm:block">Valider</span>
                            <FaCheck className="sm:hidden" size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Supervision;
