import type { ReactNode } from 'react';
import type { StepConfig, StepId } from '../../../types/gameFormType.tsx';
import { FaCheck } from 'react-icons/fa';
import TokenBadge from './TokenBadge.tsx';

interface AccordionItemProps {
    stepConfig: StepConfig;
    currentStep: StepId;
    tokensRemaining: number;
    children: ReactNode;
}

function AccordionItem({
    stepConfig,
    currentStep,
    tokensRemaining,
    children,
}: AccordionItemProps) {
    const { id, icon, label, tokens } = stepConfig;
    const isDone = currentStep > id;
    const isActive = currentStep === id;
    const isLocked = currentStep < id;

    return (
        <div
            className={`transition-all duration-300 overflow-hidden border-[3px]
                ${isActive ? 'border-retro-primary bg-retro-surface shadow-[0_0_25px_rgba(255,0,110,0.2)]' : ''}
                ${isDone ? 'border-retro-accent/50 bg-retro-accent/[0.03]' : ''}
                ${isLocked ? 'border-retro-muted/30 bg-retro-surface/40 opacity-50' : ''}
            `}
        >
            {/* Header */}
            <div className="flex items-center gap-1 px-4 py-3">
                <span className="text-xl">
                    {isDone ? <FaCheck className="text-retro-success" /> : icon}
                </span>

                <span
                    className={`flex-1 text-sm font-righteous uppercase tracking-wider
                        ${isActive ? 'text-retro-primary' : ''}
                        ${isDone ? 'text-retro-accent' : ''}
                        ${isLocked ? 'text-retro-muted' : ''}
                    `}
                >
                    {label}
                </span>

                {tokens > 0 && !isLocked && (
                    <TokenBadge
                        n={tokens}
                        total={tokensRemaining + (isDone ? tokens : 0)}
                        spent={isDone}
                        sm
                    />
                )}

                {isDone && (
                    <span className="text-xxs font-righteous uppercase tracking-wider text-retro-success">
                        Complété
                    </span>
                )}

                {isActive && (
                    <span className="text-xxs font-righteous uppercase text-retro-primary">
                        En cours
                    </span>
                )}
            </div>

            {/* Content — visible uniquement quand actif */}
            {isActive && (
                <div className="px-4 pb-4 animate-slide-up">{children}</div>
            )}
        </div>
    );
}

export default AccordionItem;
