import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BiSolidDownArrow } from 'react-icons/bi';

interface AccordionProps {
    month: string;
    value: string;
}

export function GameMonthAccordion({ month, value }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-retro-accent border-2 border-retro-bg shadow-[3px_3px_0_theme(colors.retro.secondary)] font-righteous text-retro-bg"
            >
                <span className="text-sm uppercase tracking-wider">
                    {format(new Date(`${month}-01`), 'MMMM yyyy', {
                        locale: fr,
                    })}
                </span>
                <div className="flex items-center gap-3">
                    <span className="text-sm tracking-wider">{value}</span>
                    <span
                        className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}
                    >
                        <BiSolidDownArrow />
                    </span>
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 bg-retro-surface border-x-2 border-retro-bg ${isOpen ? 'border-b-2' : ''}`}
                style={{ maxHeight: isOpen ? '500px' : '0' }}
            >
                coucou
            </div>
        </div>
    );
}
