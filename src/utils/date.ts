const PARIS_TZ = 'Europe/Paris';

const parisDateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: PARIS_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

const parisTimeFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: PARIS_TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
});

export function formatDateFr(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        timeZone: PARIS_TZ,
        day: 'numeric',
        month: 'long',
    });
}

export function toDateKey(date: Date | string): string {
    if (typeof date === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        return parisDateFormatter.format(new Date(date));
    }
    return parisDateFormatter.format(date);
}

export function getParisTodayKey(): string {
    return parisDateFormatter.format(new Date());
}

// Le back tourne en Europe/Paris : on aligne le front pour que la
// transition de jour (et donc de Pixia) se fasse au même instant.
export function msUntilNextParisMidnight(): number {
    const parts = parisTimeFormatter.formatToParts(new Date());
    const value = (type: string) =>
        Number(parts.find((p) => p.type === type)?.value ?? 0);

    const msSinceMidnight =
        ((value('hour') * 60 + value('minute')) * 60 + value('second')) * 1000;

    return 24 * 60 * 60 * 1000 - msSinceMidnight + 1_000;
}

export function findFirstAvailableDate(
    from: string,
    unavailable: string[]
): string {
    const taken = new Set(unavailable);
    const candidate = new Date(from);

    for (let i = 0; i < 365; i++) {
        const key = toDateKey(candidate);
        if (!taken.has(key)) return key;
        candidate.setDate(candidate.getDate() + 1);
    }

    return from;
}
