const PARIS_TZ = 'Europe/Paris';

const parisDateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: PARIS_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
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
