interface TextareaRetroProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    minLength?: number;
}

function TextareaRetro({
    value,
    onChange,
    label,
    placeholder,
    rows = 3,
    maxLength = 500,
    minLength,
}: TextareaRetroProps) {
    const isValid = minLength ? value.length >= minLength : true;

    return (
        <div>
            <label className="label-retro">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`input-retro resize-none text-sm ${
                    minLength && isValid
                        ? 'border-retro-accent shadow-[0_0_15px_rgba(255,190,11,0.15)]'
                        : ''
                }`}
            />

            <p className="flex justify-end">
                <span className={'text-xs font-righteous text-retro-muted'}>
                    {value.length}/{maxLength}
                </span>
            </p>
        </div>
    );
}

export default TextareaRetro;
