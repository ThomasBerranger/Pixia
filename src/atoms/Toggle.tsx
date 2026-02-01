interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 border-2 ${
                checked
                    ? 'bg-retro-primary border-retro-primary shadow-[0_0_20px_rgba(255,0,110,0.6)]'
                    : 'bg-retro-surface border-retro-muted'
            }`}
        >
            <div
                className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all duration-300 ${
                    checked
                        ? 'left-7 bg-white shadow-[0_0_10px_#fff]'
                        : 'left-1 bg-retro-muted'
                }`}
            />
        </button>
    );
}

export default Toggle;
