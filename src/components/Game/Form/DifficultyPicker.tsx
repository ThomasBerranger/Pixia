import { DIFFICULTIES } from '../../../constants/gameForm.ts';
import type { DifficultyKey } from '../../../types/gameFormType.tsx';

interface DifficultyPickerProps {
    value: DifficultyKey;
    onChange: (key: DifficultyKey) => void;
}

function DifficultyPicker({ value, onChange }: DifficultyPickerProps) {
    return (
        <div className="mb-4">
            <p className="label-retro mb-2">Niveau de difficulté</p>

            <div className="flex flex-wrap gap-1.5">
                {(
                    Object.entries(DIFFICULTIES) as [
                        DifficultyKey,
                        (typeof DIFFICULTIES)[DifficultyKey],
                    ][]
                ).map(([key, diff]) => {
                    const isSelected = value === key;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onChange(key)}
                            className="py-1.5 px-3 text-xxs font-righteous uppercase tracking-wide cursor-pointer transition-all duration-200"
                            style={{
                                borderWidth: 2,
                                borderStyle: 'solid',
                                borderColor: isSelected
                                    ? diff.color
                                    : 'rgba(167,110,255,0.2)',
                                background: isSelected
                                    ? `${diff.color}1a`
                                    : 'transparent',
                                color: isSelected
                                    ? diff.color
                                    : 'rgba(167,110,255,0.5)',
                                boxShadow: isSelected
                                    ? `0 0 12px ${diff.color}30`
                                    : 'none',
                            }}
                        >
                            {diff.label} · {diff.points}pts
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default DifficultyPicker;
