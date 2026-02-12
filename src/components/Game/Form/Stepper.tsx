import { CREATE_STEPS } from '../../../constants/gameForm.ts';
import type { StepId } from '../../../types/gameFormType.tsx';
import { FaCheck } from 'react-icons/fa';

interface StepperProps {
    currentStep: StepId;
}

function Stepper({ currentStep }: StepperProps) {
    return (
        <div className="stepper">
            {CREATE_STEPS.map((step, index) => {
                const isDone = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isActive = currentStep >= step.id;
                const isLast = index === CREATE_STEPS.length - 1;
                const nextIsCurrent =
                    !isLast && currentStep === CREATE_STEPS[index + 1].id;

                const dotClass = `stepper-dot${isCurrent ? ' stepper-dot--current' : ''}${isDone ? ' stepper-dot--done' : ''}`;
                const labelClass = `stepper-label${isCurrent ? ' stepper-label--current' : isActive ? ' stepper-label--active' : ''}`;
                const lineClass = `stepper-line${isDone ? (nextIsCurrent ? ' stepper-line--transition' : ' stepper-line--done') : ''}`;

                return (
                    <div key={step.id} className="stepper-step">
                        <div className="stepper-dot-wrapper">
                            <div className={dotClass}>
                                {isDone ? (
                                    <FaCheck className="text-retro-accent" />
                                ) : (
                                    step.icon
                                )}
                            </div>
                            <span className={`${labelClass} tracking-wider`}>
                                {step.label}
                            </span>
                        </div>

                        {!isLast && <div className={lineClass} />}
                    </div>
                );
            })}
        </div>
    );
}

export default Stepper;
