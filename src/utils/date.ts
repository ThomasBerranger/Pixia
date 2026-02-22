export function formatDateFr(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
    });
}

export function toDateKey(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
